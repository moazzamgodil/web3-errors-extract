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
const internalRPCError = (err, web3) => __awaiter(void 0, void 0, void 0, function* () {
    let errMsg = err.message;
    if (typeof err.message !== "string") {
        errMsg = err.message.toString();
    }
    let errObj = errMsg.slice(errMsg.indexOf("{"), errMsg.length);
    if (errObj.indexOf("{") !== -1 && errObj.lastIndexOf("}")) {
        errObj = JSON.parse(errObj);
        const _errFromWeb3 = yield getErrFromWeb3(errObj, web3);
        return _errFromWeb3;
    }
    return null;
});
export default internalRPCError;
//# sourceMappingURL=internalRPC.js.map