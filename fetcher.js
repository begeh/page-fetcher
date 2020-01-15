let text = process.argv.slice(2);
let webpage = text[0];
let path = './index.html';
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const request = require('request');
request(webpage, (error, response, body) => {
  if (error) {
    console.log("Site either doesn't exist, or is unavailable");
    process.exit();
  }
  fs.writeFile(path, body, (err) => {
    if (err) {
      console.log("File path is invalid");
      process.exit();
    }
    if (fs.existsSync(path)) {
      rl.question("File already exists. Override?: ('Y' for Yes)  ", (answer) => {
        if (answer !== 'Y') {
          process.exit();
        }
        fs.stat(path, (err, stats) => {
          if (err) throw error;
          console.log(`Downloaded and saved ${stats['size']} bytes to ${path}`);
        });
        rl.close();
      });
    }

  });
});