import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  IconButton,
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ProbationaryEmployee {
  id: number;
  name: string;
  position: string;
  startDate: string;
  endDate: string;
  dueDate: string;
  manager: string;
  department: string;
  probationPeriod: string;
  currentStage: string;
  checklistItems: Array<{
    id: string;
    title: string;
    description: string;
    completed: boolean;
    required: boolean;
    dueDate?: string;
  }>;
  performanceRating?: number;
  evaluationNotes?: string;
  extensionRequested?: boolean;
  extensionReason?: string;
}

const ProbationaryEmployeeDetail: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeData, setEmployeeData] = useState<ProbationaryEmployee | null>(null);

  useEffect(() => {
    // Mock data for probationary employee
    const mockEmployee: ProbationaryEmployee = {
      id: parseInt(employeeId || '1'),
      name: 'Alex Rodriguez',
      position: 'Junior Developer',
      startDate: '2023-10-15',
      endDate: '2024-01-15',
      dueDate: '2024-01-10',
      manager: 'Sarah Johnson',
      department: 'Engineering',
      probationPeriod: '3 months',
      currentStage: 'Performance Evaluation',
      checklistItems: [
        {
          id: '1',
          title: 'Performance Evaluation',
          description: 'Complete performance assessment and manager review',
          completed: true,
          required: true,
          dueDate: '2024-01-05'
        },
        {
          id: '2',
          title: 'Regularization Notice',
          description: 'Submit formal request for regularization',
          completed: true,
          required: true,
          dueDate: '2024-01-08'
        },
        {
          id: '3',
          title: 'Updated Contract',
          description: 'Review and sign updated employment contract',
          completed: false,
          required: true,
          dueDate: '2024-01-12'
        },
        {
          id: '4',
          title: 'Updated I-9',
          description: 'Complete updated I-9 verification form',
          completed: false,
          required: true,
          dueDate: '2024-01-12'
        },
        {
          id: '5',
          title: 'Acknowledgement of Company Policies',
          description: 'Review and acknowledge updated company policies',
          completed: false,
          required: true,
          dueDate: '2024-01-15'
        },
        {
          id: '6',
          title: 'Agreements (NDA/Non-Compete)',
          description: 'Sign non-disclosure and non-compete agreements',
          completed: false,
          required: true,
          dueDate: '2024-01-15'
        }
      ],
      performanceRating: 4.2,
      evaluationNotes: 'Strong technical skills, good team collaboration, meets expectations.',
      extensionRequested: false
    };
    setEmployeeData(mockEmployee);
  }, [employeeId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBackToPipeline = () => {
    navigate('/evaluation-pipeline');
  };

  const handleSave = () => {
    console.log('Saving probationary employee data:', employeeData);
    setIsEditing(false);
  };

  const handleChecklistToggle = (itemId: string) => {
    if (!employeeData) return;
    
    setEmployeeData(prev => ({
      ...prev!,
      checklistItems: prev!.checklistItems.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const getCompletionPercentage = () => {
    if (!employeeData) return 0;
    const completed = employeeData.checklistItems.filter(item => item.completed).length;
    return Math.round((completed / employeeData.checklistItems.length) * 100);
  };

  const getCurrentStep = () => {
    if (!employeeData) return 0;
    const completed = employeeData.checklistItems.filter(item => item.completed).length;
    return Math.min(completed, employeeData.checklistItems.length - 1);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`probationary-tabpanel-${index}`}
        aria-labelledby={`probationary-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
      </div>
    );
  }

  if (!employeeData) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box sx={{ 
      backgroundColor: '#fff8e1', // Light yellow background matching probationary cards
      minHeight: '100vh',
      p: 3 
    }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToPipeline}
          sx={{ mb: 2 }}
        >
          Back to Evaluation Pipeline
        </Button>
        
        <Paper sx={{ p: 3, backgroundColor: '#fff8e1' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
            <Avatar sx={{ width: 80, height: 80, fontSize: '2rem' }}>
              {employeeData.name.charAt(0)}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {employeeData.name}
                </Typography>
                
                {/* ON PROBATION Flag */}
                <Chip
                  label="ON PROBATION"
                  color="warning"
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    height: 32,
                    backgroundColor: '#ff9800',
                    color: 'white'
                  }}
                />
              </Box>
              
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                {employeeData.position} • {employeeData.department}
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Manager: {employeeData.manager} • Probation Period: {employeeData.probationPeriod}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              {isEditing ? (
                <>
                  <Button variant="contained" onClick={handleSave} startIcon={<SaveIcon />}>
                    Save
                  </Button>
                  <Button variant="outlined" onClick={() => setIsEditing(false)} startIcon={<CancelIcon />}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={() => setIsEditing(true)} startIcon={<EditIcon />}>
                  Edit
                </Button>
              )}
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Tabs */}
      <Paper sx={{ backgroundColor: '#fff8e1' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="probationary employee tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Dashboard" />
          <Tab label="Profile" />
          <Tab label="Job" />
          <Tab label="Documents" />
          <Tab label="Assets" />
          <Tab label="Checklist" />
        </Tabs>

        {/* Dashboard Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Regularization Progress Dashboard
            </Typography>

            {/* Progress Overview */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                      {getCompletionPercentage()}%
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Regularization Complete
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold' }}>
                      {employeeData.checklistItems.filter(item => item.completed).length}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Items Completed
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="warning.main" sx={{ fontWeight: 'bold' }}>
                      {employeeData.checklistItems.filter(item => !item.completed).length}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Items Remaining
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Regularization Steps Visual */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Regularization Steps
            </Typography>
            
            <Stepper activeStep={getCurrentStep()} orientation="vertical">
              {employeeData.checklistItems.map((item, index) => (
                <Step key={item.id} completed={item.completed}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-iconContainer': {
                        color: item.completed ? 'success.main' : 'grey.400'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {item.title}
                      </Typography>
                      {item.completed && (
                        <Chip label="Completed" color="success" size="small" />
                      )}
                    </Box>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    {item.dueDate && (
                      <Typography variant="caption" color="text.secondary">
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </Typography>
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </TabPanel>

        {/* Profile Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Employee Profile
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={employeeData.name}
                  disabled={!isEditing}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Position"
                  value={employeeData.position}
                  disabled={!isEditing}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Department"
                  value={employeeData.department}
                  disabled={!isEditing}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Manager"
                  value={employeeData.manager}
                  disabled={!isEditing}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Probation Period"
                  value={employeeData.probationPeriod}
                  disabled={!isEditing}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Current Stage"
                  value={employeeData.currentStage}
                  disabled={!isEditing}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Job Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Job Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  value={new Date(employeeData.startDate).toLocaleDateString()}
                  disabled
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="End Date"
                  value={new Date(employeeData.endDate).toLocaleDateString()}
                  disabled
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Due Date"
                  value={new Date(employeeData.dueDate).toLocaleDateString()}
                  disabled
                  sx={{ mb: 2 }}
                />
                {employeeData.performanceRating && (
                  <TextField
                    fullWidth
                    label="Performance Rating"
                    value={`${employeeData.performanceRating}/5.0`}
                    disabled
                    sx={{ mb: 2 }}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Documents Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Documents
            </Typography>
            
            <Typography variant="body1" color="text.secondary">
              Document management for probationary employees will be implemented here.
            </Typography>
          </Box>
        </TabPanel>

        {/* Assets Tab */}
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Assets
            </Typography>
            
            <Typography variant="body1" color="text.secondary">
              Asset management for probationary employees will be implemented here.
            </Typography>
          </Box>
        </TabPanel>

        {/* Checklist Tab */}
        <TabPanel value={tabValue} index={5}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Regularization Checklist
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Track progress through the regularization process. All items must be completed for successful regularization.
            </Typography>

            <List>
              {employeeData.checklistItems.map((item) => (
                <ListItem key={item.id} divider sx={{ mb: 2 }}>
                  <ListItemIcon>
                    {item.completed ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <RadioButtonUncheckedIcon color="action" />
                    )}
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {item.title}
                        </Typography>
                        {item.required && (
                          <Chip label="Required" color="primary" size="small" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {item.description}
                        </Typography>
                        {item.dueDate && (
                          <Typography variant="caption" color="text.secondary">
                            Due: {new Date(item.dueDate).toLocaleDateString()}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.completed}
                        onChange={() => handleChecklistToggle(item.id)}
                        disabled={!isEditing}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
              ))}
            </List>

            {/* Overall Progress */}
            <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Overall Progress: {getCompletionPercentage()}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getCompletionPercentage()}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default ProbationaryEmployeeDetail;
