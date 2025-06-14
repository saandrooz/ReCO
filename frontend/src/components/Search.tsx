import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Imports Images
import search from '../assets/icons/search.png';

// Imports Components
import AverageRating from '../components/AverageRating';

// Styling/CSS
import styled from 'styled-components';

const INPUT = styled.input`
  width: 80%;
  max-width: 500px;
  background-color: #f5f5f5;
  text-align: center;
  font-size: 15px;
  color: #2a1e33;
  border: #d19efa solid 3px;
  border-radius: 5px;

  &:focus {
    outline: #d19efa solid 1px;
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  @media (min-width: 600px) {
    padding: 5px 0;
  }
`;

const ERROR_DIV = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: hsla(274, 26%, 16%, 0.4);
  border: #ff707f solid 1px;
  border-radius: 15px;
  padding: 10px;
  margin: 25px 25px 0 25px;
`;

const ERROR_P = styled.p`
  color: #ff707f;
`;

const DIV = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: hsla(274, 26%, 16%, 0.4);
  border: #d19efa solid 1px;
  border-radius: 15px;
  padding: 10px;
  margin: 25px 25px 0 25px;
`;

const P = styled.p`
  color: #d19efa;
  flex-basis: 100%;
`;

const DIV1 = styled.div`
  display: flex;
  justify-content: center;
  background-color: hsla(274, 26%, 16%, 0.4);
  max-width: 90%;
  align-items: center;
  margin: auto;
  padding: 10px;
  border: #d19efa solid 1px;
  border-radius: 10px;
`;

const ICON = styled.img`
  width: 20px;
  height: auto;
  padding: 5px;
  border: #d19efa solid 2px;
  border-radius: 100px;
  margin-left: 10px;
`;

const IMG = styled.img`
  width: 80%;
  height: auto;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 500px;
`;

const IMG_DIV = styled.div`
  position: relative;
`;

const BOX = styled.div`
  background-color: #2a1e33;
  border-radius: 0.5em;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 10px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 300px;
  padding: 0 5px 25px 5px;
  margin: 25px 20px;

  @media (min-width: 600px) {
    padding: 0 25px 25px 25px;
  }
`;

const H2 = styled.h2`
  font-size: 25px;
  padding: 0;
`;

const BTN = styled.button`
  margin: 10px auto 0;
  display: block;
  border: none;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 5px 10px;
  font-size: 18px;
  font-family: WDX;
  background-color: #d19efa;
  cursor: pointer;
  transition: filter 1s;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
    animation: button-animation 0.6s ease-in-out alternate infinite;
    transform-origin: center;
  }
`;

const LINK = styled(Link)`
  color: #2a1e33;
  text-decoration: none;
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

function Search() {
  const [title, setTitle] = useState('');
  const [searchedGame, setSearchedGame] = useState<Game[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('/reco/Games')
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  function handleSearch(title: string) {
    const filterBySearch = games.filter((game) => {
      if (game.title.toLowerCase().includes(title.toLowerCase())) {
        return game;
      }
    });
    setSearchedGame(filterBySearch);
  }

  return (
    <>
      <div>
        <DIV1>
          <INPUT
            onChange={(event) => {
              setTitle(event.target.value);
              if (event.target.value !== '') {
                handleSearch(event.target.value);
              } else {
                setSearchedGame([]);
              }
            }}
            placeholder="Search game by title..."
            type="text"
            value={title}
          ></INPUT>
          <ICON alt="Search icon." src={search} />
        </DIV1>

        <div>
          {searchedGame.length === 0 && title.length > 0 ? (
            <ERROR_DIV>
              <ERROR_P>
                Could not find any games matching your search input.
              </ERROR_P>
            </ERROR_DIV>
          ) : searchedGame.length > 0 ? (
            <div>
              <DIV>
                <P>Was this what you searched for?</P>
                {searchedGame.map((game: Game) => (
                  <BOX key={game.id}>
                    <H2> {game.title} </H2>
                    <AverageRating id={game.id} />
                    <IMG_DIV>
                      <IMG alt="Image from the game." src={game.image} />
                    </IMG_DIV>
                    <BTN>
                      <LINK to={'/Games/' + game.id}>Show More</LINK>
                    </BTN>
                  </BOX>
                ))}
                <P>
                  Couldn't find what you where looking for? Browse the games
                  that we do have below!
                </P>
              </DIV>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
