var test       = require('tape'),
    Int64      = require('node-int64'),
    createTree = require('..')

test('tree', function (t) {
    var tree = createTree()

    t.equal(typeof tree, 'function'             , 'is a function')
    t.equal(typeof tree.createStream, 'function', 'createStream is a function')
    t.equal(tree.pnodeCount, 1                  , 'has an initial pnodeCount of 1')
    t.equal(tree.period, 0                      , 'has an period transaction of 0')
    t.equal(tree.transaction, 1                 , 'has an initial transaction of 1')
    t.deepEqual(tree.pxid, new Int64(0,1)       , 'has an initial pxid of Int64(0,1)')
    t.equal(typeof tree.pnode, 'object'         , '.pnode is a prototype')
    t.equal(tree('/a/b').path, '/a/b'           , 'returns a pnode object with path equal to selection')
    tree('/a').persist()
    t.equal(tree.transaction, 2                 , 'transaction is incremented with tree additions')
    tree('/a').data = 'test'
    t.equal(tree.transaction, 3                 , 'transaction is incremented with tree changes')
    tree('/a').remove()
    t.equal(tree.transaction, 4                 , 'transaction is incremented with tree removals')

    t.end()
})
