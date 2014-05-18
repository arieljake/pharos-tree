# pharos-tree

Create trees of nodes. A node tree module Used by Pharos.

## testing

`npm test [--dot | --spec] [--coverage]`

### options

* `--dot` - output test results as dots instead of tap
* `--spec` - output test results as spec instead of tap
* `--coverage` - display text cover report

### patterns

Only test files matching a certain pattern may be run by prefixing the 
test command with `grep=pattern`. Example:

```
grep=connect npm test --dot
```

### watching

First:
`npm install -g nodemon`

Then you can:
`nodemon -x npm test [--dot | --spec] [--coverage]`

### html coverage report

Open it with `npm run view-cover` or `npm run vc`
