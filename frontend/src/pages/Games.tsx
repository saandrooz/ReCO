import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Nav from "../components/Nav";

import steam from "../assets/images/steam.PNG"

// Styling/CSS
import styled from "styled-components";

const IMG = styled.img`
  width: 80%;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 500px;
`;

const DIV1 = styled.div`
  background-color: #2F2139;
  border-radius: 0.5em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 1000px;
  margin: 50px auto;
  padding: 5px;
  padding-bottom: 20px;
  position: relative;
`;

const IMG_DIV = styled.div`
  position: relative;
`

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
                <IMG_DIV>
                <IMG alt="Image from the game." src={game.image} />
                <a href={game.steam_link} target="_blank"><img className="steam" alt="Steam Icon." src={steam} /></a>
                </IMG_DIV>
                <button>
                  <Link to={"/Games/" + game.id}>Show More</Link>
                </button>
              </DIV1>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Games;
