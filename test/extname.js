'use strict';

var async  = require('async');
var should = require('should');
var targets = require('../src/targets');

async.each(Object.keys(targets), function (target) {
  describe(target + '.extname()', function () {
    it('should have extname method', function (done) {
      targets[target].should.have.property('extname');
      targets[target].extname.should.be.a.Function;

      done();
    });
  });
});
