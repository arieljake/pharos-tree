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
    t.equal(node.path, '/is/a/test'       , 'path matches selection')
    t.equal(node.version, undefined       , 'version is undefined before persisted')
    t.doesNotThrow(chPath, Error          , 'permits path change before persisted')
    t.equal(node.path, '/a/test'          , 'path reflects change')
    t.equal(node.parent.path, '/a'        , 'parent of /a/test is /a')
    t.equal(node.set('x').data, 'x'       , 'data === x after set(x)')
    t.equal(node.version, 1               , 'version is 1 after persist')
    t.ok(node.parent.exists               , 'parent exists after node is persisted')
    t.equal(node.parent.children.length, 1, 'parent has one child')
    t.notEqual(node
        .parent
        .children
        .indexOf(node), -1                , 'parent.children contains node')
    t.equal(tree('bad/').parent, undefined, 'parent is undefined when path is invalid')
    node.data = 'y'
    t.equal(node.version, 2               , 'version is 2 after 1st change')

    t.end()
})
