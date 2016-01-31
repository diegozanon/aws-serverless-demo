/**
 * Lib
 */

var AWS = require('aws-sdk');

// Need to add the Access Key here, since the Lambda function will need access to connect to the SimpleDB
// Attention to avoid committing this sensitive data by accident
AWS.config.update({accessKeyId: 'accessKeyId', secretAccessKey: 'secretAccessKey'});

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
