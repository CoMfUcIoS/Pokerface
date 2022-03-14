import { get } from 'lodash';
import './index';

describe('Application root', () => {
  it('renders without crashing', () => {
    const rootReactElem = !!get(
      document.getElementById('root'),
      '_reactRootContainer',
      false,
    );
    expect(rootReactElem).to.be.true;
  });
});
