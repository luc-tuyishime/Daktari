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
  Form,
  Sidebar,
  Visibility,
  Input,
  Icon
} from "semantic-ui-react"

import "../../App.css"
import LogoFooter from "../../img/logosign.svg"
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
            content="OUR MISSION  is to better connect people and doctors;"
            inverted
            style={{
              fontSize: "17px",
              textAlign: "center",
              color: "#fff",
              marginBottom: 0,
              marginTop: "10em"
            }}
          />

          <Header
            className="small_device"
            as="p"
            content="
  to make it easier to be healthy to grow a powerful nation. "
            inverted
            style={{
              fontSize: "17px",
              textAlign: "center",

              color: "#fff",
              marginBottom: 0
            }}
          />

          <Header
            className="small_device"
            as="p"
            content="OUR VISION is to be the ultimate, go-to website for all
            "
            inverted
            style={{
              fontSize: "17px",
              textAlign: "center",
              color: "#fff",
              marginBottom: 0,
              marginTop: "2em"
            }}
          />

          <Header
            className="small_device"
            as="p"
            content="medical needs in the region. "
            inverted
            style={{
              fontSize: "17px",
              textAlign: "center",
              color: "#fff",
              marginBottom: 0
            }}
          />
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
          <div className="main_about">
            <Segment
              className=""
              textAlign="center"
              style={{ minHeight: "60vh", padding: "" }}
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

const About = ({ mobile }) => (
  <ResponsiveContainer>
    <div className="main2_about" style={{ padding: "4em 0em 8em 0em" }}>
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <Header
              as="h1"
              style={{
                fontSize: "22px",
                textAlign: "center",
                marginBottom: "10px",
                color: "#0095DA"
              }}
            >
              Who we are
            </Header>
            <Container style={{ textAlign: "center" }}>
              <p>
                Daktari Africa provides easy, mobile access to medical care for
                everyone as a trusted partner.
              </p>{" "}
              <p>
                We connect people with medical needs to doctors and other
                clinicians with solutions by using a dependable, efficient,
                mobile platform. That way, patients on follow-up care, both
                urban and remote, and even some emergencies, can receive quick,
                quality, affordable medical help at the touch of a button.
              </p>{" "}
              <p>
                Our service-oriented website and mobile app enable clinical
                consultations and provide medical information to help you take
                better control of your health.
              </p>
              <p>
                Looking for a particular medical specialist but do not have his
                contact? Need a doctor from your medical insurance panel? Or
                perhaps you are travelling and need a doctor in the new County
                you are visiting. Then you have come to right place. This
                award-winning website was created with all these needs in mind.
                And more…
              </p>{" "}
              <p>
                Daktari Africa was founded by an experienced medical specialist,
                with the assistance of world-class IT experts, who realized that
                Doctors and other clinicians can be made much more accessible
                using IT.
              </p>{" "}
              <p>
                The site was awarded with a Vision 2030 recognition by the Kenya
                ICT Board in 2012! Feel free to contact us for more information.
              </p>
            </Container>

            <Header
              as="h1"
              style={{
                fontSize: "22px",
                textAlign: "center",
                marginTop: "50px",
                marginBottom: "10px",
                color: "#0095DA"
              }}
            >
              Welcome To Daktari@ThePharmacy
            </Header>
            <Container style={{ textAlign: "center" }}>
              <p>
                Convenient, face to face, Doctor consultations at selected
                Pharmacies that saves you time and money.
              </p>{" "}
            </Container>

            <Header
              as="h1"
              style={{
                fontSize: "22px",
                textAlign: "center",
                marginTop: "50px",
                marginBottom: "10px",
                color: "#0095DA"
              }}
            >
              About The Service
            </Header>
            <Container style={{ textAlign: "center" }}>
              <p>
                Daktari@ThePharmacy is a partnership between Daktari Africa and
                selected Pharmacies to offer convenient, face-to-face doctor
                consultations that save
              </p>{" "}
              <p>
                you time and money. Daktari Africa is a telemedicine service
                provider dedicated to finding smart IT solutions to improve
                healthcare.
              </p>
            </Container>

            <Header
              as="h1"
              style={{
                fontSize: "22px",
                textAlign: "center",
                marginTop: "50px",
                marginBottom: "10px",
                color: "#0095DA"
              }}
            >
              Consult a Doctor
            </Header>
            <Container style={{ textAlign: "center" }}>
              <p>
                Daktari@ThePharmacy has the largest database of Online Doctors
                in Kenya with the widest range of specializations. The platform
                gives you access to over
              </p>{" "}
              <p>
                400 doctors across the country, including but not limited to
                GPs, Paediatricians, Gynaecologists, Dermatologists,
                Ophthalmologists and Dentists just to
              </p>{" "}
              <p>mention a few.</p>
            </Container>

            <Header
              as="h1"
              style={{
                fontSize: "22px",
                textAlign: "center",
                marginTop: "50px",
                marginBottom: "10px",
                color: "#0095DA"
              }}
            >
              A Kenyan Solution
            </Header>
            <Container style={{ textAlign: "center", marginBottom: "30px" }}>
              <p>
                Daktari Africa was founded by a practising Kenyan doctor, with
                more than 15 years experience as a physician and a cardiologist
                with a keen understanding of
              </p>{" "}
              <p>the healthcare needs of Kenyans.</p>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column
            mobile={14}
            tablet={10}
            computer={8}
            className="bg_contact_white"
          >
            <p
              style={{
                color: "#0095DA",
                textAlign: "center",
                fontSize: "19px",
                marginTop: "30px"
              }}
            >
              Send Us a Message
            </p>
            <Form style={{ padding: "30px" }}>
              <Form.Field>
                <label>Full name</label>
                <input placeholder="Fulll name" />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input type="email" placeholder="email" />
              </Form.Field>
              <Form.Field>
                <label>Subject</label>
                <input type="text" placeholder="subject" />
              </Form.Field>
              <Form.TextArea
                label="About"
                placeholder="Tell us more about you..."
              />
              <Button primary type="submit">
                Submit
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column
            mobile={14}
            tablet={10}
            computer={5}
            className="bg_contact"
          >
            <div className="contact_div">
              <p>Contact information</p>
              <p>Daktari Africa</p>
              <p>The Mirage, Tower 2, Pent Floor</p>
              <p>Waiyaki Way, Nairobi</p>
              <p>Tel: +254 709678000</p>
              <p>admin@daktariafrica.com</p>
              <img
                style={{ height: "95px", marginTop: "25px" }}
                src={LogoFooter}
                alt="logo"
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={4} />
      </Grid>
    </div>
    <Footer />
  </ResponsiveContainer>
)

export default About
