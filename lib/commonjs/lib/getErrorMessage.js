"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executionReverted_1 = __importDefault(require("./executionReverted.js"));
const internalRPC_1 = __importDefault(require("./internalRPC.js"));
const getweb3_1 = __importDefault(require("./getweb3.js"));
const _getErrorMessage = (err, web3, state) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const defaultErrMsg = "Something went wrong. Please try again later.";
    let ret = null;
    if ((err === null || err === void 0 ? void 0 : err.message) && ((_a = err.message) === null || _a === void 0 ? void 0 : _a.includes("Internal JSON-RPC error."))) {
        ret = yield (0, internalRPC_1.default)(err, web3);
    }
    else if (((err === null || err === void 0 ? void 0 : err.message) &&
        ((_b = err.message) === null || _b === void 0 ? void 0 : _b.includes("execution reverted:")) &&
        ((_c = err.message) === null || _c === void 0 ? void 0 : _c.indexOf("{")) !== -1) || (err === null || err === void 0 ? void 0 : err.data) != null && (err === null || err === void 0 ? void 0 : err.data) != undefined) {
        ret = yield (0, executionReverted_1.default)(err, state, web3);
    }
    else if ((err === null || err === void 0 ? void 0 : err.message) && ((_d = err.message) === null || _d === void 0 ? void 0 : _d.includes("execution reverted:"))) {
        ret = err.message.slice(err.message.indexOf("execution reverted:"), err.message.length);
    }
    if (!ret) {
        const errFromWeb3 = yield (0, getweb3_1.default)(err, web3);
        if (errFromWeb3) {
            ret = errFromWeb3;
        }
    }
    if (ret) {
        return ret;
    }
    else if (err.message) {
        return err.message;
    }
    return defaultErrMsg;
});
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