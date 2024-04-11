import ShopifyNavigationMenu from "@/components/ShopifyNavigationMenu";
import AppBridgeProvider from "@/providers/AppBridgeProvider";
import PolarisProvider from "@/providers/PolarisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PolarisProvider>
          <AppBridgeProvider>
            <ShopifyNavigationMenu />
            {children}
          </AppBridgeProvider>
        </PolarisProvider>
      </body>
    </html>
  );
}
