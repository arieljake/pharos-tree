var test    = require('tape'),
    parents = require('../lib/parents')

test('parents', function (t) {
    var abcParents = [
        '/',
        '/a',
        '/a/b'
    ]

    t.deepEqual(parents('/'), []              , ' of / returns empty array')
    t.deepEqual(parents('/a/b/c'), abcParents , ' of /a/b/c returns expected array')

    t.end()
})
