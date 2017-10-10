const globby = require('globby')
const fs = require('fs')
const promisify = require('./promisify')
const findTags = require('./find-tags')

const readFileP = promisify(fs.readFile)

const isEmptyObject = obj => !Object.keys(obj).length

async function findTagsInFiles (paths, pattern) {
  const tagPromises = paths.map(async path => {
    const code = await readFileP(path, 'utf8')
    const tags = findTags(code, pattern)

    return {
      path,
      tags
    }
  })

  const tagsByPath = (await Promise.all(
    tagPromises
  )).reduce((currentReport, { path, tags }) => {
    if (!isEmptyObject(tags)) {
      currentReport[path] = tags
    }

    return currentReport
  }, {})

  return tagsByPath
}

async function buildReport ({ pattern, glob }) {
  const paths = await globby([glob, '!node_modules/**'])
  return findTagsInFiles(paths, pattern)
}

module.exports = buildReport
