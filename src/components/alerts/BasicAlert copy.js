import React, { forwardRef, useEffect, useState} from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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
        height: 100
      }
}));

const columnsRow = () => {
    return [
        {title: 'Id', field: 'id', hidden:'true'},
        { title: 'Name', field: 'name', editable: 'onAdd' },
        { title: 'Description', field: 'description'},
        { title: 'SQL', field: 'sqlStatement'}
    ];
}

const addData = ((th) => {

    return BasicAlertsDataService.add(th)
  });
  
  const fetchData = () => {
    console.log("Fetching Alerts")
    return BasicAlertsDataService.getAll({})
  
  }
  const updateData = (id, th) => {
    console.log("Updating Alerts")
    return BasicAlertsDataService.update(id, th)
  
  }
  const deleteData = (id) => {
    console.log("Updating Alerts")
    return BasicAlertsDataService.delete(id)
  }


export default function BasicAlert(props) {
    
    const classes = useStyles();
    const columns = columnsRow();
    const initialData = { data: [] }
    let [data, setData] = useState(initialData)
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
           // clearForm(e)
          })
    }
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
        e.target.elements.alKey.value = '';
        e.target.elements.alDescription.value = '';
        e.target.elements.alSql.value = '';
    
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
      title="Alerts List"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                /* setData([...data, newData]); */
                onAddHandler(newData)
                resolve();
            }, 1000);
        }),
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
        <Container className={classes.container, classes.root} maxWidth="xl">
        <Container className={classes.container} maxWidth="sm">
          <form onSubmit={onSubmitHandler}>
           
                  <TextField   label="Alert Key" id="alKey" name="alKey" variant="outlined" />
                  <TextField multiline fullWidth label="Description" id="alDescription" name="alDescription" variant="outlined" />
                  <TextField
                    fullWidth
                    
                    InputProps={{ classes: { input: classes.input2 } }}
                    multiline
                    
                    label="SQL Statement"
                    name="alSql"
                    id="alSql"
                    variant="outlined"
                  />
                     <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Add
                  </Button>
              
  
          </form>
        </Container>
        <Container className={classes.container} maxWidth="xl">
          {tbl}
        </Container>
      </Container>
    )
}