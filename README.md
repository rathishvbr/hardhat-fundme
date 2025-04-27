# FundMe Smart Contract

A decentralized fundraising platform built on Ethereum that allows users to fund projects with ETH, with a minimum contribution requirement in USD.

## Features

- Accept ETH donations with a minimum USD value requirement
- Real-time ETH to USD price conversion using Chainlink Price Feeds
- Secure withdrawal mechanism for contract owner
- Fallback and receive functions for handling direct ETH transfers
- Gas-efficient implementation

## Technologies Used

- Solidity ^0.8.7
- Hardhat Development Environment
- Chainlink Price Feeds
- Ethers.js
- TypeScript/JavaScript

## Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- MetaMask or any Web3 wallet
- Some test ETH (for testnet deployment)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hardhat-fundme
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
ALCHEMY_API_KEY=your_alchemy_api_key
```

## Smart Contract Architecture

### FundMe.sol
The main contract that handles:
- ETH donations with USD minimum requirement
- Fund tracking per address
- Secure withdrawal mechanism
- Price feed integration

### PriceConverter.sol
A library that handles:
- ETH to USD conversion
- Price feed data processing

## Development

1. Compile contracts:
```bash
npx hardhat compile
```

2. Run tests:
```bash
npx hardhat test
```

3. Deploy to local network:
```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

## Deployment

The contract can be deployed to various networks:

```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Deploy to other networks
npx hardhat run scripts/deploy.js --network <network-name>
```

## Security Features

- Owner-only withdrawal function
- Minimum USD contribution requirement
- Secure fund tracking
- Gas-efficient implementation
- Reentrancy protection

## Testing

The project includes comprehensive tests covering:
- Fund functionality
- Withdrawal mechanism
- Price conversion
- Access control
- Edge cases

Run the test suite with:
```bash
npx hardhat test
```

## Gas Optimization

The contract implements several gas optimization techniques:
- Immutable variables
- Efficient data structures
- Optimized loops
- Gas-efficient withdrawal mechanism

## License

This project is licensed under the MIT License.

## Author

Rathish Vijayakumar

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
