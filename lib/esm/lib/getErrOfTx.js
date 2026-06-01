var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Eip838ExecutionError } from "web3";
const tryParseJSON = (value) => {
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return null;
    }
};
function parseInnerError(e) {
    var _a, _b;
    if ((_a = e === null || e === void 0 ? void 0 : e.innerError) === null || _a === void 0 ? void 0 : _a.errorSignature) {
        return e.innerError;
    }
    if (!e.innerError) {
        if (typeof ((_b = e === null || e === void 0 ? void 0 : e.data) === null || _b === void 0 ? void 0 : _b.data) === "string" && e.data.data.startsWith("0x")) {
            e.innerError = new Eip838ExecutionError(e.data);
        }
    }
    return e.innerError;
}
const _getErrOfTx = (txHash, web3) => __awaiter(void 0, void 0, void 0, function* () {
    const tx = yield web3.eth.getTransaction(txHash);
    if (!tx) {
        return "Transaction not found";
    }
    if (tx.gasPrice) {
        delete tx.maxPriorityFeePerGas;
        delete tx.maxFeePerGas;
    }
    try {
        yield web3.eth.call(tx, tx.blockNumber);
        return "Success Tx";
    }
    catch (e) {
        if (e === null || e === void 0 ? void 0 : e.innerError) {
            const innerError = parseInnerError(e);
            if (typeof innerError === "object") {
                if (innerError === null || innerError === void 0 ? void 0 : innerError.message) {
                    return innerError.message;
                }
                else {
                    return JSON.stringify(innerError);
                }
            }
            return innerError;
        }
        const errMsg = e.toString();
        if (errMsg && errMsg.startsWith("Error")) {
            let errObj = errMsg.slice(errMsg.indexOf("{"), errMsg.length);
            if (errObj.indexOf("{") !== -1 && errObj.lastIndexOf("}") !== -1) {
                const parsedErr = tryParseJSON(errObj);
                if (parsedErr === null || parsedErr === void 0 ? void 0 : parsedErr.message) {
                    return parsedErr.message;
                }
            }
        }
        if (e === null || e === void 0 ? void 0 : e.message)
            return e.message;
    }
    return "Reverted without reason";
});
const getErrOfTx = (txHash, web3) => {
    return new Promise((resolve, reject) => {
        _getErrOfTx(txHash, web3)
            .then((res) => {
            resolve(res);
        })
            .catch((err) => {
            reject(err);
        });
    });
};
export default getErrOfTx;
//# sourceMappingURL=getErrOfTx.js.map