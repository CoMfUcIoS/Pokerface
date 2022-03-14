const { rankOrder, suits } = require('./data.json');
/**
 *  Deck of playing cards
 *
 * @class Deck
 */
class Deck {
  /**
   * Creates an instance of Deck.
   * @memberof Deck
   */
  constructor() {
    this.deck = [];
    // For each rank create a card with different suit
    rankOrder.forEach(rank => {
      suits.forEach(suit => {
        this.deck.push(`${rank}${suit}`);
      });
    });
  }

  /**
   * Validates if a hand contains valid cards
   *
   * @param {array} hand
   * @returns {Boolean} True if hand is valid, false otherwise
   * @memberof Deck
   */
  isHandValid(hand) {
    const cardNumber = hand.length;
    return (
      cardNumber === 5 &&
      !hand.find(card => {
        return this.deck.indexOf(card) === -1;
      })
    );
  }
}

module.exports = Deck;
