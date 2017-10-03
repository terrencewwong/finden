const globby = require('globby')
const mergeWith = require('lodash.mergewith')
const { transformFile } = require('babel-core')
const plugin = require('./babel-plugin-finden')
const syntaxObjectRestSpread = require('babel-plugin-syntax-object-rest-spread')
const syntaxClassProperties = require('babel-plugin-syntax-class-properties')
const syntaxFlow = require('babel-plugin-syntax-flow')

const DEFAULT_OPTIONS = {
  ast: false,
  babelrc: false,
  code: false,
  plugins: []
}
const promisify = f => (...args) => {
  return new Promise((resolve, reject) => {
    const cb = (err, result) => {
      if (err) reject(err)
      resolve(result)
    }
    f(...args, cb)
  })
}
const transform = promisify(transformFile)

module.exports = async function search ({ pattern, glob }) {
  const paths = await globby([glob, '!node_modules/**'])
  const filePromises = paths.map(path => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {
      filename: path,
      plugins: [
        [plugin, { pattern }],
        syntaxObjectRestSpread,
        syntaxClassProperties,
        syntaxFlow
      ]
    })
    return transform(path, options)
  })
  const files = await Promise.all(filePromises)
  const reports = files
    .map(({ options }) => options.report)
    .filter(report => report)
    .reduce((consolidated, report) => {
      return mergeWith({}, consolidated, report, (a, b) =>
        Object.assign({}, a, b)
      )
    }, {})
  console.log(JSON.stringify(reports, null, 2))
}
