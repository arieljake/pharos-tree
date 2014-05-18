var test   = require('tape')
,   parents = require('../lib/path-parents');

test('path-parents', function (t) {
    t.throws(function () {
        parents('a/b/c');
    }, Error, 'path requires a leading /');

    t.throws(function () {
        parents('/a/b/c/');
    }, Error, 'path prohibits a trailing /');

    t.deepEqual(parents('/'), [], 'of / returns empty array');

    t.deepEqual(parents('/a/b/c'), [
        '/',
        '/a',
        '/a/b'
    ], 'of /a/b/c returns expected array');

    t.end();
});
