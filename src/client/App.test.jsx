import React from 'react';
import { delay } from 'client/utils';
import App from './App';

describe('App.jsx view', () => {
  const sandbox = sinon.createSandbox();
  global.fetch = () => {};
  const wrapper = shallow(<App />);
  let fetchStub;

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(() => {
    fetchStub = sandbox.stub(global, 'fetch');
  });

  it('Renders without crushing', () => {
    expect(wrapper).to.matchSnapshot();
  });

  it('Upload a file with 1 invalid and 1 valid hand', async () => {
    const inputFile = wrapper.find(`input`).at(0);
    fetchStub.onFirstCall().resolves({
      status: 200,
      ok: true,
      json: () => ({
        hand: '1 pair',
      }),
    });
    fetchStub.onSecondCall().resolves({
      status: 200,
      ok: true,
      json: () => ({
        error: true,
        message: 'Invalid Hand',
      }),
    });

    inputFile.simulate('change', {
      currentTarget: {
        files: [
          new File(
            [
              new Blob([
                `3H JS 3C 7C 5D

JH 2C JD 2H CC
`,
              ]),
            ],
            'testFilename',
          ),
        ],
      },
    });
    await delay(1800);
    wrapper.update();
    expect(wrapper).to.matchSnapshot();
  });

  it('Reset the app', async () => {
    await delay(1500);
    wrapper.update();
    const resetButton = wrapper
      .find({
        component: 'span',
      })
      .at(0);
    resetButton.simulate('click');
    await delay(400);
    wrapper.update();

    expect(wrapper.find('#upload-file')).to.have.length(1);
  });
});
