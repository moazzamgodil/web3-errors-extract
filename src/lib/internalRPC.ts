import Web3 from "web3";
import getErrFromWeb3 from "./getweb3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

const internalRPCError = async (err: any, web3: Web3<RegisteredSubscription>): Promise<string | null> => {
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
}

export default internalRPCError;