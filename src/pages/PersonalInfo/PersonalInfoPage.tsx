import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Alert,
    MenuItem,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from '@mui/material';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

interface Partner {
    designation: string;
    firstName: string;
    middleName: string;
    lastName: string;
    pan: string;
    aadhar: string;
    houseNo: string;
    buildingName: string;
    streetName: string;
    locality: string;
    landmark: string;
    state: string;
    district: string;
    mandal: string;
    village: string;
    pincode: string;
    photo?: FileList;
}

interface PersonalInfoFormValues {
    // Shared
    infoType: string;
    hasExperience: string;
    hasGst: string;

    // Individual
    firstName: string;
    middleName: string;
    lastName: string;
    pan: string;
    fatherName: string;
    aadhar: string;

    // Organization (Other)
    orgType: string;
    orgName: string;
    orgPan: string;
    orgTypeSpecify: string; // New field

    gstNumber: string; // Dynamic

    // Address (Shared structure but different labels potentially)
    houseNo: string;
    buildingName: string;
    streetName: string;
    locality: string;
    landmark: string;
    state: string;
    district: string;
    mandal: string;
    village: string;
    pincode: string;

    // Contact (Shared structure)
    mobile: string;
    secondaryMobile: string; // New
    officeNumber: string;
    fax: string;
    email: string;
    website: string;

    // Org Contact Person
    contactPersonName: string;
    contactPersonDesignation: string;

    // Partners
    partners: Partner[];
}

const PersonalInfoPage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormValues>({
        defaultValues: {
            infoType: 'individual',
            hasExperience: 'no',
            hasGst: 'no',
            state: 'Telangana',
            orgType: 'LLP',
            partners: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "partners"
    });

    const infoType = useWatch({ control, name: 'infoType' });
    const orgType = useWatch({ control, name: 'orgType' });
    const hasGst = useWatch({ control, name: 'hasGst' });

    const onSubmit = (data: PersonalInfoFormValues) => {
        console.log(data);
        alert('Form submitted (check console)');
    };

    const isIndividual = infoType === 'individual';

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>
                My Profile
            </Typography>

            <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
                All * Mark field are mandatory.
            </Alert>

            {/* General Information */}
            <Paper sx={{ p: 4, mb: 4 }}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    General Information
                </Typography>
                <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}>Information Type *</FormLabel>
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        name="infoType"
                        render={({ field }) => (
                            <RadioGroup {...field} row>
                                <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                                <FormControlLabel value="other" control={<Radio />} label="Other Than Individual" />
                            </RadioGroup>
                        )}
                    />
                </FormControl>

                {/* Organization fields moved to dedicated paper */}
            </Paper>

            {/* Individual Details OR Organization Extra Details */}
            {isIndividual && (
                <Paper sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Individual
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="First Name (Surname) *"
                                {...register('firstName', { required: isIndividual })}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Middle Name"
                                {...register('middleName')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Last Name *"
                                {...register('lastName', { required: isIndividual })}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="PAN Number *"
                                {...register('pan', { required: isIndividual })}
                                error={!!errors.pan}
                                helperText={errors.pan?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Father Full Name *"
                                {...register('fatherName', { required: isIndividual })}
                                error={!!errors.fatherName}
                                helperText={errors.fatherName?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Aadhar Number *"
                                {...register('aadhar', { required: isIndividual })}
                                error={!!errors.aadhar}
                                helperText={errors.aadhar?.message}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            )}


            {/* Organization Details (Dedicated Paper) */}
            {!isIndividual && (
                <Paper sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Organization
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Organization Type *"
                                {...register('orgType')}
                                defaultValue="LLP"
                            >
                                <MenuItem value=""><em>Select Organization</em></MenuItem>
                                <MenuItem value="Company">Company</MenuItem>
                                <MenuItem value="Partnership">Partnership</MenuItem>
                                <MenuItem value="Trust">Trust</MenuItem>
                                <MenuItem value="Societies">Societies</MenuItem>
                                <MenuItem value="Public Authority">Public Authority</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                                <MenuItem value="Proprietorship">Proprietorship</MenuItem>
                                <MenuItem value="LLP">LLP</MenuItem>
                            </TextField>

                            {orgType === 'Others' && (
                                <TextField
                                    fullWidth
                                    placeholder="Please specify"
                                    sx={{ mt: 2 }}
                                    {...register('orgTypeSpecify')}
                                />
                            )}
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Name *"
                                {...register('orgName', { required: !isIndividual })}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="PAN Number"
                                {...register('orgPan')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            {/* Empty spacer to keep PAN on left and Past Exp on next row if needed, 
                                but flex wrap will handle it. We want Past Exp on a new row?
                                Screenshot shows PAN on Left. Past Exp below it.
                                If PAN is item 3 (after Name), and md=6, it's on Left.
                                Item 4 is empty?
                            */}
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" sx={{ mb: 1 }}>Do you have any Past Experience? *</FormLabel>
                                <Controller
                                    name="hasExperience"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup {...field} row>
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Alert severity="error" variant="filled" sx={{ mt: 3, mb: 3, borderRadius: 2, bgcolor: '#EF4444' }}>
                        If Turn Over of the Project is more than 20 Lakhs , GST is mandatory
                    </Alert>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" sx={{ mb: 1 }}>Do you have any GST Number? *</FormLabel>
                                <Controller
                                    name="hasGst"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup {...field} row>
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            {hasGst === 'yes' && (
                                <TextField
                                    fullWidth
                                    label="GST Number *"
                                    {...register('gstNumber', { required: hasGst === 'yes' })}
                                    error={!!errors.gstNumber}
                                    helperText={errors.gstNumber?.message}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            )}

            {/* Questions for Individual (Shared Logic but separate render to maintain layout control) */}
            {isIndividual && (
                <Paper sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
                    <Alert severity="error" variant="filled" sx={{ mb: 4, borderRadius: 2, bgcolor: '#EF4444' }}>
                        If Turn Over of the Project is more than 20 Lakhs , GST is mandatory
                    </Alert>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" sx={{ mb: 1 }}>Do you have any Past Experience? *</FormLabel>
                                <Controller
                                    name="hasExperience"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup {...field} row>
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" sx={{ mb: 1 }}>Do you have any GST Number? *</FormLabel>
                                <Controller
                                    name="hasGst"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup {...field} row>
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            {hasGst === 'yes' && (
                                <TextField
                                    fullWidth
                                    label="GST Number *"
                                    {...register('gstNumber', { required: hasGst === 'yes' })}
                                    error={!!errors.gstNumber}
                                    helperText={errors.gstNumber?.message}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            )}

            {/* Address */}
            <Paper sx={{ p: 4, mb: 4 }}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    {isIndividual ? 'Address For Official Communication' : 'Address Details'}
                </Typography>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="House Number/Sy. No" {...register('houseNo', { required: true })} error={!!errors.houseNo} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Building Name *" {...register('buildingName', { required: true })} error={!!errors.buildingName} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Street Name *" {...register('streetName', { required: true })} error={!!errors.streetName} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Locality *" {...register('locality', { required: true })} error={!!errors.locality} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Landmark *" {...register('landmark', { required: true })} error={!!errors.landmark} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="State *" defaultValue="Telangana" {...register('state')}>
                            <MenuItem value="Telangana">Telangana</MenuItem>
                            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="District *" defaultValue="" {...register('district', { required: true })} error={!!errors.district}>
                            <MenuItem value="Mahabubabad">Mahabubabad</MenuItem>
                            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                            <MenuItem value="Ranga Reddy">Ranga Reddy</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="Mandal" defaultValue="" {...register('mandal')}>
                            <MenuItem value="Garla">Garla</MenuItem>
                            <MenuItem value="Serilingampally">Serilingampally</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="Village/City/Town" defaultValue="" {...register('village')}>
                            <MenuItem value="Buddharam">Buddharam</MenuItem>
                            <MenuItem value="Madhapur">Madhapur</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Pin Code *" {...register('pincode', { required: true })} error={!!errors.pincode} />
                    </Grid>
                </Grid>
            </Paper>

            {/* Contact Details */}
            <Paper sx={{ p: 4, mb: 4 }}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    {isIndividual ? 'Contact Details' : 'Organization Contact Details'}
                </Typography>
                <Grid container spacing={3}>
                    {!isIndividual && (
                        <>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Name of Contact Person" {...register('contactPersonName')} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Designation of Contact Person" {...register('contactPersonDesignation')} />
                            </Grid>
                        </>
                    )}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Mobile Number *" {...register('mobile', { required: true })} error={!!errors.mobile} />
                    </Grid>
                    {!isIndividual && (
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Secondary Mobile Number" {...register('secondaryMobile')} />
                        </Grid>
                    )}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Office Number *" {...register('officeNumber', { required: true })} error={!!errors.officeNumber} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Fax Number" {...register('fax')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Email ID *" type="email" {...register('email', { required: true })} error={!!errors.email} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Website URL" {...register('website')} />
                    </Grid>
                </Grid>

                {isIndividual && (
                    <Box sx={{ mt: 4, display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                        <Box
                            sx={{
                                width: 150,
                                height: 180,
                                border: '2px dashed #ccc',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 2,
                                overflow: 'hidden'
                            }}
                        >
                            <img src="/placeholder-upload.png" alt="Upload Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'none' }} />
                            <Typography variant="caption" color="text.secondary">Preview</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">Instruction for Upload Photo</Typography>
                            <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                ✅ Photograph Format should be JPEG or PNG.
                            </Typography>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                sx={{ mt: 2 }}
                            >
                                Upload Photo
                                <input type="file" hidden accept="image/*" />
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>

            {/* Partners Section (Only for Other) */}
            {!isIndividual && (
                <Paper sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Member / Partner Details
                    </Typography>

                    {/* Add Member Form (Visual simulation, functionality could be complex) */}
                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>Add New Member</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth size="small" label="First Name" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth size="small" label="Last Name" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth size="small" label="Designation" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Button variant="contained" startIcon={<AddIcon />} onClick={() => append({
                                    firstName: 'New',
                                    lastName: 'Member',
                                    designation: 'Partner',
                                    middleName: '',
                                    pan: 'XXXX',
                                    aadhar: 'XXXX',
                                    houseNo: '',
                                    buildingName: '',
                                    streetName: '',
                                    locality: '',
                                    landmark: '',
                                    state: 'Telangana',
                                    district: '',
                                    mandal: '',
                                    village: '',
                                    pincode: ''
                                } as Partner)}>
                                    Add Member
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                    <TableContainer component={Box} sx={{ border: '1px solid #f0f0f0', borderRadius: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: 'grey.100' }}>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Middle Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Designation</TableCell>
                                    <TableCell>PAN Number</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fields.map((field, index) => (
                                    <TableRow key={field.id}>
                                        <TableCell>{field.firstName}</TableCell>
                                        <TableCell>{field.middleName}</TableCell>
                                        <TableCell>{field.lastName}</TableCell>
                                        <TableCell>{field.designation}</TableCell>
                                        <TableCell>{field.pan}</TableCell>
                                        <TableCell>
                                            <IconButton size="small" color="primary"><EditIcon /></IconButton>
                                            <IconButton size="small" color="error" onClick={() => remove(index)}><DeleteIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {fields.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ color: 'text.secondary', py: 3 }}>
                                            No members added. Click "Add Member" to add details.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="caption" sx={{ mt: 2, display: 'block', color: 'info.main' }}>
                        Click on add member button to add member details. After records are added, updated or deleted click on save button.
                    </Typography>
                </Paper>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 5 }}>
                <Button variant="outlined" size="large">Save as Draft</Button>
                <Button type="submit" variant="contained" size="large" disableElevation>Save & Continue</Button>
            </Box>
        </Box>
    );
};

export default PersonalInfoPage;
