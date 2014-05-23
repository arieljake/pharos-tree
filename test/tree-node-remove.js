var test       = require('tape'),
    createTree = require('..')

test('node.remove()', function (t) {
    var tree   = createTree(),
        root   = tree('/'),
        node   = tree('/a/b').set('test'),
        child1 = tree('/a/b/c').set(1),
        child2 = tree('/a/b/d').set(2)


    t.equal(node.remove().exists, false    , 'results in an unpersisted node')
    t.equal(tree('/a').children.length, 0  , 'removes node from parent.children')
    t.equals(node.remove(), node           , 'has no affect on an unpersisted node')
    t.throws(root.remove.bind(root), Error , 'throws an error on root node')
    t.ok(!child1.exists && !child2.exists  , 'removes children')

    t.end()
})
