const { networkConfig, developmentChains } = require("../helper-hardhat.config");
const { network } = require("hardhat");
const { verifyContract } = require("../utils/verify");
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    log("CHAIN ID ============================", chainId);
    let ethUsdPriceFeed;

    if (developmentChains.includes(network.name)) {
        ethUsdPriceFeed = (await deployments.get("MockV3Aggregator")).address;
    } else {
        ethUsdPriceFeed = networkConfig[chainId].ethUsdPriceFeed.address;
    }
    log("ETH/USD PRICE FEED ============================", ethUsdPriceFeed);
    const args = [ethUsdPriceFeed];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
    });

    // Seems to be a bug with the verify contract function
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     await verifyContract(fundMe.address, args);
    // }

    log("FundMe deployed!");
};
