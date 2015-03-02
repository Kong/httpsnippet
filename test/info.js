'use strict';

var async  = require('async');
var should = require('should');
var targets = require('../src/targets');

var isSingleTarget = function (key, cb) {
  cb(typeof targets[key] === 'function');
};

var isTargetFamily = function (key, cb) {
  cb(typeof targets[key] !== 'function');
};

async.filter(Object.keys(targets), isSingleTarget, function (results) {
  async.each(results, function (key) {
    describe(key + '.info()', function () {
      it('should have info method', function (done) {
        var target = targets[key];

        target.should.have.property('info');
        target.info.should.be.a.Function;

        var info = target.info();

        info.key.should.be.a.String.and.equal(key);
        info.should.not.have.property('family');

        info.title.should.be.a.String;
        info.extname.should.be.a.String;

        done();
      });
    });
  });
});

async.filter(Object.keys(targets), isTargetFamily, function (families) {
  async.each(families, function (family) {
    describe(family + ' _familyInfo()', function () {
      var target = targets[family];

      it('should have _familyInfo method', function (done) {
        target.should.have.property('_familyInfo');
        target._familyInfo.should.be.a.Function;

        var info = target._familyInfo();

        info.key.should.be.a.String.and.equal(family);

        info.title.should.be.a.String;
        info.extname.should.be.a.String;

        done();
      });
    });

    async.each(Object.keys(targets[family]), function (key) {
      var target = targets[family][key];

      if (key === '_familyInfo') {
        return;
      }

      describe(family + '[' + key + ']' + '.info()', function () {
        it('should have info method', function (done) {
          target.should.have.property('info');
          target.info.should.be.a.Function;

          var info = target.info();

          info.key.should.be.a.String.and.equal(key);

          info.title.should.be.a.String;
          info.family.should.be.a.String;

          done();
        });
      });
    });
  });
});
