# Strato HRIS Platform

A modern HRIS (Human Resource Information System) platform with integrated ATS (Applicant Tracking System) component that seamlessly connects with existing payroll systems.

## Features

### 🎯 Applicant Tracking System (ATS)
- **Kanban-style Pipeline**: Visual drag-and-drop candidate management
- **Customizable Stages**: Configure hiring stages (Applied, Screening, Interview, Offer, Hired)
- **Candidate Management**: Track candidates through the hiring process
- **Automated Workflows**: Rule-based automation for candidate progression
- **Email Notifications**: Automated communication at each stage

### 📋 Job Requisitions
- **Create & Manage**: Comprehensive job requisition forms
- **Department Integration**: Link requisitions to organizational structure
- **Budget Management**: Track hiring budgets and approvals
- **Status Tracking**: Monitor requisition approval process

### 👥 Candidate Management
- **Centralized Database**: All candidate information in one place
- **Search & Filter**: Advanced candidate search capabilities
- **Resume Parsing**: Automated data extraction from resumes
- **Communication Tools**: Integrated email and messaging

### 🔄 Bashima Integration
- **Seamless Data Flow**: Automatic transfer of candidate data to payroll
- **Single Onboarding**: Eliminate duplicate data entry
- **API Integration**: Real-time synchronization with existing payroll system
- **Employee Creation**: Automatic employee record creation upon hire

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material Icons

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd strato-hris
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/
│   └── Layout/
│       └── Layout.tsx          # Main layout with navigation
├── pages/
│   ├── Dashboard.tsx           # Main dashboard
│   ├── ATS.tsx                # Applicant Tracking System
│   ├── JobRequisitions.tsx    # Job requisition management
│   └── Candidates.tsx         # Candidate management
├── App.tsx                    # Main app component
└── index.tsx                  # Entry point
```

## Core Components

### ATS Pipeline
The ATS component features a Kanban-style interface with:
- **Visual Pipeline**: Drag-and-drop candidate management
- **Stage Configuration**: Customizable hiring stages
- **Candidate Cards**: Quick view of candidate information
- **Status Updates**: Easy progression through hiring stages
- **Detail Dialogs**: Comprehensive candidate information

### Job Requisitions
Manage job openings with:
- **Requisition Forms**: Complete job posting creation
- **Department Integration**: Organizational structure alignment
- **Budget Tracking**: Financial oversight
- **Status Management**: Approval workflow tracking

### Candidate Management
Comprehensive candidate tracking including:
- **Search & Filter**: Advanced candidate discovery
- **Detailed Profiles**: Complete candidate information
- **Communication Tools**: Integrated messaging
- **Status Tracking**: Progress monitoring

## Integration with Bashima

The platform is designed to integrate seamlessly with your existing Bashima payroll system:

### Data Flow
1. **Candidate Application**: Data captured in ATS
2. **Hiring Process**: Progress tracked through pipeline
3. **Offer Acceptance**: Trigger employee creation
4. **Payroll Integration**: Automatic data transfer to Bashima
5. **Employee Onboarding**: Seamless transition to payroll

### API Integration
- **Real-time Sync**: Live data synchronization
- **Field Mapping**: Automatic field mapping between systems
- **Error Handling**: Robust error management
- **Data Validation**: Ensures data integrity

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Code Style

The project uses TypeScript for type safety and follows React best practices:
- Functional components with hooks
- TypeScript interfaces for type safety
- Material-UI for consistent design
- Responsive design principles

## Future Enhancements

### Planned Features
- **Advanced Analytics**: Recruitment metrics and reporting
- **Interview Scheduling**: Calendar integration
- **Document Management**: Resume and document storage
- **Background Checks**: Integration with screening services
- **Mobile App**: React Native mobile application

### Integration Roadmap
- **Calendar Systems**: Google Calendar, Outlook integration
- **Job Boards**: LinkedIn, Indeed API integration
- **Background Services**: Automated screening
- **Communication Platforms**: Slack, Teams integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software for internal use.

## Support

For technical support or questions about the Strato HRIS platform, please contact the development team. 