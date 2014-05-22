var test       = require('tape'),
    createTree = require('..')

test('node.data', function (t) {
    var tree        = createTree(),
        node        = tree('/test'),
        changeCount = 0
    function assign (v) {
        return function () {
            node.data = v
        }
    }
    tree.createStream( {objectMode:true} ).on('data', function (event) {
        if (event.op !== 'change') return
        changeCount++
        t.ok(changeCount === 1     , 'reassignment with same value should not produce change event')
    })

    t.plan(6)
    t.doesNotThrow(assign('stuff') , 'can be assigned')
    t.ok(node.exists               , 'assignment causes node to persist')
    t.ok(node.data === 'stuff'     , 'can be read after assignent')
    t.doesNotThrow(assign('stuff') , 'can be reassigned same value')
    t.doesNotThrow(assign('things'), 'can be changed')
})
