/* global describe, it */

'use strict'

const fixtures = require('./fixtures')
const HTTPSnippet = require('../src')
const targets = require('../src/targets')
const shell = require('child_process')
const util = require('util')

require('should')

var base = './test/fixtures/output/'
var requests = [ 'application-form-encoded',
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
    cli.clients.forEach(client => {
      requests.forEach(request => {
        it(client + ' request should match mock for ' + request, function (done) {
          var stdout = ''
          var fixture = cli.target + '/' + client + '/' + request + HTTPSnippet.extname(cli.target)
          var command = util.format(cli.run, base + fixture)

          var ls = shell.exec(command)

          ls.stdout.on('data', function (data) {
            stdout += data
          })

          ls.on('exit', function (code) {
            try {
              var har = JSON.parse(stdout)
            } catch (err) {
              err.should.be.null
            }

            // make an exception for multipart/form-data
            if (fixtures.requests[request].headers) {
              fixtures.requests[request].headers.forEach((header, index) => {
                if (header.name === 'content-type' && header.value === 'multipart/form-data') {
                  delete fixtures.requests[request].headers[index]
                }
              })
            }

            har.should.have.property('log')
            har.log.should.have.property('entries').and.be.Array
            har.log.entries[0].should.have.property('request')
            har.log.entries[0].request.should.containDeep(fixtures.requests[request])

            done()
          })
        })
      })
    })
  })
})
