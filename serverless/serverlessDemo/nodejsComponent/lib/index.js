/**
 * Lib
 */

var AWS = require('aws-sdk');

module.exports.respond = function(event, cb) {

  var response = {
    message: "Your Serverless function ran successfully!"
  };

  return cb(null, response);
};

module.exports.queryData = function(query, cb) {

  var simpledb = new AWS.SimpleDB();

  var params = {
    SelectExpression: query,
    ConsistentRead: false,
    NextToken: ''
  };

  simpledb.select(params, function(err, data) {
      return cb(err, data);
  });
};
