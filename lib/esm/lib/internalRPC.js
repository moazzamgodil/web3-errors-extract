var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getErrFromWeb3 from "./getweb3.js";
const tryParseJSON = (value) => {
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return null;
    }
};
const internalRPCError = (err, web3) => __awaiter(void 0, void 0, void 0, function* () {
    let errMsg = err.message;
    if (typeof err.message !== "string") {
        if (typeof err.message == "object") {
            errMsg = JSON.stringify(err.message);
        }
        else {
            errMsg = err.message.toString();
        }
    }
    const startIdx = errMsg.indexOf("{");
    const endIdx = errMsg.lastIndexOf("}");
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        const errObj = errMsg.slice(startIdx, endIdx + 1);
        const parsedErrObj = tryParseJSON(errObj);
        if (parsedErrObj) {
            const errFromWeb3 = yield getErrFromWeb3(parsedErrObj, web3);
            return errFromWeb3;
        }
    }
    return null;
});
export default internalRPCError;
//# sourceMappingURL=internalRPC.js.map