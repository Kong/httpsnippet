"use strict";
exports.__esModule = true;
exports.reducer = void 0;
var reducer = function (accumulator, pair) {
    var currentValue = accumulator[pair.name];
    if (currentValue === undefined) {
        accumulator[pair.name] = pair.value;
        return accumulator;
    }
    // If we already have it as array just push the value
    if (Array.isArray(currentValue)) {
        currentValue.push(pair.value);
        return accumulator;
    }
    // convert to array since now we have more than one value for this key
    accumulator[pair.name] = [currentValue, pair.value];
    return accumulator;
};
exports.reducer = reducer;
