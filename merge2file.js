/**
 * Parse given l10n file and adds missing keys with the default english language and generates a new timestamped file.
 * @author: Jean-Philippe Ruijs
*/

const fs = require('fs');
const Merger = require('./merger');


class Merge2File {
  constructor(lang, objLess, objAll, path='export') {
    this.lang = lang;
    this.path = path;
    this.fn = `${__dirname}/${this.path}/${this.lang}.js`;
    this.merge = new Merger(objLess, objAll);
  }

  save() {
    const data = this.merge.toString();
    console.log(`${this.constructor.name}: saving merged ${this.lang.toUpperCase()} to [${this.fn}]`);

    const sa = [];
    sa.push(`const ${this.lang} = `);
    sa.push(data);
    sa.push(';\n');
    sa.push(`module.exports = ${this.lang};`);
    try {
      fs.writeFileSync(this.fn, sa.join(''));
    } catch (err) {
      console.error(`Error writing "${this.fn}"`, err);
    }
    this.merge = null;
  }
}

module.exports = Merge2File;
