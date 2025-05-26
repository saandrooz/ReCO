import { Link } from "react-router-dom";

// Imports Components
import Nav from "../components/Nav";

// Styling/CSS -- START
import styled from "styled-components";

const H2 = styled.h2`
  padding-top: 50px;
`;
// Styling/CSS -- END

function Home() {

  return (
    <>
      <Nav />
      <div className="main_div">
        <div className="container">
          <h1>Welcome to ReCO!</h1>
          <p>
            ReCO, or ReCOmmendation (our own wordplay on combining Co-Op and
            recommentation into one 😉) is a website dedicated to providing
            reviews on Co-Op and Multiplayer games for people who want to find
            just the right game for you and your friends on your epic game
            nights!
          </p>
          <p>
            Read reviews from real Co-Op and Multiplayer lovers to help you find
            just the right game for your future game nights. You too can also
            help other find the perfect game for them by submiting reviews and
            rate games according to your taste.
          </p>
          <p>All games listed on ReCO are available on Steam!</p>
          <H2>Browse our games!</H2>
          <p>Don't forget to submit your own reviews for others to see! 😄</p>
          <button>
            <Link to="/games">Browse games</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
