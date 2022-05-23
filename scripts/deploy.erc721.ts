import { ethers } from "hardhat";
import {BigNumber} from "ethers";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contract with the account: ${deployer.address}`);

    const balance : BigNumber = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`);

    
    const name : string = "My contract";
    const symbol : string = "MC";
    const baseTokenUri : string = "https://ipfs.io/ipfs/Qme2nDCoggDnztrzxWo1qSM9X8xYwNSR8nPE8527HxhYto";
    const factory = await ethers.getContractFactory("ERC721MinterAutoId");
    let contract = await factory.deploy(name, symbol, baseTokenUri);
    console.log(`contract address: ${contract.address}`);
    console.log(`transaction Id: ${contract.deployTransaction.hash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) =>{
        console.error(error);
        process.exit(1);
    });