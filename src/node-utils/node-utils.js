const t = require('babel-types')

const jsxIdentifier = {
  getTagName: node => node.name
}

const jsxMemberExpression = {
  getTagName: node => {
    const { object, property } = node
    const propertyName = jsxIdentifier.getTagName(property)

    if (t.isJSXIdentifier(object)) {
      return jsxIdentifier.getTagName(object) + '.' + propertyName
    }

    return jsxMemberExpression.getTagName(object) + '.' + propertyName
  }
}

const jsxOpeningElement = {
  getTagName: node => {
    const { name } = node
    if (t.isJSXIdentifier(name)) {
      return jsxIdentifier.getTagName(name)
    }

    return jsxMemberExpression.getTagName(name)
  }
}

const importDeclaration = {
  getSource: node => node.source.value,
  getLocals: node => node.specifiers.map(s => s.local.name)
}

module.exports = {
  importDeclaration,
  jsxIdentifier,
  jsxMemberExpression,
  jsxOpeningElement
}
