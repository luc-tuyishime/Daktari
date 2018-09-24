import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { isLoggedIn } from "./util/AuthService"

// import './semantic/dist/semantic.min.css'

// import { isAuthenticated } from "./components/sign/isAuth"

import SignIn from "./components/authentication/SignIn"
import Verify from "./components/authentication/Verify"
import SignUp from "./components/authentication/Signup"
import Recovery from "./components/authentication/Recovery"
import HomePage from "./components/pages/HomePage"
import About from "./components/pages/About"
import Dashboard from "./components/pages/Dashboard"
import FindYourDoctor from "./components/pages/FindYourDoctor"
import HealthFacility from "./components/pages/HealthFacilities"
import HospitalsAndDiagnostics from "./components/pages/HospitalsAndDiagnostics"
import NewsAndEvents from "./components/pages/NewsAndEvents"
import LearnAndDiscuss from "./components/pages/LearnAndDiscuss"
import KeepTrack from "./components/pages/KeepTrack"

// Apps
import BloodSugarApp from "./components/pages/app/BloodSugar"
import BloodPressureApp from "./components/pages/app/BloodPressure"
import CholestrolApp from "./components/pages/app/Cholestrol"
import TempApp from "./components/pages/app/Temp"
import DoctorsApp from "./components/pages/app/Doctors"
import EmailApp from "./components/pages/app/Email"
import VideoApp from "./components/pages/app/Video"
import PoliciesApp from "./components/pages/app/Policies"
import DiagnosisApp from "./components/pages/app/Diagnosis"
import ManagementApp from "./components/pages/app/Management"
// Forms
import AddKeepTrackItem from "./components/pages/forms/AddKeepTrackItem"
import BloodGlucoseForm from "./components/pages/forms/BloodGlucose"
import BloodPressureForm from "./components/pages/forms/BloodPressure"
import CholestralForm from "./components/pages/forms/Cholestrol"
import TempForm from "./components/pages/forms/Temp"
import DoctorsForm from "./components/pages/forms/Doctors"
import EmailForm from "./components/pages/forms/Email"
import VideoForm from "./components/pages/forms/Video"
import PoliciesForm from "./components/pages/forms/Policies"
import DiagnosisForm from "./components/pages/forms/Diagnosis"
import ManagementForm from "./components/pages/forms/Management"
import ProfileUpdate from "./components/pages/forms/ProfileUpdate"
import Medicines from "./components/pages/Medicines"
import AboutUs from "./components/pages/AboutUs"
import FindDoctor from "./components/pages/FindDoctor"
import NotFoundPage from "./components/pages/not-found-page"
import Includes from "./components/pages/includes"

class App extends React.Component {
  render() {
    return (
      <div>
        <Router className="App">
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/verify" component={Verify} />
              <Route path="/pwd-recovery" component={Recovery} />
              <Route path="/about-us" component={About} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/find-your-doctor" component={FindYourDoctor} />
              <Route path="/health-facilities" component={HealthFacility} />
              <Route
                path="/hospitals-and-diagnostics"
                component={HospitalsAndDiagnostics}
              />
              <Route path="/news-and-events" component={NewsAndEvents} />
              <Route path="/learn-and-discuss" component={LearnAndDiscuss} />
              <Route path="/admin-about-us" component={AboutUs} />
              <Route path="/keep-track" component={KeepTrack} />
              <Route path="/profile-update" component={ProfileUpdate} />
              <Route path="/medicines" component={Medicines} />
              <Route path="/find-doctor" component={FindDoctor} />

              {/* // Apps  */}
              <Route path="/blood-sugar" component={BloodSugarApp} />
              <Route path="/blood-pressure" component={BloodPressureApp} />
              <Route path="/cholestrol" component={CholestrolApp} />

              <Route path="/temp" component={TempApp} />
              <Route path="/doctors" component={DoctorsApp} />
              <Route path="/email" component={EmailApp} />
              <Route path="/video" component={VideoApp} />
              <Route path="/policies" component={PoliciesApp} />
              <Route path="/diagnosis" component={DiagnosisApp} />
              <Route path="/management" component={ManagementApp} />

              {/* // Forms  */}
              <Route path="/blood-glucose-form" component={BloodGlucoseForm} />
              <Route
                path="/blood-pressure-form"
                component={BloodPressureForm}
              />
              <Route path="/cholestrol-form" component={CholestralForm} />
              <Route path="/temp-form" component={TempForm} />
              <Route path="/doctors-form" component={DoctorsForm} />
              <Route path="/email-form" component={EmailForm} />
              <Route path="/video-form" component={VideoForm} />
              <Route path="/policies-form" component={PoliciesForm} />
              <Route path="/diagnosis-form" component={DiagnosisForm} />
              <Route path="/management-form" component={ManagementForm} />
              <Route path="/add-keep-track-item" component={AddKeepTrackItem} />

              <Route path="*" component={NotFoundPage} />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    )
  }
}

export default App
