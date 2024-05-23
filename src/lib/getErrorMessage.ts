import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";
import executionReverted from "./executionReverted";
import internalRPCError from "./internalRPC";
import getErrFromWeb3 from "./getweb3";

const _getErrorMessage = async (err: any, web3: Web3<RegisteredSubscription>, state: any): Promise<string> => {
    const defaultErrMsg = "Something went wrong. Please try again later.";
    let ret;
    if (err?.message && err.message?.includes("Internal JSON-RPC error.")) {
        ret = await internalRPCError(err, web3);
    } else if (
        err?.message &&
        err.message?.includes("execution reverted:") &&
        err.message?.indexOf("{") !== -1
    ) {
        ret = await executionReverted(err, state, web3);
    } else if (err?.message && err.message?.includes("execution reverted:")) {
        ret = err.message.slice(
            err.message.indexOf("execution reverted:"),
            err.message.length
        );
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
}

const getErrorMessage = (err: any, web3: Web3<RegisteredSubscription>, state: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        _getErrorMessage(err, web3, state)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default getErrorMessage;