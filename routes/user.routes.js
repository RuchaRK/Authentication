const express = require('express');
const userRouter = express.Router();



userRouter.post('/update-profile-picture', async (req, res) => {
  try {
    const { email, newProfilePictureUrl } = req.body;
    const updatedUser = await updateProfilePicture(email, newProfilePictureUrl);
    res.json({success: true, user: updatedUser });
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

userRouter.post('/update-contact/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const {phoneNumber, address} = req.body;
    const updatedUser = await updateContactDetails(email, {phoneNumber, address});
    res.json({success: true, user: updatedUser });
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

userRouter.get('/phone/:phoneNumber', async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    const user = await findUserByPhoneNumber(Number(phoneNumber));
    if (user) {
      res.json({success: true, user: updatedUser });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});