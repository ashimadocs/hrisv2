import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  ListSubheader,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Menu as MenuIcon,
  Schedule as ScheduleIcon,
  Description as DescriptionIcon,
  Email as EmailIcon,
  Assessment as AssessmentIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Assignment as AssignmentIcon,
  Flag as FlagIcon,
  Psychology as PsychologyIcon,
  AttachMoney as AttachMoneyIcon,
  RateReview as RateReviewIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 280;

// Navigation structure with main headers
const navigationStructure = {
  HIRE: [
    { text: 'ATS Pipeline', icon: <WorkIcon />, path: '/ats' },
    { text: 'Candidates', icon: <PeopleIcon />, path: '/candidates' },
    { text: 'Screening', icon: <SearchIcon />, path: '/screening' },
    { text: 'Interview', icon: <ScheduleIcon />, path: '/interview-coordination' },
    { text: 'Offer & Onboarding', icon: <DescriptionIcon />, path: '/offer-onboarding' },
  ],
  ORG: [
    { text: 'Jobs', icon: <BusinessIcon />, path: '/job-requisitions' },
    { text: 'Communication', icon: <EmailIcon />, path: '/automated-communications' },
  ],
  PERFORM: [
    { text: 'Evaluation Pipeline', icon: <AssignmentIcon />, path: '/evaluation-pipeline' },
    { text: 'Goals', icon: <FlagIcon />, path: '/goals' },
    { text: 'Competencies', icon: <PsychologyIcon />, path: '/competencies' },
    { text: 'Compensation', icon: <AttachMoneyIcon />, path: '/compensation' },
    { text: 'Feedback', icon: <RateReviewIcon />, path: '/feedback' },
    { text: 'Reviews', icon: <StarIcon />, path: '/reviews' },
    { text: 'Engagement', icon: <FavoriteIcon />, path: '/engagement' },
  ],
  UTILITIES: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Auto-Pilot Workflows', icon: <AutoAwesomeIcon />, path: '/auto-pilot-workflows' },
    { text: 'Reporting & Analytics', icon: <AssessmentIcon />, path: '/reporting-analytics' },
  ],
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    HIRE: true,
    ORG: true,
    PERFORM: true,
    UTILITIES: true,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionToggle = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderNavigationSection = (sectionName: string, items: any[]) => (
    <Box key={sectionName}>
      <ListItem
        button
        onClick={() => handleSectionToggle(sectionName)}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <ListItemText 
          primary={sectionName} 
          primaryTypographyProps={{
            fontWeight: 'bold',
            fontSize: '0.9rem',
            color: 'text.secondary',
          }}
        />
        {expandedSections[sectionName] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={expandedSections[sectionName]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{ pl: 4 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  );

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Strato HRIS
        </Typography>
      </Toolbar>
      <List>
        {Object.entries(navigationStructure).map(([sectionName, items]) =>
          renderNavigationSection(sectionName, items)
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            HRIS Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 