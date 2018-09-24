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

class Management extends Component {
  state = { activeItem: "home", minActiveItem: "management" };

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
              <h3>Management </h3>
              <Table celled selectable>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan="4" />
                  </Table.Row>
                </Table.Header>

                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Entry Time</Table.HeaderCell>
                    <Table.HeaderCell>Management</Table.HeaderCell>
                    <Table.HeaderCell>Doctor</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body />
              </Table>
            </Segment>
          </div>
        </div>

        <br />
        <div className="custom-hr" />
      </div>
    );
  }
}

export default withRouter(Management);
