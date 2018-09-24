import React, { Component } from "react";
// import { connect } from "react-redux"
import {
  Segment,
  Button,
  Icon,
  Header,
  Form,
  Checkbox
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

class Doctors extends Component {
  state = { activeItem: "home", minActiveItem: "doctors" };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name });

  constructor(props) {
    super(props);
    console.log(isLoggedIn());

    document.title = "Doctors";

    this.state = {
      patientId: "",
      practId: 1,
      dateTime: "",
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
      startDate: date
    });
  }

  componentDidMount() {
    axios({
      url: API_BASE_URL + "/pract/list",
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
            text: json_data[key].firstName + " " + json_data[key].lastName,
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
      practId: this.state.practId
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
      .post(`${API_BASE_URL}/patient/doc`, payload, headers)
      .then(response => {
        this.setState({ isLoading: false });
        console.log(response.data);
        if (!response.data.error) {
          this.props.history.push("/doctors");
          alert("Doctor added successfully.");
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
              <h3>Add Doctor </h3>

              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label="Doctor"
                  options={this.state.options}
                  placeholder="Doctor"
                  onChange={(e, v) => {
                    this.setState({ practId: v.value });
                  }}
                />
                <br />
                <b>Select what information the doctor can see; </b> <br />
                <br />
                <Form.Field control={Checkbox} label="BMI" />
                <Form.Field control={Checkbox} label="Blood Type" />
                <Form.Field control={Checkbox} label="Blood Pressure" />
                <Form.Field control={Checkbox} label="Blood Glucose" />
                <Form.Field control={Checkbox} label="Blood Cholelstrol" />
                <br />
                <Button
                  floated="left"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  onClick={this.onSubmit}
                >
                  <Icon name="user" /> +Add Doctor
                </Button>
                <br />
                <br />
              </Form.Group>

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

export default withRouter(Doctors);
