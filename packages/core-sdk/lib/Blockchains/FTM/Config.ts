import { FTMToken, FTMUpToken, FTMWrappedToken } from "./Tokens";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { MathWalletConnector } from "../../Connectors/Wallets/MathWalletConnector";
import { blockchainConfigFactory } from "../Utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";
import {
  createWeb3OfflineConnectorHelper,
  web3ConnectorFactory,
} from "../../Connectors/Factory";

export const FTMConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.FTM,
    chainId: EthChainIds.FTM,
    publicRpc: "https://rpc.fantom.network",
    nativeToken: FTMToken,
    wrappedToken: FTMWrappedToken,
    upToken: FTMUpToken,
    multicall: {
      supported: true,
      address: "0x3BF91Ba76B8B60fD92F588068fAd1e6f50B9d420",
      tryAggregate: false,
    },
    connectorFactory: web3ConnectorFactory,
    explorer: {
      baseUrl: "https://ftmscan.com",
      address: function (address: string) {
        return `${this.baseUrl}/address/${address}`;
      },
      token: function (address: string) {
        return `${this.baseUrl}/tokens/${address}`;
      },
      tx: function (address: string) {
        return `${this.baseUrl}/tx/${address}`;
      },
    },
  },
  [MetamaskConnector, MathWalletConnector, MetamaskCompatibleConnector],
  [
    createWeb3OfflineConnectorHelper(
      OfflineConnectors.FTM,
      "https://rpc.FTM.tools"
    ),
  ]
);
