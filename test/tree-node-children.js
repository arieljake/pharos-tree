var test       = require('tape'),
    pharosTree = require('..')

test('pnode.children', function (t) {
    var ptree  = pharosTree(),
        child1 = ptree('/a/1').persist(),
        child2 = ptree('/a/2').persist(),
        child3 = ptree('/a/3'),
        pnode  = ptree('/a')

    t.equal(ptree('/b').children.length, 0  , 'should be empty on a new pnode')
    t.ok(pnode.exists                      , 'should cause parent to exist after persisted')
    t.equal(pnode.children.length, 2       , 'should have a length = to number of children persisted')
    t.equal(pnode.children.pop(), child2   , '.pop() should return last child added')
    t.equal(pnode.children.length, 2       , 'should not be mutated by array ops')
    pnode.children.pop().data = 'hi'
    t.equal(pnode.children.pop().data, 'hi', 'should reflect changes to children')

    t.end()
})
