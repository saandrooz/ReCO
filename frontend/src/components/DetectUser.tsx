import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useContext } from "react";

// Imports Components
import UserContext from "../components/UserContext";

function DetectUser() {
  const { user, setUser } = useContext(UserContext);
  const nav = useNavigate();

  useEffect(() => {
    const getUser = Number(localStorage.getItem("loggedInUser"));

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      nav("/Home");
    } else if (user === null && getUser) {
      setUser(getUser);
      nav("/Home");
    } else if (user === undefined) {
      localStorage.removeItem("loggedInUser");
      nav("/");
    }
  }, [user, setUser, nav]);

  return null;
}

export default DetectUser;
