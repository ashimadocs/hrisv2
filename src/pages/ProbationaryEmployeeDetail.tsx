import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  ExpandMore as ExpandMoreIcon,
  Work as WorkIcon,
  AttachMoney as AttachMoneyIcon,
  CardGiftcard as CardGiftcardIcon,
  EventNote as EventNoteIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface AssessmentGoal {
  id: string;
  title: string;
  description: string;
  category: string;
  target: string;
  weight: number;
  status: 'pending' | 'in-progress' | 'completed' | 'exceeded';
  score?: number;
  maxScore: number;
}

interface PerformanceReview {
  id: string;
  type: string;
  date: string;
  overallScore: number;
  maxScore: number;
  status: 'pending' | 'completed' | 'approved';
  evaluator: string;
  comments: string;
  recommendation: 'extend' | 'regularize' | 'terminate';
}

interface CompensationChange {
  probationary: {
    salary: number;
    allowances: string[];
    bonuses: string[];
    leaves: number;
  };
  regularized: {
    salary: number;
    allowances: string[];
    bonuses: string[];
    leaves: number;
  };
  effectiveDate: string;
  status: 'pending' | 'approved' | 'implemented';
}

interface DocumentStatus {
  name: string;
  status: 'pending' | 'signed' | 'acknowledged';
  dueDate: string;
  lastUpdated: string;
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
  assessmentGoals: AssessmentGoal[];
  performanceReviews: PerformanceReview[];
  compensationChanges: CompensationChange;
  documents: DocumentStatus[];
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
      extensionRequested: false,
      assessmentGoals: [
        {
          id: 'g1',
          title: 'Technical Skills Development',
          description: 'Master core programming languages and frameworks',
          category: 'Technical',
          target: 'Complete 3 certification courses',
          weight: 30,
          status: 'completed',
          score: 85,
          maxScore: 100
        },
        {
          id: 'g2',
          title: 'Project Delivery',
          description: 'Successfully deliver assigned project milestones',
          category: 'Delivery',
          target: 'Complete 2 major features',
          weight: 40,
          status: 'completed',
          score: 90,
          maxScore: 100
        },
        {
          id: 'g3',
          title: 'Team Collaboration',
          description: 'Effectively work with cross-functional teams',
          category: 'Soft Skills',
          target: 'Participate in 5 team meetings',
          weight: 20,
          status: 'completed',
          score: 88,
          maxScore: 100
        },
        {
          id: 'g4',
          title: 'Learning & Growth',
          description: 'Demonstrate continuous learning and improvement',
          category: 'Growth',
          target: 'Complete 1 advanced training',
          weight: 10,
          status: 'in-progress',
          score: 60,
          maxScore: 100
        }
      ],
      performanceReviews: [
        {
          id: 'pr1',
          type: 'Mid-Probation Review',
          date: '2023-12-01',
          overallScore: 4.2,
          maxScore: 5.0,
          status: 'completed',
          evaluator: 'Sarah Johnson',
          comments: 'Excellent progress, strong technical foundation, good team player.',
          recommendation: 'regularize'
        },
        {
          id: 'pr2',
          type: 'Final Probation Review',
          date: '2024-01-05',
          overallScore: 4.5,
          maxScore: 5.0,
          status: 'completed',
          evaluator: 'Sarah Johnson',
          comments: 'Outstanding performance, ready for regularization.',
          recommendation: 'regularize'
        }
      ],
      compensationChanges: {
        probationary: {
          salary: 45000,
          allowances: ['Training Allowance'],
          bonuses: [],
          leaves: 10
        },
        regularized: {
          salary: 55000,
          allowances: ['Mobile Allowance', 'Transportation Allowance'],
          bonuses: ['Sign-in Bonus', 'Attendance Bonus'],
          leaves: 20
        },
        effectiveDate: '2024-01-16',
        status: 'pending'
      },
      documents: [
        {
          name: 'Regularization Notice',
          status: 'signed',
          dueDate: '2024-01-08',
          lastUpdated: '2024-01-08'
        },
        {
          name: 'Updated Contract',
          status: 'pending',
          dueDate: '2024-01-12',
          lastUpdated: '2024-01-10'
        },
        {
          name: 'Company Policy and Handbook',
          status: 'pending',
          dueDate: '2024-01-15',
          lastUpdated: '2024-01-10'
        },
        {
          name: 'Agreements (NDA/Non-Compete)',
          status: 'pending',
          dueDate: '2024-01-15',
          lastUpdated: '2024-01-10'
        }
      ]
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

  const getGoalsCompletion = () => {
    if (!employeeData) return 0;
    const completed = employeeData.assessmentGoals.filter(goal => goal.status === 'completed').length;
    return Math.round((completed / employeeData.assessmentGoals.length) * 100);
  };

  const getAverageReviewScore = () => {
    if (!employeeData || employeeData.performanceReviews.length === 0) return 0;
    const totalScore = employeeData.performanceReviews.reduce((sum, review) => sum + review.overallScore, 0);
    return Math.round((totalScore / employeeData.performanceReviews.length) * 10) / 10;
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
          <Tab label="Goals" />
          <Tab label="Reviews" />
          <Tab label="Compensation" />
          <Tab label="Documents" />
          <Tab label="Assets" />
          <Tab label="Checklist" />
        </Tabs>

        {/* Dashboard Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Probationary Employee Dashboard
            </Typography>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={3}>
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
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold' }}>
                      {getGoalsCompletion()}%
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Goals Achieved
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="info.main" sx={{ fontWeight: 'bold' }}>
                      {getAverageReviewScore()}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Avg Review Score
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="warning.main" sx={{ fontWeight: 'bold' }}>
                      {employeeData.performanceReviews.length}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Reviews Completed
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Quick Status Overview */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AssignmentIcon color="primary" />
                      Regularization Checklist Status
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Progress: {getCompletionPercentage()}% ({employeeData.checklistItems.filter(item => item.completed).length}/{employeeData.checklistItems.length} items)
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={getCompletionPercentage()}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Next due: {employeeData.checklistItems.find(item => !item.completed)?.dueDate ? 
                        new Date(employeeData.checklistItems.find(item => !item.completed)!.dueDate!).toLocaleDateString() : 'All completed'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon color="primary" />
                      Performance Review Results
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Latest Score: {employeeData.performanceReviews[employeeData.performanceReviews.length - 1]?.overallScore || 'N/A'}/5.0
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Recommendation: {employeeData.performanceReviews[employeeData.performanceReviews.length - 1]?.recommendation || 'N/A'}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Status: {employeeData.performanceReviews[employeeData.performanceReviews.length - 1]?.status || 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Job Changes Summary */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkIcon color="primary" />
                  Job Changes Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">Salary Change</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      ${employeeData.compensationChanges.probationary.salary.toLocaleString()} → ${employeeData.compensationChanges.regularized.salary.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">Effective Date</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {new Date(employeeData.compensationChanges.effectiveDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">New Allowances</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {employeeData.compensationChanges.regularized.allowances.join(', ')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">New Bonuses</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {employeeData.compensationChanges.regularized.bonuses.join(', ')}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

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

        {/* Goals Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Assessment Goals
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Performance goals used for probationary evaluation and regularization decision.
            </Typography>

            <Grid container spacing={3}>
              {employeeData.assessmentGoals.map((goal) => (
                <Grid item xs={12} md={6} key={goal.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {goal.title}
                        </Typography>
                        <Chip 
                          label={goal.status.replace('-', ' ')} 
                          color={goal.status === 'completed' ? 'success' : goal.status === 'in-progress' ? 'warning' : 'default'}
                          size="small"
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {goal.description}
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary">Target:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{goal.target}</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                          Weight: {goal.weight}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Category: {goal.category}
                        </Typography>
                      </Box>
                      
                      {goal.score !== undefined && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" color="text.secondary">Score:</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {goal.score}/{goal.maxScore} ({Math.round((goal.score / goal.maxScore) * 100)}%)
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(goal.score / goal.maxScore) * 100}
                            sx={{ height: 6, borderRadius: 3, mt: 1 }}
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        {/* Reviews Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Performance Reviews
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Performance evaluation results determining probationary to regularized status transition.
            </Typography>

            <Grid container spacing={3}>
              {employeeData.performanceReviews.map((review) => (
                <Grid item xs={12} key={review.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {review.type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Date: {new Date(review.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Chip 
                            label={review.status} 
                            color={review.status === 'completed' ? 'success' : 'warning'}
                            size="small"
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                            {review.overallScore}/{review.maxScore}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>Evaluator:</strong> {review.evaluator}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>Comments:</strong> {review.comments}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Recommendation:</strong> 
                          <Chip 
                            label={review.recommendation} 
                            color={review.recommendation === 'regularize' ? 'success' : review.recommendation === 'extend' ? 'warning' : 'error'}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        {/* Compensation Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Compensation & Benefits
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Detailed comparison of current probationary vs. regularized compensation and benefits. Regularized values can be adjusted by admin.
            </Typography>

            {/* Salary Section */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AttachMoneyIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Salary</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>Current (Probationary)</Typography>
                        <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>
                          ${employeeData.compensationChanges.probationary.salary.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Annual salary during probation period
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>Regularized (Editable)</Typography>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            type="number"
                            value={employeeData.compensationChanges.regularized.salary}
                            onChange={(e) => setEmployeeData(prev => ({
                              ...prev!,
                              compensationChanges: {
                                ...prev!.compensationChanges,
                                regularized: {
                                  ...prev!.compensationChanges.regularized,
                                  salary: parseInt(e.target.value) || 0
                                }
                              }
                            }))}
                            sx={{ mb: 2 }}
                            InputProps={{
                              startAdornment: <Typography variant="h6" sx={{ mr: 1 }}>$</Typography>
                            }}
                          />
                        ) : (
                          <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                            ${employeeData.compensationChanges.regularized.salary.toLocaleString()}
                          </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary">
                          Annual salary after regularization
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                {/* Salary Change Highlight */}
                <Box sx={{ mt: 3, p: 3, backgroundColor: 'primary.light', borderRadius: 2, color: 'white' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                    💰 Salary Change Summary
                  </Typography>
                  <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        ${employeeData.compensationChanges.regularized.salary - employeeData.compensationChanges.probationary.salary}
                      </Typography>
                      <Typography variant="body2">Annual Increase</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {Math.round(((employeeData.compensationChanges.regularized.salary - employeeData.compensationChanges.probationary.salary) / employeeData.compensationChanges.probationary.salary) * 100)}%
                      </Typography>
                      <Typography variant="body2">Percentage Increase</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        ${Math.round((employeeData.compensationChanges.regularized.salary - employeeData.compensationChanges.probationary.salary) / 12)}
                      </Typography>
                      <Typography variant="body2">Monthly Increase</Typography>
                    </Grid>
                  </Grid>
                </Box>
                
                <Box sx={{ mt: 2, p: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Effective Date:</strong> {new Date(employeeData.compensationChanges.effectiveDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Status:</strong> 
                    <Chip 
                      label={employeeData.compensationChanges.status} 
                      color={employeeData.compensationChanges.status === 'approved' ? 'success' : 'warning'}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Benefits Section */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CardGiftcardIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Benefits</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Benefits comparison showing what continues, stops, and new benefits upon regularization.
                </Typography>
                
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Benefit Item</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Current (Probationary)</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Regularized</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Allowances */}
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.50' }}>Allowances</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ pl: 4 }}>Training Allowance</TableCell>
                        <TableCell>
                          <Chip label="Active" color="success" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label="Stopped" color="error" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label="Discontinued" color="warning" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ pl: 4 }}>Mobile Allowance</TableCell>
                        <TableCell>
                          <Chip label="None" color="default" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label="New" color="success" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label="Added" color="success" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ pl: 4 }}>Transportation Allowance</TableCell>
                        <TableCell>
                          <Chip label="None" color="default" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label="New" color="success" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label="Added" color="success" size="small" />
                        </TableCell>
                      </TableRow>
                      
                      {/* Bonuses */}
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.50' }}>Bonuses</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ pl: 4 }}>Sign-in Bonus</TableCell>
                        <TableCell>
                          <Chip label="None" color="default" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label="New" color="success" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label="Added" color="success" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ pl: 4 }}>Attendance Bonus</TableCell>
                        <TableCell>
                          <Chip label="None" color="default" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label="New" color="success" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label="Added" color="success" size="small" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>

            {/* Leaves Section */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EventNoteIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Leaves</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Leave credits earned during probationary period and available upon regularization.
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Leave Type</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Date Earned</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Credits Earned</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Credits Available</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Notes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Annual Leave</TableCell>
                        <TableCell>{new Date(employeeData.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {isEditing ? (
                            <TextField
                              type="number"
                              value={employeeData.compensationChanges.regularized.leaves}
                              onChange={(e) => setEmployeeData(prev => ({
                                ...prev!,
                                compensationChanges: {
                                  ...prev!.compensationChanges,
                                  regularized: {
                                    ...prev!.compensationChanges.regularized,
                                    leaves: parseInt(e.target.value) || 0
                                  }
                                }
                              }))}
                              size="small"
                              sx={{ width: 80 }}
                            />
                          ) : (
                            employeeData.compensationChanges.regularized.leaves
                          )} days
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={`${employeeData.compensationChanges.regularized.leaves} days`} 
                            color="success" 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>All earned credits become available upon regularization</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Sick Leave</TableCell>
                        <TableCell>{new Date(employeeData.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>5 days</TableCell>
                        <TableCell>
                          <Chip label="5 days" color="success" size="small" />
                        </TableCell>
                        <TableCell>Pro-rated based on probationary period</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Personal Leave</TableCell>
                        <TableCell>{new Date(employeeData.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>3 days</TableCell>
                        <TableCell>
                          <Chip label="3 days" color="success" size="small" />
                        </TableCell>
                        <TableCell>Available for personal emergencies</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                {/* Leave Summary */}
                <Box sx={{ mt: 3, p: 3, backgroundColor: 'info.light', borderRadius: 2, color: 'white' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                    📅 Leave Summary
                  </Typography>
                  <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {employeeData.compensationChanges.regularized.leaves + 5 + 3} days
                      </Typography>
                      <Typography variant="body2">Total Leave Credits</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {employeeData.compensationChanges.regularized.leaves - employeeData.compensationChanges.probationary.leaves} days
                      </Typography>
                      <Typography variant="body2">Additional Annual Leave</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {new Date(employeeData.compensationChanges.effectiveDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">Available From</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </TabPanel>

        {/* Documents Tab */}
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Documents
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Track the status of required documents for regularization.
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Document</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Last Updated</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeData.documents.map((doc) => (
                    <TableRow key={doc.name}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <DescriptionIcon color="action" />
                          {doc.name}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={doc.status} 
                          color={doc.status === 'signed' ? 'success' : doc.status === 'acknowledged' ? 'info' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{new Date(doc.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(doc.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outlined" size="small">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>

        {/* Assets Tab */}
        <TabPanel value={tabValue} index={5}>
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
        <TabPanel value={tabValue} index={6}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Regularization Checklist
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Track progress through the regularization process. All items must be completed for successful regularization.
            </Typography>

            {/* Progress Summary */}
            <Box sx={{ mb: 4, p: 3, backgroundColor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Overall Progress: {getCompletionPercentage()}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getCompletionPercentage()}
                sx={{ height: 12, borderRadius: 6, mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                {employeeData.checklistItems.filter(item => item.completed).length} of {employeeData.checklistItems.length} items completed
              </Typography>
            </Box>

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
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default ProbationaryEmployeeDetail;
