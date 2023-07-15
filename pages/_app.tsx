import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GameState } from "@/interfaces/GameStates";
import { gameState } from "@/data/StateManager";

export default function App({
  Component,
  pageProps: { session, GameState, ...pageProps },
}: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={session}
    >
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}
