var test       = require('tape'),
    pharosTree = require('..')

test('change stream', function (t) {
    var ptree        = pharosTree(),
        objStream    = ptree.createStream( {objectMode:true} ),
        bufStream    = ptree.createStream(),
        bufExpected0 = '{"op":"create","pnode":{"path":"/test","data":1,"version":1}}\n',
        bufExpected1 = '{"op":"change","pnode":{"path":"/test","data":2,"version":2}}\n',
        bufExpected2 = '{"op":"remove","pnode":{"path":"/test","data":2,"version":2}}\n',
        objRcvd      = [],
        bufRcvd      = []

    t.plan(10)
    objStream.on('data', function (data) { objRcvd.push(data) })
    bufStream.on('data', function (data) { bufRcvd.push(data) })
    objStream.on('end', function () {
        t.pass(                                                    'in object mode emits end when close() is called')
    })
    bufStream.on('end', function () {
        t.pass(                                                    'in simple mode emits end when close() is called')
    })
    ptree('/test').set(1)
    ptree('/test').set(2)
    ptree('/test').remove()
    setImmediate(function () {
        t.equal(typeof objRcvd[0],                                 'object', 'in object mode emits objects')
        t.deepEqual(JSON.stringify(objRcvd[0])+'\n', bufExpected0, 'in object mode emits proper create event 1st')
        t.deepEqual(JSON.stringify(objRcvd[1])+'\n', bufExpected1, 'in object mode emits proper change event 2nd')
        t.deepEqual(JSON.stringify(objRcvd[2])+'\n', bufExpected2, 'in object mode emits proper remove event 3rd')
        t.equal(typeof bufRcvd[0], 'string',                       'in simple mode emits strings')
        t.deepEqual(bufRcvd[0], bufExpected0,                      'in simple mode emits proper create event 1st')
        t.deepEqual(bufRcvd[1], bufExpected1,                      'in simple mode emits proper change event 2nd')
        t.deepEqual(bufRcvd[2], bufExpected2,                      'in simple mode emits proper remove event 3rd')
        bufStream.close()
        objStream.close()
    })
});
