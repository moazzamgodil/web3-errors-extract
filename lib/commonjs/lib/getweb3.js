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
const metamask_1 = __importDefault(require("./metamask.js"));
const tryParseJSON = (value) => {
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return null;
    }
};
const getErrFromWeb3 = (err, web3) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (err && ((err === null || err === void 0 ? void 0 : err.code) || ((_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.code))) {
        const errCode = (err === null || err === void 0 ? void 0 : err.code) ? err.code : err.data.code;
        const possibleErr = metamask_1.default === null || metamask_1.default === void 0 ? void 0 : metamask_1.default[errCode];
        if (possibleErr) {
            return possibleErr.message;
        }
        else if (errCode === "ACTION_REJECTED") {
            return "User rejected signing";
        }
        else {
            return err.message;
        }
    }
    const chkErr = err === null || err === void 0 ? void 0 : err.toString();
    if (chkErr && (chkErr === null || chkErr === void 0 ? void 0 : chkErr.startsWith("Error: Transaction has been reverted by the EVM:"))) {
        const errorObjectStr = err.message.slice(42);
        const errorObject = tryParseJSON(errorObjectStr);
        if (!(errorObject === null || errorObject === void 0 ? void 0 : errorObject.transactionHash)) {
            return null;
        }
        const txHash = errorObject.transactionHash;
        try {
            const tx = yield web3.eth.getTransaction(txHash);
            if (!tx) {
                return null;
            }
            var result = yield web3.eth.call(tx);
            if (typeof result !== "string") {
                result = `${result !== null && result !== void 0 ? result : ""}`;
            }
            result = result.startsWith("0x") ? result : `0x${result}`;
            if (result && result.substring(138)) {
                const reason = web3.utils.toAscii("0x" + result.substring(138));
                return reason;
            }
        }
        catch (e) {
            var errMsg2 = e.toString();
            if (errMsg2 && (errMsg2 === null || errMsg2 === void 0 ? void 0 : errMsg2.startsWith("Error"))) {
                if (errMsg2.indexOf("{") !== -1 && errMsg2.lastIndexOf("}") !== -1) {
                    let errObj2 = errMsg2.slice(errMsg2.indexOf("{"), errMsg2.lastIndexOf("}") + 1);
                    const parsedErr = tryParseJSON(errObj2);
                    if (parsedErr === null || parsedErr === void 0 ? void 0 : parsedErr.message) {
                        return parsedErr.message;
                    }
                }
            }
        }
    }
    return null;
});
exports.default = getErrFromWeb3;
//# sourceMappingURL=getweb3.js.map