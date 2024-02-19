"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validateHarRequest = exports.HARError = void 0;
var ajv_1 = __importDefault(require("ajv"));
var schema = __importStar(require("har-schema"));
var HARError = /** @class */ (function (_super) {
    __extends(HARError, _super);
    function HARError(errors) {
        var _this = _super.call(this) || this;
        _this.name = 'HARError';
        _this.message = 'validation failed';
        _this.errors = [];
        _this.errors = errors;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return HARError;
}(Error));
exports.HARError = HARError;
var ajv = new ajv_1["default"]({
    allErrors: true
});
ajv.addSchema(schema);
var validateHarRequest = function (request) {
    var validate = ajv.getSchema('request.json');
    if (!validate) {
        throw new Error('failed to find HAR request schema');
    }
    var valid = validate(request);
    if (!valid && validate.errors) {
        throw new HARError(validate.errors);
    }
    return true;
};
exports.validateHarRequest = validateHarRequest;
