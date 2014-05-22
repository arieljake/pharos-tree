var test       = require('tape'),
    createTree = require('..')

test('node.exists', function (t) {
    var tree  = createTree(),
        node1 = tree('/test1').persist(),
        node2 = tree('/test2'),
        node3 = tree()

    t.ok(node1.exists   , 'is true when node is persisted')
    t.notOk(node2.exists, 'is false when node is not persisted')
    t.notOk(node3.exists, 'is false when node has no path')

    t.end()
})
