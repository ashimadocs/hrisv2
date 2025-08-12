export interface KeywordSuggestion {
  keyword: string;
  suggestedText: string;
}

export interface KeywordCategory {
  category: string;
  keywords: KeywordSuggestion[];
}

export const keywordReference: KeywordCategory[] = [
  {
    category: "Software Development",
    keywords: [
      {
        keyword: "HTML/CSS/React/Angular",
        suggestedText: "Proficient in modern frontend technologies including HTML5, CSS3, React.js, and Angular frameworks. Experience with responsive design and component-based architecture."
      },
      {
        keyword: "Java, Python, JavaScript",
        suggestedText: "Strong programming skills in Java, Python, and JavaScript. Experience with object-oriented programming, data structures, and algorithms."
      },
      {
        keyword: "Git, GitHub",
        suggestedText: "Expert in version control using Git and GitHub. Experience with branching strategies, code reviews, and collaborative development workflows."
      },
      {
        keyword: "SQL, MongoDB",
        suggestedText: "Database expertise including SQL for relational databases and MongoDB for NoSQL solutions. Experience with data modeling and optimization."
      },
      {
        keyword: "Object-Oriented Design",
        suggestedText: "Deep understanding of object-oriented design principles, design patterns, and clean code practices. Experience with SOLID principles."
      },
      {
        keyword: "REST, SOAP",
        suggestedText: "Experience designing and implementing RESTful APIs and SOAP web services. Knowledge of API documentation and integration patterns."
      },
      {
        keyword: "Software Testing / Jest, JUnit",
        suggestedText: "Comprehensive testing experience including unit testing with Jest and JUnit, integration testing, and test-driven development practices."
      },
      {
        keyword: "Agile / Scrum",
        suggestedText: "Experience working in Agile environments using Scrum methodology. Skilled in sprint planning, daily standups, and retrospective meetings."
      },
      {
        keyword: "DevOps / CI/CD",
        suggestedText: "DevOps expertise including continuous integration and continuous deployment pipelines. Experience with Docker, Kubernetes, and cloud platforms."
      },
      {
        keyword: "AWS",
        suggestedText: "Amazon Web Services expertise including EC2, S3, Lambda, and other cloud services. Experience with cloud architecture and deployment."
      },
      {
        keyword: "Azure",
        suggestedText: "Microsoft Azure platform experience including virtual machines, storage solutions, and cloud services. Knowledge of Azure DevOps and monitoring."
      }
    ]
  },
  {
    category: "Marketing",
    keywords: [
      {
        keyword: "SEO / SEM",
        suggestedText: "Search Engine Optimization and Search Engine Marketing expertise. Experience with keyword research, on-page optimization, and paid advertising campaigns."
      },
      {
        keyword: "Mailchimp, Hubspot",
        suggestedText: "Email marketing proficiency using Mailchimp and HubSpot platforms. Experience with email automation, segmentation, and campaign analytics."
      },
      {
        keyword: "Data Analysis and Google Analytics",
        suggestedText: "Marketing analytics expertise using Google Analytics and other data analysis tools. Experience with conversion tracking and performance optimization."
      },
      {
        keyword: "Brand Strategy",
        suggestedText: "Strategic brand development and positioning experience. Skilled in brand identity creation, messaging, and market positioning strategies."
      },
      {
        keyword: "Marketing Automation Tools",
        suggestedText: "Experience with marketing automation platforms for lead nurturing, customer segmentation, and campaign management workflows."
      },
      {
        keyword: "Campaign Management",
        suggestedText: "End-to-end campaign management experience including planning, execution, monitoring, and optimization across multiple channels."
      },
      {
        keyword: "Salesforce",
        suggestedText: "Salesforce CRM expertise including lead management, opportunity tracking, and sales pipeline optimization. Experience with Salesforce Marketing Cloud."
      },
      {
        keyword: "Zoho",
        suggestedText: "Zoho CRM and business application experience including customer relationship management, marketing automation, and analytics."
      }
    ]
  },
  {
    category: "UX Designer",
    keywords: [
      {
        keyword: "Figma, Sketch, Adobe XD",
        suggestedText: "Proficient in design tools including Figma, Sketch, and Adobe XD. Experience with collaborative design workflows and design systems."
      },
      {
        keyword: "Usability Testing",
        suggestedText: "Comprehensive usability testing experience including user research, A/B testing, and user feedback analysis to improve product design."
      },
      {
        keyword: "Information Architecture",
        suggestedText: "Information architecture expertise including site mapping, user flow design, and content organization strategies for optimal user experience."
      },
      {
        keyword: "Design Systems & Components",
        suggestedText: "Experience creating and maintaining design systems with reusable components, style guides, and design documentation."
      },
      {
        keyword: "Accessibility Standards (WCAG)",
        suggestedText: "Expertise in WCAG accessibility standards and inclusive design principles. Experience ensuring digital products are accessible to all users."
      },
      {
        keyword: "Interaction Design",
        suggestedText: "Interaction design expertise including micro-interactions, user interface animations, and intuitive user experience design patterns."
      }
    ]
  },
  {
    category: "Sales",
    keywords: [
      {
        keyword: "Salesforce, HubSpot",
        suggestedText: "CRM expertise using Salesforce and HubSpot platforms. Experience with lead management, opportunity tracking, and sales pipeline optimization."
      },
      {
        keyword: "Cold Calling",
        suggestedText: "Proven cold calling and prospecting skills. Experience with objection handling, qualification techniques, and building rapport with prospects."
      },
      {
        keyword: "Sales Funnel Management",
        suggestedText: "End-to-end sales funnel management experience including lead generation, qualification, nurturing, and conversion optimization."
      },
      {
        keyword: "Negotiation",
        suggestedText: "Strong negotiation skills with experience in complex sales cycles, contract discussions, and value-based selling approaches."
      },
      {
        keyword: "Product Knowledge",
        suggestedText: "Deep product knowledge and ability to articulate value propositions, competitive advantages, and solution benefits to prospects."
      },
      {
        keyword: "Customer Relationship Management",
        suggestedText: "Customer relationship management expertise including account development, customer success, and long-term relationship building."
      },
      {
        keyword: "Closing Deals",
        suggestedText: "Proven track record of closing deals and meeting sales targets. Experience with various closing techniques and overcoming final objections."
      },
      {
        keyword: "B2B/B2C Sales Strategies",
        suggestedText: "Experience in both B2B and B2C sales environments with tailored strategies for different customer segments and sales cycles."
      },
      {
        keyword: "Presentation and Pitching Skills",
        suggestedText: "Excellent presentation and pitching skills with experience delivering compelling sales presentations and product demonstrations."
      }
    ]
  },
  {
    category: "Senior",
    keywords: [
      {
        keyword: "minimum +5 years",
        suggestedText: "Minimum 5+ years of relevant professional experience in the field. Demonstrated progression and growth in roles with increasing responsibility and complexity."
      },
      {
        keyword: "Master's or higher preferred",
        suggestedText: "Master's degree or higher education preferred. Advanced academic background demonstrating specialized knowledge and research capabilities in the relevant field."
      }
    ]
  },
  {
    category: "Junior",
    keywords: [
      {
        keyword: "0-2 years",
        suggestedText: "0-2 years of professional experience in the field. Entry-level position suitable for recent graduates or individuals transitioning into the industry."
      },
      {
        keyword: "Bachelor's degree in a relevant field",
        suggestedText: "Bachelor's degree in a relevant field required. Strong academic foundation with coursework and projects demonstrating knowledge in the subject area."
      }
    ]
  },
  {
    category: "Manager",
    keywords: [
      {
        keyword: "proven leadership experience",
        suggestedText: "Proven leadership experience with demonstrated ability to lead teams, make strategic decisions, and drive organizational success through effective management."
      },
      {
        keyword: "strategic planning",
        suggestedText: "Strategic planning expertise including long-term vision development, goal setting, resource allocation, and execution of organizational strategies."
      },
      {
        keyword: "budget management",
        suggestedText: "Budget management experience including financial planning, cost control, resource allocation, and fiscal responsibility for department or project budgets."
      },
      {
        keyword: "coaching & mentoring",
        suggestedText: "Coaching and mentoring skills with experience developing team members, providing constructive feedback, and fostering professional growth and development."
      },
      {
        keyword: "critical thinking",
        suggestedText: "Strong critical thinking abilities including problem analysis, decision-making, risk assessment, and innovative solution development for complex challenges."
      },
      {
        keyword: "compliance",
        suggestedText: "Compliance expertise including regulatory adherence, policy development, audit preparation, and ensuring organizational adherence to industry standards and regulations."
      }
    ]
  },
  {
    category: "Supervisor",
    keywords: [
      {
        keyword: "supervisory experience",
        suggestedText: "Supervisory experience with demonstrated ability to oversee team operations, delegate tasks, and ensure quality standards are met through effective team management."
      },
      {
        keyword: "staff training",
        suggestedText: "Staff training expertise including onboarding, skill development, performance improvement, and creating effective training programs to enhance team capabilities."
      },
      {
        keyword: "team coordination",
        suggestedText: "Team coordination skills including project management, workflow optimization, cross-functional collaboration, and ensuring seamless team operations and communication."
      }
    ]
  }
];

// Helper function to get keywords by category
export const getKeywordsByCategory = (category: string): KeywordSuggestion[] => {
  const foundCategory = keywordReference.find(cat => 
    cat.category.toLowerCase() === category.toLowerCase()
  );
  return foundCategory ? foundCategory.keywords : [];
};

// Helper function to get all categories
export const getAllCategories = (): string[] => {
  return keywordReference.map(cat => cat.category);
};

// Helper function to search keywords across all categories
export const searchKeywords = (searchTerm: string): KeywordSuggestion[] => {
  const results: KeywordSuggestion[] = [];
  keywordReference.forEach(category => {
    category.keywords.forEach(keyword => {
      if (keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
          keyword.suggestedText.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(keyword);
      }
    });
  });
  return results;
}; 