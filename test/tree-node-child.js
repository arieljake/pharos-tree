var test       = require('tape'),
    pharosTree = require('..')

test('pnode.child()', function (t) {
    var ptree  = pharosTree(),
        pnode  = ptree('/a/b').set('test'),
        child1 = ptree('/a/b/c').set(1),
        child2 = ptree('/a/b/d').set(2)

    t.equal(pnode.child('c').data, 1       , 'called on /a/b with arg c returns /a/b/c')
    t.equal(pnode.child('d').data, 2       , 'called on /a/b with arg d returns /a/b/d')
    t.notOk(pnode.child('e').exists        , 'will return non-existant pnodes')
    t.equal(pnode.child('e').path, '/a/b/e', 'will return non-existant pnodes with expected path')

    t.end()
})
