const t = require('babel-types')
const jsxIdentifier = require('./jsx-identifier')
const jsxMemberExpression = require('./jsx-member-expression')

function getTagName (node) {
  const { name } = node
  if (t.isJSXIdentifier(name)) {
    return jsxIdentifier.getTagName(name)
  }

  return jsxMemberExpression.getTagName(name)
}

module.exports = {
  getTagName
}
