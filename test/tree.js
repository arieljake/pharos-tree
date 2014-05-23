var test       = require('tape'),
    createTree = require('..')

test('tree', function (t) {
    var tree = createTree()

    t.equal(typeof tree, 'function'             , 'is a function')
    t.equal(typeof tree.createStream, 'function', 'createStream is a function')
    t.equal(tree.nodeCount, 1                   , 'has an initial nodeCount of 1')
    t.equal(tree.version, 1                     , 'has an initial version of 1')
    t.equal(typeof tree.node, 'object'          , '.node is a prototype')
    t.equal(tree('/a/b').path, '/a/b'           , 'returns a node object with path equal to selection')
    tree('/a').persist()
    t.equal(tree.version, 2                     , 'version is incremented with tree additions')
    tree('/a').data = 'test'
    t.equal(tree.version, 3                     , 'version is incremented with tree changes')
    tree('/a').remove()
    t.equal(tree.version, 4                     , 'version is incremented with tree removals')

    t.end()
})
