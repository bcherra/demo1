
import { render } from '@testing-library/react'
import React, { forwardRef, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import  ChannelsDataService from '../../services/ChannelsDataService'
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
import { useHistory } from 'react-router-dom';
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
}));
function AddChannelDialog(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const classes = useStyles();
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
    if(e.target.elements.chKey.value.trim() == "") {
      return
    }
    const ch = {
      name: e.target.elements.chKey.value.trim(),
      description: e.target.elements.chDescription.value,
      channelUrl: e.target.elements.chUrl.value
    }
    onClose(e, ch);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xl"
      open={open}
      {...other}
    >
      <form onSubmit={handleSave}>
        <DialogContent dividers>
        <TextField  label="Channel Key" id="chKey" name="chKey" variant="outlined" />
        <TextField multiline fullWidth label="Description" id="chDescription" name="chDescription" variant="outlined" />
        
        <TextField
                  fullWidth
                  label="Teams URL"
                  name="chUrl"
                  id="chUrl"
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
const addData = ((ch) => {
  return ChannelsDataService.add(ch)
});

const fetchData = () => {
  
  return ChannelsDataService.getAll({})

}
const updateData = (id, th) => {
  
  return ChannelsDataService.update(id, th)
}
const deleteData = (id) => {
  return ChannelsDataService.delete(id)
}
const columnsRow = () => {
  return [
    { title: 'Id', field: 'id', hidden: 'true' },
    { title: 'Name', field: 'name', editable: 'never' },
    { title: 'Description', field: 'description' },
    { title: 'Url', field: 'channelUrl' },
  ];
}

export default function Channels(props) {
  const classes = useStyles();
  const columns = columnsRow();

  const initialData = { data: [] }
  const history = useHistory()
  if(!window.sessionStorage.getItem("USER_LOGGED_IN")) {
      history.push("/")
  }
  let [data, setData] = useState(initialData)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const handleClickListItem = () => {
    setOpen(true);
  };
  const handleClose = (e, newValue) => {
    setOpen(false);

    if (newValue) {
      onAddHandler(newValue);
    }
    clearForm(e)
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
      e.target.elements.chKey.value = '';
      e.target.elements.chDescription.value = '';
      e.target.elements.chUrl.value = '';
      } catch(er) {}
    }

  }
  const onAddHandler = (ch) => {

    addData(ch).then(() => {
      refreshData()
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
      title="Channels List"
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
          New Channel
        </Button>
        <AddChannelDialog
          classes={{
            paper: classes.paper,
          }}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        /> 
     
     
        {tbl}
     
    </Container>
  )


}