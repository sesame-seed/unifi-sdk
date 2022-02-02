import { blockchainConfigMap } from "./Blockchains";
import {
  Blockchains,
  IBlockchainConfig,
  IConnector,
  IBlockchainExplorer,
} from "./Types";

export const getBlockchainConfig = (
  blockchain: Blockchains
): IBlockchainConfig => {
  if (blockchainConfigMap[blockchain]) {
    return blockchainConfigMap[blockchain];
  }
  throw new Error(`Blockchain config not found for ${blockchain}`);
};

export const getBlockchainWalletConnectors = (
  blockchain: Blockchains
): IConnector[] => {
  const config = getBlockchainConfig(blockchain);
  return config.wallets;
};

export const getBlockchainOfflineConnectors = (
  blockchain: Blockchains
): IConnector[] => {
  const config = getBlockchainConfig(blockchain);
  return config.offlineConnectors;
};

export const getBlockchainOfflineConnector = (
  blockchain: Blockchains
): IConnector => {
  const config = getBlockchainConfig(blockchain);
  return config.offlineConnectors[0];
};

export const getBlockchainConnectors = (
  blockchain: Blockchains
): IConnector[] => {
  const config = getBlockchainConfig(blockchain);
  return [...config.wallets, ...config.offlineConnectors];
};

export const getBlockchainConnectorByName = (
  blockchain: Blockchains,
  connectorName: string
): IConnector => {
  return getBlockchainConnectors(blockchain).find(
    (connector) => connector.name === connectorName
  );
};

export const getBlockchainExplorer = (
  blockchain: Blockchains
): IBlockchainExplorer => {
  return getBlockchainConfig(blockchain).explorer;
};
