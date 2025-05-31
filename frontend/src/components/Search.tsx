import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Styling/CSS
import styled from "styled-components";

const DIV = styled.div`
  display: flex;
  margin: 0;
  justify-content: center;
  background-color: hsla(274, 26%, 16%, 0.4);
  border: #d19efa solid 1px;
  border-radius: 15px;
  padding: 10px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 25px;
`;

const P = styled.p`
  color: #d19efa;
`;

const IMG = styled.img`
  width: 80%;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 500px;
`;

const IMG_DIV = styled.div`
  position: relative;
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
  const [title, setTitle] = useState("");
  const [searchedGame, setSearchedGame] = useState<Game[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  console.log(title);
  console.log(searchedGame);
  console.log(games);

  useEffect(() => {
    fetch("/reco/Games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  function handleSearch(title: string) {
    console.log("searching...");
    const filterBySearch = games.filter((game) => {
      if (game.title.toLowerCase().includes(title.toLowerCase())) {
        console.log("Game:", game);
        return game;
      }
    });
    setSearchedGame(filterBySearch);
  }

  return (
    <>
      <div className="search_div">
        <input
          onChange={(event) => {
            setTitle(event.target.value);
            if (event.target.value !== "") {
              handleSearch(event.target.value);
            } else {
              setSearchedGame([]);
            }
          }}
          placeholder="Search game by title..."
          type="text"
          value={title}
        ></input>
        <div>
          {searchedGame.length === 0 && title.length > 0 ? (
            <div>
              <DIV>
                <div>
                  <P>Could Not find any games matching your search input. :'C</P>
                </div>
              </DIV>
            </div>
          ) : searchedGame.length > 0 ? (
            <div>
              <DIV>
                <div>
                  <P>Was this what you searched for?</P>
                </div>
                {searchedGame.map((game: Game) => (
                  <div className="container" key={game.id}>
                    <h2> {game.title} </h2>
                    <IMG_DIV>
                      <IMG alt="Image from the game." src={game.image} />
                    </IMG_DIV>
                    <button>
                      <Link to={"/Games/" + game.id}>Show More</Link>
                    </button>
                  </div>
                ))}
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
