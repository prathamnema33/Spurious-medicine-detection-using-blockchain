const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...\n");

  // Get signers
  const [deployer, manufacturer, distributor, hospital] = await hre.ethers.getSigners();

  console.log("📋 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy DrugTraceability contract
  console.log("\n📦 Deploying DrugTraceability contract...");
  const DrugTraceability = await hre.ethers.getContractFactory("DrugTraceability");
  const drugTraceability = await DrugTraceability.deploy();
  
  await drugTraceability.waitForDeployment();
  const contractAddress = await drugTraceability.getAddress();

  console.log("✅ DrugTraceability deployed to:", contractAddress);

  // Register test users (deployer is admin by default)
  console.log("\n👥 Registering test users...");
  
  // Register manufacturer (Role 1)
  await drugTraceability.registerUser(manufacturer.address, 1);
  console.log("✅ Registered Manufacturer:", manufacturer.address);

  // Register distributor (Role 2)
  await drugTraceability.registerUser(distributor.address, 2);
  console.log("✅ Registered Distributor:", distributor.address);

  // Register hospital (Role 3)
  await drugTraceability.registerUser(hospital.address, 3);
  console.log("✅ Registered Hospital:", hospital.address);

  // Register a test drug
  console.log("\n💊 Registering test drug...");
  const currentTime = Math.floor(Date.now() / 1000);
  const expiryTime = currentTime + (365 * 24 * 60 * 60);

  const tx = await drugTraceability.connect(manufacturer).registerDrug(
    "Aspirin",
    "BATCH-001",
    1000,
    currentTime,
    expiryTime
  );

  await tx.wait();
  console.log("✅ Test drug registered successfully");

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📝 Contract Address:", contractAddress);
  console.log("\n📝 Test Accounts:");
  console.log("Admin/Deployer:", deployer.address);
  console.log("Manufacturer:", manufacturer.address);
  console.log("Distributor:", distributor.address);
  console.log("Hospital:", hospital.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
