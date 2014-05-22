var test       = require('tape'),
    createTree = require('..')

test('node.set()', function (t) {
    var tree = createTree(),
        node = tree('/test')

    t.ok(node.set('stuff') === node, 'returns node')
    t.ok(node.exists               , 'causes node to persist')
    t.ok(node.data === 'stuff'     , 'can be read after assignent')

    t.end()
})
