var test       = require('tape'),
    Int64      = require('node-int64'),
    createTree = require('..')

test('tree.incPeriod()', function (t) {
    var tree = createTree()

    t.equal(tree.incPeriod(), 1          , 'returns the new period')
    t.deepEqual(tree.pxid, new Int64(1,0), 'increments Int64 hi bits and resets low to 0')

    t.end()
})
