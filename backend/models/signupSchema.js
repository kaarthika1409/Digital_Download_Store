const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        unique: true,  
        trim: true,     
        lowercase: true 
    },
    password: {
        type: String,
        required: true
    },
   
});

module.exports = mongoose.model('Signup', signupSchema);
