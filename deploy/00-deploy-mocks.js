const { developmentChains, initialAnswer, DECIMALS } = require("../helper-hardhat.config");
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...");
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            args: [DECIMALS, initialAnswer],
            log: true,
        });
        log("Mocks deployed!");
        log("--------------------------------");
    }
};

module.exports.tags = ["all", "mocks"];