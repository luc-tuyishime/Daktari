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

class Email extends Component {
  state = { activeItem: "home", minActiveItem: "email" };

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
              <h3>Send Email </h3>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label="Select Doctor"
                  options={options}
                  placeholder="Doctor"
                />
                <br />
                <Form.Field control={Checkbox} label="BMI" />
                <Form.Field control={Checkbox} label="Blood Type" />
                <Form.Field control={Checkbox} label="Blood Pressure" />
                <Form.Field control={Checkbox} label="Blood Glucose" />
                <Form.Field control={Checkbox} label="Blood Cholelstrol" />
                <br />
                <TextArea
                  placeholder="Tell us more"
                  style={{ minHeight: 100 }}
                />
                <br />
                <br />
                <Button
                  floated="left"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                >
                  <Icon name="user" /> Send Email
                </Button>
                <br />
              </Form.Group>
              <br />
            </Segment>
            <br />
          </div>
        </div>

        <br />
        <div className="custom-hr" />
      </div>
    );
  }
}

export default withRouter(Email);
