const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./modules/user'); 


require('dotenv').config(); // Load .env variables

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Auth failed: user not found' });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return res.status(500).json({ message: 'Internal error' });
                }

                if (result) {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id
                        },
                        process.env.JWT_KEY || 'default_secret', // fallback for local testing
                        { expiresIn: '1h' }
                    );

                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                } else {
                    return res.status(401).json({ message: 'Auth failed: incorrect password' });
                }
            });
        })
        .catch(err => {
            console.error("Login error:", err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// SIGNUP
router.post('/signup', (req, res) => {
    User.find({ email: req.body.email })
        .then(users => {
            if (users.length > 0) {
                return res.status(409).json({ message: 'User already exists' });
            }

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) return res.status(500).json({ error: err });

                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });

                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User created successfully',
                            createdUser: {
                                _id: result._id,
                                email: result.email
                            }
                        });
                    })
                    .catch(err => res.status(500).json({ error: err }));
            });
        })
        .catch(err => res.status(500).json({ error: err }));
});

// DELETE USER
router.delete('/:userId', (req, res) => {
    User.deleteOne({ _id: req.params.userId })
        .then(result => {
            res.status(200).json({ message: 'User deleted' });
        })
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
