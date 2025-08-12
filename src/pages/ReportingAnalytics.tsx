import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Assessment as AssessmentIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

interface Metric {
  name: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

interface PipelineData {
  stage: string;
  count: number;
  percentage: number;
  avgTime: string;
}

interface SourceData {
  source: string;
  applications: number;
  hires: number;
  conversionRate: number;
}

const ReportingAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [department, setDepartment] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);

  const metrics: Metric[] = [
    {
      name: 'Time to Hire',
      value: '23 days',
      change: -12,
      trend: 'down',
      icon: <ScheduleIcon />,
    },
    {
      name: 'Cost per Hire',
      value: '$4,200',
      change: 8,
      trend: 'up',
      icon: <MoneyIcon />,
    },
    {
      name: 'Offer Acceptance Rate',
      value: '78%',
      change: 5,
      trend: 'up',
      icon: <AssessmentIcon />,
    },
    {
      name: 'Quality of Hire',
      value: '4.2/5',
      change: 0,
      trend: 'stable',
      icon: <PeopleIcon />,
    },
  ];

  const pipelineData: PipelineData[] = [
    { stage: 'Applied', count: 156, percentage: 100, avgTime: '0 days' },
    { stage: 'Screening', count: 89, percentage: 57, avgTime: '3 days' },
    { stage: 'Interview', count: 45, percentage: 29, avgTime: '7 days' },
    { stage: 'Offer', count: 12, percentage: 8, avgTime: '15 days' },
    { stage: 'Hired', count: 8, percentage: 5, avgTime: '23 days' },
  ];

  const sourceData: SourceData[] = [
    { source: 'LinkedIn', applications: 45, hires: 3, conversionRate: 6.7 },
    { source: 'Indeed', applications: 38, hires: 2, conversionRate: 5.3 },
    { source: 'Company Website', applications: 25, hires: 2, conversionRate: 8.0 },
    { source: 'Referrals', applications: 18, hires: 1, conversionRate: 5.6 },
    { source: 'Job Boards', applications: 30, hires: 0, conversionRate: 0.0 },
  ];

  const handleExportReport = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'success';
      case 'down':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon />;
      case 'down':
        return <TrendingDownIcon />;
      default:
        return undefined;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Reporting & Analytics</Typography>
        <Box display="flex" gap={2}>
          <FormControl size="small">
            <InputLabel>Time Range</InputLabel>
            <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} label="Time Range">
              <MenuItem value="7">Last 7 days</MenuItem>
              <MenuItem value="30">Last 30 days</MenuItem>
              <MenuItem value="90">Last 90 days</MenuItem>
              <MenuItem value="365">Last year</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Department</InputLabel>
            <Select value={department} onChange={(e) => setDepartment(e.target.value)} label="Department">
              <MenuItem value="all">All Departments</MenuItem>
              <MenuItem value="engineering">Engineering</MenuItem>
              <MenuItem value="marketing">Marketing</MenuItem>
              <MenuItem value="sales">Sales</MenuItem>
              <MenuItem value="design">Design</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExportReport}>
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} mb={3}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.name}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Box sx={{ color: 'primary.main' }}>
                    {metric.icon}
                  </Box>
                  <Chip
                    icon={getTrendIcon(metric.trend) || undefined}
                    label={`${metric.change > 0 ? '+' : ''}${metric.change}%`}
                    color={getTrendColor(metric.trend) as any}
                    size="small"
                  />
                </Box>
                <Typography variant="h4" gutterBottom>
                  {metric.value}
                </Typography>
                <Typography color="textSecondary">
                  {metric.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Pipeline Analytics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Pipeline Analytics
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Stage</TableCell>
                    <TableCell align="right">Count</TableCell>
                    <TableCell align="right">Conversion</TableCell>
                    <TableCell align="right">Avg Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pipelineData.map((row) => (
                    <TableRow key={row.stage}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                              mr: 1,
                            }}
                          />
                          {row.stage}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                      <TableCell align="right">{row.percentage}%</TableCell>
                      <TableCell align="right">{row.avgTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Source Analytics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Source Analytics
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Source</TableCell>
                    <TableCell align="right">Applications</TableCell>
                    <TableCell align="right">Hires</TableCell>
                    <TableCell align="right">Conversion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sourceData.map((row) => (
                    <TableRow key={row.source}>
                      <TableCell>{row.source}</TableCell>
                      <TableCell align="right">{row.applications}</TableCell>
                      <TableCell align="right">{row.hires}</TableCell>
                      <TableCell align="right">{row.conversionRate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Detailed Reports */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Detailed Reports
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <BarChartIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Time to Fill Report</Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Track how long positions take to fill by department and role
                    </Typography>
                    <Button size="small" variant="outlined" sx={{ mt: 1 }}>
                      View Report
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <PieChartIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Source Effectiveness</Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Compare recruitment sources by quality and cost
                    </Typography>
                    <Button size="small" variant="outlined" sx={{ mt: 1 }}>
                      View Report
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Hiring Funnel</Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Analyze conversion rates at each stage of the hiring process
                    </Typography>
                    <Button size="small" variant="outlined" sx={{ mt: 1 }}>
                      View Report
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Export Report Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Export Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select label="Report Type" defaultValue="">
                  <MenuItem value="pipeline">Pipeline Analytics</MenuItem>
                  <MenuItem value="source">Source Analytics</MenuItem>
                  <MenuItem value="time-to-fill">Time to Fill Report</MenuItem>
                  <MenuItem value="cost-per-hire">Cost per Hire Report</MenuItem>
                  <MenuItem value="comprehensive">Comprehensive Report</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Format</InputLabel>
                <Select label="Format" defaultValue="pdf">
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="excel">Excel</MenuItem>
                  <MenuItem value="csv">CSV</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportingAnalytics; 