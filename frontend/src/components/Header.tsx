// Styling/CSS
import styled from "styled-components";

const HEADER = styled.div`
  background-color: #2a1e33;
  margin: 0;
`;

const H1 = styled.h1`
  margin: 0;
  animation: flicker 5s infinite alternate;
  color: #fff;
  font-family: Invasion;
  font-size: 50px;

  @media (min-width: 800px) {
   font-size: 70px;
  }

  @keyframes flicker {
    0%, 3%, 5%, 42%, 44%, 100% {
        text-shadow:
        0 0 4px #fff,
        0 0 11px #d19efa,
        0 0 19px #d19efa,
        0 0 40px #d19efa,
        0 0 80px #d19efa,
        0 0 90px #d19efa,
        0 0 100px #d19efa,
        0 0 150px #d19efa;
    }
    1%, 4%, 43% {        
        text-shadow: none;
    }    
  }
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
