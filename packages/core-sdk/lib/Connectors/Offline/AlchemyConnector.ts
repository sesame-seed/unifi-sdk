import { ethers } from "ethers";

import { Web3BaseAdapter } from "../../Adapters/Web3BaseAdapter";
import { EthChainIds, IAdapter, IBlockchainConfig } from "../../Types";
import { BaseConnector } from "../BaseConnector";

const API_KEY = "DPREQ9e0Op53wPlvBiUOyPIBFcs8wlPo";

export class AlchemyConnector extends BaseConnector {
  public readonly supportedChainIds = [
    EthChainIds.Eth,
    EthChainIds.Polygon,
    EthChainIds.EthRopsten,
    // ...more
  ];

  constructor(config: IBlockchainConfig) {
    super(
      {
        displayName: "Alchemy",
        isWallet: false,
        name: "Alchemy",
      },
      config
    );

    if (!this.supportedChainIds.includes(this.config.chainId)) {
      throw new Error(
        `Alchemy does not support the blockchain "${this.config.blockchain}(${this.config.chainId})`
      );
    }
  }

  async connect(): Promise<IAdapter> {
    const adapter = new Web3BaseAdapter(this.config);
    adapter.setProvider(
      new ethers.providers.AlchemyProvider(this.config.chainId, API_KEY)
    );
    return adapter;
  }
}
