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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

const Compensation: React.FC = () => {
  const compensationData = [
    {
      id: 1,
      employee: 'John Doe',
      position: 'Senior Developer',
      baseSalary: 95000,
      bonus: 15000,
      total: 110000,
      marketRatio: 0.95,
      status: 'Under Market',
    },
    {
      id: 2,
      employee: 'Jane Smith',
      position: 'Product Manager',
      baseSalary: 120000,
      bonus: 25000,
      total: 145000,
      marketRatio: 1.05,
      status: 'Above Market',
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      position: 'UX Designer',
      baseSalary: 85000,
      bonus: 12000,
      total: 97000,
      marketRatio: 0.98,
      status: 'At Market',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Above Market':
        return 'success';
      case 'At Market':
        return 'info';
      case 'Under Market':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Compensation Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage employee compensation, analyze market data, and ensure competitive pay structures
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Payroll</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                ${(compensationData.reduce((acc, c) => acc + c.total, 0) / 1000).toFixed(0)}K
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Avg. Market Ratio</Typography>
              </Box>
              <Typography variant="h4" color="success">
                {(compensationData.reduce((acc, c) => acc + c.marketRatio, 0) / compensationData.length).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Employees</Typography>
              </Box>
              <Typography variant="h4" color="info">
                {compensationData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Under Market</Typography>
              </Box>
              <Typography variant="h4" color="warning">
                {compensationData.filter(c => c.status === 'Under Market').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Compensation Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Compensation Overview
              </Typography>
              <Button
                variant="contained"
                color="primary"
              >
                Run Market Analysis
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell align="right">Base Salary</TableCell>
                    <TableCell align="right">Bonus</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Market Ratio</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {compensationData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.employee}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell align="right">${row.baseSalary.toLocaleString()}</TableCell>
                      <TableCell align="right">${row.bonus.toLocaleString()}</TableCell>
                      <TableCell align="right">${row.total.toLocaleString()}</TableCell>
                      <TableCell align="right">{row.marketRatio}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status} 
                          color={getStatusColor(row.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button size="small" color="primary">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Compensation;
