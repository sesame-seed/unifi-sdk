import React from "react";
import styled from "styled-components";
import {
  UnifiThemeProvider,
  Themes,
  NavigationHeader,
  mediaQueries,
} from "@unifiprotocol/uikit";
import { IConnector } from "@unifiprotocol/core-sdk";
import { AdapterProvider, useAdapter } from "./Adapter";
import { ShellEventBus } from "./EventBus";
import { Updater } from "./Components/Updater";
import { BalancesProvider, BalancesState, useBalances } from "./Balances";
import { TopHeader } from "./Components/TopHeader";
import { Sidebar } from "./Components/Sidebar";
import { NavigationProvider } from "./Navigation";

export type ShellWrappedComp = React.FC<
  {
    connection: IConnector;
    eventBus: typeof ShellEventBus;
  } & BalancesState
>;

const ShellWrapper = styled.div`
  ${mediaQueries.xs} {
    max-width: 100vw;
    overflow: hidden;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
`;

export const Shell: React.FC<{
  Wrapped?: ShellWrappedComp;
  sidebar?: React.FC<any>[];
}> = ({ Wrapped, sidebar = [] }) => {
  return (
    <AdapterProvider>
      <BalancesProvider>
        <UnifiThemeProvider theme={Themes.Dark}>
          <ShellWrapper>
            <NavigationProvider>
              <Updater />
              <NavigationHeader />
              <TopHeader />
              <ContentWrapper>
                <Sidebar />
                <ConnectedComp Wrapped={Wrapped} />
              </ContentWrapper>
            </NavigationProvider>
          </ShellWrapper>
        </UnifiThemeProvider>
      </BalancesProvider>
    </AdapterProvider>
  );
};

const ConnectedComp: React.FC<{ Wrapped?: ShellWrappedComp }> = ({
  Wrapped,
}) => {
  const { connector } = useAdapter();
  const { balances } = useBalances();
  return Wrapped ? (
    <Wrapped
      eventBus={ShellEventBus}
      connection={connector}
      balances={balances}
    />
  ) : null;
};

export default Shell;
