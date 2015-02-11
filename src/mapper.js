'use strict';

module.exports = function (target) {
  return function (pair) {
    if (this[pair.name] === undefined) {
      return this[pair.name] = pair.value;
    }

    // convert to array
    var arr = new Array(this[pair.name], pair.value);

    this[pair.name] = arr;
  }.bind(target);
};
