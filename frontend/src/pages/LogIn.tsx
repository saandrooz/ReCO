import { Link } from "react-router-dom";

// Imports Nav Component DELETE LATER, SHOULD NOT BE IN FINAL PRODUCT
import Nav from "../components/Nav";

// Styling/CSS
// import styled from "styled-components";

// End of Styling/CSS

function LogIn() {
  return (
    <>
      <Nav />
      <h1>Please sign in to use ReCO</h1>
      <div className="DIV1">
        <form>
          <h2>Login to your account</h2>
          <p>Welcome back!</p>
          <div className="INPUT">
            <label>Email: </label>
            <br />
            <input type="email" />
          </div>
          <div className="INPUT">
            <label>Password: </label>
            <br />
            <input type="password" />
          </div>
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <div>
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
