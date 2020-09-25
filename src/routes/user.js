const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', async (req, res, next) => {
    try {
        const foundUser = await User.find({ email: req.body.email });

        if (foundUser.length > 0) {
            return res.json({
                message: `User with ${req.body.email} exists`
            })
        }

    } catch (error) {
        res.json({
            error,
        })
    }

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        try {
            const user = new User({
                email: req.body.email,
                password: hash,
            })

            await user.save();

            res.json({
                message: 'Welcome to the club!',
            })
            
        } catch (error){
            res.json({
                error,
            })
        }
    })
})


module.exports = router;