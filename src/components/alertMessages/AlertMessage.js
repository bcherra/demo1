import React, { forwardRef, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
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
import AlertEngineResultsService from '../../services/AlertEngineResultsService'
import { SettingsSystemDaydreamOutlined } from '@material-ui/icons';
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

    height: '800px'
  },
}));

const columnsRow = () => {
  return [
    { title: 'Id', field: 'id', hidden: true },
    { title: 'alertId', field: 'alertId', hidden: true },
    { title: 'Date', field: 'runDate' },
    { title: 'Message', field: 'messageSent' },
    { title: 'RunId', field: 'runId' }
  ];
}

const fetchData = () => {
  
  return AlertEngineResultsService.getAll({})
}

export default function AlertMessage(props) {
  const classes = useStyles();
  const columns = columnsRow();
  const initialData = { data: [] }
  let [data, setData] = useState(initialData)
  
  let [dataD, setDataD] = useState([]);
  let [columnsD, setColumnsD] = useState([]);
  let [showDetailedTable, setShowDetailedTable]  = useState(false);
  const history = useHistory()
  if(!window.sessionStorage.getItem("USER_LOGGED_IN")) {
    console.log("SET NEXT_PAGE_AFTER_LOGIN " + window.location.pathname)
      window.sessionStorage.setItem("NEXT_PAGE_AFTER_LOGIN", window.location.pathname)
      history.push("/")
  }
  
  const parseColumns = (d) => {
    
    let j = d[0];
    let columns = []
    let k
    for(k in j) {
      
      columns.push({title:k, field:k})
    }
    setColumnsD(columns)
  }
  const showDetails = (event, rowData) => {
    let options = {
      "id": rowData.id
    }
    AlertEngineResultsService.getResultRecords(options).then((res) => {
     
      parseColumns(res.data.responseData)
      
      setDataD(res.data.responseData)
      setShowDetailedTable(true)
    })
  }
  const showDetailsByRunIs = (rId) => {
    let options = {
      "runId": rId
    }
    AlertEngineResultsService.getResultRecordsByRunId(options).then((res) => {
      
      parseColumns(res.data.responseData)
      
      setDataD(res.data.responseData)
      setShowDetailedTable(true)
    })
  }

  useEffect(() => {
   
    fetchData().then(res => {
      setData(res.data.responseData)
    })
    if (props.match.params.runId) {
      showDetailsByRunIs(props.match.params.runId)
    }
  }, [])
  let detailTable = <MaterialTable
  icons={tableIcons}
  title="Messages Details"
  columns={columnsD}
  data={dataD}
  actions={[
    {
      icon: () => <Clear />,
      tooltip: 'Close Tab',
      isFreeAction: true,
      onClick: (event, rowData) => setShowDetailedTable(false)
    }
  ]}
/>
  let tbl = <br />
  if (data.length > 0) {
    tbl = <MaterialTable
      icons={tableIcons}
      title="Alert Messages Sent"
      columns={columns}
      data={data}
      actions={[
        {
          icon: () => <AddBox />,
          tooltip: 'Show Details',

          onClick: (event, rowData) => showDetails(event, rowData)
        }
      ]}
    />
  }
  return (
    <Container className={classes.container, classes.root} maxWidth="xl">
     
      <div>
      {showDetailedTable && detailTable}
      </div>

      {!showDetailedTable && tbl}
    </Container>
  )
}