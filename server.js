/* eslint-disable no-console, vars-on-top  */
var express = require('express');
var config = require('./config');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
} else {
  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  var chokidar = require('chokidar');
  var watcher = chokidar.watch('./server');
  watcher.on('ready', function onReady() {
    watcher.on('all', function onAll() {
      console.log('Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach(function each(id) {
        if (/\/server\//.test(id)) delete require.cache[id];
      });
    });
  });
}

// Include server routes as a middleware
app.use(function useCb(req, res, next) {
  require('./server/app')(req, res, next);
});

// Start the webserver
var port = config.port;
var hostname = config.hostname;
app.listen(port, hostname, function listenCb(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://' + hostname + ':' + port);
});
