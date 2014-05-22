var test       = require('tape'),
    createTree = require('..')

test('tree.createStream', function (t) {
    var tree     = createTree(),
        stream   = tree.createStream()

    t.ok(stream.on&&stream.pipe&&stream.resume, 'returns a Readable stream')

    t.end();
});
