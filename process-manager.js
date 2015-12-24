'use strict';
const fs = require('fs');
const path = require('path');
const ps  = require('ps-node');
const pidPath = path.join(process.cwd(), 'pid');

console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
console.log('STARTING PID:', process.pid);

ps.lookup({ command: 'dir-sink', psargs:'ux' }, function(err, processes) {
  if(err) {
    console.error(err);
    return console.error(err.stack);
  }
  processes.forEach( p => {
    if(p.pid == process.pid) { return; }
    console.log('killing old daemon pid', p.pid);
    process.kill(p.pid)
  });
});

process.title = 'dir-sink';

fs.writeFileSync(pidPath, process.pid);