import { create } from 'ipfs-http-client';

const projectId = import.meta.env.VITE_INFURA_PROJECT_ID;
const projectSecret = import.meta.env.VITE_INFURA_PROJECT_SECRET;
const auth =
  'Basic ' + btoa(projectId + ':' + projectSecret);

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

export async function uploadBookingToIPFS(bookingData) {
  const { path } = await ipfs.add(JSON.stringify(bookingData));
  return path; // This is the IPFS hash
}
