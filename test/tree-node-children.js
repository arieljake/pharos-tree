var test       = require('tape'),
    createTree = require('..')

test('pnode.children', function (t) {
    var tree   = createTree(),
        child1 = tree('/a/1').persist(),
        child2 = tree('/a/2').persist(),
        child3 = tree('/a/3'),
        pnode  = tree('/a')

    t.equal(tree('/b').children.length, 0  , 'should be empty on a new pnode')
    t.ok(pnode.exists                      , 'should cause parent to exist after persisted')
    t.equal(pnode.children.length, 2       , 'should have a length = to number of children persisted')
    t.equal(pnode.children.pop(), child2   , '.pop() should return last child added')
    t.equal(pnode.children.length, 2       , 'should not be mutated by array ops')
    pnode.children.pop().data = 'hi'
    t.equal(pnode.children.pop().data, 'hi', 'should reflect changes to children')

    t.end()
})
