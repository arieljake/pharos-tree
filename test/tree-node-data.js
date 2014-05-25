var test       = require('tape'),
    pharosTree = require('..')

test('pnode.data', function (t) {
    var ptree       = pharosTree(),
        pnode       = ptree('/test'),
        changeCount = 0
    function assign (v) {
        return function () {
            pnode.data = v
        }
    }
    ptree.createStream( {objectMode:true} ).on('data', function (event) {
        if (event.op !== 'change') return
        changeCount++
        t.ok(changeCount === 1     , 'reassignment with same value should not produce change event')
    })

    t.plan(6)
    t.doesNotThrow(assign('stuff') , 'can be assigned')
    t.ok(pnode.exists              , 'assignment causes pnode to persist')
    t.equal(pnode.data, 'stuff'    , 'can be read after assignent')
    t.doesNotThrow(assign('stuff') , 'can be reassigned same value')
    t.doesNotThrow(assign('things'), 'can be changed')
})
