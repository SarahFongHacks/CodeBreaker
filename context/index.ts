import { createContext, useContext } from "react";
import { User } from "../types/types";

export const LoginContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({ user: null, setUser: () => null });
