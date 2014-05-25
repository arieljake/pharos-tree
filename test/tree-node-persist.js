var test       = require('tape'),
    createTree = require('..')

test('pnode.persist()', function (t) {
    var tree  = createTree(),
        pnode = tree('/is/a/test')
    function chPath () {
        'use strict';
        pnode.path = '/is/a/test'
    }
    function persistInvalid () {
        tree('a/b').persist()
    }

    t.equal(pnode.persist(), pnode, 'returns reference to pnode')
    t.equal(pnode.persist(), pnode, 'returns reference to pnode again')
    t.throws(chPath, Error        , 'freezes path')
    t.throws(persistInvalid, Error, 'throws an error on invalid paths')

    t.end()
})
