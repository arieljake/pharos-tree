var Readable = require('stream').Readable;
var validate = require('./lib/path-validate');

var treeFactory = module.exports = function () {
    var data = Object.create(null);

    // tree entry point
    var tree = function (path) {
        validate(path);
        return data[path] || create(path);
    };
    Object.defineProperties(tree, {
        // tree node count getter
        nodeCount: { enumerable: true, get: function () {
            return Object.keys(data).length;
        } },
        // stream tree changes
        createStream: { value: function () {
            var stream = Object.create(Readable.prototype);
            stream._read = function () {};
            Readable.call(stream);
            return stream;
        } },
        // tree node prototype
        node: { value: Object.create(Object, {
            set: { value: function () {
            } },
            unset: { value: function () {
            } },
            remove: { value: function () {
            } },
            child: { value: function () {
            } },
            addChild: { value: function () {
            } },
            removeChild: { value: function () {
            } },
            data: { enumerable: true, set: function () {
            } },
            parent: { enumerable: true, get: function () {
            } },
            children: { enumerable: true, get: function () {
            } }
        }) }
    });

    // create temporary nodes that get written to tree on-demand
    var create = function (path) {
        return Object.create(tree.node, {
            path: { enumerable: true, value: path }
        });
    };

    // populate root with custom node
    data['/'] = Object.create(tree.node, {
        remove: { value: function () {
            throw new Error('Can not remove root node.');
        } },
        parent: { enumerable: true, value: undefined }
    });

    return tree;
};
