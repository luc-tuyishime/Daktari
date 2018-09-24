import React, { Component } from "react";
// import { connect } from "react-redux"
import {
  Input,
  Menu,
  Segment,
  Button,
  Card,
  Icon,
  Container,
  Header
} from "semantic-ui-react";
import { logout, login, isLoggedIn } from "../../util/AuthService";
import DaktariLogo from "../../img/logosign.svg";
import { Router, Route, Link, withRouter } from "react-router-dom";
import {
  keepTrackMenu,
  mainAdminMenu,
  loadUserProfileCard
} from "./includes.js";

class LearnAndDiscuss extends Component {
  state = { activeItem: "learn and discuss" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  constructor(props) {
    super(props);
    console.log(isLoggedIn());
  }

  componentWillMount() {
    this.checkAuth();
  }

  checkAuth() {
    if (!isLoggedIn()) {
      this.props.history.push("/");
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div className="ui container">
        {mainAdminMenu(activeItem, this.handleItemClick)}
        <Segment>{keepTrackMenu()}</Segment>

        <div className="custom-hr" />

        <div className="ui container">
          {loadUserProfileCard()}

          <div className="dashboard-user-profile">
            <Header as="h2">Learn and Discuss</Header>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
              elementum semper nisi. Aenean vulputate eleifend tellus. Aenean
              leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
              Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
              Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
              Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
              ullamcorper ultricies nisi.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
              elementum semper nisi. Aenean vulputate eleifend tellus. Aenean
              leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
              Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
              Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
              Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
              ullamcorper ultricies nisi.
            </p>
          </div>
        </div>

        <br />
        <div className="custom-hr" />
      </div>
    );
  }
}

export default withRouter(LearnAndDiscuss);
