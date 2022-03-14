import { delay, readFile } from './utils';

async function testFn(ms) {
  await delay(ms);
  return true;
}

describe('Client utils', () => {
  describe('delay func', () => {
    it('delay util func no params', async () => {
      const timeStarted = new Date().getTime();
      const run = await testFn();
      const timeEnded = new Date().getTime();
      expect(timeEnded - timeStarted).to.be.within(1000, 1015);
      expect(run).to.be.true;
    });

    it('delay util func 100ms delay', async () => {
      const timeStarted = new Date().getTime();
      const run = await testFn(100);
      const timeEnded = new Date().getTime();
      expect(timeEnded - timeStarted).to.be.within(100, 115);
      expect(run).to.be.true;
    });
  });
  describe('Read file func', () => {
    it('Read file without providing a file', done => {
      const test = readFile();
      test.catch(error => {
        expect(error).to.equal('Please provide a file');
        done();
      });
    });
    it('Read file ', done => {
      const testFile = new Blob(['hello', ' ', 'world'], {
        type: 'text/plain',
      });
      const test = readFile(testFile);
      test.then(data => {
        expect(data).to.deep.equal({
          name: undefined,
          value: 'hello world',
        });
        done();
      });
    });
  });
});
