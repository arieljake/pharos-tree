var test       = require('tape'),
    createTree = require('..')

test('pnode.childrenVersion', function (t) {
    var tree  = createTree(),
        pnode = tree('/a').persist()

    t.equal(pnode.childrenVersion, undefined, 'is undefined until a child is added')
    pnode.child('b').persist()
    t.equal(pnode.childrenVersion, 1        , 'is 1 after first child is added')
    tree('/a/c').persist()
    t.equal(pnode.childrenVersion, 2        , 'is 2 after 2nd child is added')
    pnode.child('b').remove()
    t.equal(pnode.childrenVersion, 3        , 'is incremented when a child is removed')
    tree('/a/c/d').persist()
    t.equal(pnode.childrenVersion, 3        , 'is not incremented on grandchild additions')

    t.end()
})
