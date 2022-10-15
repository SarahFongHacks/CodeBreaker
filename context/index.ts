import { createContext, useContext } from "react";
import { User } from "../types/types";

export const LoginContext = createContext<{
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({ user: undefined, setUser: () => undefined });
