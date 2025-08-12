import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Chip,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { keywordReference, KeywordSuggestion } from '../../data/keywordReference';

interface RequiredQualificationsFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  jobTitle?: string;
  jobDescription?: string;
  fieldLabel?: string;
  buttonText?: string;
}

const RequiredQualificationsField: React.FC<RequiredQualificationsFieldProps> = ({
  value,
  onChange,
  jobTitle = '',
  jobDescription = '',
  fieldLabel = 'Required Qualifications',
  buttonText = '+ Add Custom Field'
}) => {
  const [suggestedKeywords, setSuggestedKeywords] = useState<KeywordSuggestion[]>([]);
  const [showKeywordDialog, setShowKeywordDialog] = useState(false);
  const [customQualification, setCustomQualification] = useState('');

  // Analyze job title and description to suggest relevant keywords
  useEffect(() => {
    const text = `${jobTitle} ${jobDescription}`.toLowerCase();
    const relevantKeywords: KeywordSuggestion[] = [];

    keywordReference.forEach(category => {
      category.keywords.forEach(keyword => {
        // Check if keyword is relevant based on job title/description
        const keywordLower = keyword.keyword.toLowerCase();
        if (text.includes(keywordLower) || 
            keywordLower.split(',').some(k => text.includes(k.trim())) ||
            keywordLower.split('/').some(k => text.includes(k.trim()))) {
          relevantKeywords.push(keyword);
        }
      });
    });

    // Also include experience level keywords based on job title
    const experienceKeywords = keywordReference.find(cat => 
      cat.category === 'Senior' || cat.category === 'Junior' || 
      cat.category === 'Manager' || cat.category === 'Supervisor'
    );
    
    if (experienceKeywords) {
      relevantKeywords.push(...experienceKeywords.keywords);
    }

    setSuggestedKeywords(relevantKeywords);
  }, [jobTitle, jobDescription]);

  const handleAddKeyword = (keyword: KeywordSuggestion) => {
    if (!value.includes(keyword.keyword)) {
      onChange([...value, keyword.keyword]);
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    onChange(value.filter(k => k !== keywordToRemove));
  };

  const handleAddCustom = () => {
    if (customQualification.trim() && !value.includes(customQualification.trim())) {
      onChange([...value, customQualification.trim()]);
      setCustomQualification('');
    }
  };

  const handleDragStart = (e: React.DragEvent, keyword: string) => {
    e.dataTransfer.setData('text/plain', keyword);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const keyword = e.dataTransfer.getData('text/plain');
    if (keyword && !value.includes(keyword)) {
      onChange([...value, keyword]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Grid container spacing={2}>
      {/* Required Qualifications Field */}
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" gutterBottom>
          {fieldLabel}
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            minHeight: 120,
            p: 2,
            border: '1px solid #e0e0e0',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            alignItems: 'flex-start'
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {value.length === 0 ? (
                      <Typography variant="body2" color="textSecondary">
            Drag requirements here or click "{buttonText.replace('+ ', '')}"
          </Typography>
          ) : (
            value.map((qualification, index) => (
                              <Chip
                  key={index}
                  label={qualification}
                  onDelete={() => handleRemoveKeyword(qualification)}
                  size="small"
                  sx={{ 
                    m: 0.5,
                    backgroundColor: '#1976d2',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#1565c0'
                    }
                  }}
                />
            ))
          )}
        </Paper>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setShowKeywordDialog(true)}
          size="small"
          sx={{ mt: 1 }}
        >
          {buttonText}
        </Button>
      </Grid>

      {/* Suggested Keywords Column */}
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" gutterBottom>
          Suggested Qualifications
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            minHeight: 120,
            p: 2,
            border: '2px dashed #ccc',
            backgroundColor: '#e3f2fd',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            alignItems: 'flex-start'
          }}
        >
          {suggestedKeywords.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No suggestions available. Add custom qualifications.
            </Typography>
          ) : (
            suggestedKeywords
              .filter(keyword => !value.includes(keyword.keyword))
              .map((keyword, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 1.5,
                    py: 0.5,
                    m: 0.5,
                    border: '1px solid #1976d2',
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    color: '#1976d2',
                    fontSize: '0.75rem',
                    cursor: 'grab',
                    userSelect: 'none',
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                      borderColor: '#1565c0'
                    }
                  }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, keyword.keyword)}
                  onClick={() => handleAddKeyword(keyword)}
                >
                  {keyword.keyword}
                </Box>
              ))
          )}
        </Paper>
      </Grid>

      {/* Custom Qualification Dialog */}
      <Dialog 
        open={showKeywordDialog} 
        onClose={() => setShowKeywordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Add Custom Requirement
          <IconButton
            onClick={() => setShowKeywordDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Custom Requirement"
            value={customQualification}
            onChange={(e) => setCustomQualification(e.target.value)}
            multiline
            rows={3}
            placeholder="Enter custom requirement..."
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowKeywordDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddCustom}
            variant="contained"
            disabled={!customQualification.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default RequiredQualificationsField; 