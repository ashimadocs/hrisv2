import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Switch,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Star as StarIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface PerformanceReview {
  id: string;
  name: string;
  type: 'One-time' | 'Quarterly' | 'Annual' | 'Semi-annual';
  status: 'Active' | 'Completed' | 'Draft' | 'Archived';
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
  salaryIncreaseType?: 'Matrix' | 'Manual';
  matrixPercentage?: number;
  manualAmount?: number;
  incentiveTypes: string[];
  notifications: boolean;
  createdAt: string;
  createdBy: string;
}

const Reviews: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Form state for new review creation
  const [formData, setFormData] = useState({
    reviewName: '',
    reviewType: '',
    startDate: '',
    endDate: '',
    deadlineDays: 30,
    notifications: true,
    includeEmployees: [],
    includeGoals: false,
    evaluators: [],
    promotionBasis: false,
    salaryIncreaseBasis: false,
    salaryIncreaseType: 'matrix',
    matrixPercentage: 15,
    manualAmount: 0,
    incentivesBasis: false,
    incentiveTypes: [],
    description: '',
    autoReminders: true,
    escalationDays: 7,
    requireManagerApproval: true,
    allowSelfNomination: false,
    includeCompetencies: true,
    ratingScale: '5-point',
    minimumRating: 1,
    maximumRating: 5,
    weightedScoring: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReviewClick = (reviewId: string) => {
    navigate(`/review-detail/${reviewId}`);
  };

  // Form handlers
  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Required field validations
    if (!formData.reviewName.trim()) {
      errors.reviewName = 'Review name is required';
    }
    if (!formData.reviewType) {
      errors.reviewType = 'Review type is required';
    }
    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      errors.endDate = 'End date is required';
    }
    if (formData.deadlineDays < 1) {
      errors.deadlineDays = 'Deadline days must be at least 1';
    }
    if (formData.evaluators.length === 0) {
      errors.evaluators = 'At least one evaluator type must be selected';
    }
    if (formData.includeEmployees.length === 0) {
      errors.includeEmployees = 'Employee selection is required';
    }

    // Date validation
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (startDate >= endDate) {
        errors.endDate = 'End date must be after start date';
      }
    }

    // Salary increase validation
    if (formData.salaryIncreaseBasis) {
      if (formData.salaryIncreaseType === 'matrix' && formData.matrixPercentage <= 0) {
        errors.matrixPercentage = 'Matrix percentage must be greater than 0';
      }
      if (formData.salaryIncreaseType === 'manual' && formData.manualAmount <= 0) {
        errors.manualAmount = 'Manual amount must be greater than 0';
      }
    }

    // Incentives validation
    if (formData.incentivesBasis && formData.incentiveTypes.length === 0) {
      errors.incentiveTypes = 'At least one incentive type must be selected when incentives basis is enabled';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateReview = () => {
    if (!validateForm()) {
      return;
    }

    // Create new review object
    const newReview: PerformanceReview = {
      id: `PR-${String(performanceReviews.length + 1).padStart(3, '0')}`,
      name: formData.reviewName,
      type: formData.reviewType as 'One-time' | 'Quarterly' | 'Annual' | 'Semi-annual',
      status: 'Draft',
      startDate: formData.startDate,
      endDate: formData.endDate,
      deadlineDays: formData.deadlineDays,
      totalEmployees: 0, // Would be calculated based on employee selection
      completedReviews: 0,
      avgRating: 0,
      includesGoals: formData.includeGoals,
      evaluators: formData.evaluators,
      promotionBasis: formData.promotionBasis,
      salaryIncreaseBasis: formData.salaryIncreaseBasis,
      incentivesBasis: formData.incentivesBasis,
      salaryIncreaseType: formData.salaryIncreaseType as 'Matrix' | 'Manual',
      matrixPercentage: formData.matrixPercentage,
      manualAmount: formData.manualAmount,
      incentiveTypes: formData.incentiveTypes,
      notifications: formData.notifications,
      createdAt: new Date().toISOString(),
      createdBy: 'Current User' // Would be actual user
    };

    // Here you would typically send the data to your backend API
    console.log('Creating new review:', newReview);
    
    // Reset form and close dialog
    resetForm();
    setCreateDialogOpen(false);
    
    // Show success message (you might want to add a snackbar or toast)
    alert('Performance review created successfully!');
  };

  const resetForm = () => {
    setFormData({
      reviewName: '',
      reviewType: '',
      startDate: '',
      endDate: '',
      deadlineDays: 30,
      notifications: true,
      includeEmployees: [],
      includeGoals: false,
      evaluators: [],
      promotionBasis: false,
      salaryIncreaseBasis: false,
      salaryIncreaseType: 'matrix',
      matrixPercentage: 15,
      manualAmount: 0,
      incentivesBasis: false,
      incentiveTypes: [],
      description: '',
      autoReminders: true,
      escalationDays: 7,
      requireManagerApproval: true,
      allowSelfNomination: false,
      includeCompetencies: true,
      ratingScale: '5-point',
      minimumRating: 1,
      maximumRating: 5,
      weightedScoring: false,
    });
    setFormErrors({});
  };

  const handleDialogClose = () => {
    setCreateDialogOpen(false);
    resetForm();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sample data for Performance Reviews
  const performanceReviews: PerformanceReview[] = [
    {
      id: 'PR-001',
      name: 'Q4 2024 Performance Review',
      type: 'Quarterly',
      status: 'Active',
      startDate: '2024-10-01',
      endDate: '2024-12-31',
      deadlineDays: 30,
      totalEmployees: 45,
      completedReviews: 32,
      avgRating: 4.2,
      includesGoals: true,
      evaluators: ['Direct Manager', 'Peer Review', 'Self Assessment'],
      promotionBasis: true,
      salaryIncreaseBasis: true,
      incentivesBasis: true,
      salaryIncreaseType: 'Matrix',
      matrixPercentage: 15,
      incentiveTypes: ['Performance Bonus', 'Target Achievement'],
      notifications: true,
      createdAt: '2024-09-15',
      createdBy: 'HR Manager'
    },
    {
      id: 'PR-002',
      name: 'Annual 2024 Review',
      type: 'Annual',
      status: 'Completed',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      deadlineDays: 45,
      totalEmployees: 45,
      completedReviews: 45,
      avgRating: 4.1,
      includesGoals: true,
      evaluators: ['Direct Manager', 'Department Head', 'HR Review'],
      promotionBasis: true,
      salaryIncreaseBasis: true,
      incentivesBasis: true,
      salaryIncreaseType: 'Matrix',
      matrixPercentage: 20,
      incentiveTypes: ['Annual Bonus', 'Long-term Incentives'],
      notifications: true,
      createdAt: '2023-12-01',
      createdBy: 'HR Director'
    },
    {
      id: 'PR-003',
      name: 'Mid-Year 2024 Assessment',
      type: 'Semi-annual',
      status: 'Completed',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      deadlineDays: 30,
      totalEmployees: 45,
      completedReviews: 45,
      avgRating: 4.0,
      includesGoals: true,
      evaluators: ['Direct Manager'],
      promotionBasis: false,
      salaryIncreaseBasis: false,
      incentivesBasis: true,
      incentiveTypes: ['Mid-year Bonus'],
      notifications: true,
      createdAt: '2023-12-15',
      createdBy: 'HR Manager'
    }
  ];

  // Dashboard statistics
  const dashboardStats = {
    totalReviews: performanceReviews.length,
    activeReviews: performanceReviews.filter(r => r.status === 'Active').length,
    completedReviews: performanceReviews.filter(r => r.status === 'Completed').length,
    totalEmployees: performanceReviews.reduce((acc, r) => acc + r.totalEmployees, 0),
    completedEmployees: performanceReviews.reduce((acc, r) => acc + r.completedReviews, 0),
    avgRating: performanceReviews.length > 0 ? 
      (performanceReviews.reduce((acc, r) => acc + r.avgRating, 0) / performanceReviews.length).toFixed(1) : '0.0'
  };

  // Filtered reviews for table
  const filteredReviews = performanceReviews.filter(review => {
    const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || review.status === statusFilter;
    const matchesType = typeFilter === 'All' || review.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const paginatedReviews = filteredReviews.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Completed': return 'primary';
      case 'Draft': return 'warning';
      case 'Archived': return 'default';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Quarterly': return 'info';
      case 'Annual': return 'primary';
      case 'Semi-annual': return 'secondary';
      case 'One-time': return 'warning';
      default: return 'default';
    }
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`reviews-tabpanel-${index}`}
        aria-labelledby={`reviews-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Reviews Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage performance reviews and probationary assessments with comprehensive tracking and earnings integration
        </Typography>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="review types"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Performance Reviews" />
          <Tab label="Probationary Reviews" />
        </Tabs>

        {/* Performance Reviews Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            {/* Dashboard Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Dashboard
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setCreateDialogOpen(true)}
                >
                  Create New Review
                </Button>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={2}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                        {dashboardStats.totalReviews}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Reviews
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                        {dashboardStats.activeReviews}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Active Reviews
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="info.main" sx={{ fontWeight: 'bold' }}>
                        {dashboardStats.completedReviews}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Completed
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>
                        {dashboardStats.totalEmployees}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Employees
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                        {dashboardStats.completedEmployees}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Reviews Done
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                        {dashboardStats.avgRating}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Avg Rating
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Review History Table Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                Review History
              </Typography>

              {/* Search and Filters */}
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      placeholder="Search reviews..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={statusFilter}
                        label="Status"
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <MenuItem value="All">All Statuses</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Draft">Draft</MenuItem>
                        <MenuItem value="Archived">Archived</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={typeFilter}
                        label="Type"
                        onChange={(e) => setTypeFilter(e.target.value)}
                      >
                        <MenuItem value="All">All Types</MenuItem>
                        <MenuItem value="Quarterly">Quarterly</MenuItem>
                        <MenuItem value="Annual">Annual</MenuItem>
                        <MenuItem value="Semi-annual">Semi-annual</MenuItem>
                        <MenuItem value="One-time">One-time</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="outlined"
                      startIcon={<FilterIcon />}
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('All');
                        setTypeFilter('All');
                      }}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              {/* Reviews Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Review ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Period</TableCell>
                      <TableCell>Employees</TableCell>
                      <TableCell>Progress</TableCell>
                      <TableCell>Avg Rating</TableCell>
                      <TableCell>Earnings Impact</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedReviews.map((review) => (
                      <TableRow 
                        key={review.id} 
                        hover 
                        onClick={() => handleReviewClick(review.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {review.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {review.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Created by {review.createdBy}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={review.type} 
                            color={getTypeColor(review.type) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={review.status} 
                            color={getStatusColor(review.status) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(review.startDate).toLocaleDateString()} - {new Date(review.endDate).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {review.completedReviews}/{review.totalEmployees}
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={(review.completedReviews / review.totalEmployees) * 100} 
                            sx={{ height: 4, mt: 1 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {review.completedReviews}/{review.totalEmployees}
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={(review.completedReviews / review.totalEmployees) * 100} 
                            sx={{ height: 4, mt: 1 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <StarIcon color="primary" fontSize="small" />
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {review.avgRating}/5.0
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {review.promotionBasis && (
                              <Chip label="Promotion" size="small" color="success" variant="outlined" />
                            )}
                            {review.salaryIncreaseBasis && (
                              <Chip 
                                label={review.salaryIncreaseType === 'Matrix' ? 
                                  `Salary +${review.matrixPercentage}%` : 'Manual Amount'} 
                                size="small" 
                                color="primary" 
                                variant="outlined" 
                              />
                            )}
                            {review.incentivesBasis && (
                              <Chip label="Incentives" size="small" color="warning" variant="outlined" />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredReviews.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Box>
          </Box>
        </TabPanel>

        {/* Probationary Reviews Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              Probationary Reviews
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Manage probationary period assessments and regularization processes
            </Typography>
            
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Coming Soon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Probationary review management features will be implemented here, including:
                </Typography>
                <Box component="ul" sx={{ mt: 2, pl: 2 }}>
                  <Typography component="li" variant="body2" color="text.secondary">
                    Probationary period tracking
                  </Typography>
                  <Typography component="li" variant="body2" color="text.secondary">
                    Regularization workflow management
                  </Typography>
                  <Typography component="li" variant="body2" color="text.secondary">
                    Performance assessment during probation
                  </Typography>
                  <Typography component="li" variant="body2" color="text.secondary">
                    Extension or termination decisions
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>
      </Paper>

      {/* Create New Review Dialog */}
      <Dialog 
        open={createDialogOpen} 
        onClose={handleDialogClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { maxHeight: '90vh' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AddIcon color="primary" />
            Create New Performance Review
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                  📋 Basic Information
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Review Name"
                  placeholder="e.g., Q1 2025 Performance Review"
                  value={formData.reviewName}
                  onChange={(e) => handleFormChange('reviewName', e.target.value)}
                  error={!!formErrors.reviewName}
                  helperText={formErrors.reviewName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required error={!!formErrors.reviewType}>
                  <InputLabel>Review Type</InputLabel>
                  <Select 
                    label="Review Type"
                    value={formData.reviewType}
                    onChange={(e) => handleFormChange('reviewType', e.target.value)}
                  >
                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                    <MenuItem value="Annual">Annual</MenuItem>
                    <MenuItem value="Semi-annual">Semi-annual</MenuItem>
                    <MenuItem value="One-time">One-time</MenuItem>
                  </Select>
                  {formErrors.reviewType && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                      {formErrors.reviewType}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  placeholder="Brief description of this performance review cycle..."
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.startDate}
                  onChange={(e) => handleFormChange('startDate', e.target.value)}
                  error={!!formErrors.startDate}
                  helperText={formErrors.startDate}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.endDate}
                  onChange={(e) => handleFormChange('endDate', e.target.value)}
                  error={!!formErrors.endDate}
                  helperText={formErrors.endDate}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  label="Days Before Deadline"
                  type="number"
                  placeholder="30"
                  value={formData.deadlineDays}
                  onChange={(e) => handleFormChange('deadlineDays', parseInt(e.target.value) || 0)}
                  error={!!formErrors.deadlineDays}
                  helperText={formErrors.deadlineDays || 'Days to notify before review deadline'}
                  inputProps={{ min: 1, max: 365 }}
                />
              </Grid>

              {/* Notification Settings */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                  🔔 Notification Settings
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={formData.notifications}
                      onChange={(e) => handleFormChange('notifications', e.target.checked)}
                    />
                  }
                  label="Enable Notifications"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={formData.autoReminders}
                      onChange={(e) => handleFormChange('autoReminders', e.target.checked)}
                    />
                  }
                  label="Auto Reminders"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Escalation Days"
                  type="number"
                  value={formData.escalationDays}
                  onChange={(e) => handleFormChange('escalationDays', parseInt(e.target.value) || 0)}
                  helperText="Days before escalating to manager"
                  inputProps={{ min: 1, max: 30 }}
                />
              </Grid>

              {/* Employee Selection */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                  👥 Employee Selection
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!formErrors.includeEmployees}>
                  <InputLabel>Include Employees</InputLabel>
                  <Select 
                    label="Include Employees" 
                    multiple
                    value={formData.includeEmployees}
                    onChange={(e) => handleFormChange('includeEmployees', e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="all">All Employees</MenuItem>
                    <MenuItem value="department">By Department</MenuItem>
                    <MenuItem value="level">By Level</MenuItem>
                    <MenuItem value="custom">Custom Selection</MenuItem>
                    <MenuItem value="managers">Managers Only</MenuItem>
                    <MenuItem value="non-managers">Non-Managers Only</MenuItem>
                  </Select>
                  {formErrors.includeEmployees && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                      {formErrors.includeEmployees}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Review Configuration */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                  ⚙️ Review Configuration
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required error={!!formErrors.evaluators}>
                  <InputLabel>Evaluators</InputLabel>
                  <Select 
                    label="Evaluators" 
                    multiple
                    value={formData.evaluators}
                    onChange={(e) => handleFormChange('evaluators', e.target.value)}
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
                  {formErrors.evaluators && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                      {formErrors.evaluators}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Rating Scale</InputLabel>
                  <Select 
                    label="Rating Scale"
                    value={formData.ratingScale}
                    onChange={(e) => handleFormChange('ratingScale', e.target.value)}
                  >
                    <MenuItem value="3-point">3-Point Scale (1-3)</MenuItem>
                    <MenuItem value="5-point">5-Point Scale (1-5)</MenuItem>
                    <MenuItem value="10-point">10-Point Scale (1-10)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={formData.includeGoals}
                      onChange={(e) => handleFormChange('includeGoals', e.target.checked)}
                    />
                  }
                  label="Include Goals Assessment"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={formData.includeCompetencies}
                      onChange={(e) => handleFormChange('includeCompetencies', e.target.checked)}
                    />
                  }
                  label="Include Competencies"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={formData.weightedScoring}
                      onChange={(e) => handleFormChange('weightedScoring', e.target.checked)}
                    />
                  }
                  label="Weighted Scoring"
                />
              </Grid>

              {/* Approval Settings */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                  ✅ Approval Settings
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={formData.requireManagerApproval}
                      onChange={(e) => handleFormChange('requireManagerApproval', e.target.checked)}
                    />
                  }
                  label="Require Manager Approval"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={formData.allowSelfNomination}
                      onChange={(e) => handleFormChange('allowSelfNomination', e.target.checked)}
                    />
                  }
                  label="Allow Self-Nomination for Promotion"
                />
              </Grid>

              {/* Earnings Impact Configuration */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                  💰 Earnings Impact Configuration
                </Typography>
              </Grid>
              
              {/* Promotion Basis */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={formData.promotionBasis}
                      onChange={(e) => handleFormChange('promotionBasis', e.target.checked)}
                    />
                  }
                  label="Use as basis for Promotion/Job Change"
                />
              </Grid>

              {/* Salary Increase Basis */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={formData.salaryIncreaseBasis}
                      onChange={(e) => handleFormChange('salaryIncreaseBasis', e.target.checked)}
                    />
                  }
                  label="Use as basis for Salary Increase"
                />
              </Grid>
              
              {formData.salaryIncreaseBasis && (
                <>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Salary Increase Type</InputLabel>
                      <Select 
                        label="Salary Increase Type"
                        value={formData.salaryIncreaseType}
                        onChange={(e) => handleFormChange('salaryIncreaseType', e.target.value)}
                      >
                        <MenuItem value="matrix">Pre-set Performance Rating Matrix (% of salary)</MenuItem>
                        <MenuItem value="manual">Manual Amount</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {formData.salaryIncreaseType === 'matrix' ? (
                      <TextField
                        fullWidth
                        label="Matrix Percentage"
                        type="number"
                        placeholder="15"
                        value={formData.matrixPercentage}
                        onChange={(e) => handleFormChange('matrixPercentage', parseFloat(e.target.value) || 0)}
                        error={!!formErrors.matrixPercentage}
                        helperText={formErrors.matrixPercentage || 'Percentage increase based on performance rating'}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        inputProps={{ min: 0, max: 100, step: 0.5 }}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        label="Manual Amount"
                        type="number"
                        placeholder="5000"
                        value={formData.manualAmount}
                        onChange={(e) => handleFormChange('manualAmount', parseFloat(e.target.value) || 0)}
                        error={!!formErrors.manualAmount}
                        helperText={formErrors.manualAmount || 'Fixed amount for salary increase'}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        inputProps={{ min: 0, step: 100 }}
                      />
                    )}
                  </Grid>
                </>
              )}

              {/* Incentives Basis */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={formData.incentivesBasis}
                      onChange={(e) => handleFormChange('incentivesBasis', e.target.checked)}
                    />
                  }
                  label="Use as basis for Incentives"
                />
              </Grid>
              
              {formData.incentivesBasis && (
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!formErrors.incentiveTypes}>
                    <InputLabel>Incentive Types</InputLabel>
                    <Select 
                      label="Incentive Types" 
                      multiple
                      value={formData.incentiveTypes}
                      onChange={(e) => handleFormChange('incentiveTypes', e.target.value)}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      <MenuItem value="Performance Bonus">Performance Bonus</MenuItem>
                      <MenuItem value="Target Achievement Bonus">Target Achievement Bonus</MenuItem>
                      <MenuItem value="Allowance">Allowance</MenuItem>
                      <MenuItem value="Other Earnings">Other Earnings</MenuItem>
                      <MenuItem value="Target Disbursement">Target Disbursement</MenuItem>
                      <MenuItem value="Recognition Award">Recognition Award</MenuItem>
                      <MenuItem value="Retention Bonus">Retention Bonus</MenuItem>
                    </Select>
                    {formErrors.incentiveTypes && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                        {formErrors.incentiveTypes}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={handleDialogClose} size="large">
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCreateReview}
            size="large"
            startIcon={<AddIcon />}
          >
            Create Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reviews;
