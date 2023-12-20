const jwt = require("jsonwebtoken");

const getToken = async (email, user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      email: email,
      // Add any other relevant information to the payload
    },
    process.env.secretKey,
    { expiresIn: "1h" } // Optional: Set token expiration time
  );
  return token;
};

module.exports = { getToken };
