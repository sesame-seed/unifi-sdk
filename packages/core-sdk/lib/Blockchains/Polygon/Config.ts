import { MATICNativeToken } from "./NativeToken";
import { Blockchains, EthChainIds, OfflineConnectors } from "../../Types";
import { MetamaskConnector } from "../../Connectors/Wallets/MetamaskConnector";
import { blockchainConfigFactory, web3ConnectorFactory } from "../utils";
import { MetamaskCompatibleConnector } from "../../Connectors/Wallets/MetamaskCompatibleConnector";

export const PolygonConfig = blockchainConfigFactory(
  {
    blockchain: Blockchains.Polygon,
    chainId: EthChainIds.Polygon,
    nativeToken: MATICNativeToken,
    multicall: {
      supported: true,
      address: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
      tryAggregate: false,
    },
    explorer: {
      baseUrl: "https://polygonscan.com",
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
  [web3ConnectorFactory(OfflineConnectors.Polygon, "https://polygon-rpc.com")]
);
