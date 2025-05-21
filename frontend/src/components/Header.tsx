// Styling/CSS
import styled from "styled-components";

const HEADER = styled.div`
  background-color: #2a1e33;
  margin: 0;
`;

const H1 = styled.h1`
  margin: 0;
`;

function Header() {
  return (
    <>
      <HEADER>
        <H1>ReCO</H1>
      </HEADER>
    </>
  );
}

export default Header;
