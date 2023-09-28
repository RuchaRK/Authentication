const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env['JWT_SECRET'];

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
}


async function signup(user) {
  try {
    const user = new User(user);
    const newUser = await user.save();
    return {user:newUser, token: generateToken(newUser._id)}
  } catch (error) {
    throw error;
  }
}

async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      const token = generateToken(user._id);
      return {
        data: { user, token },
        success: true,
        message: "Login Successful"
      };
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw error;
  }
}

async function changePassword(email, currentPassword, newPassword) {
  try {
    const user = await User.findOne({ email });
    if (user && user.password === currentPassword) {
      user.password = newPassword;
      const updatedUser = await user.save();
      return updatedUser;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  signup,
  login,
  changePassword
}

