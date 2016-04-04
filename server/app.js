/* eslint-disable no-console */
var express = require('express');
var app = new express.Router();

app.post('/sms', function getCb(req, res) {
  console.log(req.body);

  var twiml = [
    '<?xml version="1.0" encoding="UTF-8" ?>',
    '<Response>',
    '  <Message>You said: ' + req.body.Body + '</Message>',
    '</Response>'
  ].join('');

  res.set('Content-Type', 'text/xml');
  res.send(twiml);
});

module.exports = app;
