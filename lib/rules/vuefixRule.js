/**
 * create default js code block for vue when use config:
 * 'rules': {"vuefix/vuefix": [{init: true}]}
 */
const options = require('../options')

const INIT_CONTENT = [
    'export default {',
    '    data: () => ({',
    '        title: \'title\'',
    '    }),',
    '    props: {},',
    '    computed: {},',
    '    methods: {',
    '        hello () {',
    '            // your business',
    '        }',
    '    },',
    '    components: {}',
    '}'
]

module.exports = {
    create: function(context) {
        let config = options.set(context.options[0] || {})

        return {
            Program: function checkEmpty(node) {
                if (!config.init) {
                    return
                }

                const sourceCode = context.getSourceCode(),
                    src = sourceCode.getText()

                if (src && src.trim().toLowerCase() === 'vue') {
                    const location = {
                        column: node.loc.start.column,
                        line: node.loc.start.line
                    }

                    // code block indent
                    let indent = src.replace(/vue\s+/, '')
                    let range = node.body[0]

                    context.report({
                        node,
                        loc: location,
                        message: 'auto generate vue block',
                        fix: function(fixer) {
                            return fixer.replaceTextRange([range.start, range.end], INIT_CONTENT.map(function(line) {
                                return indent + line
                            }).join(''))
                        }
                    })
                }
            }
        }
    }
}
