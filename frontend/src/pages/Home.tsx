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
            ReCO — our playful mix of "Co-Op" and "Recommendation" 😉 — is your
            go-to website for discovering and reviewing the best{" "}
            <strong>Co-Op</strong> and <strong>Multiplayer</strong> games out
            there. Whether you're planning a chill evening with friends or an
            all-night gaming session, we've got you covered!
          </p>

          <p>
            Not sure what Co-Op and Multiplayer mean? Here's a quick rundown:
            <ul>
              <li>
                <strong>Co-Op (Cooperative) games</strong> are designed for
                players to <em>work together</em> as a team toward a common
                goal — perfect for bonding, strategizing, and laughing your way
                through missions.
              </li>
              <br />
              <li>
                <strong>Multiplayer games</strong> simply mean more than one
                person can play. This includes both <em>cooperative</em> and{" "}
                <em>competitive</em> gameplay — so whether you're teaming up or
                facing off, there's something for everyone.
              </li>
            </ul>
          </p>

          <p>
            On ReCO, you'll find honest, community-written reviews to help you
            choose the perfect game for your next game night. You can also join
            in by submitting your own reviews and rating games based on your
            experience and preferences.
          </p>

          <p>
            Every game listed on ReCO is available on <strong>Steam</strong>,
            making it easy to jump in and start playing.
          </p>

          <H2>Browse Our Games!</H2>
          <button>
            <Link to="/games">Browse games</Link>
          </button>
          <br />
          <p>
            Don't forget to submit your own reviews to help others discover
            their next favorite game! 😄
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
