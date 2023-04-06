///* auth 
import { useRouter } from 'next/router'
import { getSession } from "next-auth/react"

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports

// ** Custom Components Imports

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import ServiceRequest_DataTable from './Datatable/Requests_Table'
import { useState } from 'react'

const Dashboard = () => {
  const router = useRouter()
  
  if (typeof window !== 'undefined') {
  const token =  localStorage.getItem('token');
  if( token === null ) {
    router.push('/pages/login')
  }
}
  

// const [auth,setauth] = useState();

// const loginHandler = (authState:any) => {
//        setauth(authState)
// }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12}>
          <ServiceRequest_DataTable />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
  }
  // export async function getServerSideProps(context:any){
  //   // const session =  await getSession(context)  
  //   if (typeof window !== 'undefined') {
  //       const token =  localStorage.getItem('token');
  //        console.log(token);
      
  //   // const token =  localStorage.getItem('token');
    
  //   if(!token){
  //     return{
  //       redirect:{
  //               destination: "./pages/login",
  //               permanent: false,
  //       },
  //     }
  //   }
  //     // return{
  //     //   props:{token}
  //     // }
  // } 
  // }

export default Dashboard
