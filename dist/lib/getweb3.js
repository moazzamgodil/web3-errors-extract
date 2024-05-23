"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metamask_1 = __importDefault(require("./metamask"));
const getErrFromWeb3 = async (err, web3) => {
    if (err && err?.code) {
        const possibleErr = metamask_1.default?.[err.code];
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
    const chkErr = err?.toString();
    if (chkErr && chkErr?.startsWith("Error: Transaction has been reverted by the EVM:")) {
        const errorObjectStr = err.message.slice(42);
        const errorObject = JSON.parse(errorObjectStr);
        const txHash = errorObject.transactionHash;
        try {
            const tx = await web3.eth.getTransaction(txHash);
            var result = await web3.eth.call(tx);
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
};
exports.default = getErrFromWeb3;
