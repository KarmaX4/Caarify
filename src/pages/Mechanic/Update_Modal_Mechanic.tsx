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
import Modal from '@mui/material/Modal';


// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { Close } from 'mdi-material-ui'
import { Car3Plus, FormTextboxPassword } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import { log } from 'console'

const Update_Modal_Mechanic = (props: any) => {
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState<string>('')
  const [phoneError, setPhoneError] = useState('')
  const [servicesError, setServicesError] = useState('')
  const [isValid, setIsvalid] = useState(true)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [services, setServices] = useState()
  const [mData, setMData] = useState([])
  const [mname, setmname] = useState()
  const [mphone, setmphone] = useState()
  const [mservice, setmservice] = useState()


  useEffect(() => {
    fetchRequestData()
  }, [])

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
  // const emailHandler = (e: any) => {
  //   setEmail(e.target.value)
  //   if (e.target.value === '') {
  //     setEmailError("Can't be empty")
  //   } else if (!e.target.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)) {
  //     setEmailError('not a valid email address')
  //   } else {
  //     setEmailError('')
  //     return true
  //   }
  // }
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

  //=============================input field api========================================
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
      const sdata = data.data
      const fdata = sdata.mechanicsDetails
      setMData(fdata)

      const mid = localStorage.getItem('id')
      const filteredResult = fdata.find((e: any) => e._id == mid);
      const mname = filteredResult.mechanicName
      const mphone = filteredResult.phone
      const mservice = filteredResult.service
      setmservice(mservice)
      setmphone(mphone)
      setmname(mname)
      setMData(filteredResult)
    }
  }


  //----------------------------------update Api------------------------------------------
  const mid = localStorage.getItem('id')
  const upadteMech = {
    formName: "mechanic",
    id: mid,
    mechanicName: name,
    phone: phone,
    service: services
  }
  const sumbitHandler = async (e: any) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    interface Headers {
      [key: string]: string
    }
    const response = await fetch('https://caarify-abhi.onrender.com/api/admin/update', {
      method: 'POST',
      body: JSON.stringify(upadteMech),
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: token
      } as Headers
    })

    const response_data = await response.json()
    console.log(response_data)
    if (response.status === 200) {
      toast.success('Updated Sucessfully!', {
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
  // console.log(name, email, phone, services)

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
      <CardHeader title='UPDATE MECHANIC' titleTypographyProps={{ variant: 'h6' }} />
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
                placeholder={mname}
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
                error={phoneError == '' ? false : true}
                onChange={phoneHandler}
                helperText={phoneError}
                type='number'
                className={classes.input}
                onWheel={(e: any) => {
                  e.target.blur()
                }}
                label='Phone No.'
                value={phone}
                placeholder={mphone}
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
                placeholder={mservice}
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
              <Button type='submit' variant='contained' size='large' color='error' onClick={props.onClose}>
                Close
              </Button>
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
                Update
                {/* {console.log(isValid)} */}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Update_Modal_Mechanic
