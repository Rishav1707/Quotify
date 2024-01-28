const Quote = require("./models/Quote");

const quotes = [
  {
    author: "Marilyn Monroe",
    text: "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
  },
  {
    author: "Oscar Wilde",
    text: "Be yourself; everyone else is already taken.",
  },
  {
    author: "Albert Einstein",
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
  },
  {
    author: "Frank Zappa",
    text: "So many books, so little time.",
  },
  {
    author: "Marcus Tullius Cicero",
    text: "A room without books is like a body without a soul.",
  },
];

const seedDB = async () => {
  await Quote.insertMany(quotes);
  console.log("DB Seeded");
};

module.exports = seedDB;
