async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  
  // Get the ContractFactories and Signers here.
  const NFT = await ethers.getContractFactory('ERC721NFT');
  const Marketplace = await ethers.getContractFactory("Marketplace");

  // deploy contracts
  const marketplace = await Marketplace.deploy();
  const nft = await NFT.deploy();

  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(marketplace , "Marketplace");
  saveFrontendFiles(nft , "ERC721NFT");
}

//Function for save abi and adress of contracts ERC721-NFT and Marketplace into file json
function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });