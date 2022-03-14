import request from 'supertest';
import app from '.';

describe('Express server', () => {
  it('/ respond with html ', done => {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.be.equal(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Poker Face</title>
<link rel="shortcut icon" href="favicon.ico"></head>
<body>
    <div id="root"></div>
<script type="text/javascript" src="js/runtime.js"></script><script type="text/javascript" src="js/npm.core-js.js"></script><script type="text/javascript" src="js/npm.material-ui.js"></script><script type="text/javascript" src="js/npm.babel.js"></script><script type="text/javascript" src="js/npm.emotion.js"></script><script type="text/javascript" src="js/npm.prop-types.js"></script><script type="text/javascript" src="js/npm.react-transition-group.js"></script><script type="text/javascript" src="js/npm.react-dom.js"></script><script type="text/javascript" src="js/npm.react-is.js"></script><script type="text/javascript" src="js/npm.react.js"></script><script type="text/javascript" src="js/npm.scheduler.js"></script><script type="text/javascript" src="js/npm.webpack.js"></script><script type="text/javascript" src="js/npm.karlandin.js"></script><script type="text/javascript" src="js/npm.babel-polyfill.js"></script><script type="text/javascript" src="js/npm.clsx.js"></script><script type="text/javascript" src="js/npm.css-loader.js"></script><script type="text/javascript" src="js/npm.css-vendor.js"></script><script type="text/javascript" src="js/npm.deepmerge.js"></script><script type="text/javascript" src="js/npm.hoist-non-react-statics.js"></script><script type="text/javascript" src="js/npm.hyphenate-style-name.js"></script><script type="text/javascript" src="js/npm.is-in-browser.js"></script><script type="text/javascript" src="js/npm.is-plain-object.js"></script><script type="text/javascript" src="js/npm.isobject.js"></script><script type="text/javascript" src="js/npm.jss-plugin-camel-case.js"></script><script type="text/javascript" src="js/npm.jss-plugin-default-unit.js"></script><script type="text/javascript" src="js/npm.jss-plugin-global.js"></script><script type="text/javascript" src="js/npm.jss-plugin-nested.js"></script><script type="text/javascript" src="js/npm.jss-plugin-props-sort.js"></script><script type="text/javascript" src="js/npm.jss-plugin-rule-value-function.js"></script><script type="text/javascript" src="js/npm.jss-plugin-vendor-prefixer.js"></script><script type="text/javascript" src="js/npm.jss.js"></script><script type="text/javascript" src="js/npm.lodash.js"></script><script type="text/javascript" src="js/npm.object-assign.js"></script><script type="text/javascript" src="js/npm.react-card-flip.js"></script><script type="text/javascript" src="js/npm.regenerator-runtime.js"></script><script type="text/javascript" src="js/npm.style-loader.js"></script><script type="text/javascript" src="js/npm.tiny-warning.js"></script><script type="text/javascript" src="js/main.js"></script></body>

</html>`);
        done();
      });
  });

  describe('/api/identify-hand', () => {
    it('Not valid data posted ', done => {
      request(app)
        .post('/api/identify-hand')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({
            error: true,
            message: 'Not a valid Poker hand',
          });
          done();
        });
    });

    it('Post array less than 5 elements ', done => {
      request(app)
        .post('/api/identify-hand')
        .send({ hand: '7S 2H' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({
            error: true,
            message: 'Not a valid Poker hand',
          });
          done();
        });
    });

    it('Post array more than 5 elements ', done => {
      request(app)
        .post('/api/identify-hand')
        .send({
          hand: 'AS 2H 8S 2H 3S 4H 5H',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({
            error: true,
            message: 'Not a valid Poker hand',
          });
          done();
        });
    });

    it('Post a invalid hand ', done => {
      request(app)
        .post('/api/identify-hand')
        .send({
          hand: 'AA 2H 3S 4H 5H',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({
            error: true,
            message: 'Not a valid Poker hand',
          });
          done();
        });
    });

    it('Post a valid hand ', done => {
      request(app)
        .post('/api/identify-hand')
        .send({
          hand: 'AH 2H 3S 4H 5H',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, (err, res) => {
          expect(res.body).to.be.deep.equal({ hand: 'Straight' });
          done();
        });
    });
  });
});
