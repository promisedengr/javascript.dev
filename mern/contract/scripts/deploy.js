const hre = require("hardhat");

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const info = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
};

const deployAssetLock = async (sugarHeadAddr) => {
  // // Library deployment
  // const lib = await hre.ethers.getContractFactory("IterableMapping");
  // const libInstance = await lib.deploy();
  // await libInstance.deployed();
  // console.log("Library Address--->" + libInstance.address);

  // // const AssetLock = await hre.ethers.getContractFactory("AssetLock");
  // const AssetLock = await hre.ethers.getContractFactory("AssetLock", {
  //   libraries: {
  //     IterableMapping: libInstance.address,
  //   },
  // });
  // const assetLock = await AssetLock.deploy(sugarHeadAddr);
  // await assetLock.deployed();
  // console.log("Asset Lock Contract deployed to:", assetLock.address);

  // await verify(assetLock.address, [sugarHeadAddr], {
  //   IterableMapping: libInstance.address,
  // });
  await verify(
    "0xb0D9D8ef88bD980EAf8c376968edb40153AbAB2c",
    ["0x294D3B3875b2f6bce07021370cF422E862F49C68"],
    { IterableMapping: "0x18924d33194aD44e8cA3c1DC24E1cE099A3ADa4D" }
  );
};

const deploySugarHead = async (name, symbol, chadinu, dvda, nftPrice) => {
  const SugarHead = await hre.ethers.getContractFactory("SugarHeadNFT");
  const sugarHead = await SugarHead.deploy(
    name,
    symbol,
    chadinu,
    dvda,
    nftPrice
  );
  await sugarHead.deployed();
  // console.log("sugarHead Contract deployed to:", sugarHead.address);

  // await verify(sugarHead.address, [name, symbol, chadinu, dvda, nftPrice]);
  await verify("0x294D3B3875b2f6bce07021370cF422E862F49C68", [
    name,
    symbol,
    chadinu,
    dvda,
    nftPrice,
  ]);
  // return sugarHead.address;
};

async function main() {
  await info();

  // Deploy NFT
  const sugarHeadAddr = await deploySugarHead(
    "Sugar Head NFT",
    "Sugar Head",
    // "Test NFT",
    // "NFT",
    "0xdb43e40FaC065416EACfB45A6f298EbF02Ab5D9A",
    "0xdb43e40FaC065416EACfB45A6f298EbF02Ab5D9A",
    "10000000000000000"
  );

  // Deploy Asset Lock
  await deployAssetLock(sugarHeadAddr);
  // await deployAssetLock();
}

async function verify(contractAddress, arguments, librayArg) {
  await sleep(6 * 1000);
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: arguments,
      libraries: librayArg,
    });
  } catch (error) {
    console.error(error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
