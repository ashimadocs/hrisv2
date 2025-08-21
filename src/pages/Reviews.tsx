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
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const Reviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      employee: 'John Doe',
      reviewer: 'Jane Smith',
      type: 'Annual Review',
      status: 'Completed',
      dueDate: '2024-01-15',
      completionDate: '2024-01-10',
      overallRating: 4.2,
      categories: [
        { name: 'Performance', rating: 4.5 },
        { name: 'Leadership', rating: 4.0 },
        { name: 'Communication', rating: 4.3 },
        { name: 'Innovation', rating: 3.8 },
      ],
    },
    {
      id: 2,
      employee: 'Mike Johnson',
      reviewer: 'Sarah Wilson',
      type: 'Mid-Year Review',
      status: 'In Progress',
      dueDate: '2024-01-20',
      completionDate: null,
      overallRating: null,
      categories: [
        { name: 'Performance', rating: 3.9 },
        { name: 'Leadership', rating: 3.5 },
        { name: 'Communication', rating: 4.1 },
        { name: 'Innovation', rating: 3.7 },
      ],
    },
    {
      id: 3,
      employee: 'Emily Brown',
      reviewer: 'David Lee',
      type: 'Quarterly Review',
      status: 'Pending',
      dueDate: '2024-01-25',
      completionDate: null,
      overallRating: null,
      categories: [],
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
      case 'Annual Review':
        return 'primary';
      case 'Mid-Year Review':
        return 'secondary';
      case 'Quarterly Review':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Performance Reviews
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track employee performance reviews and assessments
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StarIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Reviews</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {reviews.length}
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
                {(reviews.filter(r => r.overallRating).reduce((acc, r) => acc + r.overallRating!, 0) / 
                  reviews.filter(r => r.overallRating).length).toFixed(1)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ScheduleIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Due Soon</Typography>
              </Box>
              <Typography variant="h4" color="warning">
                {reviews.filter(r => {
                  const dueDate = new Date(r.dueDate);
                  const now = new Date();
                  const diffTime = dueDate.getTime() - now.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 7 && diffDays > 0;
                }).length}
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
                {reviews.filter(r => r.status === 'Completed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Reviews List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Review Schedule
              </Typography>
              <Button
                variant="contained"
                color="primary"
              >
                Schedule Review
              </Button>
            </Box>
            
            <List>
              {reviews.map((review) => (
                <ListItem key={review.id} divider sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{review.employee.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="h6">
                          {review.employee}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Reviewed by {review.reviewer}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip 
                        label={review.type} 
                        color={getTypeColor(review.type) as any}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <br />
                      <Chip 
                        label={review.status} 
                        color={getStatusColor(review.status) as any}
                        size="small"
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ width: '100%', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Due: {new Date(review.dueDate).toLocaleDateString()}
                      {review.completionDate && ` • Completed: ${new Date(review.completionDate).toLocaleDateString()}`}
                    </Typography>
                    
                    {review.overallRating && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="body2">Overall Rating:</Typography>
                        <Typography variant="h6" color="primary">{review.overallRating}/5</Typography>
                      </Box>
                    )}
                  </Box>

                  {review.categories.length > 0 && (
                    <Box sx={{ width: '100%', mb: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>Category Ratings:</Typography>
                      <Grid container spacing={1}>
                        {review.categories.map((category, index) => (
                          <Grid item xs={6} key={index}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body2">{category.name}</Typography>
                              <Typography variant="body2" color="primary">
                                {category.rating}/5
                              </Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={(category.rating / 5) * 100} 
                              sx={{ height: 4 }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  <CardActions sx={{ justifyContent: 'flex-end', p: 0 }}>
                    <Button size="small" color="primary">
                      {review.status === 'Completed' ? 'View Details' : 'Continue Review'}
                    </Button>
                    <Button size="small" color="secondary">
                      Edit
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

export default Reviews;
