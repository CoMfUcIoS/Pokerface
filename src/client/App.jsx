import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hand from 'client/Components/Hand';
import { delay, readFile } from 'client/utils';
import './App.scss';

/**
 * App root view
 *
 * @export
 * @class App
 * @extends {Component}
 */
export default class App extends Component {
  constructor() {
    super();
    // Set initial state to empty hands
    this.state = {
      hands: [],
    };
  }

  /**
   *  Sends a hand to backend to be identified
   *
   * @param {number} i Index of the hand we want to be send to BE from our hands array
   * @memberof App
   */
  async identifyHand(i) {
    const { hands } = this.state;
    const url = '/api/identify-hand';
    const { cards } = hands[i];
    const options = {
      method: 'POST',
      body: JSON.stringify({
        hand: cards.join(' '), // Backend expects a string.
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Ok let's fetch
    const response = await fetch(url, options);
    const { hand, error, message } = await response.json();
    // Did we get an error or an identified hand ?
    hands[i].pokerHand = !error ? hand : message;
    // Let's wait for animation effect.
    await delay();
    // Set the new state to append the new hand.
    this.setState(
      {
        hands,
      },
      async () => {
        // Are we done with the hands array ?
        if (i < hands.length - 1) {
          // Let's identify the next hand in our Hands array
          await this.identifyHand(i + 1);
        }
      },
    );
  }

  /**
   *  Parses provided file and starts the identification process.
   *
   * @param {File} file File we want to parse and identify
   * @memberof App
   */
  async parseFile(file) {
    // Let's be on the safe side. Clear the state
    this.setState({ hands: [], filename: null });
    // read the file
    const { name, value } = await readFile(file);
    // Filter all the empty lines
    const filterHands = value.split('\n').filter(Boolean);
    // Set the new hands array with all hands and the filename
    this.setState(
      {
        hands: filterHands.map(cards => ({
          cards: cards.split(' '),
        })),
        filename: name,
      },
      () => {
        // Now let's start identifying our hands.
        this.identifyHand(0);
      },
    );
  }

  /**
   * Resets the state of the app
   *
   * @memberof App
   */
  resetState() {
    this.setState({
      hands: [],
      filename: null,
    });
  }

  render() {
    const { hands, filename } = this.state;
    return (
      <div className="app">
        <div className="upload">
          {// Do we have a filename specified
          filename ? (
            <span className="upload-actions upload-filename">
              {`file: ${filename}`}
              {// Have we finished identifying our hands ?
              hands.length !==
              hands.filter(({ pokerHand }) => !!pokerHand).length ? (
                <CircularProgress size="20px" className="loading" />
              ) : (
                <Button
                  onClick={() => this.resetState()}
                  component="span"
                  className="loading"
                >
                  {`Reset`}
                </Button>
              )}
            </span>
          ) : (
            <>
              <label htmlFor="upload-file" className="upload-actions">
                <Button component="span">{`Upload Hands`}</Button>
                <input
                  accept="*"
                  style={{ display: 'none' }}
                  id="upload-file"
                  type="file"
                  onChange={e => this.parseFile(e.currentTarget.files[0])}
                />
              </label>
            </>
          )}
        </div>
        <div className="hands">
          {// Render all hands that are identified
          hands.map((hand, index) => {
            const { pokerHand, cards } = hand;
            if (pokerHand) {
              return (
                <Hand key={`${index + 1}`} cards={cards} hand={pokerHand} />
              );
            }
          })}
        </div>
      </div>
    );
  }
}
