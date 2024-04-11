import { Link } from "@shopify/polaris";
import React from "react";

function ShopifyNavigationMenu() {
  return (
    <>
      {/* @ts-ignore */}
      <ui-nav-menu>
        <Link url="/">Dashboard</Link>
        <Link url="/settings">Settings</Link>
        {/* @ts-ignore */}
      </ui-nav-menu>
    </>
  );
}

export default ShopifyNavigationMenu;
