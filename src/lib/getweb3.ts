import { RegisteredSubscription } from "web3-eth";
import METAMASK_POSSIBLE_ERRORS from "./metamask";
import Web3 from "web3";

const tryParseJSON = (value: string): any | null => {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

const getErrFromWeb3 = async (err: any, web3: Web3<RegisteredSubscription>): Promise<string | null> => {
    if (err && (err?.code || err?.data?.code)) {
        const errCode = err?.code ? err.code : err.data.code;
        const possibleErr = METAMASK_POSSIBLE_ERRORS?.[errCode as keyof typeof METAMASK_POSSIBLE_ERRORS];
        if (possibleErr) {
            return possibleErr.message;
        } else if (errCode === "ACTION_REJECTED") {
            return "User rejected signing";
        } else {
            return err.message;
        }
    }
    const chkErr = err?.toString();
    if (chkErr && chkErr?.startsWith("Error: Transaction has been reverted by the EVM:")) {
        const errorObjectStr = err.message.slice(42);
        const errorObject = tryParseJSON(errorObjectStr);
        if (!errorObject?.transactionHash) {
            return null;
        }
        const txHash = errorObject.transactionHash;
        try {
            const tx: any = await web3.eth.getTransaction(txHash);
            if (!tx) {
                return null;
            }
            var result = await web3.eth.call(tx);
            if (typeof result !== "string") {
                result = `${result ?? ""}`;
            }

            result = result.startsWith("0x") ? result : `0x${result}`;
            if (result && result.substring(138)) {
                const reason = web3.utils.toAscii("0x" + result.substring(138));
                return reason;
            }
        } catch (e: any) {
            var errMsg2 = e.toString();
            if (errMsg2 && errMsg2?.startsWith("Error")) {
                if (errMsg2.indexOf("{") !== -1 && errMsg2.lastIndexOf("}") !== -1) {
                    let errObj2 = errMsg2.slice(errMsg2.indexOf("{"), errMsg2.lastIndexOf("}") + 1);
                    const parsedErr = tryParseJSON(errObj2);
                    if (parsedErr?.message) {
                        return parsedErr.message;
                    }
                }
            }
        }
    }
    return null;
};

export default getErrFromWeb3;
