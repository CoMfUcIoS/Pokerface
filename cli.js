#!/usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');
const Hand = require('./src/Hand');

// Creating the Help message and description of flags.
const options = yargs.usage('Usage: -f <file>').option('f', {
  alias: 'file',
  describe: 'txt file containing poker hands per line',
  type: 'string',
  demandOption: true,
}).argv;

// Check if the file provided exists.
if (fs.existsSync(options.file)) {
  // Read the file.
  const readInterface = readline.createInterface({
    input: fs.createReadStream(options.file),
    console: false,
  });

  // Ok now let's iterate file's lines.
  readInterface.on('line', line => {
    // If the line isnt empty
    if (line.length > 0) {
      // Initialize the poker hand from the provided line
      const hand = new Hand(line);
      // Check if the cards provided are valid from a Card deck
      if (hand.isHandValid(hand.cards)) {
        // Log the identified hand..
        console.log(`${line}   =>   ${chalk.green(hand.identify())}`);
      } else {
        // Let user know that those cards arent valid
        console.log(`${line}   =>   ${chalk.red('invalid cards defined')}`);
      }
      // Breakline
      console.log('\n');
    }
  });
} else {
  // Oups ... provided file path doesnt exist.
  console.log(`${chalk.red(`Sorry file ${options.file} cant be found`)}`);
}
