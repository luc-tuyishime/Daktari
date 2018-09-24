import React, { Component } from "react"
// import { connect } from "react-redux"
import {
  Input,
  Menu,
  Segment,
  Button,
  Grid,
  Divider,
  Item,
  Image,
  Rating,
  Card,
  Icon,
  Container,
  Header
} from "semantic-ui-react"
import AccordionDoctor from "../shared/Accordeon"
import Footer from "../shared/Footer"
import PropTypes from "prop-types"
import { logout, login, isLoggedIn } from "../../util/AuthService"
import DaktariLogo from "../../img/logosign.svg"
import { Router, Route, Link, withRouter } from "react-router-dom"
import {
  keepTrackMenu,
  mainAdminMenu,
  loadUserProfileCard
} from "./includes.js"

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

class FindYourDoctor extends Component {
  state = { activeItem: "find your doctor" }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  constructor(props) {
    super(props)
    console.log(isLoggedIn())
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
    const { activeItem } = this.state

    return (
      <div className="ui">
        {mainAdminMenu(activeItem, this.handleItemClick)}

        {/* <Segment>{keepTrackMenu()}</Segment> */}
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
            <Grid.Column computer={5} mobile={16} tablet={9}>
              <Item.Content>
                <Item.Header
                  style={{
                    color: "#0095DA",
                    marginTop: "15px",
                    fontSize: "18px"
                  }}
                  as="a"
                >
                  Dr. Adung'o, Allan Ikol
                </Item.Header>
                <Item.Meta>
                  <p
                    style={{
                      fontSize: "15px"
                    }}
                  >
                    MBChB , MMed ,
                  </p>
                  <p
                    style={{
                      fontSize: "15px"
                    }}
                  >
                    Consultant Surgeon & Urologist
                  </p>
                  <p
                    style={{
                      fontSize: "15px"
                    }}
                  >
                    The Aga Khan Hospital
                  </p>
                  <p
                    style={{
                      fontSize: "15px"
                    }}
                  >
                    Urology
                  </p>
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
              </Item.Content>
            </Grid.Column>
            <Grid.Column computer={4} mobile={16} tablet={9}>
              <Item.Content>
                <Item.Meta>
                  <p
                    style={{
                      color: "#0095DA",
                      fontSize: "15px"
                    }}
                  >
                    Profession Summary
                  </p>
                  <p
                    style={{
                      fontSize: "15px"
                    }}
                  >
                    MBChB, MMed ,
                  </p>
                  <p
                    style={{
                      fontSize: "15px"
                    }}
                  >
                    Consultant Surgeon & Urologist
                  </p>
                  <p
                    style={{
                      fontSize: "15px"
                    }}
                  >
                    Medical Board Number:A4002
                  </p>
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
            <Grid.Column computer={1} mobile={16} tablet={9} />
          </Grid>
          <Divider />
          <Footer />
        </div>
      </div>
    )
  }
}

export default withRouter(FindYourDoctor)
