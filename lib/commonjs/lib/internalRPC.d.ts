import Web3 from "web3";
import { RegisteredSubscription } from "web3-eth";
declare const internalRPCError: (err: any, web3: Web3<RegisteredSubscription>) => Promise<string | null>;
export default internalRPCError;
