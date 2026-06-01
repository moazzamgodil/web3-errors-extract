import Web3 from "web3";
import getErrFromWeb3 from "./getweb3";
import { RegisteredSubscription } from "web3-eth";

const tryParseJSON = (value: string): any | null => {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

const internalRPCError = async (err: any, web3: Web3<RegisteredSubscription>): Promise<string | null> => {
    let errMsg = err.message;
    if (typeof err.message !== "string") {
        if (typeof err.message == "object") {
            errMsg = JSON.stringify(err.message);
        } else {
            errMsg = err.message.toString();
        }
    }
    const startIdx = errMsg.indexOf("{");
    const endIdx = errMsg.lastIndexOf("}");
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        const errObj = errMsg.slice(startIdx, endIdx + 1);
        const parsedErrObj = tryParseJSON(errObj);
        if (parsedErrObj) {
            const errFromWeb3 = await getErrFromWeb3(parsedErrObj, web3);
            return errFromWeb3;
        }
    }
    return null;
}

export default internalRPCError;
