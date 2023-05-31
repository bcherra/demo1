
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
    { title: 'Id', field: 'id', editable: 'never' },
    { title: 'Name', field: 'name', editable: 'never' },
    { field: 'description', title: 'Description' },
    { field: 'value', title: 'Value' },
  ];
}

export default function Threshold(props) {
  const classes = useStyles();
  const columns = columnsRow();

  const initialData = { data: [] }
  let [data, setData] = useState(initialData)


  const refreshData = () => {
    console.log("Refreshing Data")
    fetchData().then(res => {
      console.log(res.data.responseData)
      console.log("Refreshed LENGTH " + res.data.responseData.length)
      setData(res.data.responseData)
    }
    )

  }
  const clearForm = (e) => {
    e.target.elements.thKey.value = '';
    e.target.elements.thDescription.value = '';
    e.target.elements.thValue.value = '';

  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const th = {
      name: e.target.elements.thKey.value,
      description: e.target.elements.thDescription.value,
      value: e.target.elements.thValue.value
    }
    addData(th).then(() => {
      console.log("Refreshed before LENGTH " + data.length)
      refreshData()
      clearForm(e)
    }
    )

  }
  const onDeleteHandler = (oldDataid) => {
    console.log("Threshold onDeleHandler " + oldDataid)
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
              onDeleteHandler(oldData.id).then( setData([...dataDelete])
              )
             
              resolve()
            }, 1000)
          }),
      }}
    />
  }
  return (
    <Container className={classes.container} maxWidth="md">
      <Container className={classes.container} maxWidth="sm">
        <form onSubmit={onSubmitHandler}>
          <Grid container spacing={3}>
            <Grid item xl={5}>
              <Grid item xl={5}>
                <TextField fullWidth label="Threshold Key" id="thKey" name="thKey" variant="outlined" />
              </Grid> <br />
              <Grid item xl={5}>
                <TextField multiline fullWidth label="Description" id="thDescription" name="thDescription" variant="outlined" />
              </Grid><br />
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Value"
                  name="thValue"
                  id="thValue"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={5}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add
                </Button>
              </Grid>

            </Grid>

          </Grid>
        </form>
      </Container>
      <Grid>
        {tbl}
      </Grid>
    </Container>
  )


}