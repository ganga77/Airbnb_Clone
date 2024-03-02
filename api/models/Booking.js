const mongoose = require('mongoose');
const {Schema} = mongoose;

const BookingSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    place: {type:mongoose.Schema.Types.ObjectId, required: true, ref:'Place'},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    name: {type: String, required: true},
    mobile: {type: String, required: true},
    price: {type: Number, required: true}

});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;