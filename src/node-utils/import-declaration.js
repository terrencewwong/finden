module.exports = {
  getSource: node => node.source.value,
  getLocals: node => node.specifiers.map(s => s.local.name)
}
