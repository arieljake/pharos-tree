var test       = require('tape'),
    createTree = require('..')

test('node.persist()', function (t) {
    var tree = createTree(),
        node = tree('/is/a/test')
    function chPath () {
        'use strict';
        node.path = '/is/a/test'
    }
    function persistInvalid () {
        tree('a/b').persist()
    }

    t.ok(node.persist() === node  , 'returns reference to node')
    t.ok(node.persist() === node  , 'returns reference to node again')
    t.throws(chPath, Error        , 'freezes path')
    t.throws(persistInvalid, Error, 'throws an error on invalid paths')

    t.end()
})
