import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Head from "next/head";
import Header from "@/components/Header";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <NextUIProvider>
    <NextThemesProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </NextThemesProvider>
  </NextUIProvider>
);

export default MyApp;
