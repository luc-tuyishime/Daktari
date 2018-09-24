import React, { Component } from "react";
// import { connect } from "react-redux"
import {
  Segment,
  Button,
  Icon,
  Header,
  Form,
  Grid,
  TextArea
} from "semantic-ui-react";
import { isLoggedIn, getUserDetails } from "../../../util/AuthService";
import { Link, withRouter } from "react-router-dom";
import {
  keepTrackMenu,
  mainAdminMenu,
  keepTrackSubMenu,
  loadUserProfileCard
} from "../includes.js";
import { API_BASE_URL } from "../../../constants";
import axios from "axios";

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const options = [
  { key: "p", text: "Plasma", value: "plasma" },
  { key: "w", text: "Whole Blood", value: "whole-blood" }
];

const contextOptions = [
  { key: "p1", text: "After Breakfast", value: "after-breakfast" },
  { key: "p2", text: "After Dinner", value: "after-dinner" },
  { key: "p3", text: "After Excercise", value: "after-excercise" },
  { key: "p4", text: "After Lunch", value: "after-lunch" },
  { key: "p5", text: "After Meal", value: "after-meal" },
  { key: "p6", text: "Before Bedtime", value: "before-bedtime" },
  { key: "p7", text: "Before Breakfast", value: "before-breakfast" },
  { key: "p8", text: "Before Dinner", value: "before-dinner" },
  { key: "p9", text: "Before Excercise", value: "before-excercise" },
  { key: "p10", text: "Before Lunch", value: "before-lunch" },
  { key: "w11", text: "Before Meal", value: "before-meal" },
  { key: "p12", text: "Fasting", value: "fasting" },
  { key: "p13", text: "Ignore", value: "ignore" },
  { key: "p14", text: "Non-fasting", value: "non-fasting" }
];

const date = moment();

class BloodGlucose extends Component {
  state = { activeItem: "home", minActiveItem: "blood glucose" };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name });

  constructor(props) {
    super(props);
    console.log(isLoggedIn());

    document.title = "Blood Glucose";

    this.state = {
      patientId: "",
      dateTime: moment(),
      notes: "",
      level: "",
      context: "",
      type: "",
      isLoading: false,
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      dateTime: date
    });
  }

  componentWillMount() {
    this.checkAuth();
  }

  checkAuth() {
    if (!isLoggedIn()) {
      this.props.history.push("/");
    }
  }

  onSubmit = e => {
    this.setState({ isLoading: true });

    var payload = {
      patientId: 1,
      practId: 1,
      dateTime: this.state.dateTime,
      notes: this.state.notes,
      level: this.state.level,
      baContext: this.state.context,
      typeId: this.state.type
    };
    console.log(payload);

    var loggedIn = getUserDetails();
    console.log("Getting user details ....?");
    console.log(loggedIn);

    var securityToken = "";

    if (loggedIn != null) {
      securityToken = loggedIn.token.jwt;
      payload.patientId = loggedIn.data.id;
    }

    console.log(securityToken);

    axios.defaults.headers.common["Authorization"] = "Bearer " + securityToken;

    var headers = {
      "Content-Type": "application/json"
    };

    axios
      .post(`${API_BASE_URL}/health/sugar`, payload, headers)
      .then(response => {
        this.setState({ isLoading: false });
        console.log(response.data);
        if (!response.data.error) {
          this.props.history.push("/blood-sugar");
          alert("Blood sugar recorded successfully.");
        } else {
          alert(response.data.details);
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
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
            <Header as="h2">Keep Track</Header>

            {keepTrackSubMenu(minActiveItem, this.handleItemClick)}

            <Segment attached="bottom">
              <h3>Blood Glucose </h3>

              <Grid columns={2} relaxed>
                <Grid.Column>
                  <Segment basic>
                    <Form>
                      <Form.Field>
                        <label>mmol/L *</label>
                        <input
                          placeholder="mmol/L *"
                          onChange={e =>
                            this.setState({ level: e.target.value })
                          }
                        />
                      </Form.Field>

                      <br />

                      <label>Read Date</label>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                      />

                      <br />

                      <Form.Field>
                        <Form.Field
                          control={TextArea}
                          label="Notes"
                          placeholder=""
                          onChange={e =>
                            this.setState({ notes: e.target.value })
                          }
                        />
                      </Form.Field>
                      <Button
                        floated="left"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                        onClick={this.onSubmit}
                      >
                        <Icon name="user" /> +ADD
                      </Button>
                    </Form>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment basic>
                    <Form>
                      <Form.Field>
                        <Form.Select
                          fluid
                          label="Context"
                          options={contextOptions}
                          placeholder="Context *"
                          onChange={(e, v) => {
                            this.setState({ context: v.value });
                          }}
                        />
                      </Form.Field>
                      <br />
                      <Form.Field>
                        <Form.Select
                          fluid
                          label="Select Type *"
                          options={options}
                          placeholder="Select Type *"
                          onChange={(e, v) => {
                            this.setState({ type: v.value });
                          }}
                        />
                      </Form.Field>
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid>
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

export default withRouter(BloodGlucose);
