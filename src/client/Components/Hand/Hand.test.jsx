import React from 'react';
import * as utils from 'client/utils';
import Hand from '.';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || 1000));
}
describe('Hand.jsx view', () => {
  it('Renders flipped cards', () => {
    const wrapper = shallow(
      <Hand cards={['JH', '2C', 'JD', '11H', '4C']} hand="1 pair" />,
    );

    expect(wrapper).to.matchSnapshot();
  });

  it('Renders front of cards', async () => {
    const delayStub = sinon.stub(utils, 'delay').returns(true);
    const wrapper = shallow(
      <Hand cards={['JH', '2C', 'JD', '11H', '4C']} hand="1 pair" />,
    );
    await delay(1000);
    wrapper.update();
    expect(wrapper).to.matchSnapshot();
    delayStub.restore();
  });
});
