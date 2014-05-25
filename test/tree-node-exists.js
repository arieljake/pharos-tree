var test       = require('tape'),
    pharosTree = require('..')

test('pnode.exists', function (t) {
    var ptree  = pharosTree(),
        pnode1 = ptree('/test1').persist(),
        pnode2 = ptree('/test2'),
        pnode3 = ptree()

    t.ok(pnode1.exists   , 'is true when pnode is persisted')
    t.notOk(pnode2.exists, 'is false when pnode is not persisted')
    t.notOk(pnode3.exists, 'is false when pnode has no path')

    t.end()
})
