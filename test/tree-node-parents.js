var test       = require('tape'),
    createTree = require('..')

test('pnode.parents', function (t) {
    var tree    = createTree(),
        pnode   = tree('/is/a/test'),
        parents = pnode.parents

    t.equal(parents.length, 3                  , 'length of /is/a/test is 3')
    t.equal(parents[0].path, '/'               , '[0] of /is/a/test is /')
    t.equal(parents[1].path, '/is'             , '[1] of /is/a/test is /is')
    t.equal(parents[2].path, '/is/a'           , '[2] of /is/a/test is /is/a')

    pnode.persist()
    parents = pnode.parents
    t.equal(parents[0], tree('/')              , '[0] returns reference to / after persist')
    t.equal(parents[1], tree('/is')            , '[1] returns reference to /is after persist')
    t.equal(parents[2], tree('/is/a')          , '[2] returns reference to /is/a after persist')

    t.equal(pnode.parents.pop(), tree('/is/a') , 'pop() returns reference to /is/a after persist')
    t.equal(pnode.parents.length, 3            , 'is unaffected by in-place array manipulations')

    t.equal(tree('bad/path').parents, undefined, 'is undefined for invalid pnodes')

    t.end()
})
