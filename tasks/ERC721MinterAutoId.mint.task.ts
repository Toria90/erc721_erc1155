import {task} from "hardhat/config";
import {ethers} from "hardhat";

task("ERC721MinterAutoId.mint", "mint")
    .addParam("contract", "contract address")
    .addParam("to", "to address")
    .setAction(async (taskArgs, {ethers}) => {
        const factory = await ethers.getContractFactory("ERC721MinterAutoId");
        const contract = await factory.attach(taskArgs.contract);

        const to: string = ethers.utils.getAddress(taskArgs.account);

        await contract.connect(to).mint();
        console.log(`done`);
    });