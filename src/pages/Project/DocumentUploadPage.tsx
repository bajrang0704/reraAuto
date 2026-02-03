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
} from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

interface DocumentRow {
    srNo?: string | number;
    name: string;
    isMandatory: boolean;
    isDynamic?: boolean;
    fileName?: string;
}

interface DocumentUploadFormValues {
    projectName: string;
    otherDocuments: DocumentRow[];
}

const STATIC_DOCUMENTS = [
    { name: "PAN Card", isMandatory: false },
    { name: "Copy of the legal title report", isMandatory: true },
    { name: "Details of encumbrances", isMandatory: true },
    { name: "Copy of Approval Layout Plan", isMandatory: true },
    { name: "Agreement of Sale (AOS) [as per the Format]", isMandatory: true },
    { name: "Declaration in FORM B", isMandatory: true },
    { name: "Certificates of Architect (Form 1)(Mandatory for only ongoing project)", isMandatory: false },
    { name: "Certificates of Architect (Form 4)", isMandatory: false },
    { name: "Certificates of CA (Form 3)", isMandatory: false },
    { name: "Certificates of CA (Form 5)", isMandatory: false },
    { name: "Certificates of Engineer (Form 2)(Mandatory for only ongoing project)", isMandatory: false },
    { name: "Commencement Certificate/Copy of Building Permit/Proceedings", isMandatory: false },
    { name: "Copy of Sanctioned Building Plan", isMandatory: false },

    // The list continues based on user text, assuming these are standard
    { name: "Status of Formation of Legal Entity (Society/Co Op etc.)", isMandatory: false },
    { name: "Status of Conveyance", isMandatory: false },
    { name: "Copy of Proceeding Building Permission", isMandatory: false },
    { name: "Land Title Search Report from an advocate having experience of at least 10 years", isMandatory: false },
    { name: "Annual/ Audit report for the immediate preceding three financial years", isMandatory: false },
    { name: "Type Design of Sewerage Treatment plan (STP)", isMandatory: false },
    { name: "Copy of Board Resolution for appointment of Authorized Signatory in case of other than individual", isMandatory: false },
    { name: "Copy of Company/Firm/Society/Trust/Proprietary Registration Certificate", isMandatory: false },
    { name: "GST Certificate / Details", isMandatory: false },
    { name: "Form-2 Engineer Certificate Quarterly updation", isMandatory: false },
    { name: "Form-3 Chartered Accountant Certificate Quarterly updation", isMandatory: false },
    { name: "Form-1 Architects Certificate Quarterly updation", isMandatory: false },
    { name: "Form-7 Annual Audit report on statement of Accounts", isMandatory: false },
    { name: "Form–1A Architects certificate Overall completion of registered project", isMandatory: false },
    { name: "Declaration cum affidavit vide section 4(2)(g) of RE(R&D) Act to be furnished by the Promoters for the Project Registration", isMandatory: false },
    { name: "Annual audited financial statement", isMandatory: false },
    { name: "DAGPA / MOU / Joint Development Agreement", isMandatory: false },
    { name: "Registered Supplementary Agreement of Share Holdings of Flat(s) / Plot(s) among Developers / Landowners", isMandatory: false },
    { name: "Mortgage Deed", isMandatory: false },
    { name: "Gift Settlement Deed [with Local Authority]", isMandatory: false },
    { name: "Allotment Letter [as per the Format]", isMandatory: false },
];

const DocumentUploadPage = () => {
    const { register, control, handleSubmit } = useForm<DocumentUploadFormValues>({
        defaultValues: {
            projectName: 'SAMPLE',
            otherDocuments: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "otherDocuments"
    });

    const handleAddOtherDoc = () => {
        append({
            name: '',
            isMandatory: true, // User request shows "Document Name *" for Other
            isDynamic: true,
            fileName: ''
        });
    };

    const onSubmit = (data: DocumentUploadFormValues) => {
        console.log("Documents Uploaded:", data);
        alert("Documents Saved Successfully!");
    };

    // Styling helpers
    const getButtonStyle = (type: 'upload' | 'add') => ({
        bgcolor: type === 'upload' ? '#f0ad4e' : '#00a65a', // Orange/Green approx match
        color: 'white',
        '&:hover': { bgcolor: type === 'upload' ? '#ec971f' : '#008d4c' },
        mr: 1,
        mb: 0.5
    });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', pb: 5 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Document Upload
            </Typography>

            <Paper sx={{ p: 4 }}>
                <Typography variant="caption" display="block" sx={{ mb: 2, color: 'error', fontWeight: 'bold' }}>
                    All * mark fields are mandatory.
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

                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Documents
                </Typography>

                <TableContainer sx={{ border: '1px solid #e0e0e0', mb: 4 }}>
                    <Table size="small">
                        <TableHead sx={{ bgcolor: '#44a1d4' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '50px' }}>Sr. No.</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '40%' }}>Document Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '30%' }}>Uploaded Document</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Static Documents */}
                            {STATIC_DOCUMENTS.map((doc, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {doc.name}
                                        {doc.isMandatory && <span style={{ color: 'red' }}> *</span>}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', p: 0.5, borderRadius: 1 }}>
                                            <Button component="label" size="small" variant="outlined" sx={{ mr: 1, color: 'black', borderColor: '#ccc', textTransform: 'none' }}>
                                                Choose File
                                                <input type="file" hidden />
                                            </Button>
                                            <Typography variant="caption" color="text.secondary">No file chosen</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" size="small" startIcon={<CloudUploadIcon />} sx={getButtonStyle('upload')}>
                                            Upload
                                        </Button>
                                        <Button variant="contained" size="small" startIcon={<AddCircleIcon />} sx={getButtonStyle('add')}>
                                            Add
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Other Documents Section */}
                <Box sx={{ bgcolor: '#e0f7fa', p: 2, mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Other (Note : QPR Documents should not be uploaded in this Section)
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    onClick={handleAddOtherDoc}
                    startIcon={<AddCircleIcon />}
                    sx={{ mb: 2, bgcolor: '#00a65a', '&:hover': { bgcolor: '#008d4c' } }}
                >
                    Add Other Document
                </Button>

                {fields.length > 0 && (
                    <TableContainer sx={{ border: '1px solid #e0e0e0', mb: 4 }}>
                        <Table size="small">
                            <TableHead sx={{ bgcolor: '#eee' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Document Name *</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Uploaded Document</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fields.map((field, index) => (
                                    <TableRow key={field.id}>
                                        <TableCell sx={{ width: '40%' }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                placeholder="Enter Document Name"
                                                {...register(`otherDocuments.${index}.name` as const, { required: true })}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ width: '30%' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', p: 0.5, borderRadius: 1 }}>
                                                <Button component="label" size="small" variant="outlined" sx={{ mr: 1, color: 'black', borderColor: '#ccc', textTransform: 'none' }}>
                                                    Choose File
                                                    <input type="file" hidden />
                                                </Button>
                                                <Typography variant="caption" color="text.secondary">No file chosen</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button variant="contained" size="small" startIcon={<CloudUploadIcon />} sx={getButtonStyle('upload')}>
                                                    Upload
                                                </Button>
                                                <IconButton color="error" onClick={() => remove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button type="submit" variant="contained" size="large">
                        Save
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default DocumentUploadPage;
