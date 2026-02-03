import { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    MenuItem,
    Alert,
} from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';

interface UnitType {
    id?: string;
    floor: string;
    isMortgaged: string; // 'Yes' | 'No'
    apartmentType: string; // e.g. Single Bedroom
    saleableArea: string;
    proposedUnits: string;
    bookedUnits: string;
}

interface BuildingFormValues {
    // Project Name
    projectName: string;

    // Building Details
    buildingName: string;
    completionDate: string;
    noBasements: string;
    noPodiums: string;
    noSuperStructureSlabs: string;
    noStilts: string;
    totalParkingArea: string;

    // Floor Details
    totalFloors: string;

    // Units
    units: UnitType[];
}

const AddBuildingsPage = () => {
    const { register, control, handleSubmit } = useForm<BuildingFormValues>({
        defaultValues: {
            projectName: 'SAMPLE',
            buildingName: '',
            completionDate: '',
            noBasements: '',
            noPodiums: '',
            noSuperStructureSlabs: '',
            noStilts: '',
            totalParkingArea: '',
            totalFloors: '',
            units: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "units"
    });

    // Local state for the "Add Unit Type" sub-form
    const [unitForm, setUnitForm] = useState<UnitType>({
        floor: '',
        isMortgaged: 'No',
        apartmentType: '',
        saleableArea: '',
        proposedUnits: '',
        bookedUnits: ''
    });

    const handleAddUnit = () => {
        if (!unitForm.floor || !unitForm.apartmentType || !unitForm.saleableArea) {
            alert("Please fill mandatory unit details");
            return;
        }
        append({ ...unitForm });
        // Reset form
        setUnitForm({
            floor: '',
            isMortgaged: 'No',
            apartmentType: '',
            saleableArea: '',
            proposedUnits: '',
            bookedUnits: ''
        });
    };

    const onSubmit = (data: BuildingFormValues) => {
        console.log("Building Data:", data);
        alert("Building Added Successfully!");
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', pb: 10 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Add Buildings
            </Typography>

            <Paper sx={{ p: 4 }}>
                <Typography variant="caption" display="block" sx={{ mb: 2, color: 'error' }}>
                    All * Mark field are mandatory.
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
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
                </Grid>

                {/* --- Building Details --- */}
                <Typography variant="h6" color="primary" sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
                    Building Details
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Name *" {...register('buildingName', { required: true })} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth type="date" label="Proposed Date of Completion (As approved by Competent Authority)" InputLabelProps={{ shrink: true }} {...register('completionDate')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth type="number" label="Number of Basement's" {...register('noBasements')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth type="number" label="Number of Podium's" {...register('noPodiums')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth type="number" label="Number of Slab of Super Structure" {...register('noSuperStructureSlabs')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth type="number" label="Number of Stilts" {...register('noStilts')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth type="number" label="Total Parking Area (In sqmts)" {...register('totalParkingArea')} />
                    </Grid>
                </Grid>

                {/* --- Floor Details --- */}
                <Typography variant="h6" color="primary" sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
                    Floor Details
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth type="number" label="Total Number Of Floors" {...register('totalFloors')} />
                    </Grid>
                </Grid>

                {/* --- Apartments Type Details --- */}
                <Typography variant="h6" color="primary" sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
                    Apartments Type Details
                </Typography>

                <Alert severity="info" sx={{ mb: 3 }}>
                    First Add Apartment Type Details by using - 'Add Apartment Type', then Click Add Building Button to Save Record.
                </Alert>

                <Card variant="outlined" sx={{ mb: 4, bgcolor: '#f9f9f9' }}>
                    <CardHeader title="New Apartment Type" titleTypographyProps={{ variant: 'subtitle2', fontWeight: 'bold' }} />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Floor"
                                    value={unitForm.floor}
                                    onChange={e => setUnitForm({ ...unitForm, floor: e.target.value })}
                                >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 8 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Mortgage Area (Select if the particular Apartment/s is under Mortgage Area)"
                                    value={unitForm.isMortgaged}
                                    onChange={e => setUnitForm({ ...unitForm, isMortgaged: e.target.value })}
                                >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth label="Apartment Type(E.g - Single Bedroom, Double Bedroom, etc)" value={unitForm.apartmentType} onChange={e => setUnitForm({ ...unitForm, apartmentType: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth type="number" label="Saleable Area (In Sqmts)" value={unitForm.saleableArea} onChange={e => setUnitForm({ ...unitForm, saleableArea: e.target.value })} placeholder="000000.00" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth type="number" label="Proposed number of Apartments(Units) in the floor" value={unitForm.proposedUnits} onChange={e => setUnitForm({ ...unitForm, proposedUnits: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField fullWidth type="number" label="Number of Apartments booked/sold/allotted" value={unitForm.bookedUnits} onChange={e => setUnitForm({ ...unitForm, bookedUnits: e.target.value })} placeholder="000000" />
                            </Grid>

                            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" color="secondary" onClick={handleAddUnit}>
                                    ADD APARTMENT TYPE
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* --- Added Units Table --- */}
                {fields.length > 0 && (
                    <TableContainer sx={{ border: '1px solid #e0e0e0', mb: 4 }}>
                        <Table size="small">
                            <TableHead sx={{ bgcolor: 'grey.200' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Floor</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Mortgaged?</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Saleable Area</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Proposed Units</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Booked Units</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fields.map((field, index) => (
                                    <TableRow key={field.id}>
                                        <TableCell>{field.floor}</TableCell>
                                        <TableCell>{field.apartmentType}</TableCell>
                                        <TableCell>{field.isMortgaged}</TableCell>
                                        <TableCell>{field.saleableArea}</TableCell>
                                        <TableCell>{field.proposedUnits}</TableCell>
                                        <TableCell>{field.bookedUnits}</TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small" color="error" onClick={() => remove(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" color="error">
                        CANCEL
                    </Button>
                    <Button type="submit" variant="contained" size="large">
                        ADD BUILDING
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AddBuildingsPage;
