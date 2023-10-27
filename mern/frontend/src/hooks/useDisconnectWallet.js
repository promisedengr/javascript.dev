import { connectorName, connectorsByName } from 'hooks/connectors';

import { useWeb3React } from '@web3-react/core';

function useDisconnectWallet() {
  const { deactivate } = useWeb3React();
  return () => {
    deactivate(connectorsByName[connectorName]);
  };
}

export default useDisconnectWallet;
