import { ethers } from "hardhat";
import {solidity} from "ethereum-waffle";
import chai from "chai";
import {ERC721MinterAutoId} from "../typechain-types"
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {ContractFactory} from "ethers";

chai.use(solidity);
const { expect } = chai;

describe("ERC721MinterAutoId contract", () => {
    let accounts : SignerWithAddress[];
    let owner : SignerWithAddress;
    
    let erc721MinterContract : ERC721MinterAutoId;
    
    const name : string = "My contract";
    const symbol : string = "MC";
    const baseUri : string = "baseUri";
    
    beforeEach(async () =>{
        accounts = await ethers.getSigners();
        [owner] = await ethers.getSigners();
        
        const erc721MinterAutoIdFactory : ContractFactory = await ethers.getContractFactory("ERC721MinterAutoId");
        erc721MinterContract = (await erc721MinterAutoIdFactory.connect(owner).deploy(name, symbol, baseUri)) as ERC721MinterAutoId;
    });
    
    describe("deployment", () =>{
        it("Should set the right name", async () =>{
            expect(await erc721MinterContract.name()).to.equal(name);
        });

        it("Should set the right symbol", async () =>{
            expect(await erc721MinterContract.symbol()).to.equal(symbol);
        });

        it("Should set the right base token uri", async () =>{
            expect(await erc721MinterContract.tokenURI(0)).to.equal(baseUri);
        });
    } );
    
    describe("supportsInterface", () => {
        it("Should support ERC165 interface", async () =>{
            expect(await erc721MinterContract.supportsInterface("0x01ffc9a7")).to.equal(true);
        });

        it("Shouldn't support 0xffffffff interface", async () =>{
            expect(await erc721MinterContract.supportsInterface("0xffffffff")).to.equal(false);
        });
    });
    
    describe("mint", () => {
        it("Should set account owner", async () => {
            const account : SignerWithAddress = accounts[1];
            await erc721MinterContract.mint(account.address);
            const lastTokenId : number = (await erc721MinterContract.lastTokenId()).toNumber();
            expect(await erc721MinterContract.ownerOf(lastTokenId)).to.equal(account.address);
        });

        it("Should increment balance", async () => {
            const account : SignerWithAddress = accounts[1];
            const balance : number = 1;
            await erc721MinterContract.mint(account.address);
            expect(await erc721MinterContract.balanceOf(account.address)).to.equal(balance);
        });
    });
});