import { createContext, useContext } from "react";
import { User } from "../types/types";

export const LoginContext = createContext<{
  user: User | undefined;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({ user: undefined, loading: false, setUser: () => undefined });
