import React, { Component } from "react";
// import { connect } from "react-redux"
import { Segment, Button, Icon, Header, Form, Grid } from "semantic-ui-react";
import { isLoggedIn, getUserDetails } from "../../../util/AuthService";
import { Link, withRouter } from "react-router-dom";
import {
  keepTrackMenu,
  mainAdminMenu,
  keepTrackSubMenu,
  loadUserProfileCard
} from "../includes";
import { API_BASE_URL } from "../../../constants";
import axios from "axios";

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

class Cholestrol extends Component {
  state = { activeItem: "home", minActiveItem: "cholestrol" };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name });

  constructor(props) {
    super(props);
    console.log(isLoggedIn());
    document.title = "Cholestrol";

    this.state = {
      patientId: "",
      dateTime: moment(),
      ldl: "",
      chol: "",
      trig: "",
      hdl: "",
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
      ldl: this.state.ldl,
      totalChol: this.state.chol,
      triglycs: this.state.trig,
      hdl: this.state.hdl
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
      .post(`${API_BASE_URL}/health/chol`, payload, headers)
      .then(response => {
        this.setState({ isLoading: false });
        console.log(response.data);
        if (!response.data.error) {
          this.props.history.push("/cholestrol");
          alert("Cholestrol recorded successfully.");
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
              <h3>Cholesterol </h3>

              <Grid columns={2} relaxed>
                <Grid.Column>
                  <Segment basic>
                    <Form>
                      <Form.Field>
                        <label>LDL (mmol/L)*</label>
                        <input
                          placeholder="LDL (mmol/L)"
                          onChange={e => this.setState({ ldl: e.target.value })}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Total Cholesterol *</label>
                        <input
                          placeholder="Total Cholesterol"
                          onChange={e =>
                            this.setState({ chol: e.target.value })
                          }
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Triglycerides *</label>
                        <input
                          placeholder="Triglycerides"
                          onChange={e =>
                            this.setState({ trig: e.target.value })
                          }
                        />
                      </Form.Field>
                      <br />
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
                      <br />
                    </Form>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment basic>
                    <Form>
                      <Form.Field>
                        <label>HDL (mmol/L) *</label>
                        <input
                          placeholder="HDL (mmol/L)"
                          onChange={e => this.setState({ hdl: e.target.value })}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Reading Date</label>
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

export default withRouter(Cholestrol);
