import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Collapse,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import RequiredQualificationsField from '../components/RequiredQualifications/RequiredQualificationsField';

interface JobRequisition {
  id: string;
  title: string;
  department: string;
  reportsTo: string;
  requisitionOwner: string;
  requisitionReason: 'replacement' | 'internal transfer' | 'new position' | 'backfill (loa)' | 'seasonal needs' | 'restructure' | 'others';
  salaryRange: string;
  benefits: string;
  otherBenefits: string;
  startDate: string;
  requiredQualifications: string[];
  location: string;
  remoteWork: boolean;
  type: string;
  status: string;
  constantRecruitment: boolean;
  createdDate: string;
  applicants: number;
}

const JobRequisitions: React.FC = () => {
  const [requisitions, setRequisitions] = useState<JobRequisition[]>([
    {
      id: 'job1',
      title: 'Senior Software Developer',
      department: 'Engineering',
      reportsTo: 'Engineering Director',
      requisitionOwner: 'John Smith',
      requisitionReason: 'new position',
      salaryRange: '$120,000 - $150,000',
      benefits: 'Health insurance, 401k, flexible PTO',
      otherBenefits: '$10,000 signing bonus',
      startDate: '2024-03-01',
      requiredQualifications: ['Bachelor\'s degree in Computer Science', '5+ years experience', 'Java, Python, JavaScript', 'Git, GitHub', 'SQL, MongoDB'],
      location: 'San Francisco, CA',
      remoteWork: true,
      type: 'Full-time',
      status: 'Open',
      constantRecruitment: false,
      createdDate: '2025-08-15',
      applicants: 12,
    },
    {
      id: 'job2',
      title: 'Marketing Manager',
      department: 'Marketing',
      reportsTo: 'VP of Marketing',
      requisitionOwner: 'Sarah Johnson',
      requisitionReason: 'replacement',
      salaryRange: '$80,000 - $100,000',
      benefits: 'Health insurance, dental, vision, 401k',
      otherBenefits: '$5,000 relocation bonus',
      startDate: '2024-02-15',
      requiredQualifications: ['Bachelor\'s degree in Marketing', '3+ years experience', 'SEO / SEM', 'Mailchimp, Hubspot', 'Data Analysis and Google Analytics'],
      location: 'New York, NY',
      remoteWork: false,
      type: 'Full-time',
      status: 'Open',
      constantRecruitment: false,
      createdDate: '2025-08-10',
      applicants: 8,
    },
    {
      id: 'job3',
      title: 'Product Manager',
      department: 'Product',
      reportsTo: 'Head of Product',
      requisitionOwner: 'Mike Davis',
      requisitionReason: 'new position',
      salaryRange: '$100,000 - $130,000',
      benefits: 'Comprehensive health benefits, stock options',
      otherBenefits: '$15,000 signing bonus',
      startDate: '2024-02-20',
      requiredQualifications: ['MBA preferred', '4+ years product management experience', 'strategic planning', 'budget management', 'critical thinking'],
      location: 'Austin, TX',
      remoteWork: true,
      type: 'Full-time',
      status: 'Draft',
      constantRecruitment: false,
      createdDate: '2025-08-13',
      applicants: 0,
    },
    {
      id: 'job4',
      title: 'UX Designer',
      department: 'Design',
      reportsTo: 'Design Director',
      requisitionOwner: 'Lisa Chen',
      requisitionReason: 'backfill (loa)',
      salaryRange: '$90,000 - $110,000',
      benefits: 'Health insurance, flexible work arrangements',
      otherBenefits: 'Flexible start date',
      startDate: '2024-02-10',
      requiredQualifications: ['Bachelor\'s degree in Design', '3+ years UX experience', 'Figma, Sketch, Adobe XD', 'Usability Testing', 'Information Architecture'],
      location: 'Seattle, WA',
      remoteWork: true,
      type: 'Full-time',
      status: 'Closed',
      constantRecruitment: false,
      createdDate: '2025-08-11',
      applicants: 15,
    },
    {
      id: 'job5',
      title: 'Sales Representative',
      department: 'Sales',
      reportsTo: 'Sales Manager',
      requisitionOwner: 'David Wilson',
      requisitionReason: 'seasonal needs',
      salaryRange: '$60,000 - $80,000',
      benefits: 'Health insurance, commission structure',
      otherBenefits: 'Performance-based bonuses',
      startDate: '2024-02-01',
      requiredQualifications: ['High school diploma', '2+ years sales experience', 'Salesforce, HubSpot', 'Cold Calling', 'Sales Funnel Management'],
      location: 'Chicago, IL',
      remoteWork: false,
      type: 'Full-time',
      status: 'Draft',
      constantRecruitment: false,
      createdDate: '2025-08-14',
      applicants: 0,
    },
    {
      id: 'job6',
      title: 'Customer Support (Non Voice) Staff',
      department: 'Customer Support',
      reportsTo: 'Support Manager',
      requisitionOwner: 'Emma Rodriguez',
      requisitionReason: 'new position',
      salaryRange: '$35,000 - $45,000',
      benefits: 'Health insurance, 401k, professional development',
      otherBenefits: '$3,000 signing bonus',
      startDate: '2024-03-15',
      requiredQualifications: ['High school diploma', '1+ year customer service experience', 'Written communication skills', 'Problem-solving abilities', 'CRM software proficiency'],
      location: 'Remote',
      remoteWork: true,
      type: 'Full-time',
      status: 'Open',
      constantRecruitment: true,
      createdDate: '2025-08-15',
      applicants: 25,
    },
    {
      id: 'job7',
      title: 'Technical Support (Voice) Staff',
      department: 'Technical Support',
      reportsTo: 'Technical Support Manager',
      requisitionOwner: 'Alex Thompson',
      requisitionReason: 'new position',
      salaryRange: '$40,000 - $50,000',
      benefits: 'Health insurance, dental, vision, 401k',
      otherBenefits: '$5,000 performance bonus',
      startDate: '2024-02-28',
      requiredQualifications: ['Associate\'s degree in IT or related field', '2+ years technical support experience', 'Phone support skills', 'Technical troubleshooting', 'Customer relationship management'],
      location: 'Remote',
      remoteWork: true,
      type: 'Full-time',
      status: 'Open',
      constantRecruitment: true,
      createdDate: '2025-08-20',
      applicants: 18,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState<JobRequisition | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requiredQualifications, setRequiredQualifications] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRemoteOptions, setSelectedRemoteOptions] = useState<string[]>([]);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortBy, setSortBy] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleCreateRequisition = () => {
    setSelectedRequisition(null);
    setOpenDialog(true);
  };

  const handleEditRequisition = (requisition: JobRequisition) => {
    setSelectedRequisition(requisition);
    setJobTitle(requisition.title);
    setJobDescription('');
    setRequiredQualifications(requisition.requiredQualifications);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequisition(null);
    setJobTitle('');
    setJobDescription('');
    setRequiredQualifications([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'success';
      case 'In Review':
        return 'warning';
      case 'Closed':
        return 'error';
      default:
        return 'default';
    }
  };

  // Calculate days since posting for open requisitions
  const getDaysSincePosting = (createdDate: string) => {
    const created = new Date(createdDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format status with days count for open requisitions
  const formatStatus = (status: string, createdDate: string, constantRecruitment: boolean) => {
    if (status === 'Open') {
      if (constantRecruitment) {
        return 'Open - for pooling';
      }
      const days = getDaysSincePosting(createdDate);
      return `Open - ${days} days`;
    }
    return status;
  };

  // Filter and search logic
  const filteredRequisitions = useMemo(() => {
    let filtered = requisitions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(requisition =>
        requisition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        requisition.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        requisition.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        requisition.requisitionOwner.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(requisition =>
        selectedStatuses.includes(requisition.status)
      );
    }

    // Department filter
    if (selectedDepartments.length > 0) {
      filtered = filtered.filter(requisition =>
        selectedDepartments.includes(requisition.department)
      );
    }

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(requisition =>
        selectedLocations.includes(requisition.location)
      );
    }

    // Remote work filter
    if (selectedRemoteOptions.length > 0) {
      filtered = filtered.filter(requisition => {
        const isRemote = requisition.remoteWork ? 'Remote' : 'On-site';
        return selectedRemoteOptions.includes(isRemote);
      });
    }

    // Reason filter
    if (selectedReasons.length > 0) {
      filtered = filtered.filter(requisition =>
        selectedReasons.includes(requisition.requisitionReason)
      );
    }

    // Date range filter
    if (dateFrom || dateTo) {
      filtered = filtered.filter(requisition => {
        const startDate = new Date(requisition.startDate);
        const fromDate = dateFrom ? new Date(dateFrom) : null;
        const toDate = dateTo ? new Date(dateTo) : null;

        if (fromDate && toDate) {
          return startDate >= fromDate && startDate <= toDate;
        } else if (fromDate) {
          return startDate >= fromDate;
        } else if (toDate) {
          return startDate <= toDate;
        }
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'department':
          aValue = a.department;
          bValue = b.department;
          break;
        case 'createdDate':
          aValue = new Date(a.createdDate);
          bValue = new Date(b.createdDate);
          break;
        case 'applicants':
          aValue = a.applicants;
          bValue = b.applicants;
          break;
        default:
          aValue = new Date(a.createdDate);
          bValue = new Date(b.createdDate);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [requisitions, searchTerm, selectedStatuses, selectedDepartments, selectedLocations, selectedRemoteOptions, selectedReasons, dateFrom, dateTo, sortBy, sortOrder]);

  const handleStatusFilterChange = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleDepartmentFilterChange = (department: string) => {
    setSelectedDepartments(prev =>
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const handleLocationFilterChange = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const handleRemoteFilterChange = (remoteOption: string) => {
    setSelectedRemoteOptions(prev =>
      prev.includes(remoteOption)
        ? prev.filter(r => r !== remoteOption)
        : [...prev, remoteOption]
    );
  };

  const handleReasonFilterChange = (reason: string) => {
    setSelectedReasons(prev =>
      prev.includes(reason)
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSelectedDepartments([]);
    setSelectedLocations([]);
    setSelectedRemoteOptions([]);
    setSelectedReasons([]);
    setSearchTerm('');
    setDateFrom('');
    setDateTo('');
  };

  // Get unique departments for filter
  const uniqueDepartments = useMemo(() => {
    const departments = requisitions.map(req => req.department);
    return departments.filter((dept, index) => departments.indexOf(dept) === index);
  }, [requisitions]);

  // Get unique locations for filter
  const uniqueLocations = useMemo(() => {
    const locations = requisitions.map(req => req.location);
    return locations.filter((loc, index) => locations.indexOf(loc) === index);
  }, [requisitions]);

  // Get unique reasons for filter
  const uniqueReasons = useMemo(() => {
    const reasons = requisitions.map(req => req.requisitionReason);
    return reasons.filter((reason, index) => reasons.indexOf(reason) === index);
  }, [requisitions]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Job Requisitions</Typography>
        <Box display="flex" gap={1} alignItems="center">
          {/* Search Field */}
          <TextField
            size="small"
            placeholder="Search requisitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              width: 250,
              '& .MuiOutlinedInput-root': {
                fontSize: '0.875rem',
                height: 36
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title="Filters & Sort">
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderColor: 'primary.main'
                }
              }}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateRequisition}>
            Create Requisition
          </Button>
        </Box>
      </Box>

      {/* Filters Panel */}
      <Collapse in={showFilters}>
        <Paper sx={{ p: 2, mb: 2, backgroundColor: '#fafafa' }}>
          {/* Header with Clear */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <FilterIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Filters
              </Typography>
            </Box>
            {(selectedStatuses.length > 0 || selectedDepartments.length > 0 || selectedLocations.length > 0 || selectedRemoteOptions.length > 0 || selectedReasons.length > 0 || searchTerm || dateFrom || dateTo) && (
              <Button
                size="small"
                onClick={clearFilters}
                sx={{
                  minWidth: 'auto',
                  px: 1,
                  fontSize: '0.75rem',
                  textTransform: 'none'
                }}
              >
                Clear
              </Button>
            )}
          </Box>

          {/* Compact Filter Options */}
          <Box display="flex" gap={3} flexWrap="wrap">
            {/* Sort Options */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Sort:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  displayEmpty
                  sx={{ fontSize: '0.75rem' }}
                >
                  <MenuItem value="title" sx={{ fontSize: '0.75rem' }}>Job Title</MenuItem>
                  <MenuItem value="department" sx={{ fontSize: '0.75rem' }}>Department</MenuItem>
                  <MenuItem value="createdDate" sx={{ fontSize: '0.75rem' }}>Created Date</MenuItem>
                  <MenuItem value="applicants" sx={{ fontSize: '0.75rem' }}>Applicants</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  displayEmpty
                  sx={{ fontSize: '0.75rem' }}
                >
                  <MenuItem value="asc" sx={{ fontSize: '0.75rem' }}>↑ Asc</MenuItem>
                  <MenuItem value="desc" sx={{ fontSize: '0.75rem' }}>↓ Desc</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Status Filter */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Status:
              </Typography>
              <Box display="flex" gap={0.5} flexWrap="wrap">
                {['Open', 'Draft', 'Closed'].map((status) => (
                  <Chip
                    key={status}
                    label={status}
                    size="small"
                    variant={selectedStatuses.includes(status) ? "filled" : "outlined"}
                    onClick={() => handleStatusFilterChange(status)}
                    sx={{
                      fontSize: '0.65rem',
                      height: 20,
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Department Filter */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Department:
              </Typography>
              <Box display="flex" gap={0.5} flexWrap="wrap">
                {uniqueDepartments.map((department) => (
                  <Chip
                    key={department}
                    label={department}
                    size="small"
                    variant={selectedDepartments.includes(department) ? "filled" : "outlined"}
                    onClick={() => handleDepartmentFilterChange(department)}
                    sx={{
                      fontSize: '0.65rem',
                      height: 20,
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Location Filter */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Location:
              </Typography>
              <Box display="flex" gap={0.5} flexWrap="wrap">
                {uniqueLocations.map((location) => (
                  <Chip
                    key={location}
                    label={location}
                    size="small"
                    variant={selectedLocations.includes(location) ? "filled" : "outlined"}
                    onClick={() => handleLocationFilterChange(location)}
                    sx={{
                      fontSize: '0.65rem',
                      height: 20,
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Remote Work Filter */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Work Type:
              </Typography>
              <Box display="flex" gap={0.5} flexWrap="wrap">
                {['Remote', 'On-site'].map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    size="small"
                    variant={selectedRemoteOptions.includes(option) ? "filled" : "outlined"}
                    onClick={() => handleRemoteFilterChange(option)}
                    sx={{
                      fontSize: '0.65rem',
                      height: 20,
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Reason Filter */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Reason:
              </Typography>
              <Box display="flex" gap={0.5} flexWrap="wrap">
                {uniqueReasons.map((reason) => (
                  <Chip
                    key={reason}
                    label={reason}
                    size="small"
                    variant={selectedReasons.includes(reason) ? "filled" : "outlined"}
                    onClick={() => handleReasonFilterChange(reason)}
                    sx={{
                      fontSize: '0.65rem',
                      height: 20,
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Date Range Filter */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Start Date:
              </Typography>
              <Box display="flex" gap={1} alignItems="center">
                <TextField
                  size="small"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  placeholder="From"
                  sx={{
                    width: 130,
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.75rem',
                      height: 28
                    }
                  }}
                  InputLabelProps={{ shrink: true }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  to
                </Typography>
                <TextField
                  size="small"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  placeholder="To"
                  sx={{
                    width: 130,
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.75rem',
                      height: 28
                    }
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Collapse>

      <Grid container spacing={3}>
        {filteredRequisitions.map((requisition) => (
          <Grid item xs={12} md={6} lg={4} key={requisition.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {requisition.title}
                    </Typography>
                    <Chip
                      label={formatStatus(requisition.status, requisition.createdDate, requisition.constantRecruitment)}
                      color={getStatusColor(requisition.status) as any}
                      size="small"
                    />
                  </Box>
                  <WorkIcon color="primary" />
                </Box>

                <Box mb={2}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <BusinessIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="textSecondary">
                      {requisition.department}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="textSecondary">
                      {requisition.location}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <ScheduleIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="textSecondary">
                      Start: {requisition.startDate}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="textSecondary">
                    {requisition.applicants} applicants
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleEditRequisition(requisition)}
                  >
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Requisition Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="lg" 
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, flexShrink: 0 }}>
          {selectedRequisition ? 'Edit Job Requisition' : 'Create Job Requisition'}
        </DialogTitle>
        <DialogContent sx={{ 
          pt: 2, 
          pb: 1,
          overflow: 'auto',
          flex: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a8a8a8',
          },
        }}>
          <Grid container spacing={1.5} sx={{ pt: 1 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter job title..."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Department</InputLabel>
                <Select label="Department" defaultValue={selectedRequisition?.department || ''}>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Product">Product</MenuItem>
                  <MenuItem value="Customer Support">Customer Support</MenuItem>
                  <MenuItem value="Technical Support">Technical Support</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Reports To"
                defaultValue={selectedRequisition?.reportsTo || ''}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Requisition Owner"
                defaultValue={selectedRequisition?.requisitionOwner || ''}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Requisition Reason</InputLabel>
                <Select label="Requisition Reason" defaultValue={selectedRequisition?.requisitionReason || ''}>
                  <MenuItem value="replacement">Replacement</MenuItem>
                  <MenuItem value="internal transfer">Internal Transfer</MenuItem>
                  <MenuItem value="new position">New Position</MenuItem>
                  <MenuItem value="backfill (loa)">Backfill (LOA)</MenuItem>
                  <MenuItem value="seasonal needs">Seasonal Needs</MenuItem>
                  <MenuItem value="restructure">Restructure</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Salary Range"
                defaultValue={selectedRequisition?.salaryRange || ''}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Location"
                defaultValue={selectedRequisition?.location || ''}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Employment Type</InputLabel>
                <Select label="Employment Type" defaultValue={selectedRequisition?.type || ''}>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Remote Work</InputLabel>
                <Select label="Remote Work" defaultValue={selectedRequisition?.remoteWork ? 'yes' : 'no'}>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Start Date"
                type="date"
                defaultValue={selectedRequisition?.startDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={selectedRequisition?.constantRecruitment || false}
                    color="primary"
                  />
                }
                label="Constant recruitment / for pooling"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Job Description"
                multiline
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Enter detailed job description..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Benefits"
                multiline
                rows={2}
                defaultValue={selectedRequisition?.benefits || ''}
                placeholder="Enter benefits description..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Other Benefits"
                multiline
                rows={2}
                defaultValue={selectedRequisition?.otherBenefits || ''}
                placeholder="Signing bonus, etc..."
              />
            </Grid>
            <Grid item xs={12}>
              <RequiredQualificationsField
                value={requiredQualifications}
                onChange={setRequiredQualifications}
                jobTitle={jobTitle}
                jobDescription={jobDescription}
                fieldLabel="Requirements"
                buttonText="Add custom requirement"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ 
          pt: 1, 
          pb: 2, 
          flexShrink: 0,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button size="small" onClick={handleCloseDialog}>Cancel</Button>
          <Button size="small" variant="contained">
            {selectedRequisition ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobRequisitions; 