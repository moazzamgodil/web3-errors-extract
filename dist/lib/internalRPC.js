"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getweb3_1 = __importDefault(require("./getweb3"));
const internalRPCError = async (err, web3) => {
    let errMsg = err.message;
    if (typeof err.message !== "string") {
        errMsg = err.message.toString();
    }
    let errObj = errMsg.slice(errMsg.indexOf("{"), errMsg.length);
    if (errObj.indexOf("{") !== -1 && errObj.lastIndexOf("}")) {
        errObj = JSON.parse(errObj);
        const _errFromWeb3 = await (0, getweb3_1.default)(errObj, web3);
        return _errFromWeb3;
    }
    return null;
};
exports.default = internalRPCError;
