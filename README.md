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

### ptree.period

`read-only`, 'number'

The current period. This starts at 0, and is incremented on-demand. Each time this is 
incremented, the current transaction is reset to 0.

### ptree.txid

`read-only`, 'number'

The current transaction ID. This starts at 1 (due to the automatic creation of the root node), 
and is incremented by 1 each time a `pnode` is added to or removed from the tree, or any time 
the data property of a `pnode` is changed.

### ptree.pnodeCount

`read-only`, `number`

The number of `pnodes` currently within the `ptree`.

### ptree.createStream(options)

Create new stream of change documents. `options` is an object with the following valid properties:

* `objectMode` - causes `createStream` to return a stream in objectMode

In objectMode, the stream will produce data in the following format:

```
{
    op: "create|change|remove",
    pnode: <JSON representation of pnode, see below>
}
```

In simple (non-obeject) mode, the stream will produce new-line seperated stringified JSON objects in 
the above format.

returns `stream`

### var pnode = tree('/path/of/pnode')

Create a new Pharos node (pnode).

### pnode.path

`read-only` (`read-write` before pnode is persisted), `string`

Path of the pnode. Similar to Unix paths:
* Must start with a '/', may not end with one
* Path components are seperated by '/'
* Valid characters are a-z, A-Z, 0-9, ., -, _

### pnode.name

`read-only`, `string`

Contains the last component of the `pnode.path`. If he `pnode.path` === '/servers/web' then 
`pnode.name` === 'web'.

### pnode.exists

`read-only`, `true || false`

`true` if the pnode has been `persisted`, otherwise `false`. A pnode is automatically 
persisted when a value is assigned to it's data property, or when a descendant 
is persisted. A pnode may also be manually persisted by calling `pnode.persist()`.

Example:

```javascript
if ( ptree('/tasks/1').exists ) {
    // do something
}
```

### pnode.valid

`read-only`, `true || false`

`true` if the pnode was created with a valid path, otherwise `false`. It's possible to create an 
invalid pnode object, but it cannot be persisted. 

Example:

```javascript
if ( ptree('/tasks/'+id).valid ) {
    // do something
}
```

### pnode.data

`read-write`

Data assigned to the pnode. Assignment (of a different value) will cause the pnode to be persisted if it is 
not already. Assignment will also increment the version of the pnode (or set to 1 if unassigned), and the 
transaction of the ptree.

### pnode.version

`read-only`, `number`

The version of the pnode represents the number of times the `data` property has changed. Upon initial persistance, 
the version will be 1. Each time `data` changes, the version property will be incremented by 1.

### pnode.parent

`read-only`, `pnode`

The immediate parent of the pnode. 

Example:

```javascript
var pnode = ptree('/servers/192.168.1.10');
assert(pnode.parent.path === '/servers');
```

### pnode.parents

`read-only`, `array of pnodes`

An array of all ancestors of the pnode. 

Example:

```javascript
var pnode = ptree('/servers/192.168.1.10/processes/1234');
assert(pnode.parents.length === 4);
assert(pnode.parents[0].path === '/');
assert(pnode.parents[1].path === '/servers');
assert(pnode.parents[2].path === '/servers/192.168.1.10');
assert(pnode.parents[3].path === '/servers/192.168.1.10/processes');
```

### pnode.children

`read-only`, `array of pnodes`

An array of all immediate children of the pnode.

Example:

```javascript
var pnode = ptree('/servers');
ptree('/servers/192.168.1.10').set({ hostname: 'web1' });
ptree('/servers/192.168.1.11').set({ hostname: 'web2' });
ptree('/servers/192.168.1.12').set({ hostname: 'web3' });
assert(pnode.children.length === 3);
assert(pnode.children[0].data.hostname === 'web1');
assert(pnode.children[1].data.hostname === 'web2');
assert(pnode.children[2].data.hostname === 'web3');
```

### pnode.childrenVersion

`read-only`, `number`

The childrenVersion property represents the number of times the children array has changed. This occurs when 
a child is added or removed. This does not reflect changes to the child nodes themselves.

### pnode.ctime

`read-only`, `date`

A date object representing the time the pnode was persisted.

### pnode.mtime

`read-only`, `date`

A date object representing the last time the pnode was modified (aka the data property was changed).

### pnode.ctxid

`read-only`, `number`

The `txid` (transaction ID) in which the pnode was created.

### pnode.mtxid

`read-only`, `txid`

The `txid` (transaction ID) in which the pnode was last modified.

### pnode.set(value)

Assign `value` to pnode.data. Assignment (of a different value) will also increment the version of the `pnode` 
(or set to 1 if unassigned), and the transaction of the `ptree`.

returns `pnode`

### pnode.unset()

Return pnode.data to an `undefined` state. Will increment the version of the `pnode` and the `ptree` transaction 
(if there was a previous assignment).

returns `pnode`

### pnode.remove()

Removes the `pnode` from the `ptree` if it was persisted. This will increment the `ptree` transaction.

### pnode.child(name)

Given the `name` property of a child, will return a reference to that child from the `ptree`. If the child does not 
exist, a new (unpersisted) child `pnode` will be returned.

returns child `pnode`

Example:

```
var weather = tree('/weather');
if ( !weather.child('Boston').exists ) {
    weather.child('Boston').set('http://api.openweathermap.org/data/2.5/weather?q=boston,ma');
}
console.log(weather.child('Boston').data);
```

### pnode.persist()

Specifically cause the `pnode` to be persisted, without setting a value for `pnode.data`.

returns `pnode`

### pnode.toJSON()

The JSON representation of a `pnode`: 

```
{
    path: ...,
    data: ...,
    version: ...,
    ctime: ...,
    mtime: ...,
    ctxid: ...,
    mtxid: ...
}
```

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
