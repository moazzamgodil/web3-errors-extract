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
        if (typeof err.message == "object") {
            errMsg = JSON.stringify(err.message);
        }
        else {
            errMsg = err.message.toString();
        }
    }
    if (errMsg.indexOf("{") !== -1 && errMsg.lastIndexOf("}")) {
        const errObj = errMsg.slice(errMsg.indexOf("{"), errMsg.lastIndexOf("}") + 1);
        const parsedErrObj = JSON.parse(errObj);
        const errFromWeb3 = yield getErrFromWeb3(parsedErrObj, web3);
        return errFromWeb3;
    }
    return null;
});
export default internalRPCError;
//# sourceMappingURL=internalRPC.js.map