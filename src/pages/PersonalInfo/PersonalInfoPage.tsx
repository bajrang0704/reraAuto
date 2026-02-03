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
} from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect } from 'react';

// --- Interfaces based on Live RERA Site Scan ---

interface Partner {
    id?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    designation: string;
    pan: string;
    aadhar: string;
    email: string;
    mobile: string;

    // Partner Address
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

    photo?: FileList | string;
}

interface PersonalInfoFormValues {
    // Top Level Logic
    infoType: 'individual' | 'other';

    // --- Individual Fields ---
    indFirstName: string;
    indMiddleName: string;
    indLastName: string;
    indFatherName: string;
    indAadhar: string;
    indPan: string;

    // --- Additional Toggles (Live Site Findings) ---
    pastExperience: 'yes' | 'no';
    hasGst: 'yes' | 'no';
    gstNumber?: string; // Conditional
    criminalCase: 'yes' | 'no';
    otherStateRegistration: 'yes' | 'no';

    // --- Organization Fields ---
    orgType: string;
    orgName: string;
    orgPan: string;
    orgOfficeNo: string;
    orgFax: string;
    orgWebsite: string;

    // Org Contact Person
    contactPersonName: string;
    contactPersonDesignation: string;

    // --- Common Address Fields ---
    houseNo: string;
    buildingName: string;
    streetName: string;
    locality: string;
    landmark: string;
    state: string;
    division: string; // New field from live site
    district: string;
    mandal: string;
    village: string;
    pincode: string;

    // --- Contact Details ---
    mobile: string;
    secondaryMobile: string; // New
    email: string;

    // --- Members / Partners ---
    members: Partner[];
}

const PersonalInfoPage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormValues>({
        defaultValues: {
            infoType: 'individual',
            state: 'Telangana',
            orgType: 'LLP',
            pastExperience: 'no', // Default no
            hasGst: 'no',
            criminalCase: 'no',
            otherStateRegistration: 'no',
            members: [],
        },
    });

    const infoType = useWatch({ control, name: 'infoType' });
    const hasGst = useWatch({ control, name: 'hasGst' });
    const pastExperience = useWatch({ control, name: 'pastExperience' });
    const isIndividual = infoType === 'individual';

    // Save Past Experience preference to Local Storage for Layout/Sidebar checks
    useEffect(() => {
        localStorage.setItem('rera_pastExperience', pastExperience);
    }, [pastExperience]);

    const onSubmit = (data: PersonalInfoFormValues) => {
        console.log('Form Data:', data);
        alert('Form Submitted! Check console for JSON.');
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                My Profile
            </Typography>

            <Alert severity="warning" sx={{ mb: 3 }}>
                Fields marked with * are mandatory. Please fill strictly as per official documents.
            </Alert>

            {/* --- General Information --- */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                    General Information
                </Typography>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Information Type *</FormLabel>
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
                    </Grid>
                </Grid>
            </Paper>

            {/* --- Specific Details (Individual or Organization) --- */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {isIndividual ? 'Individual Details' : 'Organization Details'}
                </Typography>

                <Grid container spacing={3}>
                    {isIndividual ? (
                        <>
                            {/* Individual Fields */}
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth label="First Name (Surname) *" {...register('indFirstName', { required: isIndividual })} error={!!errors.indFirstName} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth label="Middle Name" {...register('indMiddleName')} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth label="Last Name *" {...register('indLastName', { required: isIndividual })} error={!!errors.indLastName} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth label="Father's Full Name *" {...register('indFatherName', { required: isIndividual })} error={!!errors.indFatherName} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth label="Aadhar Number *" {...register('indAadhar', { required: isIndividual })} error={!!errors.indAadhar} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth label="PAN Number *" {...register('indPan', { required: isIndividual })} error={!!errors.indPan} />
                            </Grid>
                        </>
                    ) : (
                        <>
                            {/* Organization Fields */}
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Organization Type *"
                                    {...register('orgType')}
                                    defaultValue="LLP"
                                >
                                    <MenuItem value="Company">Company</MenuItem>
                                    <MenuItem value="Partnership">Partnership</MenuItem>
                                    <MenuItem value="LLP">LLP</MenuItem>
                                    <MenuItem value="Trust">Trust</MenuItem>
                                    <MenuItem value="Societies">Societies</MenuItem>
                                    <MenuItem value="Public Authority">Public Authority</MenuItem>
                                    <MenuItem value="Proprietorship">Proprietorship</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth label="Name *" {...register('orgName', { required: !isIndividual })} error={!!errors.orgName} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth label="PAN Number *" {...register('orgPan', { required: !isIndividual })} error={!!errors.orgPan} />
                            </Grid>

                            {/* Past Experience (Moved for Org) */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Do you have any Past Experience?</FormLabel>
                                    <Controller
                                        control={control}
                                        name="pastExperience"
                                        render={({ field }) => (
                                            <RadioGroup {...field} row>
                                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            {/* GST Details (Moved for Org) */}
                            <Grid size={{ xs: 12, md: 12 }}>
                                <Alert severity="info" sx={{ mb: 1 }}>If Turn Over of the Project is more than 20 Lakhs, GST is mandatory</Alert>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Do you have any GST Number?</FormLabel>
                                    <Controller
                                        control={control}
                                        name="hasGst"
                                        render={({ field }) => (
                                            <RadioGroup {...field} row>
                                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            {hasGst === 'yes' && (
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="GSTIN Number *" {...register('gstNumber', { required: hasGst === 'yes' })} error={!!errors.gstNumber} />
                                </Grid>
                            )}
                        </>
                    )}
                </Grid>
            </Paper>

            {/* --- Additional Information (Common) --- */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Additional Information
                </Typography>
                <Grid container spacing={3}>
                    {isIndividual && (
                        <>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Do you have any past experience?</FormLabel>
                                    <Controller
                                        control={control}
                                        name="pastExperience"
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
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Do you have GST Number?</FormLabel>
                                    <Controller
                                        control={control}
                                        name="hasGst"
                                        render={({ field }) => (
                                            <RadioGroup {...field} row>
                                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            {hasGst === 'yes' && (
                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth label="GSTIN Number *" {...register('gstNumber', { required: hasGst === 'yes' })} error={!!errors.gstNumber} />
                                </Grid>
                            )}
                        </>
                    )}

                </Grid>
            </Paper>

            {/* --- Address Section --- */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Address For Official Communication
                </Typography>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth label="House No/Sy. No/Block No/Plot No *" {...register('houseNo', { required: true })} error={!!errors.houseNo} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth label="Building Name" {...register('buildingName')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth label="Street Name *" {...register('streetName', { required: true })} error={!!errors.streetName} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth label="Locality *" {...register('locality', { required: true })} error={!!errors.locality} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth label="Landmark *" {...register('landmark', { required: true })} error={!!errors.landmark} />
                    </Grid>

                    {/* Administrative Hierarchy */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth label="State *" defaultValue="Telangana" {...register('state')}>
                            <MenuItem value="Telangana">Telangana</MenuItem>
                            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth label="District *" defaultValue="" {...register('district')} error={!!errors.district}>
                            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                            <MenuItem value="Ranga Reddy">Ranga Reddy</MenuItem>
                            <MenuItem value="Medchal-Malkajgiri">Medchal-Malkajgiri</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth label="Mandal *" defaultValue="" {...register('mandal')} error={!!errors.mandal}>
                            <MenuItem value="Serilingampally">Serilingampally</MenuItem>
                            <MenuItem value="Gandipet">Gandipet</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth label="Village/City/Town *" defaultValue="" {...register('village')} error={!!errors.village}>
                            <MenuItem value="Madhapur">Madhapur</MenuItem>
                            <MenuItem value="Gachibowli">Gachibowli</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth label="Pin Code *" {...register('pincode', { required: true })} error={!!errors.pincode} />
                    </Grid>
                </Grid>
            </Paper>

            {/* --- Contact Person (Org Only) & Common Contact --- */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {isIndividual ? 'Contact Details' : 'Organization Contact Details'}
                </Typography>
                <Grid container spacing={3}>
                    {!isIndividual && (
                        <>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Name of Contact Person *" {...register('contactPersonName', { required: !isIndividual })} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Designation of Contact Person *" {...register('contactPersonDesignation', { required: !isIndividual })} />
                            </Grid>
                        </>
                    )}

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Mobile Number *" {...register('mobile', { required: true })} error={!!errors.mobile} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Secondary Mobile Number" {...register('secondaryMobile')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Office Number" {...register('orgOfficeNo')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Fax Number" {...register('orgFax')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Email ID *" type="email" {...register('email', { required: true })} error={!!errors.email} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Website URL" {...register('orgWebsite')} />
                    </Grid>
                </Grid>

                {isIndividual && (
                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} sx={{ width: 'fit-content' }}>
                            Upload Profile Image
                            <input hidden accept="image/*" type="file" />
                        </Button>
                        <Typography variant="caption" color="text.secondary">
                            Instruction for Upload Photo
                        </Typography>
                    </Box>
                )}
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 10 }}>
                <Button variant="outlined" size="large">Save as Draft</Button>
                <Button type="submit" variant="contained" size="large" disableElevation>
                    Save & Continue
                </Button>
            </Box>
        </Box>
    );
};

export default PersonalInfoPage;
