import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useState } from 'react'
import { SyntheticEvent } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import db from './Firebase_Config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

const Demo_Post_Request = () => {
  const [date, setDate] = useState('')
  const [custName, setCustName] = useState('')
  const [carName, setCarName] = useState('')
  const [carType, setCarType] = useState('')
  const [carNumber, setCarNumber] = useState('')
  const [carModel, setCarModel] = useState('')
  const [additionalSevice, setAdditionalService] = useState('')
  const [Actions, setActions] = useState('')
  const [Emergency, setEmergency] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [status, setStatus] = useState('')
  const [totalPrice, setTotalPrice] = useState('')

  const bookRequests = {
    date: date,
    custName: custName,
    carName: carName,
    carType: carType,
    carNumber: carNumber,
    carModel: carModel,
    additionalService: additionalSevice,
    actions: Actions,
    emergencyType: Emergency,
    fuelType: fuelType,
    serviceType: serviceType,
    status: status,
    totalPrice: totalPrice
  }
  const router = useRouter()
  // Sending data to realtime database
  const addBookingRequest = async (e: SyntheticEvent) => {
    e.preventDefault()
const token = localStorage.getItem('token')
interface Headers {
  [key: string]: string
}
    const response = await fetch('https://caarify-abhi.onrender.com/api/add-service ', {
      method: 'POST',
      body: JSON.stringify(bookRequests),
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: token
      } as Headers
    })

    const response_data = await response.json()
    console.log(response_data)
    if (response.status === 200) {
      toast.success('Registered Sucessfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      }),
        router.push('/')
    } else {
      toast.error('Invalid Details', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
  }

  // Sending data to firestore
  // const addDataCollection = async (e: SyntheticEvent) => {
  //     e.preventDefault();

  //     const docRef = await addDoc(collection(db, "Requests"), {
  //         Date: date,
  //         Customer_Name: custName,
  //         Car_Name: carName,
  //         Car_Type: carType,
  //         Car_Number: carNumber,
  //         Car_Model: carModel,
  //         Additional_Service: additionalSevice,
  //         Actions: Actions,
  //         Emergency_type: Emergency,
  //         Fuel_type: fuelType,
  //         Service_Type: serviceType,
  //         Status: status,
  //         Total_Price: totalPrice
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  // }

  return (
    <Card>
      <CardHeader title='Service Request' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={addBookingRequest}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField fullWidth type='date' onChange={e => setDate(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Customer Name' onChange={e => setCustName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Car Name' onChange={e => setCarName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Car Type' onChange={e => setCarType(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Car Number' onChange={e => setCarNumber(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Car Model' onChange={e => setCarModel(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Additional Service' onChange={e => setAdditionalService(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Actions' onChange={e => setActions(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Emergency Type' onChange={e => setEmergency(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Fuel Type' onChange={e => setFuelType(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Service Type' onChange={e => setServiceType(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Status' onChange={e => setStatus(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Total Price' onChange={e => setTotalPrice(e.target.value)} />
            </Grid>
            <ToastContainer />
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  Send Request!
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Demo_Post_Request
