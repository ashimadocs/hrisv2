import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  appliedDate: string;
  lastActivity: string;
  experience: string;
  location: string;
  avatar?: string;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    // ATS Pipeline Candidates
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Developer',
      status: 'Applied',
      appliedDate: '2024-01-15',
      lastActivity: '2024-01-17',
      experience: '5 years',
      location: 'San Francisco, CA',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      position: 'Marketing Manager',
      status: 'Screening',
      appliedDate: '2024-01-14',
      lastActivity: '2024-01-16',
      experience: '3 years',
      location: 'New York, NY',
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1 (555) 345-6789',
      position: 'Product Manager',
      status: 'Interview',
      appliedDate: '2024-01-13',
      lastActivity: '2024-01-18',
      experience: '7 years',
      location: 'Austin, TX',
    },
    {
      id: '4',
      name: 'Lisa Chen',
      email: 'lisa.chen@email.com',
      phone: '+1 (555) 456-7890',
      position: 'UX Designer',
      status: 'Offer',
      appliedDate: '2024-01-12',
      lastActivity: '2024-01-19',
      experience: '4 years',
      location: 'Seattle, WA',
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 567-8901',
      position: 'Data Scientist',
      status: 'Hired',
      appliedDate: '2024-01-11',
      lastActivity: '2024-01-20',
      experience: '6 years',
      location: 'Boston, MA',
    },
    {
      id: '6',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 678-9012',
      position: 'Frontend Developer',
      status: 'Applied',
      appliedDate: '2024-01-10',
      lastActivity: '2024-01-15',
      experience: '2 years',
      location: 'Los Angeles, CA',
    },
    {
      id: '7',
      name: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      phone: '+1 (555) 789-0123',
      position: 'DevOps Engineer',
      status: 'Screening',
      appliedDate: '2024-01-09',
      lastActivity: '2024-01-14',
      experience: '4 years',
      location: 'Denver, CO',
    },
    {
      id: '8',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 890-1234',
      position: 'HR Specialist',
      status: 'Interview',
      appliedDate: '2024-01-08',
      lastActivity: '2024-01-13',
      experience: '3 years',
      location: 'Miami, FL',
    },
    // Screening Component Candidates (Shortlisted)
    {
      id: '9',
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 901-2345',
      position: 'Marketing Manager',
      status: 'Screening',
      appliedDate: '2024-01-07',
      lastActivity: '2024-01-12',
      experience: '4 years',
      location: 'New York, NY',
    },
    {
      id: '10',
      name: 'Sophie Chen',
      email: 'sophie.chen@email.com',
      phone: '+1 (555) 012-3456',
      position: 'Senior Developer',
      status: 'Screening',
      appliedDate: '2024-01-06',
      lastActivity: '2024-01-11',
      experience: '6 years',
      location: 'San Francisco, CA',
    },
    {
      id: '11',
      name: 'Ryan Martinez',
      email: 'ryan.martinez@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Sales Representative',
      status: 'Applied',
      appliedDate: '2024-01-05',
      lastActivity: '2024-01-10',
      experience: '1 year',
      location: 'Chicago, IL',
    },
    {
      id: '12',
      name: 'Natalie Brown',
      email: 'natalie.brown@email.com',
      phone: '+1 (555) 234-5678',
      position: 'UX Designer',
      status: 'Applied',
      appliedDate: '2024-01-04',
      lastActivity: '2024-01-09',
      experience: '3 years',
      location: 'Seattle, WA',
    },
    // Additional candidates from Interview component
    {
      id: '13',
      name: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      phone: '+1 (555) 345-6789',
      position: 'DevOps Engineer',
      status: 'Interview',
      appliedDate: '2024-01-03',
      lastActivity: '2024-01-15',
      experience: '4 years',
      location: 'Denver, CO',
    },
    {
      id: '14',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 456-7890',
      position: 'HR Specialist',
      status: 'Interview',
      appliedDate: '2024-01-02',
      lastActivity: '2024-01-14',
      experience: '3 years',
      location: 'Miami, FL',
    },
    {
      id: '15',
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 567-8901',
      position: 'Marketing Manager',
      status: 'Interview',
      appliedDate: '2024-01-01',
      lastActivity: '2024-01-13',
      experience: '4 years',
      location: 'New York, NY',
    },
    {
      id: '16',
      name: 'Sophie Chen',
      email: 'sophie.chen@email.com',
      phone: '+1 (555) 678-9012',
      position: 'Senior Developer',
      status: 'Interview',
      appliedDate: '2023-12-30',
      lastActivity: '2024-01-12',
      experience: '6 years',
      location: 'San Francisco, CA',
    },
    {
      id: '17',
      name: 'Ryan Martinez',
      email: 'ryan.martinez@email.com',
      phone: '+1 (555) 789-0123',
      position: 'Sales Representative',
      status: 'Interview',
      appliedDate: '2023-12-29',
      lastActivity: '2024-01-11',
      experience: '1 year',
      location: 'Chicago, IL',
    },
    {
      id: '18',
      name: 'Natalie Brown',
      email: 'natalie.brown@email.com',
      phone: '+1 (555) 890-1234',
      position: 'UX Designer',
      status: 'Interview',
      appliedDate: '2023-12-28',
      lastActivity: '2024-01-10',
      experience: '3 years',
      location: 'Seattle, WA',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCandidate(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'default';
      case 'Screening':
        return 'warning';
      case 'Interview':
        return 'info';
      case 'Offer':
        return 'success';
      case 'Hired':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Candidates</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Candidate
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search candidates by name, position, or email..."
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
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Applied Date</TableCell>
              <TableCell>Last Activity</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar 
                      sx={{ 
                        mr: 2,
                        bgcolor: `hsl(${(candidate.name.charCodeAt(0) * 10) % 360}, 70%, 50%)`
                      }}
                    >
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">{candidate.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {candidate.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <WorkIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    {candidate.position}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={candidate.status}
                    color={getStatusColor(candidate.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <ScheduleIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    {candidate.appliedDate}
                  </Box>
                </TableCell>
                <TableCell>{candidate.lastActivity}</TableCell>
                <TableCell>{candidate.experience}</TableCell>
                <TableCell>{candidate.location}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleCandidateClick(candidate)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Candidate Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Candidate Details</DialogTitle>
        <DialogContent>
          {selectedCandidate && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={selectedCandidate.name}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Position"
                  value={selectedCandidate.position}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={selectedCandidate.email}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={selectedCandidate.phone}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Experience"
                  value={selectedCandidate.experience}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={selectedCandidate.location}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={4}
                  placeholder="Add notes about this candidate..."
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" startIcon={<EmailIcon />}>
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Candidates; 