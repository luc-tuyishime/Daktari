import React, { Component } from "react"
import { Link } from "react-router-dom"
import savepayLogo from "../../img/logo.svg"
import {
  Menu,
  Responsive,
  Visibility,
  Button,
  Container
} from "semantic-ui-react"
import "../../App.css"

export default class Navbar extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <div className="main">
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
                  <Menu.Item className="nav-text" as={Link} to="/">
                    Home
                  </Menu.Item>
                  <Menu.Item className="nav-text" as={Link} to="/find-doctor">
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
                  <Menu.Item className="nav-text" as={Link} to="/about-us">
                    About us
                  </Menu.Item>
                </Menu.Item>
                <Menu.Item position="right">
                  <Menu.Item className="nav-title" as={Link} to="/login">
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
    )
  }
}
