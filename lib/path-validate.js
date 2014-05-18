var assert = require('assert');
var validPath = /(^\/$)|(^(\/[a-zA-Z0-9_.]+)+$)/;

module.exports = function (path) {
    assert(path.constructor === String, 'path must be a string');
    assert(path.match(validPath), 'invalid path');
};
