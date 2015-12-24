'use strict';

const _ = require('lodash');
const defaultLoader = require('./defaultLoader');
const Gaze = require('gaze').Gaze;
const requestQueueManager = require('./request-queue-manager');
const fs = require('fs');

class Watcher {
  /**
   * options are
   * fieldName
   * domain
   * directory
   * pattern
   * endpoint
   */
  constructor(options) {
    for(let key in options) {
      this[key] = options[key];
    }

    // this.pattern = new RegExp(this.pattern);

    this.gaze = new Gaze(this.pattern, {
      cwd: this.directory
    });


    this.requestQueue = requestQueueManager.queue(this.domain);

    this.requestQueue.on('response', response => {
      fs.unlink(response.filepath, function(err) {
        if(err) { console.error(err); }
      });
    });

  }

  readdir() {

  }

  watch() {
    console.log('starting to watch', this.directory, 'for', this.pattern);

    this.gaze.on('error', err => console.error(err) );

    this.gaze.on('added', filepath => {
      console.log('  > change in', filepath, 'detected');
      this.requestQueue.enqueue({
        fieldName: this.fieldName,
        domain: this.domain,
        endpoint: this.endpoint,
        http: this.http,
        filepath
      });
    });
    
    return this;
  }
}

module.exports = Watcher;