var test       = require('tape'),
    pharosTree = require('..')

test('pnode.set()', function (t) {
    var ptree = pharosTree(),
        pnode = ptree('/test')

    t.equal(pnode.set('stuff'), pnode, 'returns pnode')
    t.ok(pnode.exists                , 'causes pnode to persist')
    t.equal(pnode.data, 'stuff'      , 'can be read after assignent')

    t.end()
})
