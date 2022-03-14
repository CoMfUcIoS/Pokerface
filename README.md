# Poker Face
Reads input from a file and convert the specified hands.

### Prerequisites
- nodejs = 10.16.3 <https://nodejs.org/en/>
- npm >=6.9.0 [`npm install -g npm@latest`]

### Installing dependencies:
- `npm install`

### make cli executable
- `chmod a+x ./cli.js`

### Using the cli command
```
./cli.js -f test.hands
```

### Starting UI
```
npm run start
```
Then open http://localhost:8080/ with your favourite browser

### Using the API
```
npm run start
```
Then you can CURL the API like this
```
curl --data 'hand=AS 2S 4S 3H 5H' http://localhost:8080/api/identify-hand
```

### Running unit tests and getting line coverage
```
npm run test
```
Also you can check line coverage per file in your favourite browser.  Open coverage/index.html