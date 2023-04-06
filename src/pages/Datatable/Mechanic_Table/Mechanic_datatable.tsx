import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
// import ConfirmNotification from './comfirmModal'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";

const muiCache = createCache({
  key: 'mui-datatables',
  prepend: true
})

function Mechanic_Datatable() {
  const [mData, setMData] = useState([])
  const [dData, setdData] = useState()
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchRequestData()
  }, [])

  // --------------------TABLE HEADER -------------------------------------------------------------------



  const router = useRouter()
  const columns = [{
    label: 'Id', name: '_id',
    options: { "display": false, }
  },
  { label: 'Mechanic Name', name: 'mechanicName' },
  { label: 'E-Mail', name: 'email' },
  { label: 'Phone Number ', name: 'phone' },
  { label: 'Services', name: 'service' },
  {
    label: 'Actions',
    name: "",
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
        return (
          <>
            <IconButton aria-label="edit" color='secondary'
              onClick={() => { setdData(tableMeta.rowData[0]) }}>
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" color='error'
              onClick={() => { setdData(tableMeta.rowData[0]),setIsOpen(true) }}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      }
    }
  }
  ]

  const ConfirmNotification = () => {
    // const [isOpen, setIsOpen] = useState(false); //NEW STATE INTRODUCED
    return (
      <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
        <DialogTitle>
          {" "}
          <Typography variant="h4">Delete</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Are you sure you want to delete this Mechanic?
          </Typography>
          <Typography variant="subtitle2">
            You can't undo this operation
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={()=>{setIsOpen(false)}}>No</Button>
          <Button variant="contained" color="error" onClick={deleteMech} >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };


  // fetching mech data -----------------------------------

  const fetchRequestData = async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      // const router = useRouter()
      interface Headers {
        [key: string]: string
      }
      // console.log(token)
      const response = await fetch('https://caarify-abhi.onrender.com/api/admin/get-mechanic', {
        method: 'GET',
        headers: {
          Authorization: token
        } as Headers
      })
      if (response.status !== 200) {
        router.push('/pages/login/')
      }
      const data = await response.json()
      const sdata = data.data.mechanicsDetails
      setMData(sdata)
    }
  }


  // api to dalete mech data ------------------------------------------------------------

  const deleteMech = async () => {
    interface Headers {
      [key: string]: string
    }
    // e.preventDefault()
    const token = localStorage.getItem("token")
    const deletedata = {
      formName: "mechanic",
      id: dData
    }
    const response = await fetch('https://caarify-abhi.onrender.com/api/admin/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      } as Headers,
      body: JSON.stringify(deletedata)
    })
    
    if (response.status === 200) {
      toast.success('Successfully Deleted')
      setIsOpen(false)
      fetchRequestData()

    }
  }
  interface options {
    [key: string]: any
  }
  return (
    <CacheProvider value={muiCache}>
      <ConfirmNotification/>
      <ToastContainer/>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable title={'Mechanic Details'} data={mData} columns={columns} options ={{
    selectableRows: false 
  }as options}/>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default Mechanic_Datatable
