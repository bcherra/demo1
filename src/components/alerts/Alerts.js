import { React, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BasicAlert from './BasicAlert';
import ComplexAlert from './ComplexAlert'
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    casecontrol: {
        texttransform: 'none'
    }
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const history = useHistory()
    if(!window.sessionStorage.getItem("USER_LOGGED_IN")) {
        history.push("/")
    }
    return (
        <Container maxWidth="xl">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Basic SQL Based Alert" {...a11yProps(0)} style={{ textTransform: 'none' }} />
                <Tab label="Dimensions & Matrics Based Alert" {...a11yProps(1)} style={{ textTransform: 'none' }} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <BasicAlert />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ComplexAlert />
            </TabPanel>

        </Container>
    );
}
