import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";
import config from "../../payload.config";
import { importMap } from "./admin/importMap";
import type { ServerFunctionClient } from "payload";

// Import global payload styles if needed or custom styles
import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
