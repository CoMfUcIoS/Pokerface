const express = require('express');
const bodyParser = require('body-parser');
const Hand = require('../Hand');

const app = express();

// Set up all express middleware
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.post('/api/identify-hand', (req, res) => {
  // read the hand from body
  const hand = new Hand(req.body.hand);
  let returnVal = 'invalid cards defined';
  // Check if cards provided are valid playing cards
  if (hand.isHandValid(hand.cards)) {
    // identify the hand
    returnVal = hand.identify();
    res.json({
      hand: returnVal,
    });
  } else {
    res.json({
      error: true,
      message: 'Not a valid Poker hand',
    });
  }
});

app.listen(
  process.env.PORT || 8080,
    () => console.log(`Listening on port ${process.env.PORT || 8080}!`), //eslint-disable-line
);

module.exports = app;
