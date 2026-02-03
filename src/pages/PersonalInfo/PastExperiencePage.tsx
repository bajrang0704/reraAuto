import { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Grid,
    TextField,
    MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

interface PastProject {
    id: number; // Changed to number for simple Date.now() ID
    projectName: string;
    projectType: string;
    address: string;
    landArea: string;
    numBuildings: string;
    numApartments: string;
    totalCost: string;
    surveyNo: string;
    originalDate: string;
    actualDate: string;
}

const PastExperiencePage = () => {
    const navigate = useNavigate();
    const [openWarningDialog, setOpenWarningDialog] = useState(false);

    // Check permission on mount
    useEffect(() => {
        const hasPastExperience = localStorage.getItem('rera_pastExperience'); // Shared key
        if (hasPastExperience !== 'yes') {
            setOpenWarningDialog(true);
        }
    }, []);

    const handleWarningClose = () => {
        setOpenWarningDialog(false);
        navigate('/personal-info'); // Redirect back to profile page
    };

    // State for projects
    const [pastProjects, setPastProjects] = useState<PastProject[]>([]);
    const [openProjectDialog, setOpenProjectDialog] = useState(false);
    const [projectForm, setProjectForm] = useState<Omit<PastProject, 'id'>>({
        projectName: '', projectType: '', address: '', landArea: '', numBuildings: '',
        numApartments: '', totalCost: '', surveyNo: '', originalDate: '', actualDate: ''
    });

    const handleOpenProjectDialog = () => {
        setProjectForm({
            projectName: '', projectType: '', address: '', landArea: '', numBuildings: '',
            numApartments: '', totalCost: '', surveyNo: '', originalDate: '', actualDate: ''
        });
        setOpenProjectDialog(true);
    };

    const handleSaveProject = () => {
        const { projectName, projectType, address, landArea, numBuildings, numApartments, totalCost, surveyNo, originalDate, actualDate } = projectForm;

        // Validation
        if (!projectName || !projectType || !address || !landArea || !numBuildings || !numApartments || !totalCost || !surveyNo || !originalDate || !actualDate) {
            alert("Please fill all mandatory fields marked with *");
            return;
        }

        const newProject: PastProject = {
            id: Date.now(),
            ...projectForm
        };

        setPastProjects([...pastProjects, newProject]);
        setOpenProjectDialog(false);
    };

    const removeProject = (id: number) => {
        setPastProjects(pastProjects.filter(p => p.id !== id));
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Past Experience Details
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Past Projects
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Brief Details of Project launched and completed by promoter in last five years: (across India)
                </Typography>

                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenProjectDialog} sx={{ mb: 2 }}>
                    Add Project Details
                </Button>

                <TableContainer sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Table size="small">
                        <TableHead sx={{ bgcolor: 'grey.100' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Project Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Land Area</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Complete Date</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pastProjects.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                        No Records Found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pastProjects.map((field) => (
                                    <TableRow key={field.id}>
                                        <TableCell>{field.projectName}</TableCell>
                                        <TableCell>{field.projectType}</TableCell>
                                        <TableCell>{field.address}</TableCell>
                                        <TableCell>{field.landArea}</TableCell>
                                        <TableCell>{field.actualDate}</TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small" color="error" onClick={() => removeProject(field.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 10 }}>
                <Button variant="contained" size="large" disableElevation>
                    Save & Continue
                </Button>
            </Box>

            {/* --- Add Project Dialog --- */}
            <Dialog open={openProjectDialog} onClose={() => setOpenProjectDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Add Past Experience Details</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth size="small" label="Project Name *" value={projectForm.projectName} onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField select fullWidth size="small" label="Project Type *" value={projectForm.projectType} onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })} >
                                <MenuItem value="Residential">Residential</MenuItem>
                                <MenuItem value="Commercial">Commercial</MenuItem>
                                <MenuItem value="Mixed">Mixed</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth size="small" multiline rows={2} label="Address *" value={projectForm.address} onChange={(e) => setProjectForm({ ...projectForm, address: e.target.value })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth size="small" type="number" label="Land Area (Sq mtrs) *" value={projectForm.landArea} onChange={(e) => setProjectForm({ ...projectForm, landArea: e.target.value })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth size="small" type="number" label="Number of Buildings/Plots/Blocks *" value={projectForm.numBuildings} onChange={(e) => setProjectForm({ ...projectForm, numBuildings: e.target.value })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth size="small" type="number" label="Number of Apartments *" value={projectForm.numApartments} onChange={(e) => setProjectForm({ ...projectForm, numApartments: e.target.value })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth size="small" type="number" label="Total Cost (INR) *" value={projectForm.totalCost} onChange={(e) => setProjectForm({ ...projectForm, totalCost: e.target.value })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField fullWidth size="small" label="Survey No./Plot No. *" value={projectForm.surveyNo} onChange={(e) => setProjectForm({ ...projectForm, surveyNo: e.target.value })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth size="small" type="date" label="Original Proposed Date of Completion *" focused value={projectForm.originalDate} onChange={(e) => setProjectForm({ ...projectForm, originalDate: e.target.value })} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth size="small" type="date" label="Actual Completion Date *" focused value={projectForm.actualDate} onChange={(e) => setProjectForm({ ...projectForm, actualDate: e.target.value })} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenProjectDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveProject}>Add</Button>
                </DialogActions>
            </Dialog>

            {/* Warning Dialog - Access Denied */}
            <Dialog open={openWarningDialog} onClose={handleWarningClose}>
                <DialogTitle>Past Experience Not Marked</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have indicated 'No' for Past Experience in your profile. Please change the selection to 'Yes' in the 'My Profile' page if you wish to add details.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleWarningClose} autoFocus>
                        Go to Profile
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PastExperiencePage;
