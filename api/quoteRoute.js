const express = require("express");
const router = express.Router();
const userTokenValidation = require("../middleware");
const multer = require("multer");
const {
  allQuotes,
  userUploadedQuotes,
  addNewQuote,
  editQuote,
  likeQuote,
  unlikeQuote,
  deleteQuote,
  showSingleQuote,
} = require("../controllers/quoteRoute");

// Used to store the image in the public folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profile_images");
  },
  filename: (req, file, cb) => {
    cb(null, `quote-${Date.now()}-${file.originalname}`);
  },
});

// Used to upload the image
const upload = multer({
  storage: storage,
});

router.get("/quotes", allQuotes);

router.get("/myQuotes", userTokenValidation, userUploadedQuotes);

router.post(
  "/newQuote",
  userTokenValidation,
  upload.single("img"),
  addNewQuote
);

router.patch(
  "/updateQuote/:id",
  userTokenValidation,
  upload.single("img"),
  editQuote
);

router.put("/likeQuote", userTokenValidation, likeQuote);

router.put("/unlikeQuote", userTokenValidation, unlikeQuote);

router.delete("/deleteQuote/:id", userTokenValidation, deleteQuote);

router.get("/quote/:id", showSingleQuote);

module.exports = router;
