import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import 'firebase/firestore'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import db from './Firebase_Config'
import { useRouter } from 'next/router'

const muiCache = createCache({
  key: 'mui-datatables',
  prepend: true
})

function Requests_Datatable() {
  const [loadedRequest, setLoadedRequest] = useState([])
  const [bookings, setBookings] = useState<string[] | any[]>([])
  const [items, setItems] = useState<string[] | any[]>([])
  const [fData, setnFData] = useState<any[]>([])

  const router = useRouter()
  const columns= [
    // { label: 'ID', name: '_id' },
    { label: 'Car_Name', name: 'carName' },
    { label: 'Customer_Name', name: 'custName' },
    { label: 'Service_Type', name: 'serviceType' },
    { label: 'Status', name: 'status' }
  ]
  

  let sdata: any
  const data = [fData]
  useEffect(() => {
    fetchRequestData()
    // fetchItems()
  }, [])

  

  const fetchRequestData = async () => {

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')

      interface Headers {
        [key: string]: string
      }
      // console.log(token)
      const response = await fetch('https://caarify-abhi.onrender.com/api/getAll', {
        method: 'GET',
        headers: {
         
          Authorization: token
        } as Headers
      })
      if(response.status !== 200) {
        router.push('/pages/login/')
      }
      const data = await response.json()
      sdata = data.data.serviceDetails
      setnFData(sdata)
    }
  }
  interface options {
    [key: string]: any
  }
  return (
    <CacheProvider value={muiCache}>
      {/* <ThemeProvider theme={createTheme()}> */}
      <MUIDataTable title={'Sevice Rquests'} data={fData} columns={columns} options ={{
    selectableRows: false 
  }as options} />
      {/* </ThemeProvider> */}
    </CacheProvider>
  )
}

export default Requests_Datatable
