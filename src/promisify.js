module.exports = f => (...args) => {
  return new Promise((resolve, reject) => {
    const cb = (err, result) => {
      if (err) reject(err)
      resolve(result)
    }
    f(...args, cb)
  })
}
