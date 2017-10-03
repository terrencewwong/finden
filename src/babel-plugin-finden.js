const jsx = require('babel-plugin-syntax-jsx')

const importMatchesPackage = pkg => x => x.source.includes(pkg)
const extractLocalsFromImport = x =>
  x.specifiers.map(specifier => specifier.local)

module.exports = function ({ types: t }) {
  return {
    inherits: jsx,
    pre (state) {
      const { pattern } = this.opts
      const imports = state.hub.file.metadata.modules.imports
      this.report = {}
      this.targetImports = imports
        .filter(importMatchesPackage(pattern))
        .map(extractLocalsFromImport)
        .reduce((a, b) => a.concat(b), [])
    },
    visitor: {
      JSXOpeningElement (path, state) {
        const { filename } = state.file.opts
        const { tagName, line } = getJSXInfo(path)
        if (this.targetImports.includes(tagName)) {
          this.report[tagName] = this.report[tagName] || { [filename]: [] }
          this.report[tagName][filename].push(line)
        }
      }
    },
    post (state) {
      const { report } = this
      state.opts.report = Object.keys(report).length ? report : null
    }
  }

  function getJSXInfo (path) {
    const line = path.container.openingElement.loc.start.line
    const tagExpr = convertJSXIdentifier(path.node.name, path.node)
    let tagName
    if (t.isIdentifier(tagExpr)) {
      tagName = tagExpr.name
    } else if (t.isLiteral(tagExpr)) {
      tagName = tagExpr.value
    }

    return { tagName, line }
  }

  function convertJSXIdentifier (node, parent) {
    if (t.isJSXIdentifier(node)) {
      if (node.name === 'this' && t.isReferenced(node, parent)) {
        return t.thisExpression()
      } else {
        return t.stringLiteral(node.name)
      }
    } else if (t.isJSXMemberExpression(node)) {
      return t.memberExpression(
        convertJSXIdentifier(node.object, node),
        convertJSXIdentifier(node.property, node)
      )
    }

    return node
  }
}
