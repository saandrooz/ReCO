import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h1>Create Account</h1>
      <p>Create an account to get access to ReCO!</p>
      <div className="main_div">
      <div className="container">
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
                    "Error: Could not create account. Please fill in account details. Username and Email has to be unique."
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
          <div className="input">
            <label>Username: </label>
            <br />
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="Username"
              type="text"
              value={username}
              required />
          </div>
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
          <button type="submit">Create Account</button>
        </form>
      </div>
      </div>
      <div className="main_div">
        <button>
          <Link to={"/"}>Click here to log in</Link>
        </button>
      </div>
    </>
  );
}

export default Register;
