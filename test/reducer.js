'use strict'

const reducer = require('../src/helpers/reducer')

require('should')

describe('Reducer', function () {
  it('should convert array object pair to key-value object', function (done) {
    const query = [
      { name: 'key', value: 'value' },
      { name: 'foo', value: 'bar' }
    ]

    const obj = query.reduce(reducer, {})

    obj.should.be.an.Object()
    obj.should.eql({ key: 'value', foo: 'bar' })

    done()
  })

  it('should convert multi-dimensional arrays to key=[array] object', function (done) {
    const query = [
      { name: 'key', value: 'value' },
      { name: 'foo', value: 'bar1' },
      { name: 'foo', value: 'bar2' },
      { name: 'foo', value: 'bar3' }
    ]

    const obj = query.reduce(reducer, {})

    obj.should.be.an.Object()
    obj.should.eql({ key: 'value', foo: ['bar1', 'bar2', 'bar3'] })

    done()
  })
})
