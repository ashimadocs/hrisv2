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
  Rating,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Star as StarIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const Competencies: React.FC = () => {
  const competencies = [
    {
      id: 1,
      name: 'Leadership',
      description: 'Ability to guide and motivate team members',
      category: 'Soft Skills',
      level: 4,
      employees: 45,
      targetLevel: 5,
      status: 'Developing',
    },
    {
      id: 2,
      name: 'Technical Skills',
      description: 'Proficiency in required technical areas',
      category: 'Hard Skills',
      level: 4.5,
      employees: 120,
      targetLevel: 4,
      status: 'Proficient',
    },
    {
      id: 3,
      name: 'Communication',
      description: 'Effective verbal and written communication',
      category: 'Soft Skills',
      level: 3.8,
      employees: 89,
      targetLevel: 4,
      status: 'Developing',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Proficient':
        return 'success';
      case 'Developing':
        return 'warning';
      case 'Novice':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Competencies Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Define, assess, and track employee competencies across the organization
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PsychologyIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Competencies</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {competencies.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Avg. Level</Typography>
              </Box>
              <Typography variant="h4" color="success">
                {(competencies.reduce((acc, c) => acc + c.level, 0) / competencies.length).toFixed(1)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Employees Assessed</Typography>
              </Box>
              <Typography variant="h4" color="info">
                {competencies.reduce((acc, c) => acc + c.employees, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StarIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Proficient</Typography>
              </Box>
              <Typography variant="h4" color="warning">
                {competencies.filter(c => c.status === 'Proficient').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Competencies List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Competency Framework
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add Competency
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {competencies.map((competency) => (
                <Grid item xs={12} key={competency.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {competency.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {competency.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                            <Chip 
                              label={competency.status} 
                              color={getStatusColor(competency.status) as any}
                              size="small"
                            />
                            <Chip 
                              label={competency.category} 
                              variant="outlined"
                              size="small"
                            />
                            <Typography variant="body2" color="text.secondary">
                              {competency.employees} employees assessed
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right', ml: 2 }}>
                          <Rating value={competency.level} precision={0.5} readOnly />
                          <Typography variant="body2" color="text.secondary">
                            Target: {competency.targetLevel}
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(competency.level / competency.targetLevel) * 100} 
                        sx={{ mb: 2 }}
                      />
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View Details
                      </Button>
                      <Button size="small" color="secondary">
                        Assess Employees
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Competencies;
