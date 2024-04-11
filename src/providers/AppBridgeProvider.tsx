import { ReactNode } from "react";

const AppBridgeProvider = ({ children }: { children: ReactNode }) => {
  if (typeof window !== "undefined") {
    const shop = window?.shopify?.config?.shop;

    if (!shop) {
      return <p>No Shop Found</p>;
    }
  }

  return <>{children}</>;
};

export default AppBridgeProvider;
