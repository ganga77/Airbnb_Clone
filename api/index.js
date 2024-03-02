const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()


const User = require('./models/User.js')
const Place = require('./models/Place.js')
const Booking = require('./models/Booking.js')

const bcryptSalt = bcrypt.genSaltSync(10); // For Password
const jwtSecret = 'dgashahdhjajksdsd'; // random value for cookie used in login
const fs = require('fs')
//Connection b/w frontend and backend
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173', 
}));


mongoose.connect(process.env.MONGO_URL) // npm i dotenv

function getUserDataFromToken(req){
    return new Promise((resolve, reject) =>{
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) =>{
            if(err) throw err;
            resolve(userData)
        })
    })
}


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
                    res.cookie('token', token).json({
                        id:userDoc._id,
                        email
                    })
                });
            }else{
                res.status(422).json('pass not ok')
            }
        
    }else{
        res.json('Not Found')
    }

})

// This is called because once we register the user then it will be fetched
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            
            
            const userDoc = await User.findById(userData._id)
            console.log('User profile retrieved:', userDoc);
            res.json(userDoc);
            
        });
    } else {
        console.log('No token found');
        res.json(null);
    }
});

//logout 
app.post('/logout', (req, res) => {
    
    res.cookie('token', '').json('ok');
});

//uploading photos
const multer = require('multer')
const photosMiddleware = multer({dest:'uploads/'})

app.post('/upload', photosMiddleware.array('photos', 100),  async(req, res) =>{
    const uploadedFiles = [];
    for(let i=0; i<req.files.length; i++){
        const {path,originalname} = req.files[i];
        console.log('Original Name is :' + originalname)
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
       uploadedFiles.push(newPath.replace('uploads/',''))
    }
    console.log(req.files);
   res.json(uploadedFiles)
})





// Form submission data from PlacesPage

app.post('/places', async (req, res) => {
    const { token } = req.cookies;

    try {
        const { title, address, description, addedPhotos, perks, extraInfo, checkIn, checkOut, guests, price } = req.body;
        
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;

            const placeDoc = await Place.create({
                owner: userData.id, // We are not doing userData._id because we have assigned id:userData._id
                title,
                address,
                description,
                photos: addedPhotos,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                guests,
                price
            });

            res.json(placeDoc); 
        });
    } catch (err) {
        res.status(422).json(err);
    }
});


//fetching places data for the loggedin User
app.get('/places', async (req, res) =>{
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json(await Place.find({owner:id}))
    }) 
})

//fetching places data with only id
app.get('/places/:id', async (req,res) =>{
    const {id} = req.params;
    res.json(await Place.findById(id));
})

//deleting a particular image of a particular post

app.post('/places/:id/deletePhoto', async (req, res) => {
    const { id } = req.params;
    const { file } = req.body;

    try {
        // Assuming 'photos' is an array field in your Place model
        const updatedPlace = await Place.findByIdAndUpdate(
            id,
            { $pull: { photos: file } },
            { new: true }
        );

        res.json(updatedPlace);
    } catch (error) {
        console.error('Error deleting photo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// deleting a particular place
app.post('/places/:id/deletePlace', async(req, res) =>{
    const {id} = req.params;
    
    const deletedPlace = await Place.findByIdAndDelete(id);
    console.log('Deleted Place is:', deletedPlace)
})

// Displaying places in index page
app.get('/indexPlaces', async (req, res)=>{
    res.json(await Place.find());
})


// Creating booking api
app.post('/booking', async (req, res) =>{
    const userData = await getUserDataFromToken(req);
    const {place, checkIn, checkOut,
        numOfGuests, name, mobile, price
    } = req.body;

    try{
    const bookingData = await Booking.create({
        user: userData.id,
        place, checkIn, checkOut,
        numOfGuests, name, mobile, price
    });

    res.json(bookingData);
    }catch (err) {
        res.status(422).json(err);
    }
})

// To fetch bookings
app.get('/bookings', async(req, res) =>{
    const userData = await getUserDataFromToken(req);

    res.json(await Booking.find({user:userData.id}).populate('place'));
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});











