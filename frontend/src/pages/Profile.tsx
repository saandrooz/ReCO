import { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// Imports Components
import Nav from "../components/Nav";
import UserContext from "../components/UserContext";

interface User {
  id: number;
  username: string;
  email: string;
  created: string;
}

interface Review {
  id: number;
  game_id: number;
  user_id: number;
  rating: number;
  review_text: string;
  created: string;
  title: string;
}

function AccountDetails() {
  const { user, setUser } = useContext(UserContext);
  const nav = useNavigate();

  const [userInfo, setUserInfo] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (user) {
      fetch("/reco/Profile/" + user)
        .then((response) => response.json())
        .then((data) => setUserInfo(data));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetch("/reco/UserReviews/" + user)
        .then((response) => response.json())
        .then((data) => setUserReviews(data));
    }
  }, [user]);

  function logOutUser() {
    setUser(0);
    nav("/");
    localStorage.removeItem("loggedInUser");
  }

  return (
    <>
      <Nav />
      {userInfo && (
        <div>
          {userInfo.map((user: User) => (
            <div className="main_div">
              <div className="container" key={user.id}>
                <h1>Hello {user.username}!</h1>
                <h2>Account information:</h2>
                <p>Email: {user.email}</p>
                <p>Account Created: {user.created}</p>
              </div>
            </div>
          ))}
          {userReviews.map((review: Review) => (
            <div className="main_div">
              <div className="container" key={review.id}>
                <h2>{review.title}</h2>
                <p>{review.rating}/10</p>
                <p>{review.review_text}</p>
                <button>
                  <Link to={"/Games/" + review.game_id}>Go to game page</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={logOutUser}>Log out</button>
    </>
  );
}

export default AccountDetails;
