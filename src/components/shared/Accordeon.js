import React, { Component } from "react"
import { Accordion, Icon, Button, Divider } from "semantic-ui-react"
import "../../App.css"

export default class AccordionDoctor extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion>
        <Accordion.Title
          style={{ color: "#0095DA" }}
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          More ...
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 2}>
          {/* Second paragraph */}
          <span className="doctor_detail">Professional Training</span>
          <br />
          <span className="doctor_subtext">MBChB University of Nairobi</span>
          <br />
          <span className="doctor_subtext">
            MMed Surgery University of Nairobi
          </span>
          <Divider />
          <br />
          {/* Third paragraph */}
          <span className="doctor_detail">
            Membership of Professional Bodies
          </span>
          <br />
          <p className="doctor_subtext">
            Kenya Association of Urological Surgeons
          </p>
          <span className="doctor_subtext">Surgical Society of Kenya</span>
          <br />
          <span className="doctor_subtext">Kenya Medical Association</span>
          <Divider />
          <br />

          <span className="doctor_detail">Admission Rights</span>
          <br />
          <span className="doctor_subtext">The Aga Khan Hospital</span>
          <br />
          <span className="doctor_subtext">M. P. Shah Hospital</span>
          <br />
          <span className="doctor_subtext">Mater Hospital</span>
          <br />
          <span className="doctor_subtext">Karen Hospital</span>
          <br />
          <span className="doctor_subtext">Nairobi West Hospital</span>
          <br />
          <span className="doctor_subtext">Coptic Hospital</span>
          <Divider />
          <br />

          {/* Second paragraph */}
          <span className="doctor_detail">Insurance Recognition</span>
          <br />
          <span className="doctor_subtext">General Accident, BUPA </span>
          <Divider />
          <br />

          {/* Third paragraph */}
          <span className="doctor_detail">Languages Spoken</span>
          <br />
          <span className="doctor_subtext">English, Swahili</span>
          <br />
          <span className="doctor_subtext">Gender: Male</span>
          <br />
          <span className="doctor_subtext">Hobbies:</span>
          <Divider />
          <br />

          {/* Third paragraph */}
          <span className="doctor_detail">Email: okoladungo.dr@gmail.com</span>
          <br />
          <span className="doctor_subtext">Phone Number: +254722960817</span>
          <br />
          <span className="doctor_subtext">Opening Hours 08:00:00</span>
          <br />
          <span className="doctor_subtext">Closing Hours 15:00:00</span>
        </Accordion.Content>
      </Accordion>
    )
  }
}
