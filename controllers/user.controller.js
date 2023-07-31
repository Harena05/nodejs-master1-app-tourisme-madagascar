// const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  const data = req.body
  try {
    const { username, password } = req.body;
    const newUserPassword = password;
    const newUser = new User({ username, password: newUserPassword });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Username not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    // You can use a session or JWT to manage authentication.
    // In this example, we'll simply send a success message.
    res.json({ message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};
