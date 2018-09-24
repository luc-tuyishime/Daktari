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

class Doctors extends Component {
  state = { activeItem: "home", minActiveItem: "doctors" }

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name })

  constructor(props) {
    super(props)
    console.log(isLoggedIn())

    document.title = "Temperature"

    this.state = {
      records: [],
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

  componentWillMount() {
    this.checkAuth()
  }

  checkAuth() {
    if (!isLoggedIn()) {
      this.props.history.push("/")
    }
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
      url: API_BASE_URL + "/patient/doc/?patient-id=" + patientId,
      method: "GET",
      withCredentials: false
    })
      .then(response => {
        // this.props.toggleLoader();
        var json_data = JSON.parse(JSON.stringify(response.data.data))
        console.log(json_data)
        this.setState({ records: json_data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems })
  }

  render() {
    const { activeItem, minActiveItem, records } = this.state
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
              <h3>Doctors </h3>
              <Table celled selectable>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan="4">
                      <Link to="/doctors-form" className="">
                        <Button
                          floated="right"
                          icon
                          labelPosition="left"
                          primary
                          size="small"
                        >
                          <Icon name="user" /> Add Doctor
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
                    <Table.HeaderCell>Practiioner Name</Table.HeaderCell>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {records.map(record => (
                    <Table.Row>
                      <Table.Cell>
                        {record.pract.firstName} {record.pract.lastName}
                      </Table.Cell>
                      <Table.Cell>{record.pract.msisdn}</Table.Cell>
                      <Table.Cell>{record.pract.email}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Segment>
          </div>
        </div>

        <br />
        <div className="custom-hr" />
      </div>
    )
  }
}

export default withRouter(Doctors)
