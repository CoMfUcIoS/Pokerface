import chai, { expect, assert } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import mochaSnapshots from 'mocha-snapshots';

mochaSnapshots.setup({
  sanitizeClassNames: false,
});

chai.use(sinonChai);

const jsdom = new JSDOM(`
  <!doctype html>
  <html>
    <body>
      <div id="root"></div>
      <script src="/bundle.js"></script>
    </body>
  </html>
`);

const { window } = jsdom;

configure({ adapter: new Adapter() });

/**
 * Copies properties from one object to another
 *
 * @param {object} src Object to get the properties from
 * @param {object} target Object to copy the properties to
 */
function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = callback => {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = id => {
  clearTimeout(id);
};
global.expect = expect;
global.assert = assert;
global.mount = mount;
global.render = render;
global.shallow = shallow;
global.sinon = sinon;

copyProps(window, global);
