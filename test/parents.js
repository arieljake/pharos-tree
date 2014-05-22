var test    = require('tape'),
    parents = require('../lib/parents')

test('parents', function (t) {
    var abcParents = [
        '/',
        '/a',
        '/a/b'
    ]

    t.deepEqual(parents('/'), []               , 'of / returns empty array')
    t.deepEqual(parents('/a/b/c'), abcParents  , 'of /a/b/c returns expected array')
    t.ok(parents(null) === undefined           , 'returns undefined when not provided a path')

    t.end()
})

test('parents.immediate', function (t) {
    t.ok(parents.immediate('/') === null       , 'of / returns null')
    t.ok(parents.immediate('/a/b/c') === '/a/b', 'of /a/b/c returns /a/b')
    t.ok(parents.immediate(null) === undefined , 'returns undefined when not provided a path')

    t.end()
})
