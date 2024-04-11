import ShopifyNavigationMenu from "@/components/ShopifyNavigationMenu";
import AppBridgeProvider from "@/providers/AppBridgeProvider";
import PolarisProvider from "@/providers/PolarisProvider";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*  eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src={`https://cdn.shopify.com/shopifycloud/app-bridge.js?apiKey=${process.env.PUBLIC_SHOPIFY_API_KEY}`}
        ></script>
      </head>
      <body>
        <PolarisProvider>
          <AppBridgeProvider>
            <NextTopLoader />
            <ShopifyNavigationMenu />
            {children}
          </AppBridgeProvider>
        </PolarisProvider>
      </body>
    </html>
  );
}
