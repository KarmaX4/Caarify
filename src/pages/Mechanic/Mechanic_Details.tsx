// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import Add_Mechanic from './Add_Mechanic'
import DataTable from '../Datatable'
import Mechanic_Datatable from '../Datatable/Mechanic_Table/Mechanic_datatable'

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center'
    }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    marginLeft: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
        textAlign: 'center',
        marginTop: theme.spacing(4)
    }
}))

const Mechanic_Details = () => {
    // ** State
    const [openAlert, setOpenAlert] = useState<boolean>(true)
    const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

    const onChange = (file: ChangeEvent) => {
        const reader = new FileReader()
        const { files } = file.target as HTMLInputElement
        if (files && files.length !== 0) {
            reader.onload = () => setImgSrc(reader.result as string)

            reader.readAsDataURL(files[0])
        }
    }

    return (
        <CardContent>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box>

                                {/* Add Mechanic Modal */}
                                <Add_Mechanic />

                            </Box>
                        </Box>
                        <Grid item xs={12} mt={5}>
                            {/* <TableStickyHeader /> */}
                            <Mechanic_Datatable />
                        </Grid>

                    </Grid>
                </Grid>
            </form>
        </CardContent>
    )
}

export default Mechanic_Details
