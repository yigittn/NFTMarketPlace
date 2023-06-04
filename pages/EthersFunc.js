import Web3 from "web3";
import YGTABI from "../artifacts/contracts/Ygt.sol/Ygt.json";

export let selectedAccount;
let NFTContract;
let isInitialized = false;
let NFTContractAddress = "0x7Bb540A475d0202404701d409e0F186402D62cAf";

export const init = async () => {
  let provider = await window.ethereum;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }

  window.ethereum.on("accountsChanged", (accounts) => {
    selectedAccount = accounts[0];
  });

  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  NFTContract = new web3.eth.Contract(YGTABI.abi, NFTContractAddress);
  isInitialized = true;
};

export const getTotalSupply = async () => {
  if (!isInitialized) {
    await init();
  }

  const totalSupply = await NFTContract.methods.totalSupply().call();
  return totalSupply;
};

export const safeMint = async (tokenURI) => {
  if (!isInitialized) {
    await init();
  }
  const response = await NFTContract.methods
    .safeMint(tokenURI)
    .send({ from: selectedAccount });
  return response;
};

export const tokenURI = async (tokenId) => {
  if (!isInitialized) {
    await init();
  }
  const response = await NFTContract.methods.tokenURI(tokenId).call();
  return response;
};
