import { InvalidConnectorSetup, UnknownConnectorError } from "../Errors";
import {
  Blockchains,
  Connectors,
  OfflineConnectors,
  WalletConnectors,
} from "../Types";
import { isValidBlockchain, isValidConnector } from "./Helpers";
import { IConnector } from "./IConnector";
import {
  BinanceConnector,
  BinanceTestnetConnector,
  CloudflareConnector,
  EtherScanConnector,
  IotexConnector,
  PolygonConnector,
  TronGridConnector,
} from "./Offline";
import { AlchemyConnector } from "./Offline/Alchemy";
import { AvalancheConnector } from "./Offline/Avalanche";
import { HarmonyConnector } from "./Offline/Harmony";

import {
  MathWalletConnector,
  MetamaskConnector,
  TronLinkConnector,
  BinanceChainWalletConnector,
  TrustWalletConnector,
  OtherEthWalletConnector,
  HarmonyOneWalletConnector,
} from "./Wallet";

export const connectorFactory = (
  blockchain: Blockchains,
  connectorName: Connectors
): IConnector => {
  if (!isValidConnector(connectorName)) {
    throw new UnknownConnectorError(connectorName);
  }
  if (!isValidBlockchain(blockchain)) {
    throw new InvalidConnectorSetup(connectorName, blockchain);
  }

  const ConnectorClass = {
    [WalletConnectors.Metamask]: MetamaskConnector,
    [WalletConnectors.MathWallet]: MathWalletConnector,
    [WalletConnectors.TronLink]: TronLinkConnector,
    [WalletConnectors.TrustWallet]: TrustWalletConnector,
    [WalletConnectors.Binance]: BinanceChainWalletConnector,
    [WalletConnectors.OtherEthWallet]: OtherEthWalletConnector,

    [WalletConnectors.HarmonyOneWallet]: HarmonyOneWalletConnector,
    [OfflineConnectors.Cloudflare]: CloudflareConnector,
    [OfflineConnectors.Binance]: BinanceConnector,
    [OfflineConnectors.TronGrid]: TronGridConnector,
    [OfflineConnectors.EtherScan]: EtherScanConnector,
    [OfflineConnectors.Alchemy]: AlchemyConnector,
    [OfflineConnectors.Harmony]: HarmonyConnector,
    [OfflineConnectors.Polygon]: PolygonConnector,
    [OfflineConnectors.Iotex]: IotexConnector,
    [OfflineConnectors.BinanceTestnet]: BinanceTestnetConnector,

    [OfflineConnectors.Avalanche]: AvalancheConnector,
  }[connectorName];

  return new ConnectorClass(blockchain);
};
