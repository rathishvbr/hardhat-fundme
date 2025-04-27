const { deployments, ethers } = require('hardhat')
const { assert, expect } = require('chai')

describe('FundMe', function () {
  let fundMe
  let deployer
  let mockV3Aggregator

  before(async function () {
    deployer = (await getNamedAccounts()).deployer
    await deployments.fixture(['all'])
    fundMe = await ethers.getContract('FundMe', deployer)
    mockV3Aggregator = await ethers.getContract('MockV3Aggregator', deployer)
  })

  describe('constructor', function () {
    it('Set the aggregator address correctly', async function () {
      const response = await fundMe.i_priceFeed()
      assert.equal(response, mockV3Aggregator.address)
    })
  })

  describe('fund', function () {
    it('Fails if the amount is not greater than 0', async function () {
      await expect(fundMe.fund()).to.be.revertedWith(
        'You need to spend more ETH!',
      )
    })
    it('It updates the amount to the data structure', async function () {
      await fundMe.fund({ value: ethers.utils.parseEther('1') })
      const response = await fundMe.addressToAmountFunded(deployer)
      assert.equal(response.toString(), ethers.utils.parseEther('1').toString())
    })
    it('Adds funder to the list of funders', async function () {
      await fundMe.fund({ value: ethers.utils.parseEther('1') })
      const response = await fundMe.funders(0)
      assert.equal(response, deployer)
    })
  })

  describe('withdraw', function () {
    beforeEach(async function () {
      await fundMe.fund({ value: ethers.utils.parseEther('1') })
    })
    it('Withdraws the funds successfully', async function () {
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address,
      )
      const startingDeployerBalance = await fundMe.provider.getBalance(deployer)

      const transactionResponse = await fundMe.withdraw()
      const transactionReceipt = await transactionResponse.wait()
      const { gasUsed, effectiveGasPrice } = transactionReceipt
      const gasCost = gasUsed.mul(effectiveGasPrice)

      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address,
      )
      const endingDeployerBalance = await fundMe.provider.getBalance(deployer)

      assert.equal(endingFundMeBalance, 0)
      assert.equal(
        startingFundMeBalance.add(startingDeployerBalance).toString(),
        endingDeployerBalance.add(gasCost).toString(),
      )
    })

    it('Only allows the owner to withdraw', async function () {
      const accounts = await ethers.getSigners()
      const fundMeConnectedContract = await fundMe.connect(accounts[1])
      await expect(fundMeConnectedContract.withdraw()).to.be.revertedWith(
        'FundMe__NotOwner',
      )
    })
  })
})
