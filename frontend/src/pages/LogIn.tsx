import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";

// Imports Components
import Context from "../components/UserContext";

// Styling/CSS
// import styled from "styled-components";

// End of Styling/CSS

function LogIn() {
  const { setUser } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  return (
    <>
      <h1>Please sign in to use ReCO</h1>
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
                    return result
                  } else {
                    alert(
                      "Error: Could not log in to account. Please check if email or password is incorrect. If you do not have an account please create one."
                    );
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
                required />
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
                required />
            </div>
            <button type="submit">LOG IN</button>
          </form>
        </div>
      </div>
      <div className="main_div">
        <p>
          Don't have an account?
          <button>
            <Link to={"/Register"}>Create an account</Link>
          </button>
        </p>
      </div>
    </>
  );
}

export default LogIn;
