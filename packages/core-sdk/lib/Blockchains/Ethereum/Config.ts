import { ETHNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { AlchemyConnector } from "../../Connectors/Offline/AlchemyConnector";
import { blockchainConfigFactory } from "../Utils";
import { TrustWalletConnector } from "../../Connectors/Wallets/TrustWalletConnector";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import {
  createWeb3OfflineConnectorHelper,
  web3ConnectorFactory,
} from "../../Connectors/Factory";

export const EthereumConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Ethereum,
    chainId: EthChainIds.Eth,
    publicRpc: "https://cloudflare-eth.com/",
    nativeToken: ETHNativeToken,
    multicall: {
      supported: true,
    },
    connectorFactory: web3ConnectorFactory,
    explorer: {
      baseUrl: "https://etherscan.io",
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
    AlchemyConnector,
  ],
  [
    createWeb3OfflineConnectorHelper(
      OfflineConnectors.EtherScan,
      "https://api.etherscan.io"
    ),
    createWeb3OfflineConnectorHelper(
      OfflineConnectors.Cloudflare,
      "https://cloudflare-eth.com/"
    ),
  ]
);
