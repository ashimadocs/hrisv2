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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Email as EmailIcon,
  Send as SendIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Pending as PendingIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  trigger: string;
  stage: string;
  active: boolean;
}

interface Communication {
  id: string;
  type: 'email' | 'sms' | 'notification';
  recipient: string;
  subject: string;
  status: 'sent' | 'delivered' | 'failed' | 'pending';
  sentDate: string;
  template: string;
  stage: string;
}

interface NotificationRule {
  id: string;
  name: string;
  trigger: string;
  stage: string;
  recipients: string[];
  template: string;
  active: boolean;
}

const AutomatedCommunications: React.FC = () => {
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Application Received',
      subject: 'Thank you for your application - {Company Name}',
      body: 'Dear {Candidate Name},\n\nThank you for your interest in the {Position} role at {Company Name}. We have received your application and will review it carefully.\n\nWe will contact you within 5-7 business days with next steps.\n\nBest regards,\n{Company Name} HR Team',
      trigger: 'application_received',
      stage: 'applied',
      active: true,
    },
    {
      id: '2',
      name: 'Interview Invitation',
      subject: 'Interview Invitation - {Position} at {Company Name}',
      body: 'Dear {Candidate Name},\n\nWe are pleased to invite you for an interview for the {Position} position.\n\nDate: {Interview Date}\nTime: {Interview Time}\nLocation: {Interview Location}\n\nPlease confirm your attendance by replying to this email.\n\nBest regards,\n{Company Name} HR Team',
      trigger: 'interview_scheduled',
      stage: 'interview',
      active: true,
    },
    {
      id: '3',
      name: 'Offer Letter',
      subject: 'Congratulations! Offer Letter - {Position} at {Company Name}',
      body: 'Dear {Candidate Name},\n\nWe are delighted to offer you the position of {Position} at {Company Name}.\n\nSalary: {Salary}\nStart Date: {Start Date}\n\nPlease review the attached offer letter and respond within 5 business days.\n\nBest regards,\n{Company Name} HR Team',
      trigger: 'offer_sent',
      stage: 'offer',
      active: true,
    },
  ]);

  const [communications, setCommunications] = useState<Communication[]>([
    {
      id: '1',
      type: 'email',
      recipient: 'john.smith@email.com',
      subject: 'Thank you for your application - Senior Developer',
      status: 'delivered',
      sentDate: '2024-01-15 10:30 AM',
      template: 'Application Received',
      stage: 'applied',
    },
    {
      id: '2',
      type: 'email',
      recipient: 'sarah.johnson@email.com',
      subject: 'Interview Invitation - Marketing Manager',
      status: 'sent',
      sentDate: '2024-01-16 2:15 PM',
      template: 'Interview Invitation',
      stage: 'interview',
    },
    {
      id: '3',
      type: 'email',
      recipient: 'mike.davis@email.com',
      subject: 'Congratulations! Offer Letter - Product Manager',
      status: 'pending',
      sentDate: '2024-01-17 9:00 AM',
      template: 'Offer Letter',
      stage: 'offer',
    },
  ]);

  const [notificationRules, setNotificationRules] = useState<NotificationRule[]>([
    {
      id: '1',
      name: 'New Application Alert',
      trigger: 'new_application',
      stage: 'applied',
      recipients: ['hr@company.com', 'hiring-manager@company.com'],
      template: 'New Application Notification',
      active: true,
    },
    {
      id: '2',
      name: 'Interview Reminder',
      trigger: 'interview_reminder',
      stage: 'interview',
      recipients: ['interviewer@company.com'],
      template: 'Interview Reminder',
      active: true,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setOpenDialog(true);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTemplate(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'info';
      case 'delivered':
        return 'success';
      case 'failed':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <SendIcon />;
      case 'delivered':
        return <CheckCircleIcon />;
      case 'failed':
        return <ErrorIcon />;
      case 'pending':
        return <PendingIcon />;
      default:
        return <EmailIcon />;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Automated Communications</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateTemplate}>
          Create Template
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Email Templates" />
          <Tab label="Recent Communications" />
          <Tab label="Notification Rules" />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          {emailTemplates.map((template) => (
            <Grid item xs={12} md={6} lg={4} key={template.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box>
                      <Typography variant="h6">{template.name}</Typography>
                      <Chip
                        label={template.stage}
                        size="small"
                        color="primary"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                    <Switch checked={template.active} />
                  </Box>
                  
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    <strong>Subject:</strong> {template.subject}
                  </Typography>
                  
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {template.body.substring(0, 100)}...
                  </Typography>
                  
                  <Box display="flex" gap={1} mt={2}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEditTemplate(template)}
                    >
                      Edit
                    </Button>
                    <Button size="small" variant="outlined" startIcon={<SendIcon />}>
                      Test
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {activeTab === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Communications
          </Typography>
          <List>
            {communications.map((communication) => (
              <React.Fragment key={communication.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {getStatusIcon(communication.status)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={communication.subject}
                    secondary={`${communication.recipient} - ${communication.sentDate}`}
                  />
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                      label={communication.status}
                      color={getStatusColor(communication.status) as any}
                      size="small"
                    />
                    <Chip label={communication.stage} size="small" />
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {activeTab === 2 && (
        <Grid container spacing={3}>
          {notificationRules.map((rule) => (
            <Grid item xs={12} md={6} key={rule.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box>
                      <Typography variant="h6">{rule.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Trigger: {rule.trigger}
                      </Typography>
                    </Box>
                    <Switch checked={rule.active} />
                  </Box>
                  
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    <strong>Stage:</strong> {rule.stage}
                  </Typography>
                  
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    <strong>Recipients:</strong> {rule.recipients.join(', ')}
                  </Typography>
                  
                  <Typography variant="body2" color="textSecondary">
                    <strong>Template:</strong> {rule.template}
                  </Typography>
                  
                  <Box display="flex" gap={1} mt={2}>
                    <Button size="small" variant="outlined">
                      Edit
                    </Button>
                    <Button size="small" variant="outlined" color="error">
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create/Edit Template Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTemplate ? 'Edit Email Template' : 'Create Email Template'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Template Name"
                defaultValue={selectedTemplate?.name || ''}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Trigger</InputLabel>
                <Select label="Trigger" defaultValue={selectedTemplate?.trigger || ''}>
                  <MenuItem value="application_received">Application Received</MenuItem>
                  <MenuItem value="interview_scheduled">Interview Scheduled</MenuItem>
                  <MenuItem value="offer_sent">Offer Sent</MenuItem>
                  <MenuItem value="offer_accepted">Offer Accepted</MenuItem>
                  <MenuItem value="offer_declined">Offer Declined</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Stage</InputLabel>
                <Select label="Stage" defaultValue={selectedTemplate?.stage || ''}>
                  <MenuItem value="applied">Applied</MenuItem>
                  <MenuItem value="screening">Screening</MenuItem>
                  <MenuItem value="interview">Interview</MenuItem>
                  <MenuItem value="offer">Offer</MenuItem>
                  <MenuItem value="hired">Hired</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject Line"
                defaultValue={selectedTemplate?.subject || ''}
                placeholder="Use {variables} for dynamic content"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Body"
                multiline
                rows={8}
                defaultValue={selectedTemplate?.body || ''}
                placeholder="Use {variables} for dynamic content. Available variables: {Candidate Name}, {Position}, {Company Name}, {Interview Date}, etc."
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Available variables: {'{Candidate Name}'}, {'{Position}'}, {'{Company Name}'}, {'{Interview Date}'}, {'{Salary}'}, {'{Start Date}'}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="outlined">
            Preview
          </Button>
          <Button variant="contained">
            {selectedTemplate ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AutomatedCommunications; 