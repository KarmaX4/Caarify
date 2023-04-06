// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import MUI_Datatable from '../Datatable/MUI_Datatable'

const DataTable = () => {

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <MUI_Datatable />
                </Card>
            </Grid>
        </Grid>
    );

}

export default DataTable;