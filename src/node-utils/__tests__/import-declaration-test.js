const traverse = require('babel-traverse').default
const parse = require('../../parse')
const { getSource, getLocals } = require('../import-declaration')

describe('import-declaration', () => {
  test('getSource', () => {
    const code = `import * as UILibrary from 'ui-library'`
    traverse(parse(code), {
      ImportDeclaration (path) {
        const source = getSource(path.node)
        expect(source).toBe('ui-library')
      }
    })
  })

  test('getLocals', () => {
    const code = `import TheDefault, { NamedImport, Other as Aliased } from 'ui-library'`
    traverse(parse(code), {
      ImportDeclaration (path) {
        const locals = getLocals(path.node)
        expect(locals).toEqual(['TheDefault', 'NamedImport', 'Aliased'])
      }
    })
  })
})
