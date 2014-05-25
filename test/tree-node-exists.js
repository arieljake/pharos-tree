var test       = require('tape'),
    createTree = require('..')

test('pnode.exists', function (t) {
    var tree   = createTree(),
        pnode1 = tree('/test1').persist(),
        pnode2 = tree('/test2'),
        pnode3 = tree()

    t.ok(pnode1.exists   , 'is true when pnode is persisted')
    t.notOk(pnode2.exists, 'is false when pnode is not persisted')
    t.notOk(pnode3.exists, 'is false when pnode has no path')

    t.end()
})
