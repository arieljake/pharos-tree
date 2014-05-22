var valid = /(^\/$)|(^(\/[a-zA-Z0-9_.-]+)+$)/

module.exports = function validPath (path) {
    if (!path) return false
    if (path.constructor !== String) return false
    if (!path.match(valid)) return false
    return true
}
