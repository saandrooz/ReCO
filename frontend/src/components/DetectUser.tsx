import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useContext } from "react";

// Imports Components
import UserContext from "../components/UserContext";


function DetectUser() {
  const { user } = useContext(UserContext);
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      nav("/Home");
    } else {
      localStorage.removeItem("loggedInUser");
      nav("/");
    }
  }, [user, nav]);

  return (null)

}

export default DetectUser