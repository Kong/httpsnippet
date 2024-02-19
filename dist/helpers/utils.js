"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.extname = exports.availableTargets = void 0;
var targets_1 = require("../targets/targets");
var availableTargets = function () {
    return Object.keys(targets_1.targets).map(function (targetId) { return (__assign(__assign({}, targets_1.targets[targetId].info), { clients: Object.keys(targets_1.targets[targetId].clientsById).map(function (clientId) { return targets_1.targets[targetId].clientsById[clientId].info; }) })); });
};
exports.availableTargets = availableTargets;
var extname = function (targetId) { var _a; return ((_a = targets_1.targets[targetId]) === null || _a === void 0 ? void 0 : _a.info.extname) || ''; };
exports.extname = extname;
