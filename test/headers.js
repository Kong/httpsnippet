'use strict'

const helpers = require('../src/helpers/headers')
const should = require('should')

const headers = {
  'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
  accept: 'application/json'
}

describe('Headers', function () {
  describe('#getHeader', () => {
    it('should get a header', () => {
      helpers.getHeader(headers, 'content-type').should.eql('multipart/form-data; boundary=---011000010111000001101001')
      helpers.getHeader(headers, 'content-TYPE').should.eql('multipart/form-data; boundary=---011000010111000001101001')
      helpers.getHeader(headers, 'Accept').should.eql('application/json')

      should.not.exist(helpers.getHeader(headers, 'authorization'))
    })
  })

  describe('#getHeaderName', () => {
    it('should get a header name', () => {
      helpers.getHeaderName(headers, 'content-type').should.eql('Content-Type')
      helpers.getHeaderName(headers, 'content-TYPE').should.eql('Content-Type')
      helpers.getHeaderName(headers, 'Accept').should.eql('accept')

      should.not.exist(helpers.getHeaderName(headers, 'authorization'))
    })
  })

  describe('#hasHeader', () => {
    it('should return if a header is present', () => {
      helpers.hasHeader(headers, 'content-type').should.be.true()
      helpers.hasHeader(headers, 'content-TYPE').should.be.true()
      helpers.hasHeader(headers, 'Accept').should.be.true()

      helpers.hasHeader(headers, 'authorization').should.be.false()
    })
  })
})
