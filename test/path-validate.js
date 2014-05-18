var test  = require('tape')
,   validate = require('../lib/path-validate');

test('validate-path', function (t) {
    t.throws(function () {
        validate({});
    }, Error, 'requires a string');

    t.throws(function () {
        validate('a/b/c');
    }, Error, 'requires a leading /');

    t.throws(function () {
        validate('/a/b/c/');
    }, Error, 'prohibits a trailing /');

    t.throws(function () {
        validate('/$');
    }, Error, 'prohibits $');

    t.throws(function () {
        validate('/%');
    }, Error, 'prohibits %');

    t.throws(function () {
        validate('/!');
    }, Error, 'prohibits !');

    t.doesNotThrow(function () {
        validate('/');
        validate('/a/b/c');
        validate('/a/b/c/d_e.txt');
    }, Error, 'allows valid paths');

    t.end();
});
