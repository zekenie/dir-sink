'use strict';
const RequestQueue = require('./request-queue');
const queues = {};

module.exports = {
  queue: domain => {
    queues[domain] = queues[domain] || new RequestQueue(domain);
    return queues[domain];
  }
};