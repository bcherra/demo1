import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import DimensionsComp from "../dimensions/Dimensions";

class MainMenuBarRoutes extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return( 
            
                this.props.options.map((option, index) => { 
                    return(
                        <Route key={index} path={option.link} component={option.linkToComp} ></Route>
                      
                        ) 
                    }
                ) 
              
        );
    }
}
export default MainMenuBarRoutes
