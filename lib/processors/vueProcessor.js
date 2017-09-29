'use strict'

const parse5 = require('parse5')
const fs = require('fs')
const options = require('../options')
let offsetLine = 0

// let fullOffset = 0
// let fullOffsetChars = 0

let startPart = '', endPart = ''
let scriptContent = ''
let fixer = require('./fixer')

module.exports = {
    preprocess: function (text, filename) {
        startPart = ''
        endPart = ''
        let content = fs.readFileSync(filename, 'utf-8')

        // caculate the real line number in different IDEs
        const fragments = parse5.parseFragment(text, {
            locationInfo: true
        }).childNodes

        for (let i = 0; i < fragments.length; i++) {
            let frag = fragments[i]
            if (frag.tagName === 'script') {
                let location = frag.__location
                offsetLine = location.line - 1
            }
        }

        // save content of file chunks
        const fileInfo = parse5.parseFragment(content, {
            locationInfo: true
        }).childNodes

        for (let i = 0; i < fileInfo.length; i++) {
            let frag = fileInfo[i]
            if (frag.tagName === 'script') {
                let location = frag.__location
                scriptContent = frag.childNodes[0].value
                startPart = content.substring(0, location.startTag.endOffset)
                endPart = content.substring(location.endTag.startOffset)
                return [frag.childNodes[0].value]
            }
        }

        return ['']
    },
    postprocess: function (messages, filename) {
        const config = options.get()
        var m0 = messages[0]

        if (!config || config.auto) {
            let oldLen = m0.length
            if (oldLen > 0) {
                let res = fixer.applyFixes({
                    text: scriptContent
                }, m0)

                if (res.fixed && res.messages.length !== oldLen) {
                    m0 = res.messages
                    fs.writeFileSync(filename, startPart + res.output + endPart, 'utf-8')
                }
            }
        }

        m0 && m0.forEach(function(m) {
            m.line += offsetLine
            m.endLine = m.endLine ? m.endLine + offsetLine : m.line
        })

        // clear cache
        startPart = ''
        endPart = ''
        scriptContent = ''

        return m0
    }
}
