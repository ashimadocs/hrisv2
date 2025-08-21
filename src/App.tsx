import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import ATS from './pages/ATS';
import JobRequisitions from './pages/JobRequisitions';
import Candidates from './pages/Candidates';
import InterviewCoordination from './pages/InterviewCoordination';
import OfferOnboarding from './pages/OfferOnboarding';
import AutomatedCommunications from './pages/AutomatedCommunications';
import ReportingAnalytics from './pages/ReportingAnalytics';
import Screening from './pages/Screening';
import AutoPilotWorkflows from './pages/AutoPilotWorkflows';
// PERFORM module imports
import EvaluationPipeline from './pages/EvaluationPipeline';
import Goals from './pages/Goals';
import Competencies from './pages/Competencies';
import Compensation from './pages/Compensation';
import Feedback from './pages/Feedback';
import Reviews from './pages/Reviews';
import Engagement from './pages/Engagement';

function App() {
  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ats" element={<ATS />} />
            <Route path="/job-requisitions" element={<JobRequisitions />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/interview-coordination" element={<InterviewCoordination />} />
            <Route path="/offer-onboarding" element={<OfferOnboarding />} />
            <Route path="/automated-communications" element={<AutomatedCommunications />} />
            <Route path="/auto-pilot-workflows" element={<AutoPilotWorkflows />} />
            <Route path="/reporting-analytics" element={<ReportingAnalytics />} />
            <Route path="/screening" element={<Screening />} />
            {/* PERFORM module routes */}
            <Route path="/evaluation-pipeline" element={<EvaluationPipeline />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/competencies" element={<Competencies />} />
            <Route path="/compensation" element={<Compensation />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/engagement" element={<Engagement />} />
          </Routes>
        </Box>
      </Container>
    </Layout>
  );
}

export default App; 