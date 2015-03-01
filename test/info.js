'use strict';

var async  = require('async');
var should = require('should');
var targets = require('../src/targets');

async.each(Object.keys(targets), function (target) {
  describe(target + '.info()', function () {
    it('should have info method', function (done) {
      targets[target].should.have.property('info');
      targets[target].info.should.be.a.Function;

      done();
    });
  });
});
