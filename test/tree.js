var test       = require('tape'),
    pharosTree = require('..')

test('ptree', function (t) {
    var ptree = pharosTree()

    t.equal(typeof ptree, 'function'             , 'is a function')
    t.equal(typeof ptree.createStream, 'function', 'createStream is a function')
    t.equal(ptree.pnodeCount, 1                  , 'has an initial pnodeCount of 1')
    t.equal(ptree.txid, 1                        , 'has an initial txid of 1')
    t.equal(typeof ptree.pnode, 'object'         , '.pnode is a prototype')
    t.equal(ptree('/a/b').path, '/a/b'           , 'returns a pnode object with path equal to selection')
    ptree('/a').persist()
    t.equal(ptree.txid, 2                        , 'txid is incremented with ptree additions')
    ptree('/a').data = 'test'
    t.equal(ptree.txid, 3                        , 'txid is incremented with ptree changes')
    ptree('/a').remove()
    t.equal(ptree.txid, 4                        , 'txid is incremented with ptree removals')

    t.end()
})
