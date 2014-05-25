var pharosTree = require('..'),
    assert     = require('assert');


var ptree = pharosTree();
ptree.createStream().pipe(process.stdout);

var task1 = ptree('/tasks/1');
task1.set('crawl');

ptree('/tasks/2').set('walk');
ptree('/tasks/3').set('run');

task1.child('status').set('pending');
assert(task1.child('status').version === 1);
task1.child('status').set('completed');
assert(task1.child('status').version === 2);

var tasks = ptree('/tasks').children;
assert(tasks.length === 3);
assert(ptree.pnode.isPrototypeOf(tasks[0]));
assert(tasks[0].data === 'crawl');
assert(tasks[0].children[0].name === 'status');

task1.child('status').remove();
assert(task1.children.length === 0);
