import { ETHNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { blockchainConfigFactory } from "../Utils";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import {
  createWeb3OfflineConnectorHelper,
  web3ConnectorFactory,
} from "../../Connectors/Factory";
import { unifiBlockchainProxyUrl } from "../../Connectors/Utils";

export const EthereumRopstenConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.EthereumRopsten,
    chainId: EthChainIds.EthRopsten,
    publicRpc: unifiBlockchainProxyUrl(Blockchains.EthereumRopsten),
    nativeToken: ETHNativeToken,
    multicall: {
      supported: true,
    },
    connectorFactory: web3ConnectorFactory,
    explorer: {
      baseUrl: "https://ropsten.etherscan.io",
      address: function (address: string) {
        return `${this.baseUrl}/address/${address}`;
      },
      token: function (address: string) {
        return `${this.baseUrl}/token/${address}`;
      },
      tx: function (address: string) {
        return `${this.baseUrl}/tx/${address}`;
      },
    },
  },
  [
    MetamaskConnector,
    TrustWalletConnector,
    MathWalletConnector,
    MetamaskCompatibleConnector,
  ],
  [
    createWeb3OfflineConnectorHelper(
      OfflineConnectors.UnifiProxy,
      unifiBlockchainProxyUrl(Blockchains.EthereumRopsten)
    ),
  ]
);
