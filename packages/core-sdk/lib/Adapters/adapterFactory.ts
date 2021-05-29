import { InvalidBlockchainError } from '@root/Errors/InvalidBlockchainError'
import { Blockchains } from '@root/Types'
import { BscAdapter } from './Bsc/BscAdapter'
import { EthAdapter } from './Eth/EthAdapter'
import { IAdapter } from './IAdapter'
import { IotxAdapter } from './Iotex/IotexAdapter'
import { TrxAdapter } from './Trx/TrxAdapter'

export const adapterFactory = (chain: Blockchains): IAdapter => {
  const adapter = {
    [Blockchains.Binance]: BscAdapter,
    [Blockchains.Ethereum]: EthAdapter,
    [Blockchains.Iotex]: IotxAdapter,
    [Blockchains.Tron]: TrxAdapter
  }[chain]

  if (!adapter) {
    throw new InvalidBlockchainError()
  }

  return new adapter()
}
