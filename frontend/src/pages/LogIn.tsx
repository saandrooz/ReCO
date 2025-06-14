import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useContext } from 'react';

// Imports Images
import happy from '../assets/icons/happy.png';
import hide from '../assets/icons/hide.png';
import show from '../assets/icons/show.png';

// Imports Components
import Context from '../components/UserContext';

// Styling/CSS
import styled from 'styled-components';

const ERROR_DIV = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: hsla(274, 26%, 16%, 0.4);
  border: #ff707f solid 1px;
  border-radius: 15px;
  padding: 10px;
  margin: 0 25px 0 25px;
`;

const ERROR_P = styled.p`
  color: #ff707f;
`;

const ERROR_LINK = styled(Link)`
  color: #ff707f;
`;

const DIV1 = styled.div`
  background-color: #2a1e33;
  border-radius: 0.5em;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 10px 20px 0 rgba(0, 0, 0, 0.19);
  min-width: 80%;
  max-width: 80%;
  padding: 0 15px 0 15px;
  margin-bottom: 50px;
  margin-top: 50px;

  @media screen and (min-width: 700px) {
    min-width: 600px;
    max-width: 600px;
  }
`;

const IMG = styled.img`
  width: 40px;
  height: 40px;
  padding: 10px;
`;
// End of Styling/CSS

function LogIn() {
  const { setUser } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOK, setIsOK] = useState<string | null>('?');

  const nav = useNavigate();

  /* Show/Hide password */
  const [type, setType] = useState('password');
  const [visible, setVisible] = useState(false);
  const [showPasswordImg, setShowPasswordImg] = useState(show);

  function togglePassword() {
    setVisible(!visible);
    setType(visible ? 'password' : 'text');
    setShowPasswordImg(visible ? show : hide);
  }

  return (
    <>
      <main>
        <div className="main_div">
          <DIV1>
            <h1>Sign in to access ReCO</h1>
            <p>
              ReCO is your hub for discovering and reviewing the best Co-Op and
              multiplayer games. Whether you're planning a relaxed evening with
              friends or an epic all-night gaming session, we've got you
              covered!{' '}
            </p>
            <p>We've got something for every squad.</p>{' '}
            <p>
              {' '}
              Share your experiences, rate your favorite games, and help others
              find their next multiplayer adventure.
            </p>
            <p>Ready, player two? Let's get gaming!</p>
            <IMG alt="Icon of a smiley face." src={happy} />
          </DIV1>
        </div>

        {!isOK && email && password ? (
          <ERROR_DIV>
            <ERROR_P>
              User not found. Please make sure your email and password are
              correct. Don't have an account? Create one{' '}
              <ERROR_LINK to={'/Register'}>here</ERROR_LINK>.
            </ERROR_P>
          </ERROR_DIV>
        ) : (
          <div></div>
        )}

        <div className="main_div">
          <div className="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();

                fetch('/reco/', {
                  body: JSON.stringify({
                    email: email,
                    password: password,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  method: 'POST',
                })
                  .then((response) => {
                    if (response.ok) {
                      const result = response.json();
                      setIsOK('OK');
                      return result;
                    } else {
                      setIsOK(null);
                    }
                  })
                  .then((result) => {
                    setUser(result.id);
                    setEmail('');
                    setPassword('');
                    nav('/Home');
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
            >
              <h2>Login to your account</h2>
              <p>Welcome back!</p>
              <div className="input">
                <label>Email:</label>
                <br />
                <input
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  placeholder="Email"
                  type="email"
                  value={email}
                  required
                />
              </div>
              <div className="password">
                <label>Password:</label>
                <br />
                <input
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  placeholder="Password"
                  type={type}
                  value={password}
                  required
                />
                <img
                  onClick={togglePassword}
                  src={showPasswordImg}
                  alt="Toggle password visibility."
                  className="password_icon"
                />
              </div>
              <button type="submit">LOG IN</button>
            </form>
          </div>
        </div>

        <div className="main_div">
          <div>
            <h3>Don't have an account?</h3>
            <button>
              <Link to={'/Register'}>Create An Account</Link>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default LogIn;
