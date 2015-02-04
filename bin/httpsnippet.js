#!/usr/bin/env node

'use strict';

var commander = require('commander');
var debug = require('debug')('httpsnippet');
var fs = require('fs');
var httpsnippet = require('../src');
var pkg = require('../package.json');

commander
  .version(pkg.version)
  .usage('<file> [options]')
  .option('-l, --language <language>', 'target language')
  .parse(process.argv);

if (commander.args.length == 0 || !commander.language) {
  commander.help();
}

var sources = commander.args.map(function (file) {
  fs.stat(file, function (err, stats) {
    if (err) {
      return debug(err);
    }

    if (stats.isFile()) {
      fs.readFile(file, function (err, data) {
        if (err) {
          return debug(err);
        }

        var har = JSON.parse(data);

        var code = httpsnippet(har, commander.language);

        console.log(code);
      });
    }
  });
});
