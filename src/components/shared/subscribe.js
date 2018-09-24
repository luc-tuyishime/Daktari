import React, { Component } from "react"
import { Grid, Form, Image } from "semantic-ui-react"
import Phone from "../../img/phone.svg"
import Ios from "../../img/ios.svg"
import Android from "../../img/android.svg"
import "../../App.css"

class Subscribe extends Component {
  state = { email: "", submittedEmail: "" }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { email } = this.state

    this.setState({ submittedEmail: email })
  }

  render() {
    const { email } = this.state

    return (
      <div className="div_three" style={{ padding: "0em" }}>
        <Grid stackable>
          <Grid.Row textAlign="center">
            <Grid.Column width={1} />
            <Grid.Column
              width={6}
              style={{ paddingBottom: "2em", paddingTop: "2em" }}
            >
              <Image className="img-svg" src={Phone} />
            </Grid.Column>
            <Grid.Column
              width={5}
              style={{ paddingBottom: "0em", paddingTop: "7em" }}
            >
              <p
                style={{
                  fontSize: "18px",
                  color: "black",
                  textAlign: "justify"
                }}
              >
                Find nearby doctors in your location Book doctor appointments
                with a tap See doctor reviews by other patient
              </p>
              <Grid style={{ marginBottom: "15px" }}>
                <Grid.Column floated="left" width={5}>
                  <Image src={Ios} alt="ios" />
                </Grid.Column>
                <Grid.Column floated="left" width={5}>
                  <Image src={Android} alt="android" />
                </Grid.Column>
              </Grid>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Field width="sixteen">
                    <input placeholder="Email" name="email" value={email} />
                  </Form.Field>
                  <Form.Button primary content="Subscribe" />
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column width={2} />

            <Grid.Column width={2} />
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Subscribe
