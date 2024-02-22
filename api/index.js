const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const User = require('./models/User.js')
const bcryptSalt = bcrypt.genSaltSync(10); // For Password
const jwtSecret = 'dgashahdhjajksdsd'; // random value for cookie used in login
//Connection b/w frontend and backend
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173', 
}));

mongoose.connect(process.env.MONGO_URL) // npm i dotenv

//register route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    try{
        const newUser = await User.create({
            name, 
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(newUser)
    }catch (err){
        res.status(422).json(err)
    }
});

//login route
app.post('/login', async(req, res) =>{
    const {email, password} = req.body;

    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password, userDoc.password);
            if(passOk){
                jwt.sign({email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token)=>{
                    if(err) throw err;
                    res.cookie('token', token).json(userDoc)
                });
            }else{
                res.status(422).json('pass not ok')
            }
        
    }else{
        res.json('Not Found')
    }

})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});


// profile page where there is no user

// app.get('/profile', (req, res) =>{
//     const {token} = req.cookies;
//     if(token){
//         jwt.verify(token, jwtSecret, {}, (err, user) =>{
//             if(err) throw err;
//             res.json(user);
//         })
//     }else {
//         res.json(null);
//     }
// })

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, async (err, userData) => {
            if (err) {
                console.error('Error verifying token:', err);
                res.json(null);
            } else {
                const userDoc = await User.findById(userData._id)
                console.log('User profile retrieved:', userDoc);
                res.json(userDoc);
            }
        });
    } else {
        console.log('No token found');
        res.json(null);
    }
});




