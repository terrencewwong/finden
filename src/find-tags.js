const traverse = require('babel-traverse').default
const t = require('babel-types')
const parse = require('./parse')
const { getSource, getLocals } = require('./node-utils/import-declaration')
const { getTagName } = require('./node-utils/jsx-opening-element')

function findTags (code, pattern) {
  let targetImports = []
  const tags = {}
  const ast = parse(code)

  traverse(ast, {
    ImportDeclaration (path) {
      const { node } = path
      const source = getSource(node)
      const locals = getLocals(node)

      if (source.match(pattern)) {
        // Don't care about duplicates because seems unnecessary for now?
        targetImports = targetImports.concat(locals)
      }
    },
    JSXOpeningElement (path) {
      const { node } = path
      const { line } = node.loc.start
      const tagName = getTagName(node)

      if (tags[tagName]) {
        tags[tagName].push(line)
      } else {
        tags[tagName] = [line]
      }
    }
  })

  const matchedTags = Object.entries(
    tags
  ).reduce((currentTags, [tagName, lineNumbers]) => {
    if (targetImports.includes(tagName)) {
      currentTags[tagName] = lineNumbers
    }

    return currentTags
  }, {})

  return matchedTags
}

module.exports = findTags
