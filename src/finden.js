#!/usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')
const search = require('./search')

commander
  .version(pkg.version)
  .arguments('<pattern> [glob]')
  .parse(process.argv)

const [pattern, glob = '**/*.js'] = commander.args

search({
  pattern,
  glob
}).catch(e => {
  console.error(e)
})
