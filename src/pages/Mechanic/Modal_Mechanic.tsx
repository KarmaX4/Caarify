// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { makeStyles } from '@mui/styles'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { Close } from 'mdi-material-ui'
import { Car3Plus, FormTextboxPassword } from 'mdi-material-ui'
import { useEffect, useState } from 'react'

const Modal_Mechanic = (props: any) => {
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState<string>('')
  const [phoneError, setPhoneError] = useState('')
  const [servicesError, setServicesError] = useState('')
  const [isValid, setIsvalid] = useState(true)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [services, setServices] = useState()

const router = useRouter();

  const nameHandler = (e: any) => {
    setName(e.target.value)
    if (e.target.value === '') {
      setNameError("Can't be empty")
    } else {
      setNameError('')
      return true
    }
  }
  const emailHandler = (e: any) => {
    setEmail(e.target.value)
    if (e.target.value === '') {
      setEmailError("Can't be empty")
    } else if (!e.target.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)) {
      setEmailError('not a valid email address')
    } else {
      setEmailError('')
      return true
    }
  }
  const phoneHandler = (e: any) => {
    setPhone(e.target.value)
    if (e.target.value === '') {
      setPhoneError("Can't be empty")
    } else if (e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, 10)
    } else if (e.target.value.length < 10) {
      setPhoneError('not a valid phone number')
    } else {
      setPhoneError('')
      return true
    }
  }
  const serviceHandler = (e: any) => {
    setServices(e.target.value)
    if (e.target.value === '') {
      setServicesError("Can't be empty")
    } else {
      setServicesError('')
    }
  }

  const addMech = {
    mechanicName: name, // More then 2 Alpha
    email: email,
    phone: phone, // Start with 6,7,8,9 and 10 Only
    service: services
  }
  
  
  const sumbitHandler = async (e: any) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    interface Headers {
      [key: string]: string
    }
    const response = await fetch('https://caarify-abhi.onrender.com/api/admin/add-mechanic', {
      method: 'POST',
      body: JSON.stringify(addMech),
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
      })
      props.onClose()
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
console.log(name,email,phone,services)

  //custom Css to hide num wheel
  const useStyles = makeStyles({
    input: {
      '& input[type=number]': {
        '-moz-appearance': 'textfield'
      },
      '& input[type=number]::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      },
      '& input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      }
    }
  })

  const classes = useStyles()
  return (
    <Card>
      <CardHeader title='ADD MECHANIC' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <ToastContainer />
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={nameError == '' ? false : true}
                onChange={nameHandler}
                helperText={nameError}
                value={name}
                label='Full Name'
                placeholder='Leonard Carter'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={emailError == '' ? false : true}
                onChange={emailHandler}
                type='email'
                label='Email'
                value={email}
                placeholder='carterleonard@gmail.com'
                helperText={emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={phoneError == '' ? false : true}
                onChange={phoneHandler}
                helperText={phoneError}
                type='number'
                className={classes.input}
                onWheel={(e: any) => {
                  e.target.blur()
                }}
                label='Phone No.'
                placeholder='+1-123-456-8790'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={servicesError == '' ? false : true}
                helperText={servicesError}
                onChange={serviceHandler}
                type='number'
                value={services}
                label='services'
                placeholder='Services'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  inputProps: { min: 0 },
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Car3Plus />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='space-between'>
              <Button
                sx={{
                  '&:hover': {
                    backgroundColor: '#49a3f1'
                  }
                }}
                type='submit'
                variant='contained'
                onClick={sumbitHandler}
                disabled={!(!nameError && !emailError && !phoneError && !servicesError)}
                size='large'
              >
                Submit
                {/* {console.log(isValid)} */}
              </Button>
              <Button type='submit' variant='contained' size='large' color='error' onClick={props.onClose}>
                Close
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Modal_Mechanic
