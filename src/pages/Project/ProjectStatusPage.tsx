import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';

const ProjectStatusPage = () => {
    // Sample data based on user request
    const rows = [
        {
            projectName: "SAMPLE",
            appStatus: "Pending",
            paymentStatus: "Pending",
            scrutinyStatus: "Not Submited",
            correctionStatus: "Not Submited",
            certPreview: "", // Placeholder for icon/link
            extStatus: "",
            extCert: ""
        }
    ];

    const getStatusColor = (status: string) => {
        if (status === 'Pending') return 'warning';
        if (status === 'Approved') return 'success';
        if (status === 'Rejected') return 'error';
        return 'default';
    };

    return (
        <Box sx={{ width: '100%', pb: 5 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Status
            </Typography>

            <Paper sx={{ p: 0, overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: '#2c3e50' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Project Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Application Status</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Payment Status</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Scrutiny Status</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Correction Status</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Certificate / Application Preview</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Extension Status</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Extension Certificate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{row.projectName}</TableCell>
                                    <TableCell>
                                        <Chip label={row.appStatus} color={getStatusColor(row.appStatus) as any} size="small" variant="outlined" />
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={row.paymentStatus} color={getStatusColor(row.paymentStatus) as any} size="small" variant="outlined" />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary">{row.scrutinyStatus}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary">{row.correctionStatus}</Typography>
                                    </TableCell>
                                    <TableCell>{row.certPreview}</TableCell>
                                    <TableCell>{row.extStatus}</TableCell>
                                    <TableCell>{row.extCert}</TableCell>
                                </TableRow>
                            ))}
                            {rows.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">No Projects Found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default ProjectStatusPage;
