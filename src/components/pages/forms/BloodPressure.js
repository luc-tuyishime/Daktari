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

class BloodPressure extends Component {
  state = { activeItem: "home", minActiveItem: "blood pressure" };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name });

  constructor(props) {
    super(props);
    console.log(isLoggedIn());
    document.title = "Blood Pressure";

    this.state = {
      patientId: "",
      dateTime: moment(),
      notes: "",
      systolic: "",
      diastolic: "",
      pulse: "",
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
      systolic: this.state.systolic,
      diastolic: this.state.diastolic,
      pulse: this.state.pulse
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
      .post(`${API_BASE_URL}/health/pressure`, payload, headers)
      .then(response => {
        this.setState({ isLoading: false });
        console.log(response.data);
        if (!response.data.error) {
          this.props.history.push("/blood-pressure");
          alert("Blood pressure recorded successfully.");
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
              <h3>Blood Pressure </h3>
              <Grid columns={2} relaxed>
                <Grid.Column>
                  <Segment basic>
                    <Form>
                      <Form.Field>
                        <label>Systolic (mmHg)*</label>
                        <input
                          placeholder="Systolic (mmHg)"
                          onChange={e =>
                            this.setState({ systolic: e.target.value })
                          }
                        />
                      </Form.Field>
                      <Form.Field>
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
                      </Form.Field>

                      <Form.Field
                        control={TextArea}
                        label="Notes"
                        placeholder=""
                        onChange={e => this.setState({ notes: e.target.value })}
                      />

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
                        <label>Diastolic (mmHg)*</label>
                        <input
                          placeholder="Diastolic (mmHg)"
                          onChange={e =>
                            this.setState({ diastolic: e.target.value })
                          }
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Pulse</label>
                        <input
                          placeholder="Pulse"
                          onChange={e =>
                            this.setState({ pulse: e.target.value })
                          }
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

export default withRouter(BloodPressure);
