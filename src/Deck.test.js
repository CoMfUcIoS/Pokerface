import Deck from './Deck';

describe('Deck library tests', () => {
  it('Test if we get a full deck of cards', () => {
    const test = new Deck();
    expect(test.deck.length).to.equal(52);
  });

  it('Check a valid poker hand against a deck of cards', () => {
    const test = new Deck();
    expect(test.isHandValid(['AS', '5H', 'TS', '2H', '3S'])).to.equal(true);
  });

  it('Check an invalid poker hand against a deck of cards', () => {
    const test = new Deck();
    expect(test.isHandValid(['1S', '5H', 'TS', '2H', '3S'])).to.equal(false);
  });
});
