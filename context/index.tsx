"use client";

import { wagmiAdapter, projectId } from "../config";
import { createAppKit } from "@reown/appkit";
import { mainnet, arbitrum } from "@reown/appkit/networks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Rect, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error(
    "Project Id is not defined. Make sure to set NEXT_PUBLIC_PROJECT_ID in the .env file."
  );
}

const metadata = {
  name: "appkit",
  description: "AppKit",
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum],
  defaultNetwork: mainnet,
  features: {
    analytics: true,
    email: true,
    socials: ["google", "github"],
    emailShowWallets: true,
  },
  themeMode: "light",
});

export const AppKitProvider = ({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) => {
  const initialState = cookies
    ? cookieToInitialState(wagmiAdapter.wagmiConfig, cookies)
    : undefined;

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default AppKitProvider;