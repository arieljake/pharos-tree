# pharos-tree

Create trees of nodes. A node tree module Used by Pharos.

## example

TODO

## api

TODO

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
