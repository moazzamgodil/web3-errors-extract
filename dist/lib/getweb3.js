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
const metamask_1 = __importDefault(require("./metamask"));
const getErrFromWeb3 = (err, web3) => __awaiter(void 0, void 0, void 0, function* () {
    if (err && (err === null || err === void 0 ? void 0 : err.code)) {
        const possibleErr = metamask_1.default === null || metamask_1.default === void 0 ? void 0 : metamask_1.default[err.code];
        if (possibleErr) {
            return possibleErr.message;
        }
        else if (err.code === "ACTION_REJECTED") {
            return "User rejected signing";
        }
        else {
            return err.message;
        }
    }
    const chkErr = err === null || err === void 0 ? void 0 : err.toString();
    if (chkErr && (chkErr === null || chkErr === void 0 ? void 0 : chkErr.startsWith("Error: Transaction has been reverted by the EVM:"))) {
        const errorObjectStr = err.message.slice(42);
        const errorObject = JSON.parse(errorObjectStr);
        const txHash = errorObject.transactionHash;
        try {
            const tx = yield web3.eth.getTransaction(txHash);
            var result = yield web3.eth.call(tx);
            result = result.startsWith("0x") ? result : `0x${result}`;
            if (result && result.substring(138)) {
                const reason = web3.utils.toAscii(result.substring(138));
                console.log("Revert reason:", reason);
                return reason;
            }
            else {
                console.log("Cannot get reason");
            }
        }
        catch (e) {
            var errMsg2 = e.toString();
            if (errMsg2) {
                if (errMsg2.startsWith("Error")) {
                    var errObj2 = errMsg2.slice(errMsg2.indexOf("{"), errMsg2.length);
                    if (errObj2.indexOf("{") !== -1 && errObj2.lastIndexOf("}")) {
                        errObj2 = JSON.parse(errObj2);
                        return errObj2.message;
                    }
                }
            }
        }
    }
    return null;
});
exports.default = getErrFromWeb3;
