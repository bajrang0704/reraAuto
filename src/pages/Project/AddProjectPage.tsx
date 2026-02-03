import { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const steps = ['Project Information', 'Site & Location', 'Bank & GIS'];

interface BankDetails {
    bankName: string;
    branchName: string;
    accountNumber: string;
    ifsc: string;
    bankAddress: string;
}

interface ProjectFormValues {
    // Step 1: Project Information
    authorityName: string;
    planApprovalNo: string;
    projectStatus: 'new' | 'ongoing';
    approvedDate: string;
    projectName: string;
    projectType: string;
    proposedStartDate: string;
    proposedCompletionDate: string; // "Proposed Date of Completion"
    revisedCompletionDate: string; // "Revised Proposed Date of Completion"
    litigations: 'yes' | 'no';
    hasPromoters: 'yes' | 'no';
    isMsb: 'yes' | 'no';

    // Step 2: Site & Location
    // Land Details
    syNo: string;
    plotNo: string;
    totalArea: string;
    affectedArea: string;
    netArea: string;
    totalBuildingUnits: string; // Approved
    proposedBuildingUnits: string; // Agreement
    // Boundaries
    boundariesEast: string;
    boundariesWest: string;
    boundariesNorth: string;
    boundariesSouth: string;
    // Built-Up
    approvedBuiltUpArea: string;
    mortgageArea: string;
    // Address
    state: string;
    district: string;
    mandal: string;
    village: string;
    street: string;
    locality: string;
    pincode: string;

    // Step 3: Bank & GIS
    // 3 Separate Accounts
    collectionAccount: BankDetails;
    separateAccount: BankDetails;
    transactionAccount: BankDetails;

    latitude: string;
    longitude: string;
}

const AddProjectPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    // Local state to simulate added projects list
    const [addedProjects, setAddedProjects] = useState<any[]>([]);

    const { register, control, handleSubmit, trigger } = useForm<ProjectFormValues>({
        defaultValues: {
            authorityName: '',
            planApprovalNo: '',
            projectStatus: 'new',
            approvedDate: '',
            projectName: '',
            projectType: 'residential',
            proposedStartDate: '',
            proposedCompletionDate: '',
            revisedCompletionDate: '',
            litigations: 'no',
            hasPromoters: 'no',
            isMsb: 'no',
            // Site
            syNo: '',
            plotNo: '',
            totalArea: '',
            affectedArea: '',
            netArea: '', // Calculated ideally
            totalBuildingUnits: '',
            proposedBuildingUnits: '',
            boundariesEast: '',
            boundariesWest: '',
            boundariesNorth: '',
            boundariesSouth: '',
            approvedBuiltUpArea: '',
            mortgageArea: '',
            state: 'Telangana',
            district: '',
            mandal: '',
            village: '',
            street: '',
            locality: '',
            pincode: '',
            // Bank Initial
            collectionAccount: { bankName: '', branchName: '', accountNumber: '', ifsc: '', bankAddress: '' },
            separateAccount: { bankName: '', branchName: '', accountNumber: '', ifsc: '', bankAddress: '' },
            transactionAccount: { bankName: '', branchName: '', accountNumber: '', ifsc: '', bankAddress: '' },
            latitude: '',
            longitude: '',
        }
    });

    // Auto-calculate Net Area (Optional)
    // const totalArea = watch('totalArea');
    // const affectedArea = watch('affectedArea');

    const handleNext = async () => {
        const isStepValid = await trigger();
        if (isStepValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = (data: ProjectFormValues) => {
        console.log("Project Data Submitted:", data);
        // Add to local list
        const newProject = {
            id: Date.now(),
            projectName: data.projectName,
            syNo: data.syNo,
            boundariesEast: data.boundariesEast,
            boundariesWest: data.boundariesWest,
            boundariesNorth: data.boundariesNorth,
            boundariesSouth: data.boundariesSouth,
            totalArea: data.totalArea,
            totalBuildings: data.totalBuildingUnits
        };
        setAddedProjects([...addedProjects, newProject]);
        alert("Project Added to List Successfully!");
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Add New Project
            </Typography>

            <Paper sx={{ mb: 3 }}>
                <Stepper activeStep={activeStep} sx={{ p: 3 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>

            <Paper sx={{ p: 4, mb: 4 }}>
                {/* --- Step 1: Project Information --- */}
                {activeStep === 0 && (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}> <Typography variant="h6" color="primary">Project Information</Typography> </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField select fullWidth label="Authority Name" {...register('authorityName')} defaultValue="">
                                <MenuItem value="DTCP">DTCP</MenuItem>
                                <MenuItem value="GHMC">GHMC</MenuItem>
                                <MenuItem value="TGIIC">TGIIC</MenuItem>
                                <MenuItem value="HMDA">HMDA</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Plan Approval Number *" {...register('planApprovalNo')} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Project Status *</FormLabel>
                                <Controller
                                    control={control}
                                    name="projectStatus"
                                    render={({ field }) => (
                                        <RadioGroup {...field} row>
                                            <FormControlLabel value="ongoing" control={<Radio />} label="On-Going Project" />
                                            <FormControlLabel value="new" control={<Radio />} label="New Project" />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth type="date" label="Approved Date" InputLabelProps={{ shrink: true }} {...register('approvedDate')} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Project Name *" {...register('projectName', { required: true })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField select fullWidth label="Project Type *" {...register('projectType')} defaultValue="residential">
                                <MenuItem value="residential">Residential</MenuItem>
                                <MenuItem value="commercial">Commercial</MenuItem>
                                <MenuItem value="mixed">Mixed</MenuItem>
                                <MenuItem value="plotted">Plotted Development</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth type="date" label="Proposed Date of Completion" InputLabelProps={{ shrink: true }} {...register('proposedCompletionDate')} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth type="date" label="Revised Proposed Date of Completion" InputLabelProps={{ shrink: true }} {...register('revisedCompletionDate')} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Litigations related to project?</FormLabel>
                                <Controller
                                    control={control}
                                    name="litigations"
                                    render={({ field }) => (
                                        <RadioGroup {...field} row>
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Promoter in Project?</FormLabel>
                                <Controller
                                    control={control}
                                    name="hasPromoters"
                                    render={({ field }) => (
                                        <RadioGroup {...field} row>
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Is MSB or High-Rise?</FormLabel>
                                <Controller
                                    control={control}
                                    name="isMsb"
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
                )}

                {/* --- Step 2: Site & Location --- */}
                {activeStep === 1 && (
                    <Grid container spacing={3}>
                        {/* Land Details */}
                        <Grid size={{ xs: 12 }}> <Typography variant="h6" color="primary">Land Details</Typography> </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Sy.No/TS No. *" {...register('syNo', { required: true })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Plot No./House No." {...register('plotNo')} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth type="number" label="Total Area (In sqmts) *" {...register('totalArea', { required: true })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth type="number" label="Area affected in Road/FTL/Nala (In sqmts)" {...register('affectedArea')} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth type="number" label="Net Area (In sqmts)" {...register('netArea')} InputProps={{ readOnly: false }} helperText="Calculated: Total - Affected" />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField select fullWidth label="Total Building Units (as per approved plan)" {...register('totalBuildingUnits')} defaultValue="">
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5+">5+</MenuItem>
                            </TextField>
                            <Typography variant="caption" color="error">
                                Kindly Confirm the building count, Once you add building you will not able to change building count
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField select fullWidth label="Proposed Building Units (as per agreement)" {...register('proposedBuildingUnits')} defaultValue="">
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5+">5+</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Boundaries */}
                        <Grid size={{ xs: 12 }}> <Typography variant="h6" sx={{ mt: 2 }} color="primary">Boundaries</Typography> </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Boundaries East" {...register('boundariesEast')} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Boundaries West" {...register('boundariesWest')} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Boundaries North" {...register('boundariesNorth')} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Boundaries South" {...register('boundariesSouth')} />
                        </Grid>

                        {/* Built-Up Area */}
                        <Grid size={{ xs: 12 }}> <Typography variant="h6" sx={{ mt: 2 }} color="primary">Built-Up Area Details</Typography> </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth type="number" label="Approved Built up Area (In Sqmts) *" {...register('approvedBuiltUpArea', { required: true })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth type="number" label="Mortgage Area (In Sqmts) *" {...register('mortgageArea', { required: true })} />
                        </Grid>

                        {/* Address Details */}
                        <Grid size={{ xs: 12 }}> <Typography variant="h6" sx={{ mt: 2 }} color="primary">Address Details</Typography> </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth label="State" defaultValue="Telangana" slotProps={{ input: { readOnly: true } }} {...register('state')} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField select fullWidth label="District" {...register('district')} defaultValue="">
                                <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                                <MenuItem value="Ranga Reddy">Ranga Reddy</MenuItem>
                                <MenuItem value="Medchal">Medchal</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField select fullWidth label="Mandal" {...register('mandal')} defaultValue="">
                                <MenuItem value="Serilingampally">Serilingampally</MenuItem>
                                <MenuItem value="Gandipet">Gandipet</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField select fullWidth label="Village/City/Town" {...register('village')} defaultValue="">
                                <MenuItem value="Madhapur">Madhapur</MenuItem>
                                <MenuItem value="Gachibowli">Gachibowli</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth label="Street" {...register('street')} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth label="Locality" {...register('locality')} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth label="Pin Code" {...register('pincode')} />
                        </Grid>
                    </Grid>
                )}

                {/* --- Step 3: Bank & GIS --- */}
                {activeStep === 2 && (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="h6" color="primary">Bank Account Details</Typography>
                            <Alert severity="info" sx={{ mt: 1 }}>
                                Details of separate bank account as per section 4 (2)(l)(D) of the Act.
                            </Alert>
                        </Grid>

                        {/* Collection Account (100%) */}
                        <Grid size={{ xs: 12 }}> <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Collection Account of the Project (100%)</Typography> </Grid>
                        <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Bank Name" {...register('collectionAccount.bankName')} /> </Grid>
                        <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Branch Name" {...register('collectionAccount.branchName')} /> </Grid>
                        <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="IFSC Code" {...register('collectionAccount.ifsc')} /> </Grid>
                        <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Bank A/c Number" {...register('collectionAccount.accountNumber')} /> </Grid>
                        <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Bank Address" {...register('collectionAccount.bankAddress')} /> </Grid>

                        {/* Separate Account (70%) */}
                        <Grid size={{ xs: 12 }}> <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>Separate Account of the Project (70%)</Typography> </Grid>
                        <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Bank Name" {...register('separateAccount.bankName')} /> </Grid>
                        <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Branch Name" {...register('separateAccount.branchName')} /> </Grid>
                        <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="IFSC Code" {...register('separateAccount.ifsc')} /> </Grid>
                        <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Bank A/c Number" {...register('separateAccount.accountNumber')} /> </Grid>
                        <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Bank Address" {...register('separateAccount.bankAddress')} /> </Grid>

                        {/* Transaction Account (30%) */}
                        <Grid size={{ xs: 12 }}> <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>Transaction Account of the Project (30%)</Typography> </Grid>
                        <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Bank Name" {...register('transactionAccount.bankName')} /> </Grid>
                        <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="Branch Name" {...register('transactionAccount.branchName')} /> </Grid>
                        <Grid size={{ xs: 12, md: 4 }}> <TextField fullWidth label="IFSC Code" {...register('transactionAccount.ifsc')} /> </Grid>
                        <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Bank A/c Number" {...register('transactionAccount.accountNumber')} /> </Grid>
                        <Grid size={{ xs: 12, md: 6 }}> <TextField fullWidth label="Bank Address" {...register('transactionAccount.bankAddress')} /> </Grid>

                        <Grid size={{ xs: 12 }}> <Typography variant="h6" sx={{ mt: 3 }} color="primary">GIS Coordinates</Typography> </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Latitude" {...register('latitude')} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Longitude" {...register('longitude')} />
                        </Grid>
                    </Grid>
                )}
            </Paper>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mb: 5 }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1, px: 4 }}>
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                {activeStep === steps.length - 1 ? (
                    <Button type="submit" variant="contained" size="large" sx={{ px: 4 }}>
                        Save Project
                    </Button>
                ) : (
                    <Button onClick={handleNext} variant="contained" size="large" sx={{ px: 4 }}>
                        Next
                    </Button>
                )}
            </Box>

            {/* --- Project Details Table --- */}
            <Paper sx={{ p: 3, mb: 10 }}>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>Project Details</Typography>
                <TableContainer sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Table size="small">
                        <TableHead sx={{ bgcolor: 'grey.100' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Sr No.</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Project Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Sy.No/TS No.</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Boundaries East</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Boundaries West</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Boundaries North</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Boundaries South</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Total Area(In sqmts)</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Total Building Units (as per approved plan)</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addedProjects.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                        No projects added yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                addedProjects.map((proj, index) => (
                                    <TableRow key={proj.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{proj.projectName}</TableCell>
                                        <TableCell>{proj.syNo}</TableCell>
                                        <TableCell>{proj.boundariesEast}</TableCell>
                                        <TableCell>{proj.boundariesWest}</TableCell>
                                        <TableCell>{proj.boundariesNorth}</TableCell>
                                        <TableCell>{proj.boundariesSouth}</TableCell>
                                        <TableCell>{proj.totalArea}</TableCell>
                                        <TableCell>{proj.totalBuildings}</TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small" color="primary"> <EditIcon /> </IconButton>
                                            <IconButton size="small" color="error"> <DeleteIcon /> </IconButton>
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

export default AddProjectPage;
