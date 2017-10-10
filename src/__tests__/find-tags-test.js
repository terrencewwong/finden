const { readFileSync } = require('fs')
const search = require('../find-tags')

const PATTERN = 'ui-library'

describe('search', () => {
  test('generates report', () => {
    const code = readFileSync(__dirname + '/fixtures/input.js.txt', {
      encoding: 'utf8'
    })

    const results = search(code, PATTERN)

    expect(results).toEqual(require('./fixtures/expected.json'))
  })
})
