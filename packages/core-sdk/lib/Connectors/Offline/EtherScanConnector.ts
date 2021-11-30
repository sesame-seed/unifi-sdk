import { ethers } from "ethers";
import { Web3MulticallAdapter } from "../../Adapters";

import { Web3BaseAdapter } from "../../Adapters/Web3BaseAdapter";
import {
  EthChainIds,
  IConnectorAdapters,
  IBlockchainConfig,
  OfflineConnectors,
} from "../../Types";
import { BaseConnector } from "../BaseConnector";

export class EtherScanConnector extends BaseConnector {
  public readonly supportedChainIds = [
    EthChainIds.Eth,
    EthChainIds.EthRopsten,
    EthChainIds.EthRinkeby,
    // ...more
  ];

  constructor(config: IBlockchainConfig) {
    super(
      {
        displayName: OfflineConnectors.EtherScan,
        isWallet: false,
        name: OfflineConnectors.EtherScan,
      },
      config
    );

    if (!this.supportedChainIds.includes(this.config.chainId)) {
      throw new Error(
        `Alchemy does not support the blockchain "${this.config.blockchain}(${this.config.chainId})`
      );
    }
  }

  async connect(): Promise<IConnectorAdapters> {
    const adapter = new Web3BaseAdapter(this.config);
    adapter.setProvider(
      new ethers.providers.EtherscanProvider(this.config.chainId)
    );
    const multicall = new Web3MulticallAdapter(adapter);
    return { adapter, multicall };
  }
}
