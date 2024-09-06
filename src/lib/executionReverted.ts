import Web3 from "web3";
import { RegisteredSubscription } from "web3-eth";

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
                    parsedParam = param.map((val: any) => new (val).toString());
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
    } else if (err.message.indexOf("{") !== -1 && err.message.lastIndexOf("}")) {
        jsonObj = JSON.parse(
            err.message.slice(
                err.message.indexOf("{"),
                err.message.lastIndexOf("}") + 1
            )
        );
    }

    if (jsonObj?.originalError || jsonObj?.data) {
        const jsonData = jsonObj?.originalError?.data?.startsWith("0x") ? jsonObj.originalError.data : jsonObj?.data?.startsWith("0x") ? jsonObj.data : jsonObj?.data?.data?.startsWith("0x") ? jsonObj.data.data : null;
        if (jsonData) {
            const decodedData = decodeData(jsonData, state, web3);
            console.log(decodedData)
            if (decodedData) {
                return decodedData;
            }
        }
        return jsonObj?.message || jsonObj?.originalError?.message || jsonObj?.data?.message;
    }
    return jsonObj;
}

export default executionReverted;