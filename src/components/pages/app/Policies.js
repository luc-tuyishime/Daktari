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

class Policies extends Component {
  state = { activeItem: "home", minActiveItem: "poliices" };

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
              <h3>Policies </h3>
              <Table celled selectable>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan="4">
                      <Link to="/policies-form" className="">
                        <Button
                          floated="right"
                          icon
                          labelPosition="left"
                          primary
                          size="small"
                        >
                          <Icon name="user" /> Add Policy
                        </Button>
                      </Link>
                      {/* <Button size="small">Approve</Button>
                      <Button disabled size="small">
                        Approve All
                      </Button> */}
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Company</Table.HeaderCell>
                    <Table.HeaderCell>Policy Number</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
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

export default withRouter(Policies);
