import React, { Component } from "react";
// import { connect } from "react-redux"
import {
  Segment,
  Button,
  Form,
  Icon,
  Header,
  Table,
  Checkbox,
  TextArea
} from "semantic-ui-react";
import { logout, login, isLoggedIn } from "../../../util/AuthService";
import { Router, Route, Link, withRouter } from "react-router-dom";
import {
  keepTrackMenu,
  mainAdminMenu,
  keepTrackSubMenu,
  loadUserProfileCard
} from "../includes.js";

const options = [
  { key: "m", text: "Dr. Kahonge, Fiona", value: "male" },
  { key: "f", text: "Dr. Kahungu, Eric", value: "female" }
];

class Video extends Component {
  state = { activeItem: "home", minActiveItem: "video" };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name });

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
    const { activeItem, minActiveItem } = this.state;
    return (
      <div className="ui container">
        {mainAdminMenu(activeItem, this.handleItemClick)}

        <Segment>{keepTrackMenu(activeItem, this.handleItemClick)}</Segment>

        <div className="custom-hr" />

        <div className="ui container">
          {loadUserProfileCard()}

          <div className="dashboard-user-profile">
            <Header as="h2">Keep Track</Header>

            {keepTrackSubMenu(minActiveItem, this.handleItemClick)}

            <Segment attached="bottom">
              <h3>Video </h3>
              <p>
                Welcome to Daktari Africa Video consultations. We offer Kenyas
                First viltual consulations with a real Doctor. This service is
                available to you from the comfort of your home/ office or
                through our partners at Westons Pharmacy,KDDA and Pharmat Before
                you proceed kindly take note of the following: If you are at
                home you will be required to have at least KES 500 in your
                Daktari Africa Wallet. This amount will be automatically
                deducted when you place a call to the doctor If you are at
                Westons Pharmacy or KDDA ensure that you have paid for your
                consultation and have your Receipt Number Handy, it is required
                before the call is placed Choose Your location I am at Westons I
                am at KDDAI am at PharmatI am at Home/Office
              </p>
            </Segment>
          </div>
        </div>

        <br />
        <div className="custom-hr" />
      </div>
    );
  }
}

export default withRouter(Video);
