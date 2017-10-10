const traverse = require('babel-traverse').default
const parse = require('../../parse')
const { getTagName } = require('../jsx-opening-element')

describe('jsx-opening-element', () => {
  test('normal tag', () => {
    const code = `const elem = <Foo />`
    traverse(parse(code), {
      JSXOpeningElement (path) {
        const tagName = getTagName(path.node)
        expect(tagName).toBe('Foo')
      }
    })
  })
  test('member expression tag', () => {
    const code = `const elem = <Foo.Bar />`
    traverse(parse(code), {
      JSXOpeningElement (path) {
        const tagName = getTagName(path.node)
        expect(tagName).toBe('Foo.Bar')
      }
    })
  })
  test('nested member expression tag', () => {
    const code = `const elem = <Foo.Bar.Baz />`
    traverse(parse(code), {
      JSXOpeningElement (path) {
        const tagName = getTagName(path.node)
        expect(tagName).toBe('Foo.Bar.Baz')
      }
    })
  })
})
