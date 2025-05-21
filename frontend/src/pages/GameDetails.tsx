import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Nav from "../components/Nav";


// Styling/CSS
import styled from "styled-components";

const IMG = styled.img`
  width: 80%;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 600px;
`;

const DIV1 = styled.div`
  background-color: #2F2139;
  border-radius: 0.5em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 1000px;
  margin: auto;
  padding: 0 15px 15px 15px;
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

function GameDetails() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState([]);

  useEffect(() => {
    if (id) {
      fetch("/api/Games/" + id)
        .then((response) => response.json())
        .then((data) => setGameDetails(data));
    }
  }, [id]);

  return (
    <>
    <Nav />
      {gameDetails && (
          <div>
            {gameDetails.map((game: Game) => (
              <DIV1 key={game.id}>
                <h2> {game.title} </h2>
                <IMG alt="Image from the game." src={game.image} />
                <p>
                  The game "{game.title}" was developed by {game.developer}.
                  Read more about it on steam: {game.steam_link}.{" "}
                </p>
                <button>
                  <Link to={"/Games/" + game.id}>Show More</Link>
                </button>
                <div>
                  <p>
                    {" "}
                    {game.description} {game.title}{" "}
                  </p>
                </div>
              </DIV1>
            ))}
          </div>
        )}
    </>
  )
}

export default GameDetails;