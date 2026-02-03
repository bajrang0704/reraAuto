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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton
} from '@mui/material';
import { useForm, useFieldArray, type Control } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

// Types for each professional category
interface BaseProfessional {
    srNo?: number;
    name: string;
    address: string;
    aadhaarNo: string;
    contactNo: string;
}

interface Agent extends BaseProfessional {
    reraCertificateNo: string;
}

interface Architect extends BaseProfessional {
    coaCertificateNo: string;
}

interface OtherProfessional extends BaseProfessional {
    designation: string;
}

interface Contractor extends BaseProfessional { }
interface StructuralEngineer extends BaseProfessional { }

interface ProfessionalDetailsFormValues {
    projectName: string;
    agents: Agent[];
    contractors: Contractor[];
    architects: Architect[];
    structuralEngineers: StructuralEngineer[];
    others: OtherProfessional[];
}

const ProfessionalDetailsPage = () => {
    const { register, control, handleSubmit } = useForm<ProfessionalDetailsFormValues>({
        defaultValues: {
            projectName: 'SAMPLE',
            agents: [],
            contractors: [],
            architects: [],
            structuralEngineers: [],
            others: []
        }
    });

    const onSubmit = (data: ProfessionalDetailsFormValues) => {
        console.log("Professional Details:", data);
        alert("Project Professional Details Saved Successfully!");
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', pb: 5 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Project Professional
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

                {/* --- Real Estate Agent --- */}
                <ProfessionalAccordion
                    title="REAL ESTATE AGENT"
                    name="agents"
                    control={control}
                    register={register}
                    columns={['RERA Certificate No.', 'Name', 'Address', 'Aadhaar No.', 'Contact No.']}
                    fieldsKeys={['reraCertificateNo', 'name', 'address', 'aadhaarNo', 'contactNo']}
                />

                {/* --- Contractor --- */}
                <ProfessionalAccordion
                    title="CONTRACTOR"
                    name="contractors"
                    control={control}
                    register={register}
                    columns={['Name', 'Address', 'Aadhaar No.', 'Contact No.']}
                    fieldsKeys={['name', 'address', 'aadhaarNo', 'contactNo']}
                />

                {/* --- Architect --- */}
                <ProfessionalAccordion
                    title="ARCHITECT *"
                    name="architects"
                    control={control}
                    register={register}
                    columns={['COA Certificate No.', 'Name', 'Address', 'Aadhaar No.', 'Contact No.']}
                    fieldsKeys={['coaCertificateNo', 'name', 'address', 'aadhaarNo', 'contactNo']}
                />

                {/* --- Structural Engineer --- */}
                <ProfessionalAccordion
                    title="STRUCTURAL ENGINEER *"
                    name="structuralEngineers"
                    control={control}
                    register={register}
                    columns={['Name', 'Address', 'Aadhaar No.', 'Contact No.']}
                    fieldsKeys={['name', 'address', 'aadhaarNo', 'contactNo']}
                />

                {/* --- Other --- */}
                <ProfessionalAccordion
                    title="OTHER"
                    name="others"
                    control={control}
                    register={register}
                    columns={['Designation', 'Name', 'Address', 'Aadhaar No.', 'Contact No.']}
                    fieldsKeys={['designation', 'name', 'address', 'aadhaarNo', 'contactNo']}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button type="submit" variant="contained" size="large">
                        Save
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

// Reusable Accordion Component
interface ProfessionalAccordionProps {
    title: string;
    name: "agents" | "contractors" | "architects" | "structuralEngineers" | "others";
    control: Control<ProfessionalDetailsFormValues>;
    register: any;
    columns: string[];
    fieldsKeys: string[];
}

const ProfessionalAccordion = ({ title, name, control, register, columns, fieldsKeys }: ProfessionalAccordionProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: name
    });

    const [newRow, setNewRow] = useState<Record<string, string>>({});

    const handleAdd = () => {
        // Simple validation or just append empty/filled row
        append(newRow as any);
        setNewRow({});
    };
    // So we need a set of controlled inputs for the "New Row" state, then on "+" we append to `fields`.

    return (
        <Accordion defaultExpanded={title.includes("REAL ESTATE AGENT")}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer sx={{ border: '1px solid #e0e0e0' }}>
                    <Table size="small">
                        <TableHead sx={{ bgcolor: '#519cb9' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '50px' }}>Sr. No.</TableCell>
                                {columns.map((col, idx) => (
                                    <TableCell key={idx} sx={{ color: 'white', fontWeight: 'bold' }}>{col}</TableCell>
                                ))}
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Existing Rows */}
                            {fields.map((field, index) => (
                                <TableRow key={field.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    {fieldsKeys.map((key) => (
                                        <TableCell key={key}>
                                            {/* Display text for saved rows, or inputs if we want editable rows. 
                                                Screenshot 4 implies saved rows are listed. 
                                                Let's make them inputs for simplicity of editing or just text.
                                                Usually "Add" adds a row to the list. Let's assume list rows are static text or inputs. 
                                                Let's stick to inputs for "Edit in place" feel which is common, but screenshot 1 shows empty inputs on the last line.
                                                So saved rows might be display-only or input fields. Let's use inputs.
                                             */}
                                            <TextField
                                                fullWidth
                                                size="small"
                                                variant="standard"
                                                {...register(`${name}.${index}.${key}` as const)}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <IconButton size="small" color="error" onClick={() => remove(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {/* New Entry Row (The "Action +" row) */}
                            <TableRow>
                                <TableCell></TableCell>
                                {fieldsKeys.map((key) => (
                                    <TableCell key={key}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            sx={{ bgcolor: '#f5f5f5' }}
                                            value={newRow[key] || ''}
                                            onChange={(e) => setNewRow({ ...newRow, [key]: e.target.value })}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        sx={{ bgcolor: '#00a65a', color: 'white', '&:hover': { bgcolor: '#008d4c' } }}
                                        onClick={handleAdd}
                                    >
                                        <AddCircleIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};

export default ProfessionalDetailsPage;
