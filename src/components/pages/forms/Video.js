import React, { Component } from "react";
// import { connect } from "react-redux"
import { Segment, Button, Icon, Header, Form, Grid } from "semantic-ui-react";
import { isLoggedIn } from "../../../util/AuthService";
import { Link, withRouter } from "react-router-dom";
import {
  keepTrackMenu,
  mainAdminMenu,
  keepTrackSubMenu,
  loadUserProfileCard
} from "../includes.js";
import { API_BASE_URL } from "../../../constants";
import axios from "axios";

class Video extends Component {
  state = { activeItem: "home", minActiveItem: "blood glucose" };

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
              <br />

              <Link to="/keep-track">
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

              <br />
              <br />

              <Grid columns={3} relaxed>
                <Grid.Column>
                  <Segment basic>
                    <Form>
                      <Form.Field>
                        <label>mmol/L *</label>
                        <input placeholder="mmol/L *" />
                      </Form.Field>
                      <Form.Field>
                        <label>Read Date</label>
                        <input placeholder="mmol/L *" />
                      </Form.Field>
                      <Form.Field>
                        <label>Notes</label>
                        <input placeholder="mmol/L *" />
                      </Form.Field>
                      <br />
                      <Link to="/keep-track" className="">
                        <Button
                          floated="left"
                          icon
                          labelPosition="left"
                          primary
                          size="small"
                        >
                          <Icon name="user" /> +ADD
                        </Button>
                      </Link>
                      <br />
                    </Form>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment basic>
                    <Form>
                      <Form.Field>
                        <label>Context</label>
                        <input placeholder="mmol/L *" />
                      </Form.Field>
                      <Form.Field>
                        <label>Reading Time</label>
                        <input placeholder="mmol/L *" />
                      </Form.Field>
                    </Form>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment basic>
                    <Form>
                      <Form.Field>
                        <label>Type *</label>
                        <input placeholder="mmol/L *" />
                      </Form.Field>
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid>
              <br />
            </Segment>
            <br />
            <br />
          </div>
        </div>

        <br />
        <div className="custom-hr" />
      </div>
    );
  }
}

export default withRouter(Video);
