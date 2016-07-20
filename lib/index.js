'use strict'

const processor = require('./processors/vueProcessor')

module.exports.processors = {
    '.vue': processor
}
