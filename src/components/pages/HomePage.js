//import Navbar from "../shared/Navbar"

import PropTypes from "prop-types"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Input,
  Icon
} from "semantic-ui-react"

import "../../App.css"
import Subscribe from "../shared/subscribe"
import Group from "../../img/group.svg"
import Group2 from "../../img/group2.svg"
import Doctor from "../../img/doctor.svg"
import Medicine from "../../img/medicine.svg"
import Microsoft from "../../img/microsoft.svg"

import Ic from "../../img/ic.svg"
import Spring from "../../img/spring.svg"
import Flizer from "../../img/flizer.svg"
import Nairobi from "../../img/nairobi.svg"
import Dmrc from "../../img/dmrc_logo.svg"
import Bayer from "../../img/bayer-logo.svg"
import Footer from "../shared/Footer"
import Navbar from "../shared/Navbar"

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

class HomepageHeading extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Header
            className="small_device"
            as="p"
            content="Find and Book Appointment with a Doctor"
            inverted
            style={{
              fontSize: "30px",
              textAlign: "center",
              lineHeight: "42px",
              color: "#fff",
              marginBottom: 0,
              marginTop: "5em"
            }}
          />

          <Header
            className="small_device_"
            as="p"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            inverted
            style={{
              fontSize: "16px",
              fontWeight: "normal",
              lineHeight: "19px",
              textAlign: "center",
              color: "#fff",
              marginBottom: "15px",
              marginTop: "9px"
            }}
          />
          <div>
            <Input
              size="large"
              icon="search"
              iconPosition="left"
              placeholder="Speciality or Doctor’s Name..."
            />&nbsp;&nbsp;
            <Input
              size="large"
              icon="map marker alternate"
              iconPosition="left"
              placeholder="Your location..."
            />&nbsp;&nbsp;
            <Button
              primary
              size="large"
              content="find doctor"
              onClick={this.focus}
            />
          </div>
        </Container>
      </div>
    )
  }
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <div className="main">
            <Segment
              className=""
              textAlign="center"
              style={{ minHeight: "70vh", padding: "" }}
              vertical
            >
              <Navbar />
              <HomepageHeading />
            </Segment>
          </div>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="uncover"
            inverted
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as={Link} to="/" active>
              Home
            </Menu.Item>
            <Menu.Item as={Link} to="/find-doctor">
              Find a Doctor
            </Menu.Item>
            <Menu.Item as="a">Find a Health Facility</Menu.Item>
            <Menu.Item as="a">Patient Forums</Menu.Item>
            <Menu.Item as={Link} to="/about-us">
              {" "}
              About us
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: "100vh" }}
          >
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                    <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

const HomePage = ({ mobile }) => (
  <ResponsiveContainer>
    <div style={{ padding: "4em 0em 8em 0em" }}>
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <Header
              as="h1"
              style={{
                fontSize: "22px",
                textAlign: "center",
                marginBottom: "10px"
              }}
            >
              Why Daktari Africa
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={4}>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Image
              style={{
                marginTop: mobile ? "12px" : null
              }}
              className="img-svg"
              rounded
              size="tiny"
              src={Group}
            />
            <Header as="h3" style={{ fontSize: "16px", textAlign: "center" }}>
              Book Anytime
            </Header>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "14px",
                textAlign: "center"
              }}
            >
              Yes that's right, you thought it was the stuff of dreams, but even
              bananas.
            </p>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Image
              style={{
                marginTop: mobile ? "32px" : "0"
              }}
              className="img-svg"
              rounded
              size="tiny"
              src={Group2}
            />
            <Header as="h3" style={{ fontSize: "16px", textAlign: "center" }}>
              Medical Report
            </Header>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "14px",
                textAlign: "center"
              }}
            >
              Yes that's right, you thought it was the stuff of dreams, but even
              bananas.
            </p>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Image className="img-svg" rounded size="tiny" src={Doctor} />
            <Header as="h3" style={{ fontSize: "16px", textAlign: "center" }}>
              Professionalism
            </Header>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "14px",
                textAlign: "center"
              }}
            >
              Yes that's right, you thought it was the stuff of dreams, but even
              bananas.
            </p>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Image className="img-svg" rounded size="tiny" src={Medicine} />
            <Header as="h3" style={{ fontSize: "16px", textAlign: "center" }}>
              Medicines
            </Header>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "14px",
                textAlign: "center"
              }}
            >
              Yes that's right, you thought it was the stuff of dreams, but even
              bananas.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>

    <Subscribe />

    <div style={{ padding: "4em 0em 6em 0em", textAlign: "center" }}>
      <Grid centered columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Header
              as="h1"
              style={{
                fontSize: "22px",
                textAlign: "center",
                marginBottom: "35px"
              }}
            >
              Our partners
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid container centered doubling columns={7}>
          <Grid.Column>
            <Image className="style_logo" src={Microsoft} alt="microsoft" />
          </Grid.Column>
          <Grid.Column>
            <Image className="style_logo" src={Ic} alt="ic" />
          </Grid.Column>
          <Grid.Column>
            <Image className="style_logo" src={Spring} alt="spring" />
          </Grid.Column>
          <Grid.Column>
            <Image className="style_logo" src={Flizer} alt="flizer" />
          </Grid.Column>
          <Grid.Column>
            <Image className="style_logo" src={Nairobi} alt="nairobi" />
          </Grid.Column>
          <Grid.Column>
            <Image className="style_logo" src={Dmrc} alt="dmrc" />
          </Grid.Column>
          <Grid.Column>
            <Image className="style_logo" src={Bayer} alt="bayer" />
          </Grid.Column>
        </Grid>
        <Grid.Row>
          <Grid.Column>
            <Header
              as="h1"
              style={{
                fontSize: "25px",
                textAlign: "center",
                marginTop: "15px",
                color: "#0095DA"
              }}
            >
              Are you a doctor?
            </Header>
            <p
              style={{
                fontSize: "15px",
                textAlign: "center"
              }}
            >
              Join thousands of doctors in providing medical services
            </p>
            <Button
              style={{
                display: "block",
                margin: "0 auto",
                textAlign: "center"
              }}
              primary
            >
              Join now
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>

    <Footer />
  </ResponsiveContainer>
)

export default HomePage
