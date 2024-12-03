const fs = require('fs');
let files = fs.readdirSync('./days');
let exec = require('child_process').exec;

exec(
  `node ./days/${files[files.length - 1]}`,
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  }
);
