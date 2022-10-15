import { createContext, useContext } from "react";
import { User } from "../types/types";

export const LoginContext = createContext({} as User);
