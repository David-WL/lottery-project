const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lottery", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployLotteryFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();

    return { lottery, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Check the default WinningNumber", async function () {
      const { lottery } = await loadFixture(deployLotteryFixture);

      expect(await lottery.getWinningNumber()).to.equal(0);
    });

    it("Should set the right owner", async function () {
      const { lottery, owner } = await loadFixture(deployLotteryFixture);

      expect(await lottery.getOwner()).to.equal(owner.address);
    });

    it("Check the default GameStatus", async function () {
      const { lottery } = await loadFixture(deployLotteryFixture);

      const [numberOfPlayers, MAX_NUMBER_OF_PLAYERS] =
        await lottery.getGameStatus();

      //console.log(numberOfPlayers);
      //expect(await lottery.getGameStatus()).to.equal([0n, 3n]);
      expect(numberOfPlayers).to.equal(0n);
      expect(MAX_NUMBER_OF_PLAYERS).to.equal(3n);
    });
  });
});
