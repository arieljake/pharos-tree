var nodeTree = require('..')
,   assert = require('assert')
;

var tree = nodeTree();

tree.createStream().pipe(process.stdout); // {op: 'create', node: {...} }
tree.on('change', function (node, op) {});

var task1 = tree('/tasks/1');

task1.set('crawl');

tree('/tasks/2').set('walk');
tree('/tasks/3').set('run');

task1.addChild('status').set('completed');

var tasks = tree('/tasks').children;
assert(tasks.length === 3);
assert(tree.node.isPrototypeOf(tasks[0]));
assert(tasks[0].data === 'crawl');
assert(tasks[0].children[0].name === 'status');

task1.getChild('status').remove();
assert(task1.children.length === 0);
