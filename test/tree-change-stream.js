var test       = require('tape'),
    createTree = require('..')

test('change stream', function (t) {
    var tree      = createTree(),
        objStream = tree.createStream( {objectMode:true} ),
        bufStream = tree.createStream(),
        bufExpected = '{"op":"create","node":{"path":"/test"}}\n'

    t.plan(6)
    objStream.on('data', function (data) {
        t.ok(typeof data === 'object'                     , 'in object mode emits objects')
        t.deepEqual(JSON.stringify(data)+'\n', bufExpected, 'in object mode emits proper data')
        objStream.close()
    })
    bufStream.on('data', function (data) {
        t.ok(typeof data === 'string'                     , 'in simple mode emits strings')
        t.deepEqual(data, bufExpected                     , 'in simple mode emits proper data')
        bufStream.close()
    })
    objStream.on('end', function () {
        t.pass(                                             'in object mode emits end when close() is called')
    })
    bufStream.on('end', function () {
        t.pass(                                             'in simple mode emits end when close() is called')
    })
    tree('/test').persist()
});
