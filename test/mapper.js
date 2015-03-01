'use strict';

var mapper = require('../src/mapper');

require('should');

describe('Mapper', function () {
  it('should convert array object pair to key-value object', function (done) {
    var obj = {};

    var query = [
      {name: 'key', value: 'value'},
      {name: 'foo', value: 'bar'}
    ];

    query.map(mapper(obj));

    obj.should.be.an.Object;
    obj.should.eql({key: 'value', foo: 'bar'});

    done();
  });

  it('should convert multi-dimentional arrays to key=[array] object', function (done) {
    var obj = {};

    var query = [
      {name: 'key', value: 'value'},
      {name: 'foo', value: 'bar1'},
      {name: 'foo', value: 'bar2'}
    ];

    query.map(mapper(obj));

    obj.should.be.an.Object;
    obj.should.eql({key: 'value', foo: ['bar1', 'bar2']});

    done();
  });
});
