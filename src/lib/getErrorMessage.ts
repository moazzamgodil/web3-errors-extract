import Web3 from "web3";
import { RegisteredSubscription } from "web3-eth";
import executionReverted from "./executionReverted";
import internalRPCError from "./internalRPC";
import getErrFromWeb3 from "./getweb3";

const _getErrorMessage = async (err: any, web3: Web3<RegisteredSubscription>, state: any): Promise<string> => {
    const defaultErrMsg = "Something went wrong. Please try again later.";

    let ret: string | null = null;
    if (err?.message) {
        if (err.message?.includes("Internal JSON-RPC error") && err.message?.indexOf("{") !== -1) {
            ret = await internalRPCError(err, web3);
        }

        if (
            !ret
            && err.message?.includes("execution reverted:")
        ) {
            ret = err.message.slice(
                err.message.indexOf("execution reverted:"),
                err.message.length
            );
        }

        if (
            !ret &&
            ((err.message?.includes("execution reverted") && (err.message?.indexOf("{") !== -1 || (err?.data != null && err?.data != undefined))) ||
                (err.message?.includes("Internal JSON-RPC error") && (err?.data != null && err?.data != undefined)))
        ) {
            ret = await executionReverted(err, state, web3);
        }
    }

    if (!ret) {
        const errFromWeb3 = await getErrFromWeb3(err, web3);
        if (errFromWeb3) {
            ret = errFromWeb3;
        }
    }

    if (ret) {
        const returnMsg: any = typeof ret == "object" ? JSON.stringify(ret) : ret;
        return typeof returnMsg != "string" ? returnMsg.toString() : returnMsg;
    } else if (err?.message) {
        return err.message;
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