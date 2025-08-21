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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  RateReview as RateReviewIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const Feedback: React.FC = () => {
  const feedbackData = [
    {
      id: 1,
      employee: 'John Doe',
      reviewer: 'Jane Smith',
      type: '360 Review',
      status: 'Completed',
      date: '2024-01-10',
      rating: 4.2,
      comment: 'Excellent leadership skills and technical expertise. Shows great potential for senior roles.',
    },
    {
      id: 2,
      employee: 'Mike Johnson',
      reviewer: 'Sarah Wilson',
      type: 'Peer Review',
      status: 'Pending',
      date: '2024-01-15',
      rating: null,
      comment: 'Collaborative team player with strong communication skills.',
    },
    {
      id: 3,
      employee: 'Emily Brown',
      reviewer: 'David Lee',
      type: 'Manager Review',
      status: 'In Progress',
      date: '2024-01-12',
      rating: 3.8,
      comment: 'Good performance overall, areas for improvement in time management.',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '360 Review':
        return 'primary';
      case 'Peer Review':
        return 'secondary';
      case 'Manager Review':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Feedback Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and manage employee feedback, reviews, and performance assessments
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RateReviewIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Reviews</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {feedbackData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Avg. Rating</Typography>
              </Box>
              <Typography variant="h4" color="success">
                {(feedbackData.filter(f => f.rating).reduce((acc, f) => acc + f.rating!, 0) / 
                  feedbackData.filter(f => f.rating).length).toFixed(1)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ScheduleIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Pending</Typography>
              </Box>
              <Typography variant="h4" color="warning">
                {feedbackData.filter(f => f.status === 'Pending').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Completed</Typography>
              </Box>
              <Typography variant="h4" color="success">
                {feedbackData.filter(f => f.status === 'Completed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Feedback List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Recent Feedback
              </Typography>
              <Button
                variant="contained"
                color="primary"
              >
                Request Feedback
              </Button>
            </Box>
            
            <List>
              {feedbackData.map((feedback) => (
                <ListItem key={feedback.id} divider>
                  <ListItemAvatar>
                    <Avatar>{feedback.employee.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="h6">
                          {feedback.employee}
                        </Typography>
                        <Chip 
                          label={feedback.type} 
                          color={getTypeColor(feedback.type) as any}
                          size="small"
                        />
                        <Chip 
                          label={feedback.status} 
                          color={getStatusColor(feedback.status) as any}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Reviewed by {feedback.reviewer} on {new Date(feedback.date).toLocaleDateString()}
                        </Typography>
                        {feedback.rating && (
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            Rating: {feedback.rating}/5
                          </Typography>
                        )}
                        <Typography variant="body2">
                          {feedback.comment}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="more">
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Feedback;
