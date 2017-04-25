let options = null

module.exports = {
    set: function(opts) {
        options = Object.assign({auto: true, init: true}, opts)
        return options
    },
    get: function() {
        return options
    }
}
