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

class Policies extends Component {
  state = { activeItem: "home", minActiveItem: "temp" };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name });

  constructor(props) {
    super(props);
    console.log(isLoggedIn());
    document.title = "Policies - Add Policy";

    this.state = {
      patientId: "",
      dateTime: moment(),
      notes: "",
      temp: "",
      options: [],
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

  componentDidMount() {
    axios({
      url: API_BASE_URL + "/org/106/",
      method: "GET",
      withCredentials: false
    })
      .then(response => {
        // this.props.toggleLoader();
        var json_data = JSON.parse(JSON.stringify(response.data.data));
        var newArray = [];
        Object.keys(json_data).map(key =>
          newArray.push({
            key: json_data[key].id,
            text: json_data[key].name,
            value: json_data[key].id
          })
        );
        console.log(newArray);
        this.setState({ options: newArray });
      })
      .catch(err => {
        console.log(err);
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
      temp: this.state.temp,
      uom: "Degrees"
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
      .post(`${API_BASE_URL}/health/temp`, payload, headers)
      .then(response => {
        this.setState({ isLoading: false });
        console.log(response.data);
        if (!response.data.error) {
          this.props.history.push("/temp");
          alert("Policy added successfully.");
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
              <h3>Add Policy </h3>

              <Grid columns={1} relaxed>
                <Grid.Column>
                  <Segment basic>
                    <Form>
                      <Form.Select
                        fluid
                        label="Company"
                        options={this.state.options}
                        placeholder="Company"
                        onChange={(e, v) => {
                          this.setState({ company: v.value });
                        }}
                      />
                      <Form.Field>
                        <label>Policy Number *</label>
                        <input
                          placeholder="Policy Number"
                          onChange={e =>
                            this.setState({ policyNumber: e.target.value })
                          }
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
                        <Icon name="user" /> +Add Policy
                      </Button>
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid>
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
