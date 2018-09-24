import React, { Component } from "react"
import { Link } from "react-router-dom"
// import './semantic/dist/semantic.min.css'

import { Grid, Header, Button, Form } from "semantic-ui-react"
import DaktariLogo from "../../img/logosign.svg"
import "../../App.css"

class Recovery extends Component {
  render() {
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
                      Recovery Your Password
                    </Header>
                    <p className="center">
                      We'll send you a link to reset your password
                    </p>

                    <Form>
                      <Form.Field>
                        <label>Enter your email address</label>
                        <input
                          type="email"
                          placeholder="Enter your email address"
                        />
                      </Form.Field>
                      <Form.Field
                        style={{ width: "100%" }}
                        control={Button}
                        primary
                        className="submit-btn"
                        type="submit"
                        color="green"
                      >
                        Send password to my email
                      </Form.Field>

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
    )
  }
}

export default Recovery
