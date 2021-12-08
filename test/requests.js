/* global describe, it */

'use strict'

const fixtures = require('./fixtures')
const HTTPSnippet = require('../src')
const targets = require('../src/targets')
const shell = require('child_process')
const util = require('util')

const should = require('should')

const base = './test/fixtures/output/'
const requests = [
  'application-form-encoded',
  'application-json',
  'cookies',
  'custom-method',
  'headers',
  'https',
  'multipart-data',
  'multipart-form-data',
  'short'
]

// test all the things!
fixtures.cli.forEach(function (cli) {
  describe(targets[cli.target].info.title + ' Request Validation', function () {
    cli.clients.forEach(function (client) {
      requests.forEach(function (request) {
        it(client + ' request should match mock for ' + request, function (done) {
          let stdout = ''
          const fixture = cli.target + '/' + client + '/' + request + HTTPSnippet.extname(cli.target)
          const command = util.format(cli.run, base + fixture)

          const ls = shell.exec(command)

          ls.stdout.on('data', function (data) {
            stdout += data
          })

          ls.on('exit', function (code) {
            if (code !== 0) {
              console.error(stdout)
              should.fail(0, code, `Process '${cli.run.split(' ')[0]}' exited unexpectedly with code ${code}`)
            }

            let har
            try {
              har = JSON.parse(stdout)
            } catch (err) {
              err.should.be.null()
            }

            // Clone the fixture we're testing against to another object because for multipart/form-data cases we're
            // deleting the header, and if we don't clone the fixture to another object, that deleted header will cause
            // other tests to fail because it's missing where other tests are expecting it.
            const fixture = JSON.parse(JSON.stringify(fixtures.requests[request]))

            // make an exception for multipart/form-data
            if (fixture.headers) {
              fixture.headers.forEach(function (header, index) {
                if (header.name.toLowerCase() === 'content-type' && header.value === 'multipart/form-data') {
                  delete fixture.headers[index]
                }
              })
            }

            har.should.have.property('log')
            har.log.should.have.property('entries').and.be.Array()
            har.log.entries[0].should.have.property('request')
            // BUG: Mockbin returns http url even when request is for https url
            if (request !== 'https') {
              har.log.entries[0].request.should.containDeep(fixture)
            }
            done()
          })
        })
      })
    })
  })
})
