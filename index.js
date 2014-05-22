var Readable  = require('stream').Readable,
    Transform = require('stream').Transform,
    validPath = require('./lib/valid-path'),
    error     = require('./lib/error')

module.exports = function createTree () {
    'use strict';
    var data       = Object.create(null),
        numStreams = 0,
        changes    = new Readable({ objectMode: true })
    changes._read  = function _read () {}

    // create stream of changes
    function createStream (options) {
        options = options || {}

        var stream = new Transform( {objectMode:true} )
        stream._transform = function _transform (chunk, encoding, cb) {
            stream.push(options.objectMode ? chunk : JSON.stringify(chunk)+'\n')
        }
        stream._write = function _write () {
            stream._transform.apply(this, arguments)
        }
        stream.close = function close () {
            setImmediate(function () {
                stream.push(null)
                changes.unpipe(stream)
            })
            numStreams--
        }
        changes.pipe(stream)
        numStreams++
        return stream
    }
    // feed change streams
    function feed(op, node) {
        if (numStreams > 0) changes.push({op:op, node:node})
    }

    // tree node factory
    function createNode (path) {
        var node = new TreeNode
        node.path = path
        return node
    }
    // tree node persist
    function persistNode (node) {
        if (!validPath(node.path)) throw error('INVALIDPATH', 'invalid path: ' + node.path)
        Object.defineProperty(node, 'path', {enumerable:true, configurable: false, writable: false, value:node.path})
        data[node.path] = node
        return node
    }
    // tree node prototype
    function TreeNode () {}
    TreeNode.prototype = Object.create(Object, {
        // properties
        path: { enumerable:true, configurable:true, writable:true, value:undefined },
        exists: { enumerable:true, get: function () {
            if (!this.path) return false
            return data[this.path] ? true : false
        } },
        data: { enumerable: true, set: function (value) {
            var same = (this._data === value)
            this._data = value
            if (data[this.path] && !same) feed('change', this)
            else if (!data[this.path]) this.persist()
        }, get: function () {
            return this._data
        } },
        parent: { enumerable: true, get: function () {
        } },
        children: { enumerable: true, get: function () {
        } },
        // functions
        persist: { value: function () {
            if (data[this.path]) return this
            feed('create', this)
            return persistNode(this)
        } },
        set: { value: function (value) {
            this.data = value
            return this
        } },
        unset: { value: function () {
            if (this.hasOwnProperty('_data')) {
                delete this._data
                feed('change', this)
            }
            return this
        } },
        remove: { value: function () {
            if (data[this.path]) {
                delete data[this.path]
                feed('remove', this)
            }
            return this
        } },
        child: { value: function () {
        } },
        addChild: { value: function () {
        } },
        removeChild: { value: function () {
        } }
    })
    // expose prototype for extending, modifying, and isPrototypeOf
    Object.defineProperty(tree, 'node', { value: TreeNode.prototype })

    // tree entry point / selector
    function tree (path) {
        return data[path] || createNode(path)
    }
    Object.defineProperties(tree, {
        // tree node count getter
        nodeCount: { enumerable: true, get: function () {
            return Object.keys(data).length
        } },
        // stream tree changes
        createStream: { value: createStream },
        // expose tree node prototype
        node: { value: TreeNode.prototype }
    })

    // initialize root node
    var rootNode = createNode('/').persist()
    Object.defineProperties(rootNode, {
        remove: { value: function () {
            throw new Error('Can not remove root node.')
        } },
        parent: { enumerable: true, value: undefined }
    })

    return tree
}
