/**
 * 
 * @author: Jean-Philippe Ruijs
 * @description: Parse given file and adds missing keys with the default english language and generates a new timestamped file.
*/

const fs = require('fs');
const usr = require('username');
const Merger = require('./merger');


class Merge2File {
  constructor(objName, objLess, objAll, exportPath = 'export') {
    this.startTime = new Date().getTime();
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
    console.log(`${this.constructor.name}: saving merged ${this.name} to [${fileName}] ${this.startTime}`);
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
      try {

        let duration = (new Date().getTime() - this.startTime);
        let header = `
/**
  * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  * ! WARNING: This is a generated file, any modifications may be overwritten !
  * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  *
  * Generated by "${this.constructor.name.toLocaleLowerCase()}"
  *
  * Date: ${new Date()}
  * Export target: "${this.fn}"
  * Executor: ${usr.sync()}
  * Duration: ${duration} ms.
*/
`
        sa.unshift(header);
      } catch (err) { console.log(err); }

      fs.writeFileSync(fileName, sa.join(''));
    } catch (err) {
      console.error(`Error writing "${fileName}"`, err);
    }
    this.merge = null;
  }
}

module.exports = Merge2File;
