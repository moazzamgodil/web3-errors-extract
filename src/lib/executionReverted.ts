import Web3 from "web3";
import { RegisteredSubscription } from "web3-eth";

const tryParseJSON = (value: string): any | null => {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

const decodeData = (data: string, state: any, web3: Web3<RegisteredSubscription>) => {
    const methodID = data.slice(2, 10);
    const abiItem: any = state.methodIDs[methodID];
    if (abiItem) {
        const decodedData = web3.eth.abi.decodeParameters(abiItem.inputs, data.slice(10));

        let retData: {
            name: string;
            params: Array<any>;
        } = {
            name: abiItem.name,
            params: [],
        };

        for (let i = 0; i < decodedData.__length__; i++) {
            let param: any = decodedData[i];
            let parsedParam = param;
            const isUint = abiItem.inputs[i].type.indexOf("uint") === 0;
            const isInt = abiItem.inputs[i].type.indexOf("int") === 0;
            const isAddress = abiItem.inputs[i].type.indexOf("address") === 0;

            if (isUint || isInt) {
                const isArray = Array.isArray(param);

                if (isArray) {
                    parsedParam = param.map((val: any) => val.toString());
                } else {
                    parsedParam = (param).toString();
                }
            }

            if (isAddress) {
                const isArray = Array.isArray(param);

                if (isArray) {
                    parsedParam = param.map((_: any) => _.toLowerCase());
                } else {
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
}

const executionReverted = async (err: any, state: any, web3: Web3<RegisteredSubscription>): Promise<any> => {
    let jsonObj: any = err.message;
    if (err?.data != null && err?.data != undefined) {
        jsonObj = err.data;
    } else {
        const errMsg = typeof err?.message === "string" ? err.message : "";
        const startIdx = errMsg.indexOf("{");
        const endIdx = errMsg.lastIndexOf("}");
        if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
            const parsed = tryParseJSON(errMsg.slice(startIdx, endIdx + 1));
            if (parsed) {
                jsonObj = parsed;
            }
        }
    }

    if (jsonObj?.originalError || jsonObj?.data) {
        const jsonData = typeof jsonObj?.originalError?.data === "string" && jsonObj.originalError.data.startsWith("0x")
            ? jsonObj.originalError.data
            : typeof jsonObj?.data === "string" && jsonObj.data.startsWith("0x")
                ? jsonObj.data
                : typeof jsonObj?.data?.data === "string" && jsonObj.data.data.startsWith("0x")
                    ? jsonObj.data.data
                    : null;
        if (jsonData) {
            const decodedData = decodeData(jsonData, state, web3);
            if (decodedData) {
                return decodedData;
            }
        }
        return jsonObj?.message || jsonObj?.originalError?.message || jsonObj?.data?.message;
    }
    return jsonObj;
}

export default executionReverted;
