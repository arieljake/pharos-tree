var test       = require('tape'),
    pharosTree = require('..')

test('pnode', function (t) {
    var ptree = pharosTree(),
        pnode = ptree('/is/a/test')
    function chPath () {
        'use strict';
        pnode.path = '/a/test'
    }

    t.ok(ptree.pnode.isPrototypeOf(pnode)   , 'was created from ptree.pnode prototype')
    t.equal(pnode.path, '/is/a/test'       , 'path matches selection')
    t.equal(pnode.name, 'test'             , 'name is last component of path')
    t.equal(pnode.version, undefined       , 'version is undefined before persisted')
    t.equal(pnode.ctxid, undefined         , 'ctxid is undefined before persisted')
    t.equal(pnode.mtxid, undefined         , 'mtxid is undefined before persisted')
    t.equal(pnode.ctime, undefined         , 'ctime is undefined before persisted')
    t.equal(pnode.mtime, undefined         , 'mtime is undefined before persisted')
    t.doesNotThrow(chPath, Error           , 'permits path change before persisted')
    t.equal(pnode.path, '/a/test'          , 'path reflects change')
    t.equal(pnode.set('x').data, 'x'       , 'data === x after set(x)')
    t.equal(pnode.ctxid, ptree.txid        , 'ctxid === tree.txid after persisted')
    t.equal(pnode.mtxid, ptree.txid        , 'mtxid === tree.txid after persisted')
    t.equal(pnode.ctime.constructor, Date  , 'ctime is a Date after persisted')
    t.equal(pnode.mtime.constructor, Date  , 'mtime is a Date after persisted')
    var ctime = pnode.ctime,
        mtime = pnode.mtime,
        ctxid = pnode.ctxid,
        mtxid = pnode.mtxid
    t.equal(pnode.version, 1               , 'version is 1 after persist')
    setTimeout(function () {
        pnode.data = 'y'
        t.equal(pnode.version, 2           , 'version is 2 after 1st change')
        t.equal(pnode.ctime, ctime         , 'ctime does not change')
        t.equal(pnode.ctxid, ctxid         , 'ctxid does not change')
        t.ok(pnode.mtime > mtime           , 'mtime is more recent after change')
        t.ok(pnode.mtxid > mtxid           , 'mtxid is larger after change')

        t.end()
    }, 1)
})
