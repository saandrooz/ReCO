import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useContext } from 'react';

// Imports Images
import star from '../assets/icons/star.png';

// Imports Components
import Nav from '../components/Nav';
import UserContext from '../components/UserContext';

// Styling/CSS -- START
import styled from 'styled-components';

const IMG = styled.img`
  width: 30px;
  height: auto;
`;
const UL = styled.ul`
  padding: 0;
`;

const LI = styled.li`
  list-style: none;
  margin: 0;
  padding: 10px;
  border: 1px solid #d19efa;
  border-radius: 10px;
`;

const H2 = styled.h2`
  padding-top: 50px;
  border-top: 1px solid #d19efa;
`;
// Styling/CSS -- END

function Home() {
  /* Check if user is logged in, if not, redirects user to log in page */
  const { user } = useContext(UserContext);
  const nav = useNavigate();

  useEffect(() => {
    if (!user) {
      nav('/');
    }
  }, [user, nav]);

  return (
    <>
      <Nav />

      <main>
        <div className="main_div">
          <div className="container">
            <h1>Welcome to ReCO!</h1>

            <p>
              ReCO — our playful mix of "Co-Op" and "Recommendation" — is your
              go-to website for discovering and reviewing the best{' '}
              <strong>Co-Op</strong> and <strong>Multiplayer</strong> games out
              there. Whether you're planning a chill evening with friends or an
              all-night gaming session, we've got you covered!
            </p>

            <p>
              Not sure what Co-Op and Multiplayer mean? <br /> Here's a quick
              rundown:
            </p>

            <UL>
              <LI>
                <strong>Co-Op (Cooperative) games</strong> are designed for
                players to <em>work together</em> as a team toward a common goal
                — perfect for bonding, strategizing, and laughing your way
                through missions.
              </LI>
              <br />
              <LI>
                <strong>Multiplayer games</strong> simply mean more than one
                person can play. This includes both <em>cooperative</em> and{' '}
                <em>competitive</em> gameplay — so whether you're teaming up or
                facing off, there's something for everyone.
              </LI>
            </UL>

            <p>
              On ReCO, you'll find honest, community-written reviews to help you
              choose the perfect game for your next game night. You can also
              join in by submitting your own reviews and rating games based on
              your experience and preferences.
            </p>

            <p>
              Every game listed on ReCO is available on <strong>Steam</strong>,
              making it easy to jump in and start playing right away.
            </p>

            <H2>Browse Our Games!</H2>
            <button>
              <Link to="/games">Browse Games</Link>
            </button>
            <br />
            <p>
              Don't forget to submit your own reviews to help others discover
              their next favorite game!
            </p>
            <IMG alt="Icon of a star." src={star} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
