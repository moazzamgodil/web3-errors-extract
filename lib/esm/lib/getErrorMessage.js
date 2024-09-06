var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import executionReverted from "./executionReverted.js";
import internalRPCError from "./internalRPC.js";
import getErrFromWeb3 from "./getweb3.js";
const _getErrorMessage = (err, web3, state) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const defaultErrMsg = "Something went wrong. Please try again later.";
    let ret = null;
    if (err === null || err === void 0 ? void 0 : err.message) {
        if (((_a = err.message) === null || _a === void 0 ? void 0 : _a.includes("Internal JSON-RPC error")) && ((_b = err.message) === null || _b === void 0 ? void 0 : _b.indexOf("{")) !== -1) {
            ret = yield internalRPCError(err, web3);
        }
        if (!ret
            && ((_c = err.message) === null || _c === void 0 ? void 0 : _c.includes("execution reverted:"))) {
            ret = err.message.slice(err.message.indexOf("execution reverted:"), err.message.length);
        }
        if (!ret &&
            ((((_d = err.message) === null || _d === void 0 ? void 0 : _d.includes("execution reverted")) && (((_e = err.message) === null || _e === void 0 ? void 0 : _e.indexOf("{")) !== -1 || ((err === null || err === void 0 ? void 0 : err.data) != null && (err === null || err === void 0 ? void 0 : err.data) != undefined))) ||
                (((_f = err.message) === null || _f === void 0 ? void 0 : _f.includes("Internal JSON-RPC error")) && ((err === null || err === void 0 ? void 0 : err.data) != null && (err === null || err === void 0 ? void 0 : err.data) != undefined)))) {
            ret = yield executionReverted(err, state, web3);
        }
    }
    if (!ret) {
        const errFromWeb3 = yield getErrFromWeb3(err, web3);
        if (errFromWeb3) {
            ret = errFromWeb3;
        }
    }
    if (ret) {
        const returnMsg = typeof ret == "object" ? JSON.stringify(ret) : ret;
        return typeof returnMsg != "string" ? returnMsg.toString() : returnMsg;
    }
    else if (err === null || err === void 0 ? void 0 : err.message) {
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
export default getErrorMessage;
//# sourceMappingURL=getErrorMessage.js.map