// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// ** Icons Imports

// ** Demo Tabs Imports

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import Mechanic_Details from './Mechanic_Details'



const AccountSettings = () => {
  const router = useRouter()
  
  if (typeof window !== 'undefined') {
  const token =  localStorage.getItem('token');
  if( token === null ){
    router.push('/pages/login')
  }
}
  // ** State
  const [value, setValue] = useState<string>('account')


  return (
    <Card>
      <TabContext value={value}>
        <TabPanel sx={{ p: 0 }} value='account'>
          <Mechanic_Details />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings
