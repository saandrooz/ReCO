import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Imports Components
import Nav from "../components/Nav";
import WriteReview from "../components/WriteReview";
import AverageRating from "../components/AverageRating";

// Imports Images
import steam from "../assets/images/steam-logo.png";
import check from "../assets/images/check-steam.png";

// Styling/CSS
import styled from "styled-components";

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

const REVIEWS = styled.div`
  padding: 10px 30px;
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
          <REVIEWS>
            {gameReviews.map((review: Review) => (
              <div className="review_div" key={review.id}>
                <p>
                  Review by <strong>{review.username}</strong>
                </p>
                <p>Rating: {review.rating}/10</p>
                <p>{review.review_text}</p>
                <p>
                  Posted {new Date(review.created).getFullYear()}/
                  {new Date(review.created).getMonth() + 1}/
                  {new Date(review.created).getDate()}
                </p>
              </div>
            ))}
          </REVIEWS>
        </div>
      </div>
      <WriteReview />
      <button>
        <Link to={"/Games"}>Browse more games</Link>
      </button>
    </>
  );
}

export default GameDetails;
