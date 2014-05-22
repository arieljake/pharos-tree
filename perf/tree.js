var createTree = global.createTree = require('..'),
    Benchmark  = require('benchmark'),
    suite      = new Benchmark.Suite()

var tree, i
function setup () {
    tree = createTree()
    tree('/a').persist()
    i = 0
}

suite.add('select new', function () {
    var node = tree('/b')
}, { setup: setup })
.add('persist new', function () {
    var node = tree('/a'+(i++)).persist()
}, { setup: setup })
.add('select existing', function () {
    var node = tree('/a')
}, { setup: setup })
.on('cycle', function (event) {
    var bench = event.target
    for (var i = 0; i < 40; i++) { bench.name += ' '; }
    console.log('%s - %s kops/sec', bench.name.substr(0, 40), ('          '+Math.floor(bench.hz/1000)).substr(-10))
})
.on('error', function (err) {
    console.error(err)
})
.run({ async: false  })
