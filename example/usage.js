var createTree = require('..'),
    assert = require('assert')


var tree = createTree()

tree.createStream().pipe(process.stdout) // {op: 'create', pnode: {...} }

var task1 = tree('/tasks/1')

task1.set('crawl')

tree('/tasks/2').set('walk')
tree('/tasks/3').set('run')

task1.child('status').set('completed')

var tasks = tree('/tasks').children
assert(tasks.length === 3)
assert(tree.pnode.isPrototypeOf(tasks[0]))
assert(tasks[0].data === 'crawl')
assert(tasks[0].children[0].name === 'status')

task1.child('status').remove()
assert(task1.children.length === 0)
