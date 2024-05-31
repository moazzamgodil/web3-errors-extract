import getErrFromWeb3 from "./getweb3";
const internalRPCError = async (err, web3) => {
    let errMsg = err.message;
    if (typeof err.message !== "string") {
        errMsg = err.message.toString();
    }
    let errObj = errMsg.slice(errMsg.indexOf("{"), errMsg.length);
    if (errObj.indexOf("{") !== -1 && errObj.lastIndexOf("}")) {
        errObj = JSON.parse(errObj);
        const _errFromWeb3 = await getErrFromWeb3(errObj, web3);
        return _errFromWeb3;
    }
    return null;
};
export default internalRPCError;
//# sourceMappingURL=internalRPC.js.map