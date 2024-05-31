"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executionReverted_1 = __importDefault(require("./executionReverted"));
const internalRPC_1 = __importDefault(require("./internalRPC"));
const getweb3_1 = __importDefault(require("./getweb3"));
const _getErrorMessage = async (err, web3, state) => {
    const defaultErrMsg = "Something went wrong. Please try again later.";
    let ret;
    if (err?.message && err.message?.includes("Internal JSON-RPC error.")) {
        ret = await (0, internalRPC_1.default)(err, web3);
    }
    else if ((err?.message &&
        err.message?.includes("execution reverted:") &&
        err.message?.indexOf("{") !== -1) || err?.data != null && err?.data != undefined) {
        ret = await (0, executionReverted_1.default)(err, state, web3);
    }
    else if (err?.message && err.message?.includes("execution reverted:")) {
        ret = err.message.slice(err.message.indexOf("execution reverted:"), err.message.length);
    }
    if (!ret) {
        const errFromWeb3 = (0, getweb3_1.default)(err, web3);
        if (errFromWeb3) {
            ret = errFromWeb3;
        }
    }
    if (ret) {
        return ret;
    }
    return defaultErrMsg;
};
const getErrorMessage = (err, web3, state) => {
    return new Promise((resolve, reject) => {
        _getErrorMessage(err, web3, state)
            .then((res) => {
            resolve(res);
        })
            .catch((err) => {
            reject(err);
        });
    });
};
exports.default = getErrorMessage;
//# sourceMappingURL=getErrorMessage.js.map