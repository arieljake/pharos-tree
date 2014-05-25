var test       = require('tape'),
    pharosTree = require('..')

test('pnode.persist()', function (t) {
    var ptree = pharosTree(),
        pnode = ptree('/is/a/test')
    function chPath () {
        'use strict';
        pnode.path = '/is/a/test'
    }
    function persistInvalid () {
        ptree('a/b').persist()
    }

    t.equal(pnode.persist(), pnode, 'returns reference to pnode')
    t.equal(pnode.persist(), pnode, 'returns reference to pnode again')
    t.throws(chPath, Error        , 'freezes path')
    t.throws(persistInvalid, Error, 'throws an error on invalid paths')

    t.end()
})
