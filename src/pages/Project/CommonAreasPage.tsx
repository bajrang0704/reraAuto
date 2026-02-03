import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
} from '@mui/material';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

interface AmenityRow {
    isCustom: boolean;
    name: string;
    proposed: string; // 'Select' | 'Yes' | 'No'
    completionPercentage: string;
    details: string;
}

interface CommonAreasFormValues {
    projectName: string;

    // Parking Details
    openParkingProposed: string;
    openParkingBooked: string;
    openParkingProgress: string;

    coveredParkingProposed: string;
    coveredParkingBooked: string;
    coveredParkingProgress: string;

    // Amenities Matrix
    amenities: AmenityRow[];
}

// Standard list as per previous requirement
const AMENITY_LIST = [
    "Internal Roads & Footpaths",
    "Water Supply",
    "Sewerage (Chamber, Lines, Septic Tank , STP)",
    "Storm Water Drains",
    "Green Strip/TOT LOT/Park",
    "Street Lighting",
    "Community Buildings",
    "Treatment And Disposal Of Sewage And Sullage Water",
    "Solid Waste Management And Disposal",
    "Water Conservation, Rain water Harvesting",
    "Energy management",
    "Fire Protection And Fire Safety Requirements",
    "Electrical Meter Room, Sub-Station, Receiving Station",
    "Aggregate area of recreational Open Space",
    // "Common Areas and facillites" -> This is now the dynamic section header
];

const CommonAreasPage = () => {
    const { register, control, handleSubmit } = useForm<CommonAreasFormValues>({
        defaultValues: {
            projectName: 'SAMPLE',
            amenities: AMENITY_LIST.map(name => ({
                isCustom: false,
                name,
                proposed: 'No',
                completionPercentage: '',
                details: ''
            }))
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "amenities"
    });

    const handleAddCustomAmenity = () => {
        append({
            isCustom: true,
            name: '',
            proposed: 'Yes',
            completionPercentage: '',
            details: ''
        });
    };

    const onSubmit = (data: CommonAreasFormValues) => {
        console.log("Common Areas Data:", data);
        alert("Common Areas & Facilities Saved Successfully!");
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', pb: 5 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Common Areas and Facilities
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                <Typography variant="caption" display="block" sx={{ mb: 2, color: 'error', fontWeight: 'bold' }}>
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

                {/* --- Project Details (Parking) --- */}
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Project Details
                </Typography>
                <TableContainer component={Paper} elevation={0} variant="outlined" sx={{ mb: 4 }}>
                    <Table size="small">
                        <TableHead sx={{ bgcolor: '#44a1d4' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Proposed</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Number Of Units Booked</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Progress Of Work Done (in %)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Open Parking (In sqmts) :</TableCell>
                                <TableCell> <TextField fullWidth size="small" {...register('openParkingProposed')} /> </TableCell>
                                <TableCell> <TextField fullWidth size="small" {...register('openParkingBooked')} /> </TableCell>
                                <TableCell> <TextField fullWidth size="small" {...register('openParkingProgress')} /> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Covered Parking ( In Numbers) :</TableCell>
                                <TableCell> <TextField fullWidth size="small" {...register('coveredParkingProposed')} /> </TableCell>
                                <TableCell> <TextField fullWidth size="small" {...register('coveredParkingBooked')} /> </TableCell>
                                <TableCell> <TextField fullWidth size="small" {...register('coveredParkingProgress')} /> </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>


                {/* --- Development Work --- */}
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Development Work
                </Typography>
                <TableContainer component={Paper} elevation={0} variant="outlined" sx={{ mb: 4 }}>
                    <Table size="small">
                        <TableHead sx={{ bgcolor: '#44a1d4' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '30%' }}>Common areas And Facilities, Amenities</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '15%' }}>Proposed</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '25%' }}>Percentage Of Completion</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '30%' }}>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Static Fields */}
                            {fields.map((field, index) => {
                                if (field.isCustom) return null; // Skip custom fields here
                                return (
                                    <TableRow key={field.id}>
                                        <TableCell>{field.name} :</TableCell>
                                        <TableCell>
                                            <Controller
                                                control={control}
                                                name={`amenities.${index}.proposed` as const}
                                                render={({ field: controllerField }) => (
                                                    <Select {...controllerField} fullWidth size="small" displayEmpty>
                                                        <MenuItem value="Yes">Yes</MenuItem>
                                                        <MenuItem value="No">No</MenuItem>
                                                    </Select>
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth size="small" {...register(`amenities.${index}.completionPercentage` as const)} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth size="small" {...register(`amenities.${index}.details` as const)} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* --- Dynamic Custom Common Areas --- */}
                <Box sx={{ bgcolor: '#37474f', p: 1, display: 'flex', alignItems: 'center', mb: 2, borderRadius: 1 }}>
                    <Button
                        variant="contained"
                        sx={{ mr: 2, bgcolor: '#009688', '&:hover': { bgcolor: '#00796b' } }}
                        onClick={handleAddCustomAmenity}
                    >
                        Add More
                    </Button>
                    <Typography variant="subtitle1" color="white">
                        Common Areas and facillites
                    </Typography>
                </Box>

                {fields.some(f => f.isCustom) && (
                    <TableContainer component={Paper} elevation={0} variant="outlined" sx={{ mb: 4 }}>
                        <Table size="small">
                            <TableBody>
                                {fields.map((field, index) => {
                                    if (!field.isCustom) return null; // Skip static fields
                                    return (
                                        <TableRow key={field.id}>
                                            <TableCell sx={{ width: '30%', verticalAlign: 'top' }}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Enter Common Areas and"
                                                    {...register(`amenities.${index}.name` as const, { required: true })}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ width: '15%', verticalAlign: 'top' }}>
                                                <Controller
                                                    control={control}
                                                    name={`amenities.${index}.proposed` as const}
                                                    render={({ field: controllerField }) => (
                                                        <Select {...controllerField} fullWidth size="small" displayEmpty>
                                                            <MenuItem value="Yes">Yes</MenuItem>
                                                            <MenuItem value="No">No</MenuItem>
                                                        </Select>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ width: '25%', verticalAlign: 'top' }}>
                                                <TextField fullWidth size="small" {...register(`amenities.${index}.completionPercentage` as const)} />
                                            </TableCell>
                                            <TableCell sx={{ width: '30%', verticalAlign: 'top' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                    <TextField fullWidth size="small" placeholder="Details" {...register(`amenities.${index}.details` as const)} />
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        sx={{ bgcolor: '#4dd0e1', '&:hover': { bgcolor: '#26c6da' }, alignSelf: 'flex-start' }}
                                                        onClick={() => remove(index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}


                <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, gap: 2 }}>
                    <Button type="submit" variant="contained" size="large" sx={{ bgcolor: '#009688', '&:hover': { bgcolor: '#00796b' } }}>
                        Save
                    </Button>
                    <Typography variant="body2" color="error" fontWeight="bold">
                        After any add or update of data, click on save buton.
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default CommonAreasPage;
