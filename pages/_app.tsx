import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LoginContext } from "../context";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [userCred, setUserCred] = useState({});

  return (
    <LoginContext.Provider value={{ userCred, setUserCred }}>
      <Component {...pageProps} />
    </LoginContext.Provider>
  );
}

export default MyApp;
