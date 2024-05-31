import { Eip838ExecutionError } from "web3";
function parseInnerError(e) {
    if (e?.innerError?.errorSignature) {
        return e.innerError;
    }
    if (!e.innerError) {
        if (e?.data?.data.startsWith('0x')) {
            e.innerError = new Eip838ExecutionError(e.data);
        }
    }
    return e.innerError;
}
const _getErrOfTx = async (txHash, web3) => {
    const tx = await web3.eth.getTransaction(txHash);
    if (tx.gasPrice) {
        delete tx.maxPriorityFeePerGas;
        delete tx.maxFeePerGas;
    }
    try {
        await web3.eth.call(tx, tx.blockNumber);
        return "Success Tx";
    }
    catch (e) {
        if (e?.innerError) {
            const innerError = parseInnerError(e);
            if (typeof innerError === "object") {
                if (innerError?.message) {
                    return innerError.message;
                }
                else {
                    return JSON.stringify(innerError);
                }
            }
            return innerError;
        }
        const errMsg = e.toString();
        if (errMsg && errMsg.startsWith("Error")) {
            let errObj = errMsg.slice(errMsg.indexOf("{"), errMsg.length);
            if (errObj.indexOf("{") !== -1 && errObj.lastIndexOf("}")) {
                errObj = JSON.parse(errObj);
                return errObj.message;
            }
        }
        if (e?.message)
            return e.message;
    }
    return "Reverted without reason";
};
const getErrOfTx = (txHash, web3) => {
    return new Promise((resolve, reject) => {
        _getErrOfTx(txHash, web3)
            .then((res) => {
            resolve(res);
        })
            .catch((err) => {
            reject(err);
        });
    });
};
export default getErrOfTx;
//# sourceMappingURL=getErrOfTx.js.map