import React, { Component } from "react";
// import { connect } from "react-redux"
import {
  Input,
  Menu,
  Segment,
  Button,
  Card,
  Icon,
  Container,
  Header,
  Table,
  Label
} from "semantic-ui-react";
import { logout, login, isLoggedIn } from "../../util/AuthService";
import DaktariLogo from "../../img/logosign.svg";
import { Router, Route, Link, withRouter } from "react-router-dom";
import { keepTrackMenu, mainAdminMenu } from "./includes.js";

class Medicines extends Component {
  state = { activeItem: "home", minActiveItem: "who we are" };
  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, minActiveItem: name });

  constructor(props) {
    super(props);
    console.log(isLoggedIn());
  }

  componentWillMount() {
    this.checkAuth();
  }

  checkAuth() {
    if (!isLoggedIn()) {
      this.props.history.push("/");
    }
  }

  render() {
    const { activeItem, minActiveItem } = this.state;

    const extra = (
      <a>
        <Icon name="user" />
        16 Friends
      </a>
    );

    return (
      <div className="ui container">
        {mainAdminMenu(activeItem, this.handleItemClick)}

        <Segment>{keepTrackMenu()}</Segment>

        <div className="custom-hr" />

        <div className="ui container">
          <div className="admin-about-us">
            <Header as="h2">Medicines</Header>

            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Header</Table.HeaderCell>
                  <Table.HeaderCell>Header</Table.HeaderCell>
                  <Table.HeaderCell>Header</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Label ribbon>First</Label>
                  </Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    <Menu floated="right" pagination>
                      <Menu.Item as="a" icon>
                        <Icon name="chevron left" />
                      </Menu.Item>
                      <Menu.Item as="a">1</Menu.Item>
                      <Menu.Item as="a">2</Menu.Item>
                      <Menu.Item as="a">3</Menu.Item>
                      <Menu.Item as="a">4</Menu.Item>
                      <Menu.Item as="a" icon>
                        <Icon name="chevron right" />
                      </Menu.Item>
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        </div>

        <br />
        <div className="custom-hr" />
      </div>
    );
  }
}

export default withRouter(Medicines);
