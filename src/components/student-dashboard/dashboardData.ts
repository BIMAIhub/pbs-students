import { 
  LiveSession, 
  CapstoneStage, 
  ReviewedTask, 
  CourseContentModule,
  EnrolledCourseItem,
  DownloadableAsset,
  FeeReceiptItem,
  StudentProfileData,
  MentorshipEvaluation
} from './types';

export const STUDENT_PROFILE_DEFAULT: StudentProfileData = {
  studentId: 'PBS-STU-2026-8492',
  rollNumber: 'PBS/2026/BIM-084',
  fullName: 'Pravin Yadav',
  email: 'pravin.yadav@pbs.com',
  phone: '+91 8208918726',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  dateOfBirth: '1999-06-18',
  gender: 'Male',
  address: 'Hinjawadi Phase 1, Near Infotech Park',
  city: 'Pune, Maharashtra',
  country: 'India',
  educationDegree: 'B.Tech in Civil Engineering (Honors in AEC Computation)',
  collegeUniversity: 'College of Engineering Pune (COEP)',
  graduationYear: '2022',
  experienceLevel: '3+ Years AEC & BIM Coordination',
  currentCompanyRole: 'Junior BIM Coordinator / Architectural Modeler',
  targetCareerRole: 'Senior BIM Coordinator / Digital Delivery Lead',
  targetLocations: ['Dubai / UAE', 'Riyadh / Saudi Arabia (NEOM / Al Ula)', 'United Kingdom', 'Pune / Bangalore'],
  expectedSalary: '₹14.5 - ₹18.0 LPA / AED 18,000 - 22,000 pm',
  portfolioUrl: 'https://pravinyadav-bim.portfolio.site',
  linkedinUrl: 'https://linkedin.com/in/pravin-yadav-bim',
  githubUrl: 'https://github.com/pravin-bim-dev',
  behanceUrl: 'https://behance.net/pravinyadavbim',
  bio: 'Passionate BIM Engineer and Computational AEC specialist with expertise in ISO 19650 workflows, parametric Revit modeling, Navisworks clash coordination, and Dynamo automation. Dedicated to streamlining multidisciplinary design coordination for large-scale infrastructure and high-rise commercial towers.',
  skillsProficiency: [
    { skillName: 'Autodesk Revit (Architecture & MEP)', proficiency: 98, category: 'Authoring' },
    { skillName: 'Navisworks Manage & Clash Detective', proficiency: 95, category: 'Coordination' },
    { skillName: 'Dynamo Visual Scripting & Python', proficiency: 92, category: 'Computational BIM' },
    { skillName: 'ISO 19650 BEP & CDE Information Management', proficiency: 96, category: 'Information Management' },
    { skillName: 'AutoCAD & Detailed Drafting', proficiency: 90, category: 'Drafting' },
    { skillName: 'ETABS Structural Analysis & FEA Link', proficiency: 85, category: 'Engineering' },
    { skillName: '4D TimeLiner & 5D Quantification QTO', proficiency: 94, category: 'VDC' },
    { skillName: 'BIM 360 / Autodesk Construction Cloud (ACC)', proficiency: 93, category: 'CDE Platform' }
  ],
  preferences: {
    whatsappReminders: true,
    emailDigest: true,
    calendarSync: true,
    timezone: 'Asia/Kolkata (IST +5:30)',
    language: 'English'
  }
};

export const ENROLLED_COURSES_DATA: EnrolledCourseItem[] = [
  {
    id: 'enr-c1',
    courseId: 'c1',
    courseTitle: 'Autodesk Revit MEP Masterclass (LOD 300 to LOD 500)',
    category: 'Revit',
    level: 'Advanced Masterclass',
    badge: 'Cohort Primary Track',
    batchMode: 'Offline Weekend (Sat-Sun, 4 hrs/day)',
    batchSchedule: 'Saturdays & Sundays (06:00 PM - 09:30 PM IST)',
    progressPercent: 0,
    completedModules: 0,
    totalModules: 10,
    enrolledDate: 'Sept 01, 2026',
    status: 'Active',
    instructor: 'Pravin Yadav (15+ Yrs Industry Exp)',
    totalFee: 14999,
    paidAmount: 7500,
    pendingBalance: 7499,
    certificateEarned: false,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981'
  },
  {
    id: 'enr-c2',
    courseId: 'c2',
    courseTitle: 'Navisworks Manage & Multi-Disciplinary Clash Detection',
    category: 'Navisworks',
    level: 'Professional Specialist',
    badge: 'Cohort Core Track',
    batchMode: 'Online Interactive Live',
    batchSchedule: 'Tuesday & Thursday (07:30 PM - 09:30 PM IST)',
    progressPercent: 0,
    completedModules: 0,
    totalModules: 6,
    enrolledDate: 'Sept 01, 2026',
    status: 'Active',
    instructor: 'Coordination Specialist Team',
    totalFee: 11999,
    paidAmount: 11999,
    pendingBalance: 0,
    certificateEarned: false,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
    accentColor: '#0ea5e9'
  },
  {
    id: 'enr-c3',
    courseId: 'c3',
    courseTitle: 'Computational BIM with Dynamo Visual Scripting & Python',
    category: 'Dynamo',
    level: 'Specialization Track',
    badge: 'Cohort Specialization',
    batchMode: 'Online Interactive Evening',
    batchSchedule: 'Monday & Wednesday (08:00 PM - 10:00 PM IST)',
    progressPercent: 0,
    completedModules: 0,
    totalModules: 8,
    enrolledDate: 'Sept 01, 2026',
    status: 'Active',
    instructor: 'Computational Design Lead',
    totalFee: 13999,
    paidAmount: 13999,
    pendingBalance: 0,
    certificateEarned: false,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    accentColor: '#8b5cf6'
  }
];

export const FEE_RECEIPTS_DATA: FeeReceiptItem[] = [
  {
    receiptId: 'PBS-REC-849201',
    invoiceNumber: 'INV/PBS/2026-27/0491',
    courseId: 'c1',
    courseTitle: 'Autodesk Revit MEP Masterclass',
    amount: 7500,
    paymentMethod: 'GPay / UPI (Axis Bank)',
    transactionId: 'TXN-UPI-910283419082',
    date: 'Aug 10, 2026',
    paymentType: 'Installment #1',
    status: 'Paid',
    taxGst: 1144,
    downloadUrl: '#'
  },
  {
    receiptId: 'PBS-REC-502911',
    invoiceNumber: 'INV/PBS/2026-27/0218',
    courseId: 'c2',
    courseTitle: 'Navisworks Manage & Multi-Disciplinary Clash Detection',
    amount: 11999,
    paymentMethod: 'Credit Card (HDFC Visa Platinum)',
    transactionId: 'TXN-CC-882039124401',
    date: 'May 14, 2026',
    paymentType: 'Full Payment',
    status: 'Paid',
    taxGst: 1830,
    downloadUrl: '#'
  },
  {
    receiptId: 'PBS-REC-610944',
    invoiceNumber: 'INV/PBS/2026-27/0342',
    courseId: 'c3',
    courseTitle: 'Computational BIM with Dynamo Visual Scripting & Python',
    amount: 13999,
    paymentMethod: 'NetBanking (ICICI Corporate)',
    transactionId: 'TXN-NB-773829105520',
    date: 'July 01, 2026',
    paymentType: 'Full Payment',
    status: 'Paid',
    taxGst: 2135,
    downloadUrl: '#'
  }
];

export const DOWNLOADABLE_ASSETS_DATA: DownloadableAsset[] = [
  {
    id: 'as-01',
    title: 'PBS Master Project Template 2026 (Architecture + Structural + MEP)',
    category: 'BIM Models & Datasets',
    fileFormat: '.rte / .rvt',
    fileSize: '68.4 MB',
    version: 'v2026.2',
    downloadCount: 1420,
    description: 'Complete pre-configured multidisciplinary Revit project template with standard ISO 19650 view templates, text styles, dimension styles, and browser organization.',
    badge: 'Core Template'
  },
  {
    id: 'as-02',
    title: 'Mixed-Use Commercial Tower Capstone Federated Model',
    category: 'BIM Models & Datasets',
    fileFormat: '.rvt / .nwd',
    fileSize: '142.8 MB',
    version: 'LOD 350',
    downloadCount: 890,
    description: 'Full 45-storey mixed-use building federated dataset including Arch core, structural post-tensioned slabs, MEP plant rooms, and underground basement parking.',
    badge: 'Capstone Asset'
  },
  {
    id: 'as-03',
    title: 'PBS Parametric MEP Component Library (HVAC Diffusers, AHU, VAV, Chillers)',
    category: 'PBS Family Library (.rfa)',
    fileFormat: '.rfa (ZIP Pack of 35 Families)',
    fileSize: '84.2 MB',
    version: 'v4.1',
    downloadCount: 2310,
    description: 'Fully parametric MEP equipment families with automated connector sizing, CFM airflow formulas, pressure drop parameters, and 2D clearance zones.',
    badge: 'Proprietary Library'
  },
  {
    id: 'as-04',
    title: 'High-Precision Parametric Doors & Curtain Wall Panels Pack',
    category: 'PBS Family Library (.rfa)',
    fileFormat: '.rfa (ZIP Pack of 24 Families)',
    fileSize: '45.6 MB',
    version: 'v3.0',
    downloadCount: 1980,
    description: 'Adaptive parametric curtain panels, double-leaf fire-rated doors with nested ironmongery parameters, and louvers.',
    badge: 'Architecture Pack'
  },
  {
    id: 'as-05',
    title: 'Dynamo Automation Suite (Sheet Creation, Room Renumbering & Clash Matrix)',
    category: 'Dynamo Scripts (.dyn)',
    fileFormat: '.dyn + Python Nodes',
    fileSize: '12.4 MB',
    version: 'Dynamo 2.18 / Revit 2024-2026',
    downloadCount: 3120,
    description: 'Production-ready visual scripts to generate 100+ sheets in 10 seconds, auto-calculate room area occupancy, and export clash matrices directly to Excel.',
    badge: 'Top Automation'
  },
  {
    id: 'as-06',
    title: 'Excel-Revit Parameter Two-Way Bi-Directional Synchronizer Script',
    category: 'Dynamo Scripts (.dyn)',
    fileFormat: '.dyn',
    fileSize: '4.8 MB',
    version: 'Dynamo 2.19',
    downloadCount: 1640,
    description: 'Automates door schedules, COBie equipment tagging, and finishes mapping by writing Excel spreadsheets directly back to Revit models.',
    badge: 'BIM Management'
  },
  {
    id: 'as-07',
    title: 'Official ISO 19650 Pre & Post-Contract BIM Execution Plan (BEP) Template',
    category: 'ISO 19650 Templates',
    fileFormat: '.docx / .pdf',
    fileSize: '8.5 MB',
    version: 'ISO 19650-1/2:2018',
    downloadCount: 4500,
    description: 'Complete editable BEP template with TIDP, MIDP tables, Model Progression Matrix (MPM), RACI matrices, CDE folder nomenclature, and security protocols.',
    badge: 'Industry Standard'
  },
  {
    id: 'as-08',
    title: 'Employer Information Requirements (EIR) & Level of Development (LOD) Handbook',
    category: 'ISO 19650 Templates',
    fileFormat: '.pdf',
    fileSize: '16.2 MB',
    version: 'PBS Guide 2026',
    downloadCount: 3890,
    description: 'Comprehensive 120-page reference handbook detailing LOD 100 through LOD 500 requirements for all building disciplines.',
    badge: 'Comprehensive E-Book'
  },
  {
    id: 'as-09',
    title: 'Pragmatic BIM Master Handbook: Complete 50-Lecture Study Notes & Cheatsheets',
    category: 'Lecture Notes & Books',
    fileFormat: '.pdf',
    fileSize: '54.0 MB',
    version: 'Cohort 2026 Edition',
    downloadCount: 2900,
    description: 'Consolidated notes covering all 50 live modules, keyboard shortcuts, troubleshooting guides, formulas, and mock interview questions with model answers.',
    badge: 'Full Study Guide'
  },
  {
    id: 'as-10',
    title: 'Navisworks Manage Clash Matrix & Clearance Standards Cheat Sheet',
    category: 'Lecture Notes & Books',
    fileFormat: '.pdf / .xlsx',
    fileSize: '3.2 MB',
    version: 'v2.4',
    downloadCount: 2750,
    description: 'Quick-reference matrix of standard AEC clash tolerance clearances (e.g. Ducts vs Cable Trays 50mm, Pipes vs Structure 25mm, Door Swing clearances).',
    badge: 'Cheat Sheet'
  },
  {
    id: 'as-11',
    title: 'Official PBS Verified BIM Professional Certificate (Pravin Yadav)',
    category: 'Certificates & Invoices',
    fileFormat: '.pdf (High-Res Print)',
    fileSize: '1.8 MB',
    version: 'Issued Aug 2026',
    downloadCount: 12,
    description: 'Cryptographically signed Certificate of Completion with verifiable QR code, registration ID PBS-CERT-849201, and honors distinction.',
    badge: 'Official Credential'
  },
  {
    id: 'as-12',
    title: 'Consolidated Tax Invoices & Payment Ledger Receipts (FY 2026-27)',
    category: 'Certificates & Invoices',
    fileFormat: '.pdf (Official GST Receipt)',
    fileSize: '2.1 MB',
    version: 'GST Registered',
    downloadCount: 8,
    description: 'Official tax invoices with GSTIN details, student enrollment confirmation, and installment breakdown.',
    badge: 'Financial Record'
  }
];

export const MENTORSHIP_EVALUATIONS_DATA: MentorshipEvaluation[] = [
  {
    id: 'eval-01',
    evaluatorName: 'Pravin Yadav',
    evaluatorRole: 'BIM Director & Lead Instructor (15+ Yrs Exp)',
    date: 'Aug 18, 2026',
    stageName: 'Capstone Stage 04: LOD 350 Technical Coordination Review',
    overallRating: 5,
    technicalSkillsScore: 99,
    coordinationScore: 98,
    standardsComplianceScore: 100,
    communicationScore: 96,
    strengths: [
      'Exceptional parametric family logic and zero-tolerance clash resolution in Navisworks Manage.',
      'Flawless compound wall construction layer build-ups with correct ISO 19650 material descriptions.',
      'Demonstrated high mastery of Dynamo visual scripts to automate drawing sheet generation and QTO schedules.'
    ],
    areasOfImprovement: [
      'In high-pressure HVAC plant rooms, consider grouping flexible duct connections with tagged clearance zones for easier site installation.'
    ],
    detailedRemarks: 'Pravin Yadav has shown outstanding engineering and modeling rigor. His federated model is among the cleanest and most coordinated submissions in this cohort. He is fully qualified for Senior BIM Coordinator roles across international Tier-1 consultancies.',
    placementRecommendation: 'Highly Recommended'
  },
  {
    id: 'eval-02',
    evaluatorName: 'Ar. Rajesh Verma',
    evaluatorRole: 'Senior BIM Manager (Foster+Partners Alum)',
    date: 'Jul 24, 2026',
    stageName: '1-on-1 Mock Technical Interview & Portfolio Defense',
    overallRating: 5,
    technicalSkillsScore: 97,
    coordinationScore: 96,
    standardsComplianceScore: 98,
    communicationScore: 95,
    strengths: [
      'Clear, articulate explanation of EIR, BEP, and Common Data Environment (CDE) workflows.',
      'Sound understanding of structural load transfer mechanisms and MEP clearance rules in complex basement layouts.',
      'Professional presentation demeanor and visually compelling portfolio layout.'
    ],
    areasOfImprovement: [
      'Practice explaining COBie spreadsheet integration and Digital Twin sensor mapping in under 2 minutes for C-suite executive interviews.'
    ],
    detailedRemarks: 'Cleared the mock interview with distinction (Top 1% candidate). Recommended for international openings in UAE, Saudi Arabia, and UK AEC hubs.',
    placementRecommendation: 'Highly Recommended'
  },
  {
    id: 'eval-03',
    evaluatorName: 'Sunil Rao',
    evaluatorRole: 'VDC & 4D Phase Scheduling Specialist',
    date: 'Jun 15, 2026',
    stageName: 'Capstone Stage 05: 4D TimeLiner & 5D Cost Planning Evaluation',
    overallRating: 5,
    technicalSkillsScore: 98,
    coordinationScore: 97,
    standardsComplianceScore: 96,
    communicationScore: 98,
    strengths: [
      'Synchronized MS Project schedule with 3D model sets smoothly without broken task links.',
      'Accurate quantity takeoff formulas reflecting actual contractor wastage margins.'
    ],
    areasOfImprovement: [
      'Include site crane radius zones and temporary scaffolding in future 4D logistics simulations.'
    ],
    detailedRemarks: 'Impressed by the visual fidelity of the 4D TimeLiner construction sequence. The animation demonstrates clear understanding of high-rise crane logistics and concrete curing cycles.',
    placementRecommendation: 'Highly Recommended'
  }
];

export const LIVE_SESSIONS_DATA: LiveSession[] = [
  {
    id: 'ls-01',
    dateMonth: 'NOV',
    dateDay: '05',
    title: 'Kick Off Session',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Pravin Yadav & BIM Lead Faculty',
    notes: 'Welcome to the BIM Professional Program. Overview of ISO 19650 workflow, software prerequisites, and cohort roadmap.'
  },
  {
    id: 'ls-02',
    dateMonth: 'NOV',
    dateDay: '09',
    title: 'BIM Basics',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Pravin Yadav',
    notes: 'Introduction to Building Information Modeling methodology vs traditional CAD. Understanding parametric elements and LOD levels.'
  },
  {
    id: 'ls-03',
    dateMonth: 'NOV',
    dateDay: '12',
    title: 'Setting up project',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Tech Specialist',
    notes: 'Project templates (.rte), project units, shared coordinates, survey point, project base point, and true north setup.'
  },
  {
    id: 'ls-04',
    dateMonth: 'NOV',
    dateDay: '16',
    title: 'System Families',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Architectural BIM Lead',
    notes: 'Basic walls, compound wall layers, curtain walls, floors, roofs, and ceiling assemblies in Autodesk Revit.'
  },
  {
    id: 'ls-05',
    dateMonth: 'NOV',
    dateDay: '19',
    title: 'Editing System Families',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Architectural BIM Lead',
    notes: 'Compound structure layers, material assignments, wrapping at inserts/ends, structural functions, and sweeps/reveals.'
  },
  {
    id: 'ls-06',
    dateMonth: 'NOV',
    dateDay: '23',
    title: 'Creating Families',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Senior BIM Modeler',
    notes: 'Parametric family editor fundamentals: reference planes, reference lines, dimensions, type vs instance parameters.'
  },
  {
    id: 'ls-07',
    dateMonth: 'NOV',
    dateDay: '26',
    title: 'Hosted and Nested Families',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Senior BIM Modeler',
    notes: 'Wall-hosted, floor-hosted, and face-based components. Nesting parameters and shared family definitions.'
  },
  {
    id: 'ls-08',
    dateMonth: 'NOV',
    dateDay: '30',
    title: 'Mass Modelling in Revit',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Computational Design Specialist',
    notes: 'Conceptual massing environment, form manipulation, mass floors, and building maker tools (curtain system by face, roof by face).'
  },
  {
    id: 'ls-09',
    dateMonth: 'DEC',
    dateDay: '03',
    title: 'Remedial Session 1',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: false,
    isCompleted: true,
    instructor: 'Teaching Assistant',
    notes: 'Open doubt clearing on parametric family constraints, formula errors, and family template selection.'
  },
  {
    id: 'ls-10',
    dateMonth: 'DEC',
    dateDay: '07',
    title: 'Adaptive component',
    timeRange: '07:30 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Computational Design Lead',
    notes: 'Adaptive points, pattern-based curtain panels, divided surfaces, and complex parametric skin geometries.'
  },
  {
    id: 'ls-11',
    dateMonth: 'DEC',
    dateDay: '10',
    title: 'Introduction to Structural Modelling',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Structural BIM Specialist',
    notes: 'Structural grids, levels, structural column placement, framing plans, and structural analytical model alignment.'
  },
  {
    id: 'ls-12',
    dateMonth: 'DEC',
    dateDay: '14',
    title: 'Structural Modelling - Foundations & Trusses',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Structural BIM Specialist',
    notes: 'Isolated footings, strip footings, raft foundations, retaining walls, standard trusses, and steel connections.'
  },
  {
    id: 'ls-13',
    dateMonth: 'DEC',
    dateDay: '17',
    title: 'Structural Modelling and Documentation',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Structural BIM Specialist',
    notes: 'Rebar placement, rebar shape codes, area and path reinforcement, bar bending schedules (BBS), and structural section detailing.'
  },
  {
    id: 'ls-14',
    dateMonth: 'DEC',
    dateDay: '21',
    title: 'Remedial Session 02',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: false,
    isCompleted: true,
    instructor: 'Teaching Assistant',
    notes: 'Structural model QA/QC check and review of assignment submissions.'
  },
  {
    id: 'ls-15',
    dateMonth: 'JAN',
    dateDay: '04',
    title: 'Views and Graphics',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Documentation Lead',
    notes: 'Visibility/Graphics overrides (VG/VV), view templates, view filters, graphic display options, and phase filters.'
  },
  {
    id: 'ls-16',
    dateMonth: 'JAN',
    dateDay: '07',
    title: 'Documentation and Presentation',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Documentation Lead',
    notes: 'Sheet creation, titleblock parameters, revision tracking, sheet indexing, and export to PDF/DWG conforming to ISO 19650.'
  },
  {
    id: 'ls-17',
    dateMonth: 'JAN',
    dateDay: '11',
    title: 'Annotation, details and Keynotes',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Senior Project Architect',
    notes: 'Keynoting database (.txt), callout views, detail components, repeating details, break lines, and specification notes.'
  },
  {
    id: 'ls-18',
    dateMonth: 'JAN',
    dateDay: '14',
    title: 'Scheduling, Collaborative process',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Project Manager',
    notes: 'Quantity takeoffs (QTO), material takeoff schedules, calculated parameters, conditional formatting, and multi-category schedules.'
  },
  {
    id: 'ls-19',
    dateMonth: 'JAN',
    dateDay: '15',
    title: 'Remedial Session 2',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: false,
    isCompleted: true,
    instructor: 'Teaching Assistant',
    notes: 'QTO formulas, combined parameters, and custom schedule filtering troubleshooting.'
  },
  {
    id: 'ls-20',
    dateMonth: 'JAN',
    dateDay: '18',
    title: 'Introduction to Analytical Modelling',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Structural Analysis Lead',
    notes: 'Revit analytical model generation, load definitions (Dead, Live, Wind, Seismic), boundary conditions, and export to analysis tools.'
  },
  {
    id: 'ls-21',
    dateMonth: 'JAN',
    dateDay: '21',
    title: 'ETABS',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Structural Analysis Lead',
    notes: 'ETABS interface, import from Revit IFC, defining material properties, frame sections, and slab diaphragm assignments.'
  },
  {
    id: 'ls-22',
    dateMonth: 'JAN',
    dateDay: '25',
    title: 'ETABS 2',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Structural Analysis Lead',
    notes: 'Modal analysis, response spectrum analysis, drift checks, member design (shear, bending), and export results back to Revit.'
  },
  {
    id: 'ls-23',
    dateMonth: 'JAN',
    dateDay: '28',
    title: 'Career Session',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: false,
    isCompleted: true,
    instructor: 'Talent Acquisition & Career Coach',
    notes: 'International AEC job market dynamics in Middle East, UK, US, Singapore, and India. Resume audit and portfolio structuring.'
  },
  {
    id: 'ls-24',
    dateMonth: 'FEB',
    dateDay: '01',
    title: 'BIM Strategy',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Director',
    notes: 'ISO 19650 Part 1 & Part 2 framework, Information Management roles (Appointing Party, Lead Appointed Party), and EIR definitions.'
  },
  {
    id: 'ls-25',
    dateMonth: 'FEB',
    dateDay: '04',
    title: 'Building Execution Plan',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Director',
    notes: 'Writing pre-contract and post-contract BIM Execution Plans (BEP), Model Progression Matrix (MPM), and MIDP / TIDP planning.'
  },
  {
    id: 'ls-26',
    dateMonth: 'FEB',
    dateDay: '08',
    title: 'BIM Enabled Design & Construction',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Manager',
    notes: 'Integrated Project Delivery (IPD), Virtual Design and Construction (VDC), and site progress monitoring with 3D laser scans.'
  },
  {
    id: 'ls-27',
    dateMonth: 'FEB',
    dateDay: '15',
    title: 'Common Data Environment',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'CDE Specialist',
    notes: 'Autodesk Construction Cloud (ACC) / BIM 360 Docs, Work in Progress (WIP), Shared, Published, and Archived folder workflows.'
  },
  {
    id: 'ls-28',
    dateMonth: 'FEB',
    dateDay: '18',
    title: 'Introduction to Collaboration',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Coordinator',
    notes: 'Worksharing fundamentals: Worksets, Central Model, Local copies, Sync with Central, Relinquishing permissions, and model cleanup.'
  },
  {
    id: 'ls-29',
    dateMonth: 'FEB',
    dateDay: '19',
    title: 'Interference Check, Linking and Collaboration',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Coordinator',
    notes: 'Revit internal Interference Check, Copy/Monitor levels & grids, linking Architecture, Structure, and MEP models with origin-to-origin.'
  },
  {
    id: 'ls-30',
    dateMonth: 'FEB',
    dateDay: '25',
    title: 'Navisworks - Introduction',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Coordination Specialist',
    notes: 'Navisworks Manage UI, NWC/NWD/NWF file structures, Selection Tree, Sets, Viewpoints, Sectioning, and Measuring tools.'
  },
  {
    id: 'ls-31',
    dateMonth: 'FEB',
    dateDay: '26',
    title: 'Clash Detection in Navisworks',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Coordination Specialist',
    notes: 'Clash Detective setup, Hard vs Clearance clashes, tolerance settings, group clashes, status management, and BCF report exports.'
  },
  {
    id: 'ls-32',
    dateMonth: 'MAR',
    dateDay: '04',
    title: '4D Phase Planning',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Project Controls Lead',
    notes: 'Navisworks TimeLiner, importing MS Project / Primavera P6 schedules (.csv / .xml), linking task IDs to model search sets, and 4D video rendering.'
  },
  {
    id: 'ls-33',
    dateMonth: 'MAR',
    dateDay: '05',
    title: '5D Cost Planning',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Cost Estimator',
    notes: 'Navisworks Quantification, item and resource catalogs, takeoff mapping, unit rates integration, and 5D cash flow forecasting.'
  },
  {
    id: 'ls-34',
    dateMonth: 'MAR',
    dateDay: '11',
    title: 'Dynamo Session 01',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Computational BIM Lead',
    notes: 'Dynamo visual programming UI, node wiring, data types (strings, numbers, points, vectors), lists and list management levels.'
  },
  {
    id: 'ls-35',
    dateMonth: 'MAR',
    dateDay: '12',
    title: 'Dynamo Session 02',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Computational BIM Lead',
    notes: 'Automating sheet creation, bulk parameter updates, renumbering rooms/doors, and Excel read/write automation with Dynamo.'
  },
  {
    id: 'ls-36',
    dateMonth: 'MAR',
    dateDay: '18',
    title: 'Dynamo Session 03',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Computational BIM Lead',
    notes: 'Geometry generation: point grids, curve attractors, surface paneling, and sending adaptive components to Revit via Dynamo.'
  },
  {
    id: 'ls-37',
    dateMonth: 'MAR',
    dateDay: '19',
    title: 'Dynamo Session 04',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Computational BIM Lead',
    notes: 'Python Scripting in Dynamo: Revit API references, transaction management, FilteredElementCollector, and custom nodes.'
  },
  {
    id: 'ls-38',
    dateMonth: 'MAR',
    dateDay: '25',
    title: 'Dynamo Session 05',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Computational BIM Lead',
    notes: 'Dynamo Player setup for project team deployment and automated clash matrix generation.'
  },
  {
    id: 'ls-39',
    dateMonth: 'MAR',
    dateDay: '29',
    title: 'Project lifecycle',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Senior Project Director',
    notes: 'End-to-end lifecycle integration: RIBA Stages 0 to 7, Asset Information Model (AIM), and COBie spreadsheet standard.'
  },
  {
    id: 'ls-40',
    dateMonth: 'APR',
    dateDay: '01',
    title: 'Capstone : Capstone Kickoff - Stage 00, 01',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Capstone Lead Mentor',
    notes: 'Client brief release for the 45-storey Commercial Mixed-Use Tower Capstone project. Project team allocation and role assignments.'
  },
  {
    id: 'ls-41',
    dateMonth: 'APR',
    dateDay: '08',
    title: 'Capstone : Meet your BIM Manager - Stage 02',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Manager Mentor',
    notes: 'Concept design review, massing validation, solar orientation analysis, and core layout approval.'
  },
  {
    id: 'ls-42',
    dateMonth: 'APR',
    dateDay: '15',
    title: 'Capstone : Meet your BIM Manager - Stage 03',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Manager Mentor',
    notes: 'Detailed design development submission review: LOD 300 architectural envelope and structural framing coordination.'
  },
  {
    id: 'ls-43',
    dateMonth: 'APR',
    dateDay: '19',
    title: 'Capstone : Remedial Session',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: false,
    isCompleted: true,
    instructor: 'Teaching Assistant',
    notes: 'One-on-one technical assistance on MEP plant room clearances and structural transfer beam coordination.'
  },
  {
    id: 'ls-44',
    dateMonth: 'APR',
    dateDay: '29',
    title: 'Capstone : Meet your BIM Manager - Stage 04',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Manager Mentor',
    notes: 'LOD 350/400 Technical Design submission check: fabrication details, clash clearance sign-off, and QTO schedules.'
  },
  {
    id: 'ls-45',
    dateMonth: 'MAY',
    dateDay: '10',
    title: 'Capstone : Doubt Clearing Session',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: false,
    isCompleted: true,
    instructor: 'Teaching Assistant',
    notes: 'Finalizing 4D construction schedule sequencing and Navisworks animation exports.'
  },
  {
    id: 'ls-46',
    dateMonth: 'MAY',
    dateDay: '13',
    title: 'Capstone : Meet your BIM Manager - Stage 05,06,07',
    timeRange: '07:30 PM - 09:45 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'BIM Manager Mentor',
    notes: 'As-built model handover, COBie asset data validation, operations and maintenance manual compilation.'
  },
  {
    id: 'ls-47',
    dateMonth: 'MAY',
    dateDay: '27',
    title: 'Building an Effective Portfolio',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'Industry Mentor',
    notes: 'Crafting high-impact BIM case studies, visual storytelling, rendering quality, and publishing on Behance / LinkedIn.'
  },
  {
    id: 'ls-48',
    dateMonth: 'MAY',
    dateDay: '30',
    title: 'Portfolio Feedback Session',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: false,
    isCompleted: true,
    instructor: 'Industry Mentor',
    notes: 'Individual 1-on-1 portfolio review and feedback on presentation layouts.'
  },
  {
    id: 'ls-49',
    dateMonth: 'JUN',
    dateDay: '02',
    title: 'BIM Interview Preparation and Interview Etiquettes',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: true,
    isCompleted: true,
    instructor: 'HR & Technical Lead',
    notes: 'Mock technical BIM interview rounds, answering scenario-based clash coordination questions, and salary negotiation.'
  },
  {
    id: 'ls-50',
    dateMonth: 'JUN',
    dateDay: '11',
    title: 'GRADUATION',
    timeRange: '08:00 PM - 10:15 PM (IST)',
    isCompulsory: false,
    isCompleted: true,
    instructor: 'PBS Academic Board & Pravin Yadav',
    notes: 'Cohort Graduation Ceremony, Certificate Conferral, Top Performer Awards, and Alumni Network induction.'
  }
];

export const CAPSTONE_STAGES_DATA: CapstoneStage[] = [
  {
    stageNumber: '00',
    stageIndex: 0,
    title: 'Strategic Definition',
    goal: 'Goal : Identify the client requirements & ISO 19650 BEP foundation',
    status: 'In Progress',
    grade: 'Pending',
    dueDate: '20 Sept',
    isCritical: false,
    mentorName: 'Pravin Yadav (BIM Director)',
    mentorFeedback: 'Stage 00 is now active. Complete the client EIR requirement document and initial BEP questionnaire.',
    mentorScore: 0,
    submissionFiles: []
  },
  {
    stageNumber: '01',
    stageIndex: 1,
    title: 'Preparation and Briefing',
    goal: 'Goal : Assemble the project team; define the structure, team roles, and responsibilities.',
    status: 'Upcoming',
    grade: 'Pending',
    dueDate: '28 Sept',
    isCritical: false,
    mentorName: 'Ar. Rajesh Verma',
    mentorFeedback: 'Unlocks after Stage 00 approval.',
    submissionFiles: []
  },
  {
    stageNumber: '02',
    stageIndex: 2,
    title: 'Concept Design',
    goal: 'Goal : Start working on conceptual massing and architectural spatial layout',
    status: 'Upcoming',
    grade: 'Pending',
    dueDate: '10 Oct',
    isCritical: true,
    mentorName: 'Lead Architect',
    mentorFeedback: 'Unlocks after Stage 01 approval.',
    submissionFiles: []
  },
  {
    stageNumber: '03',
    stageIndex: 3,
    title: 'Design Development',
    goal: 'Goal : Develop detailed LOD 300 multidisciplinary drawings',
    status: 'Upcoming',
    grade: 'Pending',
    dueDate: '24 Oct',
    isCritical: true,
    mentorName: 'Pravin Yadav (BIM Director)',
    mentorFeedback: 'Unlocks after Stage 02 approval.',
    submissionFiles: []
  },
  {
    stageNumber: '04',
    stageIndex: 4,
    title: 'Technical Design',
    goal: 'Goal : Create construction drawings, Navisworks clash coordination & technical details',
    status: 'Upcoming',
    grade: 'Pending',
    dueDate: '08 Nov',
    isCritical: true,
    mentorName: 'Senior BIM Coordinator',
    mentorFeedback: 'Unlocks after Stage 03 approval.',
    submissionFiles: []
  },
  {
    stageNumber: '05',
    stageIndex: 5,
    title: 'Manufacturing and Construction',
    goal: 'Goal : 4D TimeLiner animation and 5D quantity takeoff handover',
    status: 'Upcoming',
    grade: 'Pending',
    dueDate: '22 Nov',
    isCritical: false,
    mentorName: 'VDC Construction Lead',
    mentorFeedback: 'Unlocks after Stage 04 approval.',
    submissionFiles: []
  },
  {
    stageNumber: '06',
    stageIndex: 6,
    title: 'Handover & Close Out',
    goal: 'Goal : As-Built Asset Information Model (AIM) and COBie spreadsheet tags',
    status: 'Upcoming',
    grade: 'Pending',
    dueDate: '06 Dec',
    isCritical: false,
    mentorName: 'Pravin Yadav (BIM Director)',
    mentorFeedback: 'Unlocks after Stage 05 approval.',
    submissionFiles: []
  },
  {
    stageNumber: '07',
    stageIndex: 7,
    title: 'In Use & Digital Twin',
    goal: 'Goal : Facility management and CAFM IoT sensor linkages',
    status: 'Upcoming',
    grade: 'Pending',
    dueDate: '18 Dec',
    isCritical: false,
    mentorName: 'Facility Management Lead',
    mentorFeedback: 'Unlocks after Stage 06 approval.',
    submissionFiles: []
  },
  {
    stageNumber: '08',
    stageIndex: 8,
    title: 'Placements & Portfolio Defense',
    goal: 'Goal : Portfolio review by Angel industry mentors and MNC interview rounds',
    status: 'Upcoming',
    grade: 'Pending',
    dueDate: '30 Dec',
    isCritical: false,
    mentorName: 'Angel Industry Mentor',
    mentorFeedback: 'Final Capstone review and MNC referrals.',
    submissionFiles: []
  }
];

export const REVIEWED_TASKS_DATA: ReviewedTask[] = [
  {
    id: 'M2_A4',
    taskName: 'How to Submit : M2_LV1 Setting up Project',
    performance: 'good',
    creditsScored: 12,
    creditsTotal: 15,
    skillsTest: 'Modelling',
    referenceModule: 'M2',
    reviewedDate: 'Nov 14, 2026',
    mentorNotes: 'Project units set up accurately in millimeters. Remember to pin the project base point and survey marker after coordinate alignment.'
  },
  {
    id: 'M2_A9',
    taskName: 'How to submit : M2_LV2 System Families',
    performance: 'good',
    creditsScored: 16,
    creditsTotal: 20,
    skillsTest: 'Modelling',
    referenceModule: 'M2',
    reviewedDate: 'Nov 18, 2026',
    mentorNotes: 'Good wall layer build-ups with thermal insulation. Ensure function layer priorities match standard structural standards.'
  },
  {
    id: 'M2_A13',
    taskName: 'How to submit : M2_LV3 Editing System Families',
    performance: 'excellent',
    creditsScored: 15,
    creditsTotal: 15,
    skillsTest: 'Modelling',
    referenceModule: 'M2',
    reviewedDate: 'Nov 22, 2026',
    mentorNotes: 'Flawless compound wall modification with integral base sweeps and exterior brick reveals.'
  },
  {
    id: 'M2_A19',
    taskName: 'How to submit : M2_LV4 Creating Families',
    performance: 'good',
    creditsScored: 20,
    creditsTotal: 25,
    skillsTest: 'Modelling',
    referenceModule: 'M2',
    reviewedDate: 'Nov 27, 2026',
    mentorNotes: 'Parametric casement window flexes without breaking geometry. Nice inclusion of glass material parameter.'
  },
  {
    id: 'M2_A24',
    taskName: 'How to submit : M2_LV5 Hosted and Nested Families',
    performance: 'good',
    creditsScored: 12,
    creditsTotal: 15,
    skillsTest: 'Modelling',
    referenceModule: 'M2',
    reviewedDate: 'Dec 01, 2026',
    mentorNotes: 'Nested handle hardware correctly mapped with shared parameters to appear in door schedule.'
  },
  {
    id: 'M2_A29',
    taskName: 'How to submit : M2_LV6 Mass Modelling in Revit',
    performance: 'excellent',
    creditsScored: 20,
    creditsTotal: 20,
    skillsTest: 'Modelling',
    referenceModule: 'M2',
    reviewedDate: 'Dec 05, 2026',
    mentorNotes: 'Complex twisted tower conceptual mass successfully converted to floor plates and glazed curtain wall grids.'
  },
  {
    id: 'M3_0_A4',
    taskName: 'How to Submit : M3_0_LV1 Adaptive Components',
    performance: 'excellent',
    creditsScored: 30,
    creditsTotal: 30,
    skillsTest: 'Modelling Design Analysis',
    referenceModule: 'M3_0',
    reviewedDate: 'Dec 10, 2026',
    mentorNotes: '4-point adaptive diagrid shading panel flexes perfectly along organic double-curved surface.'
  },
  {
    id: 'M3_2_A3',
    taskName: 'How to Submit : M3_2_LV1 Introduction to Structural Modelling',
    performance: 'good',
    creditsScored: 24,
    creditsTotal: 30,
    skillsTest: 'Modelling Design Analysis',
    referenceModule: 'M3_2',
    reviewedDate: 'Dec 15, 2026',
    mentorNotes: 'Structural concrete columns properly bounded at level cutoffs. Check beam end offsets at edge grids.'
  },
  {
    id: 'M3_2_A6',
    taskName: 'How to Submit : M3_2_LV2 Structural Modelling - Foundation and Truss',
    performance: 'excellent',
    creditsScored: 18,
    creditsTotal: 20,
    skillsTest: 'Modelling Design Analysis',
    referenceModule: 'M3_2',
    reviewedDate: 'Dec 19, 2026',
    mentorNotes: 'High-precision Pratt steel truss model with customized gusset plate connections and pile cap foundations.'
  },
  {
    id: 'M3_2_A9',
    taskName: 'How to Submit : M3_2_LV3 Structural Modelling and Documentation',
    performance: 'excellent',
    creditsScored: 20,
    creditsTotal: 20,
    skillsTest: 'Modelling Design Analysis',
    referenceModule: 'M3_2',
    reviewedDate: 'Dec 24, 2026',
    mentorNotes: 'Full 3D rebar cage detailing for retaining wall and columns with automated bar bending schedule.'
  },
  {
    id: 'M4_A4',
    taskName: 'How to Submit : M4_LV1 Views and Graphics',
    performance: 'excellent',
    creditsScored: 45,
    creditsTotal: 45,
    skillsTest: 'Presentation Coordination & Collaboration',
    referenceModule: 'M4',
    reviewedDate: 'Jan 08, 2027',
    mentorNotes: 'Mastery over View Templates and custom color-coded MEP flow filters shown.'
  },
  {
    id: 'M4_A8',
    taskName: 'How to Submit : M4_LV2 Documentation and Presentation',
    performance: 'good',
    creditsScored: 36,
    creditsTotal: 45,
    skillsTest: 'Presentation Coordination & Collaboration',
    referenceModule: 'M4',
    reviewedDate: 'Jan 12, 2027',
    mentorNotes: 'Sheet layouts look clean. Ensure north arrow and graphic scale bar appear on all plan sheets.'
  },
  {
    id: 'M4_A11',
    taskName: 'How to Submit : M4_LV3 Annotation, details and Keynotes',
    performance: 'excellent',
    creditsScored: 30,
    creditsTotal: 30,
    skillsTest: 'Presentation Coordination & Collaboration',
    referenceModule: 'M4',
    reviewedDate: 'Jan 16, 2027',
    mentorNotes: 'Keynote external text file linked seamlessly; all detail components referenced to master specification.'
  },
  {
    id: 'M4_A14',
    taskName: 'How to Submit : M4_LV4 Scheduling, Collaborative process',
    performance: 'excellent',
    creditsScored: 18,
    creditsTotal: 20,
    skillsTest: 'Presentation Coordination & Collaboration',
    referenceModule: 'M4',
    reviewedDate: 'Jan 19, 2027',
    mentorNotes: 'Multi-category schedule with calculated total cost and carbon footprint parameters.'
  },
  {
    id: 'M5_2_A5',
    taskName: 'How to Submit : Introduction to Analytical Modelling',
    performance: 'excellent',
    creditsScored: 60,
    creditsTotal: 60,
    skillsTest: 'Modelling Design Analysis',
    referenceModule: 'M5_2',
    reviewedDate: 'Jan 23, 2027',
    mentorNotes: 'Analytical node connectivity 100% verified with zero orphaned analytical lines.'
  },
  {
    id: 'M5_2_A10',
    taskName: 'How to Submit : ETABS',
    performance: 'excellent',
    creditsScored: 60,
    creditsTotal: 60,
    skillsTest: 'Modelling Design Analysis',
    referenceModule: 'M5_2',
    reviewedDate: 'Jan 28, 2027',
    mentorNotes: 'Dead and Live load patterns applied in accordance with IS 875 / Eurocode 1.'
  },
  {
    id: 'M5_2_A15',
    taskName: 'How to Submit : ETABS 2',
    performance: 'excellent',
    creditsScored: 60,
    creditsTotal: 60,
    skillsTest: 'Modelling Design Analysis',
    referenceModule: 'M5_2',
    reviewedDate: 'Feb 03, 2027',
    mentorNotes: 'Seismic drift and modal mass participation ratio (>90%) successfully validated in ETABS.'
  },
  {
    id: 'M7_A2',
    taskName: 'How to Submit : M7_LV1 Introduction to Collaboration',
    performance: 'good',
    creditsScored: 8,
    creditsTotal: 10,
    skillsTest: 'Interoperability Modelling',
    referenceModule: 'M7',
    reviewedDate: 'Feb 21, 2027',
    mentorNotes: 'Workset division between Arch, Core, and Shell executed properly on central model.'
  },
  {
    id: 'M7_A4',
    taskName: 'How to Submit : M7_LV2 Interference Check, Linking and Collaboration',
    performance: 'excellent',
    creditsScored: 10,
    creditsTotal: 10,
    skillsTest: 'Interoperability Modelling',
    referenceModule: 'M7',
    reviewedDate: 'Feb 23, 2027',
    mentorNotes: 'Copy/monitor coordination with linked structural grids and levels completed with zero monitor warnings.'
  },
  {
    id: 'M8_A3',
    taskName: 'How to Submit : M8_LV1 4D Phase Planning',
    performance: 'excellent',
    creditsScored: 40,
    creditsTotal: 40,
    skillsTest: 'Collaboration Project Lifecycle BIM',
    referenceModule: 'M8',
    reviewedDate: 'Mar 08, 2027',
    mentorNotes: 'Flawless Navisworks TimeLiner 4D animation with synchronized Gantt chart progress bar and material color highlights.'
  }
];

export const COURSE_MODULES_DATA: CourseContentModule[] = [
  {
    id: 'mod-0',
    moduleCode: 'Module 0',
    title: 'Introduction to Oneistox & PBS BIM Course',
    isCompleted: false,
    lessonsCount: 4,
    duration: '45 mins',
    subSections: [
      {
        sectionTitle: 'Course Onboarding & Community',
        duration: '45 min',
        lessons: [
          { id: 'l0-1', title: 'Welcome to the BIM Professional Cohort', duration: '10 min', isCompleted: false, type: 'video' },
          { id: 'l0-2', title: 'Software Installation & Licensing Guide (Revit, Navisworks)', duration: '15 min', isCompleted: false, type: 'reading' },
          { id: 'l0-3', title: 'Cohort Rules & Academic Code of Conduct', duration: '10 min', isCompleted: false, type: 'reading' },
          { id: 'l0-4', title: 'Slack & Community Channel Onboarding', duration: '10 min', isCompleted: false, type: 'video' }
        ]
      }
    ]
  },
  {
    id: 'mod-1',
    moduleCode: 'Module 01',
    title: 'Introduction to BIM & ISO 19650 Standards',
    isCompleted: false,
    lessonsCount: 6,
    duration: '2 hrs 15 mins',
    subSections: [
      {
        sectionTitle: 'BIM Fundamentals & Principles',
        duration: '1 hr 15 min',
        lessons: [
          { id: 'l1-1', title: 'What is BIM? Evolution from CAD to Digital Twins', duration: '25 min', isCompleted: false, type: 'video' },
          { id: 'l1-2', title: 'Dimensions of BIM (3D, 4D, 5D, 6D, 7D)', duration: '20 min', isCompleted: false, type: 'video' },
          { id: 'l1-3', title: 'Levels of Development: LOD 100 to LOD 500', duration: '30 min', isCompleted: false, type: 'video' }
        ]
      },
      {
        sectionTitle: 'Information Management ISO 19650',
        duration: '1 hr',
        lessons: [
          { id: 'l1-4', title: 'ISO 19650 Part 1 & Part 2 Framework', duration: '30 min', isCompleted: false, type: 'video' },
          { id: 'l1-5', title: 'Common Data Environment (CDE) Workflow', duration: '20 min', isCompleted: false, type: 'video' },
          { id: 'l1-6', title: 'Module 1 Knowledge Check Quiz', duration: '10 min', isCompleted: false, type: 'quiz' }
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    moduleCode: 'Module 02',
    title: 'Basics of Revit Modelling',
    isCompleted: false,
    lessonsCount: 9,
    duration: '3 hrs 40 mins',
    subSections: [
      {
        sectionTitle: 'Introduction to Revit',
        duration: '55 min',
        lessons: [
          { id: 'l2-1', title: 'Why start with Revit?', duration: '12 min', isCompleted: false, type: 'video' },
          { id: 'l2-2', title: 'Revit Version and Builds', duration: '8 min', isCompleted: false, type: 'video' },
          { id: 'l2-3', title: 'Opening and Saving Files', duration: '15 min', isCompleted: false, type: 'video' },
          { id: 'l2-4', title: 'Revit UI, Ribbon & Properties Palette', duration: '20 min', isCompleted: false, type: 'video' }
        ]
      },
      {
        sectionTitle: 'Project Setup & Grids',
        duration: '1 hr 10 min',
        lessons: [
          { id: 'l2-5', title: 'Setting Up Project Units & Coordinates', duration: '20 min', isCompleted: false, type: 'video' },
          { id: 'l2-6', title: 'Creating Levels and Grids with Extents', duration: '25 min', isCompleted: false, type: 'video' },
          { id: 'l2-7', title: 'Basic System Families: Compound Walls & Layers', duration: '25 min', isCompleted: false, type: 'video' }
        ]
      },
      {
        sectionTitle: 'Floors, Roofs & Ceilings',
        duration: '1 hr 35 min',
        lessons: [
          { id: 'l2-8', title: 'Slab Edge Profiles & Slope Arrows', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l2-9', title: 'Curtain Walls: Grids, Mullions & Panels', duration: '40 min', isCompleted: false, type: 'video' }
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    moduleCode: 'Module 03',
    title: 'Structural BIM & Analytical Frameworks',
    isCompleted: false,
    lessonsCount: 8,
    duration: '3 hrs 10 mins',
    subSections: [
      {
        sectionTitle: 'Structural Concrete & Steel Elements',
        duration: '1 hr 45 min',
        lessons: [
          { id: 'l3-1', title: 'Structural Columns & Framing Systems', duration: '30 min', isCompleted: false, type: 'video' },
          { id: 'l3-2', title: 'Foundations: Isolated, Strip & Mat Footings', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l3-3', title: '3D Rebar Detailing & Shape Codes', duration: '40 min', isCompleted: false, type: 'video' }
        ]
      },
      {
        sectionTitle: 'ETABS Integration',
        duration: '1 hr 25 min',
        lessons: [
          { id: 'l3-4', title: 'Exporting Analytical Model to ETABS', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l3-5', title: 'Finite Element Analysis (FEA) Verification', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l3-6', title: 'Module 3 Practical Assignment Submission', duration: '15 min', isCompleted: false, type: 'assignment' }
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    moduleCode: 'Module 04',
    title: 'Documentation, Schedules & Keynoting',
    isCompleted: false,
    lessonsCount: 7,
    duration: '2 hrs 50 mins',
    subSections: [
      {
        sectionTitle: 'Views, Sheets & Revisions',
        duration: '1 hr 20 min',
        lessons: [
          { id: 'l4-1', title: 'View Templates & Graphic Overrides', duration: '25 min', isCompleted: false, type: 'video' },
          { id: 'l4-2', title: 'Sheet Layouts, Titleblocks & Revision Clouds', duration: '30 min', isCompleted: false, type: 'video' },
          { id: 'l4-3', title: 'Keynotes & Master Specifications Linking', duration: '25 min', isCompleted: false, type: 'video' }
        ]
      },
      {
        sectionTitle: 'Quantity Takeoffs & QTO',
        duration: '1 hr 30 min',
        lessons: [
          { id: 'l4-4', title: 'Multi-category Schedules & Calculated Formulas', duration: '45 min', isCompleted: false, type: 'video' },
          { id: 'l4-5', title: 'Exporting Schedules to Excel & PowerBI', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l4-6', title: 'Module 4 Documentation Test', duration: '10 min', isCompleted: false, type: 'quiz' }
        ]
      }
    ]
  },
  {
    id: 'mod-5',
    moduleCode: 'Module 05',
    title: 'MEP BIM Coordination (HVAC, Electrical, Plumbing)',
    isCompleted: false,
    lessonsCount: 8,
    duration: '3 hrs 20 mins',
    subSections: [
      {
        sectionTitle: 'HVAC Duct & Pipe Routing',
        duration: '1 hr 50 min',
        lessons: [
          { id: 'l5-1', title: 'Mechanical Equipment & Air Terminal Placement', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l5-2', title: 'Ductwork Sizing & Pressure Drop Calculations', duration: '40 min', isCompleted: false, type: 'video' },
          { id: 'l5-3', title: 'Hydronic Piping & Plumbing Drainage Slopes', duration: '35 min', isCompleted: false, type: 'video' }
        ]
      },
      {
        sectionTitle: 'Electrical Cable Trays & Fire Protection',
        duration: '1 hr 30 min',
        lessons: [
          { id: 'l5-4', title: 'Cable Tray Routing & Clearance Rules', duration: '30 min', isCompleted: false, type: 'video' },
          { id: 'l5-5', title: 'Fire Sprinkler Grid & Head Distribution', duration: '30 min', isCompleted: false, type: 'video' },
          { id: 'l5-6', title: 'MEP Model Quality Audit', duration: '30 min', isCompleted: false, type: 'assignment' }
        ]
      }
    ]
  },
  {
    id: 'mod-6',
    moduleCode: 'Module 06',
    title: 'Navisworks Clash Coordination & BCF Workflows',
    isCompleted: false,
    lessonsCount: 6,
    duration: '2 hrs 45 mins',
    subSections: [
      {
        sectionTitle: 'Federated Model Assembly',
        duration: '1 hr 15 min',
        lessons: [
          { id: 'l6-1', title: 'Assembling Arch, Struct & MEP in Navisworks Manage', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l6-2', title: 'Selection Sets, Search Sets & Rules', duration: '40 min', isCompleted: false, type: 'video' }
        ]
      },
      {
        sectionTitle: 'Clash Detective & Matrix',
        duration: '1 hr 30 min',
        lessons: [
          { id: 'l6-3', title: 'Clash Detective Rules & Tolerance Management', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l6-4', title: 'Clash Resolution Meetings & BCF Export to Revit', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l6-5', title: 'Navisworks Coordination Report Submission', duration: '20 min', isCompleted: false, type: 'assignment' }
        ]
      }
    ]
  },
  {
    id: 'mod-7',
    moduleCode: 'Module 07',
    title: '4D Construction Scheduling & 5D Cost Estimation',
    isCompleted: false,
    lessonsCount: 6,
    duration: '2 hrs 30 mins',
    subSections: [
      {
        sectionTitle: 'TimeLiner & Schedule Synchronization',
        duration: '1 hr 20 min',
        lessons: [
          { id: 'l7-1', title: 'Navisworks TimeLiner with Primavera P6 / MS Project', duration: '40 min', isCompleted: false, type: 'video' },
          { id: 'l7-2', title: 'Constructability Simulation & Exporting 4D Videos', duration: '40 min', isCompleted: false, type: 'video' }
        ]
      },
      {
        sectionTitle: '5D Cost Planning',
        duration: '1 hr 10 min',
        lessons: [
          { id: 'l7-3', title: 'Quantification Workbook & Model Takeoff Mapping', duration: '40 min', isCompleted: false, type: 'video' },
          { id: 'l7-4', title: 'Cash Flow Curves & Variance Tracking', duration: '30 min', isCompleted: false, type: 'video' }
        ]
      }
    ]
  },
  {
    id: 'mod-8',
    moduleCode: 'Module 08',
    title: 'Dynamo Visual Programming & Python BIM Automation',
    isCompleted: false,
    lessonsCount: 7,
    duration: '3 hrs 15 mins',
    subSections: [
      {
        sectionTitle: 'Dynamo Visual Scripting',
        duration: '1 hr 45 min',
        lessons: [
          { id: 'l8-1', title: 'Dynamo UI, Node Logic & List Level Management', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l8-2', title: 'Automated Sheet Generation & View Placement', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l8-3', title: 'Excel Read/Write Two-Way Synchronization', duration: '35 min', isCompleted: false, type: 'video' }
        ]
      },
      {
        sectionTitle: 'Python in Revit API',
        duration: '1 hr 30 min',
        lessons: [
          { id: 'l8-4', title: 'Revit API Hierarchy & Transaction Management', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l8-5', title: 'FilteredElementCollector & Bulk Parameter Extraction', duration: '40 min', isCompleted: false, type: 'video' },
          { id: 'l8-6', title: 'Dynamo Player Custom Tool Deployment', duration: '15 min', isCompleted: false, type: 'assignment' }
        ]
      }
    ]
  },
  {
    id: 'mod-9',
    moduleCode: 'Module 09',
    title: 'Capstone Tower Final Integration & Career Placement',
    isCompleted: false,
    lessonsCount: 5,
    duration: '2 hrs 10 mins',
    subSections: [
      {
        sectionTitle: 'Capstone Handover & Close Out',
        duration: '1 hr 10 min',
        lessons: [
          { id: 'l9-1', title: 'As-Built Asset Information Model (AIM) Compilation', duration: '35 min', isCompleted: false, type: 'video' },
          { id: 'l9-2', title: 'COBie Spreadsheets Quality Audit', duration: '35 min', isCompleted: false, type: 'video' }
        ]
      },
      {
        sectionTitle: 'Portfolio Review & International Placement',
        duration: '1 hr',
        lessons: [
          { id: 'l9-3', title: 'AEC International Portfolio Case Studies Breakdown', duration: '30 min', isCompleted: false, type: 'video' },
          { id: 'l9-4', title: 'Live Technical BIM Interview Simulation & Q&A', duration: '30 min', isCompleted: false, type: 'video' }
        ]
      }
    ]
  }
];
