const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String, 
        reqired: true,
        unique: true, 
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {type: String, reqired: true},
})

module.exports = mongoose.model('User', userSchema);