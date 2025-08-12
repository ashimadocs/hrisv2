import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { InterviewKit } from '../../types/interviewKit';

interface InterviewKitDialogProps {
  open: boolean;
  onClose: () => void;
  interviewKit?: InterviewKit;
  onSave: (kit: InterviewKit) => void;
}

const InterviewKitDialog: React.FC<InterviewKitDialogProps> = ({
  open,
  onClose,
  interviewKit,
  onSave,
}) => {
  const [kit, setKit] = useState<InterviewKit>({
    id: '',
    name: '',
    instructions: '',
    questions: [],
    skills: [],
    traits: [],
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [newQuestion, setNewQuestion] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newTrait, setNewTrait] = useState('');
  const [selectedQuestionType, setSelectedQuestionType] = useState<'text' | 'range' | 'multiple-choice' | 'rating'>('text');

  useEffect(() => {
    if (interviewKit) {
      setKit(interviewKit);
    } else {
      setKit({
        id: '',
        name: '',
        instructions: '',
        questions: [],
        skills: [],
        traits: [],
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }, [interviewKit]);

  const handleSave = () => {
    if (!kit.name.trim()) {
      alert('Please enter a name for the interview kit');
      return;
    }
    onSave(kit);
    onClose();
  };

  const handleSaveAsDraft = () => {
    const draftKit = { ...kit, status: 'draft' as const };
    onSave(draftKit);
    onClose();
  };

  const addQuestion = () => {
    if (!newQuestion.trim()) return;

    const question = {
      id: Date.now().toString(),
      text: newQuestion,
      type: selectedQuestionType,
      rangeMin: selectedQuestionType === 'range' ? 0 : undefined,
      rangeMax: selectedQuestionType === 'range' ? 15 : undefined,
    };

    setKit(prev => ({
      ...prev,
      questions: [...prev.questions, question],
    }));
    setNewQuestion('');
  };

  const removeQuestion = (questionId: string) => {
    setKit(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId),
    }));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setKit(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
    setNewSkill('');
  };

  const removeSkill = (skill: string) => {
    setKit(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const addTrait = () => {
    if (!newTrait.trim()) return;
    setKit(prev => ({
      ...prev,
      traits: [...prev.traits, newTrait],
    }));
    setNewTrait('');
  };

  const removeTrait = (trait: string) => {
    setKit(prev => ({
      ...prev,
      traits: prev.traits.filter(t => t !== trait),
    }));
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'text': return 'Text';
      case 'range': return 'Range';
      case 'multiple-choice': return 'Multiple Choice';
      case 'rating': return 'Rating';
      default: return type;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {interviewKit ? 'Edit Interview Kit' : 'Create Interview Kit'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Name Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Name*
            </Typography>
            <TextField
              fullWidth
              value={kit.name}
              onChange={(e) => setKit(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter interview kit name"
              required
            />
          </Box>

          {/* Instructions Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              What do you want to tell the team?
            </Typography>
            
            {/* Rich Text Toolbar */}
            <Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
              <Tooltip title="Bold">
                <IconButton size="small">
                  <FormatBoldIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Italic">
                <IconButton size="small">
                  <FormatItalicIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Bullet List">
                <IconButton size="small">
                  <FormatListBulletedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Link">
                <IconButton size="small">
                  <LinkIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            <TextField
              fullWidth
              multiline
              rows={4}
              value={kit.instructions}
              onChange={(e) => setKit(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="Example"
            />
          </Box>

          {/* Questions Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Questions
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              What do you want to ask the candidate?
            </Typography>
            
            <Paper sx={{ p: 2, mb: 2 }}>
              {kit.questions.map((question) => (
                <Box key={question.id} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                      <Typography variant="body1" gutterBottom>
                        {question.text}
                      </Typography>
                      <Chip 
                        label={getQuestionTypeLabel(question.type)} 
                        size="small" 
                        color="default"
                        sx={{ mr: 1 }}
                      />
                      {question.type === 'range' && (
                        <Typography variant="caption" color="textSecondary">
                          {question.rangeMin}-{question.rangeMax}
                        </Typography>
                      )}
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => removeQuestion(question.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
              
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Select question type</InputLabel>
                  <Select
                    value={selectedQuestionType}
                    onChange={(e) => setSelectedQuestionType(e.target.value as any)}
                    label="Select question type"
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="range">Range</MenuItem>
                    <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                  </Select>
                </FormControl>
                
                <Box display="flex" gap={1}>
                  <TextField
                    fullWidth
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Enter your question"
                    size="small"
                  />
                  <Button
                    variant="outlined"
                    onClick={addQuestion}
                    disabled={!newQuestion.trim()}
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </Paper>
            
            <Button
              color="primary"
              sx={{ color: 'pink.main' }}
              startIcon={<AddIcon />}
            >
              + Create question
            </Button>
          </Box>

          {/* Scorecards Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Scorecards
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Which skills and traits are you looking for?
            </Typography>
            
            <Grid container spacing={2}>
              {/* Skills */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Skills
                  </Typography>
                  
                  {kit.skills.map((skill, index) => (
                    <Box key={skill} display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        {index + 1}. {skill}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => removeSkill(skill)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  
                  <Box display="flex" gap={1} sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add skill"
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={addSkill}
                      disabled={!newSkill.trim()}
                    >
                      Add
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              {/* Traits */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Traits
                  </Typography>
                  
                  {kit.traits.map((trait, index) => (
                    <Box key={trait} display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        {index + 1}. {trait}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => removeTrait(trait)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  
                  <Box display="flex" gap={1} sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={newTrait}
                      onChange={(e) => setNewTrait(e.target.value)}
                      placeholder="Add trait"
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={addTrait}
                      disabled={!newTrait.trim()}
                    >
                      Add
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          CANCEL
        </Button>
        <Button onClick={handleSaveAsDraft} variant="outlined">
          Save as Draft
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          sx={{ 
            backgroundColor: 'pink.main',
            '&:hover': { backgroundColor: 'pink.dark' }
          }}
        >
          {interviewKit ? 'UPDATE' : 'CREATE'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InterviewKitDialog; 