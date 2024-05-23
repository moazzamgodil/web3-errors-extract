import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

export let web3Number = (number: number, dec: null | boolean = null, count = 18) => {
    let num: number | string = number;
    if (dec !== null) {
        if (dec) {
            num = Number(num * 10 ** count).toLocaleString().replaceAll(",", "");
        } else {
            num = Number(num / 10 ** count).toLocaleString().replaceAll(",", "");
        }
    }

    return num;
}

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
                    parsedParam = new (param).toString();
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
    const jsonObj = JSON.parse(
        err.message.slice(
            err.message.indexOf("{"),
            err.message.lastIndexOf("}") + 1
        )
    );
    if (jsonObj?.originalError) {
        if(jsonObj.originalError?.message == "execution reverted" && jsonObj.originalError?.data != null && jsonObj.originalError?.data != undefined) {
            const decodedData = decodeData(jsonObj.originalError.data, state, web3);
            if (decodedData) {
                console.log(decodedData);
                return decodedData.name;
            }
        }
        return jsonObj.originalError.message;
    }
    return jsonObj;
}

export default executionReverted;