import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../utilities/users-service";

function NavBar({ user, setUser }) {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <nav>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* <h5>Hello {user.name}</h5>
        <h5>Logged in with: {user.email}</h5>
        <Link to=""><button>logOut</button></Link> */}
        &nbsp;&nbsp;<span>Welcome, {user.name}</span>
        &nbsp;&nbsp;
        <Link to="" onClick={handleLogOut}>
          Log Out
        </Link>
      </div>
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
    </nav>
  );
}

export default NavBar;
