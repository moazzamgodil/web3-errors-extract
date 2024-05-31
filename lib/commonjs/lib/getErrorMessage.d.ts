import Web3 from "web3";
import { RegisteredSubscription } from "web3-eth";
declare const getErrorMessage: (err: any, web3: Web3<RegisteredSubscription>, state: any) => Promise<string>;
export default getErrorMessage;
