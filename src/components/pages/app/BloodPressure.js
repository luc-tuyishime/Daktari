import React, { Component } from "react"
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
} from "semantic-ui-react"
import {
  logout,
  login,
  isLoggedIn,
  getUserDetails
} from "../../../util/AuthService"
import { Router, Route, Link, withRouter } from "react-router-dom"
import {
  keepTrackMenu,
  mainAdminMenu,
  keepTrackSubMenu,
  loadUserProfileCard
} from "../includes.js"

import { API_BASE_URL } from "../../../constants"
import axios from "axios"

import moment from "moment"
import "react-datepicker/dist/react-datepicker.css"
import Pagination from "./../Pagination"

// React line graph
import * as Recharts from "recharts"

const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} = Recharts

class BloodPressure extends Component {
  state = { activeItem: "home", minActiveItem: "blood pressure" }

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name })

  constructor(props) {
    super(props)
    console.log(isLoggedIn())

    document.title = "Blood Pressure"

    this.state = {
      records: [],
      graphArray: [],
      isLoading: false,
      pageOfItems: [],
      startDate: moment()
    }
    this.handleChange = this.handleChange.bind(this)

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this)
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  componentDidMount() {
    var loggedIn = getUserDetails()
    console.log("Getting user details ....?")
    console.log(loggedIn)
    var securityToken = ""
    var patientId = 1

    if (loggedIn != null) {
      securityToken = loggedIn.token.jwt
      patientId = loggedIn.data.id
    }

    console.log(securityToken)
    axios.defaults.headers.common["Authorization"] = "Bearer " + securityToken

    axios({
      url: API_BASE_URL + "/health/pressure/?patient-id=" + patientId,
      method: "GET",
      withCredentials: false
    })
      .then(response => {
        // this.props.toggleLoader();
        var json_data = JSON.parse(JSON.stringify(response.data.data))
        console.log(json_data)
        this.setState({ records: json_data })

        // convert strings to numerics
        var graphArray = []
        Object.keys(json_data).map(key =>
          graphArray.push({
            dateTime: json_data[key].dateTime,
            diastolic: Number(json_data[key].diastolic),
            systolic: Number(json_data[key].systolic),
            pulse: Number(json_data[key].pulse)
          })
        )
        console.log(graphArray)
        this.setState({ graphArray: graphArray })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems })
  }

  componentWillMount() {
    this.checkAuth()
  }

  checkAuth() {
    if (!isLoggedIn()) {
      this.props.history.push("/")
    }
  }

  render() {
    const { activeItem, minActiveItem, records, graphArray } = this.state
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
              <div>
                <h3>Blood Pressure </h3>
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
                          to="/blood-pressure-form"
                        >
                          <Icon name="user" /> Add Item
                        </Button>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Systolic</Table.HeaderCell>
                      <Table.HeaderCell>Diastolic</Table.HeaderCell>
                      <Table.HeaderCell>Pulse</Table.HeaderCell>
                      <Table.HeaderCell>Notes</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {records.map(record => (
                      <Table.Row>
                        <Table.Cell>{record.dateTime}</Table.Cell>
                        <Table.Cell>{record.systolic}</Table.Cell>
                        <Table.Cell>{record.diastolic}</Table.Cell>
                        <Table.Cell>{record.pulse}</Table.Cell>
                        <Table.Cell>{record.notes}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>

                <div className="text-center">
                  <Pagination
                    items={this.state.transactions}
                    onChangePage={this.onChangePage}
                  />
                </div>

                <h2>Blood Pressure Reading </h2>

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
                    dataKey="systolic"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="pulse" stroke="black" />
                </LineChart>
              </div>
            </Segment>
          </div>
        </div>

        <br />
        <div className="custom-hr" />
      </div>
    )
  }
}

export default withRouter(BloodPressure)
