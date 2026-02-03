import { Box, Typography, Paper } from '@mui/material';

const PaymentPage = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Payment
            </Typography>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    Feature Under Development
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This page will handle payment transactions.
                </Typography>
            </Paper>
        </Box>
    );
};

export default PaymentPage;
