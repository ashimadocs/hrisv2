import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Switch,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
  Group as GroupIcon,
  Schedule as ScheduleIcon,
  Notifications as NotificationsIcon,
  AttachMoney as MoneyIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ReviewDetailData {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  deadlineDays: number;
  totalEmployees: number;
  completedReviews: number;
  avgRating: number;
  includesGoals: boolean;
  evaluators: string[];
  promotionBasis: boolean;
  salaryIncreaseBasis: boolean;
  incentivesBasis: boolean;
  salaryIncreaseType?: string;
  matrixPercentage?: number;
  manualAmount?: number;
  incentiveTypes: string[];
  notifications: boolean;
  autoReminders: boolean;
  escalationDays: number;
  requireManagerApproval: boolean;
  allowSelfNomination: boolean;
  includeCompetencies: boolean;
  ratingScale: string;
  weightedScoring: boolean;
  scope: {
    departments: string[];
    levels: string[];
    customEmployees: string[];
    includeContractors: boolean;
    includeManagers: boolean;
    includeSelfAssessment: boolean;
    includeManagerAssessment: boolean;
    includeDirectReportAssessment: boolean;
    includePeerAssessment: boolean;
    managerSelectionMethod: 'automatic' | 'manual';
    managerLevelsRequired: number;
    manualManagerSelections: string[][];
    peerCountRequired: number;
    selectedPeers: Array<{ name: string; status: string }>;
    directReportSelectionMethod: 'all' | 'random' | 'specific';
    directReportCount: number;
    specificDirectReports: string[];
  };
  content: {
    questions: Array<{
      id: string;
      text: string;
      type: 'rating' | 'text' | 'multiple-choice' | 'yes-no';
      required: boolean;
      category: string;
    }>;
    competencies: string[];
    goalsTemplate: string;
  };
  timeline: {
    selfAssessmentStart: string;
    selfAssessmentEnd: string;
    peerReviewStart: string;
    peerReviewEnd: string;
    managerReviewStart: string;
    managerReviewEnd: string;
    hrReviewStart: string;
    hrReviewEnd: string;
    finalizationDate: string;
  };
  payrollImpact: {
    promotionMatrix: Array<{
      rating: number;
      promotionProbability: number;
      salaryIncrease: number;
    }>;
    bonusStructure: Array<{
      rating: number;
      bonusPercentage: number;
      maxAmount: number;
    }>;
    incentiveRules: Array<{
      type: string;
      criteria: string;
      amount: number;
    }>;
  };
}

const ReviewDetail: React.FC = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewDetailData | null>(null);

  useEffect(() => {
    // Simulate fetching review data based on reviewId
    // In a real app, this would be an API call
    const mockData: ReviewDetailData = {
      id: reviewId || 'PR-001',
      name: 'Annual 360 Performance Review',
      description: 'Comprehensive annual performance evaluation for all employees including self-assessment, peer review, and manager evaluation.',
      type: 'Annual',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      deadlineDays: 30,
      totalEmployees: 45,
      completedReviews: 32,
      avgRating: 4.2,
      includesGoals: true,
      evaluators: ['Direct Manager', 'Peer Review', 'Self Assessment', 'HR Review'],
      promotionBasis: true,
      salaryIncreaseBasis: true,
      incentivesBasis: true,
      salaryIncreaseType: 'Matrix',
      matrixPercentage: 15,
      manualAmount: 0,
      incentiveTypes: ['Performance Bonus', 'Target Achievement', 'Recognition Award'],
      notifications: true,
      autoReminders: true,
      escalationDays: 7,
      requireManagerApproval: true,
      allowSelfNomination: false,
      includeCompetencies: true,
      ratingScale: '5-point',
      weightedScoring: true,
             scope: {
         departments: ['Engineering', 'Product', 'Sales', 'Marketing', 'HR'],
         levels: ['Junior', 'Mid-level', 'Senior', 'Manager', 'Director'],
         customEmployees: [],
         includeContractors: false,
         includeManagers: true,
         includeSelfAssessment: true,
         includeManagerAssessment: true,
         includeDirectReportAssessment: false,
         includePeerAssessment: true,
         managerSelectionMethod: 'automatic',
         managerLevelsRequired: 2,
         manualManagerSelections: [],
         peerCountRequired: 3,
         selectedPeers: [
           { name: 'Carlos Jiron', status: 'Completed' },
           { name: 'Moira Porter', status: 'Completed' },
           { name: 'Simon Fisher', status: 'Not Started' }
         ],
         directReportSelectionMethod: 'all',
         directReportCount: 3,
         specificDirectReports: [],
       },
      content: {
        questions: [
          {
            id: 'q1',
            text: 'How well does this employee meet their performance goals?',
            type: 'rating',
            required: true,
            category: 'Performance',
          },
          {
            id: 'q2',
            text: 'Rate the employee\'s technical skills and expertise.',
            type: 'rating',
            required: true,
            category: 'Technical Skills',
          },
          {
            id: 'q3',
            text: 'How effectively does this employee collaborate with team members?',
            type: 'rating',
            required: true,
            category: 'Collaboration',
          },
          {
            id: 'q4',
            text: 'Additional comments or feedback (optional)',
            type: 'text',
            required: false,
            category: 'General Feedback',
          },
        ],
        competencies: ['Technical Skills', 'Leadership', 'Communication', 'Innovation', 'Results Delivery'],
        goalsTemplate: 'SMART goals template with quarterly milestones and success metrics.',
      },
      timeline: {
        selfAssessmentStart: '2024-01-01',
        selfAssessmentEnd: '2024-01-15',
        peerReviewStart: '2024-01-16',
        peerReviewEnd: '2024-01-31',
        managerReviewStart: '2024-02-01',
        managerReviewEnd: '2024-02-15',
        hrReviewStart: '2024-02-16',
        hrReviewEnd: '2024-02-28',
        finalizationDate: '2024-03-15',
      },
      payrollImpact: {
        promotionMatrix: [
          { rating: 5.0, promotionProbability: 90, salaryIncrease: 20 },
          { rating: 4.5, promotionProbability: 75, salaryIncrease: 15 },
          { rating: 4.0, promotionProbability: 50, salaryIncrease: 10 },
          { rating: 3.5, promotionProbability: 25, salaryIncrease: 5 },
          { rating: 3.0, promotionProbability: 10, salaryIncrease: 2 },
        ],
        bonusStructure: [
          { rating: 5.0, bonusPercentage: 25, maxAmount: 10000 },
          { rating: 4.5, bonusPercentage: 20, maxAmount: 8000 },
          { rating: 4.0, bonusPercentage: 15, maxAmount: 6000 },
          { rating: 3.5, bonusPercentage: 10, maxAmount: 4000 },
          { rating: 3.0, bonusPercentage: 5, maxAmount: 2000 },
        ],
        incentiveRules: [
          { type: 'Performance Bonus', criteria: 'Rating >= 4.0', amount: 5000 },
          { type: 'Target Achievement', criteria: 'Goals met 100%', amount: 3000 },
          { type: 'Innovation Award', criteria: 'New process/idea implemented', amount: 2000 },
        ],
      },
    };

    setReviewData(mockData);
  }, [reviewId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBackToReviews = () => {
    navigate('/reviews');
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving review data:', reviewData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setIsEditing(false);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`review-detail-tabpanel-${index}`}
        aria-labelledby={`review-detail-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
      </div>
    );
  }

  if (!reviewData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Loading review details...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToReviews}
            sx={{ mb: 2 }}
          >
            Back to Reviews
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {reviewData.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review ID: {reviewData.id} • Status: {reviewData.status}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
          <Button
            variant="contained"
            endIcon={<MoreVertIcon />}
          >
            Actions
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Paper sx={{ width: '100%' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="review detail tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Basics" />
          <Tab label="Scope" />
          <Tab label="Content" />
          <Tab label="Timeline & Evaluators" />
          <Tab label="Notifications" />
          <Tab label="Payroll Impact" />
        </Tabs>

        {/* Basics Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              📋 Name and Description
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={reviewData.name}
                  onChange={(e) => setReviewData(prev => prev ? { ...prev, name: e.target.value } : null)}
                  disabled={!isEditing}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small">
                          <Typography variant="caption">A文</Typography>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Review Type</InputLabel>
                  <Select
                    label="Review Type"
                    value={reviewData.type}
                    onChange={(e) => setReviewData(prev => prev ? { ...prev, type: e.target.value } : null)}
                    disabled={!isEditing}
                  >
                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                    <MenuItem value="Annual">Annual</MenuItem>
                    <MenuItem value="Semi-annual">Semi-annual</MenuItem>
                    <MenuItem value="One-time">One-time</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={reviewData.description}
                  onChange={(e) => setReviewData(prev => prev ? { ...prev, description: e.target.value } : null)}
                  disabled={!isEditing}
                  placeholder="Guidelines for participants (optional)"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small">
                          <Typography variant="caption">A文</Typography>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* Rich Text Editor Toolbar */}
                <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 1 }}>B</Button>
                  <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 1 }}><em>I</em></Button>
                  <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 1 }}><s>S</s></Button>
                  <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 1 }}>U</Button>
                  <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 1 }}>&lt;/&gt;</Button>
                  <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 1 }}>🔗</Button>
                  <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 1 }}>H</Button>
                  <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 1 }}>•</Button>
                  <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 1 }}>☰</Button>
                  <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 1 }}>😊</Button>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              ⏰ Timeline Settings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={reviewData.startDate}
                  onChange={(e) => setReviewData(prev => prev ? { ...prev, startDate: e.target.value } : null)}
                  disabled={!isEditing}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={reviewData.endDate}
                  onChange={(e) => setReviewData(prev => prev ? { ...prev, endDate: e.target.value } : null)}
                  disabled={!isEditing}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Days Before Deadline"
                  type="number"
                  value={reviewData.deadlineDays}
                  onChange={(e) => setReviewData(prev => prev ? { ...prev, deadlineDays: parseInt(e.target.value) || 0 } : null)}
                  disabled={!isEditing}
                  inputProps={{ min: 1, max: 365 }}
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Scope Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              🎯 Review Scope
            </Typography>
            
            {/* 1. Employees Included */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
                1. Employees Included
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select which employees will be included in this review
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Departments</InputLabel>
                    <Select
                      label="Departments"
                      multiple
                      value={reviewData.scope.departments}
                      onChange={(e) => setReviewData(prev => prev ? {
                        ...prev,
                        scope: { ...prev.scope, departments: e.target.value as string[] }
                      } : null)}
                      disabled={!isEditing}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      <MenuItem value="Engineering">Engineering</MenuItem>
                      <MenuItem value="Product">Product</MenuItem>
                      <MenuItem value="Sales">Sales</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                      <MenuItem value="HR">HR</MenuItem>
                      <MenuItem value="Finance">Finance</MenuItem>
                      <MenuItem value="Operations">Operations</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Employee Levels</InputLabel>
                    <Select
                      label="Employee Levels"
                      multiple
                      value={reviewData.scope.levels}
                      onChange={(e) => setReviewData(prev => prev ? {
                        ...prev,
                        scope: { ...prev.scope, levels: e.target.value as string[] }
                      } : null)}
                      disabled={!isEditing}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      <MenuItem value="Junior">Junior</MenuItem>
                      <MenuItem value="Mid-level">Mid-level</MenuItem>
                      <MenuItem value="Senior">Senior</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Director">Director</MenuItem>
                      <MenuItem value="Executive">Executive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reviewData.scope.includeContractors}
                        onChange={(e) => setReviewData(prev => prev ? {
                          ...prev,
                          scope: { ...prev.scope, includeContractors: e.target.checked }
                        } : null)}
                        disabled={!isEditing}
                      />
                    }
                    label="Include Contractors"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reviewData.scope.includeManagers}
                        onChange={(e) => setReviewData(prev => prev ? {
                          ...prev,
                          scope: { ...prev.scope, includeManagers: e.target.checked }
                        } : null)}
                        disabled={!isEditing}
                      />
                    }
                    label="Include Managers"
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* 2. Assessment Included */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
                2. Assessment Included
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select which assessment stages are included in the review pipeline
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card 
                    sx={{ 
                      p: 2, 
                      border: reviewData.scope.includeSelfAssessment ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      backgroundColor: reviewData.scope.includeSelfAssessment ? '#f3f8ff' : 'white'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        backgroundColor: '#fff3e0', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#f57c00'
                      }}>
                        🔄
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Self-Assessment
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Participants reflect on their own performance
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={reviewData.scope.includeSelfAssessment}
                            onChange={(e) => setReviewData(prev => prev ? {
                              ...prev,
                              scope: { ...prev.scope, includeSelfAssessment: e.target.checked }
                            } : null)}
                            disabled={!isEditing}
                          />
                        }
                        label=""
                      />
                    </Box>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card 
                    sx={{ 
                      p: 2, 
                      border: reviewData.scope.includeManagerAssessment ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      backgroundColor: reviewData.scope.includeManagerAssessment ? '#f3f8ff' : 'white'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        backgroundColor: '#e3f2fd', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#1976d2'
                      }}>
                        ⬇️
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Managers
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Direct managers of employees provide feedback
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={reviewData.scope.includeManagerAssessment}
                            onChange={(e) => setReviewData(prev => prev ? {
                              ...prev,
                              scope: { ...prev.scope, includeManagerAssessment: e.target.checked }
                            } : null)}
                            disabled={!isEditing}
                          />
                        }
                        label=""
                      />
                    </Box>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card 
                    sx={{ 
                      p: 2, 
                      border: reviewData.scope.includeDirectReportAssessment ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      backgroundColor: reviewData.scope.includeDirectReportAssessment ? '#f3f8ff' : 'white'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        backgroundColor: '#e8f5e8', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#2e7d32'
                      }}>
                        ⬆️
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Direct reports
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Employees provide feedback to their direct managers
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={reviewData.scope.includeDirectReportAssessment}
                            onChange={(e) => setReviewData(prev => prev ? {
                              ...prev,
                              scope: { ...prev.scope, includeDirectReportAssessment: e.target.checked }
                            } : null)}
                            disabled={!isEditing}
                          />
                        }
                        label=""
                      />
                    </Box>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card 
                    sx={{ 
                      p: 2, 
                      border: reviewData.scope.includePeerAssessment ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      backgroundColor: reviewData.scope.includePeerAssessment ? '#f3f8ff' : 'white'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        backgroundColor: '#fce4ec', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#c2185b'
                      }}>
                        ↔️
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Peers
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Other colleagues provide feedback to participants
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={reviewData.scope.includePeerAssessment}
                            onChange={(e) => setReviewData(prev => prev ? {
                              ...prev,
                              scope: { ...prev.scope, includePeerAssessment: e.target.checked }
                            } : null)}
                            disabled={!isEditing}
                          />
                        }
                        label=""
                      />
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* 3. Evaluators */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
                3. Evaluators
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Configure evaluators for each selected assessment type
              </Typography>
              
              {/* Manager Assessment Section */}
              {reviewData.scope.includeManagerAssessment && (
                <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                    Manager Assessment
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Selection Method</InputLabel>
                        <Select
                          label="Selection Method"
                          value={reviewData.scope.managerSelectionMethod || 'automatic'}
                                                     onChange={(e) => setReviewData(prev => prev ? {
                             ...prev,
                             scope: { ...prev.scope, managerSelectionMethod: e.target.value as 'automatic' | 'manual' }
                           } : null)}
                          disabled={!isEditing}
                        >
                          <MenuItem value="automatic">Automatically based on reporting line</MenuItem>
                          <MenuItem value="manual">Manually selected</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Number of Levels Required"
                        type="number"
                        value={reviewData.scope.managerLevelsRequired || 1}
                        onChange={(e) => setReviewData(prev => prev ? {
                          ...prev,
                          scope: { ...prev.scope, managerLevelsRequired: parseInt(e.target.value) || 1 }
                        } : null)}
                        disabled={!isEditing}
                        inputProps={{ min: 1, max: 5 }}
                        helperText="How many management levels to include"
                      />
                    </Grid>
                    
                    {reviewData.scope.managerSelectionMethod === 'manual' && (
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Select specific managers for each level:
                        </Typography>
                        {Array.from({ length: reviewData.scope.managerLevelsRequired || 1 }, (_, index) => (
                          <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                              Level {index + 1} Managers
                            </Typography>
                            <FormControl fullWidth>
                              <InputLabel>Select Managers</InputLabel>
                              <Select
                                label="Select Managers"
                                multiple
                                value={reviewData.scope.manualManagerSelections?.[index] || []}
                                onChange={(e) => {
                                  const newSelections = [...(reviewData.scope.manualManagerSelections || [])];
                                  newSelections[index] = e.target.value as string[];
                                  setReviewData(prev => prev ? {
                                    ...prev,
                                    scope: { ...prev.scope, manualManagerSelections: newSelections }
                                  } : null);
                                }}
                                disabled={!isEditing}
                                renderValue={(selected) => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {(selected as string[]).map((value) => (
                                      <Chip key={value} label={value} size="small" />
                                    ))}
                                  </Box>
                                )}
                              >
                                <MenuItem value="Sarah Wilson">Sarah Wilson</MenuItem>
                                <MenuItem value="David Lee">David Lee</MenuItem>
                                <MenuItem value="John Doe">John Doe</MenuItem>
                                <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}

              {/* Peer Assessment Section */}
              {reviewData.scope.includePeerAssessment && (
                <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                    Peer Assessment
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Number of Peers Required"
                        type="number"
                        value={reviewData.scope.peerCountRequired || 2}
                        onChange={(e) => setReviewData(prev => prev ? {
                          ...prev,
                          scope: { ...prev.scope, peerCountRequired: parseInt(e.target.value) || 2 }
                        } : null)}
                        disabled={!isEditing}
                        inputProps={{ min: 2, max: 10 }}
                        helperText="Select between 2 to 10 peers"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Nominate people you worked closely with on your projects
                      </Typography>
                      
                      <TextField
                        fullWidth
                        placeholder="Search for Peer"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              🔍
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {reviewData.scope.selectedPeers?.map((peer, index) => (
                          <Chip
                            key={index}
                            label={peer.name}
                            onDelete={isEditing ? () => {
                              const newPeers = reviewData.scope.selectedPeers?.filter((_, i) => i !== index) || [];
                              setReviewData(prev => prev ? {
                                ...prev,
                                scope: { ...prev.scope, selectedPeers: newPeers }
                              } : null);
                            } : undefined}
                            sx={{ 
                              backgroundColor: peer.status === 'Completed' ? '#e8f5e8' : '#f5f5f5',
                              color: peer.status === 'Completed' ? '#2e7d32' : 'text.primary'
                            }}
                          />
                        ))}
                      </Box>
                      
                      {isEditing && (
                        <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                          Add Peer
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Direct Report Assessment Section */}
              {reviewData.scope.includeDirectReportAssessment && (
                <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                    Direct Report Assessment
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Selection Method</InputLabel>
                        <Select
                          label="Selection Method"
                          value={reviewData.scope.directReportSelectionMethod || 'all'}
                                                     onChange={(e) => setReviewData(prev => prev ? {
                             ...prev,
                             scope: { ...prev.scope, directReportSelectionMethod: e.target.value as 'all' | 'random' | 'specific' }
                           } : null)}
                          disabled={!isEditing}
                        >
                          <MenuItem value="all">All direct reports</MenuItem>
                          <MenuItem value="random">Randomly chosen (specify number)</MenuItem>
                          <MenuItem value="specific">Specifically selected by admin</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    {reviewData.scope.directReportSelectionMethod === 'random' && (
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Number of Direct Reports"
                          type="number"
                          value={reviewData.scope.directReportCount || 3}
                          onChange={(e) => setReviewData(prev => prev ? {
                            ...prev,
                            scope: { ...prev.scope, directReportCount: parseInt(e.target.value) || 3 }
                          } : null)}
                          disabled={!isEditing}
                          inputProps={{ min: 1, max: 20 }}
                          helperText="How many direct reports to randomly select"
                        />
                      </Grid>
                    )}
                    
                    {reviewData.scope.directReportSelectionMethod === 'specific' && (
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Select specific direct reports:
                        </Typography>
                        <FormControl fullWidth>
                          <InputLabel>Select Direct Reports</InputLabel>
                          <Select
                            label="Select Direct Reports"
                            multiple
                            value={reviewData.scope.specificDirectReports || []}
                            onChange={(e) => setReviewData(prev => prev ? {
                              ...prev,
                              scope: { ...prev.scope, specificDirectReports: e.target.value as string[] }
                            } : null)}
                            disabled={!isEditing}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as string[]).map((value) => (
                                  <Chip key={value} label={value} size="small" />
                                ))}
                              </Box>
                            )}
                          >
                            <MenuItem value="Mike Johnson">Mike Johnson</MenuItem>
                            <MenuItem value="Emily Brown">Emily Brown</MenuItem>
                            <MenuItem value="Alex Turner">Alex Turner</MenuItem>
                            <MenuItem value="Chris Martin">Chris Martin</MenuItem>
                            <MenuItem value="Lisa Anderson">Lisa Anderson</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        </TabPanel>

        {/* Content Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              📝 Review Content
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>Review Questions</Typography>
                <List>
                  {reviewData.content.questions.map((question) => (
                    <ListItem key={question.id} divider>
                      <ListItemText
                        primary={question.text}
                        secondary={`Type: ${question.type} • Category: ${question.category} • Required: ${question.required ? 'Yes' : 'No'}`}
                      />
                      {isEditing && (
                        <ListItemSecondaryAction>
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                  ))}
                </List>
                {isEditing && (
                  <Button variant="outlined" startIcon={<EditIcon />} sx={{ mt: 2 }}>
                    Add Question
                  </Button>
                )}
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>Competencies</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {reviewData.content.competencies.map((competency) => (
                    <Chip key={competency} label={competency} />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Timeline & Evaluators Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              ⏱️ Timeline & Evaluators
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>Evaluators</Typography>
                <FormControl fullWidth>
                  <InputLabel>Evaluator Types</InputLabel>
                  <Select
                    label="Evaluator Types"
                    multiple
                    value={reviewData.evaluators}
                    onChange={(e) => setReviewData(prev => prev ? { ...prev, evaluators: e.target.value as string[] } : null)}
                    disabled={!isEditing}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="Direct Manager">Direct Manager</MenuItem>
                    <MenuItem value="Peer Review">Peer Review</MenuItem>
                    <MenuItem value="Self Assessment">Self Assessment</MenuItem>
                    <MenuItem value="Department Head">Department Head</MenuItem>
                    <MenuItem value="HR Review">HR Review</MenuItem>
                    <MenuItem value="Skip Level Manager">Skip Level Manager</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>Timeline</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Self Assessment: {new Date(reviewData.timeline.selfAssessmentStart).toLocaleDateString()} - {new Date(reviewData.timeline.selfAssessmentEnd).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Peer Review: {new Date(reviewData.timeline.peerReviewStart).toLocaleDateString()} - {new Date(reviewData.timeline.peerReviewEnd).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Manager Review: {new Date(reviewData.timeline.managerReviewStart).toLocaleDateString()} - {new Date(reviewData.timeline.managerReviewEnd).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              🔔 Notification Settings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={reviewData.notifications}
                      onChange={(e) => setReviewData(prev => prev ? { ...prev, notifications: e.target.checked } : null)}
                      disabled={!isEditing}
                    />
                  }
                  label="Enable Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={reviewData.autoReminders}
                      onChange={(e) => setReviewData(prev => prev ? { ...prev, autoReminders: e.target.checked } : null)}
                      disabled={!isEditing}
                    />
                  }
                  label="Auto Reminders"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Escalation Days"
                  type="number"
                  value={reviewData.escalationDays}
                  onChange={(e) => setReviewData(prev => prev ? { ...prev, escalationDays: parseInt(e.target.value) || 0 } : null)}
                  disabled={!isEditing}
                  helperText="Days before escalating to manager"
                  inputProps={{ min: 1, max: 30 }}
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Payroll Impact Tab */}
        <TabPanel value={tabValue} index={5}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              💰 Payroll Impact
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>Promotion Matrix</Typography>
                <Card>
                  <CardContent>
                    {reviewData.payrollImpact.promotionMatrix.map((item, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2">Rating {item.rating}</Typography>
                          <Typography variant="body2" color="primary">
                            {item.promotionProbability}% promotion • +{item.salaryIncrease}% salary
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={item.promotionProbability} 
                          sx={{ height: 6 }}
                        />
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>Bonus Structure</Typography>
                <Card>
                  <CardContent>
                    {reviewData.payrollImpact.bonusStructure.map((item, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2">Rating {item.rating}</Typography>
                          <Typography variant="body2" color="primary">
                            {item.bonusPercentage}% bonus • Max ${item.maxAmount.toLocaleString()}
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(item.bonusPercentage / 25) * 100} 
                          sx={{ height: 6 }}
                        />
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>Incentive Rules</Typography>
                <List>
                  {reviewData.payrollImpact.incentiveRules.map((rule, index) => (
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={rule.type}
                        secondary={`Criteria: ${rule.criteria}`}
                      />
                      <Typography variant="h6" color="primary">
                        ${rule.amount.toLocaleString()}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default ReviewDetail;
