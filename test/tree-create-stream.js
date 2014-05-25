var test       = require('tape'),
    pharosTree = require('..')

test('ptree.createStream', function (t) {
    var ptree    = pharosTree(),
        stream   = ptree.createStream()

    t.ok(stream.on&&stream.pipe && stream.resume, 'returns a Readable stream')

    t.end();
});
