// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Requests_Datatable from './Requests_Datatable';

const ServiceRequest_DataTable = () => {

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <Requests_Datatable />
                </Card>
            </Grid>
        </Grid>
    );

}

export default ServiceRequest_DataTable;