var test       = require('tape'),
    createTree = require('..')

test('node', function (t) {
    var tree = createTree(),
        node = tree('/is/a/test')
    function chPath () {
        'use strict';
        node.path = '/a/test'
    }

    t.ok(tree.node.isPrototypeOf(node)    , 'was created from tree.node prototype')
    t.ok(node.path === '/is/a/test'       , 'path matches selection')
    t.doesNotThrow(chPath, Error          , 'permits path change before persisted')
    t.ok(node.path === '/a/test'          , 'path reflects change')
    t.ok(node.parent.path === '/a'        , 'parent of /a/test is /a')
    t.ok(node.set('x').parent.exists      , 'parent exists after node is persisted')
    t.ok(tree('bad/').parent === undefined, 'parent is undefined when path is invalid')

    t.end()
})
