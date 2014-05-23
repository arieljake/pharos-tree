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

    t.equal(root.path, '/'        , 'path is /')
    t.equal(root.name, '/'        , 'name is /')
    t.equal(root.parent, null     , 'parent is null')
    t.throws(chPath, Error        , 'does not permit path change')
    t.throws(rm, Error            , 'cannot be removed')

    t.end()
})
