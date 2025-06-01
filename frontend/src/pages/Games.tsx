import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Imports Components
import Nav from "../components/Nav";
import Search from "../components/Search"
import AverageRating from "../components/AverageRating";

// Imports Images
import steam from "../assets/images/steam-logo.png";

// Styling/CSS
import styled from "styled-components";

const IMG_DIV = styled.div`
  position: relative;
`;

const IMG = styled.img`
  width: 90%;
  height: auto;
  object-fit: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 500px;
`;

const STEAM = styled.img`
  width: 40px;
  height: auto;
  position: absolute;
  bottom: -10px;    
  right: 5px;    
  z-index: 2;
  transition: filter 0.3s ease;

  @media (min-width: 350px) {
    width: 50px;
  }

  @media (min-width: 620px) {
    width: 50px;
  }

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
    animation: rotate 10s linear infinite;
    transform-origin: center;
  }

  @keyframes rotate {
    from {
      transform: rotate(-360deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
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
    fetch("/reco/Games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <>
      <Nav />
        <div>
          <h1>Browse our collection of games!</h1>
          <p>Below is a collection of Co-Op and Multiplayer games</p>
        </div>
        <Search />
        <div className="main_div">
          {games && (
            <div>
              {games.map((game: Game) => (
                <div className="container" key={game.id}>
                  <h2> {game.title} </h2>
                  <AverageRating id={game.id}/>
                  <IMG_DIV>
                    <IMG alt="Image from the game." src={game.image} />
                    <a href={game.steam_link} target="_blank">
                      <STEAM alt="Steam Icon." src={steam} />
                    </a>
                  </IMG_DIV>
                  <button>
                    <Link to={"/Games/" + game.id}>Show More</Link>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
    </>
  );
}

export default Games;
