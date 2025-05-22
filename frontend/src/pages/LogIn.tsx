import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";

// Imports Components
// Imports Nav Component DELETE LATER, SHOULD NOT BE IN FINAL PRODUCT
import Nav from "../components/Nav";
import Context from "../components/Context";

// Styling/CSS
// import styled from "styled-components";

// End of Styling/CSS

function LogIn() {
  const { user, setUser } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  return (
    <>
      <Nav />
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
                  console.log(user)
                  console.log(result.id)
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
              />
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
