var test       = require('tape'),
    pharosTree = require('..')

test('pnode.childrenVersion', function (t) {
    var ptree = pharosTree(),
        pnode = ptree('/a').persist()

    t.equal(pnode.childrenVersion, undefined, 'is undefined until a child is added')
    pnode.child('b').persist()
    t.equal(pnode.childrenVersion, 1        , 'is 1 after first child is added')
    ptree('/a/c').persist()
    t.equal(pnode.childrenVersion, 2        , 'is 2 after 2nd child is added')
    pnode.child('b').remove()
    t.equal(pnode.childrenVersion, 3        , 'is incremented when a child is removed')
    ptree('/a/c/d').persist()
    t.equal(pnode.childrenVersion, 3        , 'is not incremented on grandchild additions')

    t.end()
})
