
const hre = require("hardhat");
const fs = require("fs");

async function main() {

  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address);
  // We get the contract to deploy
  const HelloWorldContract = await hre.ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorldContract.deploy("Hello world");

  await helloWorld.deployed();

  console.log("Hello world deployed to:", helloWorld.address);

  saveABIFiles()
}

function saveABIFiles() {
  const TokenArtifact = artifacts.readArtifactSync("HelloWorld");

  fs.mkdirSync("abi", { recursive: true })

  fs.writeFileSync(
    "abi/ContractABI.json",
    JSON.stringify(TokenArtifact, null, 2),
    {}
  );

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
