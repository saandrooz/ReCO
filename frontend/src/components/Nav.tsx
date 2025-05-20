import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <Link to="/Games">Games</Link>
      <Link to="/Home">Home</Link>
      <Link to="AccountDetails">Account</Link>
    </>
  )


}

export default Nav;
