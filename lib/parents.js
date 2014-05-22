var validPath = require('./valid-path')
,   error     = require('./error')

module.exports = function parents (path) {
    if (!validPath(path)) throw error('INVALIDPATH', 'invalid path: ' + path)

    if (path === '/') {
        return []
    }

    var components = path.split('/')
    components = components.slice(0, components.length - 1).map(function each (val, idx) {
        return idx === 0 ? '/' : components.slice(0, idx+1).join('/')
    })

    return components
}
