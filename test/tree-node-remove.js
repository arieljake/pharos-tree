var test       = require('tape'),
    createTree = require('..')

test('pnode.remove()', function (t) {
    var tree   = createTree(),
        root   = tree('/'),
        pnode  = tree('/a/b').set('test'),
        child1 = tree('/a/b/c').set(1),
        child2 = tree('/a/b/d').set(2)


    t.equal(pnode.remove().exists, false   , 'results in an unpersisted pnode')
    t.equal(tree('/a').children.length, 0  , 'removes pnode from parent.children')
    t.equals(pnode.remove(), pnode         , 'has no affect on an unpersisted pnode')
    t.throws(root.remove.bind(root), Error , 'throws an error on root pnode')
    t.ok(!child1.exists && !child2.exists  , 'removes children')

    t.end()
})
