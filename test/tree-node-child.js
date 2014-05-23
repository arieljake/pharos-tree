var test       = require('tape'),
    createTree = require('..')

test('node.child()', function (t) {
    var tree   = createTree(),
        node   = tree('/a/b').set('test'),
        child1 = tree('/a/b/c').set(1),
        child2 = tree('/a/b/d').set(2)

    t.equal(node.child('c').data, 1       , 'called on /a/b with arg c returns /a/b/c')
    t.equal(node.child('d').data, 2       , 'called on /a/b with arg d returns /a/b/d')
    t.notOk(node.child('e').exists        , 'will return non-existant nodes')
    t.equal(node.child('e').path, '/a/b/e', 'will return non-existant nodes with expected path')

    t.end()
})
