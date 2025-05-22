import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

// Imports Components
import Nav from "../components/Nav";
import Context from "../components/Context";

interface User {
  id: number;
  username: string;
  email: string;
  created: string;
}

function AccountDetails() {
  const { user } = useContext(Context);

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (user) {
      fetch("/reco/Profile/" + user)
        .then((response) => response.json())
        .then((data) => setUserInfo(data));
    }
  }, [user]);

  return (
    <>
      <Nav />
      {userInfo && (
        <div>
          {userInfo.map((user: User) => (
            <div className="container" key={user.id}>
              <h1>Hello {user.username}!</h1>
              <h2>Account information:</h2>
              <p>Email: {user.email}</p>
              <p>Account Created: {user.created}</p>
            </div>
          ))}
        </div>
      )}
      <button>
        <Link to={"/Register"}>Create an account</Link>
      </button>
    </>
  );
}

export default AccountDetails;
