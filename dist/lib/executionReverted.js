"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Number = void 0;
let web3Number = (number, dec = null, count = 18) => {
    let num = number;
    if (dec !== null) {
        if (dec) {
            num = Number(num * 10 ** count).toLocaleString().replaceAll(",", "");
        }
        else {
            num = Number(num / 10 ** count).toLocaleString().replaceAll(",", "");
        }
    }
    return num;
};
exports.web3Number = web3Number;
const decodeData = (data, state, web3) => {
    const methodID = data.slice(2, 10);
    const abiItem = state.methodIDs[methodID];
    if (abiItem) {
        const decodedData = web3.eth.abi.decodeParameters(abiItem.inputs, data.slice(10));
        let retData = {
            name: abiItem.name,
            params: [],
        };
        for (let i = 0; i < decodedData.__length__; i++) {
            let param = decodedData[i];
            let parsedParam = param;
            const isUint = abiItem.inputs[i].type.indexOf("uint") === 0;
            const isInt = abiItem.inputs[i].type.indexOf("int") === 0;
            const isAddress = abiItem.inputs[i].type.indexOf("address") === 0;
            if (isUint || isInt) {
                const isArray = Array.isArray(param);
                if (isArray) {
                    parsedParam = param.map((val) => new (val).toString());
                }
                else {
                    parsedParam = new (param).toString();
                }
            }
            // Addresses returned by web3 are randomly cased so we need to standardize and lowercase all
            if (isAddress) {
                const isArray = Array.isArray(param);
                if (isArray) {
                    parsedParam = param.map((_) => _.toLowerCase());
                }
                else {
                    parsedParam = param.toLowerCase();
                }
            }
            retData.params.push({
                name: abiItem.inputs[i].name,
                value: parsedParam,
                type: abiItem.inputs[i].type,
            });
        }
        return retData;
    }
    return null;
};
const executionReverted = async (err, state, web3) => {
    const jsonObj = JSON.parse(err.message.slice(err.message.indexOf("{"), err.message.lastIndexOf("}") + 1));
    if (jsonObj?.originalError) {
        if (jsonObj.originalError?.message == "execution reverted" && jsonObj.originalError?.data != null && jsonObj.originalError?.data != undefined) {
            const decodedData = decodeData(jsonObj.originalError.data, state, web3);
            if (decodedData) {
                return decodedData;
            }
        }
        return jsonObj.originalError.message;
    }
    return jsonObj;
};
exports.default = executionReverted;
