import React, { createRef, forwardRef, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
import MaterialTable from 'material-table'
import BasicAlertsDataService from '../../services/BasicAlertsDataService'
import ChannelsDataService from '../../services/ChannelsDataService'
import AlertEngineResultsService from '../../services/AlertEngineResultsService'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

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
const alKeyRef = createRef();
const alDescriptionRef = createRef();
const alSQLRef = createRef();
const alMessageRef = createRef();

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
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
  input1: {
    height: 50
  },
  input2: {
    height: 300
  },
  dialogPaper: {
       
    height : '800px'
},
formControl: {
  margin: theme.spacing(1),
  minWidth: 250,
},
}));

function AddAlertDialog(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const classes = useStyles();
  const [channelName, setChannelName] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const [channelsData, setChannelsData] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState("success");
  const [spinnerOpen, setSpinnerOpen] = useState(false);
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };
  const handleChange = (event) => {
    setChannelName(event.target.value);
  };

  const handleClose = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    fetchChannels().then(res => {
    setChannelsData(res.data.responseData)
    setOpenSelect(true);
  })};
  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleCancel = () => {
    setSpinnerOpen(false)
    onClose();
   
  };

  const handleSave = (e) => {
    e.preventDefault();
    if(e.target.elements.alKey.value.trim() == "") {
      return;
    }
    setSpinnerOpen(true)
    const al = {
      name: e.target.elements.alKey.value.trim(),
      description: e.target.elements.alDescription.value,
      sqlStatement: e.target.elements.alSql.value,
      message: e.target.elements.alMessage.value,
      channelName: channelName
    }
    addData(al).then((res) => {
      setSpinnerOpen(false)
      console.log("Alert Add Res " + res.data.responseType)
      if (res.data.responseType == "Error") {
        setAlertMessage(res.data.responseText)
        setAlertType("error")
        setAlertOpen(true)
      } else {
        
        onClose(e, al);
      }
    })
  };
  const handleAlertTest = (e) => {
    e.preventDefault();
    setSpinnerOpen(true)
    const al = {
      name: alKeyRef.current.value,
      description: alDescriptionRef.current.value,
      sqlStatement: alSQLRef.current.value,
      message: alMessageRef.current.value,
      channelName: channelName
    }
    onTest(al);
  };
  const onTest = (al) => {
    AlertEngineResultsService.testAlert(al).then(res => {
      setSpinnerOpen(false)
      //set res.data.responseData
      console.log(res.data.responseType) 
      setAlertMessage(res.data.responseData)
      if(res.data.responseType == "Error")
      {
        setAlertMessage(res.data.responseText)
        setAlertType("error")
      } else {
        setAlertType("success")
      }
      setAlertOpen(true);
     
    }, err => {
      console.log("ERROR " + err)
      setSpinnerOpen(false)
      setAlertType("error")
      setAlertMessage("" + err)
      setAlertOpen(true);

    })
  }
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      classes={{ paper : classes.dialogPaper}}
      maxWidth="xl"
      open={open}
      {...other}
    >
    <form onSubmit={handleSave}>
      <DialogContent dividers>
        <TextField label="Alert Key" id="alKey" name="alKey" inputRef={alKeyRef} variant="outlined" />
        <TextField multiline fullWidth label="Description" id="alDescription" inputRef={alDescriptionRef} name="alDescription" variant="outlined" />
        <TextField
          fullWidth
          InputProps={{ classes: { input: classes.input2 } }}
          multiline
          label="SQL Statement"
          name="alSql"
          id="alSql"
          inputRef={alSQLRef}
          variant="outlined"
        />
        <TextField
          fullWidth
          InputProps={{ classes: { input: classes.input2 } }}
          multiline
          label="Message"
          name="alMessage"
          id="alMessage"
          inputRef={alMessageRef}
          variant="outlined"
        />
         <FormControl className={classes.formControl}>
        <InputLabel id="open-select-label">Message Channel</InputLabel>
        <Select
          labelId="open-select-label"
          id="open-select"
          open={openSelect}
          onClose={handleClose}
          onOpen={handleOpen}
          value={channelName}
          onChange={handleChange}
        >
          
          {channelsData.map((el, index) => {
            return <MenuItem key={index} value={el.name}>{el.name}</MenuItem>
          })}
         
        </Select>
      </FormControl>
      </DialogContent>
      <DialogActions>
      {spinnerOpen && <Container open={spinnerOpen}  >
        <div className={classes.spinner}>

          <CircularProgress color="secondary" />
        </div>
      </Container>}
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAlertTest} className={classes.submit} color="primary">
          Test
        </Button>
        <Button type="submit"  color="primary" className={classes.submit}>
          Add
        </Button>
      </DialogActions>
    </form>
    </Dialog>
  );
}

const columnsRow = () => {
  return [
    { title: 'Name', field: 'name', editable: 'onAdd' },
    { title: 'Description', field: 'description' },
    { title: 'SQL', field: 'sqlStatement' , editable: 'onAdd'},
    { title: 'Message', field: 'message' },
    { title: 'Channel', field: 'channelName' },
    { title: 'Id', field: 'id', }
  ];
}

const addData = ((th) => {

  return BasicAlertsDataService.add(th)
});

const fetchData = () => {
  return BasicAlertsDataService.getAll({})

}
const fetchChannels = () => {
  return ChannelsDataService.getAll({});
}

const updateData = (id, th) => {
  return BasicAlertsDataService.update(id, th)
}
const deleteData = (id) => {
   return BasicAlertsDataService.delete(id)
}

export default function BasicAlert(props) {

  const classes = useStyles();
  const columns = columnsRow();
  const initialData = { data: [] }
  let [data, setData] = useState(initialData)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
 
  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (e,newValue) => {
    setOpen(false);
    
    // if (newValue) {
    //   onAddHandler(newValue);
    // }
    clearForm(e)
    refreshData()
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const th = {
      name: e.target.elements.alKey.value,
      description: e.target.elements.alDescription.value,
      sqlStatement: e.target.elements.alSql.value
    }
    addData(th).then(() => {
      console.log("Refreshed before LENGTH " + data.length)
      refreshData()
      clearForm(e)
    })
  }
  const onAddHandler = (rowData) => {

    addData(rowData).then(() => {
      console.log("Refreshed before LENGTH " + data.length)
      refreshData()
      //clearForm(e)
    })
  }
  const refreshData = () => {
    console.log("Refreshing Data")
    fetchData().then(res => {
      setData(res.data.responseData)
    }
    )
  }
  const clearForm = (e) => {
    if(e) {
      e.target.elements.alKey.value = '';
      e.target.elements.alDescription.value = '';
      e.target.elements.alSql.value = '';
      e.target.elements.alMessage.value = '';
    }
  }
  const onDeleteHandler = (oldDataid) => {
    console.log("Alerts onDeleHandler " + oldDataid)
    return deleteData(oldDataid)
  }
  const onUpdateHandler = (newData) => {
    return updateData(newData.id, newData)
  }
  useEffect(() => {
    fetchData().then(res => {
      console.log(res.data.responseData)
      setData(res.data.responseData)
    }
    )
  }, [])
  let tbl = <br />
  if (data.length > 0) {
    tbl = <MaterialTable
      icons={tableIcons}
      title="Active Alerts"
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
    <Container className={classes.container, classes.root} maxWidth="xl">
    
        <Button
          type="submit"
          onClick={handleClickListItem}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          New Alert
        </Button>
        <AddAlertDialog
          classes={{
            paper: classes.paper,
          }}
          id="add-alert"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      {tbl}
    </Container>
  )
}