"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.CodeBuilder = void 0;
var DEFAULT_INDENTATION_CHARACTER = '';
var DEFAULT_LINE_JOIN = '\n';
var CodeBuilder = /** @class */ (function () {
    /**
     * Helper object to format and aggragate lines of code.
     * Lines are aggregated in a `code` array, and need to be joined to obtain a proper code snippet.
     */
    function CodeBuilder(_a) {
        var _b = _a === void 0 ? {} : _a, indent = _b.indent, join = _b.join;
        var _this = this;
        this.postProcessors = [];
        this.code = [];
        this.indentationCharacter = DEFAULT_INDENTATION_CHARACTER;
        this.lineJoin = DEFAULT_LINE_JOIN;
        /**
         * Add given indentation level to given line of code
         */
        this.indentLine = function (line, indentationLevel) {
            if (indentationLevel === void 0) { indentationLevel = 0; }
            var indent = _this.indentationCharacter.repeat(indentationLevel);
            return "".concat(indent).concat(line);
        };
        /**
         * Add the line at the beginning of the current lines
         */
        this.unshift = function (line, indentationLevel) {
            var newLine = _this.indentLine(line, indentationLevel);
            _this.code.unshift(newLine);
        };
        /**
         * Add the line at the end of the current lines
         */
        this.push = function (line, indentationLevel) {
            var newLine = _this.indentLine(line, indentationLevel);
            _this.code.push(newLine);
        };
        /**
         * Add an empty line at the end of current lines
         */
        this.blank = function () {
            _this.code.push('');
        };
        /**
         * Concatenate all current lines using the given lineJoin, then apply any replacers that may have been added
         */
        this.join = function () {
            var unreplacedCode = _this.code.join(_this.lineJoin);
            // console.log(unreplacedCode);
            var replacedOutput = _this.postProcessors.reduce(function (accumulator, replacer) { return replacer(accumulator); }, unreplacedCode);
            // console.log(replacedOutput);
            return replacedOutput;
        };
        /**
         * Often when writing modules you may wish to add a literal tag or bit of metadata that you wish to transform after other processing as a final step.
         * To do so, you can provide a PostProcessor function and it will be run automatically for you when you call `join()` later on.
         */
        this.addPostProcessor = function (postProcessor) {
            _this.postProcessors = __spreadArray(__spreadArray([], __read(_this.postProcessors), false), [postProcessor], false);
        };
        this.indentationCharacter = indent || DEFAULT_INDENTATION_CHARACTER;
        this.lineJoin = join !== null && join !== void 0 ? join : DEFAULT_LINE_JOIN;
    }
    return CodeBuilder;
}());
exports.CodeBuilder = CodeBuilder;
