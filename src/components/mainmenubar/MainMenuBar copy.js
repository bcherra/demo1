import { React, Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import MainMenuBarRoutes from './MainMenuBarRoutes'
import MainMenuItems from './MainMenuItems'
import { PinDropSharp } from '@material-ui/icons';
import DimensionsComp from "../dimensions/Dimensions";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
class MainMenuBar extends Component {
        state = {
            anchorEl : null,
            show : false
        }
    mainMenuList = [
        {
            link :"/threshold",
            linkToComp: DimensionsComp,
            display: "Threshold"
        },
        {
            link :"/dimensions",
            linkToComp: DimensionsComp,
            display: "Dimensions"
        },
        {
            link :"/alerts",
            linkToComp: DimensionsComp,
            display: "Alerts"
        }
    ]    
    handleMenuButtonClick = (event) => {
        if(!this.state.show) {
            this.setState({
                show: true,
                anchorEl: event.currentTarget
            })
        }
    }
   
    handleClose =  (event) => {
        if(this.state.show) {
             this.setState({
                 show: false,
                 anchorEl: null
             })
         }
     }

    render() {
        
        const classes = makeStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: 12,
            },
            groupTitle: {
                marginLeft: "25px"
            }
            //add class for MainMenu Div
        });
              
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={this.handleMenuButtonClick}  variant="contained"  className={classes.menuButton} color="inherit">
                            <MenuIcon />
                       </IconButton>
                       <Typography classes={classes.groupTitle} component="h1" variant="h5">
                            Datalytics
                        </Typography>
                    </Toolbar>

                    
                </AppBar>
                <Menu
                    id="main-menu"
                    anchorEl={this.state.anchorEl}
               
                    open={this.state.show}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                >
                    <MainMenuItems  options={this.mainMenuList} onClickFn={this.handleClose}/>
                </Menu>
                <main >
                    <div />
                  
                        <Container maxWidth="lg" style={{backgroundColor:"red", color:"white"}}>
                        
                            
                     
         
                        </Container>
                           
                </main>
                <MainMenuBarRoutes options={this.mainMenuList}/>
           
            </div>
           
        );
    }

}


export default MainMenuBar
