const promisify = require('../promisify')

const asynchronousFunc = ({ error, value }, cb) => {
  if (error) {
    cb(error)
  }
  cb(null, value)
}
const func = promisify(asynchronousFunc)

describe('promisify', () => {
  test('rejects properly', () => {
    const error = new Error()
    return func({ error }).catch(e => {
      expect(e).toBe(error)
    })
  })
  test('resolves properly', () => {
    const value = 'it resolved!'
    return func({ value }).then(data => {
      expect(data).toBe(value)
    })
  })
})
