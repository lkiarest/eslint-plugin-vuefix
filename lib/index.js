'use strict'

const vueProcessor = require('./processors/vueProcessor')
const rule = require('./rules/vuefixRule')

module.exports.rules = {
    'vuefix': rule
}

module.exports.processors = {
    '.vue': vueProcessor
}
