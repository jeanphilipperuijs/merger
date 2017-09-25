# Merge JavaScript Objects #

## Generate new JS file with merged content ##

### Example ###

```
const Merge2File = require('merge2file');

const dataset1 = { a: 'first letter', z: 'last letter' };
const dataset2 = { m: '13th letter', z: 'last lttre' };

m2f = new Merge2File('variablename', dataset1, dataset2, '../exportpath');
m2f.save();

```

### Results ###

Module exportable JS file named **variablename.js** in given export path with the following content:
```
const variablename = {
  a: "first letter",
  z: "last letter",
  m: "13th letter"
};
module.exports = variablename;
```
