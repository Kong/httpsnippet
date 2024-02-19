"use strict";
exports.__esModule = true;
exports.escape = exports.quote = void 0;
/**
 * Use 'strong quoting' using single quotes so that we only need to deal with nested single quote characters.
 * see: http://wiki.bash-hackers.org/syntax/quoting#strong_quoting
 */
var quote = function (value) {
    if (value === void 0) { value = ''; }
    var safe = /^[a-z0-9-_/.@%^=:]+$/i;
    var isShellSafe = safe.test(value);
    if (isShellSafe) {
        return value;
    }
    // if the value is not shell safe, then quote it
    return "'".concat(value.replace(/'/g, "'\\''"), "'");
};
exports.quote = quote;
var escape = function (value) { return value.replace(/\r/g, '\\r').replace(/\n/g, '\\n'); };
exports.escape = escape;
