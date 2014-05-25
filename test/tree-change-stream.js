var test       = require('tape'),
    pharosTree = require('..')

test('change stream', function (t) {
    var ptree        = pharosTree(),
        objStream    = ptree.createStream( {objectMode:true} ),
        bufStream    = ptree.createStream(),
        objExpected  = [
            {"op":"create","pnode":{"path":"/test","data":1,"version":1,"ctxid":2,"mtxid":2}},
            {"op":"change","pnode":{"path":"/test","data":2,"version":2,"ctxid":2,"mtxid":3}},
            {"op":"remove","pnode":{"path":"/test","data":2,"version":2,"ctxid":2,"mtxid":3}}
        ],
        objRcvd      = [],
        bufRcvd      = []
    objStream.on('data', function (data) { objRcvd.push(data) })
    bufStream.on('data', function (data) { bufRcvd.push(data) })

    t.plan(54)
    function validate (data, num) {
        console.log(data, objExpected[num])
        var mode = 'object'
        if (typeof data === 'string') {
            mode = 'simple'
            data = JSON.parse(data)
        }
        t.equal(data.op, objExpected[num].op                      , 'produces '+data.op+' event #'+num+' in '+mode+' mode')
        t.equal(data.pnode.path, objExpected[num].pnode.path      , 'produces '+data.op+' event #'+num+' in '+mode+' mode with correct path')
        t.equal(data.pnode.data, objExpected[num].pnode.data      , 'produces '+data.op+' event #'+num+' in '+mode+' mode with correct data')
        t.equal(data.pnode.version, objExpected[num].pnode.version, 'produces '+data.op+' event #'+num+' in '+mode+' mode with correct version')
        t.equal(data.pnode.ctxid, objExpected[num].pnode.ctxid    , 'produces '+data.op+' event #'+num+' in '+mode+' mode with correct ctxid')
        t.equal(data.pnode.mtxid, objExpected[num].pnode.mtxid    , 'produces '+data.op+' event #'+num+' in '+mode+' mode with correct mtxid')
        t.notEqual(new Date(data.pnode.ctime).valueOf(), NaN      , 'produces '+data.op+' event #'+num+' in '+mode+' mode with a date ctime')
        t.notEqual(new Date(data.pnode.mtime).valueOf(), NaN      , 'produces '+data.op+' event #'+num+' in '+mode+' mode with a date mtime')
    }
    objStream.on('end', function () {
        t.pass(                                                     'in object mode emits end when close() is called')
    })
    bufStream.on('end', function () {
        t.pass(                                                     'in simple mode emits end when close() is called')
    })
    ptree('/test').set(1)
    ptree('/test').set(2)
    ptree('/test').remove()
    setImmediate(function () {
        t.equal(typeof objRcvd[0], 'object'                       , 'in object mode emits objects')
        t.equal(typeof bufRcvd[0], 'string'                       , 'in simple mode emits strings')
        t.equal(objRcvd.length, 3                                 , 'in object mode received 3 pieces of data')
        t.equal(bufRcvd.length, 3                                 , 'in simple mode received 3 pieces of data')
        objRcvd.forEach(validate)
        bufRcvd.forEach(validate)
        objStream.close()
        bufStream.close()
    })
});
