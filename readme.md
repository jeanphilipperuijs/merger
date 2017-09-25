# Deep Merge JavaScript Objects #

## Generate new object with merged content ##
```
const Merger = require('../src/merger');

const test1 = { a: 'first letter', z: 'last letter' };
const test2 = { m: '13th letter', z: 'last lttre' };

m = new Merger(test1, test2);
console.log(m.merged);

```

## Generate new JS file with merged content ##

```
const Merge2File = require('../src/merge2file');

const dataset1 = { a: 'first letter', z: 'last letter' };
const dataset2 = { m: '13th letter', z: 'last lttre' };

m2f = new Merge2File('variablename', dataset1, dataset2, '../exportpath');
m2f.save();

```
