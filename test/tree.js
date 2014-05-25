var test       = require('tape'),
    Int64      = require('node-int64'),
    pharosTree = require('..')

test('ptree', function (t) {
    var ptree = pharosTree()

    t.equal(typeof ptree, 'function'             , 'is a function')
    t.equal(typeof ptree.createStream, 'function', 'createStream is a function')
    t.equal(ptree.pnodeCount, 1                  , 'has an initial pnodeCount of 1')
    t.equal(ptree.period, 0                      , 'has an period transaction of 0')
    t.equal(ptree.transaction, 1                 , 'has an initial transaction of 1')
    t.deepEqual(ptree.pxid, new Int64(0,1)       , 'has an initial pxid of Int64(0,1)')
    t.equal(typeof ptree.pnode, 'object'         , '.pnode is a prototype')
    t.equal(ptree('/a/b').path, '/a/b'           , 'returns a pnode object with path equal to selection')
    ptree('/a').persist()
    t.equal(ptree.transaction, 2                 , 'transaction is incremented with ptree additions')
    ptree('/a').data = 'test'
    t.equal(ptree.transaction, 3                 , 'transaction is incremented with ptree changes')
    ptree('/a').remove()
    t.equal(ptree.transaction, 4                 , 'transaction is incremented with ptree removals')

    t.end()
})
