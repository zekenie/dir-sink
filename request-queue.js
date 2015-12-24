'use strict';
const request = require('./request');
const _ =   require('lodash');
const defaultLoader = require('./defaultLoader');
const EventEmitter = require('events').EventEmitter;
/**
 * queue for a single server
 */
class RequestQueue extends EventEmitter {
  constructor(domain) {
    super();
    this.queue = [];
  }

  request(options) {
    return request(_.extend(defaultLoader(), options));
  }

  /**
   * endpoint
   * fieldName
   * filepath
   */
  enqueue(options) {
    this.queue.push(options);
    if(!this.ticking) { this.tick(); }
  }

  tick() {
    let self = this;
    this.ticking = true;
    if(!this.queue.length){ 
      this.ticking = false;
      return; 
    }
    let options = this.queue.shift();
    this.request(options)
      .then( response => {
        try{
          this.emit('response', { filepath: options.filepath, response });
        } catch(e) {
          console.error(e, e.stack);
        }
      } )
      .then( () => this.tick() )
      .catch( (e) => {
        console.error(e);
        console.error(e.stack);
        this.tick();
      });
  }
}

module.exports = RequestQueue;