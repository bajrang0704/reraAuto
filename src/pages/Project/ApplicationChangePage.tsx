import { Box, Typography, Paper } from '@mui/material';

const ApplicationChangePage = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Application For Change
            </Typography>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    Feature Under Development
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This form handles requests for changes in the application.
                </Typography>
            </Paper>
        </Box>
    );
};

export default ApplicationChangePage;
