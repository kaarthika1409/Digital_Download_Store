const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, // Ensure email is required
        unique: true,   // Ensure email is unique
        trim: true,     // Remove extra spaces
        lowercase: true // Convert email to lowercase
    },
    password: {
        type: String,
        required: true // Ensure password is required
    },
   
});

module.exports = mongoose.model('Signup', signupSchema);