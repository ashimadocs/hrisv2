import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const Engagement: React.FC = () => {
  const engagementData = [
    {
      id: 1,
      employee: 'John Doe',
      department: 'Engineering',
      engagementScore: 8.5,
      satisfaction: 'High',
      lastSurvey: '2024-01-05',
      concerns: ['Work-life balance', 'Career growth'],
      actions: ['Flexible hours implemented', 'Mentorship program'],
    },
    {
      id: 2,
      employee: 'Jane Smith',
      department: 'Product',
      engagementScore: 7.8,
      satisfaction: 'Medium',
      lastSurvey: '2024-01-08',
      concerns: ['Team communication'],
      actions: ['Weekly team syncs'],
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      department: 'Design',
      engagementScore: 9.2,
      satisfaction: 'Very High',
      lastSurvey: '2024-01-10',
      concerns: [],
      actions: ['Recognition program'],
    },
  ];

  const getSatisfactionColor = (satisfaction: string) => {
    switch (satisfaction) {
      case 'Very High':
        return 'success';
      case 'High':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'error';
      default:
        return 'default';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'success';
    if (score >= 6) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Employee Engagement
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor and improve employee engagement, satisfaction, and workplace culture
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FavoriteIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Avg. Engagement</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {(engagementData.reduce((acc, e) => acc + e.engagementScore, 0) / engagementData.length).toFixed(1)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">High Engagement</Typography>
              </Box>
              <Typography variant="h4" color="success">
                {engagementData.filter(e => e.engagementScore >= 8).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Employees</Typography>
              </Box>
              <Typography variant="h4" color="info">
                {engagementData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Needs Attention</Typography>
              </Box>
              <Typography variant="h4" color="warning">
                {engagementData.filter(e => e.engagementScore < 7).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Engagement List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Employee Engagement Overview
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                color="primary"
              >
                Launch Survey
              </Button>
            </Box>
            
            <List>
              {engagementData.map((employee) => (
                <ListItem key={employee.id} divider sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{employee.employee.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="h6">
                          {employee.employee}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {employee.department} • Last survey: {new Date(employee.lastSurvey).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h4" color={getScoreColor(employee.engagementScore)}>
                        {employee.engagementScore}/10
                      </Typography>
                      <Chip 
                        label={employee.satisfaction} 
                        color={getSatisfactionColor(employee.satisfaction) as any}
                        size="small"
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ width: '100%', mb: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={(employee.engagementScore / 10) * 100} 
                      sx={{ mb: 2 }}
                      color={getScoreColor(employee.engagementScore) as any}
                    />
                    
                    {employee.concerns.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                          Areas of Concern:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {employee.concerns.map((concern, index) => (
                            <Chip 
                              key={index}
                              label={concern} 
                              color="warning"
                              variant="outlined"
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                    
                    {employee.actions.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                          Actions Taken:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {employee.actions.map((action, index) => (
                            <Chip 
                              key={index}
                              label={action} 
                              color="success"
                              variant="outlined"
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>

                  <CardActions sx={{ justifyContent: 'flex-end', p: 0 }}>
                    <Button size="small" color="primary">
                      View Details
                    </Button>
                    <Button size="small" color="secondary">
                      Follow Up
                    </Button>
                  </CardActions>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Engagement;
