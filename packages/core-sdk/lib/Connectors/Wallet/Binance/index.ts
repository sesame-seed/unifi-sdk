import { MetamaskConnector } from '../Metamask'

declare global {
  interface Window {
    Binance: any
  }
}

export class BinanceWalletConnector extends MetamaskConnector {
  protected getAgent() {
    return window.Binance
  }
}
