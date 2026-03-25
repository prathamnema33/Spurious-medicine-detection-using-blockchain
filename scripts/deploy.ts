import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Starting deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Get account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy the contract
  console.log("\nDeploying DrugTraceability contract...");
  const DrugTraceability = await ethers.getContractFactory("DrugTraceability");
  const drugTraceability = await DrugTraceability.deploy();

  await drugTraceability.waitForDeployment();

  const contractAddress = await drugTraceability.getAddress();
  console.log("✅ DrugTraceability deployed to:", contractAddress);

  // Save deployment info
  const deploymentInfo = {
    network: "localhost",
    contractAddress: contractAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(process.cwd(), "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  // Save deployment info to file
  fs.writeFileSync(
    path.join(deploymentsDir, "localhost-deployment.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n📄 Deployment info saved to: ./deployments/localhost-deployment.json");

  // Create frontend config file
  const srcConfigDir = path.join(process.cwd(), "src", "config");
  if (!fs.existsSync(srcConfigDir)) {
    fs.mkdirSync(srcConfigDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(srcConfigDir, "contract-config.js"),
    `export const CONTRACT_ADDRESS = "${contractAddress}";\n` +
    `export const NETWORK_NAME = "localhost";\n` +
    `export const CHAIN_ID = 31337;\n`
  );

  console.log("✅ Frontend config saved to: ./src/config/contract-config.js");

  // Register some test users
  console.log("\n🧪 Registering test users...");
  
  const signers = await ethers.getSigners();
  
  if (signers.length > 1) {
    // Register distributor
    await drugTraceability.registerUser(signers[1].address, 1);
    console.log("✅ Registered Distributor:", signers[1].address);
  }
  
  if (signers.length > 2) {
    // Register pharmacy
    await drugTraceability.registerUser(signers[2].address, 2);
    console.log("✅ Registered Pharmacy:", signers[2].address);
  }
  
  if (signers.length > 3) {
    // Register hospital
    await drugTraceability.registerUser(signers[3].address, 3);
    console.log("✅ Registered Hospital:", signers[3].address);
  }

  // Register a test drug
  console.log("\n💊 Registering test drug...");
  const currentTime = Math.floor(Date.now() / 1000);
  const expiryTime = currentTime + (365 * 24 * 60 * 60);
  
  const tx = await drugTraceability.registerDrug(
    "Aspirin",
    "BATCH-001",
    1000,
    currentTime,
    expiryTime
  );
  
  await tx.wait();
  console.log("✅ Test drug registered successfully");

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📝 Next steps:");
  console.log("1. Start your frontend: npm start");
  console.log("2. Import test accounts into MetaMask");
  console.log("3. Connect MetaMask to Hardhat Local network");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
