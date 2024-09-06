import Web3 from "web3";
import getErrFromWeb3 from "./getweb3";
import { RegisteredSubscription } from "web3-eth";

const internalRPCError = async (err: any, web3: Web3<RegisteredSubscription>): Promise<string | null> => {
    let errMsg = err.message;
    if (typeof err.message !== "string") {
        if (typeof err.message == "object") {
            errMsg = JSON.stringify(err.message);
        } else {
            errMsg = err.message.toString();
        }
    }
    if (errMsg.indexOf("{") !== -1 && errMsg.lastIndexOf("}")) {
        const errObj = errMsg.slice(errMsg.indexOf("{"), errMsg.lastIndexOf("}") + 1);
        const parsedErrObj = JSON.parse(errObj);
        const errFromWeb3 = await getErrFromWeb3(parsedErrObj, web3);
        return errFromWeb3;
    }
    return null;
}

export default internalRPCError;