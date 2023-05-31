import { Component } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class MainMenuItems extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        return (this.props.options.map((option, index) => {
            
            return (
                <ListItem button key={index} component='a' href={option.link[0]}>
                    <ListItemIcon>
                        {option.displayIcon}
                    </ListItemIcon>
                    <ListItemText primary={option.display} />
                
                </ListItem>

            )
        }));
    }
}

export default MainMenuItems;