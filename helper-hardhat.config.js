const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    31337: {
        name: "localhost",
    }
};

const developmentChains = ["hardhat", "localhost"];
const initialAnswer = "200000000000000000000";
const DECIMALS = 8;

module.exports = {
    networkConfig,
    developmentChains,
    initialAnswer,
    DECIMALS
};

