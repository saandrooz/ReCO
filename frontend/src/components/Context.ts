import { createContext } from "react";

interface UserType {
  user: number;
  setUser: (id: number) => void;
}

const defaultValue: UserType = {
  user: 0,
  setUser: () => {},
};

export default createContext<UserType>(defaultValue);
