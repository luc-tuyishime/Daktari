import React, { Component } from "react";
// import { connect } from "react-redux"
import { Segment, Button, Card, Icon, Header, Form } from "semantic-ui-react";
import { isLoggedIn, getUserDetails } from "../../../util/AuthService";
import { Link, withRouter } from "react-router-dom";
import {
  keepTrackMenu,
  mainAdminMenu,
  dashboardProfileMenu,
  renderDashboardItems,
  loadUserProfileCard
} from "../includes.js";
import { API_BASE_URL } from "../../../constants";
import axios from "axios";

class ProfileUpdate extends Component {
  constructor(props) {
    super(props);

    var userDetails = getUserDetails();
    this.state = {
      activeItem: "home",
      minActiveItem: "profile",
      firstName: userDetails.data.firstName,
      lastName: userDetails.data.lastName,
      email: userDetails.data.email,
      msisdn: userDetails.data.msisdn,
      address: userDetails.data.address
    };
  }

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name });

  componentWillMount() {
    this.checkAuth();
  }

  checkAuth() {
    if (!isLoggedIn()) {
      this.props.history.push("/");
    }
  }

  onSubmit = e => {
    console.log("submit clicked");
  };

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
            <Header as="h2">Profile Update</Header>

            {/* {dashboardProfileMenu(minActiveItem, this.handleItemClick)} */}

            <Segment attached="bottom">
              <Form>
                <Form.Field>
                  <label>First Name</label>
                  <input
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={e => this.setState({ firstName: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={e => this.setState({ lastName: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    placeholder="Email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Phone Number</label>
                  <input
                    placeholder="Phone"
                    type="number"
                    maxLength="12"
                    value={this.state.msisdn}
                    onChange={e => this.setState({ msisdn: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Address</label>
                  <input
                    placeholder="Address"
                    value={this.state.address}
                    onChange={e => this.setState({ address: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Country</label>
                  <input placeholder="Country" />
                </Form.Field>
                <Form.Field>
                  <label>Account Type</label>
                  <input placeholder="Account Type" />
                </Form.Field>
                <Form.Field>
                  {/* <Checkbox label="I agree to the Terms and Conditions" /> */}
                </Form.Field>
                <Button type="submit" primary onClick={this.onSubmit}>
                  Update
                </Button>

                <Link to="/dashboard" className="">
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    primary
                    size="small"
                  >
                    <Icon name="user" /> Back
                  </Button>
                </Link>
              </Form>
            </Segment>
            <br />
            <br />
          </div>
          <br />
        </div>

        <br />
        <br />
        <div className="custom-hr" />
      </div>
    );
  }
}

export default withRouter(ProfileUpdate);
