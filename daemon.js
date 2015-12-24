'use strict';

const directoryManager = require('./directory-manager');
const defaultLoader = require('./defaultLoader');
const Watcher = require('./watcher');
require('./process-manager');

directoryManager.list()
    .map( directory => {
      const options = defaultLoader(directory);
      options.directory = directory;
      return options;
    })
    .map(options => new Watcher(options).watch() );

