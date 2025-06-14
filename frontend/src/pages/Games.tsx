import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useContext } from 'react';

// Imports Components
import Nav from '../components/Nav';
import Search from '../components/Search';
import AverageRating from '../components/AverageRating';
import UserContext from '../components/UserContext';

// Imports Images
import steam from '../assets/images/steam-logo.png';

// Styling/CSS
import styled from 'styled-components';

const IMG_DIV = styled.div`
  position: relative;
`;

const DIV1 = styled.div`
  background-color: #2a1e33;
  border-radius: 0.5em;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 10px 20px 0 rgba(0, 0, 0, 0.19);
  min-width: 90%;
  max-width: 90%;
  margin: 25px;
  padding-bottom: 20px;
`;

const IMG = styled.img`
  width: 90%;
  height: auto;
  object-fit: cover;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 500px;
`;

const BOX = styled.div`
  background-color: #2a1e33;
  border-radius: 0.5em;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 10px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 500px;
  margin: 20px;
  padding: 0 15px 25px 15px;
  margin-bottom: 50px;
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
  /* Check if user is logged in, if not, redirects user to log in page */
  const { user } = useContext(UserContext);
  const nav = useNavigate();

  useEffect(() => {
    if (!user) {
      nav('/');
    }
  }, [user, nav]);

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('/reco/Games')
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <>
      <Nav />

      <main>
        <div className="main_div">
          <DIV1>
            <h1>Explore Our Game Collection!</h1>
            <p>
              Here you'll find a growing collection of games designed for shared
              experiences - from casual co-op fun to intense multiplayer
              battles.
            </p>
          </DIV1>
        </div>

        <Search />

        <div className="main_div">
          {games && (
            <div>
              {games.map((game: Game) => (
                <BOX key={game.id}>
                  <h2> {game.title} </h2>
                  <AverageRating id={game.id} />
                  <IMG_DIV>
                    <IMG alt="Image from the game." src={game.image} />
                    <a href={game.steam_link} target="_blank">
                      <STEAM alt="Steam Icon." src={steam} />
                    </a>
                  </IMG_DIV>
                  <button>
                    <Link to={'/Games/' + game.id}>More Info</Link>
                  </button>
                </BOX>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Games;
