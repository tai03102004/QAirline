const Account = require('../../../models/account.model'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký người dùng
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await Account.findOne({ email });
        if (existingUser) return res.status(400).send('Email already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Account({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Account.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Error logging in user');
    }
};
