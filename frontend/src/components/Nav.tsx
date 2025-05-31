import { Link } from "react-router-dom";

// Styling/CSS
import styled from "styled-components";

// Imports Images/Icons
import Game from "../assets/icons/games.png";
import Home from "../assets/icons/home.png";
import Profile from "../assets/icons/profile.png";

const NAV = styled.div`
  background-color: #2a1e33;
  margin-top: 0;
  padding-top: 10px;
`;

const IMG = styled.img`
  height: 25px;
  width: auto;

  @media (min-width: 350px) {
    height: 30px;
    width: auto;
  }

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
    animation: icon-animation 0.6s ease-in-out alternate infinite;
    transform-origin: center;
  }
  
  @keyframes icon-animation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.25;
  } 
}
`;

const LINK = styled(Link)`
  text-decoration: none;
  color: #d19efa;
  padding: 5px 40px;
  font-size: large;
`;
// End of Styling/CSS

function Nav() {
  return (
    <>
      <NAV>
        <LINK to="/Games">
          <IMG
            alt="Icon of a hand controller that directs the user to browse more games."
            src={Game}
          />
        </LINK>
        <LINK to="/Home">
          <IMG
            alt="Icon of a house that directs the user to the home page."
            src={Home}
          />
        </LINK>
        <LINK to="/Account">
          <IMG
            alt="Icon of a person that directs the user to their profile."
            src={Profile}
          />
        </LINK>
      </NAV>
    </>
  );
}

export default Nav;
