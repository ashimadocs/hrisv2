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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
  Collapse,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Assessment as AssessmentIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Psychology as PsychologyIcon,
  Build as BuildIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import InterviewKitDialog from './InterviewKitDialog';
import { InterviewKit } from '../../types/interviewKit';

interface InterviewKitManagementProps {
  interviewKits: InterviewKit[];
  onSaveKit: (kit: InterviewKit) => void;
  onDeleteKit: (kitId: string) => void;
}

const InterviewKitManagement: React.FC<InterviewKitManagementProps> = ({
  interviewKits,
  onSaveKit,
  onDeleteKit,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedKit, setSelectedKit] = useState<InterviewKit | undefined>();
  const [viewKit, setViewKit] = useState<InterviewKit | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'createdAt' | 'updatedAt'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleCreateKit = () => {
    setSelectedKit(undefined);
    setOpenDialog(true);
  };

  const handleEditKit = (kit: InterviewKit) => {
    setSelectedKit(kit);
    setOpenDialog(true);
  };

  const handleViewKit = (kit: InterviewKit) => {
    setViewKit(kit);
    setOpenViewDialog(true);
  };

  const handleSaveKit = (kit: InterviewKit) => {
    const kitToSave = {
      ...kit,
      id: kit.id || Date.now().toString(),
      createdAt: kit.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSaveKit(kitToSave);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'draft':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setSearchTerm('');
    setSortBy('name');
    setSortOrder('desc');
  };

  const filteredKits = interviewKits
    .filter(kit => 
      statusFilter === 'all' || kit.status === statusFilter
    )
    .filter(kit =>
      searchTerm === '' || 
      kit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kit.instructions.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: string;
      let bValue: string;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'createdAt':
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case 'updatedAt':
          aValue = a.updatedAt;
          bValue = b.updatedAt;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Interview Kits</Typography>
        <Box display="flex" gap={1} alignItems="center">
          {/* Search Field */}
          <TextField
            size="small"
            placeholder="Search interview kits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              width: 250,
              '& .MuiOutlinedInput-root': {
                fontSize: '0.875rem',
                height: 36
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title="Filters & Sort">
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderColor: 'primary.main'
                }
              }}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateKit}
            sx={{ 
              backgroundColor: 'pink.main',
              '&:hover': { backgroundColor: 'pink.dark' }
            }}
          >
            Create Interview Kit
          </Button>
        </Box>
      </Box>

      {/* Vertical Filters Panel */}
      <Collapse in={showFilters}>
        <Paper sx={{ p: 2, mb: 2, backgroundColor: '#fafafa' }}>
          {/* Header with Clear */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <FilterIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Filters
              </Typography>
            </Box>
            {(statusFilter !== 'all' || searchTerm !== '' || sortBy !== 'name' || sortOrder !== 'desc') && (
              <Button
                size="small"
                onClick={clearFilters}
                sx={{
                  minWidth: 'auto',
                  px: 1,
                  fontSize: '0.75rem',
                  textTransform: 'none'
                }}
              >
                Clear
              </Button>
            )}
          </Box>

          {/* Compact Filter Options */}
          <Box display="flex" gap={3} flexWrap="wrap">
            {/* Sort Options */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Sort:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  displayEmpty
                  sx={{ fontSize: '0.75rem' }}
                >
                  <MenuItem value="name" sx={{ fontSize: '0.75rem' }}>Name</MenuItem>
                  <MenuItem value="createdAt" sx={{ fontSize: '0.75rem' }}>Created Date</MenuItem>
                  <MenuItem value="updatedAt" sx={{ fontSize: '0.75rem' }}>Updated Date</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  displayEmpty
                  sx={{ fontSize: '0.75rem' }}
                >
                  <MenuItem value="asc" sx={{ fontSize: '0.75rem' }}>↑ Asc</MenuItem>
                  <MenuItem value="desc" sx={{ fontSize: '0.75rem' }}>↓ Desc</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Status Filter */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Status:
              </Typography>
              <Box display="flex" gap={0.5} flexWrap="wrap">
                {[
                  { value: 'all', label: 'All Kits', color: '#e0e0e0' },
                  { value: 'active', label: 'Active', color: '#4caf50' },
                  { value: 'draft', label: 'Draft', color: '#ff9800' },
                  { value: 'inactive', label: 'Inactive', color: '#f44336' }
                ].map((status) => (
                  <Chip
                    key={status.value}
                    label={status.label}
                    size="small"
                    variant={statusFilter === status.value ? "filled" : "outlined"}
                    onClick={() => setStatusFilter(status.value)}
                    sx={{
                      fontSize: '0.65rem',
                      height: 20,
                      cursor: 'pointer',
                      backgroundColor: statusFilter === status.value ? status.color : `${status.color}80`,
                      borderColor: status.color,
                      color: statusFilter === status.value ? 'white' : '#333333',
                      fontWeight: statusFilter === status.value ? 'bold' : 'medium',
                      '&:hover': { 
                        opacity: 0.8,
                        backgroundColor: statusFilter === status.value ? status.color : `${status.color}90`,
                        color: statusFilter === status.value ? 'white' : '#000000'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {/* Active Filters Summary - Compact */}
          {(statusFilter !== 'all' || searchTerm !== '' || sortBy !== 'name' || sortOrder !== 'desc') && (
            <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid #e0e0e0' }}>
              <Box display="flex" flexWrap="wrap" gap={0.5}>
                {searchTerm && (
                  <Chip
                    label={`Search: "${searchTerm}"`}
                    size="small"
                    onDelete={() => setSearchTerm('')}
                    sx={{ fontSize: '0.65rem', height: 20 }}
                  />
                )}
                {statusFilter !== 'all' && (
                  <Chip
                    label={`Status: ${statusFilter}`}
                    size="small"
                    onDelete={() => setStatusFilter('all')}
                    sx={{ fontSize: '0.65rem', height: 20 }}
                  />
                )}
                {sortBy !== 'name' && (
                  <Chip
                    label={`Sort: ${sortBy}`}
                    size="small"
                    onDelete={() => setSortBy('name')}
                    sx={{ fontSize: '0.65rem', height: 20 }}
                  />
                )}
                {sortOrder !== 'desc' && (
                  <Chip
                    label={`Order: ${sortOrder}`}
                    size="small"
                    onDelete={() => setSortOrder('desc')}
                    sx={{ fontSize: '0.65rem', height: 20 }}
                  />
                )}
              </Box>
            </Box>
          )}
        </Paper>
      </Collapse>

      {/* Interview Kits Grid */}
      <Grid container spacing={3}>
        {filteredKits.map((kit) => (
          <Grid item xs={12} sm={6} md={4} key={kit.id}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                '&:hover': { 
                  boxShadow: 3,
                  backgroundColor: 'action.hover'
                }
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {kit.name}
                  </Typography>
                  <Chip
                    label={kit.status}
                    color={getStatusColor(kit.status)}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <QuestionAnswerIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary">
                      {kit.questions.length} questions
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <BuildIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary">
                      {kit.skills.length} skills
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PsychologyIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary">
                      {kit.traits.length} traits
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="textSecondary">
                    Updated: {new Date(kit.updatedAt).toLocaleDateString()}
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewKit(kit);
                        }}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Kit">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditKit(kit);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Kit">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteKit(kit.id);
                        }}
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

      {/* Create/Edit Dialog */}
      <InterviewKitDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        interviewKit={selectedKit}
        onSave={handleSaveKit}
      />

      {/* View Kit Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <AssessmentIcon />
            <Typography variant="h6">{viewKit?.name}</Typography>
            <Chip
              label={viewKit?.status}
              color={getStatusColor(viewKit?.status || '')}
              size="small"
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          {viewKit && (
            <Box sx={{ mt: 2 }}>
              {/* Instructions */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Instructions
                </Typography>
                <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
                  <Typography variant="body2">
                    {viewKit.instructions || 'No instructions provided'}
                  </Typography>
                </Paper>
              </Box>

              {/* Questions */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Questions ({viewKit.questions.length})
                </Typography>
                <Paper sx={{ p: 2 }}>
                  {viewKit.questions.length > 0 ? (
                    <List>
                      {viewKit.questions.map((question, index) => (
                        <React.Fragment key={question.id}>
                          <ListItem>
                            <ListItemText
                              primary={`${index + 1}. ${question.text}`}
                              secondary={
                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                  <Chip 
                                    label={question.type} 
                                    size="small" 
                                    color="default"
                                  />
                                  {question.type === 'range' && (
                                    <Typography variant="caption" color="textSecondary">
                                      Range: {question.rangeMin}-{question.rangeMax}
                                    </Typography>
                                  )}
                                </Box>
                              }
                            />
                          </ListItem>
                          {index < viewKit.questions.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No questions added
                    </Typography>
                  )}
                </Paper>
              </Box>

              {/* Scorecards */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Scorecards
                </Typography>
                <Grid container spacing={2}>
                  {/* Skills */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Skills ({viewKit.skills.length})
                      </Typography>
                      {viewKit.skills.length > 0 ? (
                        <List dense>
                          {viewKit.skills.map((skill, index) => (
                            <ListItem key={skill} sx={{ py: 0.5 }}>
                              <ListItemText
                                primary={`${index + 1}. ${skill}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No skills defined
                        </Typography>
                      )}
                    </Paper>
                  </Grid>

                  {/* Traits */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Traits ({viewKit.traits.length})
                      </Typography>
                      {viewKit.traits.length > 0 ? (
                        <List dense>
                          {viewKit.traits.map((trait, index) => (
                            <ListItem key={trait} sx={{ py: 0.5 }}>
                              <ListItemText
                                primary={`${index + 1}. ${trait}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No traits defined
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
          {viewKit && (
            <Button
              variant="contained"
              onClick={() => {
                setOpenViewDialog(false);
                handleEditKit(viewKit);
              }}
              sx={{ 
                backgroundColor: 'pink.main',
                '&:hover': { backgroundColor: 'pink.dark' }
              }}
            >
              Edit Kit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InterviewKitManagement; 