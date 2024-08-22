import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TopNav from "./components/TopNav";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Map from "./pages/Map";
import AddNode from "./pages/AddNode";

import { Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import OrganiserSignUp from "./components/forms/SignUpOrgForm";
import Organisation from "./pages/Organisation";
import Member from "./pages/Member";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import EventPage from "./pages/EventPage";
import AddEvent from "./components/forms/AddEvent";
import OrganiserProfile from "./pages/OrganiserProfile";
import Footer from "./components/sections/Footer";
import DisplayOrganisersToPublic from "./pages/DisplayOrganiserToPublic";
import DisplayToPublic from "./displaypage/DisplayToPublic";

export default function App() {
  return (
    <Router>
      <Container fluid className="h-100 p-0 d-flex flex-column">
        <TopNav />

        <Container
          fluid
          className="h-10"
          style={{ height: "calc(100% - 76px)" }}
        >
          <Switch>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/location/add" role="organiser">
              <AddNode />
            </PrivateRoute>
            <PrivateRoute path="/events/add" role="organiser">
              <EventPage />
            </PrivateRoute>
            <Route path={`/organiser/:id`}>
              <OrganiserProfile />
            </Route>
            <Route path="/map" component={Map} />
            <Route path="/browse">
              <DisplayToPublic />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Route path="/organisersign-up">
              <OrganiserSignUp />
            </Route>
            <Route path="/aboutus">
              <div className="AboutUs">
                <AboutUs />
              </div>
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </Container>
    </Router>
  );
}
