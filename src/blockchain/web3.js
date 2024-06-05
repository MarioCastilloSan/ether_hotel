import Web3 from 'web3';
import contractData from './HotelBooking.json';

const getContractInstance = async () => {
  const web3 = new Web3(window.ethereum);
  await window.ethereum.enable(); 

  const networkId = await web3.eth.net.getId(); 
  const deployedNetwork = contractData.networks[networkId]; 

  if (!deployedNetwork) {
    throw new Error(`El contrato no está desplegado en la red actual: ${networkId}`);
  }

  const contractAddress = deployedNetwork.address;
  const contractInstance = new web3.eth.Contract(contractData.abi, contractAddress);
  return contractInstance;
};

export default getContractInstance;

