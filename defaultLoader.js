'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');

module.exports = directory => {
  directory = directory || os.homedir();
  const filepath = path.join(directory, '.dirsinkrc');
  try {
    const stat = fs.statSync(filepath);

    if(stat.isFile()) {
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
    
  } catch(e) {
    
  }

  return {};
  
};

