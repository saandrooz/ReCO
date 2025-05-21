import { Link } from "react-router-dom";
import { useState } from "react";

// Imports Nav Component DELETE LATER, SHOULD NOT BE IN FINAL PRODUCT
import Nav from "../components/Nav";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Nav />
      <h1>Create Account</h1>
      <p>Create an account to get access to ReCO!</p>
      <div className="DIV1">
        <form
          onSubmit={(event) => {
            event.preventDefault();

            fetch("/reco/Register", {
              body: JSON.stringify({
                username: username,
                email: email,
                password: password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            })
              .then((response) => {
                response.text();

                if (!response.ok) {
                  alert(
                    "Error: Could not create account. Please fill in account details. Username and Email has to be unique"
                  );
                }
              })
              .then(() => {
                setUsername("");
                setEmail("");
                setPassword("");
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          <h2>Please fill in the following:</h2>
          <div className="INPUT">
            <label>Username: </label>
            <br />
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="Username"
              type="text"
              value={username}
            />
          </div>
          <div className="INPUT">
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
          <div className="INPUT">
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
          <button type="submit">Create Account</button>
        </form>
      </div>
      <div>
        <button>
          <Link to={"/"}>Click here to log in</Link>
        </button>
      </div>
    </>
  );
}

export default Register;
