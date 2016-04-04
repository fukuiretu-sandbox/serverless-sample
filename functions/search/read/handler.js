'use strict';

var Elasticsearch = require('elasticsearch'),
  _ = require('lodash'),
  client = new Elasticsearch.Client({
    host: '192.168.33.12:9200',
    log: 'trace'
  });

module.exports.handler = function(event, context) {
  client.search({
    index: 'ldgourmet',
    type: 'restaurant',
    body: {
      query: {
        match: {
          name: event.word
        }
      }
    }
  }).then(function (resp) {
    var hits = resp.hits.hits;
    _(hits).each(function(v) {
      console.log('name:' + v._source.name);
    })
  }, function (err) {
    console.trace(err.message);
  });

  return context.done(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!'
  });
};
