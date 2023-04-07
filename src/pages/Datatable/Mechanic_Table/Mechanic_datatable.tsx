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
import { ElementType } from 'react'
import { ButtonProps } from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import Update_Modal_Mechanic from 'src/pages/Mechanic/Update_Modal_Mechanic'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    fetchRequestData()
  }, [])

  const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center'
    }
}))

const Update_Mechanic = () => {
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    return (
        <div>
            {/* <Button  component='label' variant='contained' onClick={handleOpen()}>
                + New Mechanic
            </Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DatePickerWrapper>
                    <Grid container spacing={6}
                        mt={10}
                        alignItems="center"
                        justifyContent="center">
                        <Grid item xs={6} md={6}>
                            <Update_Modal_Mechanic onClose={handleClose} />
                        </Grid>
                    </Grid>
                </DatePickerWrapper>
            </Modal>
        </div>
    );
}


  // --------------------TABLE HEADER -------------------------------------------------------------------



  const router = useRouter()
  const columns = [{
    label: 'Id', name: '_id',
    options: { "display": false, }
  },
  { label: 'Mechanic Name', name: 'mechanicName'},
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
            <IconButton aria-label="edit" color='primary'
              onClick={() => { setdData(tableMeta.rowData[0]),handleOpen()}}>
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
      <Update_Mechanic/>
      <ConfirmNotification/>
      <ToastContainer/>
      {/* <ThemeProvider theme={createTheme()}> */}
        <MUIDataTable title={'Mechanic Details'} data={mData} columns={columns} options ={{
    selectableRows: false 
  }as options}/>
      {/* </ThemeProvider> */}
    </CacheProvider>
  )
}

export default Mechanic_Datatable
