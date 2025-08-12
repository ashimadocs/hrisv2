import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import {
  Work as WorkIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Active Jobs',
      value: '12',
      icon: <WorkIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: '#1976d2',
    },
    {
      title: 'Total Candidates',
      value: '156',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      color: '#dc004e',
    },
    {
      title: 'Hires This Month',
      value: '8',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      color: '#2e7d32',
    },
    {
      title: 'Avg Time to Hire',
      value: '23 days',
      icon: <ScheduleIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: '#ed6c02',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        HRIS Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • New application received for Senior Developer position
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • Interview scheduled for Marketing Manager candidate
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • Offer letter sent to Sales Representative candidate
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • Create new job requisition
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • Review pending applications
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • Schedule interviews
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 