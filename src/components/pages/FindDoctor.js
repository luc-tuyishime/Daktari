//import Navbar from "../shared/Navbar"

import PropTypes from "prop-types"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import savepayLogo from "../../img/logo.svg"
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Form,
  Rating,
  Menu,
  Item,
  Label,
  Responsive,
  Segment,
  Divider,
  Sidebar,
  Visibility,
  Input,
  Icon
} from "semantic-ui-react"

import "../../App.css"
import Footer from "../shared/Footer"
import Map from "../../img/map.png"
import AccordionDoctor from "../shared/Accordeon"

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

class HomepageHeading extends Component {
  render() {
    return (
      <div>
        <Container fluid>
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
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <div className="main__">
            <Segment
              className=""
              textAlign="center"
              style={{ minHeight: "10vh", padding: "" }}
              vertical
            >
              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                  once={false}
                  onBottomPassed={this.showFixedMenu}
                  onBottomPassedReverse={this.hideFixedMenu}
                >
                  <div className="main__">
                    <Menu
                      inverted={!fixed}
                      secondary={!fixed}
                      borderless
                      fixed={fixed ? "top" : "top"}
                      size="small"
                    >
                      <Menu.Item>
                        <Link to="/">
                          <img
                            src={savepayLogo}
                            className="daktari_logo"
                            alt="daktari"
                          />
                        </Link>
                      </Menu.Item>
                      <Container fluid>
                        <Menu.Item position="right">
                          <Menu.Item as={Link} to="/">
                            Home
                          </Menu.Item>
                          <Menu.Item
                            className="nav-text"
                            as={Link}
                            to="/find-doctor"
                          >
                            Find a Doctor
                          </Menu.Item>
                          <Menu.Item
                            className="nav-text"
                            as={Link}
                            to="/health-facilities"
                          >
                            Find a Health Facility
                          </Menu.Item>
                          <Menu.Item className="nav-text" as="a">
                            Patient Forums
                          </Menu.Item>
                          <Menu.Item
                            className="nav-text"
                            as={Link}
                            to="/about-us"
                          >
                            About us
                          </Menu.Item>
                        </Menu.Item>
                        <Menu.Item position="right">
                          <Menu.Item
                            className="nav-title"
                            as={Link}
                            to="/login"
                          >
                            <Button inverted={!fixed}>Sign in</Button>
                          </Menu.Item>

                          <Menu.Item
                            as={Link}
                            to="/signup"
                            style={{ color: "black", fontWeight: "bold" }}
                            className="nav-title"
                          >
                            <Button
                              inverted={!fixed}
                              primary={fixed}
                              style={{ marginLeft: "0.5em" }}
                            >
                              Sign up
                            </Button>
                          </Menu.Item>
                        </Menu.Item>
                      </Container>
                    </Menu>
                  </div>
                </Visibility>
              </Responsive>
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

const FindDoctor = ({ mobile }) => (
  <ResponsiveContainer>
    <div>
      <Grid>
        <Grid.Column>
          <Segment textAlign="center" vertical>
            <HomepageHeading />
          </Segment>
        </Grid.Column>
      </Grid>
      <Divider />
      <Grid style={{ paddingTop: "30px" }} centered>
        <Grid.Column computer={3} mobile={16} tablet={9}>
          <Image className="img_map" size="medium" src={Map} />
        </Grid.Column>

        <Grid.Column computer={3} mobile={16} tablet={9}>
          <Image
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16} tablet={9}>
          <Item.Content>
            <Item.Header
              style={{
                color: "#0095DA",
                marginTop: "15px",
                fontSize: "18px"
              }}
              as="a"
            >
              Dr. Adungo, Allan Ikol
            </Item.Header>
            <Divider />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Item.Meta>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#A49999",
                      lineHeight: "7px"
                    }}
                  >
                    MBChB , MMed ,
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "15px",
                      color: "#A49999",
                      lineHeight: "7px"
                    }}
                  >
                    Consultant Surgeon & Urologist
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "15px",
                      color: "#A49999",
                      lineHeight: "7px"
                    }}
                  >
                    The Aga Khan Hospital
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "15px",
                      color: "#A49999",
                      lineHeight: "7px"
                    }}
                  >
                    Urology
                  </span>
                </Item.Meta>
                <Item.Meta>
                  <p
                    style={{
                      color: "#0095DA",
                      marginTop: "35px",
                      fontSize: "15px"
                    }}
                  >
                    Languages Spoken
                  </p>
                  <span>English</span>
                  <span>Swahili</span>
                </Item.Meta>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Item.Content>
                  <Item.Meta>
                    <span
                      style={{
                        fontSize: "15px",
                        color: "#0095DA",
                        lineHeight: "7px"
                      }}
                    >
                      Professional Summary
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#A49999",
                        lineHeight: "7px"
                      }}
                    >
                      Consultant Surgeon & Urologist
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#A49999",
                        lineHeight: "7px"
                      }}
                    >
                      The Aga Khan Hospital
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#A49999",
                        lineHeight: "7px"
                      }}
                    >
                      Urology
                    </span>
                  </Item.Meta>

                  <Item.Meta>
                    <p
                      style={{
                        color: "#0095DA",
                        marginTop: "35px",
                        fontSize: "15px"
                      }}
                    >
                      Rating
                    </p>
                    <Rating icon="star" defaultRating={3} maxRating={5} />
                  </Item.Meta>
                  <AccordionDoctor />
                </Item.Content>
              </Grid.Column>
            </Grid>
          </Item.Content>
        </Grid.Column>
      </Grid>
      <Divider />
    </div>
    <Footer />
  </ResponsiveContainer>
)

export default FindDoctor
