"use client";
import React, { ReactNode } from "react";
import translations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

function PolarisProvider({ children }: { children: ReactNode }) {
  return <AppProvider i18n={translations}>{children}</AppProvider>;
}

export default PolarisProvider;
