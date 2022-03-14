import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PlayingCard, back2 } from '@karlandin/playing-cards';
import ReactCardFlip from 'react-card-flip';
import { get, take, last } from 'lodash';
import { delay } from 'client/utils';
import './Hand.scss';

/**
 *  Matching Ranks for our cards with @karlandin dependency
 */
const CARD_IDS = {
  A: 1,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
};

/**
 * Translating a playing card id from our file to match playing cards from
 * our dependency @karlandin
 *
 * @param {string} id Card Id we want to translate
 * @returns {string} containing the translated card id.
 */
function translateId(id) {
  let num;
  // is card's rank greater than 9 ?
  if (id.length === 3) {
    num = take(id, 2).join('');
  } else {
    [num] = id;
  }
  const suit = last(id);
  // Put suit first and then the rank
  return `${suit}${get(CARD_IDS, num, num)}`;
}

/**
 * Component that displays the playing cards of a Poker hand
 *
 * @class Hand
 * @extends {Component}
 */
class Hand extends Component {
  constructor() {
    super();
    // All cards are not flipped by default.
    this.state = { flipped: [] };
  }

  componentDidMount() {
    // Ok we rendered the cards ... let's flip them now
    this.flipCards(0);
  }

  /**
   * Take cares of the card flipping animation and flips the cards.
   *
   * @param {number} i Index of the card to be flipped.
   * @memberof Hand
   */
  async flipCards(i) {
    // Let's wait a wee bit for other animation effects to finish
    await delay(350);
    const { flipped } = this.state;
    // Ok set the card to flipped
    flipped.push(true);
    this.setState({ flipped }, async () => {
      /* istanbul ignore else */
      if (i <= 3) {
        this.flipCards(i + 1);
      }
    });
  }

  render() {
    const { cards, hand } = this.props;
    const { flipped } = this.state;
    return (
      <div className="hand">
        {// Let's render our cards
        cards.map((card, i) => (
          <ReactCardFlip
            isFlipped={flipped[i]} // Here is where we specify if the card is flipepd or not
            flipDirection="horizontal"
            key={`${i + 1}`}
          >
            <div key="front" className="card">
              <PlayingCard card={back2} size="small" />
            </div>
            <div key="back" className="card">
              <PlayingCard
                card={{
                  id: translateId(card),
                }}
                size="small"
                caption
                captionPosition="bottom"
              />
              <br />
              <span className="card-definition">{card}</span>
            </div>
          </ReactCardFlip>
        ))}
        <br />
        <span className="poker-hand">{`${hand}`}</span>
      </div>
    );
  }
}

Hand.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  hand: PropTypes.string,
};

Hand.defaultProps = {
  hand: '',
};

export default Hand;
