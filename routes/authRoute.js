const { Router } = require('express');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const User = require('../models/UserModel');
const { UserLoginSchema } = require('../models/ValidateSchema');

const router = Router();

router.post('/login', async (req, res) => {
    const { error } = UserLoginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const validUser = await compare(password, user.password);
    if (!validUser) {
        return res.status(400).json({ message: 'Invalid Password' });
    }

    const payload = { user: { id: user._id } };

    sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            throw err;
        }
        res.json({ token });
    });
});

module.exports = router;