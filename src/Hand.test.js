import Hand from './Hand';

describe('Hand library tests', () => {
  it('initiate Hand without params', () => {
    const test = new Hand();
    expect(test.cards).to.deep.equal(['ERROR']);
  });

  it('Hand is ordered by rank on init', () => {
    const test = new Hand('KH JS 2H 8H 4H');
    expect(test.cards).to.deep.equal(['2H', '4H', '8H', 'JS', 'KH']);
  });

  describe('Identify Flush', () => {
    it('Flush', () => {
      const test = new Hand('KH JH 2H 8H 4H');
      expect(test.isFlush()).to.equals('Flush');
    });
    it('Not a flush', () => {
      const test = new Hand('KH JS 2H 8H 4H');
      expect(test.isFlush()).to.be.false;
    });
  });
  describe('Identify Straights', () => {
    it('Straight', () => {
      const test = new Hand('AH 3S 2H 5H 4H');
      expect(test.isStraight()).to.equals('Straight');
    });
    it('Straight Flush', () => {
      const test = new Hand('KH JH QH TH 9H');
      expect(test.isStraight()).to.equals('Straight flush');
    });
    it('Royal Flush', () => {
      const test = new Hand('KH JH QH TH AH');
      expect(test.isStraight()).to.equals('Royal flush');
    });
    it('Not a Straight', () => {
      const test = new Hand('KH JS 2H 8H 4H');
      expect(test.isStraight()).to.be.false;
    });
  });

  describe('Identify Pairs and Kinds', () => {
    it('Full house', () => {
      const test = new Hand('2H 2C 2S KC KS');
      expect(test.hasPairs()).to.equals('Full house');
    });
    it('4 of a kind', () => {
      const test = new Hand('9H 9D 3S 9S 9C');
      expect(test.hasPairs()).to.equals('4 of a kind');
    });
    it('3 of a kind', () => {
      const test = new Hand('9C 9H 9S 2H 3S');
      expect(test.hasPairs()).to.equals('3 of a kind');
    });
    it('2 pair', () => {
      const test = new Hand('JH 2C JD 2H 4C');
      expect(test.hasPairs()).to.equals('2 pair');
    });
    it('1 pair', () => {
      const test = new Hand('2C AH 2S 5H KS');
      expect(test.hasPairs()).to.equals('1 pair');
    });
    it('No pairs found', () => {
      const test = new Hand('KH JS 2H 8H 4H');
      expect(test.hasPairs()).to.be.false;
    });
  });

  describe('Identify Poker hand', () => {
    it('High card', () => {
      const test = new Hand('5H 8C 3S KC AS');
      expect(test.identify()).to.equals('High card');
    });
    it('1 pair', () => {
      const test = new Hand('2C AH 2S 5H KS');
      expect(test.identify()).to.equals('1 pair');
    });
    it('2 pair', () => {
      const test = new Hand('JH 2C JD 2H 4C');
      expect(test.identify()).to.equals('2 pair');
    });
    it('3 of a kind', () => {
      const test = new Hand('9C 9H 9S 2H 3S');
      expect(test.identify()).to.equals('3 of a kind');
    });
    it('Straight', () => {
      const test = new Hand('AH 3S 2H 5H 4H');
      expect(test.identify()).to.equals('Straight');
    });
    it('Flush', () => {
      const test = new Hand('KH JH 2H 8H 4H');
      expect(test.identify()).to.equals('Flush');
    });
    it('Full house', () => {
      const test = new Hand('2H 2C 2S KC KS');
      expect(test.identify()).to.equals('Full house');
    });
    it('4 of a kind', () => {
      const test = new Hand('9H 9D 3S 9S 9C');
      expect(test.identify()).to.equals('4 of a kind');
    });
    it('Straight Flush', () => {
      const test = new Hand('KH JH QH TH 9H');
      expect(test.identify()).to.equals('Straight flush');
    });
    it('Royal Flush', () => {
      const test = new Hand('KH JH QH TH AH');
      expect(test.identify()).to.equals('Royal flush');
    });
  });
});
