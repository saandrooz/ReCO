import { Link } from 'react-router-dom';
import { useState } from 'react';

// Imports Images
import happy from '../assets/icons/happy.png';
import hide from '../assets/icons/hide.png';
import show from '../assets/icons/show.png';

// Styling/CSS
import styled from 'styled-components';

const DIV = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: hsla(274, 26%, 16%, 0.4);
  border: #d19efa solid 1px;
  border-radius: 15px;
  padding: 10px;
  margin: 0 25px 0 25px;
`;

const P = styled.p`
  color: #d19efa;
  flex-basis: 100%;
`;

const LINK = styled(Link)`
  color: #d19efa;
`;

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

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOK, setIsOK] = useState<string | null>('?');

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
            <h1>Create Account</h1>
            <p>
              Create your account and start using ReCO today! <br /> Singning up
              at ReCO is completely free!
            </p>
            <IMG alt="Icon of a smiley face." src={happy} />
          </DIV1>
        </div>

        {!isOK ? (
          <ERROR_DIV>
            <ERROR_P>
              Could not create account. Please ensure all fields are filled out
              correctly. Both your <strong>username</strong> and{' '}
              <strong>email</strong> must be unique and not already registered
              on our website. Already have an account? Log in{' '}
              <ERROR_LINK to={'/'}>here</ERROR_LINK>.
            </ERROR_P>
          </ERROR_DIV>
        ) : isOK === 'OK' ? (
          <DIV>
            <P>
              Your account has been created successfully! You can now log in{' '}
              <LINK to={'/'}>here</LINK>.
            </P>
          </DIV>
        ) : (
          <div></div>
        )}

        <div className="main_div">
          <div className="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();

                fetch('/reco/Register', {
                  body: JSON.stringify({
                    username: username,
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
                  .then(() => {
                    setUsername('');
                    setEmail('');
                    setPassword('');
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
            >
              <h2>Please fill in the following:</h2>
              <div className="input">
                <label>Username:</label>
                <br />
                <input
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  placeholder="Username"
                  type="text"
                  value={username}
                  required
                />
              </div>
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
              <button type="submit">Create Account</button>
            </form>
          </div>
        </div>

        <div className="main_div">
          <button>
            <Link to={'/'}>Click Here To Log In</Link>
          </button>
        </div>
      </main>
    </>
  );
}

export default Register;
