import React, { Component } from "react"
import {
  Input,
  Menu,
  Segment,
  Button,
  Card,
  Icon,
  Header,
  Table,
  Grid,
  Label,
  Dropdown,
  Image,
  Sidebar
} from "semantic-ui-react"
import {
  logout,
  login,
  isLoggedIn,
  getUserDetails
} from "../../util/AuthService"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts"
import { Router, Route, Link, withRouter } from "react-router-dom"
import DaktariLogo from "../../img/logosign.svg"

function logoutUser() {
  console.log("Logging out user...")
  // logout();
  // super(props);
  // history.push("/signin");
  // this.props.history.push("/signin");
  // <Redirect to="/signin" />;
  // props.history.push("/dashboard");
}

export function mainAdminMenu(activeItem, handleItemClick) {
  return (
    <div>
      <Menu borderless className="">
        <Link to="/dashboard">
          <img src={DaktariLogo} className="savepay_login" alt="daktari" />
        </Link>
        <Link className="logout-button" to="/dashboard">
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
        </Link>

        <Link className="logout-button" to="/find-your-doctor">
          <Menu.Item
            name="find your doctor"
            active={activeItem === "find your doctor"}
            onClick={handleItemClick}
          />
        </Link>
        <Link className="logout-button" to="/hospitals-and-diagnostics">
          <Menu.Item
            name="hostpitals and diagnostics"
            active={activeItem === "hostpitals and diagnostics"}
            onClick={handleItemClick}
          />
        </Link>
        <Link className="logout-button" to="/news-and-events">
          <Menu.Item
            name="news and events"
            active={activeItem === "news and events"}
            onClick={handleItemClick}
          />
        </Link>
        <Link className="logout-button" to="/learn-and-discuss">
          <Menu.Item
            name="learn and discuss"
            active={activeItem === "learn and discuss"}
            onClick={handleItemClick}
          />
        </Link>
        <Link className="logout-button" to="/admin-about-us">
          <Menu.Item
            name="about us"
            active={activeItem === "about us"}
            onClick={handleItemClick}
          />
        </Link>

        <Menu.Menu position="right">
          <Link to="/login" className="logout-button__">
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={handleItemClick}
            />
          </Link>
        </Menu.Menu>
      </Menu>
    </div>
  )
}

export function mainAdminMenu_ORIG(activeItem, handleItemClick) {
  return (
    <div>
      <Menu borderless className="">
        <Link to="/dashboard">
          <img src={DaktariLogo} className="savepay_login" alt="daktari" />
        </Link>
        <Menu.Menu position="right">
          <Link to="/login" className="logout-button">
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={handleItemClick}
            />
          </Link>
        </Menu.Menu>
      </Menu>
      <Menu pointing>
        <Link to="/dashboard">
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
        </Link>
        <Link to="/find-your-doctor">
          <Menu.Item
            name="find your doctor"
            active={activeItem === "find your doctor"}
            onClick={handleItemClick}
          />
        </Link>
        <Link to="/hospitals-and-diagnostics">
          <Menu.Item
            name="hostpitals and diagnostics"
            active={activeItem === "hostpitals and diagnostics"}
            onClick={handleItemClick}
          />
        </Link>
        <Link to="/news-and-events">
          <Menu.Item
            name="news and events"
            active={activeItem === "news and events"}
            onClick={handleItemClick}
          />
        </Link>
        <Link to="/learn-and-discuss">
          <Menu.Item
            name="learn and discuss"
            active={activeItem === "learn and discuss"}
            onClick={handleItemClick}
          />
        </Link>
        <Link to="/admin-about-us">
          <Menu.Item
            name="about us"
            active={activeItem === "about us"}
            onClick={handleItemClick}
          />
        </Link>
      </Menu>
    </div>
  )
}

export function keepTrackMenu() {
  return (
    <div>
      <Link to="/blood-sugar" className="daktari-widget">
        <Label size="massive" color="blue">
          <Icon name="address book" /> Keep Track
        </Label>
      </Link>
      <Link to="/medicines" className="daktari-widget">
        <Label size="massive" color="olive">
          <Icon name="medkit" /> Medicines
        </Label>
      </Link>
      <Link to="/blood-sugar" className="daktari-widget">
        <Label size="massive" color="teal">
          <Icon name="heartbeat" /> Health Forums
        </Label>
      </Link>
      <Link to="/medicines" className="daktari-widget">
        <Label size="massive" color="violet">
          <Icon name="user md" /> Doctors Lounge
        </Label>
      </Link>
    </div>
  )
}

// Sidebar
export function sideBarDashboard() {
  var visible = true

  return (
    <div className="sidebar-height">
      <Sidebar.Pushable>
        <Sidebar
          className="sidebar-bg-color"
          as={Menu}
          icon="labeled"
          vertical
          visible={visible}
          borderless
        >
          <Link to="/dashboard">
            <Menu.Item className="text-left" as="a">
              <Icon className="yelp-font inline top-padding" name="home" />

              <span className="inline text-color">Dashboard</span>
            </Menu.Item>
          </Link>

          <Link to="/blood-sugar">
            <Menu.Item className="text-left" as="a">
              <Icon className="yelp-font inline" name="clock" />

              <span className="inline text-color">Keep Track</span>
            </Menu.Item>
          </Link>

          <Link to="/medicines">
            <Menu.Item className="text-left" as="a">
              <Icon className="yelp-font inline" name="camera" />

              <span className="inline text-color">Medicines</span>
            </Menu.Item>
          </Link>

          <Link to="/blood-sugar">
            <Menu.Item className="text-left" as="a">
              <Icon className="yelp-font inline" name="yelp" />

              <span className="inline text-color">Health Forums</span>
            </Menu.Item>
          </Link>

          <Link to="/medicines">
            <Menu.Item className="text-left" as="a">
              <Icon className="yelp-font inline" name="dashboard" />

              <span className="inline text-color">Doctor Lounge</span>
            </Menu.Item>
          </Link>

          <div className="submenu-sidebar">
            <Menu.Item className="text_sidebar" as="a">
              Help
            </Menu.Item>

            <Link to="/settings">
              <Menu.Item className="text_sidebar" as="a">
                Settings
              </Menu.Item>
            </Link>

            <Menu.Item className="text_sidebar" as="a">
              Support
            </Menu.Item>

            <Menu.Item className="text_sidebar" as="a">
              Policies
            </Menu.Item>
          </div>
        </Sidebar>
      </Sidebar.Pushable>
    </div>
  )
}

// Title and Search Bar

export function keepTrackSubMenu(minActiveItem, handleItemClick) {
  return (
    <Menu attached="top" tabular>
      <Menu.Item
        name="blood glucose"
        active={minActiveItem === "blood glucose"}
        as={Link}
        to="/blood-sugar"
      />
      <Menu.Item
        name="blood pressure"
        active={minActiveItem === "blood pressure"}
        as={Link}
        to="/blood-pressure"
      />
      <Menu.Item
        name="cholestrol"
        active={minActiveItem === "cholestrol"}
        onClick={handleItemClick}
        as={Link}
        to="/cholestrol"
      />

      <Menu.Item
        name="temp"
        active={minActiveItem === "temp"}
        as={Link}
        to="/temp"
      />

      <Menu.Item
        name="doctors"
        active={minActiveItem === "doctors"}
        as={Link}
        to="/doctors"
      />

      <Menu.Item
        name="email"
        active={minActiveItem === "email"}
        as={Link}
        to="/email"
      />

      <Menu.Item
        name="video"
        active={minActiveItem === "video"}
        as={Link}
        to="/video"
      />

      <Menu vertical className="keep-track-more-menu">
        <Dropdown item text="More">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Menu.Item
                name="policies"
                active={minActiveItem === "policies"}
                as={Link}
                to="/policies"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                name="diagnosis"
                active={minActiveItem === "diagnosis"}
                as={Link}
                to="/diagnosis"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                name="management"
                active={minActiveItem === "management"}
                as={Link}
                to="/management"
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>

      {/* <Menu.Menu position="right">
                <Menu.Item>
                  <Input
                    transparent
                    icon={{ name: "search", link: true }}
                    placeholder="Search users..."
                  />
                </Menu.Item>
              </Menu.Menu> */}
    </Menu>
  )
}

export function loadUserProfileCard() {
  const userDetails = getUserDetails()
  const fullName = userDetails.data.firstName + " " + userDetails.data.lastName

  const extra = (
    <a>
      <Icon name="user" />
      16 Connections
    </a>
  )

  return (
    <div className="dashboard-user-image">
      <Segment>
        <div className="style-div-one">
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            size="tiny"
            circular
            centered
          />

          <p style={{ paddingTop: "10px" }} className="text-profile">
            Gideon Karuga
          </p>
          <p className="text-profile email-color">karuga@gmail.com</p>
          <p className="text-profile_">25475873573453</p>
          <p className="text-profile__">220 Nairobi,kenya</p>
        </div>
        <div>
          <header style={{ color: "#0095DA", fontSize: "14px" }} as="h2">
            About
          </header>
          <p style={{ color: "#A49999", paddingBottom: "50px" }}>
            Elliot is a sound engineer living in Nashville who enjoys playing
            guitar and hanging with his cat.
          </p>
        </div>
      </Segment>
    </div>
  )
}

export function PatientNote() {
  return (
    <div>
      <div>
        <header style={{ color: "#0095DA", fontSize: "14px" }} as="h2">
          Patient Note
        </header>
        <Segment>
          <div>
            <p style={{ color: "#A49999", paddingBottom: "10px" }}>
              Elliot is a sound engineer living in Nashville who enjoys playing
              guitar and hanging with his cat.
            </p>
          </div>
        </Segment>
      </div>
      <div>
        <header
          style={{ color: "#0095DA", fontSize: "14px", marginTop: "15px" }}
          as="h2"
        >
          Your Policy
        </header>
        <Segment>
          <div>
            <p style={{ color: "#A49999", paddingBottom: "15px" }}>
              Elliot is a sound engineer living in Nashville who enjoys playing
              guitar and hanging with his cat.
            </p>
          </div>
        </Segment>
      </div>
    </div>
  )
}

export function RecentVisits() {
  return (
    <div>
      <header style={{ color: "#0095DA", fontSize: "14px" }} as="h2">
        Recent Visits
      </header>
      <Segment>
        <div>
          <span
            style={{
              color: "#A49999",
              paddingBottom: "10px",
              marginRight: "10px"
            }}
          >
            06 sept 2018
          </span>
          <Image
            style={{
              marginRight: "10px"
            }}
            src="https://react.semantic-ui.com/images/wireframe/square-image.png"
            avatar
          />
          <span style={{ color: "#0095DA", paddingBottom: "10px" }}>
            Dr. Bella Rios, Kalifornia
          </span>
        </div>
      </Segment>

      <Segment>
        <div>
          <span
            style={{
              color: "#A49999",
              paddingBottom: "10px",
              marginRight: "10px"
            }}
          >
            06 sept 2018
          </span>
          <Image
            style={{
              marginRight: "10px"
            }}
            src="https://react.semantic-ui.com/images/wireframe/square-image.png"
            avatar
          />
          <span style={{ color: "#0095DA", paddingBottom: "10px" }}>
            Dr. Bella Rios, Kalifornia
          </span>
        </div>
      </Segment>
    </div>
  )
}

const data2 = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
]

export function MedicalRecord() {
  return (
    <div>
      <header style={{ color: "#0095DA", fontSize: "14px" }} as="h2">
        Last Medical Record
      </header>
      <Segment>
        <Grid>
          <Grid.Column floated="left" width={5}>
            <span
              style={{
                color: "#0095DA",
                paddingBottom: "10px",
                marginRight: "10px",
                fontSize: "16px"
              }}
            >
              Blood Glucose
            </span>
            <p
              style={{
                color: "#0095DA",
                fontSize: "25px"
              }}
            >
              145mp
            </p>
          </Grid.Column>
          <Grid.Column floated="left" width={5}>
            <LineChart width={200} height={100} data={data2}>
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  )
}

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
]

export function DashboardChart() {
  return (
    <div>
      <Segment>
        <p
          style={{
            color: "#0095DA",
            fontSize: "15px",
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "20px"
          }}
        >
          Appointment
        </p>
        <LineChart width={800} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </Segment>
    </div>
  )
}
