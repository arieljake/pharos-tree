var test       = require('tape'),
    createTree = require('..')

test('pnode.parent', function (t) {
    var tree  = createTree(),
        pnode = tree('/is/a/test')

    t.equal(pnode.parent.path, '/is/a'     , 'parent of /is/a/test is /is/a')
    pnode.persist()
    t.ok(pnode.parent.exists               , 'parent exists after pnode is persisted')
    t.equal(pnode.parent.children.length, 1, 'parent has one child')
    t.notEqual(pnode
        .parent
        .children
        .indexOf(pnode), -1                , 'parent.children contains pnode')
    t.equal(tree('bad/').parent, undefined , 'parent is undefined when path is invalid')

    t.end()
})
