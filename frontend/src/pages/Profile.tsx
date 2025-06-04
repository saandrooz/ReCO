import { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// Styling/CSS
const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#D19EFA",
  inactiveFillColor: "#F5F5F5",
};
// End of Styling/CSS

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
    localStorage.removeItem("loggedInUser");
    setUser(null);
    nav("/");
  }

  return (
    <>
      <Nav />
      {userInfo && (
        <div>
          {userInfo.map((user: User) => (
            <div className="main_div" key={user.id}>
              <div className="container">
                <h1>Hello {user.username}!</h1>
                <h2>Account information:</h2>
                <p>Email: {user.email}</p>
                <p>
                  Account Created: {new Date(user.created).getFullYear()}/
                  {new Date(user.created).getMonth() + 1}/
                  {new Date(user.created).getDate()}
                </p>
              </div>
            </div>
          ))}
          {userReviews.length > 0 ? (
            <div>
              {userReviews.map((review: Review) => (
                <div className="main_div" key={review.id}>
                  <div className="container">
                    <h2>{review.title}</h2>
                    <Rating
                      className="rating"
                      value={review.rating}
                      itemStyles={myStyles}
                      items={10}
                      readOnly
                    />
                    <p>You rated this game {review.rating}/10</p>
                    <p>{review.review_text}</p>
                    <button>
                      <Link to={"/Games/" + review.game_id}>
                        Go To Game Page
                      </Link>
                    </button>
                  </div>
                </div>
              ))}{" "}
            </div>
          ) : (
            <div className="main_div">
              <div className="container">
                <h2>No Reviews Yet</h2>
                <p>Start browsing our games and share your thoughts!</p>
                <button>
                  <Link to={"/Games"}>Browse Games</Link>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <button onClick={logOutUser}>LOG OUT</button>
    </>
  );
}

export default AccountDetails;
