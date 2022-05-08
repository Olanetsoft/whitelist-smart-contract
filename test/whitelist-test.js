const { expect, use } = require("chai");
const { ethers } = require("hardhat");

describe("Whitelist", async () => {
  let whitelist;
  let whitelistContract;

  before(async () => {
    whitelist = await ethers.getContractFactory("Whitelist");
    whitelistContract = await whitelist.deploy(5);
  });

  it("should deploy", async () => {
    expect(whitelistContract.address).to.be.a("string");
    expect(whitelistContract.address).to.not.be.null;
  });

  it("should allow address to be added to whitelist", async () => {
    const whitelistAddress = "0x0000000000000000000000000000000000000000";
    await whitelistContract.addUserAddressToWhitelist(whitelistAddress);
    const isWhitelisted = await whitelistContract.isWhitelisted(
      whitelistAddress
    );
    expect(isWhitelisted).to.be.true;
  });

  it("should not allow address to be added to whitelist if already whitelisted", async () => {
    const whitelistAddress = "0x0000000000000000000000000000000000000009";
    await whitelistContract.addUserAddressToWhitelist(whitelistAddress);
    const isWhitelisted = await whitelistContract.isWhitelisted(
      whitelistAddress
    );
    expect(isWhitelisted).to.be.true;
  });

  it("should allow address to be removed from whitelist if already whitelisted", async () => {
    const whitelistAddress = "0x0000000000000000000000000000000000000009";
    await whitelistContract.removeUserAddressFromWhitelist(whitelistAddress);
    const isWhitelisted = await whitelistContract.isWhitelisted(
      whitelistAddress
    );
    expect(isWhitelisted).to.be.false;
  });

  it("should not allow address to be removed from whitelist if not whitelisted", async () => {
    const whitelistAddress = "0x0000000000000000000000000000000000000000";
    await whitelistContract.removeUserAddressFromWhitelist(whitelistAddress);
    const isWhitelisted = await whitelistContract.isWhitelisted(
      whitelistAddress
    );
    expect(isWhitelisted).to.be.false;
  });

  // Get number of whitelisted addresses
  it("should return number of whitelisted addresses", async () => {
    const whitelistAddress = "0x0000000000000000000000000000000000000000";
    await whitelistContract.addUserAddressToWhitelist(whitelistAddress);
    const numberOfWhitelistedAddresses =
      await whitelistContract.getNumberOfWhitelistedAddresses();
    expect(numberOfWhitelistedAddresses).to.equal(1);
  });

  // Get the maximum number of whitelisted addresses
  it("should return the maximum number of whitelisted addresses", async () => {
    const maxNumberOfWhitelistedAddresses =
      await whitelistContract.getMaxNumberOfWhitelistedAddresses();
    expect(maxNumberOfWhitelistedAddresses).to.equal(5);
  });

  // Get the owner of the contract
  it("should return the owner of the contract", async () => {
    const owner = await whitelistContract.getOwner();
    expect(owner).to.be.a("string");
    expect(owner).to.not.be.null;
  });
});
