const { networkConfig } = require("../helper-hardhat.config");
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    log("CHAIN ID ============================", chainId);
    const ethUsdPriceFeed = networkConfig[chainId].ethUsdPriceFeed;
    log("ETH/USD PRICE FEED ============================", ethUsdPriceFeed);

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeed],
        log: true,
    });

    log("FundMe deployed!");
};
