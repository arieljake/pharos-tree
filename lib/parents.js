var validPath = require('./valid-path')

module.exports = function parents (path) {
    if (!path) return undefined
    if (path === '/') {
        return []
    }

    var components = path.split('/'),
        list       = []
    for (var i = 0; i < components.length -1; i++)
        list[i] = (i === 0 ? '/' : components.slice(0, i+1).join('/'))

    return list
}
module.exports.immediate = function (path) {
    if (!path) return undefined
    if (path === '/') return null
    var components = path.split('/').slice(0, -1)
    return components.length === 1 ? '/' : components.join('/')
}
