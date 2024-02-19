"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.go = void 0;
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var helpers_1 = require("yargs/helpers");
var yargs_1 = __importDefault(require("yargs/yargs"));
// eslint-disable-next-line @typescript-eslint/no-var-requires -- require() to avoid package.json being included in build output.
var packageJson = require('../package.json');
var httpsnippet_1 = require("./httpsnippet");
var targets_1 = require("./targets/targets");
var cyan = chalk_1["default"].cyan, green = chalk_1["default"].green, red = chalk_1["default"].red, yellow = chalk_1["default"].yellow;
var bad = function (message) { return console.error("".concat(red('✖'), " ").concat(message)); };
var good = function (message) { return console.log("".concat(green('✓'), " ").concat(message)); };
var go = function () {
    return (0, yargs_1["default"])((0, helpers_1.hideBin)(process.argv))
        .version(packageJson.version)
        .command('$0 [harFilePath]', 'the default command', function (builder) {
        builder
            .option('target', {
            alias: 't',
            type: 'string',
            description: 'target output',
            requiresArg: true
        })
            .option('client', {
            alias: 'c',
            type: 'string',
            description: 'language client',
            requiresArg: true
        })
            .option('output', {
            alias: 'o',
            type: 'string',
            description: 'write output to directory'
        })
            .option('options', {
            alias: 'x',
            type: 'string',
            description: 'provide extra options for the target/client',
            requiresArg: true
        })
            .demandOption(['target'], 'please provide a target')
            .strict()
            .showHelpOnFail(true)
            .help();
    }, function (_a) {
        var targetId = _a.target, client = _a.client, output = _a.output, options = _a.options, harFilePath = _a.harFilePath;
        var har = JSON.parse((0, fs_1.readFileSync)(harFilePath).toString());
        var httpsnippet = new httpsnippet_1.HTTPSnippet(har);
        try {
            if (options) {
                options = JSON.parse(options);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                bad("".concat(cyan.bold(harFilePath), " failed to read JSON: ").concat(red(error.message)));
            }
            return;
        }
        var result = httpsnippet.convert(targetId, client, options);
        if (!result) {
            throw new Error('something went wrong');
        }
        if (!output) {
            console.log(result);
            return;
        }
        var file = path_1["default"].parse(harFilePath).name;
        var writeFilePath = path_1["default"].join(output, "".concat(file).concat((0, httpsnippet_1.extname)(targetId)));
        (0, fs_1.writeFileSync)(writeFilePath, String(result));
        var target = targets_1.targets[targetId];
        var clientId = target.clientsById[client || target.info["default"]].info.key;
        good("converted ".concat(cyan.bold(harFilePath), " with ").concat(yellow(targetId), "[").concat(yellow(clientId), "] at ").concat(cyan(writeFilePath), "\n\n").concat(result));
    })
        .example('$0 my_har.json', '--target rust --client actix --output my_src_directory').argv;
};
exports.go = go;
