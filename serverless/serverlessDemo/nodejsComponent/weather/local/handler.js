'use strict';

/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../../lib');

module.exports.handler = function(event, context) {

  var query = getWeatherQuery(event);

  lib.queryData(query, function(error, response) {

    var result = {
      value: response.Items[0].Attributes[0].Value
    }

    return context.done(error, result);
  });
};

function getWeatherQuery(event) {

  // I'm ignoring the event input since I want to simplify this demo
  // and avoid the need of sanitizing the input to protect from sql injection

  return "select Value from Weather where ID = '5'";
}
