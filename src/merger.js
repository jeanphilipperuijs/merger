/**
* Parses object and adds missing keys with generates a new object.
*
* @author: Jean-Philippe Ruijs
* @description merges two objects by adding the missing elements 
*/


class Merger {
  constructor(objLess, objAll) {
    this.objLess = objLess;
    this.objAll = objAll;
    //this.keys = [];
    this.merged = this.mergeDeep(this.objAll, this.objLess);
  }
  /**
   * 
   * @param {*} item 
   */
  isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
  /**
   * 
   * @param {*} objAll object with all values
   * @param {*} objLess object with missing values
   */
  mergeDeep(objAll, ...objLess) {
    if (!objLess.length) return objAll;
    const source = objLess.shift();
    if (this.isObject(objAll) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!objAll[key]) {
            Object.assign(objAll, { [key]: {} });
          }
          this.mergeDeep(objAll[key], source[key]);
        } else {
          Object.assign(objAll, { [key]: source[key] });
        }
      }
    }
    return this.mergeDeep(objAll, ...objLess);
  }

  toString() {
    let data = JSON.stringify(this.merged, null, 2);
    data = data.replace(/"(\w+)"\s*:/g, '$1:');
    return data;
  }
}
module.exports = Merger;
