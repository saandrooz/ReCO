// Styling/CSS
import styled from 'styled-components';

const DIV = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  gap: 50%;
  padding: 50px 20px 20px 20px;
`;

const P_DIV = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 1px solid transparent;
  padding: 0;
  font-size: 25px;
  font-family: WDX;
  background-color: #d19efa;
  cursor: pointer;
  transition: filter 1s;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

const P = styled.p`
  color: #2a1e33;
  text-decoration: none;
  padding-top: 6px;
  text-align: center;
  line-height: 1;
`;

function Footer() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <DIV>
        <p>ReCO © 2025</p>
        <P_DIV onClick={scrollToTop}>
          <P>^</P>
        </P_DIV>
      </DIV>
    </>
  );
}

export default Footer;
