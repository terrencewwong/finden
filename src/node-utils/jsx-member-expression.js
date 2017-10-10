const t = require('babel-types')
const jsxIdentifier = require('./jsx-identifier')

function getTagName (node) {
  const { object, property } = node
  const propertyName = jsxIdentifier.getTagName(property)

  if (t.isJSXIdentifier(object)) {
    return jsxIdentifier.getTagName(object) + '.' + propertyName
  }

  return getTagName(object) + '.' + propertyName
}

module.exports = {
  getTagName
}
