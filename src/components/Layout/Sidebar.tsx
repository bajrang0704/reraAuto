import { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Avatar,
    Divider,
    useTheme,
    useMediaQuery,
    Collapse,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PaymentIcon from '@mui/icons-material/Payment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupIcon from '@mui/icons-material/Group';
import DomainIcon from '@mui/icons-material/Domain';
import DeckIcon from '@mui/icons-material/Deck';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import GavelIcon from '@mui/icons-material/Gavel';
import TaskIcon from '@mui/icons-material/Task';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import UpdateIcon from '@mui/icons-material/Update';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LogoutIcon from '@mui/icons-material/Logout';
import DownloadIcon from '@mui/icons-material/Download';

const drawerWidth = 280;

interface SidebarProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

interface MenuItem {
    text: string;
    icon: React.ReactNode;
    path?: string;
    children?: MenuItem[];
}

const Sidebar = ({ mobileOpen, handleDrawerToggle }: SidebarProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();

    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
        'Account': true,
        'Project Details': true, // Default open for easier access
    });

    const handleSubmenuClick = (text: string) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [text]: !prev[text],
        }));
    };

    const handleItemClick = (item: MenuItem) => {
        if (item.children) {
            handleSubmenuClick(item.text);
        } else if (item.path) {
            navigate(item.path);
            if (isMobile) {
                handleDrawerToggle();
            }
        }
    };

    const menuItems: MenuItem[] = [
        {
            text: 'Account',
            icon: <AccountCircleIcon />,
            children: [
                { text: 'My Profile', icon: <PersonIcon />, path: '/personal-info' },
                { text: 'Add Organizations Other Member Details', icon: <BusinessIcon />, path: '/personal-info' }, // Placeholder route
                { text: 'Past Experience Details', icon: <HistoryIcon />, path: '/past-experience' },
                { text: 'Change Password', icon: <VpnKeyIcon /> },
            ],
        },
        {
            text: 'Project Details',
            icon: <BusinessIcon />,
            children: [
                { text: 'Add Project', icon: <ApartmentIcon />, path: '/project/add' },
                { text: 'Add Co-Promoter Details', icon: <GroupIcon />, path: '/project/co-promoter' },
                { text: 'Add Buildings', icon: <DomainIcon />, path: '/project/add-buildings' },
                { text: 'Common Areas and Facilities', icon: <DeckIcon />, path: '/project/common-areas' },
                { text: 'Add Project Cost', icon: <MonetizationOnIcon />, path: '/project/cost' },
                { text: 'Add Project Professional Details', icon: <EngineeringIcon />, path: '/project/professional' },
                { text: 'Document Upload', icon: <UploadFileIcon />, path: '/project/documents' },
                { text: 'Add Litigations Related to the Project', icon: <GavelIcon />, path: '/project/litigations' },
                { text: 'Task/Activity', icon: <TaskIcon />, path: '/project/activity' },
                { text: 'Upload Photos', icon: <PhotoCameraIcon />, path: '/project/photos' },
                { text: 'Application Withdrawal', icon: <CancelIcon />, path: '/project/withdrawal' },
                { text: 'Application For Change', icon: <EditIcon />, path: '/project/change' },
            ],
        },
        { text: 'Payment', icon: <PaymentIcon />, path: '/payment' },
        { text: 'Project Extension', icon: <UpdateIcon />, path: '/project/extension' },
        { text: 'Download Payment Receipts', icon: <DownloadIcon />, path: '/payment/receipts' },
        { text: 'Quarterly Update', icon: <UpdateIcon />, path: '/update/quarterly' },
        { text: 'Annual Audit Report', icon: <AssessmentIcon />, path: '/update/audit' },
        { text: 'Overall completion certificate upload', icon: <VerifiedUserIcon />, path: '/update/completion' },
        { text: 'Log Out', icon: <LogoutIcon />, path: '/logout' },
    ];

    const isActive = (path?: string) => {
        if (!path) return false;
        return location.pathname === path;
    };

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#1a1a2e', color: 'white' }}>
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#16213e' }}>
                <Avatar
                    sx={{ width: 80, height: 80, mb: 2, bgcolor: theme.palette.primary.main }}
                    alt="Promoter"
                    src="/placeholder-user.jpg"
                >
                    P
                </Avatar>
                <Typography variant="subtitle1" fontWeight="bold">
                    Welcome,
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.light">
                    TEMP
                </Typography>
                <Typography variant="caption" sx={{ color: 'gray' }}>
                    Promoter
                </Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {menuItems.map((item) => (
                    <Box key={item.text}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleItemClick(item)}
                                selected={item.path ? isActive(item.path) : false}
                                sx={{
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                                    py: 1.5,
                                    bgcolor: item.path && isActive(item.path) ? 'rgba(255,255,255,0.1)' : 'transparent',
                                }}
                            >
                                <ListItemIcon sx={{ color: 'gray', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 600 }}
                                />
                                {item.children ? (openSubmenus[item.text] ? <ExpandLess sx={{ color: 'gray' }} /> : <ExpandMore sx={{ color: 'gray' }} />) : null}
                            </ListItemButton>
                        </ListItem>

                        {item.children && (
                            <Collapse in={openSubmenus[item.text]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.children.map((child, index) => (
                                        <ListItemButton
                                            key={child.text}
                                            onClick={() => handleItemClick(child)}
                                            selected={isActive(child.path)}
                                            sx={{
                                                pl: 4,
                                                py: 1,
                                                position: 'relative',
                                                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                                                '&.Mui-selected': {
                                                    bgcolor: 'rgba(79, 70, 229, 0.2)', // Primary light transparency
                                                    '&:hover': {
                                                        bgcolor: 'rgba(79, 70, 229, 0.3)',
                                                    }
                                                },
                                                '&::before': { // Draw vertical line tree guide
                                                    content: '""',
                                                    position: 'absolute',
                                                    left: '28px',
                                                    top: 0,
                                                    bottom: 0,
                                                    width: '2px',
                                                    bgcolor: 'rgba(255,255,255,0.1)',
                                                    display: index === item.children!.length - 1 ? 'none' : 'block' // Simple approach
                                                }
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: isActive(child.path) ? theme.palette.primary.light : 'gray', minWidth: 35 }}>
                                                {/* Dot indicator or smaller icon for nested items to mimic screenshot tree */}
                                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: isActive(child.path) ? theme.palette.primary.light : 'gray', ml: 0.5 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={child.text}
                                                primaryTypographyProps={{ fontSize: '0.85rem', color: isActive(child.path) ? 'white' : 'rgba(255,255,255,0.7)' }}
                                            />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </Box>
                ))}
            </List>
            <Box sx={{ p: 2, bgcolor: '#0f3460' }}>
                <Typography variant="caption" display="block" align="center" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    Cognito v1.2
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
