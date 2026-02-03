import { Box, Typography, Paper } from '@mui/material';

const CompletionCertificatePage = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Overall Completion Certificate Upload
            </Typography>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    Feature Under Development
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This page will allow uploading the overall completion certificate.
                </Typography>
            </Paper>
        </Box>
    );
};

export default CompletionCertificatePage;
