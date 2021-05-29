import { Connectors } from "@root/Types";

export class UnknownConnectorError extends Error {
  constructor(connector: Connectors) {
    super(`Unknown connector "${connector}"`);
    Object.setPrototypeOf(this, UnknownConnectorError.prototype);
  }
}
