import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";
import METAMASK_POSSIBLE_ERRORS from "./metamask";
import Web3 from "web3";

const getErrFromWeb3 = async (err: any, web3: Web3<RegisteredSubscription>): Promise<string | null> => {
    if (err && err?.code) {
        const possibleErr = METAMASK_POSSIBLE_ERRORS?.[err.code as keyof typeof METAMASK_POSSIBLE_ERRORS];
        if (possibleErr) {
            return possibleErr.message;
        } else if (err.code === "ACTION_REJECTED") {
            return "User rejected signing";
        } else {
            return err.message;
        }
    }
    const chkErr = err?.toString();
    if (chkErr && chkErr?.startsWith("Error: Transaction has been reverted by the EVM:")) {
        const errorObjectStr = err.message.slice(42);
        const errorObject = JSON.parse(errorObjectStr);
        const txHash = errorObject.transactionHash;
        try {
            const tx: any = await web3.eth.getTransaction(txHash);
            var result = await web3.eth.call(tx);

            result = result.startsWith("0x") ? result : `0x${result}`;
            if (result && result.substring(138)) {
                const reason = web3.utils.toAscii(result.substring(138));
                console.log("Revert reason:", reason);
                return reason;
            } else {
                console.log("Cannot get reason");
            }
        } catch (e: any) {
            var errMsg2 = e.toString();
            if (errMsg2) {
                if (errMsg2.startsWith("Error")) {
                    var errObj2 = errMsg2.slice(errMsg2.indexOf("{"), errMsg2.length);
                    if (errObj2.indexOf("{") !== -1 && errObj2.lastIndexOf("}")) {
                        errObj2 = JSON.parse(errObj2);
                        return errObj2.message;
                    }
                }
            }
        }
    }
    return null;
};

export default getErrFromWeb3;