#!/usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')
const search = require('./search')

commander.version(pkg.version)
commander.parse(process.argv)

const pattern = commander.args[0]

search(pattern).catch(e => {
  console.error(e)
})
