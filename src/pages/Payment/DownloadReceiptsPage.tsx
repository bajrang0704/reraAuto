import { Box, Typography, Paper } from '@mui/material';

const DownloadReceiptsPage = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Download Payment Receipts
            </Typography>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    Feature Under Development
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This page will allow downloading payment receipts.
                </Typography>
            </Paper>
        </Box>
    );
};

export default DownloadReceiptsPage;
