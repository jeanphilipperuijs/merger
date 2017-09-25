/**
 * 
 * @author: Jean-Philippe Ruijs
 * @description: Parse given file and adds missing keys with the default english language and generates a new timestamped file.
*/

const fs = require('fs');
const Merger = require('./merger');


class Merge2File {
  constructor(objName, objLess, objAll, exportPath='export') {
    this.name = objName;
    this.path = exportPath;
    this.fn = `${__dirname}/${this.path}/${this.name}.js`;
    this.merge = new Merger(objLess, objAll);
  }

  save() {
    const data = this.merge.toString();
    console.log(`${this.constructor.name}: saving merged ${this.name} to [${this.fn}]`);

    const sa = [];
    sa.push(`const ${this.name} = `);
    sa.push(data);
    sa.push(';\n');
    sa.push(`module.exports = ${this.name};`);
    try {
      fs.writeFileSync(this.fn, sa.join(''));
    } catch (err) {
      console.error(`Error writing "${this.fn}"`, err);
    }
    this.merge = null;
  }
}

module.exports = Merge2File;
