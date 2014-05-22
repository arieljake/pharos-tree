var test       = require('tape'),
    createTree = require('..')

test('tree', function (t) {
    var tree = createTree()

    t.ok(typeof tree === 'function'                               , 'is a function')
    t.ok(typeof tree.createStream === 'function'                  , 'createStream is a function')
    t.ok(tree.nodeCount === 1                                     , 'has an initial nodeCount of 1')
    t.ok(typeof tree.node === 'object'                            , '.node is a prototype')
    t.ok(tree('/a/b').path === '/a/b'                             , 'returns a node object with path equal to selection')

    t.end()
})

test('tree.createStream', function (t) {
    var tree     = createTree(),
        stream   = tree.createStream(),
        Readable = require('stream').Readable

    t.ok(Readable.prototype.isPrototypeOf(stream)                 , 'returns a Readable stream')

    t.end();
});

test('change stream', function (t) {
    var tree      = createTree(),
        objStream = tree.createStream( {objectMode:true} ),
        bufStream = tree.createStream(),
        bufExpected = '{"op":"create","node":{"path":"/test"}}\n'

    t.plan(6)
    objStream.on('data', function (data) {
        t.ok(typeof data === 'object'                             , 'in object mode emits objects')
        t.deepEqual(JSON.stringify(data)+'\n', bufExpected        , 'in object mode emits proper data')
        objStream.close()
    })
    bufStream.on('data', function (data) {
        t.ok(typeof data === 'string'                             , 'in simple mode emits strings')
        t.deepEqual(data, bufExpected                             , 'in simple mode emits proper data')
        bufStream.close()
    })
    objStream.on('end', function () {
        t.pass(                                                     'in object mode emits end when close() is called')
    })
    bufStream.on('end', function () {
        t.pass(                                                     'in simple mode emits end when close() is called')
    })
    tree('/test').persist()
});

test('node', function (t) {
    var tree = createTree(),
        node = tree('/is/a/test')
    function chPath () {
        'use strict';
        node.path = '/is/another/test'
    }

    t.ok(tree.node.isPrototypeOf(node)                            , 'was created from tree.node prototype')
    t.ok(node.path === '/is/a/test'                               , 'path matches selection')
    t.doesNotThrow(chPath, Error                                  , 'permits path change before persisted')
    t.ok(node.path === '/is/another/test'                         , 'path reflects change')

    t.end()
})

test('node.persist()', function (t) {
    var tree = createTree(),
        node = tree('/is/a/test')
    function chPath () {
        'use strict';
        node.path = '/is/a/test'
    }
    function persistInvalid () {
        tree('a/b').persist()
    }

    t.ok(node.persist() === node                                  , 'returns reference to node')
    t.ok(node.persist() === node                                  , 'returns reference to node again')
    t.throws(chPath, Error                                        , 'freezes path')
    t.throws(persistInvalid, Error                                , 'throws an error on invalid paths')

    t.end()
})

test('node.exists', function (t) {
    var tree  = createTree(),
        node1 = tree('/test1').persist(),
        node2 = tree('/test2'),
        node3 = tree()

    t.ok(node1.exists                                             , 'is true when node is persisted')
    t.notOk(node2.exists                                          , 'is false when node is not persisted')
    t.notOk(node3.exists                                          , 'is false when node has no path')

    t.end()
})

test('node.data', function (t) {
    var tree = createTree(),
        node = tree('/test')
    function assign () {
        node.data = 'stuff'
    }

    t.doesNotThrow(assign                                         , 'can be assigned')
    t.ok(node.exists                                              , 'assignment causes node to persist')
    t.ok(node.data === 'stuff'                                    , 'can be read after assignent')

    t.end()
})

test('node.set()', function (t) {
    var tree = createTree(),
        node = tree('/test')

    t.ok(node.set('stuff') === node                               , 'returns node')
    t.ok(node.exists                                              , 'causes node to persist')
    t.ok(node.data === 'stuff'                                    , 'can be read after assignent')

    t.end()
})

test('node.unset()', function (t) {
    var tree = createTree(),
        node = tree('/test')

    t.plan(6)

    var changeCount = 0
    tree.createStream( {objectMode:true} ).on('data', function (event) {
        console.log(event)
        if (event.op !== 'change') return
        changeCount++
        t.ok(changeCount === 1                                    , 'does not emit a change unless there was a value')
        t.ok(event.node.data === undefined                        , 'emits a change whwn a value existed')
    })

    t.doesNotThrow(node.unset.bind(node)                          , 'can be called before value is set')
    t.ok(node.set('stuff').unset() === node                       , 'returns node')
    t.ok(node.exists                                              , 'does not unpersist node')
    t.ok(node.data === undefined                                  , 'causes data to be undefined')
})

test('root node', function (t) {
    var tree = createTree(),
        root = tree('/')
    function chPath () {
        'use strict';
        root.path = '/something/else'
    }
    function rm () {
        root.remove()
    }

    t.ok(root.path === '/'                                        , 'path is /')
    t.throws(chPath, Error                                        , 'does not permit path change')
    t.ok(root.parent === undefined                                , 'has an undefined parent')
    t.throws(rm, Error                                            , 'cannot be removed')

    t.end()
})

test('select', function (t) {
    var tree = createTree()

    t.end()
})
