import React, { Component } from "react";
// import { connect } from "react-redux"
import { Segment, Button, Icon, Header, Table } from "semantic-ui-react";
import { isLoggedIn, getUserDetails } from "../../../util/AuthService";
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

import * as Recharts from "recharts";

// React line graph
const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} = Recharts;

class BloodSugar extends Component {
  state = { activeItem: "home", minActiveItem: "blood glucose" };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name });

  constructor(props) {
    super(props);
    console.log(isLoggedIn());

    document.title = "Blood Sugar";

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
      url: API_BASE_URL + "/health/sugar/?patient-id=" + patientId,
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
            level: Number(json_data[key].level)
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
              <h3>Blood Sugar </h3>

              <Table celled selectable>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan="5">
                      <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                        as={Link}
                        to="/blood-glucose-form"
                      >
                        <Icon name="user" /> Add Item
                      </Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Context</Table.HeaderCell>
                    <Table.HeaderCell>Level</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {records.map(record => (
                    <Table.Row>
                      <Table.Cell>{record.dateTime}</Table.Cell>
                      <Table.Cell>{record.baContext}</Table.Cell>
                      <Table.Cell>{record.level}</Table.Cell>
                      <Table.Cell>{record.typeId}</Table.Cell>
                      <Table.Cell>{record.notes}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

              {/* <div className="text-center">
                <Pagination items={records} onChangePage={this.onChangePage} />
              </div> */}

              <h3>Blood Sugar Reading </h3>
              <br />

              <LineChart
                width={700}
                height={300}
                data={graphArray}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="dateTime" />
                <YAxis />
                <YAxis yAxisId="left" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="level" stroke="#82ca9d" />
                {/* <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="patientId"
                  stroke="#82ca9d"
                /> */}
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

export default withRouter(BloodSugar);
