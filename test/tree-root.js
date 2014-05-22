var test       = require('tape'),
    createTree = require('..')

test('root node', function (t) {
    var tree = createTree(),
        root = tree('/')
    function chPath () {
        'use strict';
        root.path = '/something/else'
    }
    function rm () {
        root.remove()
    }

    t.ok(root.path === '/'        , 'path is /')
    t.throws(chPath, Error        , 'does not permit path change')
    t.ok(root.parent === undefined, 'has an undefined parent')
    t.throws(rm, Error            , 'cannot be removed')

    t.end()
})
