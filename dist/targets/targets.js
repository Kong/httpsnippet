"use strict";
exports.__esModule = true;
exports.addTargetClient = exports.isClient = exports.addTarget = exports.isTarget = exports.targets = void 0;
var target_1 = require("./c/target");
var target_2 = require("./clojure/target");
var target_3 = require("./csharp/target");
var target_4 = require("./go/target");
var target_5 = require("./http/target");
var target_6 = require("./java/target");
var target_7 = require("./javascript/target");
var target_8 = require("./kotlin/target");
var target_9 = require("./node/target");
var target_10 = require("./objc/target");
var target_11 = require("./ocaml/target");
var target_12 = require("./php/target");
var target_13 = require("./powershell/target");
var target_14 = require("./python/target");
var target_15 = require("./r/target");
var target_16 = require("./ruby/target");
var target_17 = require("./shell/target");
var target_18 = require("./swift/target");
exports.targets = {
    c: target_1.c,
    clojure: target_2.clojure,
    csharp: target_3.csharp,
    go: target_4.go,
    http: target_5.http,
    java: target_6.java,
    javascript: target_7.javascript,
    kotlin: target_8.kotlin,
    node: target_9.node,
    objc: target_10.objc,
    ocaml: target_11.ocaml,
    php: target_12.php,
    powershell: target_13.powershell,
    python: target_14.python,
    r: target_15.r,
    ruby: target_16.ruby,
    shell: target_17.shell,
    swift: target_18.swift
};
var isTarget = function (target) {
    if (typeof target !== 'object' || target === null || Array.isArray(target)) {
        var got = target === null ? 'null' : Array.isArray(target) ? 'array' : typeof target;
        throw new Error("you tried to add a target which is not an object, got type: \"".concat(got, "\""));
    }
    if (!Object.prototype.hasOwnProperty.call(target, 'info')) {
        throw new Error('targets must contain an `info` object');
    }
    if (!Object.prototype.hasOwnProperty.call(target.info, 'key')) {
        throw new Error('targets must have an `info` object with the property `key`');
    }
    if (!target.info.key) {
        throw new Error('target key must be a unique string');
    }
    if (Object.prototype.hasOwnProperty.call(exports.targets, target.info.key)) {
        throw new Error("a target already exists with this key, `".concat(target.info.key, "`"));
    }
    if (!Object.prototype.hasOwnProperty.call(target.info, 'title')) {
        throw new Error('targets must have an `info` object with the property `title`');
    }
    if (!target.info.title) {
        throw new Error('target title must be a non-zero-length string');
    }
    if (!Object.prototype.hasOwnProperty.call(target.info, 'extname')) {
        throw new Error('targets must have an `info` object with the property `extname`');
    }
    if (!Object.prototype.hasOwnProperty.call(target, 'clientsById') ||
        !target.clientsById ||
        Object.keys(target.clientsById).length === 0) {
        throw new Error("No clients provided in target ".concat(target.info.key, ".  You must provide the property `clientsById` containg your clients."));
    }
    if (!Object.prototype.hasOwnProperty.call(target.info, 'default')) {
        throw new Error('targets must have an `info` object with the property `default`');
    }
    if (!Object.prototype.hasOwnProperty.call(target.clientsById, target.info["default"])) {
        throw new Error("target ".concat(target.info.key, " is configured with a default client ").concat(target.info["default"], ", but no such client was found in the property `clientsById` (found ").concat(JSON.stringify(Object.keys(target.clientsById)), ")"));
    }
    Object.values(target.clientsById).forEach(exports.isClient);
    return true;
};
exports.isTarget = isTarget;
var addTarget = function (target) {
    if (!(0, exports.isTarget)(target)) {
        return;
    }
    exports.targets[target.info.key] = target;
};
exports.addTarget = addTarget;
var isClient = function (client) {
    if (!client) {
        throw new Error('clients must be objects');
    }
    if (!Object.prototype.hasOwnProperty.call(client, 'info')) {
        throw new Error('targets client must contain an `info` object');
    }
    if (!Object.prototype.hasOwnProperty.call(client.info, 'key')) {
        throw new Error('targets client must have an `info` object with property `key`');
    }
    if (!client.info.key) {
        throw new Error('client.info.key must contain an identifier unique to this target');
    }
    if (!Object.prototype.hasOwnProperty.call(client.info, 'title')) {
        throw new Error('targets client must have an `info` object with property `title`');
    }
    if (!Object.prototype.hasOwnProperty.call(client.info, 'description')) {
        throw new Error('targets client must have an `info` object with property `description`');
    }
    if (!Object.prototype.hasOwnProperty.call(client.info, 'link')) {
        throw new Error('targets client must have an `info` object with property `link`');
    }
    if (!Object.prototype.hasOwnProperty.call(client, 'convert') ||
        typeof client.convert !== 'function') {
        throw new Error('targets client must have a `convert` property containing a conversion function');
    }
    return true;
};
exports.isClient = isClient;
var addTargetClient = function (targetId, client) {
    if (!(0, exports.isClient)(client)) {
        return;
    }
    if (!Object.prototype.hasOwnProperty.call(exports.targets, targetId)) {
        throw new Error("Sorry, but no ".concat(targetId, " target exists to add clients to"));
    }
    if (Object.prototype.hasOwnProperty.call(exports.targets[targetId], client.info.key)) {
        throw new Error("the target ".concat(targetId, " already has a client with the key ").concat(client.info.key, ", please use a different key"));
    }
    exports.targets[targetId].clientsById[client.info.key] = client;
};
exports.addTargetClient = addTargetClient;
