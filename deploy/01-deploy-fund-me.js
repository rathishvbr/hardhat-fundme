const { networkConfig, developmentChains } = require("../helper-hardhat.config");
const { network } = require("hardhat");

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

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeed],
        log: true,
    });

    log("FundMe deployed!");
};
