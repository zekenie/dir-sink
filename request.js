'use strict';

const fetch = require('node-fetch');
const FormData = require('form-data');
const _ = require('lodash');
const fs = require('fs');

/**
 * A module for sending a file to a place
 * options
   * domain
   * endpoint
   * fieldName
   * filepath
 */
module.exports = (options) => {

  const filename = _.last(options.filepath.split('/'));

  var form = new FormData();
  form.append(options.fieldName, fs.createReadStream(options.filepath));
  form.append('filename', filename);
  options.http.body = form;
  return fetch(options.domain+options.endpoint, options.http)
    .then( res => res.json() )
    .catch( err => console.error(err, err.stack) );
};