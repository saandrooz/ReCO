import { createContext } from "react";

interface UserType {
  user: number | null | undefined;
  setUser: (id: number | null | undefined) => void;
}

const defaultValue: UserType = {
  user: null,
  setUser: () => {},
};

export default createContext<UserType>(defaultValue);
