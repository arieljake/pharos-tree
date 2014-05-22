var test  = require('tape'),
    valid = require('../lib/valid-path')

test('valid-path', function (t) {
    t.notOk(valid({})             , ' requires a string')
    t.notOk(valid('a/b/c')        , ' requires a leading /')
    t.notOk(valid('/a/b/c/')      , ' prohibits a trailing /')
    t.notOk(valid('/$')           , ' prohibits $')
    t.notOk(valid('/%')           , ' prohibits %')
    t.notOk(valid('/!')           , ' prohibits !')
    t.ok(valid('/')               , ' allows valid path /')
    t.ok(valid('/a/b/c')          , ' allows valid path /a/b/c')
    t.ok(valid('/a/b/c/d_-e.txt') , ' allows valid path /a/b/c/d_-e.txt')

    t.end()
})
