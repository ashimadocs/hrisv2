
Read Me strato HRIS Module: Core Functions & Feature Requirements 

Background:  let's start a project creating a working mock up / prototype for an HRIS platform that interconnects with my exiting payroll platform that I will refer to as Bashima.   Certain fields that are created on the HRIS will be passed on to the existing Bashima payroll platform so that the admins will no longer have to onboard twice. Regarding the HRIS projects lets refer to it now as Strato  starto is a modern HRIS module extends the existing payroll system by adding talent acquisition and performance management capabilities. For example, an integrated ATS (Applicant Tracking System) automates candidate sourcing and tracking through hiring stages, while automatically flowing new-hire data into payroll for onboarding. Best practices emphasize seamless integration: an ATS should not operate in isolation but sync with HR and payroll systems to avoid duplicate data entry and speed up hiring-to-onboarding transitions. Automation is key – routine tasks (forms, approvals, notifications) should run on "auto-pilot" based on triggers (time, events, conditional rules) to free HR for strategic work. 

Applicant Tracking System (ATS) 
Customizable Hiring Pipeline: Design the hiring process as ordered "blocks" or stages (e.g. Screening, Interviews, Offer) in a Kanban-style pipeline that users can drag-and-drop to reorder. Each block has its own workflow type (manual approval, auto-advance, event-triggered, or scheduled) so the company can tailor steps (e.g. insert additional interview rounds or approvals) without hardcoding one fixed flow. Users should define triggers and actions for each transition (e.g. on "Screened→Interview" send notification, update status) to support automated workflows with email notifications, record updates, task assignments, etc. For example, you might configure: (a) Manual Approval – a manager must click "Approve" to advance a candidate; (b) Auto-Advance – system moves candidate forward automatically if criteria are met; (c) Event-Triggered – an external event (new resume parsed, test completed) kicks off the move; (d) Scheduled – move on a set date or after a time delay. This rule-driven automation (sometimes called "auto-pilot workflows") reduces repetitive work and ensures compliance (e.g. auto-reminder for approvals before offer). In short, the ATS must be fully configurable to the organization's process, automatically sending status emails at each stage.

Job Requisition & Posting: Allow HR or hiring managers to create a job requisition form. Required fields should include requester name, location, department, position (new or replacement), budget code/justification, and expected start date. Requisitions can use pre-built templates or be created anew. Once approved, users should be able to publish the job internally (intranet/career site) and externally via integrated job boards (e.g. LinkedIn, Indeed via API). The system should facilitate rich, structured job postings (title, salary range, competencies, responsibilities) and help optimize descriptions (e.g. keyword/bias checking). All postings can specify which application form to use (custom questions, quick-apply, mobile-apply) and which candidate pipeline stages to activate for that role.

Applicant Screening & Management: Intake all applications into a centralized database. The ATS must parse resumes and CVs (extracting education, work history, skills, contact info) to build searchable candidate profiles. Automated parsing saves hours of manual data entry and ensures consistency. Recruiters can define screening rules (keywords, minimum experience, certifications) so the system can auto-filter or rank applicants. For example, the ATS may automatically reject or flag candidates not meeting hard criteria (e.g. "minimum 5 years experience").   Shortlisting: Use AI or rule-based scoring to rank remaining candidates by relevance (overall fit, skills match, education). The system should present a "shortlist" of top candidates, allowing recruiters to skip low-fit resumes. Recruiters can add custom pre-screen questions or skill tests to refine screening. Throughout, the system stores notes, test results, and interview feedback on each candidate's record.

Interview Coordination: Provide tools for managing interviews. Allow the creation of structured interview kits or scorecards: the hiring team collaboratively defines questions and scoring categories (e.g. technical skill, communication, cultural fit). Integrate with calendar systems (Google/Outlook) to send interview invites and track acceptances. After each interview, interviewers fill out a simple scorecard in the ATS to rate candidates. Optionally support video interviewing (with recorded meetings) and even automated transcripts or summaries. All feedback should be captured in the candidate profile. The ATS should aggregate scores and comments, and display a consolidated view so the hiring team can compare candidates objectively.

**Interview Kit Logic & Functionality:**

An interview kit is a structured template that standardizes the interview process for specific roles. Each interview kit consists of three main components:

1. **Instructions** - Guidelines and context for the interview team about what to tell candidates during the interview process
2. **Questions** - Pre-defined questions to ask candidates, with different question types (Text, Range, Multiple Choice, etc.)
3. **Scorecard** - Skills and traits to evaluate during the interview, divided into:
   - **Skills** - Technical competencies and hard skills relevant to the role
   - **Traits** - Soft skills and personality characteristics

**Interview Kit Management Features:**
- **Create Interview Kit** - Build new interview kits with custom instructions, questions, and scorecards
- **Save as Draft** - Save incomplete interview kits for later editing
- **Edit Interview Kit** - Modify existing interview kits
- **Active/Inactive Status** - Toggle interview kits between active and inactive states
- **Job Requisition Integration** - Every job requisition includes a dropdown to select from active interview kits

**Interview Kit Fields:**
- **Name** (required) - Descriptive name for the interview kit
- **Instructions** - Rich text editor for interview guidelines and context
- **Questions** - List of interview questions with:
  - Question text
  - Question type (Text, Range, Multiple Choice, etc.)
  - Range values (for range questions)
  - Delete functionality
- **Scorecards**:
  - **Skills Section** - List of technical skills to evaluate
  - **Traits Section** - List of soft skills/traits to evaluate
  - Add/remove skills and traits functionality

**Question Types:**
- **Text** - Open-ended text responses
- **Range** - Numerical range responses (e.g., 0-15 years experience)
- **Multiple Choice** - Pre-defined answer options
- **Rating** - Numerical rating scales

Offer Letters & Onboarding: Once a candidate is selected, the ATS should streamline the offer and onboarding process. Provide customizable offer letter templates (auto-populating candidate name, role, salary, start date) and require manager approval. Include electronic signature capability so candidates can sign offers digitally. The system should automatically generate any required employment contracts, NDAs, or benefits forms (e.g. data privacy agreement), also with e-signature workflows. Maintain a checklist of pre-employment requirements (IDs, tax forms, certifications) that the candidate can upload or complete. When a candidate accepts the offer, the system marks them "Ready for Hire." At this point, the ATS must automatically feed the new employee's data into the payroll/HR system. Integration should be seamless: employee details (name, address, tax IDs, bank info, job title, salary) transfer via API, triggering creation of an HR record and payroll account. This digital onboarding creates the employee ID, generates payroll records, and logs any initial benefits enrollment – all without duplicate data entry.

Automated Communications: At every stage, the ATS should send timely, personalized notifications. For example, send an email when an application is received, when the status changes (e.g. "Your interview is scheduled"), and when an offer is extended or declined. Automated messaging keeps candidates informed and improves experience. Internally, the system alerts recruiters or managers when their action is needed (e.g. interview slots to fill, approvals pending). In practice, ATS vendors allow configuring email templates per stage; the system then sends these automatically as candidates move through the pipeline.

Reporting & Analytics: Provide built-in reports and dashboards on the recruiting pipeline. Metrics should include number of applicants per job, time-in-stage, time-to-fill, source of applicants (job board, referral, etc.), and conversion rates (e.g. how many candidates progress from screening to interview). Use analytics to highlight bottlenecks (e.g. too many candidates stuck in "Under Review") and measure KPIs (time-to-hire, cost-per-hire, acceptance rate). Recruitment analytics help HR continuously improve the process. Dashboards should also allow drilling into candidate pipelines by department or location. By having real-time visibility into the hiring funnel, teams can make data-driven decisions and identify where process improvements are needed. 

Integration with Payroll & HR Systems
Seamless integration is a cornerstone of the HRIS strategy. As noted above, candidate and new-hire data should automatically flow from the ATS into the core payroll/HR platform. This avoids redundant entry and errors. For example, once an offer is accepted, the system should create the employee record with all relevant information (tax, bank, salary) so payroll is ready for the new hire's first paycheck. Likewise, any onboarding tasks (assigning a company email, ID badge, system access) can be triggered automatically. Automating these steps reduces administrative work and improves accuracy.  In sum, the ATS must be built to "sync seamlessly" with the existing payroll/HR system, enabling true end-to-end talent acquisition. (This integration also ensures that payroll runs on time; studies show employees are far more likely to stay when pay is correct and prompt).  ill upload all fields  on a PDF file that I will be requiring when onboarding each employee. Under the column 201 those are the fields that will be passed on to the API of Bashima - existing payrolll platform.
