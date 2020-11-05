// https://tutorialedge.net/nodejs/writing-your-own-logging-system-nodejs/

// import the File System library
const fs = require("fs")
  
// import path
  , path = require('path')

// Objeto principal
  , Logger = {}

// Create 3 sets of write streams for the 3 levels of logging we wish to do
// every time we get an error we'll append to our error streams, any debug message
// to our debug stream etc...
  , infoStream = fs.createWriteStream(path.resolve(__dirname, 'logs', 'info.txt'))

// Notice we set the path of our log files in the first parameter of
// fs.createWriteStream. This could easily be pulled in from a config
// file if needed.
  , errorStream = fs.createWriteStream(path.resolve(__dirname, 'logs', 'error.txt'))

// createWriteStream takes in options as a second, optional parameter
// if you wanted to set the file encoding of your output file you could
// do so by setting it like so: ('logs/debug.txt' , { encoding : 'utf-8' });
  , debugStream = fs.createWriteStream(path.resolve(__dirname, 'logs', 'debug.txt'));


// Finally we create 3 different functions
// each of which appends our given messages to
// their own log files along with the current date as an
// iso string and a \n newline character
Logger.info = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  infoStream.write(message);
};

Logger.debug = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  debugStream.write(message);
};

Logger.error = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  errorStream.write(message);
};

module.exports = (req, res, next) => {

}


/*
var express = require("express");
var router = new express.Router();
// Here we import our Logger file and instantiate a logger object
var logger = require("./logger").Logger;

router.use(function timeLog(req, res, next) {
  // this is an example of how you would call our new logging system to log an info message
  logger.info("Test Message");
  next();
});

router.get("/", function(req, res) {
  res.send("Home Page");
});

module.exports = router; */