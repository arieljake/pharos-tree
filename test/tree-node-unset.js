var test       = require('tape'),
    createTree = require('..')

test('node.unset()', function (t) {
    var tree = createTree(),
        node = tree('/test')

    var changeCount = 0
    tree.createStream( {objectMode:true} ).on('data', function (event) {
        if (event.op !== 'change') return
        changeCount++
        t.ok(changeCount === 1             , 'does not emit a change unless there was a value')
        t.ok(event.node.data === undefined , 'emits a change whwn a value existed')
    })

    t.plan(6)
    t.doesNotThrow(node.unset.bind(node)   , 'can be called before value is set')
    t.ok(node.set('stuff').unset() === node, 'returns node')
    t.ok(node.exists                       , 'does not unpersist node')
    t.ok(node.data === undefined           , 'causes data to be undefined')
})
