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
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Flag as FlagIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const Goals: React.FC = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  
  const goals = [
    {
      id: 1,
      title: 'Increase Team Productivity',
      description: 'Improve overall team efficiency by 20% through process optimization',
      status: 'In Progress',
      progress: 75,
      dueDate: '2024-03-15',
      priority: 'High',
      category: 'Performance',
    },
    {
      id: 2,
      title: 'Complete Advanced Certification',
      description: 'Obtain AWS Solutions Architect certification',
      status: 'On Track',
      progress: 60,
      dueDate: '2024-06-01',
      priority: 'Medium',
      category: 'Development',
    },
    {
      id: 3,
      title: 'Improve Customer Satisfaction',
      description: 'Achieve 95% customer satisfaction score',
      status: 'Completed',
      progress: 100,
      dueDate: '2023-12-31',
      priority: 'High',
      category: 'Customer',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'On Track':
        return 'info';
      case 'At Risk':
        return 'error';
      default:
        return 'default';
    }
  };

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

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Goals Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Set, track, and manage individual and team goals for continuous improvement
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FlagIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Active Goals</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {goals.filter(g => g.status !== 'Completed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">On Track</Typography>
              </Box>
              <Typography variant="h4" color="success">
                {goals.filter(g => g.status === 'On Track').length}
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
                {goals.filter(g => {
                  const dueDate = new Date(g.dueDate);
                  const now = new Date();
                  const diffTime = dueDate.getTime() - now.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 30 && diffDays > 0;
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
                {goals.filter(g => g.status === 'Completed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Goals List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Current Goals
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Add Goal
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {goals.map((goal) => (
                <Grid item xs={12} key={goal.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {goal.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {goal.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                            <Chip 
                              label={goal.status} 
                              color={getStatusColor(goal.status) as any}
                              size="small"
                            />
                            <Chip 
                              label={goal.priority} 
                              color={getPriorityColor(goal.priority) as any}
                              size="small"
                            />
                            <Chip 
                              label={goal.category} 
                              variant="outlined"
                              size="small"
                            />
                            <Typography variant="body2" color="text.secondary">
                              Due: {new Date(goal.dueDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right', ml: 2 }}>
                          <Typography variant="h6" color="primary">
                            {goal.progress}%
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={goal.progress} 
                        sx={{ mb: 2 }}
                      />
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Update Progress
                      </Button>
                      <Button size="small" color="secondary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Goal Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Goal Title"
                placeholder="Enter goal title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                placeholder="Describe your goal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select label="Priority">
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="Performance">Performance</MenuItem>
                  <MenuItem value="Development">Development</MenuItem>
                  <MenuItem value="Customer">Customer</MenuItem>
                  <MenuItem value="Process">Process</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Create Goal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add goal"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpenDialog(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Goals;
