import { Link } from "react-router-dom";

import Nav from "../components/Nav";

// Styling/CSS -- START
import styled from "styled-components";

const UL = styled.ul`
  display: block;
  padding: 0;
`;

const LI = styled.li`
  list-style: none;
  padding: 10px;
`;

const LINK = styled(Link)`
  color: #dccbc0;
  font-size: 30px;
`;

const H2 = styled.h2`
  padding-top: 50px;
`;
// Styling/CSS -- END

function Home() {
  return (
    <>
      <Nav />
      <div>
        <H2>Please browse our games</H2>
        <UL>
          <LI>
            <LINK to="/games">GAMES</LINK>
          </LI>
        </UL>
      </div>
    </>
  );
}

export default Home;
