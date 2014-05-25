# pharos-tree

Create trees of pnodes (Pharos nodes).

## example

```javascript
var pharosTree = require('pharos-tree'),
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
```

The output of the above will be:

```json
{"op":"create","pnode":{"path":"/tasks","version":1}}
{"op":"create","pnode":{"path":"/tasks/1","data":"crawl","version":1}}
{"op":"create","pnode":{"path":"/tasks/2","data":"walk","version":1}}
{"op":"create","pnode":{"path":"/tasks/3","data":"run","version":1}}
{"op":"create","pnode":{"path":"/tasks/1/status","data":"pending","version":1}}
{"op":"change","pnode":{"path":"/tasks/1/status","data":"completed","version":2}}
{"op":"remove","pnode":{"path":"/tasks/1/status","data":"completed","version":2}}
```

## api

`var pharosTree = require('pharos-tree')`

### var ptree = pharosTree()

Create a new Pharos tree (ptree).

### var pnode = tree('/path/of/pnode')

Create a new Pharos node (pnode).

### pnode.path

Path of the pnode. Similar to Unix paths:
* Must start with a '/', may not end with one
* Path components are seperated by '/'
* Valid characters are a-z, A-Z, 0-9, ., -, _

### pnode.name

Contains the last component of the `pnode.path`. If he `pnode.path` === '/servers/web' then 
`pnode.name` === 'web'.

### pnode.exists

Contains `true` if the pnode has been `persisted`, otherwise `false`. A pnode is automatically persisted when 
a value is assigned to it's data property, or when a descendant is persisted. A pnode may 
also be manually persisted by calling `pnode.persist()`.

Example:

```javascript
if ( ptree('/tasks/1').exists ) {
    // do something
}
```

### Still developing

## testing

`[grep=pattern] npm test [--dot | --spec] [--coverage]`

### options

* `--dot` - output test results as dots instead of tap
* `--spec` - output test results as spec instead of tap
* `--coverage` - display text cover report

### patterns

Only run test files matching a certain pattern by prefixing the 
test command with `grep=pattern`. Example:

```
grep=stuff npm test --dot
```

### html coverage report

Open it with `npm run view-cover` or `npm run vc`

## benchmarking

`[grep=pattern] npm run benchmark`

Benchmarks support running pattern-matched files in the perf directory just as 
tests do.
