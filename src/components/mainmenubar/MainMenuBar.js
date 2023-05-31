import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MainMenuItems from './MainMenuItems';
import MainMenuBarRoutes from './MainMenuBarRoutes';
import DimensionsComp from "../dimensions/Dimensions";
import Alerts from "../alerts/Alerts";
import AlertMessage from "../alertMessages/AlertMessage";
import Threshold from "../thresholds/Threshold";
import Client from "../client/clients";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import CollectionsIcon from '@material-ui/icons/Collections';
import MessageIcon from '@material-ui/icons/Message';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import ForumIcon from '@material-ui/icons/Forum';
import GCPLogin from "../common/GCPLogin";
import Avatar from '@material-ui/core/Avatar';
import LoginDataService from "../../services/LoginDataService";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';



const drawerWidth = 240;


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const mainMenuList = [
    {
        link :["/clients"],
        linkToComp: Client,
        display: "Client",
        displayIcon: <AssignmentIcon/>
    },
    // // {
    // //     link :["/dimensions"],
    // //     linkToComp: DimensionsComp,
    // //     display: "Dimensions",
    // //     displayIcon:<CollectionsIcon/>
    // // },
  //   {
  //       link :["/projects"],
  //       linkToComp: Projects,
  //       display: "Projects",
  //       displayIcon: <AddAlertIcon/>
  //   },
  //   {
  //     link :["/coders"],
  //     linkToComp: Coders,
  //     display: "Coders",
  //     displayIcon: <ForumIcon/>
  // },
  //   {
  //     link :["/workflow/status","/showDetail/:projectId"],
  //     linkToComp: WorkflowStatus,
  //     display: "Workflow Status",
  //     displayIcon: <MessageIcon/>
  // }
]    
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 6px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function MainMenuBar() {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(true);
  const [isLoggedin, setIsLoggedin] = React.useState(window.sessionStorage.getItem("USER_LOGGED_IN"))
  const [avatarImg, setAvatarImg] = React.useState(window.sessionStorage.getItem("AVATAR_URL"))
  const [userName, setUserName] = React.useState(window.sessionStorage.getItem("USER_NAME"))
  const [alertOpen, setAlertOpen] = React.useState();
  const [alertMessage, setAlertMessage] = React.useState();
  const [alertType, setAlertType] = React.useState();
  const history = useHistory()
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
 const onLoginSuccess = (res) => {
  var profile = res.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  setUserName(profile.getName())
  window.sessionStorage.setItem("USER_NAME", profile.getName())
  console.log('Image URL: ' + profile.getImageUrl());
  setAvatarImg(profile.getImageUrl())
  window.sessionStorage.setItem("AVATAR_URL", profile.getImageUrl())
  console.log('Email: ' + profile.getEmail())
  serverLogin(profile.getEmail())
 }
 
 const serverLogin = (userEmail) => {
   console.log("SERVER LOG IN CALLED")
   let param = {
     email:userEmail
   }
   LoginDataService.get(param).then( (res) => {
     console.log("Server Login " + res.data.responseType)
     if(res.data.responseType == "Error") {
       setIsLoggedin(false)
       setAlertMessage("Valid Google User, but don't have access to use Alerting app")
       setAlertType("error")
       setAlertOpen(true)
       window.sessionStorage.setItem("USER_LOGGED_IN", false)
     } else {
       setIsLoggedin(true)
       window.sessionStorage.setItem("USER_LOGGED_IN", true)
       console.log("NEXT_PAGE_AFTER_LOGIN AFTER LOGIN" + window.sessionStorage.getItem("NEXT_PAGE_AFTER_LOGIN"))
       if(window.sessionStorage.getItem("NEXT_PAGE_AFTER_LOGIN")) {
         var next_page_after_login = window.sessionStorage.getItem("NEXT_PAGE_AFTER_LOGIN")
         console.log("next_page_after_login AFTER LOGIN" + next_page_after_login)
         window.sessionStorage.removeItem("NEXT_PAGE_AFTER_LOGIN")
         console.log("History set to " + next_page_after_login)
         history.push(next_page_after_login)
       }
     }
   }

   )
 }

 const onLoginFailure = (res) => {
  setIsLoggedin(false)
}
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
          <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            AI RiskAdjustment Workbench
          </Typography>
          <IconButton color="inherit">
            <Badge color="secondary">
            {!isLoggedin && <GCPLogin onLoginSuccess={onLoginSuccess}
              onLoginFailure={onLoginFailure}
            />}
            {isLoggedin && <Avatar alt={userName} src={avatarImg} className={classes.large} />}
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
           {isLoggedin && <MainMenuItems options={mainMenuList}/>}
        </List>
        <Divider />
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <MainMenuBarRoutes options= {mainMenuList}/>
          
        </Container>
      </main>
      <Snackbar anchorOriginTopCenter open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
