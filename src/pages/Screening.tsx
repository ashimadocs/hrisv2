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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Rating,
  Slider,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Tabs,
  Tab,
  Collapse,
  InputAdornment,
  FormGroup,
  Checkbox,
  Pagination,
} from '@mui/material';
import {
  Add as AddIcon,
  Upload as UploadIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

interface ParsedResume {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  position: string;
  experience: number;
  education: string;
  skills: string[];
  score: number;
  status: 'parsed' | 'reviewed' | 'shortlisted' | 'rejected' | 'pending';
  parsedData: {
    contact: {
      name: string;
      email: string;
      phone: string;
      location: string;
    };
    experience: {
      company: string;
      position: string;
      duration: string;
      description: string;
    }[];
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
    skills: string[];
  };
}

interface ScreeningRule {
  id: string;
  name: string;
  criteria: string;
  type: 'keyword' | 'experience' | 'education' | 'skill';
  value: string;
  weight: number;
  active: boolean;
}

const Screening: React.FC = () => {
  const [parsedResumes, setParsedResumes] = useState<ParsedResume[]>([
    {
      id: '1',
      candidateName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Developer',
      experience: 5,
      education: 'Bachelor in Computer Science',
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
      score: 85,
      status: 'shortlisted',
      parsedData: {
        contact: {
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
        },
        experience: [
          {
            company: 'Tech Corp',
            position: 'Senior Developer',
            duration: '2020-2023',
            description: 'Led development of React applications',
          },
          {
            company: 'Startup Inc',
            position: 'Developer',
            duration: '2018-2020',
            description: 'Full-stack development with Node.js',
          },
        ],
        education: [
          {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University of California',
            year: '2018',
          },
        ],
        skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'],
      },
    },
    {
      id: '2',
      candidateName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      position: 'Marketing Manager',
      experience: 3,
      education: 'MBA in Marketing',
      skills: ['Digital Marketing', 'SEO', 'Google Analytics', 'Social Media'],
      score: 72,
      status: 'shortlisted',
      parsedData: {
        contact: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 234-5678',
          location: 'New York, NY',
        },
        experience: [
          {
            company: 'Marketing Agency',
            position: 'Marketing Specialist',
            duration: '2021-2023',
            description: 'Managed digital marketing campaigns',
          },
        ],
        education: [
          {
            degree: 'MBA in Marketing',
            institution: 'New York University',
            year: '2021',
          },
        ],
        skills: ['Digital Marketing', 'SEO', 'Google Analytics', 'Social Media', 'Content Creation'],
      },
    },
    {
      id: '3',
      candidateName: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1 (555) 345-6789',
      position: 'Product Manager',
      experience: 7,
      education: 'MBA in Business Administration',
      skills: ['Product Management', 'Agile', 'Scrum', 'User Research', 'Data Analysis'],
      score: 78,
      status: 'shortlisted',
      parsedData: {
        contact: {
          name: 'Mike Davis',
          email: 'mike.davis@email.com',
          phone: '+1 (555) 345-6789',
          location: 'Austin, TX',
        },
        experience: [
          {
            company: 'Tech Corp',
            position: 'Product Manager',
            duration: '2020-2023',
            description: 'Led product development initiatives',
          },
        ],
        education: [
          {
            degree: 'MBA in Business Administration',
            institution: 'University of Texas',
            year: '2020',
          },
        ],
        skills: ['Product Management', 'Agile', 'Scrum', 'User Research', 'Data Analysis'],
      },
    },
    {
      id: '4',
      candidateName: 'Lisa Chen',
      email: 'lisa.chen@email.com',
      phone: '+1 (555) 456-7890',
      position: 'UX Designer',
      experience: 4,
      education: 'Bachelor in Design',
      skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      score: 82,
      status: 'shortlisted',
      parsedData: {
        contact: {
          name: 'Lisa Chen',
          email: 'lisa.chen@email.com',
          phone: '+1 (555) 456-7890',
          location: 'Seattle, WA',
        },
        experience: [
          {
            company: 'Design Studio',
            position: 'UX Designer',
            duration: '2021-2023',
            description: 'Created user-centered design solutions',
          },
        ],
        education: [
          {
            degree: 'Bachelor in Design',
            institution: 'Art Institute',
            year: '2021',
          },
        ],
        skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      },
    },
    {
      id: '5',
      candidateName: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 567-8901',
      position: 'Sales Representative',
      experience: 2,
      education: 'Bachelor in Business',
      skills: ['Sales', 'CRM', 'Negotiation', 'Customer Relations', 'Lead Generation'],
      score: 68,
      status: 'shortlisted',
      parsedData: {
        contact: {
          name: 'David Wilson',
          email: 'david.wilson@email.com',
          phone: '+1 (555) 567-8901',
          location: 'Chicago, IL',
        },
        experience: [
          {
            company: 'Sales Corp',
            position: 'Sales Representative',
            duration: '2022-2023',
            description: 'Exceeded sales targets consistently',
          },
        ],
        education: [
          {
            degree: 'Bachelor in Business',
            institution: 'Chicago University',
            year: '2022',
          },
        ],
        skills: ['Sales', 'CRM', 'Negotiation', 'Customer Relations', 'Lead Generation'],
      },
    },
    {
      id: '6',
      candidateName: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 678-9012',
      position: 'Senior Developer',
      experience: 6,
      education: 'Master in Computer Science',
      skills: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kubernetes'],
      score: 88,
      status: 'shortlisted',
      parsedData: {
        contact: {
          name: 'Emily Rodriguez',
          email: 'emily.rodriguez@email.com',
          phone: '+1 (555) 678-9012',
          location: 'San Francisco, CA',
        },
        experience: [
          {
            company: 'Tech Corp',
            position: 'Senior Developer',
            duration: '2019-2023',
            description: 'Developed scalable backend systems',
          },
        ],
        education: [
          {
            degree: 'Master in Computer Science',
            institution: 'Stanford University',
            year: '2019',
          },
        ],
        skills: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kubernetes'],
      },
    },
    {
      id: '7',
      candidateName: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      phone: '+1 (555) 789-0123',
      position: 'Product Manager',
      experience: 8,
      education: 'MBA in Technology Management',
      skills: ['Product Strategy', 'Market Analysis', 'Team Leadership', 'Data Analytics'],
      score: 91,
      status: 'shortlisted',
      parsedData: {
        contact: {
          name: 'Alex Thompson',
          email: 'alex.thompson@email.com',
          phone: '+1 (555) 789-0123',
          location: 'Austin, TX',
        },
        experience: [
          {
            company: 'Tech Corp',
            position: 'Product Manager',
            duration: '2018-2023',
            description: 'Led successful product launches',
          },
        ],
        education: [
          {
            degree: 'MBA in Technology Management',
            institution: 'MIT',
            year: '2018',
          },
        ],
        skills: ['Product Strategy', 'Market Analysis', 'Team Leadership', 'Data Analytics'],
      },
    },
    {
      id: '8',
      candidateName: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 890-1234',
      position: 'UX Designer',
      experience: 5,
      education: 'Bachelor in Graphic Design',
      skills: ['UI/UX Design', 'Adobe Creative Suite', 'User Testing', 'Design Systems'],
      score: 75,
      status: 'shortlisted',
      parsedData: {
        contact: {
          name: 'Maria Garcia',
          email: 'maria.garcia@email.com',
          phone: '+1 (555) 890-1234',
          location: 'Seattle, WA',
        },
        experience: [
          {
            company: 'Design Studio',
            position: 'UX Designer',
            duration: '2020-2023',
            description: 'Created intuitive user interfaces',
          },
        ],
        education: [
          {
            degree: 'Bachelor in Graphic Design',
            institution: 'Art Institute',
            year: '2020',
          },
        ],
        skills: ['UI/UX Design', 'Adobe Creative Suite', 'User Testing', 'Design Systems'],
      },
    },
  ]);

  const [screeningRules, setScreeningRules] = useState<ScreeningRule[]>([
    {
      id: '1',
      name: 'React Experience',
      criteria: 'Must have React experience',
      type: 'skill',
      value: 'React',
      weight: 10,
      active: true,
    },
    {
      id: '2',
      name: 'Minimum Experience',
      criteria: 'At least 3 years of experience',
      type: 'experience',
      value: '3',
      weight: 8,
      active: true,
    },
    {
      id: '3',
      name: 'Education Level',
      criteria: 'Bachelor degree required',
      type: 'education',
      value: 'Bachelor',
      weight: 5,
      active: true,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedResume, setSelectedResume] = useState<ParsedResume | null>(null);
  const [openRuleDialog, setOpenRuleDialog] = useState(false);
  const [selectedRule, setSelectedRule] = useState<ScreeningRule | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openAddToShortlistDialog, setOpenAddToShortlistDialog] = useState(false);
  const [searchApplicantTerm, setSearchApplicantTerm] = useState('');
  
  // Filter and sort state
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'experience'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 4 cards per row * 2 rows

  const handleViewResume = (resume: ParsedResume) => {
    setSelectedResume(resume);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedResume(null);
  };

  const handleCreateRule = () => {
    setSelectedRule(null);
    setOpenRuleDialog(true);
  };

  const handleEditRule = (rule: ScreeningRule) => {
    setSelectedRule(rule);
    setOpenRuleDialog(true);
  };

  const handleCloseRuleDialog = () => {
    setOpenRuleDialog(false);
    setSelectedRule(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Job requisitions data
  const jobRequisitions = [
    { id: 'job1', title: 'Senior Software Developer', department: 'Engineering', status: 'open', location: 'San Francisco, CA' },
    { id: 'job2', title: 'Marketing Manager', department: 'Marketing', status: 'open', location: 'New York, NY' },
    { id: 'job3', title: 'Product Manager', department: 'Product', status: 'open', location: 'Austin, TX' },
    { id: 'job4', title: 'UX Designer', department: 'Design', status: 'open', location: 'Seattle, WA' },
    { id: 'job5', title: 'Sales Representative', department: 'Sales', status: 'open', location: 'Chicago, IL' },
  ];

  // Separate lists for different purposes
  const allApplicants = [
    ...parsedResumes,
    // Add pending candidates separately
    {
      id: '9',
      candidateName: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 901-2345',
      position: 'Marketing Manager',
      experience: 4,
      education: 'Bachelor in Marketing',
      skills: ['Social Media', 'Content Creation', 'Brand Management', 'Analytics'],
      score: 58,
      status: 'pending' as const,
      parsedData: {
        contact: {
          name: 'James Wilson',
          email: 'james.wilson@email.com',
          phone: '+1 (555) 901-2345',
          location: 'New York, NY',
        },
        experience: [
          {
            company: 'Marketing Agency',
            position: 'Marketing Specialist',
            duration: '2020-2023',
            description: 'Managed social media campaigns',
          },
        ],
        education: [
          {
            degree: 'Bachelor in Marketing',
            institution: 'New York University',
            year: '2020',
          },
        ],
        skills: ['Social Media', 'Content Creation', 'Brand Management', 'Analytics'],
      },
    },
    {
      id: '10',
      candidateName: 'Sophie Chen',
      email: 'sophie.chen@email.com',
      phone: '+1 (555) 012-3456',
      position: 'Senior Developer',
      experience: 6,
      education: 'Master in Computer Science',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
      score: 62,
      status: 'pending' as const,
      parsedData: {
        contact: {
          name: 'Sophie Chen',
          email: 'sophie.chen@email.com',
          phone: '+1 (555) 012-3456',
          location: 'San Francisco, CA',
        },
        experience: [
          {
            company: 'Tech Corp',
            position: 'Developer',
            duration: '2019-2023',
            description: 'Full-stack development with modern technologies',
          },
        ],
        education: [
          {
            degree: 'Master in Computer Science',
            institution: 'University of California',
            year: '2019',
          },
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
      },
    },
    {
      id: '11',
      candidateName: 'Ryan Martinez',
      email: 'ryan.martinez@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Sales Representative',
      experience: 1,
      education: 'Bachelor in Business',
      skills: ['Sales', 'Customer Service', 'Communication', 'CRM'],
      score: 45,
      status: 'pending' as const,
      parsedData: {
        contact: {
          name: 'Ryan Martinez',
          email: 'ryan.martinez@email.com',
          phone: '+1 (555) 123-4567',
          location: 'Chicago, IL',
        },
        experience: [
          {
            company: 'Sales Corp',
            position: 'Sales Associate',
            duration: '2023-2023',
            description: 'Entry-level sales experience',
          },
        ],
        education: [
          {
            degree: 'Bachelor in Business',
            institution: 'Chicago University',
            year: '2023',
          },
        ],
        skills: ['Sales', 'Customer Service', 'Communication', 'CRM'],
      },
    },
    {
      id: '12',
      candidateName: 'Natalie Brown',
      email: 'natalie.brown@email.com',
      phone: '+1 (555) 234-5678',
      position: 'UX Designer',
      experience: 3,
      education: 'Bachelor in Design',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      score: 55,
      status: 'pending' as const,
      parsedData: {
        contact: {
          name: 'Natalie Brown',
          email: 'natalie.brown@email.com',
          phone: '+1 (555) 234-5678',
          location: 'Seattle, WA',
        },
        experience: [
          {
            company: 'Design Studio',
            position: 'Junior UX Designer',
            duration: '2021-2023',
            description: 'Created user interfaces and conducted research',
          },
        ],
        education: [
          {
            degree: 'Bachelor in Design',
            institution: 'Art Institute',
            year: '2021',
          },
        ],
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      },
    },
  ];

  // Filter and sort functions
  const filteredAndSortedResumes = useMemo(() => {
    let filtered = parsedResumes.filter(resume => resume.status === 'shortlisted');

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(resume =>
        resume.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.education.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Job filter
    if (selectedJobs.length > 0) {
      filtered = filtered.filter(resume => selectedJobs.includes(resume.position));
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.candidateName;
          bValue = b.candidateName;
          break;
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'experience':
          aValue = a.experience;
          bValue = b.experience;
          break;
        default:
          aValue = a.score;
          bValue = b.score;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [parsedResumes, searchTerm, selectedJobs, sortBy, sortOrder]);

  const handleJobFilterChange = (jobTitle: string) => {
    setSelectedJobs(prev =>
      prev.includes(jobTitle)
        ? prev.filter(job => job !== jobTitle)
        : [...prev, jobTitle]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedJobs([]);
    setSortBy('score');
    setSortOrder('desc');
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedResumes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResumes = filteredAndSortedResumes.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleAddToShortlist = (resumeId: string) => {
    setParsedResumes(prev => 
      prev.map(resume => 
        resume.id === resumeId 
          ? { ...resume, status: 'shortlisted' as const }
          : resume
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'parsed':
        return 'info';
      case 'reviewed':
        return 'warning';
      case 'shortlisted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Screening</Typography>
        <Button variant="contained" startIcon={<UploadIcon />}>
          Upload Resume
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Shortlisted Applicants" />
          <Tab label="Screening Rules" />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Shortlisted Applicants ({filteredAndSortedResumes.length})
            </Typography>
            <Box display="flex" gap={1}>
              <Button
                variant="contained"
                size="small"
                onClick={() => setOpenAddToShortlistDialog(true)}
              >
                Add to Shortlist
              </Button>
              <Button
                variant="outlined"
                startIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={() => setShowFilters(!showFilters)}
                size="small"
              >
                Filters & Sort
              </Button>
            </Box>
          </Box>

          {/* Filters & Sort Panel */}
          <Collapse in={showFilters}>
            <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search candidates..."
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
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Sort by</InputLabel>
                    <Select
                      value={sortBy}
                      label="Sort by"
                      onChange={(e) => setSortBy(e.target.value as 'name' | 'score' | 'experience')}
                    >
                      <MenuItem value="score">Match Score</MenuItem>
                      <MenuItem value="name">Name</MenuItem>
                      <MenuItem value="experience">Experience</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Sort order</InputLabel>
                    <Select
                      value={sortOrder}
                      label="Sort order"
                      onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    >
                      <MenuItem value="desc">Descending</MenuItem>
                      <MenuItem value="asc">Ascending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Filter by Job:
                  </Typography>
                  <FormGroup row>
                    {jobRequisitions.map((job) => (
                      <FormControlLabel
                        key={job.id}
                        control={
                          <Checkbox
                            checked={selectedJobs.includes(job.title)}
                            onChange={() => handleJobFilterChange(job.title)}
                            size="small"
                          />
                        }
                        label={job.title}
                      />
                    ))}
                  </FormGroup>
                </Grid>
                {(searchTerm || selectedJobs.length > 0) && (
                  <Grid item xs={12}>
                    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                      <Typography variant="caption">Active filters:</Typography>
                      {searchTerm && (
                        <Chip
                          label={`Search: "${searchTerm}"`}
                          size="small"
                          onDelete={() => setSearchTerm('')}
                        />
                      )}
                      {selectedJobs.map((job) => (
                        <Chip
                          key={job}
                          label={job}
                          size="small"
                          onDelete={() => handleJobFilterChange(job)}
                        />
                      ))}
                      <Button size="small" onClick={clearFilters}>
                        Clear All
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Collapse>

          <Grid container spacing={2}>
            {currentResumes.map((resume) => (
              <Grid item xs={12} sm={6} md={4} key={resume.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    height: '100%',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}
                  onClick={() => handleViewResume(resume)}
                >
                  <CardContent sx={{ p: 1.5 }}>
                    <Box display="flex" flexDirection="column" height="100%">
                      <Box>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar 
                              sx={{ 
                                width: 28, 
                                height: 28, 
                                fontSize: '0.7rem',
                                bgcolor: `hsl(${(resume.candidateName.charCodeAt(0) * 10) % 360}, 70%, 50%)`
                              }}
                            >
                              {resume.candidateName.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                              {resume.candidateName}
                            </Typography>
                          </Box>
                          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={0.3}>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontSize: '0.6rem',
                                color: getScoreColor(resume.score) === 'success' ? 'success.main' : 
                                       getScoreColor(resume.score) === 'warning' ? 'warning.main' : 'error.main',
                                fontWeight: 'medium'
                              }}
                            >
                              {resume.score}% match
                            </Typography>
                            <Chip 
                              label="shortlisted" 
                              color="success" 
                              size="small"
                              sx={{ 
                                fontSize: '0.7rem', 
                                height: '20px',
                                minWidth: 'auto',
                                '& .MuiChip-label': {
                                  px: 0.5
                                }
                              }}
                            />
                          </Box>
                        </Box>
                        <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                          {resume.position}
                        </Typography>
                        <Box display="flex" alignItems="center" mt={0.5}>
                          <WorkIcon sx={{ fontSize: 12, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                            {resume.experience} years
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={0.5}>
                          <SchoolIcon sx={{ fontSize: 12, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                            {resume.education}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {resume.skills && resume.skills.length > 0 && (
                        <Box mt={1} sx={{ flexGrow: 1 }}>
                          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.65rem' }}>
                            Skills:
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.3} mt={0.5}>
                            {resume.skills.slice(0, 2).map((skill) => (
                              <Chip 
                                key={skill} 
                                label={skill} 
                                size="small"
                                sx={{ fontSize: '0.6rem', height: '16px' }}
                              />
                            ))}
                            {resume.skills.length > 2 && (
                              <Chip 
                                label={`+${resume.skills.length - 2} more`} 
                                size="small"
                                sx={{ fontSize: '0.6rem', height: '16px' }}
                              />
                            )}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="small"
              />
            </Box>
          )}
        </Paper>
      )}

      {activeTab === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Screening Rules
          </Typography>
          <List>
            {screeningRules.map((rule) => (
              <ListItem key={rule.id}>
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary={rule.name}
                  secondary={`${rule.criteria} (Weight: ${rule.weight})`}
                />
                <Switch checked={rule.active} />
              </ListItem>
            ))}
          </List>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleCreateRule}
            sx={{ mt: 2 }}
          >
            Add Rule
          </Button>
        </Paper>
      )}

      {/* Resume Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Resume Details - {selectedResume?.candidateName}</DialogTitle>
        <DialogContent>
          {selectedResume && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Name:</strong> {selectedResume.parsedData.contact.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Email:</strong> {selectedResume.parsedData.contact.email}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Phone:</strong> {selectedResume.parsedData.contact.phone}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Location:</strong> {selectedResume.parsedData.contact.location}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    AI Score
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Rating value={selectedResume.score / 20} readOnly />
                    <Typography variant="h4" sx={{ ml: 2 }}>
                      {selectedResume.score}% match
                    </Typography>
                  </Box>
                  <Chip
                    label={selectedResume.status}
                    color={getStatusColor(selectedResume.status) as any}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Work Experience</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {selectedResume.parsedData.experience.map((exp, index) => (
                        <Box key={index} mb={2}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {exp.position} at {exp.company}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {exp.duration}
                          </Typography>
                          <Typography variant="body2">
                            {exp.description}
                          </Typography>
                          {index < selectedResume.parsedData.experience.length - 1 && <Divider sx={{ mt: 2 }} />}
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Education</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {selectedResume.parsedData.education.map((edu, index) => (
                        <Box key={index}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {edu.degree}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {edu.institution}, {edu.year}
                          </Typography>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Skills
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {selectedResume.parsedData.skills.map((skill) => (
                      <Chip key={skill} label={skill} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="outlined" color="error">
            Reject
          </Button>
          <Button variant="contained" color="success">
            Shortlist
          </Button>
        </DialogActions>
      </Dialog>

      {/* Screening Rule Dialog */}
      <Dialog open={openRuleDialog} onClose={handleCloseRuleDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedRule ? 'Edit Screening Rule' : 'Create Screening Rule'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Rule Name"
                defaultValue={selectedRule?.name || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Criteria Description"
                defaultValue={selectedRule?.criteria || ''}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Rule Type</InputLabel>
                <Select label="Rule Type" defaultValue={selectedRule?.type || ''}>
                  <MenuItem value="keyword">Keyword Match</MenuItem>
                  <MenuItem value="experience">Experience Level</MenuItem>
                  <MenuItem value="education">Education</MenuItem>
                  <MenuItem value="skill">Skill Required</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Value"
                defaultValue={selectedRule?.value || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Weight (1-10)</Typography>
              <Slider
                defaultValue={selectedRule?.weight || 5}
                min={1}
                max={10}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRuleDialog}>Cancel</Button>
          <Button variant="contained">
            {selectedRule ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add to Shortlist Dialog */}
      <Dialog open={openAddToShortlistDialog} onClose={() => setOpenAddToShortlistDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Applicant to Shortlist</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Search applicants by name"
              value={searchApplicantTerm}
              onChange={(e) => setSearchApplicantTerm(e.target.value)}
              placeholder="Type applicant name to search..."
              sx={{ mb: 2 }}
            />
            
            <Typography variant="subtitle2" gutterBottom>
              Available Applicants (Not Yet Shortlisted):
            </Typography>
            
            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
              {allApplicants
                .filter(applicant => applicant.status !== 'shortlisted')
                .filter(applicant => 
                  applicant.candidateName.toLowerCase().includes(searchApplicantTerm.toLowerCase()) ||
                  applicant.position.toLowerCase().includes(searchApplicantTerm.toLowerCase())
                )
                .map((applicant) => (
                  <Card key={applicant.id} sx={{ mb: 1, p: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            fontSize: '0.8rem',
                            bgcolor: `hsl(${(applicant.candidateName.charCodeAt(0) * 10) % 360}, 70%, 50%)`
                          }}
                        >
                          {applicant.candidateName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {applicant.candidateName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {applicant.position} • {applicant.experience} years experience
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {applicant.education}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontSize: '0.7rem',
                            color: getScoreColor(applicant.score) === 'success' ? 'success.main' : 
                                   getScoreColor(applicant.score) === 'warning' ? 'warning.main' : 'error.main',
                            fontWeight: 'medium'
                          }}
                        >
                          {applicant.score}% match
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            handleAddToShortlist(applicant.id);
                            setOpenAddToShortlistDialog(false);
                            setSearchApplicantTerm('');
                          }}
                        >
                          Add to Shortlist
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenAddToShortlistDialog(false);
            setSearchApplicantTerm('');
          }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Screening; 