var validate = require('./path-validate');

module.exports = function (path) {
    validate(path);

    if (path === '/') {
        return [];
    }

    var components = path.split('/');
    components = components.slice(0, components.length - 1).map(function (val, idx) {
        return idx === 0 ? '/' : components.slice(0, idx+1).join('/');
    });

    return components;
};
