#!/usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')
const buildReport = require('./build-report')

commander
  .version(pkg.version)
  .arguments('<pattern> [glob]')
  .parse(process.argv)

const [pattern, glob = '**/*.js'] = commander.args

buildReport({
  pattern,
  glob
})
  .then(data => {
    console.log(data)
  })
  .catch(e => {
    console.error(e)
  })
