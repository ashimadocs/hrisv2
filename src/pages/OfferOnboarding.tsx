import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Tooltip,
  IconButton,
  Checkbox,
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  Assessment as AssessmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  AttachMoney as AttachMoneyIcon,
  Settings as SettingsIcon,
  Upload as UploadIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  atsStatus: string;
  appliedDate: string;
  location: string;
  finalInterviewScore: number;
  offerStatus: 'draft' | 'pending' | 'accepted' | 'rejected';
  offerSentDate?: string;
  offerResponseDate?: string;
  daysToRespond?: number;
  onboardingDocumentsStatus: 'pending' | 'complete';
  avatar?: string;
}

const OfferOnboarding: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([
          {
        id: '1',
        name: 'Sophie Chen',
        email: 'sophie.chen@email.com',
        phone: '+1 (555) 012-3456',
        position: 'Senior Software Developer',
        atsStatus: 'Offer & Agreements',
        appliedDate: '2024-01-06',
        location: 'San Francisco, CA',
        finalInterviewScore: 94,
        offerStatus: 'pending',
        offerSentDate: '2024-01-25',
        daysToRespond: 3,
        onboardingDocumentsStatus: 'pending',
      },
      {
        id: '5',
        name: 'Kevin Lee',
        email: 'kevin.lee@email.com',
        phone: '+1 (555) 345-6789',
        position: 'UX Designer',
        atsStatus: 'Offer & Agreements',
        appliedDate: '2024-01-03',
        location: 'Seattle, WA',
        finalInterviewScore: 89,
        offerStatus: 'draft',
        onboardingDocumentsStatus: 'pending',
      },
    {
      id: '2',
      name: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      phone: '+1 (555) 789-0123',
      position: 'DevOps Engineer',
      atsStatus: 'Offer & Agreements',
      appliedDate: '2024-01-09',
      location: 'Austin, TX',
      finalInterviewScore: 92,
      offerStatus: 'accepted',
      offerSentDate: '2024-01-20',
      offerResponseDate: '2024-01-22',
      onboardingDocumentsStatus: 'complete',
    },
    {
      id: '3',
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 901-2345',
      position: 'Marketing Manager',
      atsStatus: 'Offer & Agreements',
      appliedDate: '2024-01-07',
      location: 'New York, NY',
      finalInterviewScore: 88,
      offerStatus: 'rejected',
      offerSentDate: '2024-01-18',
      offerResponseDate: '2024-01-21',
      onboardingDocumentsStatus: 'pending',
    },
    {
      id: '4',
      name: 'Natalie Brown',
      email: 'natalie.brown@email.com',
      phone: '+1 (555) 234-5678',
      position: 'UX Designer',
      atsStatus: 'Offer & Agreements',
      appliedDate: '2024-01-04',
      location: 'Austin, TX',
      finalInterviewScore: 91,
      offerStatus: 'pending',
      offerSentDate: '2024-01-24',
      daysToRespond: 5,
      onboardingDocumentsStatus: 'pending',
    },
  ]);

  const [openHiringDialog, setOpenHiringDialog] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [hiringForm, setHiringForm] = useState({
    // Personal Information
    employeeId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    primaryMobileNumber: '',
    birthdate: '',
    gender: '',
    citizenship: '',
    maritalStatus: '',
    
    // Address Information
    address: '',
    province: '',
    city: '',
    country: 'Philippines',
    
    // Employment Details
    employmentStatus: '',
    employmentType: '',
    dateHired: '',
    jobPosition: '',
    rank: '',
    department: '',
    costCenter: '',
    locationAssigned: 'Makati Office',
    reportsToName: 'EMP-001 (John Smith)',
    
    // Tax & Payroll Information
    taxStatus: '',
    payrollGroup: '',
    minimumWageEarner: false,
    basicPay: '₱25,000.00',
    employeeBank: '',
    bankAccount: '',
    
    // Government IDs
    umid: '',
    tin: '',
    sss: '',
    pagIbig: '',
    philhealth: '',
    hdmfMp2: '',
    
    // Work Entitlements
    timesheetRequired: true,
    entitledToDeminimis: false,
    entitledToRegularHoliday: true,
    entitledToUnworkRegularHoliday: true,
    entitledToSpecialHoliday: true,
    entitledToUnworkSpecialHoliday: true,
    entitledToLeaves: true,
    entitledToNightDifferential: false,
    nightDifferentialRules: '',
    entitledToOvertime: true,
    entitledTo13thMonth: true,
    entitledToHazardPay: false,
    entitledToServiceCharge: false,
    entitledToSSS: true,
    entitledToPhilhealth: true,
    entitledToHDMF: true,
    entitledToHDMFMP2: false,
    entitledToRestDayPay: true,
    entitledToTax: true,
    
    // Emergency Contact
    emergencyContactName: 'Maria Santos',
    emergencyContactPhone: '+63 917 123 4567',
    emergencyContactRelationship: 'Spouse',
    emergencyContactAddress: '123 Main Street, Barangay San Antonio, Makati City, Metro Manila',
    
    // Benefits Enrollment
    healthInsurance: true,
    dentalInsurance: true,
    lifeInsurance: true,
    retirementPlan: true,
    gymMembership: false,
    
    // Leaves / Time Off
    sickLeave: false,
    vacationLeave: false,
    maternityLeave: false,
    paternityLeave: false,
    bereavementLeave: false,
    personalLeave: false,
    
    // Onboarding Checklist
    employeeHandbook: false,
    codeOfConduct: false,
    safetyTraining: false,
    harassmentTraining: false,
    itAccess: false,
    emailSetup: false,
    phoneSetup: false,
    parkingPass: false,
    securityBadge: false,
    uniform: false,
    equipment: false,
    
    // System Integration
    assignPosition: true,
    createPayrollRecord: true,
    sendWelcomeEmail: true,
    createEmailAccount: true,
    createSystemAccess: true,
    sendOnboardingPacket: true,
  });

  const handleReadyForHire = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setHiringForm({
      // Personal Information (Auto-populated from HRIS)
      employeeId: applicant.name.split(' ')[0], // Placeholder, will be fetched from HRIS
      firstName: applicant.name.split(' ')[0],
      middleName: applicant.name.split(' ')[1] || '',
      lastName: applicant.name.split(' ')[2] || '',
      email: applicant.email,
      primaryMobileNumber: applicant.phone, // Placeholder, will be fetched from HRIS
      birthdate: applicant.appliedDate, // Placeholder, will be fetched from HRIS
      gender: 'Male', // Placeholder, will be fetched from HRIS
      citizenship: 'Filipino', // Placeholder, will be fetched from HRIS
      maritalStatus: 'Single', // Placeholder, will be fetched from HRIS
      
      // Address Information
      address: '123 Main Street, Barangay San Antonio', // Placeholder, will be fetched from HRIS
      province: 'Metro Manila', // Placeholder, will be fetched from HRIS
      city: 'Makati City', // Placeholder, will be fetched from HRIS
      country: 'Philippines',
      

      
      // Employment Details
      employmentStatus: 'active', // Placeholder, will be fetched from HRIS
      employmentType: 'regular', // Placeholder, will be fetched from HRIS
      dateHired: applicant.appliedDate, // Placeholder, will be fetched from HRIS
      jobPosition: applicant.position,
      rank: '', // Placeholder, will be fetched from HRIS
      department: '', // Placeholder, will be fetched from HRIS
      costCenter: '', // Placeholder, will be fetched from HRIS
      locationAssigned: 'Makati Office', // Placeholder, will be fetched from HRIS
      reportsToName: 'EMP-001 (John Smith)', // Placeholder, will be fetched from HRIS
      
      // Government IDs
      umid: '',
      tin: '',
      sss: '',
      pagIbig: '',
      philhealth: '',
      hdmfMp2: '',
      
      // Tax & Payroll Information
      taxStatus: '', // Placeholder, will be fetched from HRIS
      payrollGroup: '', // Placeholder, will be fetched from HRIS
      minimumWageEarner: false, // Placeholder, will be fetched from HRIS

      basicPay: '₱25,000.00', // Placeholder, will be fetched from HRIS
      employeeBank: '', // Placeholder, will be fetched from HRIS
      bankAccount: '', // Placeholder, will be fetched from HRIS
      

      
      // Work Entitlements
      timesheetRequired: true, // Placeholder, will be fetched from HRIS
      entitledToDeminimis: false, // Placeholder, will be fetched from HRIS
      entitledToRegularHoliday: true, // Placeholder, will be fetched from HRIS
      entitledToUnworkRegularHoliday: true, // Placeholder, will be fetched from HRIS
      entitledToSpecialHoliday: true, // Placeholder, will be fetched from HRIS
      entitledToUnworkSpecialHoliday: true, // Placeholder, will be fetched from HRIS
      entitledToLeaves: true, // Placeholder, will be fetched from HRIS
      entitledToNightDifferential: false, // Placeholder, will be fetched from HRIS
      nightDifferentialRules: '', // Placeholder, will be fetched from HRIS
      entitledToOvertime: true, // Placeholder, will be fetched from HRIS
      entitledTo13thMonth: true, // Placeholder, will be fetched from HRIS
      entitledToHazardPay: false, // Placeholder, will be fetched from HRIS
      entitledToServiceCharge: false, // Placeholder, will be fetched from HRIS
      entitledToSSS: true, // Placeholder, will be fetched from HRIS
      entitledToPhilhealth: true, // Placeholder, will be fetched from HRIS
      entitledToHDMF: true, // Placeholder, will be fetched from HRIS
      entitledToHDMFMP2: false, // Placeholder, will be fetched from HRIS
      entitledToRestDayPay: true, // Placeholder, will be fetched from HRIS
      entitledToTax: true, // Placeholder, will be fetched from HRIS
      
      // Emergency Contact
      emergencyContactName: 'Maria Santos', // Placeholder, will be fetched from HRIS
      emergencyContactPhone: '+63 917 123 4567', // Placeholder, will be fetched from HRIS
      emergencyContactRelationship: 'Spouse', // Placeholder, will be fetched from HRIS
      emergencyContactAddress: '123 Main Street, Barangay San Antonio, Makati City, Metro Manila', // Placeholder, will be fetched from HRIS
      
      // Benefits Enrollment
      healthInsurance: true, // Pre-selected from job offer
      dentalInsurance: true, // Pre-selected from job offer
      lifeInsurance: true, // Pre-selected from job offer
      retirementPlan: true, // Pre-selected from job offer
      gymMembership: false, // Placeholder, will be fetched from HRIS
      
      // Leaves / Time Off
      sickLeave: true, // Pre-selected from job offer
      vacationLeave: true, // Pre-selected from job offer
      maternityLeave: false, // Placeholder, will be fetched from HRIS
      paternityLeave: false, // Placeholder, will be fetched from HRIS
      bereavementLeave: false, // Placeholder, will be fetched from HRIS
      personalLeave: false, // Placeholder, will be fetched from HRIS
      
      // Onboarding Checklist
      employeeHandbook: false, // Placeholder, will be fetched from HRIS
      codeOfConduct: false, // Placeholder, will be fetched from HRIS
      safetyTraining: false, // Placeholder, will be fetched from HRIS
      harassmentTraining: false, // Placeholder, will be fetched from HRIS
      itAccess: false, // Placeholder, will be fetched from HRIS
      emailSetup: false, // Placeholder, will be fetched from HRIS
      phoneSetup: false, // Placeholder, will be fetched from HRIS
      parkingPass: false, // Placeholder, will be fetched from HRIS
      securityBadge: false, // Placeholder, will be fetched from HRIS
      uniform: false, // Placeholder, will be fetched from HRIS
      equipment: false, // Placeholder, will be fetched from HRIS
      
      // System Integration
      assignPosition: true, // Placeholder, will be fetched from HRIS
      createPayrollRecord: true, // Placeholder, will be fetched from HRIS
      sendWelcomeEmail: true, // Placeholder, will be fetched from HRIS
      createEmailAccount: true, // Placeholder, will be fetched from HRIS
      createSystemAccess: true, // Placeholder, will be fetched from HRIS
      sendOnboardingPacket: true, // Placeholder, will be fetched from HRIS
    });
    setOpenHiringDialog(true);
  };

  const handleCloseHiringDialog = () => {
    setOpenHiringDialog(false);
    setSelectedApplicant(null);
  };

  const handleHiringFormSubmit = () => {
    // Handle form submission
    console.log('Hiring form submitted:', hiringForm);
    handleCloseHiringDialog();
  };

  const getOfferStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getOnboardingStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper functions for modern UI features
  const selectAllBenefits = () => {
    setHiringForm(prev => ({
      ...prev,
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: true,
      lifeInsurance: true,
      retirementPlan: true,
      disabilityInsurance: true,
      accidentInsurance: true,
      criticalIllnessInsurance: true,
      petInsurance: true,
      legalInsurance: true,
      identityTheftProtection: true,
      wellnessProgram: true,
      gymMembership: true,
      commuterBenefits: true,
    }));
  };

  const clearAllBenefits = () => {
    setHiringForm(prev => ({
      ...prev,
      healthInsurance: false,
      dentalInsurance: false,
      visionInsurance: false,
      lifeInsurance: false,
      retirementPlan: false,
      disabilityInsurance: false,
      accidentInsurance: false,
      criticalIllnessInsurance: false,
      petInsurance: false,
      legalInsurance: false,
      identityTheftProtection: false,
      wellnessProgram: false,
      gymMembership: false,
      commuterBenefits: false,
    }));
  };

  const selectAllOnboarding = () => {
    setHiringForm(prev => ({
      ...prev,
      employeeHandbook: true,
      codeOfConduct: true,
      safetyTraining: true,
      harassmentTraining: true,
      itAccess: true,
      emailSetup: true,
      phoneSetup: true,
      parkingPass: true,
      securityBadge: true,
      uniform: true,
      equipment: true,
    }));
  };

  const clearAllOnboarding = () => {
    setHiringForm(prev => ({
      ...prev,
      employeeHandbook: false,
      codeOfConduct: false,
      safetyTraining: false,
      harassmentTraining: false,
      itAccess: false,
      emailSetup: false,
      phoneSetup: false,
      parkingPass: false,
      securityBadge: false,
      uniform: false,
      equipment: false,
    }));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Offer & Onboarding</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Create Offer
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
                         <TableHead>
               <TableRow sx={{ backgroundColor: 'grey.50' }}>
                 <TableCell sx={{ fontWeight: 'bold' }}>Candidate</TableCell>
                 <TableCell sx={{ fontWeight: 'bold' }}>Position</TableCell>
                 <TableCell sx={{ fontWeight: 'bold' }}>Applied Date</TableCell>
                 <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                 <TableCell sx={{ fontWeight: 'bold' }}>Score Card</TableCell>
                 <TableCell sx={{ fontWeight: 'bold' }}>Offer</TableCell>
                 <TableCell sx={{ fontWeight: 'bold' }}>Hire Docs</TableCell>
                 <TableCell sx={{ fontWeight: 'bold' }}>Ready for Hire</TableCell>
               </TableRow>
             </TableHead>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.id} hover>
                  {/* Candidate Column */}
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar 
                        sx={{ 
                          width: 40, 
                          height: 40,
                          bgcolor: `hsl(${(applicant.name.charCodeAt(0) * 10) % 360}, 70%, 50%)`
                        }}
                      >
                        {applicant.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {applicant.name}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                          <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" color="textSecondary">
                            {applicant.email}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                          <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" color="textSecondary">
                            {applicant.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>

                                     {/* Position Column */}
                   <TableCell>
                     <Box display="flex" alignItems="center" gap={1}>
                       <WorkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                       <Typography variant="body2">{applicant.position}</Typography>
                     </Box>
                   </TableCell>

                   {/* Applied Date Column */}
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(applicant.appliedDate)}
                    </Typography>
                  </TableCell>

                  {/* Location Column */}
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">{applicant.location}</Typography>
                    </Box>
                  </TableCell>

                  {/* Final Interview Score Column */}
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AssessmentIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: applicant.finalInterviewScore >= 90 ? 'success.main' : 
                                 applicant.finalInterviewScore >= 80 ? 'primary.main' : 'warning.main'
                        }}
                      >
                        {applicant.finalInterviewScore}%
                      </Typography>
                    </Box>
                  </TableCell>

                                     {/* Offer Status Column */}
                   <TableCell>
                     <Box display="flex" flexDirection="column" gap={0.5}>
                       <Chip 
                         label={applicant.offerStatus.toUpperCase()} 
                         color={getOfferStatusColor(applicant.offerStatus) as any} 
                         size="small"
                       />
                       {applicant.offerStatus === 'draft' && (
                         <Typography variant="caption" color="textSecondary">
                           Preparing offer
                         </Typography>
                       )}
                       {applicant.offerStatus === 'pending' && applicant.daysToRespond && (
                         <Typography variant="caption" color="warning.main">
                           {applicant.daysToRespond} days left
                         </Typography>
                       )}
                       {applicant.offerStatus === 'accepted' && applicant.offerResponseDate && (
                         <Typography variant="caption" color="textSecondary">
                           {formatDate(applicant.offerResponseDate)}
                         </Typography>
                       )}
                       {applicant.offerStatus === 'rejected' && applicant.offerResponseDate && (
                         <Typography variant="caption" color="textSecondary">
                           {formatDate(applicant.offerResponseDate)}
                         </Typography>
                       )}
                     </Box>
                   </TableCell>

                                     {/* Onboarding Documents Status Column */}
                   <TableCell>
                     <Typography 
                       variant="body2" 
                       color={applicant.onboardingDocumentsStatus === 'complete' ? 'success.main' : 'warning.main'}
                       sx={{ fontWeight: 'medium' }}
                     >
                       {applicant.onboardingDocumentsStatus.toUpperCase()}
                     </Typography>
                   </TableCell>

                  {/* Ready for Hire Column */}
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleReadyForHire(applicant)}
                      disabled={applicant.offerStatus !== 'accepted'}
                      sx={{ 
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 2
                      }}
                    >
                      Ready for Hire
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Hiring Form Dialog */}
      <Dialog open={openHiringDialog} onClose={handleCloseHiringDialog} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h6">Hiring {selectedApplicant?.name}</Typography>
            <Chip label="Payroll Integration" color="primary" size="small" />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Complete the employee information for payroll system integration. Pre-filled data from HRIS is marked with a checkmark.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            
            {/* Personal Information Section */}
            <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon /> Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First name*"
                    value={hiringForm.firstName}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'primary.main',
                        '& fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Last name*"
                    value="Thompson"
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'primary.main',
                        '& fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email*"
                    value={hiringForm.email}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone*"
                    value={hiringForm.primaryMobileNumber}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Birthdate*"
                    type="date"
                    value={hiringForm.birthdate}
                    disabled
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ position: 'relative' }}>
                    <FormControl fullWidth>
                      <InputLabel>Gender*</InputLabel>
                      <Select
                        value={hiringForm.gender}
                        disabled
                        label="Gender*"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderColor: 'success.main',
                            '& fieldset': {
                              borderColor: 'success.main',
                            },
                            '&:hover fieldset': {
                              borderColor: 'success.main',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'success.main',
                            },
                          },
                          '& .MuiSelect-select': {
                            paddingLeft: '40px',
                          },
                        }}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                    <CheckCircleIcon 
                      sx={{ 
                        position: 'absolute', 
                        left: 12, 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        color: 'primary.main', 
                        fontSize: 16,
                        zIndex: 1
                      }} 
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ position: 'relative' }}>
                    <FormControl fullWidth>
                      <InputLabel>Citizenship*</InputLabel>
                      <Select
                        value={hiringForm.citizenship}
                        disabled
                        label="Citizenship*"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderColor: 'success.main',
                            '& fieldset': {
                              borderColor: 'success.main',
                            },
                            '&:hover fieldset': {
                              borderColor: 'success.main',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'success.main',
                            },
                          },
                          '& .MuiSelect-select': {
                            paddingLeft: '40px',
                          },
                        }}
                      >
                        <MenuItem value="Filipino">Filipino</MenuItem>
                        <MenuItem value="Foreigner">Foreigner</MenuItem>
                      </Select>
                    </FormControl>
                    <CheckCircleIcon 
                      sx={{ 
                        position: 'absolute', 
                        left: 12, 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        color: 'primary.main', 
                        fontSize: 16,
                        zIndex: 1
                      }} 
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ position: 'relative' }}>
                    <FormControl fullWidth>
                      <InputLabel>Marital Status*</InputLabel>
                      <Select
                        value={hiringForm.maritalStatus}
                        disabled
                        label="Marital Status*"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderColor: 'success.main',
                            '& fieldset': {
                              borderColor: 'success.main',
                            },
                            '&:hover fieldset': {
                              borderColor: 'success.main',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'success.main',
                            },
                          },
                          '& .MuiSelect-select': {
                            paddingLeft: '40px',
                          },
                        }}
                      >
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                        <MenuItem value="Widowed">Widowed</MenuItem>
                        <MenuItem value="Divorced">Divorced</MenuItem>
                      </Select>
                    </FormControl>
                    <CheckCircleIcon 
                      sx={{ 
                        position: 'absolute', 
                        left: 12, 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        color: 'primary.main', 
                        fontSize: 16,
                        zIndex: 1
                      }} 
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Address Information Section */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon /> Address Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address*"
                    value={hiringForm.address}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Province*"
                    value={hiringForm.province}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="City*"
                    value={hiringForm.city}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Country*"
                    value={hiringForm.country}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>



            {/* Employment Details Section */}
            <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WorkIcon /> Employment Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Employee ID*"
                    value="02-01444"
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Hire Date*"
                    type="date"
                    value={hiringForm.dateHired}
                    disabled
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Employment Status*</InputLabel>
                    <Select
                      value={hiringForm.employmentStatus}
                      disabled
                      label="Employment Status*"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderColor: 'success.main',
                          '& fieldset': {
                            borderColor: 'success.main',
                          },
                          '&:hover fieldset': {
                            borderColor: 'success.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'success.main',
                          },
                        },
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="terminated">Terminated</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Employment Type*</InputLabel>
                    <Select
                      value={hiringForm.employmentType}
                      disabled
                      label="Employment Type*"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderColor: 'success.main',
                          '& fieldset': {
                            borderColor: 'success.main',
                          },
                          '&:hover fieldset': {
                            borderColor: 'success.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'success.main',
                          },
                        },
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem value="regular">Regular</MenuItem>
                      <MenuItem value="probationary">Probationary</MenuItem>
                      <MenuItem value="contractual">Contractual</MenuItem>
                      <MenuItem value="project-based">Project-based</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Job Position*"
                    value={hiringForm.jobPosition}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Rank"
                    value={hiringForm.rank}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Department*</InputLabel>
                    <Select
                      value={hiringForm.department}
                      disabled
                      label="Department*"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderColor: 'success.main',
                          '& fieldset': {
                            borderColor: 'success.main',
                          },
                          '&:hover fieldset': {
                            borderColor: 'success.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'success.main',
                          },
                        },
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem value="IT">IT</MenuItem>
                      <MenuItem value="Human Resources">Human Resources</MenuItem>
                      <MenuItem value="Finance">Finance</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                      <MenuItem value="Sales">Sales</MenuItem>
                      <MenuItem value="Operations">Operations</MenuItem>
                      <MenuItem value="Customer Service">Customer Service</MenuItem>
                      <MenuItem value="Legal">Legal</MenuItem>
                      <MenuItem value="Administration">Administration</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Cost Center"
                    value={hiringForm.costCenter}
                    onChange={(e) => setHiringForm({ ...hiringForm, costCenter: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location Assigned"
                    value={hiringForm.locationAssigned}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Reports To (Name)"
                    value={hiringForm.reportsToName}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Payroll & Tax Information Section */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachMoneyIcon /> Payroll & Tax Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Basic Pay*"
                    value={hiringForm.basicPay}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'success.main',
                        '& fieldset': {
                          borderColor: 'success.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'success.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'success.main',
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                      endAdornment: <InputAdornment position="end">₱</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.minimumWageEarner}
                        onChange={(e) => setHiringForm({ ...hiringForm, minimumWageEarner: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Minimum Wage Earner"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Payroll Group</InputLabel>
                    <Select
                      value={hiringForm.payrollGroup}
                      onChange={(e) => setHiringForm({ ...hiringForm, payrollGroup: e.target.value })}
                      label="Payroll Group"
                    >
                      <MenuItem value="Regular">Regular</MenuItem>
                      <MenuItem value="Managerial">Managerial</MenuItem>
                      <MenuItem value="Executive">Executive</MenuItem>
                      <MenuItem value="Contractual">Contractual</MenuItem>
                      <MenuItem value="Probationary">Probationary</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Tax Rule*</InputLabel>
                    <Select
                      value={hiringForm.taxStatus}
                      onChange={(e) => setHiringForm({ ...hiringForm, taxStatus: e.target.value })}
                      label="Tax Rule*"
                    >
                      <MenuItem value="table-based">Table-based</MenuItem>
                      <MenuItem value="fixed">Fixed</MenuItem>
                      <MenuItem value="ewt">EWT</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="TIN"
                    value={hiringForm.tin}
                    onChange={(e) => setHiringForm({ ...hiringForm, tin: e.target.value })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small">
                            <UploadIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Bank"
                    value={hiringForm.employeeBank}
                    onChange={(e) => setHiringForm({ ...hiringForm, employeeBank: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Bank Account"
                    value={hiringForm.bankAccount}
                    onChange={(e) => setHiringForm({ ...hiringForm, bankAccount: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Paper>





            {/* Benefits Enrollment Section */}
            <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon /> Benefits Enrollment
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.healthInsurance}
                        onChange={(e) => setHiringForm({ ...hiringForm, healthInsurance: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Health Insurance"
                  />
                  {hiringForm.healthInsurance && (
                    <Box sx={{ mt: 1, p: 2, backgroundColor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Plan:</strong> Maxicare Gold Plan<br />
                        <strong>Insurer:</strong> Maxicare Healthcare Corporation<br />
                        <strong>Coverage:</strong> Inpatient, Outpatient, Dental, Vision<br />
                        <strong>Effective Date:</strong> January 1, 2024
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.dentalInsurance}
                        onChange={(e) => setHiringForm({ ...hiringForm, dentalInsurance: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Dental Insurance"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.lifeInsurance}
                        onChange={(e) => setHiringForm({ ...hiringForm, lifeInsurance: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Life Insurance"
                  />
                  {hiringForm.lifeInsurance && (
                    <Box sx={{ mt: 1, p: 2, backgroundColor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Plan:</strong> Group Life Insurance<br />
                        <strong>Insurer:</strong> Sun Life Financial<br />
                        <strong>Coverage Amount:</strong> ₱500,000<br />
                        <strong>Effective Date:</strong> January 1, 2024
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.retirementPlan}
                        onChange={(e) => setHiringForm({ ...hiringForm, retirementPlan: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Retirement Plan"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.gymMembership}
                        onChange={(e) => setHiringForm({ ...hiringForm, gymMembership: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Gym Membership"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Leaves / Time Off Section */}
            <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScheduleIcon /> Leaves / Time Off
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.sickLeave}
                        onChange={(e) => setHiringForm({ ...hiringForm, sickLeave: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Sick Leave"
                  />
                  {hiringForm.sickLeave && (
                    <Box sx={{ mt: 1, p: 2, backgroundColor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Credits:</strong> 10 credits<br />
                        <strong>Monthly Accrual:</strong> 0.833 credit/month<br />
                        <strong>Effective Date:</strong> Oct 12, 2025
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.vacationLeave}
                        onChange={(e) => setHiringForm({ ...hiringForm, vacationLeave: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Vacation Leave"
                  />
                  {hiringForm.vacationLeave && (
                    <Box sx={{ mt: 1, p: 2, backgroundColor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Credits:</strong> 12 credits<br />
                        <strong>Monthly Accrual:</strong> 1 credit/month<br />
                        <strong>Effective Date:</strong> Oct 12, 2025
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.maternityLeave}
                        onChange={(e) => setHiringForm({ ...hiringForm, maternityLeave: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Maternity Leave"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.paternityLeave}
                        onChange={(e) => setHiringForm({ ...hiringForm, paternityLeave: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Paternity Leave"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.bereavementLeave}
                        onChange={(e) => setHiringForm({ ...hiringForm, bereavementLeave: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Bereavement Leave"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.personalLeave}
                        onChange={(e) => setHiringForm({ ...hiringForm, personalLeave: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Personal Leave"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Contribution Benefits Section */}
            <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BadgeIcon /> Contribution Benefits
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.entitledToSSS}
                        onChange={(e) => setHiringForm({ ...hiringForm, entitledToSSS: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="SSS"
                  />
                  {hiringForm.entitledToSSS && (
                    <TextField
                      fullWidth
                      label="SSS ID Number"
                      value={hiringForm.sss}
                      onChange={(e) => setHiringForm({ ...hiringForm, sss: e.target.value })}
                      sx={{ mt: 1 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton size="small">
                              <UploadIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.entitledToHDMF}
                        onChange={(e) => setHiringForm({ ...hiringForm, entitledToHDMF: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="HDMF (Pag-IBIG)"
                  />
                  {hiringForm.entitledToHDMF && (
                    <TextField
                      fullWidth
                      label="HDMF ID Number"
                      value={hiringForm.pagIbig}
                      onChange={(e) => setHiringForm({ ...hiringForm, pagIbig: e.target.value })}
                      sx={{ mt: 1 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton size="small">
                              <UploadIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.entitledToPhilhealth}
                        onChange={(e) => setHiringForm({ ...hiringForm, entitledToPhilhealth: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="PHIC (Philhealth)"
                  />
                  {hiringForm.entitledToPhilhealth && (
                    <TextField
                      fullWidth
                      label="PHIC ID Number"
                      value={hiringForm.philhealth}
                      onChange={(e) => setHiringForm({ ...hiringForm, philhealth: e.target.value })}
                      sx={{ mt: 1 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton size="small">
                              <UploadIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.entitledToHDMFMP2}
                        onChange={(e) => setHiringForm({ ...hiringForm, entitledToHDMFMP2: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="HDMF-MP2"
                  />
                  {hiringForm.entitledToHDMFMP2 && (
                    <TextField
                      fullWidth
                      label="HDMF-MP2 ID Number"
                      value={hiringForm.hdmfMp2}
                      onChange={(e) => setHiringForm({ ...hiringForm, hdmfMp2: e.target.value })}
                      sx={{ mt: 1 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton size="small">
                              <UploadIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="UMID"
                    value={hiringForm.umid}
                    onChange={(e) => setHiringForm({ ...hiringForm, umid: e.target.value })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small">
                            <UploadIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

              </Grid>
            </Paper>

                         {/* Work Entitlements Section */}
             <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
               <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 <ScheduleIcon /> Work Entitlements
               </Typography>
               <Box sx={{ mb: 2 }}>
                 <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                   Select entitlements for this employee:
                 </Typography>
                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, minHeight: 56 }}>
                   {hiringForm.timesheetRequired && (
                     <Chip
                       label="Timesheet Required"
                       onDelete={() => setHiringForm({ ...hiringForm, timesheetRequired: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToDeminimis && (
                     <Chip
                       label="Deminimis"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToDeminimis: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToRegularHoliday && (
                     <Chip
                       label="Regular Holiday"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToRegularHoliday: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToUnworkRegularHoliday && (
                     <Chip
                       label="Unwork Regular Holiday"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToUnworkRegularHoliday: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToSpecialHoliday && (
                     <Chip
                       label="Special Holiday"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToSpecialHoliday: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToUnworkSpecialHoliday && (
                     <Chip
                       label="Unwork Special Holiday"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToUnworkSpecialHoliday: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToLeaves && (
                     <Chip
                       label="Leaves"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToLeaves: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToNightDifferential && (
                     <Chip
                       label="Night Differential"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToNightDifferential: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToOvertime && (
                     <Chip
                       label="Overtime"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToOvertime: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledTo13thMonth && (
                     <Chip
                       label="13th Month Pay"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledTo13thMonth: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToHazardPay && (
                     <Chip
                       label="Hazard Pay"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToHazardPay: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToServiceCharge && (
                     <Chip
                       label="Service Charge"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToServiceCharge: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToSSS && (
                     <Chip
                       label="SSS"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToSSS: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToPhilhealth && (
                     <Chip
                       label="Philhealth"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToPhilhealth: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToHDMF && (
                     <Chip
                       label="HDMF (Pag-IBIG)"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToHDMF: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToRestDayPay && (
                     <Chip
                       label="Rest Day Pay"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToRestDayPay: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                   {hiringForm.entitledToTax && (
                     <Chip
                       label="Tax"
                       onDelete={() => setHiringForm({ ...hiringForm, entitledToTax: false })}
                       color="primary"
                       size="small"
                     />
                   )}
                 </Box>
               </Box>
               
               <FormControl fullWidth>
                 <InputLabel>Add Entitlements</InputLabel>
                 <Select
                   multiple
                   value={[]}
                   onChange={(e) => {
                     const value = e.target.value as string[];
                     if (value.length > 0) {
                       const newEntitlement = value[value.length - 1];
                       switch (newEntitlement) {
                         case 'timesheetRequired':
                           setHiringForm({ ...hiringForm, timesheetRequired: true });
                           break;
                         case 'entitledToDeminimis':
                           setHiringForm({ ...hiringForm, entitledToDeminimis: true });
                           break;
                         case 'entitledToRegularHoliday':
                           setHiringForm({ ...hiringForm, entitledToRegularHoliday: true });
                           break;
                         case 'entitledToUnworkRegularHoliday':
                           setHiringForm({ ...hiringForm, entitledToUnworkRegularHoliday: true });
                           break;
                         case 'entitledToSpecialHoliday':
                           setHiringForm({ ...hiringForm, entitledToSpecialHoliday: true });
                           break;
                         case 'entitledToUnworkSpecialHoliday':
                           setHiringForm({ ...hiringForm, entitledToUnworkSpecialHoliday: true });
                           break;
                         case 'entitledToLeaves':
                           setHiringForm({ ...hiringForm, entitledToLeaves: true });
                           break;
                         case 'entitledToNightDifferential':
                           setHiringForm({ ...hiringForm, entitledToNightDifferential: true });
                           break;
                         case 'entitledToOvertime':
                           setHiringForm({ ...hiringForm, entitledToOvertime: true });
                           break;
                         case 'entitledTo13thMonth':
                           setHiringForm({ ...hiringForm, entitledTo13thMonth: true });
                           break;
                         case 'entitledToHazardPay':
                           setHiringForm({ ...hiringForm, entitledToHazardPay: true });
                           break;
                         case 'entitledToServiceCharge':
                           setHiringForm({ ...hiringForm, entitledToServiceCharge: true });
                           break;
                         case 'entitledToSSS':
                           setHiringForm({ ...hiringForm, entitledToSSS: true });
                           break;
                         case 'entitledToPhilhealth':
                           setHiringForm({ ...hiringForm, entitledToPhilhealth: true });
                           break;
                         case 'entitledToHDMF':
                           setHiringForm({ ...hiringForm, entitledToHDMF: true });
                           break;
                         case 'entitledToRestDayPay':
                           setHiringForm({ ...hiringForm, entitledToRestDayPay: true });
                           break;
                         case 'entitledToTax':
                           setHiringForm({ ...hiringForm, entitledToTax: true });
                           break;
                       }
                     }
                   }}
                   label="Add Entitlements"
                   renderValue={() => ''}
                 >
                   <MenuItem value="timesheetRequired">Timesheet Required</MenuItem>
                   <MenuItem value="entitledToDeminimis">Deminimis</MenuItem>
                   <MenuItem value="entitledToRegularHoliday">Regular Holiday</MenuItem>
                   <MenuItem value="entitledToUnworkRegularHoliday">Unwork Regular Holiday</MenuItem>
                   <MenuItem value="entitledToSpecialHoliday">Special Holiday</MenuItem>
                   <MenuItem value="entitledToUnworkSpecialHoliday">Unwork Special Holiday</MenuItem>
                   <MenuItem value="entitledToLeaves">Leaves</MenuItem>
                   <MenuItem value="entitledToNightDifferential">Night Differential</MenuItem>
                   <MenuItem value="entitledToOvertime">Overtime</MenuItem>
                   <MenuItem value="entitledTo13thMonth">13th Month Pay</MenuItem>
                   <MenuItem value="entitledToHazardPay">Hazard Pay</MenuItem>
                   <MenuItem value="entitledToServiceCharge">Service Charge</MenuItem>
                   <MenuItem value="entitledToSSS">SSS</MenuItem>
                   <MenuItem value="entitledToPhilhealth">Philhealth</MenuItem>
                   <MenuItem value="entitledToHDMF">HDMF (Pag-IBIG)</MenuItem>
                   <MenuItem value="entitledToRestDayPay">Rest Day Pay</MenuItem>
                   <MenuItem value="entitledToTax">Tax</MenuItem>
                 </Select>
               </FormControl>
               
               {hiringForm.entitledToNightDifferential && (
                 <Box sx={{ mt: 2 }}>
                   <TextField
                     fullWidth
                     label="Night Differential Rules"
                     value={hiringForm.nightDifferentialRules}
                     onChange={(e) => setHiringForm({ ...hiringForm, nightDifferentialRules: e.target.value })}
                   />
                 </Box>
               )}
             </Paper>



            {/* Emergency Contact Section */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon /> Emergency Contact
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact Name*"
                    value={hiringForm.emergencyContactName}
                    onChange={(e) => setHiringForm({ ...hiringForm, emergencyContactName: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact Phone*"
                    value={hiringForm.emergencyContactPhone}
                    onChange={(e) => setHiringForm({ ...hiringForm, emergencyContactPhone: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Relationship"
                    value={hiringForm.emergencyContactRelationship}
                    onChange={(e) => setHiringForm({ ...hiringForm, emergencyContactRelationship: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>



            {/* Onboarding Checklist Section */}
            <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon /> Onboarding Checklist
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.employeeHandbook}
                        onChange={(e) => setHiringForm({ ...hiringForm, employeeHandbook: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Employee Handbook"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.codeOfConduct}
                        onChange={(e) => setHiringForm({ ...hiringForm, codeOfConduct: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Code of Conduct"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.safetyTraining}
                        onChange={(e) => setHiringForm({ ...hiringForm, safetyTraining: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Safety Training"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.harassmentTraining}
                        onChange={(e) => setHiringForm({ ...hiringForm, harassmentTraining: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Harassment Training"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.itAccess}
                        onChange={(e) => setHiringForm({ ...hiringForm, itAccess: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="IT Access"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.emailSetup}
                        onChange={(e) => setHiringForm({ ...hiringForm, emailSetup: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Email Setup"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.phoneSetup}
                        onChange={(e) => setHiringForm({ ...hiringForm, phoneSetup: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Phone Setup"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.parkingPass}
                        onChange={(e) => setHiringForm({ ...hiringForm, parkingPass: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Parking Pass"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.securityBadge}
                        onChange={(e) => setHiringForm({ ...hiringForm, securityBadge: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Security Badge"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.uniform}
                        onChange={(e) => setHiringForm({ ...hiringForm, uniform: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Uniform"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.equipment}
                        onChange={(e) => setHiringForm({ ...hiringForm, equipment: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Equipment"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* System Integration Section */}
            <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SettingsIcon /> System Integration
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.assignPosition}
                        onChange={(e) => setHiringForm({ ...hiringForm, assignPosition: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Assign Position"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.createPayrollRecord}
                        onChange={(e) => setHiringForm({ ...hiringForm, createPayrollRecord: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Create Payroll Record"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.sendWelcomeEmail}
                        onChange={(e) => setHiringForm({ ...hiringForm, sendWelcomeEmail: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Send Welcome Email"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.createEmailAccount}
                        onChange={(e) => setHiringForm({ ...hiringForm, createEmailAccount: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Create Email Account"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.createSystemAccess}
                        onChange={(e) => setHiringForm({ ...hiringForm, createSystemAccess: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Create System Access"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringForm.sendOnboardingPacket}
                        onChange={(e) => setHiringForm({ ...hiringForm, sendOnboardingPacket: e.target.checked })}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSvgIcon-root': {
                            borderRadius: '50%',
                          },
                        }}
                      />
                    }
                    label="Send Onboarding Packet"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHiringDialog} sx={{ color: 'text.secondary' }}>
            Back
          </Button>
          <Button 
            variant="contained" 
            onClick={handleHiringFormSubmit}
            sx={{ 
              backgroundColor: '#ff9800',
              color: 'black',
              '&:hover': {
                backgroundColor: '#f57c00',
              }
            }}
          >
            Complete Hiring Process
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OfferOnboarding; 