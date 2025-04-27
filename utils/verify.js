const { run } = require("hardhat");

async function verifyContract(contractAddress) {
    console.log('Verifying contract...')
    try {
      await run('verify:verify', {
        address: contractAddress,
      })
    } catch (error) {
      if (error.message.toLowerCase().includes('already verified')) {
        console.log('Contract already verified')
      } else {
        console.log(error)
      }
    }
  }

module.exports = { verifyContract };