import { AppBar, IconButton, Toolbar, Typography, Box, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

interface HeaderProps {
    handleDrawerToggle: () => void;
    drawerWidth: number;
}

const Header = ({ handleDrawerToggle, drawerWidth }: HeaderProps) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                bgcolor: 'background.paper',
                color: 'text.primary',
                boxShadow: 1,
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <img src="/cognito-logo.png" alt="Logo" style={{ height: 40, marginRight: 16, display: 'none' }} />
                    {/* Placeholder for logo if we had one, for now text */}
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, background: 'linear-gradient(45deg, #4F46E5 30%, #EC4899 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Cognito Company | Real Estate Regulatory Authority
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Logout">
                        <IconButton>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
