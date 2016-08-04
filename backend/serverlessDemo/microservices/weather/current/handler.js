'use strict';

var AWS = require('aws-sdk');

function queryData(query, cb) {
  var simpledb = new AWS.SimpleDB();

  var params = {
    SelectExpression: query,
    ConsistentRead: false,
    NextToken: ''
  };

  simpledb.select(params, function(err, data) {
    return cb(err, data);
  });
}

module.exports.handler = function(event, context, cb) {
  // sanitize the input confirming that it's a number
  var regionId = Number(event.regionId);
  var query = "select Value from Weather where ID = " + regionId;

  queryData(query, function(err, response) {
    return cb(err, {
      value: response.Items[0].Attributes[0].Value
    });
  });
};
