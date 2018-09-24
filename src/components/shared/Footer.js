import React from "react"
import { Link } from "react-router-dom"
import { Container, Grid, Image, List, Segment } from "semantic-ui-react"
import "../../App.css"
import facebook from "../../img/facebook.svg"
import instagram from "../../img/instagram.svg"
import twitter from "../../img/twitter.svg"
import footer_logo from "../../img/logo.svg"

const Footer = ({ mobile }) => (
  <Segment
    className="footer_bg_color"
    vertical
    style={{ padding: "3em 0em 0em 0em" }}
  >
    <Container>
      <Grid centered>
        <List.Item style={{ marginTop: "5px" }}>
          <Image size="tiny" src={footer_logo} alt="footer-logo" />
        </List.Item>

        <Grid.Row columns={16}>
          <List.Item className="horizontal-padding">
            <p style={{ color: "#0095DA", fontSize: "13px" }} as="a">
              Home
            </p>
          </List.Item>
          <List.Item className="horizontal-padding">
            <Link to="/developer">
              <p style={{ color: "#0095DA", fontSize: "13px" }} as="a">
                Find your Doctor
              </p>
            </Link>
          </List.Item>
          <List.Item className="horizontal-padding">
            <Link to="/price">
              <p style={{ color: "#0095DA", fontSize: "13px" }} as="a">
                Hospital and Diagonstic
              </p>
            </Link>
          </List.Item>
          <List.Item className="horizontal-padding">
            <p style={{ color: "#0095DA", fontSize: "13px" }} as="a">
              About Us
            </p>
          </List.Item>
          <List.Item className="horizontal-padding">
            <Link to="/terms">
              <p style={{ color: "#0095DA", fontSize: "13px" }} as="a">
                Support
              </p>
            </Link>
          </List.Item>
          <List.Item className="horizontal-padding">
            <Link to="/terms">
              <p style={{ color: "#0095DA", fontSize: "13px" }} as="a">
                News
              </p>
            </Link>
          </List.Item>
        </Grid.Row>

        <Grid.Row columns={12}>
          <List.Item className="horizontal-padding-logo">
            <Image src={twitter} alt="twitter" />
          </List.Item>
          <List.Item className="horizontal-padding-logo">
            <Image src={facebook} alt="facebook" />
          </List.Item>
          <List.Item className="horizontal-padding-logo">
            <Image src={instagram} alt="instagram" />
          </List.Item>
        </Grid.Row>
      </Grid>

      {/*<Grid.Column width={3}>
            <Header inverted as="h4" content="Services" />
            <List link inverted>
              <List.Item as="a">Banana Pre-Order</List.Item>
              <List.Item as="a">DNA FAQ</List.Item>
              <List.Item as="a">How To Access</List.Item>
              <List.Item as="a">Favorite X-Men</List.Item>
            </List>
          </Grid.Column>*/}
    </Container>
  </Segment>
)

export default Footer
