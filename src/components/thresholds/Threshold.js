import { render } from '@testing-library/react'
import React, { forwardRef, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import ThresholdDataService from '../../services/ThresholdDataService'
import MaterialTable from 'material-table'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
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
  spinner: 'flex',
  '& > * + *': {
    marginLeft: theme.spacing(2),
  },
}));

function AddThresholdDialog(props) {
  const { onClose, value: valueProp, open, al, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const [alertOpen, setAlertOpen] = useState(props.al.openAl);
  const [alertMessage, setAlertMessage] = useState(props.al.msgAl);
  const [alertType, setAlertType] = useState(props.al.msgTypeAl);
  const [spinnerOpen, setSpinnerOpen] = useState(false);
  const classes = useStyles();

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleCancel = () => {
    onClose();
  };

  const handleSave = (e) => {
    e.preventDefault();
    if(e.target.elements.thKey.value.trim() == "") {
      return
    }
    setSpinnerOpen(true)

    const th = {
      name: e.target.elements.thKey.value.trim(),
      description: e.target.elements.thDescription.value,
      value: e.target.elements.thValue.value
    }
    addData(th).then((res) => {
      setSpinnerOpen(false)
      console.log("Threshold Add Res " + res.data.responseType)
      if (res.data.responseType == "Error") {
        setAlertMessage(res.data.responseText)
        setAlertType("error")
        setAlertOpen(true)

      } else {
        onClose(e, th);
      }
    })

  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xl"
      open={open}
      {...other}
    >
      <Snackbar anchorOriginTopCenter open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>

      {spinnerOpen && <Container open={spinnerOpen}  >
        <div className={classes.spinner}>

          <CircularProgress color="secondary" />
        </div>
      </Container>}
      <form onSubmit={handleSave}>
        <DialogContent dividers>
          <TextField label="Threshold Key" id="thKey" name="thKey" variant="outlined" />
          <TextField multiline fullWidth label="Description" id="thDescription" name="thDescription" variant="outlined" />

          <TextField
            fullWidth
            label="Value"
            name="thValue"
            id="thValue"
            variant="outlined"
          />

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            Cancel
        </Button>
          <Button type="submit" color="primary" className={classes.submit}>
            Add
        </Button>


        </DialogActions>
      </form>
    </Dialog>
  );
}
const addData = ((th) => {
  return ThresholdDataService.add(th)
});

const fetchData = () => {
  console.log("Fetching Thresholds")
  return ThresholdDataService.getAll({})

}
const updateData = (id, th) => {
  console.log("Updating Threshold")
  return ThresholdDataService.update(id, th)
}
const deleteData = (id) => {
  console.log("Updating Threshold")
  return ThresholdDataService.delete(id)
}
const columnsRow = () => {
  return [
    { title: 'Id', field: 'id', hidden: 'true' },
    { title: 'Name', field: 'name', editable: 'never' },
    { title: 'Description', field: 'description' },
    { title: 'Value', field: 'value' },
  ];
}

export default function Threshold(props) {
  const classes = useStyles();
  const columns = columnsRow();
  const history = useHistory()
  if(!window.sessionStorage.getItem("USER_LOGGED_IN")) {
      history.push("/")
  }
  const initialData = { data: [] }
  let [data, setData] = useState(initialData)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const alertInfo = {
    openAl: false,
    msgAl: "",
    msgTypeAl: "success"
  }
  const handleClickListItem = () => {
    setOpen(true);
  };
  const handleClose = (e, newValue) => {
    setOpen(false);

    // if (newValue) {
    //   onAddHandler(newValue);
    // }
    clearForm(e)
    refreshData()
  };
  const refreshData = () => {
    fetchData().then(res => {
      setData(res.data.responseData)
    }
    )

  }


  const clearForm = (e) => {
    if (e) {
      try {
        e.target.elements.thKey.value = '';
        e.target.elements.thDescription.value = '';
        e.target.elements.thValue.value = '';
      } catch (er) { }
    }

  }
  const onAddHandler = (th) => {

    addData(th).then((res) => {
      console.log("Threshold Add Res " + res.data.responseType)
      if (res.data.responseType == "Error") {
        alertInfo.openAl = true
        alertInfo.msgAl = res.data.responseData
        alertInfo.msgType = "error"
        setOpen(true);
      } else {
        refreshData()
      }
      //clearForm(e)
    }
    )

  }
  const onDeleteHandler = (oldDataid) => {
    return deleteData(oldDataid)

  }
  const onUpdateHandler = (newData) => {
    return updateData(newData.id, newData)
  }
  useEffect(() => {
    fetchData().then(res => {
      setData(res.data.responseData)
    }
    )
  }, [])
  let tbl = <br />
  if (data.length > 0) {
    tbl = <MaterialTable
      icons={tableIcons}
      title="Thresholds List"
      columns={columns}
      data={data}
      editable={{

        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;

              onUpdateHandler(newData).then(setData([...dataUpdate]))
              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              onDeleteHandler(oldData.id).then(setData([...dataDelete])
              )

              resolve()
            }, 1000)
          }),
      }}
    />
  }
  return (
    <Container maxWidth="xl">

      <Button
        onClick={handleClickListItem}
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        New Threshold
        </Button>
      <AddThresholdDialog
        classes={{
          paper: classes.paper,
        }}
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
        al={alertInfo}
      />


      {tbl}

    </Container>
  )


}
