var test       = require('tape'),
    createTree = require('..')

test('pnode.unset()', function (t) {
    var tree  = createTree(),
        pnode = tree('/test')

    var changeCount = 0
    tree.createStream( {objectMode:true} ).on('data', function (event) {
        if (event.op !== 'change') return
        changeCount++
        t.equal(changeCount, 1               , 'does not emit a change unless there was a value')
        t.equal(event.pnode.data, undefined  , 'emits a change whwn a value existed')
    })

    t.plan(7)
    t.doesNotThrow(pnode.unset.bind(pnode)   , 'can be called before value is set')
    t.equal(pnode.set('stuff').unset(), pnode, 'returns pnode')
    t.equal(pnode.version, 2                 , 'increments version')
    t.ok(pnode.exists                        , 'does not unpersist pnode')
    t.equal(pnode.data, undefined            , 'causes data to be undefined')
})
