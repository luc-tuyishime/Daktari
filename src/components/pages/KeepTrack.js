import React, { Component } from "react";
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
} from "semantic-ui-react";
import { logout, login, isLoggedIn } from "../../util/AuthService";
import { Router, Route, Link, withRouter } from "react-router-dom";
import {
  keepTrackMenu,
  mainAdminMenu,
  keepTrackSubMenu,
  loadUserProfileCard
} from "./includes.js";

const options = [
  { key: "m", text: "Dr. Kahonge, Fiona", value: "male" },
  { key: "f", text: "Dr. Kahungu, Eric", value: "female" }
];

class KeepTrack extends Component {
  state = { activeItem: "home", minActiveItem: "blood glucose" };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name });

  constructor(props) {
    super(props);
    console.log(isLoggedIn());
    document.title = "Keep Track";
  }

  componentWillMount() {
    this.checkAuth();
  }

  checkAuth() {
    if (!isLoggedIn()) {
      this.props.history.push("/");
    }
  }

  renderItems(activeItem) {
    switch (activeItem) {
      case "blood glucose":
        return (
          <div>
            <h3>Blood Sugar </h3>
            <Table celled selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <Link to="/blood-glucose-form" className="">
                      <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                      >
                        <Icon name="user" /> Add Item
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
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>No Action</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>Requires call</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <h2>Blood Sugar Reading </h2>
          </div>
        );
      case "blood pressure":
        return (
          <div>
            <h2>Blood Pressure </h2>
            <Table celled selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <Link to="/blood-pressure-form" className="">
                      <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                      >
                        <Icon name="user" /> Add Item
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
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>No Action</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>Requires call</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <h2>Blood Pressure Reading </h2>
          </div>
        );
      case "cholestrol":
        return (
          <div>
            <h2>Cholelstrol </h2>
            <Table celled selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <Link to="/cholestrol-form" className="">
                      <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                      >
                        <Icon name="user" /> Add Item
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
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>No Action</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>Requires call</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <h2>Cholestral Reading </h2>
          </div>
        );
      case "temp":
        return (
          <div>
            <h2>Temperature </h2>
            <Table celled selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <Link to="/temp-form" className="">
                      <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                      >
                        <Icon name="user" /> Add Item
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
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>No Action</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>Requires call</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <h2>Temperature Reading </h2>
          </div>
        );
      case "doctors":
        return (
          <div>
            <h2>Doctors </h2>
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
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>No Action</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>Requires call</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        );
      case "email":
        return (
          <div>
            <h2>Send Email </h2>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                label="Doctor"
                options={options}
                placeholder="Doctor"
              />
              <Form.Field control={Checkbox} label="BMI" />
              <Form.Field control={Checkbox} label="Blood Type" />
              <Form.Field control={Checkbox} label="Blood Pressure" />
              <Form.Field control={Checkbox} label="Blood Glucose" />
              <Form.Field control={Checkbox} label="Blood Cholelstrol" />
              <TextArea placeholder="Tell us more" style={{ minHeight: 100 }} />
              <Button
                floated="left"
                icon
                labelPosition="left"
                primary
                size="small"
              >
                <Icon name="user" /> Send Email
              </Button>
            </Form.Group>
          </div>
        );
      case "video":
        return (
          <div>
            <h2>Video </h2>
            <p>
              Welcome to Daktari Africa Video consultations. We offer Kenyas
              First viltual consulations with a real Doctor. This service is
              available to you from the comfort of your home/ office or through
              our partners at Westons Pharmacy,KDDA and Pharmat Before you
              proceed kindly take note of the following: If you are at home you
              will be required to have at least KES 500 in your Daktari Africa
              Wallet. This amount will be automatically deducted when you place
              a call to the doctor If you are at Westons Pharmacy or KDDA ensure
              that you have paid for your consultation and have your Receipt
              Number Handy, it is required before the call is placed Choose Your
              location I am at Westons I am at KDDAI am at PharmatI am at
              Home/Office
            </p>
          </div>
        );
      case "policies":
        return (
          <div>
            <h2>Policies </h2>
            <Table celled selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <Link to="/policies-form" className="">
                      <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                      >
                        <Icon name="user" /> Add Policy
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
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>No Action</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>Requires call</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        );
      case "diagnosis":
        return (
          <div>
            <h2>Diagnosis </h2>
            <Table celled selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    {/* <Button size="small">Approve</Button>
                      <Button disabled size="small">
                        Approve All
                      </Button> */}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>No Action</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>Requires call</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        );
      case "management":
        return (
          <div>
            <h2>Management </h2>

            <Table celled selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    {/* <Button size="small">Approve</Button>
                      <Button disabled size="small">
                        Approve All
                      </Button> */}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>No Action</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>Requires call</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        );
      default:
        return (
          <div>
            <Table celled selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <Link to="/add-keep-track-item" className="">
                      <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                      >
                        <Icon name="user" /> Add Item
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
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>No Action</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>Requires call</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <h2>Blood Sugar Reading </h2>
          </div>
        );
    }
  }

  render() {
    const { activeItem, minActiveItem } = this.state;
    return (
      <div className="ui container">
        {mainAdminMenu(activeItem, this.handleItemClick)}

        {/* <Segment>
          <div>
            <Link to="/keep-track">
              <Button
                icon="fork"
                label={{ as: "a", basic: true, content: "Keep Track" }}
                labelPosition="left"
              />
            </Link>
            <Link to="/medicines">
              <Button
                icon="fork"
                label={{ as: "a", basic: true, content: "Medicines" }}
                labelPosition="left"
              />
            </Link>
            <Button
              icon="fork"
              label={{ as: "a", basic: true, content: "Health Forums" }}
              labelPosition="left"
            />
            <Button
              icon="fork"
              label={{ as: "a", basic: true, content: "Doctors Lounge" }}
              labelPosition="left"
            />
          </div>
        </Segment> */}
        <Segment>{keepTrackMenu(activeItem, this.handleItemClick)}</Segment>

        <div className="custom-hr" />

        <div className="ui container">
          {loadUserProfileCard()}

          <div className="dashboard-user-profile">
            <Header as="h2">Keep Track</Header>

            {keepTrackSubMenu(minActiveItem, this.handleItemClick)}

            <Segment attached="bottom">
              {this.renderItems(minActiveItem)}
            </Segment>
          </div>
        </div>

        <br />
        <div className="custom-hr" />
      </div>
    );
  }
}

export default withRouter(KeepTrack);
