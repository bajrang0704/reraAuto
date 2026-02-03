import { Box, Typography, Paper } from '@mui/material';

const UploadPhotosPage = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Upload Photos
            </Typography>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    Feature Under Development
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This form will allow uploading project photos.
                </Typography>
            </Paper>
        </Box>
    );
};

export default UploadPhotosPage;
