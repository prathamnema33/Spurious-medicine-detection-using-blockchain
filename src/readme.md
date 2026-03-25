## Running the Project

Open **3 separate terminals** and run:

### Terminal 1: Start Blockchain
```bash
npx hardhat node
```
*Keep this terminal running*

### Terminal 2: Deploy Smart Contracts
```bash
npx hardhat run scripts/deploy.js --network localhost
```
*Note the contract address from output*

### Terminal 3: Start Frontend
```bash
npm start
```
*App opens at http://localhost:3000*

## MetaMask Setup

1. Add Network:
   - **Network Name:** Localhost 8545
   - **RPC URL:** http://localhost:8545
   - **Chain ID:** 31337
   - **Currency:** ETH

2. Import Account:
   - Copy private key from Hardhat terminal
   - MetaMask → Import Account → Paste key

## Usage

1. **Manufacture Drug:** Create new drug entry with name and batch number
2. **Verify Drug:** Check authenticity using Drug ID
3. **Transfer Drug:** Transfer ownership to another address

## Tech Stack

- Solidity (Smart Contracts)
- Hardhat (Development Framework)
- React.js (Frontend)
- Ethers.js (Blockchain Integration)
- Tailwind CSS (Styling)

## Troubleshooting

**Port already in use:**
```bash
PORT=3001 npm start
```

**Contract deployment error:**
```bash
npx hardhat clean
npx hardhat compile
```

---

**Developed for blockchain-based pharmaceutical supply chain management**