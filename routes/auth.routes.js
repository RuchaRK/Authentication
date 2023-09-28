const express = require('express');
const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  try {
    const savedUserWithToken = await signup(req.body);
    res.json({ ...savedUserWithToken, success: true, message: "Sign Up Successful" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create user account' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await login(email, password);
    res.json({success: true, user: userDetails});
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

authRouter.post('/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const updatedUser = await changePassword(email, currentPassword, newPassword);
    res.json({success: true, user: updatedUser });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = authRouter