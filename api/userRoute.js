const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userLogin,
  userAutoLogin,
  userLogout,
} = require("../controllers/userRoute");

router.post("/registerUser", userRegistration);

router.post("/loginUser", userLogin);

router.post("/autoLogin", userAutoLogin);

router.get("/logoutUser", userLogout);

module.exports = router;
