// makeText.js

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

function makeTextFromFile(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

async function makeTextFromURL(url) {
  try {
    let res = await axios.get(url);
    generateText(res.data);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
}

let [method, path] = process.argv.slice(2);

if (method === 'file') {
  makeTextFromFile(path);
} else if (method === 'url') {
  makeTextFromURL(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}