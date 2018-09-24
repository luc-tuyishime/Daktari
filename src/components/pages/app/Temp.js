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
import {
  logout,
  login,
  isLoggedIn,
  getUserDetails
} from "../../../util/AuthService";
import { Router, Route, Link, withRouter } from "react-router-dom";
import {
  keepTrackMenu,
  mainAdminMenu,
  keepTrackSubMenu,
  loadUserProfileCard
} from "../includes.js";

import { API_BASE_URL } from "../../../constants";
import axios from "axios";

import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "./../Pagination";

// React line graph
import * as Recharts from "recharts";

const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} = Recharts;

class Temp extends Component {
  state = { activeItem: "home", minActiveItem: "temp" };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name });

  constructor(props) {
    super(props);

    document.title = "Temperature";

    this.state = {
      records: [],
      graphArray: [],
      isLoading: false,
      pageOfItems: [],
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  componentDidMount() {
    var loggedIn = getUserDetails();
    console.log("Getting user details ....?");
    console.log(loggedIn);
    var securityToken = "";
    var patientId = 1;

    if (loggedIn != null) {
      securityToken = loggedIn.token.jwt;
      patientId = loggedIn.data.id;
    }

    console.log(securityToken);
    axios.defaults.headers.common["Authorization"] = "Bearer " + securityToken;

    axios({
      url: API_BASE_URL + "/health/temp/?patient-id=" + patientId,
      method: "GET",
      withCredentials: false
    })
      .then(response => {
        // this.props.toggleLoader();
        var json_data = JSON.parse(JSON.stringify(response.data.data));
        console.log(json_data);
        this.setState({ records: json_data });

        // convert strings to numerics
        var graphArray = [];
        Object.keys(json_data).map(key =>
          graphArray.push({
            dateTime: json_data[key].dateTime,
            temp: Number(json_data[key].temp)
          })
        );
        console.log(graphArray);
        this.setState({ graphArray: graphArray });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
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
    const { activeItem, minActiveItem, records, graphArray } = this.state;
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
              <h3>Temperature </h3>
              <Table celled selectable>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan="4">
                      <Link to="/temp-form" className="">
                        <Button
                          floated="right"
                          icon
                          labelPosition="left"
                          primary
                          size="small"
                        >
                          <Icon name="user" /> Add Item
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
                    <Table.HeaderCell>Read Date</Table.HeaderCell>
                    <Table.HeaderCell>Temperature</Table.HeaderCell>
                    <Table.HeaderCell>UOM</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {records.map(record => (
                    <Table.Row>
                      <Table.Cell>{record.dateTime}</Table.Cell>
                      <Table.Cell>{record.temp}</Table.Cell>
                      <Table.Cell>{record.uom}</Table.Cell>
                      <Table.Cell>{record.notes}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

              <h2>Temperature Reading </h2>
              <br />

              <br />

              <LineChart
                width={600}
                height={300}
                data={graphArray}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="dateTime" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </Segment>
          </div>
        </div>

        <br />
        <div className="custom-hr" />
      </div>
    );
  }
}

export default withRouter(Temp);
