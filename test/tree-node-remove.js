var test       = require('tape'),
    createTree = require('..')

test('node.remove()', function (t) {
    var tree = createTree(),
        node = tree('/test')

    t.ok(node.set('stuff').remove().exists === false, 'results in an unpersisted node')
    t.ok(node.remove() === node                     , 'has no affect on an unpersisted node')

    t.end()
})
