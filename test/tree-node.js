var test       = require('tape'),
    createTree = require('..'),
    Int64      = require('node-int64'),
    isInt64    = Int64.prototype.isPrototypeOf.bind(Int64.prototype)

test('pnode', function (t) {
    var tree  = createTree(),
        pnode = tree('/is/a/test')
    function chPath () {
        'use strict';
        pnode.path = '/a/test'
    }

    t.ok(tree.pnode.isPrototypeOf(pnode)   , 'was created from tree.pnode prototype')
    t.equal(pnode.path, '/is/a/test'       , 'path matches selection')
    t.equal(pnode.name, 'test'             , 'name is last component of path')
    t.equal(pnode.version, undefined       , 'version is undefined before persisted')
    t.equal(pnode.cpxid, undefined         , 'cpxid is undefined before persisted')
    t.equal(pnode.mpxid, undefined         , 'mpxid is undefined before persisted')
    t.equal(pnode.ctime, undefined         , 'ctime is undefined before persisted')
    t.equal(pnode.mtime, undefined         , 'mtime is undefined before persisted')
    t.doesNotThrow(chPath, Error           , 'permits path change before persisted')
    t.equal(pnode.path, '/a/test'          , 'path reflects change')
    t.equal(pnode.set('x').data, 'x'       , 'data === x after set(x)')
    t.ok(isInt64(pnode.cpxid)              , 'cpxid is an Int64 after persisted')
    t.ok(isInt64(pnode.mpxid)              , 'mpxid is an Int64 after persisted')
    t.equal(pnode.ctime.constructor, Date  , 'ctime is a Date after persisted')
    t.equal(pnode.mtime.constructor, Date  , 'mtime is a Date after persisted')
    var ctime = pnode.ctime,
        mtime = pnode.mtime,
        cpxid = pnode.cpxid,
        mpxid = pnode.mpxid
    t.equal(pnode.version, 1               , 'version is 1 after persist')
    pnode.data = 'y'
    t.equal(pnode.version, 2               , 'version is 2 after 1st change')
    t.equal(pnode.ctime, ctime             , 'ctime does not change')
    t.equal(pnode.cpxid, cpxid             , 'cpxid does not change')
    t.ok(pnode.mtime > mtime               , 'mtime is more recent after change')
    t.ok(pnode.mpxid > mpxid               , 'mpxid is larger after change')

    t.end()
})
