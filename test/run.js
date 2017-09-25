const Merge2File = require('../src/merge2file');
const Merger = require('../src/merger');
const test1 = { a: 'first letter', z: 'last letter' };
const test2 = { m: '13th letter', z: 'last lttre' };

m = new Merger(test1, test2);
console.log(m.merged);
m = new Merger(test2, test1);
console.log(m.merged);
m2f = new Merge2File('varTest12', test1, test2, './test');
m2f.save();

m2f = new Merge2File('varTest21', test2, test1, './test');
m2f.save();

m2f = new Merge2File('varTest21objectOnly', test2, test1, './test');
m2f.save(false, fileName= './test/objectonly.js');