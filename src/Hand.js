const _ = require('lodash');
const Deck = require('./Deck');
const { rankOrder, handsOrder } = require('./data.json');

/**
 * Poker Hand class
 *
 * @class Hand
 * @extends {Deck}
 */
class Hand extends Deck {
  /**
   *  Creates an instance of Hand.
   *
   * @param {string} cards a string of cards ex "AH TS JC 9H 3S"
   * @memberof Hand
   */
  constructor(cards) {
    super();
    if (cards) {
      // Create an array from the cards string
      this.hand = cards.split(' ');
      // order cards by rank
      this.orderByRank();
    } else {
      // No cards provided
      this.hand = ['ERROR'];
    }
  }

  /**
   * Cards getter. Returns a cards array of the Hand
   *
   * @readonly
   * @memberof Hand
   */
  get cards() {
    return this.hand;
  }

  /**
   * Identifies the poker Hand from the cards provided
   *
   * @returns {string} The identified hand
   * @memberof Hand
   */
  identify() {
    // Get all possible hands from cards in hand
    const checks = [this.isStraight(), this.hasPairs(), this.isFlush()];
    // Order identified hands we by the Hands orders
    const handIdentified = _.sortBy(checks, check => {
      if (check) {
        return handsOrder.indexOf(check);
      }
      return null;
    });
    // The first element in our array is the Highest hand we identified.
    // If we didnt identified anything ( all elements are false ) then return the last
    // hand from the hands order.
    return handIdentified[0] || _.last(handsOrder);
  }

  /**
   * Orders hand array by card's rank.
   *
   * @memberof Hand
   */
  orderByRank() {
    // create a new array of the rank order array
    const order = rankOrder.concat();
    // Order hand array by card rank
    this.hand = _.sortBy(this.hand, card => {
      return order.indexOf(card[0]);
    });
  }

  /**
   * Checks if hand array is a straight or not and what kind of a straight.
   *
   * @returns {string|boolean} False if it isnt a straight and string with with hand identification
   * @memberof Hand
   */
  isStraight() {
    let ranksCount = 0;
    let royalFlush = false;
    // create a new array of the rank order array
    const order = rankOrder.concat();
    // Check if we have  an Ace at start and a King at the end
    if (this.hand[0][0] === 'A' && this.hand[4][0] === 'K') {
      // Ok that MIGHT be a royal Flush.
      royalFlush = true;
      // Move Ace to the end of the order
      order.push(order.shift());
      // Move Ace to the end of the hand array
      this.hand.push(this.hand.shift());
    }
    // Iterate Hand to find if we have a straight
    this.hand.forEach((card, index) => {
      const rankIndex = order.indexOf(card[0]);
      // So if hand's next card in Rank is equal to rank order's next card in order
      if (index < 4 && this.hand[index + 1][0] === order[rankIndex + 1]) {
        // Let's say that we count another continuous rank in our hand
        ranksCount += 1;
      }
    });

    let returnVal = false;
    // So if we found 4 continous ranks in our hand and it is a straight
    if (ranksCount === 4) {
      // Let's also check if our hand is a straight flush
      if (this.isFlush() !== false) {
        // Did we marked our hand as `Might be a royal flush?'
        returnVal = `${royalFlush ? 'Royal' : 'Straight'} flush`;
      } else {
        // It's a plain straight.
        returnVal = 'Straight';
      }
    }
    return returnVal;
  }

  /**
   * Checks if Hand array has pairs or same rank cards or not
   * and returns whatever it finds.
   *
   * @returns {string|boolean} False if nothing found or String with hand identification
   * @memberof Hand
   */
  hasPairs() {
    // Ok let's see how many pairs we have in our hand
    const pairs = _.chain(this.hand)
      .groupBy(card => card[0]) // Group hand by identical cards
      .countBy('length') // Count how many identical per rank.
      .value();
    // If We got 3 of a kind and a pair
    if (pairs[2] && pairs[3]) {
      return `Full house`;
    }
    // If We got 4 of the same cards ?
    if (pairs[4]) {
      return '4 of a kind';
    }
    // If we got 3 of a kind
    if (pairs[3]) {
      return '3 of a kind';
    }
    // If we got 1 or 2 pairs
    if (pairs[2]) {
      return `${pairs[2]} pair`;
    }
    // We got nothing
    return false;
  }

  /**
   * Checks if Hand array has the same suits in all cards if not.
   *
   * @returns {string|boolean} False if nothing found or 'Flush'
   * @memberof Hand
   */
  isFlush() {
    // Let's see how many cards of the same suit we got
    const suits = _.chain(this.hand)
      .groupBy(card => card[1]) // Group cards by same suit
      .countBy('length') // Count how many of the same suit we have
      .value();
    // If we have 5 of the same suit then we have a flush.
    return suits[5] ? 'Flush' : false;
  }
}

module.exports = Hand;
