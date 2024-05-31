import executionReverted from "./executionReverted";
import internalRPCError from "./internalRPC";
import getErrFromWeb3 from "./getweb3";
const _getErrorMessage = async (err, web3, state) => {
    const defaultErrMsg = "Something went wrong. Please try again later.";
    let ret;
    if (err?.message && err.message?.includes("Internal JSON-RPC error.")) {
        ret = await internalRPCError(err, web3);
    }
    else if ((err?.message &&
        err.message?.includes("execution reverted:") &&
        err.message?.indexOf("{") !== -1) || err?.data != null && err?.data != undefined) {
        ret = await executionReverted(err, state, web3);
    }
    else if (err?.message && err.message?.includes("execution reverted:")) {
        ret = err.message.slice(err.message.indexOf("execution reverted:"), err.message.length);
    }
    if (!ret) {
        const errFromWeb3 = getErrFromWeb3(err, web3);
        if (errFromWeb3) {
            ret = errFromWeb3;
        }
    }
    if (ret) {
        return ret;
    }
    return defaultErrMsg;
};
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