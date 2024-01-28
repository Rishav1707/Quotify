const Quote = require("../models/Quote");
const User = require("../models/User");
const fs = require("fs");

const allQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({});
    res.status(200).json(quotes);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const userUploadedQuotes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("quote");
    res.status(200).json(user.quote);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const addNewQuote = async (req, res) => {
  try {
    const { filename } = req.file;
    const { author, text } = req.body;
    const { _id, name, email } = req.user;
    await Quote.create({ img: filename, author, text, uploaded_By: _id });
    const quote = await Quote.findOne({ author, text });
    await User.findByIdAndUpdate(
      _id,
      { $addToSet: { quote: quote._id } },
      { new: true }
    );
    res.status(201).send("Hurray! you have added a new quote, Inspire more🔥");
  } catch (e) {
    res.status(400).send("Something went wrong while adding new quote", e);
  }
};

const editQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    const { author, text } = req.body;
    const existingQuote = await Quote.findById(id);
    fs.unlinkSync(`./public/profile_images/${existingQuote.img}`);
    await Quote.findByIdAndUpdate(
      id,
      { img: filename, author, text },
      { new: true }
    );
    res.status(200).send("Your changes have been saved");
  } catch (e) {
    res.status(400).send("Something went wrong while updating quote", e);
  }
};

const likeQuote = async (req, res) => {
  try {
    const { id } = req.body;

    const quote = await Quote.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favQuote: id } },
      { new: true }
    );

    res.status(200).json({
      msg: "Quote Liked Successfully",
      quote,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const unlikeQuote = async (req, res) => {
  try {
    const { id } = req.body;

    const quote = await Quote.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favQuote: id } },
      { new: true }
    );

    res.status(200).json({
      msg: "Quote unLiked Successfully",
      quote,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuote = await Quote.findByIdAndDelete(id);
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { quote: id } },
      { new: true }
    );
    fs.unlinkSync(`./public/profile_images/${deletedQuote.img}`);
    res.status(200).json({ msg: "Quote Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const showSingleQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findById(id);
    res.status(200).json(quote);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

module.exports = {
  allQuotes,
  userUploadedQuotes,
  addNewQuote,
  editQuote,
  likeQuote,
  unlikeQuote,
  deleteQuote,
  showSingleQuote,
};
