var child_process = require('child_process');
const { Readable } = require('stream');
const fs = require('fs');

var timer = setInterval(function(){
  var child = child_process.fork('../worker/child.js');
  child.send('');
  child.on('message', function(msg) {
    const readable = Readable.from(msg);
    readable.pipe(process.stdout);
    
    //to write in file
    const writable = fs.createWriteStream('file.txt', {flags:'a'});
    readable.pipe(writable);
  });
  child.on('close', (code) =>{
    console.log(`child process exited with code ${code}`);
  });
}, 5000);

