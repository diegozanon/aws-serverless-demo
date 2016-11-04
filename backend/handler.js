'use strict';

var AWS = require('aws-sdk');

// function that helps making queries
const queryData = (query, callback) => {
  const simpledb = new AWS.SimpleDB();
  simpledb.select({ SelectExpression: query }, callback);
};

// query temperature
const buildTemperatureQuery = (input) => {
  // sanitize the input confirming that it's a number
  const locationId = Number(input);
  return `select Value from Weather where ID = '${locationId}'`;
};

module.exports.currentTemperature = (event, context, callback) => {
  
  const param = event.queryStringParameters;
  const input = param ? param.id : 0;
  const query = buildTemperatureQuery(input);
  queryData(query, (err, resp) => {    

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },  
      body: JSON.stringify({
        temperature: resp.Items ? resp.Items[0].Attributes[0].Value : null,
        locationId: param ? param.id : undefined
      })
    };

    callback(err, response);
  });
};