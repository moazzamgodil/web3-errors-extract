import Web3 from "web3";
import { RegisteredSubscription } from "web3-eth";

const connectWeb3 = (rpc: string): Web3<RegisteredSubscription> => {
    const web3 = new Web3(rpc);
    return web3;
}

export default connectWeb3;