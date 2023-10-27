import { Alchemy, Network } from 'alchemy-sdk';

const configAlchemy = {
  apiKey: '6J04CoEooT-xq4ZMGdbAeY1VcNBsAEPt',
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(configAlchemy);

export const getFloorPrice = async () => {
  const address = '0x6B302B295955954311e4622BDCCCCF52796422fA';
  const { openSea } = await alchemy.nft.getFloorPrice(address);
  return openSea.floorPrice;
};
