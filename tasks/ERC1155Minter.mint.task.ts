import {task} from "hardhat/config";
import {ethers} from "hardhat";

task("ERC1155Minter.mint", "mint")
    .addParam("contract", "contract address")
    .addParam("to", "to address")
    .addParam("amount", "amount")
    .setAction(async (taskArgs, {ethers}) => {
        const factory = await ethers.getContractFactory("ERC1155Minter");
        const contract = await factory.attach(taskArgs.contract);

        const to: string = ethers.utils.getAddress(taskArgs.to);
        const tokenId : number = 0;
        const amount : number = taskArgs.amount;

        await contract.mint(to, tokenId, amount);
        console.log(`done`);
    });