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
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Settings as SettingsIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Schedule as ScheduleIcon,
  Email as EmailIcon,
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Timer as TimerIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  active: boolean;
  trigger: {
    type: 'time-based' | 'event-based' | 'condition-based';
    sourceStage: string;
    targetStage: string;
    conditions: WorkflowCondition[];
    schedule?: {
      delay: number;
      unit: 'minutes' | 'hours' | 'days';
    };
  };
  actions: WorkflowAction[];
  priority: number;
  createdAt: string;
  lastModified: string;
}

interface WorkflowCondition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'exists';
  value: string;
  logicalOperator?: 'AND' | 'OR';
}

interface WorkflowAction {
  id: string;
  type: 'send_email' | 'update_status' | 'assign_task' | 'generate_report' | 'create_notification';
  config: {
    template?: string;
    recipients?: string[];
    subject?: string;
    message?: string;
    taskAssignee?: string;
    taskDescription?: string;
    reportType?: string;
    notificationType?: 'email' | 'sms' | 'in_app';
  };
}

const AutoPilotWorkflows: React.FC = () => {
  const [workflowRules, setWorkflowRules] = useState<WorkflowRule[]>([
    {
      id: '1',
      name: 'Auto-Advance After Screening',
      description: 'Automatically move candidates to Preliminary Interview after 3 days in Screening stage',
      active: true,
      trigger: {
        type: 'time-based',
        sourceStage: 'screening',
        targetStage: 'preliminary-interview',
        conditions: [
          {
            id: '1',
            field: 'screening_score',
            operator: 'greater_than',
            value: '70',
          },
        ],
        schedule: {
          delay: 3,
          unit: 'days',
        },
      },
      actions: [
        {
          id: '1',
          type: 'send_email',
          config: {
            template: 'interview_invitation',
            recipients: ['candidate_email'],
            subject: 'Interview Invitation',
            message: 'You have been selected for the next round of interviews.',
          },
        },
        {
          id: '2',
          type: 'assign_task',
          config: {
            taskAssignee: 'hiring_manager',
            taskDescription: 'Schedule preliminary interview for candidate',
          },
        },
      ],
      priority: 1,
      createdAt: '2024-01-15',
      lastModified: '2024-01-15',
    },
    {
      id: '2',
      name: 'Reference Check Trigger',
      description: 'Automatically initiate reference checks when candidate passes final interview',
      active: true,
      trigger: {
        type: 'event-based',
        sourceStage: 'final-interview',
        targetStage: 'reference-check',
        conditions: [
          {
            id: '1',
            field: 'interview_score',
            operator: 'greater_than',
            value: '80',
          },
          {
            id: '2',
            field: 'position_level',
            operator: 'equals',
            value: 'senior',
            logicalOperator: 'AND',
          },
        ],
      },
      actions: [
        {
          id: '1',
          type: 'send_email',
          config: {
            template: 'reference_check_request',
            recipients: ['candidate_email'],
            subject: 'Reference Check Request',
            message: 'Please provide contact information for your references.',
          },
        },
      ],
      priority: 2,
      createdAt: '2024-01-10',
      lastModified: '2024-01-12',
    },
    {
      id: '3',
      name: 'Background Check Automation',
      description: 'Automatically initiate background check after reference check completion',
      active: false,
      trigger: {
        type: 'condition-based',
        sourceStage: 'reference-check',
        targetStage: 'background-check',
        conditions: [
          {
            id: '1',
            field: 'reference_check_status',
            operator: 'equals',
            value: 'completed',
          },
        ],
      },
      actions: [
        {
          id: '1',
          type: 'send_email',
          config: {
            template: 'background_check_consent',
            recipients: ['candidate_email'],
            subject: 'Background Check Consent Required',
            message: 'Please provide consent for background verification.',
          },
        },
      ],
      priority: 3,
      createdAt: '2024-01-08',
      lastModified: '2024-01-14',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRule, setSelectedRule] = useState<WorkflowRule | null>(null);
  const [openTestDialog, setOpenTestDialog] = useState(false);

  const pipelineStages = [
    { id: 'applied', name: 'Applied' },
    { id: 'screening', name: 'Screening' },
    { id: 'preliminary-interview', name: 'Preliminary Interview' },
    { id: 'testing', name: 'Testing' },
    { id: 'reference-check', name: 'Reference Check' },
    { id: 'background-check', name: 'Background Check' },
    { id: 'final-interview', name: 'Final Interview' },
    { id: 'offer-agreements', name: 'Offer & Agreements' },
    { id: 'ready-for-hiring', name: 'Ready for Hiring' },
  ];

  const conditionFields = [
    { value: 'screening_score', label: 'Screening Score' },
    { value: 'interview_score', label: 'Interview Score' },
    { value: 'experience_years', label: 'Years of Experience' },
    { value: 'position_level', label: 'Position Level' },
    { value: 'department', label: 'Department' },
    { value: 'location', label: 'Location' },
    { value: 'salary_expectation', label: 'Salary Expectation' },
    { value: 'reference_check_status', label: 'Reference Check Status' },
    { value: 'background_check_status', label: 'Background Check Status' },
  ];

  const actionTypes = [
    { value: 'send_email', label: 'Send Email', icon: <EmailIcon /> },
    { value: 'update_status', label: 'Update Status', icon: <AssessmentIcon /> },
    { value: 'assign_task', label: 'Assign Task', icon: <AssignmentIcon /> },
    { value: 'generate_report', label: 'Generate Report', icon: <AssessmentIcon /> },
    { value: 'create_notification', label: 'Create Notification', icon: <NotificationsIcon /> },
  ];

  const handleCreateRule = () => {
    setSelectedRule(null);
    setOpenDialog(true);
  };

  const handleEditRule = (rule: WorkflowRule) => {
    setSelectedRule(rule);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRule(null);
  };

  const handleToggleRule = (ruleId: string) => {
    setWorkflowRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const handleDeleteRule = (ruleId: string) => {
    setWorkflowRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'time-based':
        return <TimerIcon />;
      case 'event-based':
        return <EventIcon />;
      case 'condition-based':
        return <CheckCircleIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getTriggerColor = (type: string) => {
    switch (type) {
      case 'time-based':
        return 'primary';
      case 'event-based':
        return 'secondary';
      case 'condition-based':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Auto-Pilot Workflows</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<PlayIcon />}
            onClick={() => setOpenTestDialog(true)}
          >
            Test Workflows
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateRule}>
            Create Workflow Rule
          </Button>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Auto-pilot workflows automatically move candidates through the pipeline based on predefined rules, 
        triggers, and conditions. These workflows reduce manual intervention and ensure consistent processes.
      </Alert>

      <Grid container spacing={3}>
        {workflowRules.map((rule) => (
          <Grid item xs={12} md={6} lg={4} key={rule.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {rule.name}
                    </Typography>
                    <Chip
                      icon={getTriggerIcon(rule.trigger.type)}
                      label={rule.trigger.type.replace('-', ' ')}
                      color={getTriggerColor(rule.trigger.type) as any}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {rule.description}
                    </Typography>
                  </Box>
                  <Switch
                    checked={rule.active}
                    onChange={() => handleToggleRule(rule.id)}
                    color="primary"
                  />
                </Box>

                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    <strong>From:</strong> {pipelineStages.find(s => s.id === rule.trigger.sourceStage)?.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    <strong>To:</strong> {pipelineStages.find(s => s.id === rule.trigger.targetStage)?.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Actions:</strong> {rule.actions.length} configured
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Chip
                    label={`Priority: ${rule.priority}`}
                    size="small"
                    color="default"
                  />
                  <Box display="flex" gap={1}>
                    <Tooltip title="Edit Rule">
                      <IconButton
                        size="small"
                        onClick={() => handleEditRule(rule)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Rule">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteRule(rule.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Workflow Rule Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>
          {selectedRule ? 'Edit Workflow Rule' : 'Create Workflow Rule'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Rule Name"
                defaultValue={selectedRule?.name || ''}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select label="Priority" defaultValue={selectedRule?.priority || 1}>
                  <MenuItem value={1}>High (1)</MenuItem>
                  <MenuItem value={2}>Medium (2)</MenuItem>
                  <MenuItem value={3}>Low (3)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                defaultValue={selectedRule?.description || ''}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Trigger Configuration
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Trigger Type</InputLabel>
                <Select label="Trigger Type" defaultValue={selectedRule?.trigger.type || 'time-based'}>
                  <MenuItem value="time-based">Time-based</MenuItem>
                  <MenuItem value="event-based">Event-based</MenuItem>
                  <MenuItem value="condition-based">Condition-based</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>From Stage</InputLabel>
                <Select label="From Stage" defaultValue={selectedRule?.trigger.sourceStage || ''}>
                  {pipelineStages.map((stage) => (
                    <MenuItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>To Stage</InputLabel>
                <Select label="To Stage" defaultValue={selectedRule?.trigger.targetStage || ''}>
                  {pipelineStages.map((stage) => (
                    <MenuItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Conditions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Define conditions that must be met for the workflow to trigger
                  </Typography>
                  <List>
                    {selectedRule?.trigger.conditions.map((condition, index) => (
                      <ListItem key={condition.id}>
                        <ListItemIcon>
                          <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${condition.field} ${condition.operator} ${condition.value}`}
                          secondary={condition.logicalOperator || 'AND'}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 2 }}>
                    Add Condition
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Actions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Define what actions should be performed when the workflow triggers
                  </Typography>
                  <List>
                    {selectedRule?.actions.map((action) => (
                      <ListItem key={action.id}>
                        <ListItemIcon>
                          {actionTypes.find(t => t.value === action.type)?.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={actionTypes.find(t => t.value === action.type)?.label}
                          secondary={action.config.message || action.config.taskDescription}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 2 }}>
                    Add Action
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained">
            {selectedRule ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Test Workflows Dialog */}
      <Dialog open={openTestDialog} onClose={() => setOpenTestDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Test Workflows</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Test your workflow rules with sample data to ensure they work as expected.
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Test Candidate</InputLabel>
                <Select label="Test Candidate">
                  <MenuItem value="candidate1">John Smith - Senior Developer</MenuItem>
                  <MenuItem value="candidate2">Sarah Johnson - Marketing Manager</MenuItem>
                  <MenuItem value="candidate3">Mike Davis - Product Manager</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Current Stage</InputLabel>
                <Select label="Current Stage">
                  {pipelineStages.map((stage) => (
                    <MenuItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Available Workflows:
            </Typography>
            <List>
              {workflowRules.filter(rule => rule.active).map((rule) => (
                <ListItem key={rule.id}>
                  <ListItemIcon>
                    {getTriggerIcon(rule.trigger.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={rule.name}
                    secondary={`${rule.trigger.sourceStage} → ${rule.trigger.targetStage}`}
                  />
                  <Button size="small" variant="outlined">
                    Test
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTestDialog(false)}>Close</Button>
          <Button variant="contained">Run All Tests</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AutoPilotWorkflows; 