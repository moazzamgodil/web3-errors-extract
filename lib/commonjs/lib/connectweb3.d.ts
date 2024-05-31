import Web3 from "web3";
import { RegisteredSubscription } from "web3-eth";
declare const connectWeb3: (rpc: string) => Web3<RegisteredSubscription>;
export default connectWeb3;
