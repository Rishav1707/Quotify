const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    uploaded_By: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", QuoteSchema);
module.exports = Quote;
