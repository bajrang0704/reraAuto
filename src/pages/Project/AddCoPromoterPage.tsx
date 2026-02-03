import { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface CoPromoterFormValues {
    // Top Section
    projectName: string;

    // Promoter Details
    promoterName: string;
    promoterType: string;

    // Address
    blockNumber: string;
    buildingName: string;
    streetName: string;
    locality: string;
    landmark: string;
    state: string;
    district: string;
    mandal: string;
    village: string;
    pincode: string;

    // Contact Details
    contactPersonName: string;
    contactPersonDesignation: string;
    mobileNumber: string;
    officeNumber: string;
    faxNumber: string;
    emailId: string;

    // Agreement Type
    agreementType: string;
}

const AddCoPromoterPage = () => {
    const [coPromoters, setCoPromoters] = useState<any[]>([]);

    const { register, control, handleSubmit, reset } = useForm<CoPromoterFormValues>({
        defaultValues: {
            projectName: 'SAMPLE',
            promoterName: '',
            promoterType: '',
            state: 'Telangana',
            district: '',
            mandal: '',
            village: '',
            agreementType: 'revenue_share',
            // ... other defaults
        }
    });

    const onSubmit = (data: CoPromoterFormValues) => {
        const newPromoter = {
            id: Date.now(),
            ...data
        };
        setCoPromoters([...coPromoters, newPromoter]);
        reset({
            projectName: 'SAMPLE',
            promoterName: '',
            promoterType: '',
            state: 'Telangana',
            district: '',
            mandal: '',
            village: '',
            agreementType: 'revenue_share',
            blockNumber: '',
            buildingName: '',
            streetName: '',
            locality: '',
            landmark: '',
            pincode: '',
            contactPersonName: '',
            contactPersonDesignation: '',
            mobileNumber: '',
            officeNumber: '',
            faxNumber: '',
            emailId: ''
        });
    };

    const handleDelete = (id: number) => {
        setCoPromoters(coPromoters.filter(p => p.id !== id));
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Add Co-Promoter Details
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                <Typography variant="caption" display="block" sx={{ mb: 2, color: 'text.secondary' }}>
                    All * Mark field are mandatory.
                </Typography>

                <Grid container spacing={3}>
                    {/* Project Name (Fixed/Dropdown based on user request "SAMPLE") */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Project Name *"
                            {...register('projectName', { required: true })}
                            defaultValue="SAMPLE"
                        >
                            <MenuItem value="SAMPLE">SAMPLE</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        {/* Spacer or additional info */}
                    </Grid>

                    {/* Promoter Details */}
                    <Grid size={{ xs: 12 }}> <Typography variant="h6" color="primary">Promoter(Land Owner/ Investor) Details</Typography> </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Promoter Name *" {...register('promoterName', { required: true })} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="Type of Promoter(Land Owner/ Investor) *" {...register('promoterType', { required: true })} defaultValue="">
                            <MenuItem value="Individual">Individual</MenuItem>
                            <MenuItem value="Company">Company</MenuItem>
                            <MenuItem value="Partnership">Partnership</MenuItem>
                            <MenuItem value="Trust">Trust</MenuItem>
                            <MenuItem value="Societies">Societies</MenuItem>
                            <MenuItem value="Public Authority">Public Authority</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </TextField>
                    </Grid>

                    {/* Address */}
                    <Grid size={{ xs: 12 }}> <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Address for Official communication</Typography> </Grid>
                    <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Block Number" {...register('blockNumber')} /> </Grid>
                    <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Building Name" {...register('buildingName')} /> </Grid>
                    <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Street Name" {...register('streetName')} /> </Grid>
                    <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Locality" {...register('locality')} /> </Grid>
                    <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Landmark" {...register('landmark')} /> </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth label="State *" {...register('state')}>
                            <MenuItem value="Telangana">Telangana</MenuItem>
                            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth label="District *" {...register('district')} defaultValue="">
                            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                            <MenuItem value="Ranga Reddy">Ranga Reddy</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth label="Mandal *" {...register('mandal')} defaultValue="">
                            <MenuItem value="Serilingampally">Serilingampally</MenuItem>
                            <MenuItem value="Gandipet">Gandipet</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth label="Village *" {...register('village')} defaultValue="">
                            <MenuItem value="Madhapur">Madhapur</MenuItem>
                            <MenuItem value="Gachibowli">Gachibowli</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Pin Code *" {...register('pincode', { required: true })} /> </Grid>

                    {/* Contact Details */}
                    <Grid size={{ xs: 12 }}> <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Contact Details</Typography> </Grid>
                    <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Name of Contact Person *" {...register('contactPersonName', { required: true })} /> </Grid>
                    <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Contact Designation *" {...register('contactPersonDesignation', { required: true })} /> </Grid>
                    <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Mobile Number *" {...register('mobileNumber', { required: true })} /> </Grid>
                    <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Office Number" {...register('officeNumber')} /> </Grid>
                    <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Fax Number" {...register('faxNumber')} /> </Grid>
                    <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Email ID *" {...register('emailId', { required: true })} /> </Grid>

                    {/* Agreement Type */}
                    <Grid size={{ xs: 12 }}> <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Type of Agreement/ Arrangement</Typography> </Grid>
                    <Grid size={{ xs: 12 }}>
                        <FormControl>
                            <Controller
                                rules={{ required: true }}
                                control={control}
                                name="agreementType"
                                render={({ field }) => (
                                    <RadioGroup {...field} row>
                                        <FormControlLabel value="revenue_share" control={<Radio />} label="Revenue Share" />
                                        <FormControlLabel value="area_share" control={<Radio />} label="Area Share" />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button type="submit" variant="contained" size="large">
                        Add Promoter
                    </Button>
                </Box>
            </Paper>

            <Paper sx={{ p: 4 }}>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>Promoter(Land Owner/ Investor) List</Typography>
                <TableContainer sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Table size="small">
                        <TableHead sx={{ bgcolor: 'grey.100' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>SR.NO.</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Promoter Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Pin Code</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name of Contact Person</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Contact Designation</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Mobile Number</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Email ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Upload Document</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coPromoters.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                        No Co-Promoters Added.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                coPromoters.map((p, index) => (
                                    <TableRow key={p.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{p.promoterName}</TableCell>
                                        <TableCell>{p.pincode}</TableCell>
                                        <TableCell>{p.contactPersonName}</TableCell>
                                        <TableCell>{p.contactPersonDesignation}</TableCell>
                                        <TableCell>{p.mobileNumber}</TableCell>
                                        <TableCell>{p.emailId}</TableCell>
                                        <TableCell>
                                            <IconButton size="small" color="primary"> <EditIcon /> </IconButton>
                                            <IconButton size="small" color="error" onClick={() => handleDelete(p.id)}> <DeleteIcon /> </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <Button size="small" startIcon={<UploadFileIcon />} variant="outlined">
                                                Upload
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default AddCoPromoterPage;
