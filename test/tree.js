var test       = require('tape'),
    createTree = require('..')

test('tree', function (t) {
    var tree = createTree()

    t.ok(typeof tree === 'function'             , 'is a function')
    t.ok(typeof tree.createStream === 'function', 'createStream is a function')
    t.ok(tree.nodeCount === 1                   , 'has an initial nodeCount of 1')
    t.ok(typeof tree.node === 'object'          , '.node is a prototype')
    t.ok(tree('/a/b').path === '/a/b'           , 'returns a node object with path equal to selection')

    t.end()
})
