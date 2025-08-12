import React, { useState } from 'react';
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
  Rating,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Tabs,
  Tab,
  InputAdornment,
  Tooltip,
  IconButton,
  Collapse,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Add as AddIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  VideoCall as VideoCallIcon,
  Assessment as AssessmentIcon,
  Send as SendIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import InterviewKitManagement from '../components/InterviewKit/InterviewKitManagement';
import { InterviewKit } from '../types/interviewKit';

interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  interviewer: string;
  secondInterviewer?: string;
  date: string;
  time: string;
  type: 'phone' | 'video' | 'onsite';
  status: 'scheduled' | 'completed' | 'cancelled';
  tags?: string[];
  interviewScores?: {
    preliminary?: number;
    final?: number;
  };
  scorecard?: InterviewScorecard;
}

interface InterviewScorecard {
  technicalSkills: number;
  communication: number;
  culturalFit: number;
  experience: number;
  overallRating: number;
  notes: string;
  strengths: string;
  weaknesses: string;
  recommendation: 'hire' | 'maybe' | 'reject';
  positiveRemarks?: string;
  negativeRemarks?: string;
  skillScores?: {
    [key: string]: number;
  };
}

const InterviewCoordination: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [upcomingSearchTerm, setUpcomingSearchTerm] = useState('');
  const [completedSearchTerm, setCompletedSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([
    // Upcoming Interviews (6)
    {
      id: '1',
      candidateId: '1',
      candidateName: 'John Smith',
      position: 'Senior Developer',
      interviewer: 'Jennifer Martinez',
      secondInterviewer: 'Robert Chen',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'video',
      status: 'scheduled',
      tags: ['preliminary'],
    },
    {
      id: '2',
      candidateId: '2',
      candidateName: 'Mike Davis',
      position: 'Product Manager',
      interviewer: 'Amanda Foster',
      secondInterviewer: 'Michael Rodriguez',
      date: '2024-01-21',
      time: '2:00 PM',
      type: 'onsite',
      status: 'scheduled',
      tags: ['final', 'preliminary'],
    },
    {
      id: '3',
      candidateId: '3',
      candidateName: 'Sarah Johnson',
      position: 'Marketing Manager',
      interviewer: 'Christopher Lee',
      date: '2024-01-22',
      time: '11:00 AM',
      type: 'phone',
      status: 'scheduled',
      tags: ['preliminary'],
    },
    {
      id: '4',
      candidateId: '4',
      candidateName: 'Lisa Chen',
      position: 'UX Designer',
      interviewer: 'Patricia Williams',
      date: '2024-01-23',
      time: '3:00 PM',
      type: 'video',
      status: 'scheduled',
      tags: ['preliminary'],
    },
    {
      id: '5',
      candidateId: '5',
      candidateName: 'David Wilson',
      position: 'Data Scientist',
      interviewer: 'Thomas Anderson',
      date: '2024-01-24',
      time: '9:00 AM',
      type: 'onsite',
      status: 'scheduled',
      tags: ['preliminary'],
    },
    {
      id: '6',
      candidateId: '6',
      candidateName: 'Emily Rodriguez',
      position: 'Frontend Developer',
      interviewer: 'Rachel Green',
      date: '2024-01-25',
      time: '1:00 PM',
      type: 'video',
      status: 'scheduled',
      tags: ['preliminary'],
    },
    // Completed Interviews (6)
    {
      id: '7',
      candidateId: '7',
      candidateName: 'Alex Thompson',
      position: 'DevOps Engineer',
      interviewer: 'Benjamin Taylor',
      date: '2024-01-15',
      time: '2:00 PM',
      type: 'onsite',
      status: 'completed',
      tags: ['final', 'preliminary'],
      interviewScores: {
        preliminary: 85,
        final: 92,
      },
      scorecard: {
        technicalSkills: 5,
        communication: 4,
        culturalFit: 4,
        experience: 5,
        overallRating: 4.5,
        notes: 'Excellent technical skills and infrastructure knowledge.',
        strengths: 'DevOps expertise, automation skills',
        weaknesses: 'Could improve presentation skills',
        recommendation: 'hire',
        positiveRemarks: 'Alex demonstrates exceptional technical skills in DevOps practices, including CI/CD pipeline management, containerization with Docker, and infrastructure as code using Terraform. He shows strong problem-solving abilities and can effectively communicate complex technical concepts to both technical and non-technical stakeholders.',
        negativeRemarks: 'While Alex has strong technical skills, he could improve his presentation skills when presenting to larger groups. He tends to be more comfortable in technical discussions rather than broader business conversations.',
        skillScores: {
          'Docker & Kubernetes': 95,
          'CI/CD Pipelines': 90,
          'Infrastructure as Code': 88,
          'Monitoring & Logging': 85,
          'Scripting & Automation': 92,
        },
      },
    },
    {
      id: '8',
      candidateId: '8',
      candidateName: 'Maria Garcia',
      position: 'HR Specialist',
      interviewer: 'Victoria Clark',
      date: '2024-01-14',
      time: '10:00 AM',
      type: 'phone',
      status: 'completed',
      tags: ['preliminary'],
      interviewScores: {
        preliminary: 78,
      },
      scorecard: {
        technicalSkills: 3,
        communication: 5,
        culturalFit: 5,
        experience: 4,
        overallRating: 4.25,
        notes: 'Great interpersonal skills and HR experience.',
        strengths: 'Communication, employee relations',
        weaknesses: 'Limited technical HR systems knowledge',
        recommendation: 'hire',
        positiveRemarks: 'Maria demonstrates excellent interpersonal skills and a deep understanding of HR processes. She shows strong empathy and can effectively handle sensitive employee situations. Her communication skills are outstanding, and she has a natural ability to build rapport with candidates and employees.',
        negativeRemarks: 'Maria has limited experience with modern HR technology platforms and could benefit from additional training on HRIS systems and data analytics tools commonly used in contemporary HR departments.',
        skillScores: {
          'Employee Relations': 95,
          'Recruitment & Selection': 88,
          'HR Policies & Compliance': 85,
          'Communication Skills': 92,
          'Conflict Resolution': 90,
        },
      },
    },
    {
      id: '9',
      candidateId: '9',
      candidateName: 'James Wilson',
      position: 'Marketing Manager',
      interviewer: 'Alexander Wright',
      date: '2024-01-13',
      time: '3:00 PM',
      type: 'video',
      status: 'completed',
      tags: ['final', 'preliminary'],
      interviewScores: {
        preliminary: 82,
        final: 88,
      },
      scorecard: {
        technicalSkills: 3,
        communication: 5,
        culturalFit: 4,
        experience: 4,
        overallRating: 4.0,
        notes: 'Good marketing background with creative skills.',
        strengths: 'Creative thinking, campaign management',
        weaknesses: 'Could improve data analysis skills',
        recommendation: 'maybe',
        positiveRemarks: 'James shows strong creative thinking and excellent campaign management skills. He demonstrates a good understanding of brand positioning and can effectively communicate marketing strategies. His presentation skills are outstanding, and he has a natural ability to engage with stakeholders.',
        negativeRemarks: 'James could improve his data analysis and digital marketing skills. He has limited experience with marketing analytics tools and could benefit from additional training in data-driven marketing approaches.',
        skillScores: {
          'Campaign Management': 88,
          'Brand Strategy': 85,
          'Creative Direction': 90,
          'Stakeholder Communication': 92,
          'Digital Marketing': 75,
        },
      },
    },
    {
      id: '10',
      candidateId: '10',
      candidateName: 'Sophie Chen',
      position: 'Senior Developer',
      interviewer: 'Olivia Parker',
      date: '2024-01-12',
      time: '11:00 AM',
      type: 'onsite',
      status: 'completed',
      tags: ['final', 'preliminary'],
      interviewScores: {
        preliminary: 88,
        final: 94,
      },
      scorecard: {
        technicalSkills: 5,
        communication: 4,
        culturalFit: 4,
        experience: 5,
        overallRating: 4.5,
        notes: 'Strong technical background with good communication.',
        strengths: 'Full-stack development, problem solving',
        weaknesses: 'Could improve team collaboration',
        recommendation: 'hire',
        positiveRemarks: 'Sophie demonstrates exceptional technical skills across the full stack, with deep knowledge of modern web technologies. She shows excellent problem-solving abilities and can effectively communicate complex technical concepts. Her code quality is outstanding, and she has a strong understanding of software architecture principles.',
        negativeRemarks: 'While Sophie is technically excellent, she could improve her team collaboration skills. She tends to work more independently and could benefit from more active participation in team discussions and knowledge sharing sessions.',
        skillScores: {
          'Frontend Development': 95,
          'Backend Development': 92,
          'Database Design': 88,
          'API Development': 90,
          'System Architecture': 94,
        },
      },
    },
    {
      id: '11',
      candidateId: '11',
      candidateName: 'Ryan Martinez',
      position: 'Sales Representative',
      interviewer: 'Daniel Lewis',
      date: '2024-01-11',
      time: '2:00 PM',
      type: 'phone',
      status: 'completed',
      tags: ['preliminary'],
      interviewScores: {
        preliminary: 72,
      },
      scorecard: {
        technicalSkills: 2,
        communication: 5,
        culturalFit: 4,
        experience: 3,
        overallRating: 3.5,
        notes: 'Good communication skills but limited experience.',
        strengths: 'Communication, enthusiasm',
        weaknesses: 'Limited sales experience, technical knowledge',
        recommendation: 'maybe',
        positiveRemarks: 'Ryan demonstrates excellent communication skills and natural enthusiasm that would be valuable in a sales role. He shows strong interpersonal skills and can effectively build rapport with potential clients. His positive attitude and energy are infectious.',
        negativeRemarks: 'Ryan has limited sales experience and lacks technical knowledge about the products and services. He would need significant training and mentoring to become effective in a sales role.',
        skillScores: {
          'Communication': 90,
          'Interpersonal Skills': 85,
          'Product Knowledge': 60,
          'Sales Techniques': 65,
          'Customer Relationship': 80,
        },
      },
    },
    {
      id: '12',
      candidateId: '12',
      candidateName: 'Natalie Brown',
      position: 'UX Designer',
      interviewer: 'Sophia Turner',
      date: '2024-01-10',
      time: '9:00 AM',
      type: 'video',
      status: 'completed',
      tags: ['final', 'preliminary'],
      interviewScores: {
        preliminary: 85,
        final: 91,
      },
      scorecard: {
        technicalSkills: 4,
        communication: 4,
        culturalFit: 5,
        experience: 4,
        overallRating: 4.25,
        notes: 'Good design skills and user empathy.',
        strengths: 'Design thinking, user research',
        weaknesses: 'Could improve technical prototyping skills',
        recommendation: 'hire',
        positiveRemarks: 'Natalie demonstrates excellent design thinking and strong user empathy. She shows a deep understanding of user-centered design principles and can effectively conduct user research. Her portfolio showcases creative problem-solving and innovative design solutions.',
        negativeRemarks: 'Natalie could improve her technical prototyping skills, particularly with advanced tools like Figma plugins and design systems. She would benefit from additional training in design-to-development handoff processes.',
        skillScores: {
          'User Research': 92,
          'Design Thinking': 90,
          'Visual Design': 88,
          'Prototyping': 82,
          'Design Systems': 85,
        },
      },
    },
  ]);

  const [interviewKits, setInterviewKits] = useState<InterviewKit[]>([
    {
      id: '1',
      name: 'Product Designer, Interview 1',
      instructions: 'This interview focuses on evaluating the candidate\'s design thinking, technical skills, and cultural fit for our product team.',
      questions: [
        {
          id: '1',
          text: 'How many years experience do you have in a similar role?',
          type: 'range',
          rangeMin: 0,
          rangeMax: 15,
        },
        {
          id: '2',
          text: 'What is it sparked your interest in this role at Startup?',
          type: 'text',
        },
      ],
      skills: ['Sketch', 'HTML/CSS', 'Wireframing', 'Design thinking'],
      traits: ['Team player', 'Problem Solver', 'Structured', 'Friendly'],
      status: 'active',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Senior Developer Interview',
      instructions: 'Technical interview focusing on coding skills, system design, and problem-solving abilities.',
      questions: [
        {
          id: '3',
          text: 'Walk me through your experience with React and TypeScript',
          type: 'text',
        },
        {
          id: '4',
          text: 'How would you design a scalable microservices architecture?',
          type: 'text',
        },
        {
          id: '5',
          text: 'Describe a challenging bug you encountered and how you solved it',
          type: 'text',
        },
      ],
      skills: ['React', 'TypeScript', 'Node.js', 'System Design', 'Problem Solving'],
      traits: ['Analytical', 'Team Player', 'Communication', 'Adaptability'],
      status: 'active',
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-10T10:00:00Z',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [openScorecardDialog, setOpenScorecardDialog] = useState(false);

  // Interview Kit Management Functions
  const handleSaveInterviewKit = (kit: InterviewKit) => {
    if (kit.id) {
      // Update existing kit
      setInterviewKits(prev => prev.map(k => k.id === kit.id ? kit : k));
    } else {
      // Create new kit
      const newKit = {
        ...kit,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setInterviewKits(prev => [...prev, newKit]);
    }
  };

  const handleDeleteInterviewKit = (kitId: string) => {
    setInterviewKits(prev => prev.filter(k => k.id !== kitId));
  };

  const handleScheduleInterview = () => {
    setSelectedInterview(null);
    setOpenDialog(true);
  };

  const handleEditInterview = (interview: Interview) => {
    setSelectedInterview(interview);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInterview(null);
  };

  const handleOpenScorecard = (interview: Interview) => {
    setSelectedInterview(interview);
    setOpenScorecardDialog(true);
  };

  const handleCloseScorecardDialog = () => {
    setOpenScorecardDialog(false);
    setSelectedInterview(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoCallIcon />;
      case 'phone':
        return <PhoneIcon />;
      case 'onsite':
        return <PersonIcon />;
      default:
        return <ScheduleIcon />;
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const clearFilters = () => {
    setSelectedStatus([]);
    setSelectedTypes([]);
    setSelectedMethods([]);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Interview</Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<AssessmentIcon />}
            sx={{ mr: 2 }}
          >
            Interview Kits
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleScheduleInterview}>
            Schedule Interview
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Interview Coordination" />
          <Tab label="Interview Kits" />
        </Tabs>
      </Paper>

            {activeTab === 0 && (
        <Box>
          {/* Search and Filter Section */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                All Interviews
              </Typography>
              <Box display="flex" gap={2}>
                <TextField
                  size="small"
                  placeholder="Search interviews..."
                  value={upcomingSearchTerm}
                  onChange={(e) => setUpcomingSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: 250 }}
                />
                <Button
                  variant="outlined"
                  startIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  onClick={() => setShowFilters(!showFilters)}
                  size="small"
                >
                  Filters
                </Button>
              </Box>
            </Box>

            {/* Filter Panel */}
            <Collapse in={showFilters}>
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        multiple
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as string[])}
                        input={<OutlinedInput label="Status" />}
                      >
                        <MenuItem value="scheduled">
                          <FormControlLabel
                            control={
                              <Checkbox checked={selectedStatus.indexOf('scheduled') > -1} />
                            }
                            label="Scheduled"
                          />
                        </MenuItem>
                        <MenuItem value="completed">
                          <FormControlLabel
                            control={
                              <Checkbox checked={selectedStatus.indexOf('completed') > -1} />
                            }
                            label="Completed"
                          />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Interview Type</InputLabel>
                      <Select
                        multiple
                        value={selectedTypes}
                        onChange={(e) => setSelectedTypes(e.target.value as string[])}
                        input={<OutlinedInput label="Interview Type" />}
                      >
                        <MenuItem value="preliminary">
                          <FormControlLabel
                            control={
                              <Checkbox checked={selectedTypes.indexOf('preliminary') > -1} />
                            }
                            label="Preliminary"
                          />
                        </MenuItem>
                        <MenuItem value="final">
                          <FormControlLabel
                            control={
                              <Checkbox checked={selectedTypes.indexOf('final') > -1} />
                            }
                            label="Final"
                          />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Interview Method</InputLabel>
                      <Select
                        multiple
                        value={selectedMethods}
                        onChange={(e) => setSelectedMethods(e.target.value as string[])}
                        input={<OutlinedInput label="Interview Method" />}
                      >
                        <MenuItem value="video">
                          <FormControlLabel
                            control={
                              <Checkbox checked={selectedMethods.indexOf('video') > -1} />
                            }
                            label="Video"
                          />
                        </MenuItem>
                        <MenuItem value="phone">
                          <FormControlLabel
                            control={
                              <Checkbox checked={selectedMethods.indexOf('phone') > -1} />
                            }
                            label="Phone"
                          />
                        </MenuItem>
                        <MenuItem value="onsite">
                          <FormControlLabel
                            control={
                              <Checkbox checked={selectedMethods.indexOf('onsite') > -1} />
                            }
                            label="On-site"
                          />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button
                      variant="outlined"
                      onClick={clearFilters}
                      size="small"
                      startIcon={<ClearIcon />}
                    >
                      Clear Filters
                    </Button>
                  </Grid>
                </Grid>

                {/* Active Filters Display */}
                {(selectedStatus.length > 0 || selectedTypes.length > 0 || selectedMethods.length > 0) && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="textSecondary" sx={{ mr: 1 }}>
                      Active filters:
                    </Typography>
                    {selectedStatus.map((status) => (
                      <Chip
                        key={status}
                        label={status}
                        size="small"
                        onDelete={() => setSelectedStatus(selectedStatus.filter(s => s !== status))}
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                    {selectedTypes.map((type) => (
                      <Chip
                        key={type}
                        label={type}
                        size="small"
                        onDelete={() => setSelectedTypes(selectedTypes.filter(t => t !== type))}
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                    {selectedMethods.map((method) => (
                      <Chip
                        key={method}
                        label={method}
                        size="small"
                        onDelete={() => setSelectedMethods(selectedMethods.filter(m => m !== method))}
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Collapse>
          </Paper>

          {/* Combined Interviews Grid */}
          <Grid container spacing={2}>
            {interviews
              .filter((interview) => 
                interview.candidateName.toLowerCase().includes(upcomingSearchTerm.toLowerCase()) ||
                interview.position.toLowerCase().includes(upcomingSearchTerm.toLowerCase()) ||
                interview.interviewer.toLowerCase().includes(upcomingSearchTerm.toLowerCase())
              )
              .filter((interview) => 
                selectedStatus.length === 0 || selectedStatus.includes(interview.status)
              )
              .filter((interview) => 
                selectedTypes.length === 0 || 
                selectedTypes.some(type => interview.tags?.includes(type))
              )
              .filter((interview) => 
                selectedMethods.length === 0 || selectedMethods.includes(interview.type)
              )
              .map((interview) => (
                <Grid item xs={12} sm={6} md={4} key={interview.id}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      cursor: 'pointer',
                      '&:hover': { 
                        boxShadow: 3,
                        backgroundColor: 'action.hover'
                      }
                    }}
                    onClick={() => handleEditInterview(interview)}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              fontSize: '0.8rem',
                              bgcolor: `hsl(${(interview.candidateName.charCodeAt(0) * 10) % 360}, 70%, 50%)`
                            }}
                          >
                            {interview.candidateName.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                              {interview.candidateName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                              {interview.position}
                            </Typography>
                          </Box>
                        </Box>
                        {/* Removed duplicate tags from top right - scores are now shown in bottom section */}
                      </Box>
                      {/* Show date/time and interviewer for scheduled interviews OR interviews with only preliminary score */}
                      {(!interview.interviewScores || (interview.interviewScores && !interview.interviewScores.final)) && (
                        <>
                          <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'text.primary', display: 'block', mb: 0.5 }}>
                            {interview.date} at {interview.time}
                          </Typography>
                          <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block' }}>
                            {interview.interviewer}
                            {interview.secondInterviewer && `, ${interview.secondInterviewer}`}
                          </Typography>
                        </>
                      )}
                      {/* Add spacing for fully completed interviews to maintain consistent card height */}
                      {interview.interviewScores && interview.interviewScores.final && (
                        <Box sx={{ height: '40px' }} />
                      )}
                      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                        <Box display="flex" gap={1} alignItems="center">
                          {/* Interview Score Tags */}
                          {interview.interviewScores && (
                            <>
                              {interview.interviewScores.preliminary && (
                                <Chip
                                  label={`Preliminary ${interview.interviewScores.preliminary}%`}
                                  color="warning"
                                  size="medium"
                                  sx={{ 
                                    fontSize: '0.8rem', 
                                    height: '28px',
                                    cursor: 'pointer',
                                    fontWeight: 'medium',
                                    '&:hover': { 
                                      backgroundColor: 'warning.light',
                                      color: 'white',
                                      transform: 'scale(1.05)',
                                      transition: 'all 0.2s ease'
                                    }
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenScorecard(interview);
                                  }}
                                />
                              )}
                              {interview.interviewScores.final && (
                                <Chip
                                  label={`Final ${interview.interviewScores.final}%`}
                                  color="success"
                                  size="medium"
                                  sx={{ 
                                    fontSize: '0.8rem', 
                                    height: '28px',
                                    cursor: 'pointer',
                                    fontWeight: 'medium',
                                    '&:hover': { 
                                      backgroundColor: 'success.light',
                                      color: 'white',
                                      transform: 'scale(1.05)',
                                      transition: 'all 0.2s ease'
                                    }
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenScorecard(interview);
                                  }}
                                />
                              )}
                            </>
                          )}
                        </Box>
                        <Box display="flex" gap={1}>
                          {/* Show interview type icon for scheduled interviews OR interviews with only preliminary score */}
                          {(!interview.interviewScores || (interview.interviewScores && !interview.interviewScores.final)) && (
                            <Tooltip title="Schedule Interview">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditInterview(interview);
                                }}
                                sx={{ 
                                  color: 'primary.main',
                                  '&:hover': { 
                                    backgroundColor: 'primary.light',
                                    color: 'white'
                                  }
                                }}
                              >
                                {getTypeIcon(interview.type)}
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <InterviewKitManagement
          interviewKits={interviewKits}
          onSaveKit={handleSaveInterviewKit}
          onDeleteKit={handleDeleteInterviewKit}
        />
      )}

      {/* Schedule Interview Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedInterview ? 'Edit Interview' : 'Schedule Interview'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Candidate</InputLabel>
                <Select label="Candidate" defaultValue={selectedInterview?.candidateId || ''}>
                  <MenuItem value="1">John Smith - Senior Developer</MenuItem>
                  <MenuItem value="2">Mike Davis - Product Manager</MenuItem>
                  <MenuItem value="3">Sarah Johnson - Marketing Manager</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Interviewer</InputLabel>
                <Select label="Interviewer" defaultValue={selectedInterview?.interviewer || ''}>
                  <MenuItem value="Sarah Johnson">Sarah Johnson</MenuItem>
                  <MenuItem value="Lisa Chen">Lisa Chen</MenuItem>
                  <MenuItem value="David Wilson">David Wilson</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                defaultValue={selectedInterview?.date || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                defaultValue={selectedInterview?.time || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Interview Type</InputLabel>
                <Select label="Interview Type" defaultValue={selectedInterview?.type || 'video'}>
                  <MenuItem value="video">Video Call</MenuItem>
                  <MenuItem value="phone">Phone Call</MenuItem>
                  <MenuItem value="onsite">On-site</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Interview Kit</InputLabel>
                <Select label="Interview Kit" defaultValue="">
                  {interviewKits
                    .filter(kit => kit.status === 'active')
                    .map(kit => (
                      <MenuItem key={kit.id} value={kit.id}>
                        {kit.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                placeholder="Additional notes for the interview..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" startIcon={<SendIcon />}>
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Scorecard Dialog */}
      <Dialog open={openScorecardDialog} onClose={handleCloseScorecardDialog} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                fontSize: '1rem',
                bgcolor: `hsl(${(selectedInterview?.candidateName?.charCodeAt(0) || 0 * 10) % 360}, 70%, 50%)`
              }}
            >
              {selectedInterview?.candidateName?.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Box>
              <Typography variant="h6">{selectedInterview?.candidateName}</Typography>
              <Typography variant="body2" color="textSecondary">{selectedInterview?.position}</Typography>
            </Box>
            {selectedInterview?.interviewScores && (
              <Box display="flex" gap={1} ml="auto">
                {selectedInterview.interviewScores.preliminary && (
                  <Chip 
                    label={`Preliminary ${selectedInterview.interviewScores.preliminary}%`}
                    color="warning"
                    size="small"
                  />
                )}
                {selectedInterview.interviewScores.final && (
                  <Chip 
                    label={`Final ${selectedInterview.interviewScores.final}%`}
                    color="success"
                    size="small"
                  />
                )}
              </Box>
            )}
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedInterview?.scorecard && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {/* Overall Score Section */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
                  <Typography variant="h6" gutterBottom>
                    Total Score
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <Rating 
                        value={selectedInterview.scorecard.overallRating} 
                        readOnly 
                        size="large"
                      />
                    </Box>
                    <Typography variant="h5" color="primary">
                      {selectedInterview.scorecard.overallRating * 20}%
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              {/* Positive and Negative Remarks */}
              {selectedInterview.scorecard.positiveRemarks && (
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, backgroundColor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="h6" color="success.main">
                        Positive Remarks
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {selectedInterview.scorecard.positiveRemarks}
                    </Typography>
                  </Paper>
                </Grid>
              )}

              {selectedInterview.scorecard.negativeRemarks && (
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, backgroundColor: 'error.50', border: '1px solid', borderColor: 'error.200' }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="h6" color="error.main">
                        Areas for Development
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {selectedInterview.scorecard.negativeRemarks}
                    </Typography>
                  </Paper>
                </Grid>
              )}

              {/* Skill Scores */}
              {selectedInterview.scorecard.skillScores && Object.keys(selectedInterview.scorecard.skillScores).length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Skill Scores
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(selectedInterview.scorecard.skillScores).map(([skill, score]) => (
                      <Grid item xs={12} sm={6} md={4} key={skill}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="subtitle2" gutterBottom>
                            {skill}
                          </Typography>
                          <Typography 
                            variant="h4" 
                            color={score >= 90 ? 'success.main' : score >= 80 ? 'primary.main' : score >= 70 ? 'warning.main' : 'error.main'}
                          >
                            {score}%
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              {/* Detailed Ratings */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Detailed Ratings
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Technical Skills
                      </Typography>
                      <Rating value={selectedInterview.scorecard.technicalSkills} readOnly />
                      <Typography variant="h6" color="primary">
                        {selectedInterview.scorecard.technicalSkills * 20}%
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Communication
                      </Typography>
                      <Rating value={selectedInterview.scorecard.communication} readOnly />
                      <Typography variant="h6" color="primary">
                        {selectedInterview.scorecard.communication * 20}%
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Cultural Fit
                      </Typography>
                      <Rating value={selectedInterview.scorecard.culturalFit} readOnly />
                      <Typography variant="h6" color="primary">
                        {selectedInterview.scorecard.culturalFit * 20}%
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Experience
                      </Typography>
                      <Rating value={selectedInterview.scorecard.experience} readOnly />
                      <Typography variant="h6" color="primary">
                        {selectedInterview.scorecard.experience * 20}%
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              {/* Notes and Comments */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Interview Notes"
                  multiline
                  rows={3}
                  value={selectedInterview.scorecard.notes}
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              {/* Recommendation */}
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h6">Recommendation:</Typography>
                  <Chip
                    label={selectedInterview.scorecard.recommendation.toUpperCase()}
                    color={
                      selectedInterview.scorecard.recommendation === 'hire' ? 'success' :
                      selectedInterview.scorecard.recommendation === 'maybe' ? 'warning' : 'error'
                    }
                    sx={{ fontSize: '1rem', height: '32px' }}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseScorecardDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InterviewCoordination; 