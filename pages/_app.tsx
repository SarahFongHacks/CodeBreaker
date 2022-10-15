import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LoginContext } from "../context";
import { useState } from "react";
import { User } from "../types/types";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </LoginContext.Provider>
  );
}

export default MyApp;
