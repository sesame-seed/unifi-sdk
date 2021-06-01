import { ConnectorMetadata } from "../../..//Entities/ConnectorMetadata";
import { WalletConnectors } from "../../../Types";

const trustWalletLogo =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NSA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik0zMi4zOTk5IDY0QzUwLjA3MyA2NCA2NC4zOTk5IDQ5LjY3MzEgNjQuMzk5OSAzMkM2NC4zOTk5IDE0LjMyNjkgNTAuMDczIDAgMzIuMzk5OSAwQzE0LjcyNjggMCAwLjM5OTkwMiAxNC4zMjY5IDAuMzk5OTAyIDMyQzAuMzk5OTAyIDQ5LjY3MzEgMTQuNzI2OCA2NCAzMi4zOTk5IDY0WiIgZmlsbD0iIzMzNzVCQiIvPgo8cGF0aCBkPSJNMzIuNjI2NyAxNEMzOC45NTA4IDE5LjI4MTYgNDYuMjAyOSAxOC45NTU5IDQ4LjI3NSAxOC45NTU5QzQ3LjgyMTcgNDguOTkzNyA0NC4zNjgzIDQzLjAzNzMgMzIuNjI2NyA1MS40NkMyMC44ODUxIDQzLjAzNzMgMTcuNDUzMyA0OC45OTM3IDE3IDE4Ljk1NTlDMTkuMDUwNSAxOC45NTU5IDI2LjMwMjYgMTkuMjgxNiAzMi42MjY3IDE0WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4zOTk5MDIpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";

export class TrustWalletMetadata extends ConnectorMetadata {
  constructor() {
    super(
      WalletConnectors.TrustWallet,
      "TrustWallet",
      true,
      trustWalletLogo,
      trustWalletLogo
    );
  }
}

export const trustWalletMetadata = new TrustWalletMetadata();
