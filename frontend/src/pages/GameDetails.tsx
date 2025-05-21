import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Imports Nav Component
import Nav from "../components/Nav";

// Imports Images
import steam from "../assets/images/steam-logo.png";
import check from "../assets/images/check-steam.png";

// Styling/CSS
import styled from "styled-components";

const VIDEO = styled.video`
  width: 90%;
  height: auto;
`;

const STEAM = styled.img`
  height: 50px;
  width: auto;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
    animation: rotate 10s linear infinite;
    transform-origin: center;
  }
`;
const TEXT_IMG = styled.img`
  height: 50px;
  width: auto;
  margin-right: 15px;
`;

const GENRE = styled.p`
  display: inline-block;
  padding: 1px 10px;
  margin: 10px;
  background-color: #d19efa;
  color: #2a1e33;
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
}

function GameDetails() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState([]);
  const [gameGenres, setGameGenres] = useState([]);

  // function getReviews() {

  // }

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

  return (
    <>
      <Nav />
      <div>
        {gameDetails && (
          <div>
            {gameDetails.map((game: Game) => (
              <div className="DIV1" key={game.id}>
                <h1> {game.title} </h1>
                <VIDEO width="320" height="240" controls muted>
                  <source src={game.trailer} type="video/mp4" />
                </VIDEO>
                <div>
                  {gameGenres.map((genre: Genre) => (
                    <GENRE key={genre.id}>{genre.genre_id}</GENRE>
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
              </div>
            ))}
          </div>
        )}
      </div>
      <button>
        <Link to={"/Games"}>Browse more games</Link>
      </button>
    </>
  );
}

export default GameDetails;
