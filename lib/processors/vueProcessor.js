'use strict'

const parse5 = require('parse5')
const fs = require('fs')

let fullOffset = 0
let fullOffsetChars = 0

let content = ''
let fixer = require('./fixer');

var getFullOffset = function (filename) {
    content = fs.readFileSync(filename, 'utf-8');
    content = content.replace(/\r\n/g, '\n');
    const fragments = parse5.parseFragment(content, {
        locationInfo: true
    }).childNodes
    for (let i = 0; i < fragments.length; i++) {
        let frag = fragments[i]
        if (frag.tagName === 'script') {
            fullOffset = frag.__location.line - 1
            fullOffsetChars = frag.__location.startOffset + 8
            break;
        }
    }
};

module.exports = {
    preprocess: function (text, filename) {
        getFullOffset(filename);

        const fragments = parse5.parseFragment(text, {
            locationInfo: true
        }).childNodes

        for (let i = 0; i < fragments.length; i++) {
            let frag = fragments[i]
            if (frag.tagName === 'script') {
                return [frag.childNodes[0].value]
            }
        }
        return ['']
    },
    postprocess: function (messages, filename) {
        var m0 = messages[0];
        m0.forEach(function (m) {
            m.line += fullOffset
            if (m.fix) {
                m.fix.range[0] += fullOffsetChars
                m.fix.range[1] += fullOffsetChars
            }
        })

        let oldLen = m0.length
        if (oldLen > 0) {
            let res = fixer.applyFixes({
                text: content
            }, m0)

            if (res.fixed && res.messages.length !== oldLen) {
                m0 = res.messages
                fs.writeFileSync(filename, res.output, 'utf-8');
            }
        }

        m0.forEach(function (m) {
            m.line -= fullOffset
        });

        return m0
    }
}
