/* global describe, it */

'use strict'

var helpers = require('../src/helpers')

require('should')

describe('Reducer', function () {
  it('should convert array object pair to key-value object', function (done) {
    var query = [
      {name: 'key', value: 'value'},
      {name: 'foo', value: 'bar'}
    ]

    var obj = query.reduce(helpers.reducer, {})

    obj.should.be.an.Object
    obj.should.eql({key: 'value', foo: 'bar'})

    done()
  })

  it('should convert multi-dimensional arrays to key=[array] object', function (done) {
    var query = [
      {name: 'key', value: 'value'},
      {name: 'foo', value: 'bar1'},
      {name: 'foo', value: 'bar2'}
    ]

    var obj = query.reduce(helpers.reducer, {})

    obj.should.be.an.Object
    obj.should.eql({key: 'value', foo: ['bar1', 'bar2']})

    done()
  })
})
