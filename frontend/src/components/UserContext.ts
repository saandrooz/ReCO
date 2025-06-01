import { createContext } from "react";

interface UserType {
  user: number | null;
  setUser: (id: number | null) => void;
}

const defaultValue: UserType = {
  user: null,
  setUser: () => {},
};

export default createContext<UserType>(defaultValue);
