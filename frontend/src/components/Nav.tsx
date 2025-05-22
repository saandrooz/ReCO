import { Link } from "react-router-dom";

// Styling/CSS
import styled from "styled-components";

const NAV = styled.div`
  background-color: #2A1E33;
  margin-top: 0;
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
        <LINK to="/Games">Games</LINK>
        <LINK to="/Home">Home</LINK>
        <LINK to="/Account">Account</LINK>
      </NAV>
    </>
  );
}

export default Nav;
