import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import {
  Home as HomeIcon,
  Group as GroupIcon,
  EventNote as EventNoteIcon,
  Schedule as ScheduleIcon,
  AccountBalance as AccountBalanceIcon,
  AttachMoney as AttachMoneyIcon,
  RemoveCircle as RemoveCircleIcon,
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  Description as DescriptionIcon,
  ArrowBack as ArrowBackIcon,
  MoreVert as MoreVertIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const EmployeeProfile: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subTab, setSubTab] = useState<string>('Dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to safely get competencies as typed array
  const getCompetenciesArray = (competencies: any): Array<[string, number]> => {
    if (!competencies) return [];
    const entries = Object.entries(competencies);
    return entries.map(([key, value]) => [key, value as number]) as Array<[string, number]>;
  };
  
  // Get employee data from navigation state or use default
  const [employee, setEmployee] = useState<any>({
    id: '100-11',
    name: 'Richard Hermany',
    firstName: 'Richard',
    lastName: 'Hermany',
    middleInitial: 'K',
    position: 'CSR',
    department: 'Customer Service',
    costCenter: 'Operations',
    employmentStatus: 'Active',
    rank: 'Rank and File',
    employmentType: 'Full-time',
    dateHired: '29-Jun-15',
    email: 'richard.hermany@yandex.com',
    phone: '+639450000000',
    address: '123 Main Street, City, State 12345',
    reportsTo: {
      name: 'Adam Stevenson',
      id: '100-1',
      department: 'Customer Service',
      avatar: 'AS'
    },
    directReports: [],
    governmentIds: {
      taxStatus: 'S/ME - Single or Married without qualified',
      tin: '2.985e+11',
      umid: '1234-5678-9012-3456',
      sss: '1070500091',
      philhealth: '1.0205e+11',
      hdmf: '1.2343e+11'
    }
  });

  // Sample employee database - in a real app this would come from an API
  const employeeDatabase: Record<number, any> = {
    1: {
      id: '100-11',
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      middleInitial: 'A',
      position: 'Senior Developer',
      department: 'Engineering',
      costCenter: 'Technology',
      employmentStatus: 'Active',
      rank: 'Senior',
      employmentType: 'Full-time',
      dateHired: '15-Mar-20',
      email: 'john.doe@company.com',
      phone: '+1234567890',
      address: '456 Tech Street, Silicon Valley, CA 94025',
      reportsTo: {
        name: 'Sarah Wilson',
        id: '100-5',
        department: 'Engineering',
        avatar: 'SW',
        position: 'Engineering Manager'
      },
      directReports: ['Mike Johnson', 'Emily Brown'],
      governmentIds: {
        taxStatus: 'S/ME - Single or Married without qualified',
        tin: '1.234e+11',
        umid: '1111-2222-3333-4444',
        sss: '1234567890',
        philhealth: '9.876e+10',
        hdmf: '5.432e+10'
      },
      // Performance data based on evaluation stage
      evaluationStage: 'for-evaluation',
      performanceRating: 0,
      potentialRating: 4.5,
      overallRating: 0,
      reviewStatus: 'Pending',
      dueDate: '2024-01-20',
      priority: 'High',
      goals: [
        { title: 'Complete Project Alpha', progress: 0, status: 'Not Started' },
        { title: 'Improve Code Quality', progress: 0, status: 'Not Started' }
      ],
      competencies: {
        technicalSkills: 0,
        leadership: 0,
        communication: 0,
        innovation: 0,
        collaboration: 0,
        resultsDelivery: 0
      }
    },
    2: {
      id: '100-12',
      name: 'Jane Smith',
      firstName: 'Jane',
      lastName: 'Smith',
      middleInitial: 'B',
      position: 'Product Manager',
      department: 'Product',
      costCenter: 'Product',
      employmentStatus: 'Active',
      rank: 'Manager',
      employmentType: 'Full-time',
      dateHired: '01-Jun-19',
      email: 'jane.smith@company.com',
      phone: '+1234567891',
      address: '789 Product Ave, Innovation City, NY 10001',
      reportsTo: {
        name: 'David Lee',
        id: '100-3',
        department: 'Product',
        avatar: 'DL',
        position: 'Product Director'
      },
      directReports: ['Alex Turner', 'Chris Martin'],
      governmentIds: {
        taxStatus: 'S/ME - Single or Married without qualified',
        tin: '2.345e+11',
        umid: '2222-3333-4444-5555',
        sss: '2345678901',
        philhealth: '8.765e+10',
        hdmf: '4.321e+10'
      },
      // Performance data based on evaluation stage
      evaluationStage: 'for-evaluation',
      performanceRating: 0,
      potentialRating: 4.8,
      overallRating: 0,
      reviewStatus: 'Pending',
      dueDate: '2024-01-25',
      priority: 'Medium',
      goals: [
        { title: 'Launch New Product Feature', progress: 0, status: 'Not Started' },
        { title: 'Improve Team Productivity', progress: 0, status: 'Not Started' }
      ],
      competencies: {
        technicalSkills: 0,
        leadership: 0,
        communication: 0,
        innovation: 0,
        collaboration: 0,
        resultsDelivery: 0
      }
    },
    3: {
      id: '100-13',
      name: 'Mike Johnson',
      firstName: 'Mike',
      lastName: 'Johnson',
      middleInitial: 'C',
      position: 'UX Designer',
      department: 'Design',
      costCenter: 'Creative',
      employmentStatus: 'Active',
      rank: 'Mid-level',
      employmentType: 'Full-time',
      dateHired: '10-Sep-21',
      email: 'mike.johnson@company.com',
      phone: '+1234567892',
      address: '321 Design Blvd, Creative District, CA 90210',
      reportsTo: {
        name: 'John Doe',
        id: '100-11',
        department: 'Engineering',
        avatar: 'JD',
        position: 'Senior Developer'
      },
      directReports: [],
      governmentIds: {
        taxStatus: 'S/ME - Single or Married without qualified',
        tin: '3.456e+11',
        umid: '3333-4444-5555-6666',
        sss: '3456789012',
        philhealth: '7.654e+10',
        hdmf: '3.210e+10'
      },
      // Performance data based on evaluation stage
      evaluationStage: 'for-evaluation',
      performanceRating: 0,
      potentialRating: 4.2,
      overallRating: 0,
      reviewStatus: 'Pending',
      dueDate: '2024-01-30',
      priority: 'Low',
      goals: [
        { title: 'Redesign User Interface', progress: 0, status: 'Not Started' },
        { title: 'Improve Design System', progress: 0, status: 'Not Started' }
      ],
      competencies: {
        technicalSkills: 0,
        leadership: 0,
        communication: 0,
        innovation: 0,
        collaboration: 0,
        resultsDelivery: 0
      }
    },
    4: {
      id: '100-14',
      name: 'Sarah Wilson',
      firstName: 'Sarah',
      lastName: 'Wilson',
      middleInitial: 'D',
      position: 'Engineering Manager',
      department: 'Engineering',
      costCenter: 'Technology',
      employmentStatus: 'Active',
      rank: 'Manager',
      employmentType: 'Full-time',
      dateHired: '05-Jan-18',
      email: 'sarah.wilson@company.com',
      phone: '+1234567893',
      address: '654 Engineering Way, Tech Hub, TX 78701',
      reportsTo: {
        name: 'David Lee',
        id: '100-3',
        department: 'Product',
        avatar: 'DL',
        position: 'Product Director'
      },
      directReports: ['John Doe', 'Lisa Anderson'],
      governmentIds: {
        taxStatus: 'S/ME - Single or Married without qualified',
        tin: '4.567e+11',
        umid: '4444-5555-6666-7777',
        sss: '4567890123',
        philhealth: '6.543e+10',
        hdmf: '2.109e+10'
      },
      // Performance data based on evaluation stage
      evaluationStage: 'self-assessment',
      performanceRating: 3.8,
      potentialRating: 4.6,
      overallRating: 3.8,
      reviewStatus: 'In Progress',
      dueDate: '2024-01-22',
      progress: 75,
      goals: [
        { title: 'Lead Team Successfully', progress: 75, status: 'In Progress' },
        { title: 'Improve Code Review Process', progress: 60, status: 'In Progress' }
      ],
      competencies: {
        technicalSkills: 4.0,
        leadership: 3.8,
        communication: 4.2,
        innovation: 3.6,
        collaboration: 4.0,
        resultsDelivery: 3.8
      }
    },
    5: {
      id: '100-15',
      name: 'David Lee',
      firstName: 'David',
      lastName: 'Lee',
      middleInitial: 'E',
      position: 'Product Director',
      department: 'Product',
      costCenter: 'Product',
      employmentStatus: 'Active',
      rank: 'Director',
      employmentType: 'Full-time',
      dateHired: '20-Mar-17',
      email: 'david.lee@company.com',
      phone: '+1234567894',
      address: '987 Executive Plaza, Leadership Heights, NY 10005',
      reportsTo: {
        name: 'CEO',
        id: '100-0',
        department: 'Executive',
        avatar: 'CE',
        position: 'CEO'
      },
      directReports: ['Jane Smith', 'Sarah Wilson'],
      governmentIds: {
        taxStatus: 'S/ME - Single or Married without qualified',
        tin: '5.678e+11',
        umid: '5555-6666-7777-8888',
        sss: '5678901234',
        philhealth: '5.432e+10',
        hdmf: '1.098e+10'
      },
      // Performance data based on evaluation stage
      evaluationStage: 'self-assessment',
      performanceRating: 4.1,
      potentialRating: 4.9,
      overallRating: 4.1,
      reviewStatus: 'In Progress',
      dueDate: '2024-01-28',
      progress: 45,
      goals: [
        { title: 'Drive Product Strategy', progress: 45, status: 'In Progress' },
        { title: 'Build High-Performing Team', progress: 70, status: 'In Progress' }
      ],
      competencies: {
        technicalSkills: 4.2,
        leadership: 4.5,
        communication: 4.3,
        innovation: 4.4,
        collaboration: 4.1,
        resultsDelivery: 4.0
      }
    },
    6: {
      id: '100-16',
      name: 'Emily Brown',
      firstName: 'Emily',
      lastName: 'Brown',
      middleInitial: 'F',
      position: 'HR Specialist',
      department: 'Human Resources',
      costCenter: 'HR',
      employmentStatus: 'Active',
      rank: 'Specialist',
      employmentType: 'Full-time',
      dateHired: '12-Apr-22',
      email: 'emily.brown@company.com',
      phone: '+1234567895',
      address: '123 HR Street, People Place, CA 90211',
      reportsTo: {
        name: 'HR Director',
        id: '100-4',
        department: 'Human Resources',
        avatar: 'HD',
        position: 'HR Director'
      },
      directReports: [],
      governmentIds: {
        taxStatus: 'S/ME - Single or Married without qualified',
        tin: '6.789e+11',
        umid: '6666-7777-8888-9999',
        sss: '6789012345',
        philhealth: '4.321e+10',
        hdmf: '9.876e+09'
      },
      // Performance data based on evaluation stage
      evaluationStage: 'manager-assessment',
      performanceRating: 4.0,
      potentialRating: 4.3,
      overallRating: 4.0,
      reviewStatus: 'In Progress',
      dueDate: '2024-01-24',
      progress: 60,
      goals: [
        { title: 'Improve HR Processes', progress: 60, status: 'In Progress' },
        { title: 'Enhance Employee Experience', progress: 80, status: 'In Progress' }
      ],
      competencies: {
        technicalSkills: 4.1,
        leadership: 3.8,
        communication: 4.3,
        innovation: 3.9,
        collaboration: 4.2,
        resultsDelivery: 4.0
      }
    },
    7: {
      id: '100-17',
      name: 'Alex Turner',
      firstName: 'Alex',
      lastName: 'Turner',
      middleInitial: 'G',
      position: 'Team Lead',
      department: 'Engineering',
      costCenter: 'Technology',
      employmentStatus: 'Active',
      rank: 'Lead',
      employmentType: 'Full-time',
      dateHired: '08-Jul-21',
      email: 'alex.turner@company.com',
      phone: '+1234567896',
      address: '456 Lead Lane, Tech District, TX 78702',
      reportsTo: {
        name: 'Sarah Wilson',
        id: '100-14',
        department: 'Engineering',
        avatar: 'SW',
        position: 'Engineering Manager'
      },
      directReports: ['Junior Dev 1', 'Junior Dev 2'],
      governmentIds: {
        taxStatus: 'S/ME - Single or Married without qualified',
        tin: '7.890e+11',
        umid: '7777-8888-9999-0000',
        sss: '7890123456',
        philhealth: '3.210e+10',
        hdmf: '8.765e+09'
      },
      // Performance data based on evaluation stage
      evaluationStage: 'direct-report',
      performanceRating: 4.2,
      potentialRating: 4.6,
      overallRating: 4.2,
      reviewStatus: 'In Progress',
      dueDate: '2024-01-26',
      progress: 30,
      goals: [
        { title: 'Lead Development Team', progress: 30, status: 'In Progress' },
        { title: 'Improve Code Quality', progress: 65, status: 'In Progress' }
      ],
      competencies: {
        technicalSkills: 4.4,
        leadership: 4.2,
        communication: 4.0,
        innovation: 4.1,
        collaboration: 4.3,
        resultsDelivery: 4.2
      }
    },
    8: {
      id: '100-18',
      name: 'Chris Martin',
      firstName: 'Chris',
      lastName: 'Martin',
      middleInitial: 'H',
      position: 'Developer',
      department: 'Engineering',
      costCenter: 'Technology',
      employmentStatus: 'Active',
      rank: 'Developer',
      employmentType: 'Full-time',
      dateHired: '15-Nov-22',
      email: 'chris.martin@company.com',
      phone: '+1234567897',
      address: '789 Dev Drive, Code City, CA 90212',
      reportsTo: {
        name: 'Alex Turner',
        id: '100-17',
        department: 'Engineering',
        avatar: 'AT',
        position: 'Team Lead'
      },
      directReports: [],
      governmentIds: {
        taxStatus: 'S/ME - Single or Married without qualified',
        tin: '8.901e+11',
        umid: '8888-9999-0000-1111',
        sss: '8901234567',
        philhealth: '2.109e+10',
        hdmf: '7.654e+09'
      },
      // Performance data based on evaluation stage
      evaluationStage: 'peer-assessment',
      performanceRating: 4.1,
      potentialRating: 4.4,
      overallRating: 4.1,
      reviewStatus: 'In Progress',
      dueDate: '2024-01-29',
      progress: 80,
      goals: [
        { title: 'Complete Feature Development', progress: 80, status: 'In Progress' },
        { title: 'Improve Testing Coverage', progress: 90, status: 'In Progress' }
      ],
      competencies: {
        technicalSkills: 4.3,
        leadership: 3.7,
        communication: 4.0,
        innovation: 4.2,
        collaboration: 4.1,
        resultsDelivery: 4.0
      }
    },
    9: {
      id: '100-19',
      name: 'Lisa Anderson',
      firstName: 'Lisa',
      lastName: 'Anderson',
      middleInitial: 'I',
      position: 'Designer',
      department: 'Design',
      costCenter: 'Creative',
      employmentStatus: 'Active',
      rank: 'Designer',
      employmentType: 'Full-time',
      dateHired: '03-Mar-21',
      email: 'lisa.anderson@company.com',
      phone: '+1234567898',
      address: '321 Design Way, Creative Town, NY 10002',
      reportsTo: {
        name: 'Sarah Wilson',
        id: '100-14',
        department: 'Engineering',
        avatar: 'SW',
        position: 'Engineering Manager'
      },
      directReports: [],
      governmentIds: {
        taxStatus: 'S/ME - Single or Married without qualified',
        tin: '9.012e+11',
        umid: '9999-0000-1111-2222',
        sss: '9012345678',
        philhealth: '1.098e+10',
        hdmf: '6.543e+09'
      },
      // Performance data based on evaluation stage
      evaluationStage: 'completed',
      performanceRating: 4.2,
      potentialRating: 4.5,
      overallRating: 4.2,
      reviewStatus: 'Completed',
      completionDate: '2024-01-15',
      goals: [
        { title: 'Design New Product Interface', progress: 100, status: 'Completed' },
        { title: 'Improve Design System', progress: 100, status: 'Completed' }
      ],
      competencies: {
        technicalSkills: 4.4,
        leadership: 3.9,
        communication: 4.1,
        innovation: 4.3,
        collaboration: 4.2,
        resultsDelivery: 4.2
      }
    },
    10: {
      id: '100-20',
      name: 'Tom Harris',
      firstName: 'Tom',
      lastName: 'Harris',
      middleInitial: 'J',
      position: 'Analyst',
      department: 'Analytics',
      costCenter: 'Data',
      employmentStatus: 'Active',
      rank: 'Analyst',
      employmentType: 'Full-time',
      dateHired: '20-Jun-21',
      email: 'tom.harris@company.com',
      phone: '+1234567899',
      address: '654 Data Drive, Analytics City, TX 78703',
      reportsTo: {
        name: 'Analytics Manager',
        id: '100-6',
        department: 'Analytics',
        avatar: 'AM',
        position: 'Analytics Manager'
      },
      directReports: [],
      governmentIds: {
        taxStatus: 'S/ME - Single or Married without qualified',
        tin: '1.023e+12',
        umid: '0000-1111-2222-3333',
        sss: '0123456789',
        philhealth: '9.876e+09',
        hdmf: '5.432e+09'
      },
      // Performance data based on evaluation stage
      evaluationStage: 'completed',
      performanceRating: 3.8,
      potentialRating: 4.2,
      overallRating: 3.8,
      reviewStatus: 'Completed',
      completionDate: '2024-01-18',
      goals: [
        { title: 'Complete Data Analysis', progress: 100, status: 'Completed' },
        { title: 'Improve Reporting Process', progress: 100, status: 'Completed' }
      ],
      competencies: {
        technicalSkills: 4.0,
        leadership: 3.5,
        communication: 3.8,
        innovation: 3.9,
        collaboration: 3.7,
        resultsDelivery: 3.8
      }
    }
  };

  useEffect(() => {
    // Check if we have navigation state from evaluation pipeline
    if (location.state?.fromEvaluation && location.state?.employeeId) {
      const employeeId = location.state.employeeId;
      const employeeData = employeeDatabase[employeeId as keyof typeof employeeDatabase];
      
      if (employeeData) {
        setEmployee(employeeData);
      }
    }
  }, [location.state]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBackToEvaluation = () => {
    navigate('/evaluation-pipeline');
  };

  const navigationItems = [
    { icon: <HomeIcon />, text: 'Home', path: '/' },
    { icon: <GroupIcon />, text: 'Workforce', path: '/workforce' },
    { icon: <EventNoteIcon />, text: 'Leaves', path: '/leaves' },
    { icon: <ScheduleIcon />, text: 'Hours', path: '/hours' },
    { icon: <AccountBalanceIcon />, text: 'Paycheck', path: '/paycheck' },
    { icon: <AttachMoneyIcon />, text: 'Earnings', path: '/earnings' },
    { icon: <RemoveCircleIcon />, text: 'Deductions', path: '/deductions' },
    { icon: <WorkIcon />, text: 'Shifts', path: '/shifts' },
    { icon: <AssessmentIcon />, text: 'Perform', path: '/perform' },
    { icon: <DescriptionIcon />, text: 'Documents', path: '/documents' },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Left Navigation Sidebar */}
      <Box sx={{ 
        width: 80, 
        backgroundColor: '#1976d2', 
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2
      }}>
        {/* Company Logo/Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Avatar sx={{ 
            bgcolor: '#fff', 
            color: '#1976d2', 
            width: 40,
            height: 40,
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>
            S
          </Avatar>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ flex: 1, width: '100%' }}>
          {navigationItems.map((item, index) => (
            <Box key={index} sx={{ mb: 2, textAlign: 'center' }}>
              <IconButton 
                sx={{ 
                  color: 'white',
                  width: 48,
                  height: 48,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                {item.icon}
              </IconButton>
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block',
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                  textAlign: 'center'
                }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header Bar */}
        <Box sx={{ 
          backgroundColor: 'white', 
          borderBottom: 1, 
          borderColor: 'divider',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {location.state?.fromEvaluation && (
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleBackToEvaluation}
                sx={{ 
                  mr: 2,
                  textTransform: 'none',
                  border: '1px solid #e0e0e0',
                  color: '#666',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    borderColor: '#ccc'
                  }
                }}
                size="small"
              >
                Back to Evaluation
              </Button>
            )}
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Performance
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
              A
            </Avatar>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Adam
            </Typography>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {/* Performance Sub-tabs */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {['Dashboard', 'Goals', 'Competencies', 'Feedback', 'Reviews', 'Engagement'].map((tab) => (
                  <Button
                    key={tab}
                    variant={subTab === tab ? 'contained' : 'text'}
                    onClick={() => setSubTab(tab)}
                    sx={{
                      textTransform: 'none',
                      px: 3,
                      py: 1.5,
                      borderRadius: 0,
                      borderBottom: subTab === tab ? '2px solid #1976d2' : 'none',
                      color: subTab === tab ? 'white' : 'text.primary',
                      '&:hover': {
                        backgroundColor: subTab === tab ? '#1976d2' : 'rgba(0,0,0,0.04)'
                      }
                    }}
                  >
                    {tab}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {/* Left Column - Employee Profile Summary */}
            <Grid item xs={12} md={4}>
              {/* Employee Profile Card */}
              <Card sx={{ mb: 3, textAlign: 'center' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar sx={{ 
                      width: 120, 
                      height: 120, 
                      mx: 'auto', 
                      mb: 2,
                      bgcolor: '#1976d2',
                      fontSize: '3rem',
                      fontWeight: 'bold'
                    }}>
                      {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                    </Avatar>
                    {/* Status Badge */}
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: '#4caf50',
                      color: 'white',
                      borderRadius: '50%',
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      IN
                    </Box>
                  </Box>
                  
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {employee.firstName} {employee.lastName}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    {employee.position}
                  </Typography>
                  <Box sx={{
                    display: 'inline-block',
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}>
                    {employee.id}
                  </Box>
                </CardContent>
              </Card>

              {/* Contact Details Section */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Contact details
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{employee.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{employee.email}</Typography>
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <Typography variant="caption">📋</Typography>
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{employee.address}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Job Details Section */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Job details
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      <strong>Job title:</strong> {employee.position}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Department:</strong> {employee.department}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Reporting Structure Section */}
              <Card>
                <CardContent>
                  {/* Reports To */}
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Reports to
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#1976d2' }}>
                      {employee.reportsTo.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {employee.reportsTo.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {employee.reportsTo.position || 'Manager'}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Direct Reports */}
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Direct Reports
                  </Typography>
                  {employee.directReports.length > 0 ? (
                    <Box>
                      {employee.directReports.map((report: string, index: number) => (
                        <Box key={index} sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          p: 1,
                          backgroundColor: '#f5f5f5',
                          borderRadius: 1
                        }}>
                          <Avatar sx={{ 
                            width: 32, 
                            height: 32, 
                            mr: 2, 
                            bgcolor: '#1976d2',
                            fontSize: '0.875rem'
                          }}>
                            {report.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {report}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ 
                      p: 2, 
                      backgroundColor: '#f5f5f5', 
                      borderRadius: 1,
                      textAlign: 'center'
                    }}>
                      <Typography variant="body2" color="text.secondary">
                        No direct reports
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Right Column - Performance Dashboard Content */}
            <Grid item xs={12} md={8}>
              {/* Dashboard Tab Content (Default Active) */}
              {subTab === 'Dashboard' && (
                <Grid container spacing={3}>
                  {/* Left Column - Performance Review & Goals */}
                  <Grid item xs={12} md={8}>
                    {/* Dynamic Performance Review Card based on evaluation stage */}
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                          {employee.evaluationStage === 'completed' ? '2024 Performance Review - Completed' : 
                           employee.evaluationStage === 'for-evaluation' ? '2024 Performance Review - Pending' :
                           '2024 Performance Review - In Progress'}
                        </Typography>
                        
                        {employee.evaluationStage === 'for-evaluation' ? (
                          // For employees pending evaluation
                          <Box>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                              Evaluation due: {employee.dueDate ? new Date(employee.dueDate).toLocaleDateString() : 'TBD'}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                              <Box sx={{
                                backgroundColor: '#fff3e0',
                                color: '#f57c00',
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                fontSize: '0.875rem',
                                fontWeight: 'bold'
                              }}>
                                Priority: {employee.priority}
                              </Box>
                              <Box sx={{
                                backgroundColor: '#e3f2fd',
                                color: '#1976d2',
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                fontSize: '0.875rem',
                                fontWeight: 'bold'
                              }}>
                                Status: {employee.reviewStatus}
                              </Box>
                            </Box>
                          </Box>
                        ) : employee.evaluationStage === 'completed' ? (
                          // For completed evaluations
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  Performance Rating: ★ {employee.performanceRating}/5
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Box
                                      key={star}
                                      sx={{
                                        width: 20,
                                        height: 20,
                                        backgroundColor: star <= employee.performanceRating ? '#ffd700' : '#e0e0e0',
                                        borderRadius: '50%'
                                      }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  Potential Rating: ★ {employee.potentialRating}/5
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Box
                                      key={star}
                                      sx={{
                                        width: 20,
                                        height: 20,
                                        backgroundColor: star <= employee.potentialRating ? '#ffd700' : '#e0e0e0',
                                        borderRadius: '50%'
                                      }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        ) : (
                          // For in-progress evaluations
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  Current Rating: ★ {employee.performanceRating}/5
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Box
                                      key={star}
                                      sx={{
                                        width: 20,
                                        height: 20,
                                        backgroundColor: star <= employee.performanceRating ? '#ffd700' : '#e0e0e0',
                                        borderRadius: '50%'
                                      }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  Potential Rating: ★ {employee.potentialRating}/5
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Box
                                      key={star}
                                      sx={{
                                        width: 20,
                                        height: 20,
                                        backgroundColor: star <= employee.potentialRating ? '#ffd700' : '#e0e0e0',
                                        borderRadius: '50%'
                                      }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        )}

                        {employee.evaluationStage === 'completed' && (
                          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                            <Box sx={{
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: '#e8f5e8',
                              color: '#2e7d32',
                              px: 2,
                              py: 1,
                              borderRadius: 1,
                              fontSize: '0.875rem'
                            }}>
                              ✓ Evaluation Complete
                            </Box>
                            <Box sx={{
                              backgroundColor: '#e8f5e8',
                              color: '#2e7d32',
                              px: 2,
                              py: 1,
                              borderRadius: 1,
                              fontSize: '0.875rem',
                              fontWeight: 'bold'
                            }}>
                              Rating: {employee.overallRating}/5.0
                            </Box>
                          </Box>
                        )}

                        {employee.evaluationStage !== 'for-evaluation' && employee.evaluationStage !== 'completed' && (
                          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                            <Box sx={{
                              backgroundColor: '#e3f2fd',
                              color: '#1976d2',
                              px: 2,
                              py: 1,
                              borderRadius: 1,
                              fontSize: '0.875rem',
                              fontWeight: 'bold'
                            }}>
                              Progress: {employee.progress}%
                            </Box>
                            <Box sx={{
                              backgroundColor: '#fff3e0',
                              color: '#f57c00',
                              px: 2,
                              py: 1,
                              borderRadius: 1,
                              fontSize: '0.875rem'
                            }}>
                              Due: {employee.dueDate ? new Date(employee.dueDate).toLocaleDateString() : 'TBD'}
                            </Box>
                          </Box>
                        )}
                      </CardContent>
                    </Card>

                    {/* Dynamic Goals Card */}
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                          Goals
                        </Typography>
                        
                        {employee.goals && employee.goals.map((goal: any, index: number) => (
                          <Box key={index} sx={{ mb: index < employee.goals.length - 1 ? 3 : 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {goal.title}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{
                                  width: 12,
                                  height: 12,
                                  backgroundColor: goal.status === 'Completed' ? '#4caf50' : 
                                                 goal.status === 'In Progress' ? '#ff9800' : '#e0e0e0',
                                  borderRadius: '50%'
                                }} />
                                <Typography variant="body2" 
                                  color={goal.status === 'Completed' ? 'success.main' : 
                                         goal.status === 'In Progress' ? 'warning.main' : 'text.secondary'}>
                                  {goal.progress}% {goal.status === 'Completed' ? '✓' : 
                                                   goal.status === 'In Progress' ? '→' : ''}
                                </Typography>
                              </Box>
                            </Box>
                            {goal.status === 'In Progress' && (
                              <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                                Check-in
                              </Button>
                            )}
                          </Box>
                        ))}
                      </CardContent>
                    </Card>

                    {/* You Are Rocking Card - only show for employees with progress */}
                    {(employee.evaluationStage === 'completed' || employee.evaluationStage === 'self-assessment' || 
                      employee.evaluationStage === 'manager-assessment' || employee.evaluationStage === 'direct-report' || 
                      employee.evaluationStage === 'peer-assessment') && (
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              Performance Highlights
                            </Typography>
                            <Box sx={{ ml: 1, fontSize: '1.2rem' }}>🔥</Box>
                          </Box>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Box sx={{ fontSize: '2rem', mb: 1 }}>👍</Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                  Current Rating
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {employee.performanceRating}/5.0
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Box sx={{ fontSize: '2rem', mb: 1 }}>🧠</Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                  Potential Rating
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {employee.potentialRating}/5.0
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    )}
                  </Grid>

                  {/* Right Column - Career Path & Skills */}
                  <Grid item xs={12} md={4}>
                    {/* Career Path Card */}
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Career Path
                          </Typography>
                          <Button variant="text" size="small" color="primary">
                            View Path
                          </Button>
                        </Box>
                        
                        {/* Level 2 - Current Role */}
                        <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{
                              width: 20,
                              height: 20,
                              backgroundColor: '#1976d2',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '0.75rem',
                              mr: 1
                            }}>
                              ↑
                            </Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              Level 2: {employee.position}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Current Role • {employee.dateHired} - Present
                          </Typography>
                        </Box>

                        {/* Level 3 - Next Role */}
                        <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Level 3: {employee.department === 'Engineering' ? 'Engineering Manager' : 
                                      employee.department === 'Product' ? 'Product Director' : 
                                      employee.department === 'Design' ? 'Design Director' : 'Senior Manager'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            4-6 Years
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                              {employee.directReports.length} Employee{employee.directReports.length !== 1 ? 's' : ''} you can reach out to
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              {employee.directReports.slice(0, 2).map((report: string, index: number) => (
                                <Avatar key={index} sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                  {report.charAt(0)}
                                </Avatar>
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>

                    {/* Skills & Competencies Card */}
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                          Skills & Competencies to move ahead
                        </Typography>
                        
                        {/* Dynamic Skills Display */}
                        {employee.competencies && (
                          <Box sx={{ mb: 2 }}>
                            {(Object.entries(employee.competencies) as [string, number][]).map(([skill, rating]) => (
                              <Box key={skill} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                  {skill.replace(/([A-Z])/g, ' $1').trim()}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Box
                                      key={star}
                                      sx={{
                                        width: 16,
                                        height: 16,
                                        backgroundColor: star <= rating ? '#ffd700' : '#e0e0e0',
                                        borderRadius: '50%'
                                      }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        )}
                        
                        {/* Radar Chart Placeholder */}
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          height: 200,
                          backgroundColor: '#f8f9fa',
                          borderRadius: 1,
                          border: '2px dashed #dee2e6'
                        }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Skills Visualization
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {/* Reviews Tab Content */}
              {subTab === 'Reviews' && (
                <Box>
                  {/* Dynamic Review Content based on evaluation stage */}
                  {employee.evaluationStage === 'for-evaluation' ? (
                    // For employees pending evaluation
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                          Performance Review - Pending
                        </Typography>
                        
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {employee.name} - {employee.position}
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ p: 2, backgroundColor: '#fff3e0', borderRadius: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                  Evaluation Status
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                                  Pending
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Due: {employee.dueDate ? new Date(employee.dueDate).toLocaleDateString() : 'TBD'}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                  Priority Level
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                  {employee.priority}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Department: {employee.department}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Next Steps
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                  1. Self Assessment
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  Employee to complete self-evaluation
                                </Typography>
                                <Button variant="outlined" size="small" color="primary" sx={{ mt: 1 }}>
                                  Start Self Assessment
                                </Button>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                  2. Manager Review
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  Manager to conduct performance review
                                </Typography>
                                <Button variant="outlined" size="small" color="primary" sx={{ mt: 1 }}>
                                  Schedule Review
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  ) : employee.evaluationStage === 'completed' ? (
                    // For completed evaluations
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                          Performance Review - Completed
                        </Typography>
                        
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {employee.name} - {employee.position}
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ p: 2, backgroundColor: '#e8f5e8', borderRadius: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                  Overall Rating
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                                  {employee.overallRating}/5.0
                                </Typography>
                                <Typography variant="body2" color="success.main">
                                  {employee.overallRating >= 4.0 ? 'Exceeds Expectations' : 
                                   employee.overallRating >= 3.0 ? 'Meets Expectations' : 'Needs Improvement'}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ p: 2, backgroundColor: '#e8f5e8', borderRadius: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                  Review Status
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                                  Completed
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Completed: {employee.completionDate ? new Date(employee.completionDate).toLocaleDateString() : 'TBD'}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>

                        {/* Review Categories */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Performance Categories
                          </Typography>
                          <Grid container spacing={2}>
                            {(Object.entries(employee.competencies) as any).map(([category, rating]: [string, number]) => (
                              <Grid item xs={12} sm={6} key={category}>
                                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                      {category.replace(/([A-Z])/g, ' $1').trim()}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                      {rating}/5.0
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Box
                                        key={star}
                                        sx={{
                                          width: 16,
                                          height: 16,
                                          backgroundColor: star <= rating ? '#ffd700' : '#e0e0e0',
                                          borderRadius: '50%'
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>

                        {/* Review History */}
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Review History
                          </Typography>
                          <Box sx={{ 
                            p: 2, 
                            backgroundColor: '#f8f9fa', 
                            borderRadius: 1,
                            border: '1px solid #e0e0e0'
                          }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle2" color="text.secondary">
                                  Previous Review
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                  Q4 2023
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Rating: {Math.max(0, employee.overallRating - 0.2).toFixed(1)}/5.0
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle2" color="text.secondary">
                                  Mid-Year Review
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                  Q2 2024
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Rating: {Math.max(0, employee.overallRating - 0.1).toFixed(1)}/5.0
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle2" color="text.secondary">
                                  Current Review
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                  Q4 2024
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Rating: {employee.overallRating}/5.0
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ) : (
                    // For in-progress evaluations
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                          Performance Review - In Progress
                        </Typography>
                        
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {employee.name} - {employee.position}
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                  Current Rating
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                  {employee.performanceRating}/5.0
                                </Typography>
                                <Typography variant="body2" color="primary">
                                  {employee.evaluationStage.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                  Progress
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                  {employee.progress}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Due: {employee.dueDate ? new Date(employee.dueDate).toLocaleDateString() : 'TBD'}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>

                        {/* Current Stage Details */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Current Stage: {employee.evaluationStage.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                          </Typography>
                          <Grid container spacing={2}>
                            {employee.evaluationStage === 'self-assessment' && (
                              <Grid item xs={12} sm={6}>
                                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    Self Assessment Progress
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Employee has completed {employee.progress}% of self-evaluation
                                  </Typography>
                                  <Button variant="outlined" size="small" color="primary" sx={{ mt: 1 }}>
                                    Continue Assessment
                                  </Button>
                                </Box>
                              </Grid>
                            )}
                            {employee.evaluationStage === 'manager-assessment' && (
                              <Grid item xs={12} sm={6}>
                                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    Manager Review
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Manager review in progress ({employee.progress}% complete)
                                  </Typography>
                                  <Button variant="outlined" size="small" color="primary" sx={{ mt: 1 }}>
                                    Continue Review
                                  </Button>
                                </Box>
                              </Grid>
                            )}
                            {employee.evaluationStage === 'direct-report' && (
                              <Grid item xs={12} sm={6}>
                                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    Direct Report Feedback
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Collecting feedback from direct reports ({employee.progress}% complete)
                                  </Typography>
                                  <Button variant="outlined" size="small" color="primary" sx={{ mt: 1 }}>
                                    View Feedback
                                  </Button>
                                </Box>
                              </Grid>
                            )}
                            {employee.evaluationStage === 'peer-assessment' && (
                              <Grid item xs={12} sm={6}>
                                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    Peer Assessment
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Peer feedback collection ({employee.progress}% complete)
                                  </Typography>
                                  <Button variant="outlined" size="small" color="primary" sx={{ mt: 1 }}>
                                    Review Feedback
                                  </Button>
                                </Box>
                              </Grid>
                            )}
                          </Grid>
                        </Box>

                        {/* Performance Categories - Current Status */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Current Performance Assessment
                          </Typography>
                          <Grid container spacing={2}>
                            {getCompetenciesArray(employee.competencies).map((item) => {
                              const [category, rating] = item;
                              return (
                                <Grid item xs={12} sm={6} key={category}>
                                  <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                        {category.replace(/([A-Z])/g, ' $1').trim()}
                                      </Typography>
                                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                        {rating}/5.0
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Box
                                          key={star}
                                          sx={{
                                            width: 16,
                                            height: 16,
                                            backgroundColor: star <= rating ? '#ffd700' : '#e0e0e0',
                                            borderRadius: '50%'
                                          }}
                                        />
                                      ))}
                                    </Box>
                                  </Box>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  )}

                  {/* Upcoming Reviews */}
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Upcoming Reviews
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                              Q1 2025 Review
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              Due: March 31, 2025
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button variant="outlined" size="small" color="primary">
                                Start Review
                              </Button>
                              <Button variant="text" size="small">
                                Schedule
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                              Mid-Year 2025
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              Due: June 30, 2025
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button variant="outlined" size="small" color="primary">
                                Set Reminder
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* Other tabs content can be added here */}
              {subTab === 'Goals' && (
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                      Goals Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Goals content will be implemented here...
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {subTab === 'Competencies' && (
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                      Competencies Assessment
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Competencies content will be implemented here...
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {subTab === 'Feedback' && (
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                      Feedback & Comments
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Feedback content will be implemented here...
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {subTab === 'Engagement' && (
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                      Employee Engagement
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Engagement content will be implemented here...
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeProfile;
