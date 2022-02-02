import { ONGNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const OntologyTestnetConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.OntologyTestnet,
    chainId: EthChainIds.OntologyTestnet,
    publicRpc: "https://cached-proxy-lvlxd.ondigitalocean.app/ont-testnet",
    nativeToken: ONGNativeToken,
    multicall: {
      supported: false,
    },
    explorer: {
      baseUrl: `https://explorer.ont.io/testnet`,
      address: function (address: string) {
        return `${this.explorerBaseUrl}/address/${address}`;
      },
      token: function (address: string) {
        return `${this.explorerBaseUrl}/token/${address}`;
      },
      tx: function (address: string) {
        return `${this.explorerBaseUrl}/tx/${address}`;
      },
    },
  },
  [MetamaskConnector, MetamaskCompatibleConnector],
  [
    web3ConnectorFactory(
      OfflineConnectors.OntologyTestnet,
      "https://cached-proxy-lvlxd.ondigitalocean.app/ont-testnet"
    ),
  ]
);
