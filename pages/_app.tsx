import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LoginContext } from "../context";
import { useEffect, useState } from "react";
import { User } from "../types/types";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";

const font = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(undefined);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (user) {
      window.localStorage.setItem("user", JSON.stringify(user));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  return (
    <LoginContext.Provider value={{ user, setUser, loading }}>
      <AnimatePresence exitBeforeEnter>
        <main className={font.className}>
          <Component {...pageProps} key={router.asPath} />
        </main>
      </AnimatePresence>
    </LoginContext.Provider>
  );
}

export default MyApp;
