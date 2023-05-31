import React, { Component } from 'react'
import { Nav, NavLink} from 'react-bootstrap'
import { BrowserRouter as Router, Route } from "react-router-dom"
import GCPLogin from './components/common/GCPLogin'
//import DimensionsComp from './components/dimensions/Dimensions'
import MainMenuBar from './components/mainmenubar/MainMenuBar'
//import MainMenuBarRoutes from './components/mainmenubar/MainMenuBarRoutes'

class App extends Component {
  render() {
    return (
      <Router>
        <MainMenuBar/>
      </Router>
    )
  }
}

export default App