var test       = require('tape'),
    createTree = require('..')

test('node', function (t) {
    var tree = createTree(),
        node = tree('/is/a/test')
    function chPath () {
        'use strict';
        node.path = '/is/another/test'
    }

    t.ok(tree.node.isPrototypeOf(node)   , 'was created from tree.node prototype')
    t.ok(node.path === '/is/a/test'      , 'path matches selection')
    t.doesNotThrow(chPath, Error         , 'permits path change before persisted')
    t.ok(node.path === '/is/another/test', 'path reflects change')

    t.end()
})
