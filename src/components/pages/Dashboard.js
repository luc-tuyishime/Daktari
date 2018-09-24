import React, { Component } from "react"

// import { connect } from "react-redux"

import { Segment, Card, Icon, Header, Dropdown, Image } from "semantic-ui-react"

import { isLoggedIn, getUserDetails, login } from "../../util/AuthService"

import { Router, Route, Link, withRouter, Redirect } from "react-router-dom"

import Footer from "../shared/Footer"

import { Grid } from "semantic-ui-react"

// import SidebarDashboard from "./includes.js";

import {
  keepTrackMenu,
  mainAdminMenu,
  DashboardChart,
  loadUserProfileCard,
  PatientNote,
  RecentVisits,
  MedicalRecord,
  sideBarDashboard
} from "./includes.js"

const options = [
  { key: 100, text: "100", value: 100 },

  { key: 200, text: "200", value: 200 },

  { key: 300, text: "300", value: 300 },

  { key: 400, text: "400", value: 400 }
]

class Dashboard extends Component {
  state = { activeItem: "home", minActiveItem: "profile" }

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name })

  constructor(props) {
    super(props)

    const userDetails = getUserDetails()

    console.log("User Details >>> ", userDetails)

    this.setState({ userDetails: userDetails })

    document.title = "Dashboard"
  }

  componentWillMount() {
    this.setState({ isUserLoggedIn: isLoggedIn() })
  }

  checkAuth() {
    if (isLoggedIn()) {
      this.props.history.push("/")
    }
  }

  render() {
    if (!this.state.isUserLoggedIn) {
      return <Redirect to="/" />
    }

    const { activeItem, minActiveItem, userDetails } = this.state

    return (
      <div className="" style={{ backgroundColor: "#fbfeff" }}>
        {mainAdminMenu(activeItem, this.handleItemClick)}

        <Grid columns={4}>
          <Grid.Row stretched>
            <Grid.Column width={3}>{sideBarDashboard()}</Grid.Column>

            <Grid.Column width={3}>
              <Header
                className="title-name"
                as="h2"
                style={{ color: "#A49999" }}
              >
                Dashboard
              </Header>

              {loadUserProfileCard()}

              <Grid.Column width={3}>
                <br />
                <br />
                <br />
                {PatientNote()}
                <br />
                <br />
              </Grid.Column>
            </Grid.Column>
            <Grid.Column width={9}>
              <Header
                className="profile-text"
                as="h3"
                style={{ color: "#A49999" }}
              >
                Profile
              </Header>
              <div style={{ marginTop: "-90px", marginBottom: "-65px" }}>
                {DashboardChart()}
              </div>
              <div class="ui grid">
                <div class="six wide column">{RecentVisits()}</div>
                <br />

                <div class="nine wide column">
                  {MedicalRecord()}

                  <br />
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Footer />
      </div>
    )
  }
}

export default withRouter(Dashboard)
