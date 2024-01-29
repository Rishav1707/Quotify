const User = require("../models/User");
const bcrypt = require("bcrypt");
const getJwtToken = require("../TokenGenerator");

const loginOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  sameSite: "none",
  partitioned: true,
};

const logoutOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  partitioned: true,
};

const userRegistration = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const Email = await User.findOne({ email });
    if (Email) {
      res
        .status(400)
        .send("Looks like you already have an account, Please Login");
    } else {
      password = await bcrypt.hash(password, 10);
      await User.create({ name, email, password });
      res.status(200).send("You have successfully registered, Please Login");
    }
  } catch (error) {
    res.send(
      "Something went wrong while registering user, please try again",
      error
    );
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res
        .status(401)
        .send("Invalid email address, Register yourself first");
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res
        .status(401)
        .send("Either your email or password is incorrect, Please try again");
    }

    const token = getJwtToken(validUser);

    res
      .status(200)
      .cookie("token", token, loginOptions)
      .json({
        user: {
          email: validUser.email,
          name: validUser.name,
          _id: validUser._id,
          time: Date.now(),
        },
      });
  } catch (error) {
    res.send(
      "Something went wrong while logging in user, please try again",
      error
    );
  }
};

const userAutoLogin = async (req, res) => {
  const { email } = req.body;
  const loggedUser = await User.findOne({ email });
  const token = getJwtToken(loggedUser);
  // const decodedToken = jwt.verify(token, secretKey);
  res
    .status(200)
    .cookie("token", token, loginOptions)
    .json({
      user: {
        email: loggedUser.email,
        name: loggedUser.name,
        _id: loggedUser._id,
        time: Date.now(),
      },
    });
};

const userLogout = (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token", logoutOptions)
      .json({ msg: "User Logged Out" });
  } catch (error) {
    res.status(400).send("Something went wrong while logging out user", error);
  }
};

module.exports = { userRegistration, userLogin, userAutoLogin, userLogout };
