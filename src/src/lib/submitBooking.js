import { uploadBookingToIPFS } from '../lib/ipfs';
// You will need ethers.js and MetaMask for this example
import { ethers } from 'ethers';

// ABI and contract address (replace with your deployed address)
import BookingStorageABI from '../../BookingStorageABI.json';
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

export async function submitBooking(bookingData) {
  // 1. Upload booking data to IPFS
  const ipfsHash = await uploadBookingToIPFS(bookingData);

  // 2. Connect to MetaMask
  if (!window.ethereum) throw new Error('MetaMask not found');
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // 3. Interact with smart contract
  const contract = new ethers.Contract(CONTRACT_ADDRESS, BookingStorageABI, signer);
  const tx = await contract.submitBooking(ipfsHash);
  await tx.wait();
  return tx.hash;
}
