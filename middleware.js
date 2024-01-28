const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

// const userTokenValidation = (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) {
//       return res.status(401).json({ msg: "Authorization header missing" });
//     }
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ msg: "Token missing" });
//     }
//     const decodedToken = jwt.verify(token, secretKey);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ msg: "Authentication Failed" });
//   }
// };

const userTokenValidation = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "Token missing" });
    }
    const decodedToken = jwt.verify(token, secretKey);
    if (!decodedToken) {
      return res.status(401).json({ msg: "Token invalid" });
    }
    req.user = JSON.parse(decodedToken.user);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Authentication Failed" });
  }
};

module.exports = userTokenValidation;
