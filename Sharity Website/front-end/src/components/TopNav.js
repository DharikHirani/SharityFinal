import React, { useContext } from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertContext from "./context/AlertContext";
import UserContext from "./context/UserContext";

export default function TopNav() {
  const { user, userSignedIn, signOut } = useContext(UserContext);
  const createAlert = useContext(AlertContext);

  return (
    <Navbar bg="primary" variant="dark" expand="md" className="shadow-sm">
      <Navbar.Brand style={{ width: "35px" }}>
        <img
          src="/FoodBankFinderLogo.png"
          width="55"
          height="50"
          //className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Link to="/" className="ml-2 mr-4 navbar-brand">
        Sharity
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/map" className="nav-link">
            Map
          </Link>
          <Link to="/aboutus" className="nav-link">
            About Us
          </Link>
          <Link to="/browse" className="nav-link">
            Browse
          </Link>
        </Nav>
        <Nav>
          {user.role === "organiser" && (
            <>
              <Link to="/location/add" className="nav-link">
                New Location
              </Link>

              <Link to="/events/add" className="nav-link">
                Add Event
              </Link>
            </>
          )}
          {userSignedIn ? (
            <>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <NavLink
                onClick={() => {
                  createAlert("You signed out successfully!", "success");
                  signOut();
                }}
              >
                Sign Out
              </NavLink>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
              <Link to="/sign-up" className="nav-link">
                Sign Up
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
