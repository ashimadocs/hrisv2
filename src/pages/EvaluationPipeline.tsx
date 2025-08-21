import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  Avatar,
  IconButton,
  LinearProgress,
  Badge,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  dueDate?: string;
  priority?: string;
  progress?: number;
  startDate?: string;
  endDate?: string;
  completionDate?: string;
  rating?: number;
  status?: string;
}

interface Stage {
  id: string;
  title: string;
  color: string;
  employees: Employee[];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`evaluation-tabpanel-${index}`}
      aria-labelledby={`evaluation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const EvaluationPipeline: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Performance Review Data
  const performanceStages: Stage[] = [
    {
      id: 'for-evaluation',
      title: 'For Evaluation',
      color: '#ff9800',
      employees: [
        { id: 1, name: 'John Doe', position: 'Senior Developer', dueDate: '2024-01-20', priority: 'High' },
        { id: 2, name: 'Jane Smith', position: 'Product Manager', dueDate: '2024-01-25', priority: 'Medium' },
        { id: 3, name: 'Mike Johnson', position: 'UX Designer', dueDate: '2024-01-30', priority: 'Low' },
      ]
    },
    {
      id: 'self-assessment',
      title: 'Self Assessment',
      color: '#2196f3',
      employees: [
        { id: 4, name: 'Sarah Wilson', position: 'Marketing Manager', dueDate: '2024-01-22', progress: 75 },
        { id: 5, name: 'David Lee', position: 'Sales Director', dueDate: '2024-01-28', progress: 45 },
      ]
    },
    {
      id: 'manager-assessment',
      title: 'Manager Assessment',
      color: '#9c27b0',
      employees: [
        { id: 6, name: 'Emily Brown', position: 'HR Specialist', dueDate: '2024-01-24', progress: 60 },
      ]
    },
    {
      id: 'direct-report',
      title: 'Direct Report Assessment',
      color: '#f44336',
      employees: [
        { id: 7, name: 'Alex Turner', position: 'Team Lead', dueDate: '2024-01-26', progress: 30 },
      ]
    },
    {
      id: 'peer-assessment',
      title: 'Peer Assessment',
      color: '#ff5722',
      employees: [
        { id: 8, name: 'Chris Martin', position: 'Developer', dueDate: '2024-01-29', progress: 80 },
      ]
    },
    {
      id: 'completed',
      title: 'Completed',
      color: '#4caf50',
      employees: [
        { id: 9, name: 'Lisa Anderson', position: 'Designer', completionDate: '2024-01-15', rating: 4.2 },
        { id: 10, name: 'Tom Harris', position: 'Analyst', completionDate: '2024-01-18', rating: 3.8 },
      ]
    }
  ];

  // Probationary Review Data
  const probationaryStages: Stage[] = [
    {
      id: 'all-probationary',
      title: 'All Probationary',
      color: '#ff9800',
      employees: [
        { id: 1, name: 'Alex Rodriguez', position: 'Junior Developer', startDate: '2023-10-15', endDate: '2024-01-15' },
        { id: 2, name: 'Maya Patel', position: 'Marketing Assistant', startDate: '2023-11-01', endDate: '2024-02-01' },
        { id: 3, name: 'Jordan Kim', position: 'Sales Rep', startDate: '2023-11-15', endDate: '2024-02-15' },
      ]
    },
    {
      id: 'self-assessment',
      title: 'Self Assessment',
      color: '#2196f3',
      employees: [
        { id: 4, name: 'Sofia Chen', position: 'HR Assistant', startDate: '2023-10-01', endDate: '2024-01-01', progress: 60 },
      ]
    },
    {
      id: 'manager-assessment',
      title: 'Manager Assessment',
      color: '#9c27b0',
      employees: [
        { id: 5, name: 'Marcus Thompson', position: 'Customer Support', startDate: '2023-09-15', endDate: '2023-12-15', progress: 80 },
      ]
    },
    {
      id: 'completed',
      title: 'Evaluation Completed',
      color: '#4caf50',
      employees: [
        { id: 6, name: 'Emma Wilson', position: 'Data Analyst', startDate: '2023-08-01', endDate: '2023-11-01', status: 'Evaluation Complete' },
        { id: 9, name: 'David Park', position: 'UX Designer', startDate: '2023-08-15', endDate: '2023-11-15', status: 'All Assessments Done' },
      ]
    },
    {
      id: 'ready-for-regularization',
      title: 'Ready for Regularization',
      color: '#ffc107',
      employees: [
        { id: 7, name: 'Priya Sharma', position: 'Business Analyst', startDate: '2023-08-15', endDate: '2023-11-15', status: 'Approved' },
        { id: 8, name: 'Carlos Mendez', position: 'Content Writer', startDate: '2023-09-01', endDate: '2023-12-01', status: 'Pending HR Review' },
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const renderEmployeeCard = (employee: Employee, stageType: string) => (
    <Card key={employee.id} sx={{ mb: 2, cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
            {employee.name.charAt(0)}
          </Avatar>
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {employee.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          {employee.position}
        </Typography>

        {stageType === 'performance' && employee.priority && (
          <Chip 
            label={employee.priority} 
            color={getPriorityColor(employee.priority) as any}
            size="small"
            sx={{ mb: 1 }}
          />
        )}

        {stageType === 'probationary' && employee.startDate && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Start: {new Date(employee.startDate).toLocaleDateString()}
          </Typography>
        )}

        {employee.dueDate && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Due: {new Date(employee.dueDate).toLocaleDateString()}
          </Typography>
        )}

        {employee.progress !== undefined && (
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption">Progress</Typography>
              <Typography variant="caption" color="primary">
                {employee.progress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={employee.progress} 
              sx={{ height: 4 }}
            />
          </Box>
        )}

        {employee.rating && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold' }}>
              Rating: {employee.rating}/5
            </Typography>
          </Box>
        )}

        {employee.status && (
          <Chip 
            label={employee.status} 
            color="success"
            size="small"
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );

  const renderKanbanBoard = (stages: Stage[], stageType: string) => (
    <Box sx={{ overflowX: 'auto' }}>
      <Grid container spacing={2} sx={{ minWidth: 'max-content' }}>
        {stages.map((stage) => (
          <Grid item key={stage.id} sx={{ minWidth: 280 }}>
            <Paper 
              sx={{ 
                p: 2, 
                height: 'fit-content',
                borderTop: `4px solid ${stage.color}`,
                backgroundColor: 'grey.50'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {stage.title}
                </Typography>
                <Badge badgeContent={stage.employees.length} color="primary">
                  <Box sx={{ width: 24, height: 24 }} />
                </Badge>
              </Box>
              
              <Box sx={{ minHeight: 200 }}>
                {stage.employees.map((employee) => renderEmployeeCard(employee, stageType))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Evaluation Pipeline
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track performance evaluations and probationary reviews with Kanban-style workflow
        </Typography>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="evaluation types"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Performance Review" />
          <Tab label="Probationary Review" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Review Workflow
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track employees through the complete performance evaluation process
            </Typography>
          </Box>
          {renderKanbanBoard(performanceStages, 'performance')}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Probationary Review Workflow
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor new employees through probationary period and regularization process
            </Typography>
          </Box>
          {renderKanbanBoard(probationaryStages, 'probationary')}
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default EvaluationPipeline;
