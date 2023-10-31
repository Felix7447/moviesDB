const { createRequire } = require('node:module')

const requireR = createRequire(import.meta.url)

const readJSON = path => requireR(path)

module.exports = readJSON
