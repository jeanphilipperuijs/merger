/**
 * 
 * @author: Jean-Philippe Ruijs
 * @description: Parse given file and adds missing keys with the default english language and generates a new timestamped file.
*/

const fs = require('fs');
const Merger = require('./merger');


class Merge2File {
  constructor(objName, objLess, objAll, exportPath = 'export') {
    this.name = objName;
    this.path = exportPath;
    this.fn = `${this.path}/${this.name}.js`;
    this.merge = new Merger(objLess, objAll);
  }
/**
 * 
 * @param {*} exportableModule 
 * @param {*} fileName 
 */
  save(exportableModule = true, fileName = this.fn) {
    const objectOnly = !exportableModule;
    const data = this.merge.toString();
    console.log(`${this.constructor.name}: saving merged ${this.name} to [${fileName}]`);
    const sa = [];
    if (objectOnly) { sa.push('['); }
    if (!objectOnly) sa.push(`const ${this.name} = `);
    sa.push(data);
    if (objectOnly) { sa.push(']'); }
    if (!objectOnly) {
      sa.push(';\n');
      sa.push(`module.exports = ${this.name};`);
    }
    try {
      fs.writeFileSync(fileName, sa.join(''));
    } catch (err) {
      console.error(`Error writing "${fileName}"`, err);
    }
    this.merge = null;
  }
}

module.exports = Merge2File;
