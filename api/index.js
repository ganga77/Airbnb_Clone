const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const User = require('./models/User.js')
const bcryptSalt = bcrypt.genSaltSync(10); // For Password
//Connection b/w frontend and backend
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173', 
}));

mongoose.connect(process.env.MONGO_URL) // npm i dotenv

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

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
