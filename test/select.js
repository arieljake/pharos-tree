var test     = require('tape')
,   nodeTree = require('..');

test('select /', function (t) {
    var tree = nodeTree();
    var root = tree('/');
    t.ok(tree.node.isPrototypeOf(root));
});
