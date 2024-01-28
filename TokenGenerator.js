const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const getJwtToken = (user) => {
  user = JSON.stringify(user);
  const token = jwt.sign({ user }, secretKey);
  return token;
};

module.exports = getJwtToken;
