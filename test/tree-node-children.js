var test       = require('tape'),
    createTree = require('..')

test('node.children', function (t) {
    var tree   = createTree(),
        child1 = tree('/a/1').persist(),
        child2 = tree('/a/2').persist(),
        child3 = tree('/a/3'),
        node   = tree('/a')

    t.equal(tree('/b').children.length, 0 , 'should be empty on a new node')
    t.ok(node.exists                      , 'should cause parent to exist after persisted')
    t.equal(node.children.length, 2       , 'should have a length = to number of children persisted')
    t.equal(node.children.pop(), child2   , '.pop() should return last child added')
    t.equal(node.children.length, 2       , 'should not be mutated by array ops')
    node.children.pop().data = 'hi'
    t.equal(node.children.pop().data, 'hi', 'should reflect changes to children')

    t.end()
})
