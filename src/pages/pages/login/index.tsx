// ** React Imports
import { ChangeEvent, FormEvent, MouseEvent, ReactNode, useState } from 'react'
import nextSession from 'next-session'
// import { useForm, SubmitHandler } from "react-hook-form";

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
//toastify Import
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReactSession } from 'react-client-session'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { margin } from '@mui/system'
// import { request } from 'http'

// for showing and hiding passwords
interface State {
  password: string
  showPassword: boolean
}

// for input validations
interface IFormInput {
  Username: string
  InputPassword: string
  preventDefault(): void
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<any>(false)
  // state for input username and password
  const [enteredUname, setEnteredUname] = useState<string>('')
  const [enteredPassword, setEnteredPassword] = useState<string>('')
  const [inputUsername, setInputUsername] = useState<string>('')
  const [inputPassword, setInputPassword] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(true)
  // const [auth, setAuth] = useState<boolean>(false)
  // const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();

  // credentials for login
  const credential = [
    { uname: 'React@tms.com', pass: '12345' },
  ]

  // ** Hook
  const theme = useTheme()
  const router = useRouter()


  const UnameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length > 0) {
      setIsValid(true)
    }
    setInputUsername(e.target.value)
    console.log(inputUsername)
  }

  const PassChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length > 0) {
      setIsValid(true)
    }
    setInputPassword(e.target.value)
    console.log(inputPassword)
  }

  // Login handler
  const loginHandler = async (e: FormEvent) => {
    e.preventDefault()

    const loginUser = {
      email: inputUsername,
      password: inputPassword
    }
    const response = await fetch('https://caarify-abhi.onrender.com/api/admin/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginUser)
    })
    const data = await response.json()
    const token = data.data.token

    if (response.status === 200) {
      toast.success('Successfully Logged IN!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      localStorage.setItem('token', token)
      router.push('/')
    } else {
      toast.error('Invalid Credintials', {
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

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          </Box>
          <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
             Welcome to <img style={{ marginBottom: "-7px" }} height="29px" width='29px' alt='icon' src='/images/favicon.png'></img>aarify!
            </Typography>
            <Typography variant='body2'>Please sign-in to your account.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={loginHandler}>
            <TextField
              autoFocus
              fullWidth
              id='username'
              value={inputUsername}
              label='Username'
              sx={{ marginBottom: 4 }}
              onChange={UnameChangeHandler}
            />

            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={inputPassword}
                id='auth-login-password'
                onChange={PassChangeHandler}
                type={values === true ? "text" : "password"}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      aria-label='toggle password visibility'
                      onClick={() => { if (values == true) { setValues(false) } else { setValues(true) } }}
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                    <ToastContainer limit={1} />
                  </InputAdornment>
                }
              />
            </FormControl>
            {/* <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box> */}
            <Button
              type='submit'
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 5, marginTop: 7 }}
            // onClick={() => router.push('/')}
            >
              Login
            </Button>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box> */}
            <Divider sx={{ my: 1 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
