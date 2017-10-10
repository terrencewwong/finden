const babylon = require('babylon')

module.exports = function (code) {
  return babylon.parse(code, {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    plugins: [
      'jsx',
      'flow',
      'doExpressions',
      'objectRestSpread',
      'decorators',
      'classProperties',
      'exportExtensions',
      'asyncGenerators',
      'functionBind',
      'functionSent',
      'dynamicImport',
      'numericSeparator',
      'importMeta',
      'optionalCatchBinding',
      'optionalChaining',
      'classPrivateProperties'
    ]
  })
}
