import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Nav from "../components/Nav";

// Styling/CSS
import styled from "styled-components";

const IMG = styled.img`
  width: 80%;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 500px;
`;

const DIV1 = styled.div`
  background-color: #2f2f2f;
  border-radius: 0.5em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 1000px;
  margin: auto;
  padding: 0 15px;
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

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/api/Games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <>
      <Nav />
      <div>games</div>
      <div>
        {games && (
          <div>
            {games.map((game: Game) => (
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
      </div>
    </>
  );
}

export default Games;
