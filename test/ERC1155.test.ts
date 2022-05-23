import { ethers } from "hardhat";
import {solidity} from "ethereum-waffle";
import chai from "chai";
import {ERC1155Minter} from "../typechain-types"
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {BytesLike, ContractFactory} from "ethers";
import Min = Mocha.reporters.Min;
import {Bytes} from "ethers/lib/utils";

chai.use(solidity);
const { expect } = chai;

describe("ERC1155Minter contract", () => {
    let accounts : SignerWithAddress[];
    let owner : SignerWithAddress;

    let erc1155MinterContract : ERC1155Minter;
    
    const uri : string = "baseUri";

    beforeEach(async () =>{
        accounts = await ethers.getSigners();
        [owner] = await ethers.getSigners();

        const erc1155MinterFactory : ContractFactory = await ethers.getContractFactory("ERC1155Minter");
        erc1155MinterContract = (await erc1155MinterFactory.connect(owner).deploy(uri)) as ERC1155Minter;
    });

    describe("deployment", () =>{
        it("Should set the right token uri", async () =>{
            expect(await erc1155MinterContract.uri(0)).to.equal(uri);
        });
    } );

    describe("supportsInterface", () => {
        it("Should support ERC165 interface", async () =>{
            expect(await erc1155MinterContract.supportsInterface("0x01ffc9a7")).to.equal(true);
        });

        it("Shouldn't support 0xffffffff interface", async () =>{
            expect(await erc1155MinterContract.supportsInterface("0xffffffff")).to.equal(false);
        });
    });

    describe("mint", () => {
        it("Should set right balance", async () => {
            const account : SignerWithAddress = accounts[1];
            const tokenId : number = 0;
            const mintAmount : number = 100;
            await erc1155MinterContract.mint(account.address, tokenId, mintAmount);
            expect(await erc1155MinterContract.balanceOf(account.address, tokenId)).to.equal(mintAmount);
        });
    });
});