'use strict';

const fs = require('fs');
const _ = require('lodash');
const path = `${__dirname}/directories`;
fs.openSync(path,'a');
const directories = fs.readFileSync(path, 'utf8').split('\n');

const save = () => {
  fs.writeFile(path, _.uniq(directories).join('\n'), function(err) {
    if(err) {
      console.error('error saving directories file', err);
    }
  });
};

module.exports = {
  list: () => _.clone(_.compact(directories)),
  add: dir => {
    if(fs.statSync(dir).isDirectory()) {
      directories.push(dir);
      save();
    }
  }
};