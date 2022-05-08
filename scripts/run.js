const main = async () => {
  // This will compile our contract and generate the necessary files we need to work with our contract under the artifacts directory.
  const whitelistContractFactory = await hre.ethers.getContractFactory(
    "Whitelist"
  );
  const whitelistContract = await whitelistContractFactory.deploy();

  // We'll wait until our contract is officially deployed to our local blockchain! Our constructor runs when we deploy.
  await whitelistContract.deployed();

  console.log("Whitelist Contract deployed to: ", whitelistContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
