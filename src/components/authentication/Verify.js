import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL, USER_PAYLOAD } from "../../constants";
import { Link, withRouter, Redirect } from "react-router-dom";
import Loader from "../shared/Loader";

import { Grid, Header, Button, Form, Checkbox } from "semantic-ui-react";
import {
  logout,
  isLoggedIn
  // ,
  // toggleLoader
} from "../../util/AuthService";
import DaktariLogo from "../../img/logosign.svg";
import "../../App";

class Verify extends Component {
  constructor(props) {
    super(props);
    logout();
    document.title = "Verification";

    this.state = {
      msisdn: "",
      otp: "",
      manualotp: "",
      error: "",
      open: false,
      isLoading: false
    };
  }

  componentDidMount() {
    var otp = localStorage.getItem("OTP");
    this.setState({ manualotp: otp });
  }
  componentWillMount() {
    this.setState({ isUserLoggedIn: isLoggedIn() });
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  onSubmit = e => {
    if (this.state.msisdn == "" && this.state.otp == "") {
      return;
    }

    var verificationPayload = {
      msisdn: this.state.msisdn,
      otp: this.state.otp
    };

    this.setState({ isLoading: true });

    axios({
      url: `${API_BASE_URL}/user/code/verify`,
      method: "POST",
      withCredentials: false,
      headers: {
        "Content-Type": "application/json"
      },
      data: verificationPayload
    })
      .then(response => {
        this.setState({ isLoading: false });
        console.log(response.data);
        if (response.data) {
          if (response.data.name.toLowerCase() === "Success".toLowerCase()) {
            //   localStorage.setItem(USER_PAYLOAD, JSON.stringify(response.data));
            this.props.history.push("/login");
          } else {
            //alert with details of the error
            alert(response.data.details);
          }
        } else {
          this.setState({ isLoading: false });
          this.setState(
            {
              password: "",
              error: response.data.message
            },
            () => {
              setTimeout(() => {
                this.setState({
                  error: ""
                });
              }, 3000);
            }
          );
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    if (this.state.isUserLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    let button = this.state.isLoading ? (
      <Loader />
    ) : (
      <Button
        style={{ width: "100%" }}
        primary
        onClick={this.onSubmit}
        className="submit-btn"
      >
        Verify
      </Button>
    );

    const { manualotp } = this.state;

    return (
      <div className="sign-bgColor">
        <div className="center-card">
          <Link to="/">
            <img src={DaktariLogo} className="savepay_login" alt="daktari" />
          </Link>
          <Grid centered columns={3}>
            <Grid.Row>
              <Grid.Column mobile={14} tablet={10} computer={5}>
                <div className="card">
                  <div className="sign-form">
                    <Header as="h2" textAlign="center">
                      Verify to continue
                    </Header>

                    <Form className="ui form segment">
                      <Form.Field>
                        <label>Phone Number</label>
                        <input
                          type="number"
                          placeholder="Phone Number"
                          value={this.state.msisdn}
                          maxLength="12"
                          required={true}
                          error="we need that phone number"
                          onChange={e =>
                            this.setState({ msisdn: e.target.value })
                          }
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>One Time Password: </label>
                        <input
                          type="text"
                          required={true}
                          placeholder="OTP"
                          value={this.state.otp}
                          onChange={e => this.setState({ otp: e.target.value })}
                        />
                      </Form.Field>

                      {button}

                      <p className="center">
                        Didn't receive one-time-password ?
                        <span className="no_account_text">
                          {" "}
                          <Link
                            style={{ color: "red", textAlign: "center" }}
                            to="/signup"
                          >
                            Resend
                          </Link>
                        </span>
                      </p>

                      <p className="center" style={{ color: "red" }}>
                        <Link style={{ color: "red" }} to="/login">
                          Proceed to Login ?
                        </Link>
                      </p>

                      <Grid>
                        <Grid.Column mobile={6} tablet={8} computer={16}>
                          <Grid.Column
                            mobile={6}
                            tablet={8}
                            computer={16}
                            floated="right"
                          />
                        </Grid.Column>
                      </Grid>
                    </Form>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(Verify);
