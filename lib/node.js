var validate = require('./path-validate');

var treeNodeFactory = module.exports = function (tree, path) {
   validate(path);
   var node = Object.create(treeNodePrototype);

};

var treeNodePrototype = module.exports.prototype = Object.create(Object, {
    data: {
        enumerable: true,
        writable: true,
        configurable: false,
        set: function () {}
    },
    children: {
        enumerable: true,
        writable: false,
        configurable: false,
        get: function () {}
    }
});
