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
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface LitigationFormValues {
    id?: number;
    projectName: string;
    courtName: string;
    caseType: string;
    petitionType: string;
    caseNumber: string;
    caseYear: string;
    preventiveOrder: string; // 'Yes' | 'No'
    presentStatus: string;
}

const LitigationsPage = () => {
    const [litigations, setLitigations] = useState<LitigationFormValues[]>([]);

    const { register, control, handleSubmit, reset } = useForm<LitigationFormValues>({
        defaultValues: {
            projectName: 'SAMPLE',
            courtName: '',
            caseType: '',
            petitionType: '',
            caseNumber: '',
            caseYear: '',
            preventiveOrder: 'No',
            presentStatus: ''
        }
    });

    const onSubmit = (data: LitigationFormValues) => {
        const newLitigation = {
            ...data,
            id: Date.now()
        };
        setLitigations([...litigations, newLitigation]);
        reset({
            projectName: 'SAMPLE',
            courtName: '',
            caseType: '',
            petitionType: '',
            caseNumber: '',
            caseYear: '',
            preventiveOrder: 'No',
            presentStatus: ''
        });
        alert("Litigation Details Added Successfully!");
    };

    const handleDelete = (id: number) => {
        setLitigations(litigations.filter(item => item.id !== id));
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', pb: 5 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Add Litigations
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                <Typography variant="caption" display="block" sx={{ mb: 2, color: 'error', fontWeight: 'bold' }}>
                    All * Mark field are mandatory.
                </Typography>

                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Litigations Related to the Project
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
                    <Grid size={{ xs: 12, md: 6 }}>
                        {/* Spacer */}
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Name of the Court" {...register('courtName')} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="Type Of Case" {...register('caseType')} defaultValue="">
                            <MenuItem value="Civil">Civil</MenuItem>
                            <MenuItem value="Criminal">Criminal</MenuItem>
                            <MenuItem value="Consumer">Consumer Consumer</MenuItem>
                            <MenuItem value="Revenue">Revenue</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="Petition" {...register('petitionType')} defaultValue="">
                            <MenuItem value="Writ Petition">Writ Petition</MenuItem>
                            <MenuItem value="Suit">Suit</MenuItem>
                            <MenuItem value="Appeal">Appeal</MenuItem>
                            <MenuItem value="Complaint">Complaint</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Case Number" {...register('caseNumber')} />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="Year" {...register('caseYear')} defaultValue="">
                            {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Present Status" {...register('presentStatus')} />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Whether any Preventive/Injunction Interim Order is Passed</Typography>
                        <FormControl>
                            <Controller
                                control={control}
                                name="preventiveOrder"
                                render={({ field }) => (
                                    <RadioGroup {...field} row>
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button type="submit" variant="contained" size="large">
                        Add Litigation
                    </Button>
                </Box>
            </Paper>

            {/* List Table */}
            <Paper sx={{ p: 4 }}>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>Litigation List</Typography>
                <TableContainer sx={{ border: '1px solid #e0e0e0' }}>
                    <Table size="small">
                        <TableHead sx={{ bgcolor: 'grey.100' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Sr.No</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Court Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Case Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Case Number</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Year</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {litigations.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                        No Litigations Added.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                litigations.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.courtName}</TableCell>
                                        <TableCell>{item.caseType}</TableCell>
                                        <TableCell>{item.caseNumber}</TableCell>
                                        <TableCell>{item.caseYear}</TableCell>
                                        <TableCell>{item.presentStatus}</TableCell>
                                        <TableCell>
                                            <IconButton size="small" color="primary"> <EditIcon /> </IconButton>
                                            <IconButton size="small" color="error" onClick={() => item.id && handleDelete(item.id)}> <DeleteIcon /> </IconButton>
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

export default LitigationsPage;
