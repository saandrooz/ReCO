import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";

// Imports Images
import happy from "../assets/icons/happy.png";

// Imports Components
import Context from "../components/UserContext";

// Styling/CSS
import styled from "styled-components";

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

const DIV1 = styled.div`
  background-color: #2a1e33;
  border-radius: 0.5em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 10px 20px 0 rgba(0, 0, 0, 0.19);
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

const P = styled.p`
  color: #d19efa;
  flex-basis: 100%;
`;

const LINK = styled(Link)`
  color: #d19efa;
`;

const IMG = styled.img`
  width: 40px;
  height: 40px;
  padding: 10px;
`;

// End of Styling/CSS

function LogIn() {
  const { setUser } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOK, setIsOK] = useState<string | null>("?");

  const nav = useNavigate();

  return (
    <>
      <div className="main_div">
        <DIV1>
          <h1>Sign in to access ReCO</h1>
          <p>
            ReCO is your hub for discovering and reviewing the best Co-Op and
            multiplayer games. Whether you're planning a relaxed evening with
            friends or an epic all-night gaming session, we've got you covered!{" "}
          </p>
          <p>We've got something for every squad.</p>{" "}
          <p>
            {" "}
            Share your experiences, rate your favorite games, and help others
            find their next multiplayer adventure.
          </p>
          <p>Ready, player two? Let's get gaming!</p>
          <IMG alt="Icon of a smiley face." src={happy} />
        </DIV1>
      </div>

      {!isOK && email && password ? (
        <DIV>
          <P>
            User not found. Please make sure your email and password are
            correct. Don't have an account? Create one{" "}
            <LINK to={"/Register"}>here</LINK>.
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

              fetch("/reco/", {
                body: JSON.stringify({
                  email: email,
                  password: password,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              })
                .then((response) => {
                  if (response.ok) {
                    const result = response.json();
                    setIsOK("OK");
                    return result;
                  } else {
                    setIsOK(null);
                  }
                })
                .then((result) => {
                  setUser(result.id);
                  setEmail("");
                  setPassword("");
                  nav("/Home");
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          >
            <h2>Login to your account</h2>
            <p>Welcome back!</p>
            <div className="input">
              <label>Email: </label>
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
            <div className="input">
              <label>Password: </label>
              <br />
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                placeholder="Password"
                type="password"
                value={password}
                required
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
            <Link to={"/Register"}>Create An Account</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default LogIn;
