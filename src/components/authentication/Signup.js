import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import Loader from "../shared/Loader";

import { Grid, Header, Button, Form, Dropdown } from "semantic-ui-react";
import DaktariLogo from "../../img/logosign.svg";
import "../../App.css";

var genderOptions = [
  {
    key: 1,
    text: "Male",
    value: "1"
  },
  {
    key: 2,
    text: "Female",
    value: "2"
  }
];

var countryOptions = [
  {
    key: 1,
    text: "Kenya",
    value: "254"
  },
  {
    key: 2,
    text: "Rwanda",
    value: "250"
  }
];

class SignUp extends Component {
  constructor(props) {
    super(props);

    document.title = "Registration";

    this.state = {
      userTypeId: "",
      referralId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      msisdn: "",
      address: "",
      userType: "",
      referer: "",
      city: "",
      adminCode: "",
      options: [],
      options2: [],
      isLoading: false
    };
  }

  componentDidMount() {
    axios({
      url: API_BASE_URL + "/content/user-type",
      method: "GET",
      withCredentials: false
    })
      .then(response => {
        // this.props.toggleLoader();
        var json_data = JSON.parse(JSON.stringify(response.data.data));
        var newArray = [];
        Object.keys(json_data).map(key =>
          newArray.push({
            key: json_data[key].id,
            text: json_data[key].name,
            value: json_data[key].id
          })
        );
        console.log(newArray);
        this.setState({ options: newArray });
      })
      .catch(err => {
        console.log(err);
      });

    axios({
      url: API_BASE_URL + "/content/ref-type",
      method: "GET",
      withCredentials: false
    })
      .then(response2 => {
        // this.props.toggleLoader();
        var json_data2 = JSON.parse(JSON.stringify(response2.data.data));
        var newArray2 = [];
        Object.keys(json_data2).map(key =>
          newArray2.push({
            key: json_data2[key].id,
            text: json_data2[key].name,
            value: json_data2[key].id
          })
        );
        console.log(newArray2);
        this.setState({ options2: newArray2 });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSubmit = e => {
    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords must match!!!!!");
      return;
    }

    this.setState({ isLoading: true });

    var signupPayload = {
      userTypeId: this.state.userTypeId,
      practTypeId: 1,
      email: this.state.email,
      msisdn: this.state.msisdn,
      pin: this.state.password,
      person: {
        title: "",
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: "1",
        address: {
          adminCode: this.state.adminCode,
          city: this.state.city,
          details: this.state.details
        }
      },

      referral: {
        referralId: this.state.referralId,
        referralBy: this.state.referralBy
      }
    };
    console.log(signupPayload);

    axios({
      url: `${API_BASE_URL}/user/register`,
      method: "POST",
      withCredentials: false,
      headers: {
        "Content-Type": "application/json"
      },
      data: signupPayload
    })
      .then(response => {
        this.setState({ isLoading: false });
        console.log(response.data);
        if (!response.data.error) {
          alert("Your OTP Is : " + response.data.typeId);
          this.props.history.push("/verify");
          localStorage.setItem("OTP", response.data.typeId);
          // this.props.setUser({
          //   msisdn: response.data.msisdn,
          //   name: response.data.name
          // })
        } else {
          alert(response.data.details);
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    let button = this.state.isLoading ? (
      <Loader />
    ) : (
      <Form.Field
        style={{ width: "100%" }}
        control={Button}
        primary
        className="submit-btn"
        type="submit"
        color="green"
        onClick={this.onSubmit}
      >
        Sign Up
      </Form.Field>
    );

    return (
      <div className="sign-bgColor2">
        <div className="">
          <Link to="/">
            <img src={DaktariLogo} className="savepay_login" alt="daktari" />
          </Link>
          <Grid centered columns={3}>
            <Grid.Row>
              <Grid.Column mobile={14} tablet={10} computer={5}>
                <div className="card">
                  <div className="sign-form">
                    <Header as="h2" textAlign="center">
                      Sign up to continue
                    </Header>

                    <Form>
                      <Form.Field>
                        <label>Select User Type</label>
                        <Dropdown
                          onChange={(e, v) => {
                            this.setState({ userTypeId: v.value });
                          }}
                          id="usertype"
                          options={this.state.options}
                          placeholder="Select"
                          selection
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>First Name</label>
                        <input
                          placeholder="First Name"
                          value={this.state.firstName}
                          onChange={e =>
                            this.setState({ firstName: e.target.value })
                          }
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>Last Name</label>
                        <input
                          placeholder="Last Name"
                          value={this.state.lastName}
                          onChange={e =>
                            this.setState({ lastName: e.target.value })
                          }
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>Gender</label>
                        <Dropdown
                          onChange={(e, v) => {
                            this.setState({ gender: v.value });
                          }}
                          options={genderOptions}
                          placeholder="Select"
                          selection
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>Email</label>
                        <input
                          type="email"
                          placeholder="email"
                          value={this.state.email}
                          onChange={e =>
                            this.setState({ email: e.target.value })
                          }
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <input
                          type="password"
                          placeholder="password"
                          value={this.state.password}
                          onChange={e =>
                            this.setState({ password: e.target.value })
                          }
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          value={this.state.confirmPassword}
                          onChange={e =>
                            this.setState({ confirmPassword: e.target.value })
                          }
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>Country</label>
                        <Dropdown
                          onChange={(e, v) => {
                            this.setState({
                              adminCode: v.value,
                              msisdn: v.value
                            });
                          }}
                          options={countryOptions}
                          placeholder="Select"
                          selection
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>Phone number</label>
                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={this.state.msisdn}
                          maxLength="12"
                          onChange={e =>
                            this.setState({ msisdn: e.target.value })
                          }
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>City</label>
                        <input
                          type="text"
                          placeholder="City"
                          value={this.state.city}
                          onChange={e =>
                            this.setState({ city: e.target.value })
                          }
                        />
                      </Form.Field>

                      <Form.Field>
                        <label>How did you hear about us</label>
                        <Dropdown
                          onChange={(e, v) => {
                            this.setState({ referralId: v.value });
                          }}
                          id="referer"
                          options={this.state.options2}
                          placeholder="Select"
                          selection
                          // value={this.state.value2}
                        />
                      </Form.Field>

                      {button}

                      <p className="center">
                        Already have an account ?
                        <span className="no_account_text">
                          {" "}
                          <Link
                            style={{ color: "red", textAlign: "center" }}
                            to="/login"
                          >
                            Sign in
                          </Link>
                        </span>
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

export default SignUp;
