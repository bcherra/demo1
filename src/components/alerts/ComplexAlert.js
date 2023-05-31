import React, { forwardRef, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: '100%',
    },
    containert: {
        maxHeight: 440,
    },
}));
const columnsRow = () => {
    return [
        { title: 'Name', field: 'name' },
        { field: 'description', title: 'Description' },
        { field: 'value', title: 'Value' },
    ];
}
export default function ComplexAlert(props) {
    const classes = useStyles();
    const columns = columnsRow();

    return (
        <Container className={classes.container}>
            <span>THIS FEATURE IS UNDER CONSTRUCTION</span>
            <span><br></br></span>
            <CircularProgress color="secondary" />
        </Container>
    )
}