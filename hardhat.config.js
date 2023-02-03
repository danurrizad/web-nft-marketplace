require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_API_KEY = "STXVjIuY-qHdz6LMdoGlHu4RObMz6oxS"
const GOERLI_PRIVATE_KEY = "8af5226655090452e88e8bc3ce8195c47b8823cd9b01f26e741df19d0c3a451f"

module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  networks:{
    goerli:{
      url:`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
