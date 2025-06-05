import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// Imports Components
import Nav from "../components/Nav";
import WriteReview from "../components/WriteReview";
import AverageRating from "../components/AverageRating";

// Imports Images
import steam from "../assets/images/steam-logo.png";
import check from "../assets/images/check-steam.png";

// Styling/CSS
import styled from "styled-components";

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#D19EFA",
  inactiveFillColor: "#F5F5F5",
};

const VIDEO = styled.video`
  width: 100%;
  height: auto;

  @media (min-width: 400px) {
    width: 90%;
    height: auto;
  }
`;

const STEAM = styled.img`
  height: 40px;
  width: auto;

  @media (min-width: 400px) {
    height: 50px;
    width: auto;
  }

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
    animation: rotate 10s linear infinite;
    transform-origin: center;
  }
`;
const TEXT_IMG = styled.img`
  height: 39px;
  width: auto;
  margin-right: 5px;

  @media (min-width: 400px) {
    height: 50px;
    width: auto;
    margin-right: 15px;
  }
`;

const GENRE = styled.p`
  display: inline-block;
  padding: 1px 10px;
  margin: 10px;
  background-color: #d19efa;
  color: #2a1e33;
  border-radius: 15px;
`;

const BOX = styled.div`
  background-color: #2a1e33;
  border-radius: 0.5em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 10px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 600px;
  margin: 20px;
  padding: 0 15px 25px 15px;
  margin-bottom: 50px;
`;

const P = styled.p`
  color: #d19efa;
  font-size: 10px;

  @media (min-width: 600px) {
    font-size: 12px;
  }
`;

const DATE = styled.p`
  font-size: 10px;

  @media (min-width: 600px) {
    font-size: 12px;
  }
`;

// End of Styling/CSS

interface Game {
  id: number;
  title: string;
  developer: string;
  description: string;
  image: string;
  trailer: string;
  steam_link: string;
}

interface Genre {
  id: number;
  game_id: number;
  genre_id: number;
  name: string;
}

interface Review {
  id: number;
  game_id: number;
  user_id: number;
  rating: number;
  review_text: string;
  created: string;
  username: string;
}

function GameDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [gameDetails, setGameDetails] = useState([]);
  const [gameGenres, setGameGenres] = useState([]);
  const [gameReviews, setGameReviews] = useState([]);

  useEffect(() => {
    if (id) {
      fetch("/reco/Games/" + id)
        .then((response) => response.json())
        .then((data) => setGameDetails(data));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch("/reco/Genres/" + id)
        .then((response) => response.json())
        .then((data) => setGameGenres(data));
    }
  }, [id]);

  /* location.key ensure that reviews are fetched again every time the user navigates to a game page, even if the id hasn't changed. Without location.key, the useEffect might not trigger again because the id remains the same, and React assumes there's no need to re-run the effect. By including location.key in the dependency array, useEffect is forced to run every time the user navigates to the page even if the id is unchanged. It listens for navigation events, not just URL parameter changes. */
  useEffect(() => {
    if (id) {
      fetch("/reco/Reviews/" + id)
        .then((response) => response.json())
        .then((data) => setGameReviews(data));
    }
  }, [location.key, id]);

  return (
    <>
      <Nav />
      <div>
        {gameDetails && (
          <div className="main_div">
            {gameDetails.map((game: Game) => (
              <BOX key={game.id}>
                <h1> {game.title} </h1>
                <AverageRating id={game.id} />
                <VIDEO controls muted>
                  <source src={game.trailer} type="video/mp4" />
                </VIDEO>
                <div>
                  {gameGenres.map((genre: Genre) => (
                    <GENRE key={genre.id}>{genre.name}</GENRE>
                  ))}
                </div>
                <div>
                  <p> {game.description} </p>
                  <p>
                    {" "}
                    {game.title} is developed by {game.developer}.
                  </p>
                </div>
                <div>
                  <TEXT_IMG alt="Check it out on Steam." src={check} />
                  <a href={game.steam_link} target="_blank">
                    <STEAM alt="Steam Icon." src={steam} />
                  </a>
                </div>
              </BOX>
            ))}
          </div>
        )}
      </div>
      <div className="main_div">
        <div className="container">
          <h2>See what other think!</h2>
          <div>
            {gameReviews.map((review: Review) => (
              <div className="review_div" key={review.id}>
                <h3>Review by {review.username}</h3>

                <Rating
                  className="rating"
                  value={review.rating}
                  itemStyles={myStyles}
                  items={10}
                  readOnly
                />
                <P>
                  {review.username} gave this game a rating of {review.rating}/10
                </P>
                <p>{review.review_text}</p>
                <DATE>
                  Posted {new Date(review.created).getFullYear()}/
                  {new Date(review.created).getMonth() + 1}/
                  {new Date(review.created).getDate()}
                </DATE>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WriteReview />
      <button>
        <Link to={"/Games"}>Browse More Games</Link>
      </button>
    </>
  );
}

export default GameDetails;
