import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  FormGroup,
  Checkbox,
  FormControlLabel,
  OutlinedInput,
  InputAdornment,
  Collapse,
  Divider,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  DragIndicator as DragIcon,
  Settings as SettingsIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Clear as ClearIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  VideoCall as VideoCallIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Candidate {
  // Basic Information
  id: string;
  applicant_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  name: string; // Keep for backward compatibility
  position: string;
  jobId: string;
  jobTitle: string;
  
  // Personal Information
  dob: string;
  gender: string;
  civil_status: string;
  nationality: string;
  
  // Contact Information
  email: string;
  phone: string;
  
  // Application Details
  application_date: string;
  position_applied: string;
  recruitment_source: string;
  recruiter_id: string;
  resume_file?: string;
  
  // Interview Information
  initial_interview_date?: string;
  technical_interview_date?: string;
  hr_interview_date?: string;
  interview_feedback?: string;
  
  // Status and Progress
  application_status: string;
  status: string; // Keep for backward compatibility
  job_offer_date?: string;
  offer_accepted?: boolean;
  
  // Onboarding
  onboarding_start_date?: string;
  onboarding_complete?: boolean;
  
  // Additional fields for display
  avatar?: string;
  lastActivity: string;
  experience: string;
  location: string;
  
  // Screening fields
  skills?: string[];
  score?: number;
  education?: string;
  
  // Interview scores
  interviewScores?: {
    preliminary?: number;
    final?: number;
  };

  // Interview scheduling data
  interviewData?: {
    id: string;
    date: string;
    time: string;
    interviewer: string;
    secondInterviewer?: string;
    type: 'phone' | 'video' | 'onsite';
    status: 'scheduled' | 'completed' | 'cancelled';
    tags?: string[];
  };
}

interface JobRequisition {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'closed' | 'on-hold';
  location: string;
}

interface PipelineStage {
  id: string;
  name: string;
  candidates: Candidate[];
  color: string;
  order: number;
}

// Interview data from Interview Coordination page
const interviewData = [
  {
    id: '1',
    candidateId: '4',
    candidateName: 'Lisa Chen',
    position: 'UX Designer',
    interviewer: 'Patricia Williams',
    date: '2024-01-23',
    time: '3:00 PM',
    type: 'video' as const,
    status: 'scheduled' as const,
    tags: ['preliminary'],
  },
  {
    id: '2',
    candidateId: '10',
    candidateName: 'Sophie Chen',
    position: 'Senior Developer',
    interviewer: 'Olivia Parker',
    date: '2024-01-22',
    time: '11:00 AM',
    type: 'onsite' as const,
    status: 'scheduled' as const,
    tags: ['final'],
    interviewScores: {
      preliminary: 88,
      final: 94,
    },
  },
  {
    id: '3',
    candidateId: '11',
    candidateName: 'Ryan Martinez',
    position: 'Sales Representative',
    interviewer: 'Daniel Lewis',
    date: '2024-01-23',
    time: '2:00 PM',
    type: 'video' as const,
    status: 'scheduled' as const,
    tags: ['final'],
  },
  {
    id: '4',
    candidateId: '12',
    candidateName: 'Natalie Brown',
    position: 'UX Designer',
    interviewer: 'Sophia Turner',
    date: '2024-01-24',
    time: '9:00 AM',
    type: 'video' as const,
    status: 'scheduled' as const,
    tags: ['preliminary'],
  },
  {
    id: '5',
    candidateId: '13',
    candidateName: 'Kevin Lee',
    position: 'UX Designer',
    interviewer: 'Emma Davis',
    date: '2024-01-25',
    time: '1:00 PM',
    type: 'onsite' as const,
    status: 'scheduled' as const,
    tags: ['preliminary'],
  },
];

const ATS: React.FC = () => {
  const [stages, setStages] = useState<PipelineStage[]>([
    {
      id: 'applied',
      name: 'Candidates',
      color: '#e3f2fd',
      order: 1,
      candidates: [
        {
          id: '1',
          applicant_id: 'APP001',
          first_name: 'John',
          middle_name: '',
          last_name: 'Smith',
          suffix: '',
          name: 'John Smith',
          position: 'Senior Developer',
          jobId: 'job1',
          jobTitle: 'Senior Software Developer',
          dob: '1985-03-15',
          gender: 'Male',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          application_date: '2024-01-15',
          position_applied: 'Senior Software Developer',
          recruitment_source: 'LinkedIn',
          recruiter_id: 'REC001',
          resume_file: 'john_smith_resume.pdf',
          application_status: 'applied',
          status: 'applied',
          lastActivity: '2024-01-15',
          experience: '5 years',
          location: 'San Francisco, CA',
        },
        {
          id: '2',
          applicant_id: 'APP002',
          first_name: 'Sarah',
          middle_name: '',
          last_name: 'Johnson',
          suffix: '',
          name: 'Sarah Johnson',
          position: 'Marketing Manager',
          jobId: 'job2',
          jobTitle: 'Marketing Manager',
          dob: '1990-07-22',
          gender: 'Female',
          civil_status: 'Married',
          nationality: 'US Citizen',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 234-5678',
          application_date: '2024-01-14',
          position_applied: 'Marketing Manager',
          recruitment_source: 'Indeed',
          recruiter_id: 'REC002',
          resume_file: 'sarah_johnson_resume.pdf',
          application_status: 'applied',
          status: 'applied',
          lastActivity: '2024-01-14',
          experience: '3 years',
          location: 'New York, NY',
        },
        {
          id: '18',
          applicant_id: 'APP018',
          first_name: 'Alex',
          middle_name: '',
          last_name: 'Thompson',
          suffix: '',
          name: 'Alex Thompson',
          position: 'DevOps Engineer',
          jobId: 'job6',
          jobTitle: 'DevOps Engineer',
          dob: '1987-04-12',
          gender: 'Male',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'alex.thompson@email.com',
          phone: '+1 (555) 345-6789',
          application_date: '2024-01-20',
          position_applied: 'DevOps Engineer',
          recruitment_source: 'GitHub',
          recruiter_id: 'REC018',
          resume_file: 'alex_thompson_resume.pdf',
          application_status: 'applied',
          status: 'applied',
          lastActivity: '2024-01-20',
          experience: '6 years',
          location: 'Seattle, WA',
        },
        {
          id: '19',
          applicant_id: 'APP019',
          first_name: 'Maria',
          middle_name: '',
          last_name: 'Garcia',
          suffix: '',
          name: 'Maria Garcia',
          position: 'HR Specialist',
          jobId: 'job7',
          jobTitle: 'HR Specialist',
          dob: '1992-09-18',
          gender: 'Female',
          civil_status: 'Married',
          nationality: 'US Citizen',
          email: 'maria.garcia@email.com',
          phone: '+1 (555) 456-7890',
          application_date: '2024-01-19',
          position_applied: 'HR Specialist',
          recruitment_source: 'Company Website',
          recruiter_id: 'REC019',
          resume_file: 'maria_garcia_resume.pdf',
          application_status: 'applied',
          status: 'applied',
          lastActivity: '2024-01-19',
          experience: '4 years',
          location: 'Austin, TX',
        },
        {
          id: '20',
          applicant_id: 'APP020',
          first_name: 'James',
          middle_name: '',
          last_name: 'Wilson',
          suffix: '',
          name: 'James Wilson',
          position: 'Marketing Manager',
          jobId: 'job2',
          jobTitle: 'Marketing Manager',
          dob: '1989-12-03',
          gender: 'Male',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'james.wilson@email.com',
          phone: '+1 (555) 567-8901',
          application_date: '2024-01-18',
          position_applied: 'Marketing Manager',
          recruitment_source: 'LinkedIn',
          recruiter_id: 'REC020',
          resume_file: 'james_wilson_resume.pdf',
          application_status: 'applied',
          status: 'applied',
          lastActivity: '2024-01-18',
          experience: '5 years',
          location: 'Chicago, IL',
        },
        {
          id: '21',
          applicant_id: 'APP021',
          first_name: 'Sophie',
          middle_name: '',
          last_name: 'Chen',
          suffix: '',
          name: 'Sophie Chen',
          position: 'Senior Developer',
          jobId: 'job1',
          jobTitle: 'Senior Software Developer',
          dob: '1986-06-25',
          gender: 'Female',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'sophie.chen@email.com',
          phone: '+1 (555) 678-9012',
          application_date: '2024-01-17',
          position_applied: 'Senior Software Developer',
          recruitment_source: 'Indeed',
          recruiter_id: 'REC021',
          resume_file: 'sophie_chen_resume.pdf',
          application_status: 'applied',
          status: 'applied',
          lastActivity: '2024-01-17',
          experience: '8 years',
          location: 'Boston, MA',
        },
        {
          id: '22',
          applicant_id: 'APP022',
          first_name: 'Ryan',
          middle_name: '',
          last_name: 'Martinez',
          suffix: '',
          name: 'Ryan Martinez',
          position: 'Sales Representative',
          jobId: 'job5',
          jobTitle: 'Sales Representative',
          dob: '1991-03-14',
          gender: 'Male',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'ryan.martinez@email.com',
          phone: '+1 (555) 789-0123',
          application_date: '2024-01-16',
          position_applied: 'Sales Representative',
          recruitment_source: 'Glassdoor',
          recruiter_id: 'REC022',
          resume_file: 'ryan_martinez_resume.pdf',
          application_status: 'applied',
          status: 'applied',
          lastActivity: '2024-01-16',
          experience: '3 years',
          location: 'Miami, FL',
        },
        {
          id: '23',
          applicant_id: 'APP023',
          first_name: 'Natalie',
          middle_name: '',
          last_name: 'Brown',
          suffix: '',
          name: 'Natalie Brown',
          position: 'UX Designer',
          jobId: 'job4',
          jobTitle: 'UX Designer',
          dob: '1993-11-08',
          gender: 'Female',
          civil_status: 'Married',
          nationality: 'US Citizen',
          email: 'natalie.brown@email.com',
          phone: '+1 (555) 890-1234',
          application_date: '2024-01-15',
          position_applied: 'UX Designer',
          recruitment_source: 'Dribbble',
          recruiter_id: 'REC023',
          resume_file: 'natalie_brown_resume.pdf',
          application_status: 'applied',
          status: 'applied',
          lastActivity: '2024-01-15',
          experience: '4 years',
          location: 'Portland, OR',
        },
      ],
    },
    {
      id: 'screening',
      name: 'Screening',
      color: '#fff3e0',
      order: 2,
      candidates: [
        {
          id: '3',
          applicant_id: 'APP003',
          first_name: 'Mike',
          middle_name: '',
          last_name: 'Davis',
          suffix: '',
          name: 'Mike Davis',
          position: 'Product Manager',
          jobId: 'job3',
          jobTitle: 'Product Manager',
          dob: '1988-11-08',
          gender: 'Male',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'mike.davis@email.com',
          phone: '+1 (555) 345-6789',
          application_date: '2024-01-13',
          position_applied: 'Product Manager',
          recruitment_source: 'Company Website',
          recruiter_id: 'REC003',
          resume_file: 'mike_davis_resume.pdf',
          application_status: 'screening',
          status: 'screening',
          lastActivity: '2024-01-16',
          experience: '7 years',
          location: 'Austin, TX',
          skills: ['Product Management', 'Agile', 'Scrum', 'User Research', 'Data Analysis'],
          score: 78,
          education: 'MBA in Business Administration',
        },
        {
          id: '16',
          applicant_id: 'APP016',
          first_name: 'John',
          middle_name: '',
          last_name: 'Smith',
          suffix: '',
          name: 'John Smith',
          position: 'Senior Developer',
          jobId: 'job1',
          jobTitle: 'Senior Software Developer',
          dob: '1985-03-15',
          gender: 'Male',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          application_date: '2024-01-15',
          position_applied: 'Senior Software Developer',
          recruitment_source: 'LinkedIn',
          recruiter_id: 'REC001',
          resume_file: 'john_smith_resume.pdf',
          application_status: 'screening',
          status: 'screening',
          lastActivity: '2024-01-20',
          experience: '5 years',
          location: 'San Francisco, CA',
          skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
          score: 85,
          education: 'Bachelor in Computer Science',
        },
        {
          id: '17',
          applicant_id: 'APP017',
          first_name: 'Sarah',
          middle_name: '',
          last_name: 'Johnson',
          suffix: '',
          name: 'Sarah Johnson',
          position: 'Marketing Manager',
          jobId: 'job2',
          jobTitle: 'Marketing Manager',
          dob: '1990-07-22',
          gender: 'Female',
          civil_status: 'Married',
          nationality: 'US Citizen',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 234-5678',
          application_date: '2024-01-14',
          position_applied: 'Marketing Manager',
          recruitment_source: 'Indeed',
          recruiter_id: 'REC002',
          resume_file: 'sarah_johnson_resume.pdf',
          application_status: 'screening',
          status: 'screening',
          lastActivity: '2024-01-21',
          experience: '3 years',
          location: 'New York, NY',
          skills: ['Digital Marketing', 'SEO', 'Google Analytics', 'Social Media'],
          score: 72,
          education: 'MBA in Marketing',
        },
      ],
    },
    {
      id: 'preliminary-interview',
      name: 'Preliminary Interview',
      color: '#f3e5f5',
      order: 3,
      candidates: [
        // Lisa Chen - scheduled for preliminary interview (no scores yet)
        {
          id: '4',
          applicant_id: 'APP004',
          first_name: 'Lisa',
          middle_name: '',
          last_name: 'Chen',
          suffix: '',
          name: 'Lisa Chen',
          position: 'UX Designer',
          jobId: 'job4',
          jobTitle: 'UX Designer',
          dob: '1992-05-14',
          gender: 'Female',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'lisa.chen@email.com',
          phone: '+1 (555) 456-7890',
          application_date: '2024-01-12',
          position_applied: 'UX Designer',
          recruitment_source: 'Dribbble',
          recruiter_id: 'REC004',
          resume_file: 'lisa_chen_resume.pdf',
          application_status: 'preliminary-interview',
          status: 'preliminary-interview',
          lastActivity: '2024-01-17',
          experience: '4 years',
          location: 'Seattle, WA',
          interviewData: {
            id: '1',
            date: '2024-01-23',
            time: '3:00 PM',
            interviewer: 'Patricia Williams',
            type: 'video',
            status: 'scheduled',
            tags: ['preliminary'],
          },
        },
        // Natalie Brown - scheduled for preliminary interview (no scores yet)
        {
          id: '12',
          applicant_id: 'APP012',
          first_name: 'Natalie',
          middle_name: '',
          last_name: 'Brown',
          suffix: '',
          name: 'Natalie Brown',
          position: 'UX Designer',
          jobId: 'job4',
          jobTitle: 'UX Designer',
          dob: '1982-01-20',
          gender: 'Female',
          civil_status: 'Married',
          nationality: 'US Citizen',
          email: 'natalie.brown@email.com',
          phone: '+1 (555) 234-5678',
          application_date: '2024-01-04',
          position_applied: 'UX Designer',
          recruitment_source: 'Indeed',
          recruiter_id: 'REC012',
          resume_file: 'natalie_brown_resume.pdf',
          application_status: 'preliminary-interview',
          status: 'preliminary-interview',
          lastActivity: '2024-01-24',
          experience: '9 years',
          location: 'Austin, TX',
          interviewData: {
            id: '4',
            date: '2024-01-24',
            time: '9:00 AM',
            interviewer: 'Sophia Turner',
            type: 'video',
            status: 'scheduled',
            tags: ['preliminary'],
          },
        },
        // Kevin Lee - scheduled for preliminary interview (no scores yet)
        {
          id: '13',
          applicant_id: 'APP013',
          first_name: 'Kevin',
          middle_name: '',
          last_name: 'Lee',
          suffix: '',
          name: 'Kevin Lee',
          position: 'UX Designer',
          jobId: 'job4',
          jobTitle: 'UX Designer',
          dob: '1988-10-05',
          gender: 'Male',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'kevin.lee@email.com',
          phone: '+1 (555) 345-6789',
          application_date: '2024-01-03',
          position_applied: 'UX Designer',
          recruitment_source: 'Dribbble',
          recruiter_id: 'REC013',
          resume_file: 'kevin_lee_resume.pdf',
          application_status: 'preliminary-interview',
          status: 'preliminary-interview',
          lastActivity: '2024-01-25',
          experience: '6 years',
          location: 'Seattle, WA',
          interviewData: {
            id: '5',
            date: '2024-01-25',
            time: '1:00 PM',
            interviewer: 'Emma Davis',
            type: 'onsite',
            status: 'scheduled',
            tags: ['preliminary'],
          },
        },
      ],
    },
    {
      id: 'testing',
      name: 'Testing',
      color: '#e8f5e8',
      order: 4,
      candidates: [
        {
          id: '5',
          applicant_id: 'APP005',
          first_name: 'David',
          middle_name: '',
          last_name: 'Wilson',
          suffix: '',
          name: 'David Wilson',
          position: 'Sales Representative',
          jobId: 'job5',
          jobTitle: 'Sales Representative',
          dob: '1987-09-30',
          gender: 'Male',
          civil_status: 'Married',
          nationality: 'US Citizen',
          email: 'david.wilson@email.com',
          phone: '+1 (555) 567-8901',
          application_date: '2024-01-11',
          position_applied: 'Sales Representative',
          recruitment_source: 'Glassdoor',
          recruiter_id: 'REC005',
          resume_file: 'david_wilson_resume.pdf',
          application_status: 'testing',
          status: 'testing',
          lastActivity: '2024-01-18',
          experience: '2 years',
          location: 'Chicago, IL',
        },
      ],
    },
    {
      id: 'reference-check',
      name: 'Reference Check',
      color: '#fff8e1',
      order: 5,
      candidates: [
        {
          id: '6',
          applicant_id: 'APP006',
          first_name: 'Emily',
          middle_name: '',
          last_name: 'Rodriguez',
          suffix: '',
          name: 'Emily Rodriguez',
          position: 'Senior Developer',
          jobId: 'job1',
          jobTitle: 'Senior Software Developer',
          dob: '1986-12-03',
          gender: 'Female',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'emily.rodriguez@email.com',
          phone: '+1 (555) 678-9012',
          application_date: '2024-01-10',
          position_applied: 'Senior Software Developer',
          recruitment_source: 'LinkedIn',
          recruiter_id: 'REC006',
          resume_file: 'emily_rodriguez_resume.pdf',
          application_status: 'reference-check',
          status: 'reference-check',
          lastActivity: '2024-01-19',
          experience: '6 years',
          location: 'San Francisco, CA',
        },
      ],
    },
    {
      id: 'background-check',
      name: 'Background Check',
      color: '#fce4ec',
      order: 6,
      candidates: [
        {
          id: '8',
          applicant_id: 'APP008',
          first_name: 'Maria',
          middle_name: '',
          last_name: 'Garcia',
          suffix: '',
          name: 'Maria Garcia',
          position: 'UX Designer',
          jobId: 'job4',
          jobTitle: 'UX Designer',
          dob: '1989-04-25',
          gender: 'Female',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'maria.garcia@email.com',
          phone: '+1 (555) 890-1234',
          application_date: '2024-01-08',
          position_applied: 'UX Designer',
          recruitment_source: 'Behance',
          recruiter_id: 'REC008',
          resume_file: 'maria_garcia_resume.pdf',
          application_status: 'background-check',
          status: 'background-check',
          lastActivity: '2024-01-20',
          experience: '5 years',
          location: 'Seattle, WA',
        },
      ],
    },
    {
      id: 'final-interview',
      name: 'Final Interview',
      color: '#e0f2f1',
      order: 7,
      candidates: [
        // Ryan Martinez - scheduled for final interview (no scores yet)
        {
          id: '11',
          applicant_id: 'APP011',
          first_name: 'Ryan',
          middle_name: '',
          last_name: 'Martinez',
          suffix: '',
          name: 'Ryan Martinez',
          position: 'Sales Representative',
          jobId: 'job5',
          jobTitle: 'Sales Representative',
          dob: '1991-02-28',
          gender: 'Male',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'ryan.martinez@email.com',
          phone: '+1 (555) 123-4567',
          application_date: '2024-01-05',
          position_applied: 'Sales Representative',
          recruitment_source: 'LinkedIn',
          recruiter_id: 'REC011',
          resume_file: 'ryan_martinez_resume.pdf',
          application_status: 'final-interview',
          status: 'final-interview',
          lastActivity: '2024-01-23',
          experience: '3 years',
          location: 'Chicago, IL',
          interviewData: {
            id: '3',
            date: '2024-01-23',
            time: '2:00 PM',
            interviewer: 'Daniel Lewis',
            type: 'video',
            status: 'scheduled',
            tags: ['final'],
          },
        },
      ],
    },
    {
      id: 'offer-agreements',
      name: 'Offer & Agreements',
      color: '#f1f8e9',
      order: 8,
      candidates: [
        // Sophie Chen - completed both preliminary and final interviews with scores
        {
          id: '10',
          applicant_id: 'APP010',
          first_name: 'Sophie',
          middle_name: '',
          last_name: 'Chen',
          suffix: '',
          name: 'Sophie Chen',
          position: 'Senior Developer',
          jobId: 'job1',
          jobTitle: 'Senior Software Developer',
          dob: '1985-08-14',
          gender: 'Female',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'sophie.chen@email.com',
          phone: '+1 (555) 012-3456',
          application_date: '2024-01-06',
          position_applied: 'Senior Software Developer',
          recruitment_source: 'GitHub',
          recruiter_id: 'REC010',
          resume_file: 'sophie_chen_resume.pdf',
          application_status: 'offer-agreements',
          status: 'offer-agreements',
          lastActivity: '2024-01-22',
          experience: '7 years',
          location: 'San Francisco, CA',
          interviewScores: {
            preliminary: 88,
            final: 94,
          },
          interviewData: {
            id: '2',
            date: '2024-01-22',
            time: '11:00 AM',
            interviewer: 'Olivia Parker',
            type: 'onsite',
            status: 'completed',
            tags: ['final'],
          },
        },
        // Alex Thompson - completed both preliminary and final interviews with scores
        {
          id: '7',
          applicant_id: 'APP007',
          first_name: 'Alex',
          middle_name: '',
          last_name: 'Thompson',
          suffix: '',
          name: 'Alex Thompson',
          position: 'DevOps Engineer',
          jobId: 'job6',
          jobTitle: 'DevOps Engineer',
          dob: '1984-06-18',
          gender: 'Male',
          civil_status: 'Married',
          nationality: 'US Citizen',
          email: 'alex.thompson@email.com',
          phone: '+1 (555) 789-0123',
          application_date: '2024-01-09',
          position_applied: 'DevOps Engineer',
          recruitment_source: 'Indeed',
          recruiter_id: 'REC007',
          resume_file: 'alex_thompson_resume.pdf',
          application_status: 'offer-agreements',
          status: 'offer-agreements',
          lastActivity: '2024-01-18',
          experience: '8 years',
          location: 'Austin, TX',
          interviewScores: {
            preliminary: 85,
            final: 92,
          },
          interviewData: {
            id: '7',
            date: '2024-01-15',
            time: '2:00 PM',
            interviewer: 'Benjamin Taylor',
            type: 'onsite',
            status: 'completed',
            tags: ['final', 'preliminary'],
          },
        },
        // James Wilson - completed both preliminary and final interviews with scores
        {
          id: '9',
          applicant_id: 'APP009',
          first_name: 'James',
          middle_name: '',
          last_name: 'Wilson',
          suffix: '',
          name: 'James Wilson',
          position: 'Marketing Manager',
          jobId: 'job2',
          jobTitle: 'Marketing Manager',
          dob: '1983-11-12',
          gender: 'Male',
          civil_status: 'Married',
          nationality: 'US Citizen',
          email: 'james.wilson@email.com',
          phone: '+1 (555) 901-2345',
          application_date: '2024-01-07',
          position_applied: 'Marketing Manager',
          recruitment_source: 'Company Website',
          recruiter_id: 'REC009',
          resume_file: 'james_wilson_resume.pdf',
          application_status: 'offer-agreements',
          status: 'offer-agreements',
          lastActivity: '2024-01-21',
          experience: '4 years',
          location: 'New York, NY',
          interviewScores: {
            preliminary: 82,
            final: 88,
          },
          interviewData: {
            id: '9',
            date: '2024-01-13',
            time: '3:00 PM',
            interviewer: 'Alexander Wright',
            type: 'video',
            status: 'completed',
            tags: ['final', 'preliminary'],
          },
        },
        // Natalie Brown - completed both preliminary and final interviews with scores
        {
          id: '12',
          applicant_id: 'APP012',
          first_name: 'Natalie',
          middle_name: '',
          last_name: 'Brown',
          suffix: '',
          name: 'Natalie Brown',
          position: 'UX Designer',
          jobId: 'job4',
          jobTitle: 'UX Designer',
          dob: '1982-01-20',
          gender: 'Female',
          civil_status: 'Married',
          nationality: 'US Citizen',
          email: 'natalie.brown@email.com',
          phone: '+1 (555) 234-5678',
          application_date: '2024-01-04',
          position_applied: 'UX Designer',
          recruitment_source: 'Indeed',
          recruiter_id: 'REC012',
          resume_file: 'natalie_brown_resume.pdf',
          application_status: 'offer-agreements',
          status: 'offer-agreements',
          lastActivity: '2024-01-24',
          experience: '9 years',
          location: 'Austin, TX',
          interviewScores: {
            preliminary: 85,
            final: 91,
          },
          interviewData: {
            id: '12',
            date: '2024-01-10',
            time: '9:00 AM',
            interviewer: 'Sophia Turner',
            type: 'video',
            status: 'completed',
            tags: ['final', 'preliminary'],
          },
        },
        {
          id: '13',
          applicant_id: 'APP013',
          first_name: 'Kevin',
          middle_name: '',
          last_name: 'Lee',
          suffix: '',
          name: 'Kevin Lee',
          position: 'UX Designer',
          jobId: 'job4',
          jobTitle: 'UX Designer',
          dob: '1988-10-05',
          gender: 'Male',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'kevin.lee@email.com',
          phone: '+1 (555) 345-6789',
          application_date: '2024-01-03',
          position_applied: 'UX Designer',
          recruitment_source: 'Dribbble',
          recruiter_id: 'REC013',
          resume_file: 'kevin_lee_resume.pdf',
          application_status: 'offer-agreements',
          status: 'offer-agreements',
          lastActivity: '2024-01-25',
          experience: '6 years',
          location: 'Seattle, WA',
        },
      ],
    },
    {
      id: 'ready-for-hiring',
      name: 'Ready for Hiring',
      color: '#e8f5e8',
      order: 9,
      candidates: [
        {
          id: '14',
          applicant_id: 'APP014',
          first_name: 'Amanda',
          middle_name: '',
          last_name: 'Taylor',
          suffix: '',
          name: 'Amanda Taylor',
          position: 'Senior Developer',
          jobId: 'job1',
          jobTitle: 'Senior Software Developer',
          dob: '1984-07-11',
          gender: 'Female',
          civil_status: 'Married',
          nationality: 'US Citizen',
          email: 'amanda.taylor@email.com',
          phone: '+1 (555) 456-7890',
          application_date: '2024-01-02',
          position_applied: 'Senior Software Developer',
          recruitment_source: 'Stack Overflow',
          recruiter_id: 'REC014',
          resume_file: 'amanda_taylor_resume.pdf',
          application_status: 'ready-for-hiring',
          status: 'ready-for-hiring',
          lastActivity: '2024-01-26',
          experience: '8 years',
          location: 'San Francisco, CA',
        },
        {
          id: '15',
          applicant_id: 'APP015',
          first_name: 'Daniel',
          middle_name: '',
          last_name: 'Anderson',
          suffix: '',
          name: 'Daniel Anderson',
          position: 'Marketing Manager',
          jobId: 'job2',
          jobTitle: 'Marketing Manager',
          dob: '1987-03-29',
          gender: 'Male',
          civil_status: 'Single',
          nationality: 'US Citizen',
          email: 'daniel.anderson@email.com',
          phone: '+1 (555) 567-8901',
          application_date: '2024-01-01',
          position_applied: 'Marketing Manager',
          recruitment_source: 'Company Website',
          recruiter_id: 'REC015',
          resume_file: 'daniel_anderson_resume.pdf',
          application_status: 'ready-for-hiring',
          status: 'ready-for-hiring',
          lastActivity: '2024-01-27',
          experience: '5 years',
          location: 'New York, NY',
        },
      ],
    },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [editingStage, setEditingStage] = useState<PipelineStage | null>(null);
  const [showAddStageDialog, setShowAddStageDialog] = useState(false);
  
  // Filter and sort state
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'application_date' | 'lastActivity' | 'experience'>('application_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [cardsPerStage, setCardsPerStage] = useState<number>(5);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [openExpandedStageDialog, setOpenExpandedStageDialog] = useState(false);
  const [selectedExpandedStage, setSelectedExpandedStage] = useState<PipelineStage | null>(null);

  // Job requisitions data
  const jobRequisitions: JobRequisition[] = [
    { id: 'job1', title: 'Senior Software Developer', department: 'Engineering', status: 'open', location: 'San Francisco, CA' },
    { id: 'job2', title: 'Marketing Manager', department: 'Marketing', status: 'open', location: 'New York, NY' },
    { id: 'job3', title: 'Product Manager', department: 'Product', status: 'open', location: 'Austin, TX' },
    { id: 'job4', title: 'UX Designer', department: 'Design', status: 'open', location: 'Seattle, WA' },
    { id: 'job5', title: 'Sales Representative', department: 'Sales', status: 'open', location: 'Chicago, IL' },
  ];

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCandidate(null);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(stages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order property for all items
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setStages(updatedItems);
  };

  const moveCandidate = (candidateId: string, fromStage: string, toStage: string) => {
    setStages(prevStages => {
      const newStages = [...prevStages];
      const fromStageIndex = newStages.findIndex(stage => stage.id === fromStage);
      const toStageIndex = newStages.findIndex(stage => stage.id === toStage);
      
      const candidate = newStages[fromStageIndex].candidates.find(c => c.id === candidateId);
      if (!candidate) return prevStages;
      
      // Remove from current stage
      newStages[fromStageIndex].candidates = newStages[fromStageIndex].candidates.filter(c => c.id !== candidateId);
      
      // Add to new stage
      candidate.status = toStage;
      newStages[toStageIndex].candidates.push(candidate);
      
      return newStages;
    });
  };

  const sortedStages = [...stages].sort((a, b) => a.order - b.order);

  // Filter and sort candidates
  const filteredAndSortedStages = useMemo(() => {
    return sortedStages.map(stage => {
      let filteredCandidates = [...stage.candidates];

      // Filter by search term
      if (searchTerm) {
        filteredCandidates = filteredCandidates.filter(candidate =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by selected jobs
      if (selectedJobs.length > 0) {
        filteredCandidates = filteredCandidates.filter(candidate =>
          selectedJobs.includes(candidate.jobId)
        );
      }

      // Filter by selected stages
      if (selectedStages.length > 0) {
        if (!selectedStages.includes(stage.id)) {
          filteredCandidates = [];
        }
      }

      // Sort candidates
      filteredCandidates.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (sortBy) {
          case 'name':
            aValue = a.name;
            bValue = b.name;
            break;
                  case 'application_date':
          aValue = new Date(a.application_date);
          bValue = new Date(b.application_date);
            break;
          case 'lastActivity':
            aValue = new Date(a.lastActivity);
            bValue = new Date(b.lastActivity);
            break;
          case 'experience':
            aValue = parseInt(a.experience.split(' ')[0]);
            bValue = parseInt(b.experience.split(' ')[0]);
            break;
          default:
            aValue = a.name;
            bValue = b.name;
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      return {
        ...stage,
        candidates: filteredCandidates,
      };
    });
  }, [sortedStages, searchTerm, selectedJobs, selectedStages, sortBy, sortOrder]);

  const handleJobFilterChange = (jobId: string) => {
    setSelectedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleStageFilterChange = (stageId: string) => {
    setSelectedStages(prev =>
      prev.includes(stageId)
        ? prev.filter(id => id !== stageId)
        : [...prev, stageId]
    );
  };

    const clearFilters = () => {
    setSearchTerm('');
    setSelectedJobs([]);
    setSelectedStages([]);
    setSortBy('application_date');
    setSortOrder('desc');
  };

  const handleExpandStage = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    if (stage) {
      setSelectedExpandedStage(stage);
      setOpenExpandedStageDialog(true);
    }
  };

  const handleEditStage = (stage: PipelineStage) => {
    setEditingStage(stage);
  };

  const handleSaveStageEdit = (stageId: string, newName: string) => {
    setStages(prev =>
      prev.map(stage =>
        stage.id === stageId ? { ...stage, name: newName } : stage
      )
    );
    setEditingStage(null);
  };

  const handleAddStage = (newStage: { name: string; color: string }) => {
    const newId = `stage-${Date.now()}`;
    const newStageData: PipelineStage = {
      id: newId,
      name: newStage.name,
      color: newStage.color,
      order: stages.length + 1,
      candidates: [],
    };
    setStages(prev => [...prev, newStageData]);
    setShowAddStageDialog(false);
  };

  const handleDeleteStage = (stageId: string) => {
    // Don't allow deletion if stage has candidates
    const stage = stages.find(s => s.id === stageId);
    if (stage && stage.candidates.length > 0) {
      alert('Cannot delete stage with candidates. Please move all candidates to other stages first.');
      return;
    }
    
    setStages(prev => prev.filter(stage => stage.id !== stageId));
  };

  const getInterviewTypeIcon = (type?: string) => {
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

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Applicant Tracking System</Typography>
        <Box display="flex" gap={1} alignItems="center">
          {/* Search Field */}
          <TextField
            size="small"
            placeholder="Search candidates..."
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
          <Tooltip title="Pipeline Settings">
            <IconButton
              onClick={() => setOpenSettingsDialog(true)}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderColor: 'primary.main'
                }
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Vertical Filters Panel */}
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
            {(selectedJobs.length > 0 || selectedStages.length > 0) && (
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
                  <MenuItem value="name" sx={{ fontSize: '0.75rem' }}>Name</MenuItem>
                  <MenuItem value="application_date" sx={{ fontSize: '0.75rem' }}>Applied Date</MenuItem>
                  <MenuItem value="lastActivity" sx={{ fontSize: '0.75rem' }}>Last Activity</MenuItem>
                  <MenuItem value="experience" sx={{ fontSize: '0.75rem' }}>Experience</MenuItem>
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

            {/* Job Position Filter */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Job:
              </Typography>
              <Box display="flex" gap={0.5} flexWrap="wrap">
                {jobRequisitions.filter(job => job.status === 'open').map((job) => (
                  <Chip
                    key={job.id}
                    label={job.title}
                    size="small"
                    variant={selectedJobs.includes(job.id) ? "filled" : "outlined"}
                    onClick={() => handleJobFilterChange(job.id)}
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

            {/* Stage Filter */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Stage:
              </Typography>
              <Box display="flex" gap={0.5} flexWrap="wrap">
                {sortedStages.map((stage) => (
                  <Chip
                    key={stage.id}
                    label={stage.name}
                    size="small"
                    variant={selectedStages.includes(stage.id) ? "filled" : "outlined"}
                    onClick={() => handleStageFilterChange(stage.id)}
                    sx={{
                      fontSize: '0.65rem',
                      height: 20,
                      cursor: 'pointer',
                      backgroundColor: selectedStages.includes(stage.id) ? stage.color : `${stage.color}80`,
                      borderColor: stage.color,
                      color: selectedStages.includes(stage.id) ? 'white' : '#333333',
                      fontWeight: selectedStages.includes(stage.id) ? 'bold' : 'medium',
                      '&:hover': { 
                        opacity: 0.8,
                        backgroundColor: selectedStages.includes(stage.id) ? stage.color : `${stage.color}90`,
                        color: selectedStages.includes(stage.id) ? 'white' : '#000000'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {/* Active Filters Summary - Compact */}
          {(selectedJobs.length > 0 || selectedStages.length > 0) && (
            <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid #e0e0e0' }}>
              <Box display="flex" flexWrap="wrap" gap={0.5}>
                {selectedJobs.map(jobId => {
                  const job = jobRequisitions.find(j => j.id === jobId);
                  return job ? (
                    <Chip
                      key={jobId}
                      label={job.title}
                      size="small"
                      onDelete={() => handleJobFilterChange(jobId)}
                      sx={{ fontSize: '0.65rem', height: 20 }}
                    />
                  ) : null;
                })}
                {selectedStages.map(stageId => {
                  const stage = sortedStages.find(s => s.id === stageId);
                  return stage ? (
                    <Chip
                      key={stageId}
                      label={stage.name}
                      size="small"
                      onDelete={() => handleStageFilterChange(stageId)}
                      sx={{ fontSize: '0.65rem', height: 20 }}
                    />
                  ) : null;
                })}
              </Box>
            </Box>
          )}
        </Paper>
      </Collapse>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="pipeline" direction="horizontal">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                display: 'flex',
                gap: 2,
                overflowX: 'auto',
                pb: 2,
                minHeight: '70vh',
              }}
            >
              {filteredAndSortedStages.map((stage, index) => (
                <Draggable key={stage.id} draggableId={stage.id} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{
                        minWidth: 280,
                        maxWidth: 280,
                        flexShrink: 0,
                      }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          backgroundColor: stage.color,
                          minHeight: '70vh',
                          maxHeight: '70vh',
                          overflow: 'auto',
                          border: snapshot.isDragging ? '2px dashed #1976d2' : 'none',
                        }}
                      >
                        <Box
                          {...provided.dragHandleProps}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={2}
                          sx={{ cursor: 'grab' }}
                        >
                          <Box display="flex" alignItems="center" gap={1}>
                            <DragIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
                            <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                              {stage.name}
                            </Typography>
                          </Box>
                          <Chip label={stage.candidates.length} color="primary" size="small" />
                        </Box>
                        
                        {stage.candidates
                          .slice(0, expandedStage === stage.id ? undefined : cardsPerStage)
                          .map((candidate) => (
                          <Card
                            key={candidate.id}
                            sx={{ mb: 1.5, cursor: 'pointer' }}
                            onClick={() => handleCandidateClick(candidate)}
                          >
                            <CardContent sx={{ p: stage.id.includes('interview') ? 2 : 1.5 }}>
                              {stage.id.includes('interview') ? (
                                // Interview component format for interview stages
                                <>
                                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                      <Avatar 
                                        sx={{ 
                                          width: 32, 
                                          height: 32, 
                                          fontSize: '0.8rem',
                                          bgcolor: `hsl(${(candidate.name.charCodeAt(0) * 10) % 360}, 70%, 50%)`
                                        }}
                                      >
                                        {candidate.name.split(' ').map(n => n[0]).join('')}
                                      </Avatar>
                                      <Box>
                                        <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                          {candidate.name}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                                          {candidate.jobTitle}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                  
                                  {/* Show date/time for scheduled interviews */}
                                  {candidate.interviewData && (!candidate.interviewScores || (candidate.interviewScores && !candidate.interviewScores.final)) && (
                                    <>
                                      <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'text.primary', display: 'block', mb: 0.5 }}>
                                        {candidate.interviewData.date} at {candidate.interviewData.time}
                                      </Typography>
                                      <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block' }}>
                                        {candidate.interviewData.interviewer}
                                        {candidate.interviewData.secondInterviewer && `, ${candidate.interviewData.secondInterviewer}`}
                                      </Typography>
                                    </>
                                  )}
                                  
                                  {/* Add spacing for completed interviews */}
                                  {candidate.interviewScores && candidate.interviewScores.final && (
                                    <Box sx={{ height: '40px' }} />
                                  )}
                                  
                                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                                    <Box display="flex" gap={1} alignItems="center">
                                      {/* Interview Score Tags */}
                                      {candidate.interviewScores && (
                                        <>
                                          {candidate.interviewScores.preliminary && (
                                            <Chip
                                              label={`Preliminary ${candidate.interviewScores.preliminary}%`}
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
                                                // TODO: Open interview scorecard dialog
                                              }}
                                            />
                                          )}
                                          {candidate.interviewScores.final && (
                                            <Chip
                                              label={`Final ${candidate.interviewScores.final}%`}
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
                                                // TODO: Open interview scorecard dialog
                                              }}
                                            />
                                          )}
                                        </>
                                      )}
                                    </Box>
                                    <Box display="flex" gap={1}>
                                      {/* Interview type icon */}
                                      <Tooltip title={`${candidate.interviewData?.type || 'Schedule'} Interview`}>
                                        <IconButton
                                          size="small"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleCandidateClick(candidate);
                                          }}
                                          sx={{ 
                                            color: 'primary.main',
                                            '&:hover': { 
                                              backgroundColor: 'primary.light',
                                              color: 'white'
                                            }
                                          }}
                                        >
                                          {candidate.interviewData?.type === 'video' ? <VideoCallIcon /> :
                                           candidate.interviewData?.type === 'phone' ? <PhoneIcon /> :
                                           candidate.interviewData?.type === 'onsite' ? <PersonIcon /> :
                                           <ScheduleIcon />}
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </Box>
                                </>
                              ) : (
                                // Screening component format for non-interview stages
                                <Box display="flex" flexDirection="column" height="100%">
                                  <Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                                      <Box display="flex" alignItems="center" gap={1}>
                                        <Avatar 
                                          sx={{ 
                                            width: 28, 
                                            height: 28, 
                                            fontSize: '0.7rem',
                                            bgcolor: `hsl(${(candidate.name.charCodeAt(0) * 10) % 360}, 70%, 50%)`
                                          }}
                                        >
                                          {candidate.name.split(' ').map(n => n[0]).join('')}
                                        </Avatar>
                                        <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                          {candidate.name}
                                        </Typography>
                                      </Box>
                                      <Box display="flex" flexDirection="column" alignItems="flex-end" gap={0.3}>
                                        {candidate.score && (
                                          <Typography 
                                            variant="caption" 
                                            sx={{ 
                                              fontSize: '0.6rem',
                                              color: candidate.score >= 80 ? 'success.main' : candidate.score >= 60 ? 'warning.main' : 'error.main',
                                              fontWeight: 'medium'
                                            }}
                                          >
                                            {candidate.score}% match
                                          </Typography>
                                        )}
                                        {stage.id === 'screening' && (
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
                                        )}
                                        {/* Interview Score Tags */}
                                        {candidate.interviewScores && (
                                          <>
                                            {candidate.interviewScores.preliminary && (
                                              <Chip
                                                label={`Preliminary ${candidate.interviewScores.preliminary}%`}
                                                color="warning"
                                                size="small"
                                                sx={{ 
                                                  fontSize: '0.65rem', 
                                                  height: '18px',
                                                  cursor: 'pointer',
                                                  '&:hover': { 
                                                    backgroundColor: 'warning.light',
                                                    color: 'white'
                                                  }
                                                }}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  // TODO: Open interview scorecard dialog
                                                }}
                                              />
                                            )}
                                            {candidate.interviewScores.final && (
                                              <Chip
                                                label={`Final ${candidate.interviewScores.final}%`}
                                                color="success"
                                                size="small"
                                                sx={{ 
                                                  fontSize: '0.65rem', 
                                                  height: '18px',
                                                  cursor: 'pointer',
                                                  '&:hover': { 
                                                    backgroundColor: 'success.light',
                                                    color: 'white'
                                                  }
                                                }}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  // TODO: Open interview scorecard dialog
                                                }}
                                              />
                                            )}
                                          </>
                                        )}
                                        {/* Show interview data if available */}
                                        {candidate.interviewData && (
                                          <Chip
                                            label={`${candidate.interviewData.type} interview`}
                                            color="info"
                                            size="small"
                                            sx={{ 
                                              fontSize: '0.65rem', 
                                              height: '18px',
                                              cursor: 'pointer',
                                              '&:hover': { 
                                                backgroundColor: 'info.light',
                                                color: 'white'
                                              }
                                            }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleCandidateClick(candidate);
                                            }}
                                          />
                                        )}
                                      </Box>
                                    </Box>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                                      {candidate.jobTitle}
                                    </Typography>
                                    <Box display="flex" alignItems="center" mt={0.5}>
                                      <WorkIcon sx={{ fontSize: 12, mr: 0.5, color: 'text.secondary' }} />
                                      <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                                        {candidate.experience} experience
                                      </Typography>
                                    </Box>
                                    {candidate.education && (
                                      <Box display="flex" alignItems="center" mt={0.5}>
                                        <SchoolIcon sx={{ fontSize: 12, mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                                          {candidate.education}
                                        </Typography>
                                      </Box>
                                    )}
                                  </Box>
                                  
                                  {candidate.skills && candidate.skills.length > 0 && (
                                    <Box mt={1} sx={{ flexGrow: 1 }}>
                                      <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.65rem' }}>
                                        Skills:
                                      </Typography>
                                      <Box display="flex" flexWrap="wrap" gap={0.3} mt={0.5}>
                                        {candidate.skills.slice(0, 2).map((skill) => (
                                          <Chip 
                                            key={skill} 
                                            label={skill} 
                                            size="small"
                                            sx={{ fontSize: '0.6rem', height: '16px' }}
                                          />
                                        ))}
                                        {candidate.skills.length > 2 && (
                                          <Chip 
                                            label={`+${candidate.skills.length - 2} more`} 
                                            size="small"
                                            sx={{ fontSize: '0.6rem', height: '16px' }}
                                          />
                                        )}
                                      </Box>
                                    </Box>
                                  )}
                                </Box>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                        
                        {/* Show +more button if there are more candidates than the limit */}
                        {stage.candidates.length > cardsPerStage && (
                          <Box mt={1} textAlign="center">
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleExpandStage(stage.id)}
                              sx={{ 
                                fontSize: '0.75rem',
                                textTransform: 'none',
                                minWidth: 'auto',
                                px: 2
                              }}
                            >
                              {expandedStage === stage.id ? 'Show Less' : `+${stage.candidates.length - cardsPerStage} more`}
                            </Button>
                          </Box>
                        )}
                      </Paper>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* Candidate Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Candidate Details</DialogTitle>
        <DialogContent>
          {selectedCandidate && (
            <Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ mr: 2 }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedCandidate.name}</Typography>
                  <Typography color="textSecondary">{selectedCandidate.jobTitle}</Typography>
                </Box>
              </Box>
              
              <Grid container spacing={2}>
                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Basic Information</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Applicant ID"
                    value={selectedCandidate.applicant_id}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={selectedCandidate.first_name}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    value={selectedCandidate.middle_name || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={selectedCandidate.last_name}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Suffix"
                    value={selectedCandidate.suffix || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    value={selectedCandidate.dob}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Gender"
                    value={selectedCandidate.gender}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Civil Status"
                    value={selectedCandidate.civil_status}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nationality"
                    value={selectedCandidate.nationality}
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
                
                {/* Application Details */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Application Details</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Application Date"
                    value={selectedCandidate.application_date}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Position Applied"
                    value={selectedCandidate.position_applied}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Recruitment Source"
                    value={selectedCandidate.recruitment_source}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Recruiter ID"
                    value={selectedCandidate.recruiter_id}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Resume File"
                    value={selectedCandidate.resume_file || 'Not uploaded'}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Application Status"
                    value={selectedCandidate.application_status}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                
                {/* Interview Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Interview Information</Typography>
                </Grid>
                {selectedCandidate.interviewData ? (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Interview Date"
                        value={`${selectedCandidate.interviewData.date} at ${selectedCandidate.interviewData.time}`}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Interviewer"
                        value={selectedCandidate.interviewData.interviewer}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Interview Type"
                        value={selectedCandidate.interviewData.type}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Interview Status"
                        value={selectedCandidate.interviewData.status}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    {selectedCandidate.interviewData.secondInterviewer && (
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Second Interviewer"
                          value={selectedCandidate.interviewData.secondInterviewer}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                    )}
                  </>
                ) : (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Initial Interview Date"
                        value={selectedCandidate.initial_interview_date || 'Not scheduled'}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Technical Interview Date"
                        value={selectedCandidate.technical_interview_date || 'Not scheduled'}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="HR Interview Date"
                        value={selectedCandidate.hr_interview_date || 'Not scheduled'}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Interview Feedback"
                    value={selectedCandidate.interview_feedback || 'No feedback yet'}
                    multiline
                    rows={3}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                
                {/* Offer & Onboarding */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Offer & Onboarding</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Job Offer Date"
                    value={selectedCandidate.job_offer_date || 'Not offered'}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Offer Accepted"
                    value={selectedCandidate.offer_accepted ? 'Yes' : 'No'}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Onboarding Start Date"
                    value={selectedCandidate.onboarding_start_date || 'Not started'}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Onboarding Complete"
                    value={selectedCandidate.onboarding_complete ? 'Yes' : 'No'}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                
                {/* Additional Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Additional Information</Typography>
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
                  <FormControl fullWidth>
                    <InputLabel>Move to Stage</InputLabel>
                    <Select
                      value={selectedCandidate.status}
                      label="Move to Stage"
                      onChange={(e) => {
                        if (e.target.value !== selectedCandidate.status) {
                          moveCandidate(selectedCandidate.id, selectedCandidate.status, e.target.value as string);
                          handleCloseDialog();
                        }
                      }}
                    >
                      {filteredAndSortedStages.map((stage) => (
                        <MenuItem key={stage.id} value={stage.id}>
                          {stage.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained">Send Email</Button>
        </DialogActions>
      </Dialog>

      {/* Pipeline Settings Dialog */}
      <Dialog open={openSettingsDialog} onClose={() => setOpenSettingsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Pipeline Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Drag and drop the stages below to reorder your hiring pipeline. You can also edit, add, or delete stages.
          </Typography>
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowAddStageDialog(true)}
              sx={{ mb: 2 }}
            >
              Add New Stage
            </Button>
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Pipeline Order:
            </Typography>
            <DragDropContext onDragEnd={(result) => {
              if (!result.destination) return;
              
              const items = Array.from(sortedStages);
              const [reorderedItem] = items.splice(result.source.index, 1);
              items.splice(result.destination.index, 0, reorderedItem);
              
              // Update the order property for all items
              const updatedItems = items.map((item, index) => ({
                ...item,
                order: index + 1,
              }));
              
              setStages(updatedItems);
            }}>
              <Droppable droppableId="pipeline-settings">
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    {sortedStages.map((stage, index) => (
                      <Draggable key={stage.id} draggableId={stage.id} index={index}>
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 2,
                              borderRadius: 1,
                              backgroundColor: stage.color,
                              cursor: 'grab',
                              border: snapshot.isDragging ? '2px dashed #1976d2' : '1px solid #e0e0e0',
                              transform: snapshot.isDragging ? 'rotate(2deg)' : 'none',
                              boxShadow: snapshot.isDragging ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                              <DragIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                              <Typography variant="h6" color="textSecondary">
                                {index + 1}.
                              </Typography>
                              {editingStage?.id === stage.id ? (
                                <TextField
                                  value={editingStage.name}
                                  onChange={(e) => setEditingStage({ ...editingStage, name: e.target.value })}
                                  onBlur={() => handleSaveStageEdit(stage.id, editingStage.name)}
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      handleSaveStageEdit(stage.id, editingStage.name);
                                    }
                                  }}
                                  size="small"
                                  autoFocus
                                  sx={{ minWidth: 150 }}
                                />
                              ) : (
                                <Typography variant="subtitle1">
                                  {stage.name}
                                </Typography>
                              )}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Chip label={`${stage.candidates.length} candidates`} size="small" />
                              <IconButton
                                size="small"
                                onClick={() => handleEditStage(stage)}
                                sx={{ color: 'text.secondary' }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteStage(stage.id)}
                                disabled={stage.candidates.length > 0}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettingsDialog(false)}>Close</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Add New Stage Dialog */}
      <Dialog open={showAddStageDialog} onClose={() => setShowAddStageDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Pipeline Stage</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Stage Name"
                placeholder="e.g., Phone Screening, Technical Interview"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Stage Color</InputLabel>
                <Select label="Stage Color" defaultValue="#e3f2fd">
                  <MenuItem value="#e3f2fd">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 20, height: 20, backgroundColor: '#e3f2fd', borderRadius: 1 }} />
                      Light Blue
                    </Box>
                  </MenuItem>
                  <MenuItem value="#fff3e0">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 20, height: 20, backgroundColor: '#fff3e0', borderRadius: 1 }} />
                      Light Orange
                    </Box>
                  </MenuItem>
                  <MenuItem value="#f3e5f5">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 20, height: 20, backgroundColor: '#f3e5f5', borderRadius: 1 }} />
                      Light Purple
                    </Box>
                  </MenuItem>
                  <MenuItem value="#e8f5e8">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 20, height: 20, backgroundColor: '#e8f5e8', borderRadius: 1 }} />
                      Light Green
                    </Box>
                  </MenuItem>
                  <MenuItem value="#fff8e1">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 20, height: 20, backgroundColor: '#fff8e1', borderRadius: 1 }} />
                      Light Yellow
                    </Box>
                  </MenuItem>
                  <MenuItem value="#fce4ec">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 20, height: 20, backgroundColor: '#fce4ec', borderRadius: 1 }} />
                      Light Pink
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddStageDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            // This would be connected to the form data
            handleAddStage({ name: 'New Stage', color: '#e3f2fd' });
          }}>
            Add Stage
          </Button>
        </DialogActions>
      </Dialog>

      {/* Expanded Stage Dialog */}
      <Dialog open={openExpandedStageDialog} onClose={() => setOpenExpandedStageDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{ width: 20, height: 20, backgroundColor: selectedExpandedStage?.color, borderRadius: 1 }} />
            <Typography variant="h6">{selectedExpandedStage?.name} - All Candidates</Typography>
            <Chip label={selectedExpandedStage?.candidates.length || 0} color="primary" size="small" />
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedExpandedStage && (
            <Box>
              {/* Search and Filter Section */}
              <Paper sx={{ p: 2, mb: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    All Candidates in {selectedExpandedStage.name}
                  </Typography>
                  <Box display="flex" gap={2}>
                    <TextField
                      size="small"
                      placeholder="Search candidates..."
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
                      startIcon={<FilterIcon />}
                      size="small"
                    >
                      Filters
                    </Button>
                  </Box>
                </Box>
              </Paper>

              {/* Candidates Grid */}
              <Grid container spacing={2}>
                {selectedExpandedStage.candidates.map((candidate) => (
                  <Grid item xs={12} sm={6} md={4} key={candidate.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        cursor: 'pointer',
                        '&:hover': { 
                          boxShadow: 3,
                          backgroundColor: 'action.hover'
                        }
                      }}
                      onClick={() => handleCandidateClick(candidate)}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar 
                              sx={{ 
                                width: 32, 
                                height: 32, 
                                fontSize: '0.8rem',
                                bgcolor: `hsl(${(candidate.name.charCodeAt(0) * 10) % 360}, 70%, 50%)`
                              }}
                            >
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                {candidate.name}
                              </Typography>
                              <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                                {candidate.jobTitle}
                              </Typography>
                            </Box>
                          </Box>
                          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={0.5}>
                            {candidate.score && (
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  fontSize: '0.65rem',
                                  color: candidate.score >= 80 ? 'success.main' : candidate.score >= 60 ? 'warning.main' : 'error.main',
                                  fontWeight: 'medium'
                                }}
                              >
                                {candidate.score}% match
                              </Typography>
                            )}
                            {/* Interview Score Tags */}
                            {candidate.interviewScores && (
                              <>
                                {candidate.interviewScores.preliminary && (
                                  <Chip
                                    label={`Preliminary ${candidate.interviewScores.preliminary}%`}
                                    color="warning"
                                    size="small"
                                    sx={{ 
                                      fontSize: '0.65rem', 
                                      height: '18px',
                                      cursor: 'pointer',
                                      '&:hover': { 
                                        backgroundColor: 'warning.light',
                                        color: 'white'
                                      }
                                    }}
                                  />
                                )}
                                {candidate.interviewScores.final && (
                                  <Chip
                                    label={`Final ${candidate.interviewScores.final}%`}
                                    color="success"
                                    size="small"
                                    sx={{ 
                                      fontSize: '0.65rem', 
                                      height: '18px',
                                      cursor: 'pointer',
                                      '&:hover': { 
                                        backgroundColor: 'success.light',
                                        color: 'white'
                                      }
                                    }}
                                  />
                                )}
                              </>
                            )}
                            {/* Show interview data if available */}
                            {candidate.interviewData && (
                              <Chip
                                label={`${candidate.interviewData.type} interview`}
                                color="info"
                                size="small"
                                sx={{ 
                                  fontSize: '0.65rem', 
                                  height: '18px',
                                  cursor: 'pointer',
                                  '&:hover': { 
                                    backgroundColor: 'info.light',
                                    color: 'white'
                                  }
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                        <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', mb: 0.5 }}>
                          {candidate.experience} experience
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block' }}>
                          {candidate.location}
                        </Typography>
                        {candidate.skills && candidate.skills.length > 0 && (
                          <Box mt={1}>
                            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.65rem' }}>
                              Skills:
                            </Typography>
                            <Box display="flex" gap={0.3} sx={{ overflow: 'hidden' }}>
                              {candidate.skills.slice(0, 3).map((skill) => (
                                <Chip 
                                  key={skill} 
                                  label={skill} 
                                  size="small"
                                  sx={{ fontSize: '0.6rem', height: '16px' }}
                                />
                              ))}
                              {candidate.skills.length > 3 && (
                                <Chip 
                                  label={`+${candidate.skills.length - 3} more`} 
                                  size="small"
                                  sx={{ fontSize: '0.6rem', height: '16px' }}
                                />
                              )}
                            </Box>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExpandedStageDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ATS; 