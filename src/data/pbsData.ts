import { Course, BimProject, Testimonial, BimService, Masterclass, BlogPost, FaqItem } from '../types';

export const COMPANY_INFO = {
  name: 'Pragmatic BIM Solution',
  shortName: 'PBS',
  slogan: 'BIMifying the world bit by bit',
  experienceYears: 15,
  globalTrainingYears: 5,
  studentsTrained: 100,
  countriesCount: 5,
  buildingsModeled: 45,
  drawingsProduced: 400,
  engineersCount: 10,
  phone: '+91 8208918726',
  phoneClean: '918208918726',
  phonePrimary: '+91 8208918726',
  whatsapp: '+91 8208918726',
  email: 'info@pragmaticbim.com',
  emailPrimary: 'info@pragmaticbim.com',
  address: {
    street: 'G-7, G8, Kohinoor Reina, opp. Fakhri Hills, Mayfair Eleganza Phase II',
    city: 'Kondhwa, Pune',
    state: 'Maharashtra',
    pincode: '411048',
    full: 'G-7, G8, Kohinoor Reina, opp. Fakhri Hills, Mayfair Eleganza Phase II, Kondhwa, Pune, Maharashtra 411048'
  },
  socials: {
    whatsapp: 'https://wa.me/918208918726?text=Hi%20Pragmatic%20BIM%20Solution,%20I%20want%20to%20inquire%20about%20BIM%20courses%20and%20services.',
    phone: 'tel:+918208918726',
    email: 'mailto:info@pragmaticbim.com'
  },
  trustQuote: 'No Marketing Other than... Word-Of-Mouth. It’s All About Trust.'
};

export const COURSES_DATA: Course[] = [
  {
    id: 'revit-mep-ar-st',
    title: 'Professional Autodesk Revit Training (AR, ST & MEP)',
    subtitle: 'Master Architectural, Structural, and Mechanical, Electrical & Plumbing BIM Modeling',
    category: 'Revit',
    discipline: 'All',
    duration: '6 Months',
    hours: '200 Hours',
    batchType: 'Live Interactive',
    rating: 4.9,
    reviewsCount: 88,
    originalPrice: 24999,
    discountedPrice: 12499,
    installmentPrice: '₹2,499/month',
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0072C6', // Revit Blue
    description: 'Comprehensive hands-on Revit training covering Architectural layout, Structural detailing, and complex MEP (HVAC, Electrical, Plumbing, Firefighting) systems using real 3D project models.',
    highlights: [
      'Real-world MEP Plant Room & High-Rise Building Models',
      'ISO 19650 BIM Standards & Naming Conventions',
      'Worksharing, Central Files & BIM 360 Collaboration',
      'Parameter Creation, Shared Parameters & Schedule Creation',
      '1:1 Project Mentorship with 15+ Years Experienced BIM Experts'
    ],
    softwareCovered: ['Autodesk Revit 2026', 'Autodesk Construction Cloud', 'Navisworks'],
    upcomingBatch: 'Starts August 20, 2026',
    curriculum: [
      {
        moduleTitle: 'Module 1: Revit Fundamentals & Architectural BIM (AR)',
        lessons: [
          'Revit UI, Grids, Levels & Project Template Setup',
          'Walls, Curtain Walls, Doors, Windows & Custom Families',
          'Floors, Roofs, Stairs, Railings & Architectural Detailing',
          'Room Tagging, Color Schemes & Area Calculations'
        ]
      },
      {
        moduleTitle: 'Module 2: Structural BIM Detailing (ST)',
        lessons: [
          'Structural Columns, Beams, Foundations & Slabs',
          'Rebar Detailing & Structural Connections',
          'Structural Analytical Models & Load Tracking',
          'Coordination with Architectural Base Models'
        ]
      },
      {
        moduleTitle: 'Module 3: MEP BIM Services (HVAC, Electrical, Plumbing)',
        lessons: [
          'HVAC Ductwork, Air Terminals & Chiller Plant Room Modeling',
          'Plumbing Pipework, Drainage Slopes & Sanitary Fixtures',
          'Electrical Cable Trays, Conduit, Panels & Lighting Systems',
          'Fire Protection Sprinkler Systems & Pump House Layouts'
        ]
      },
      {
        moduleTitle: 'Module 4: Documentation, Sheets & Quantity Takeoffs',
        lessons: [
          'Sheet Creation, Title Blocks & Viewports',
          'Automated Schedules, Quantity Takeoffs (BOQ)',
          'Exporting IFC, DWG, PDF & Navisworks NWC Files',
          'Capstone Project: Complete 15-Story Building BIM Submission'
        ]
      }
    ]
  },
  {
    id: 'mep-specialist',
    title: 'Professional BIM Certification for MEP Engineers',
    subtitle: 'Deep-dive into HVAC, Electrical, Plumbing & Plant Room Modeling',
    category: 'Revit',
    discipline: 'MEP',
    duration: '5 Months',
    hours: '150 Hours',
    batchType: 'Live Interactive',
    rating: 4.95,
    reviewsCount: 64,
    originalPrice: 19999,
    discountedPrice: 10499,
    installmentPrice: '₹2,099/month',
    badge: 'Bestseller for Engineers',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0284C7',
    description: 'Designed specifically for Mechanical, Electrical, and Plumbing engineers seeking mastery in MEP 3D BIM modeling, pipe sizing, duct sizing, and plant room clash-free routing.',
    highlights: [
      'HVAC Duct Sizing & Air Balance Schedules',
      'Plumbing Pipe Slope & Pressure Drop Workflows',
      'Cable Tray Routing & Panel Board Circuits',
      'Plant Room 3D Isometric View Generation',
      'Live Project Case Studies from GCC & Europe Projects'
    ],
    softwareCovered: ['Autodesk Revit MEP', 'Navisworks Manage', 'AutoCAD MEP'],
    upcomingBatch: 'Starts August 25, 2026',
    curriculum: [
      {
        moduleTitle: 'Module 1: HVAC Systems & Duct Routing',
        lessons: [
          'Air Handling Units (AHU), Fan Coil Units (FCU) & VAVs',
          'Supply, Return & Exhaust Duct Routing & Pressure Calculation',
          'Insulation, Dampers & Flex Ducts'
        ]
      },
      {
        moduleTitle: 'Module 2: Piping & Hydraulic Systems',
        lessons: [
          'Chilled Water Pipes, Condensate Drainage & Pump Hookups',
          'Domestic Hot & Cold Water Distribution',
          'Fire Sprinkler Hydraulics & Valve Assemblies'
        ]
      },
      {
        moduleTitle: 'Module 3: Electrical Systems & Cable Trays',
        lessons: [
          'Light Fixtures, Switches & Power Receptacles Layout',
          'Cable Trays & Ladder Routing with Clearance Checking',
          'Distribution Boards & Circuit Tagging'
        ]
      }
    ]
  },
  {
    id: 'navisworks-manage',
    title: 'Autodesk Navisworks Manage & Clash Coordination Masterclass',
    subtitle: '4D Construction Simulation, Hard/Soft Clash Resolution & Coordination',
    category: 'Navisworks',
    discipline: 'All',
    duration: '6 Weeks',
    hours: '50 Hours',
    batchType: 'Live Interactive',
    rating: 4.88,
    reviewsCount: 42,
    originalPrice: 9999,
    discountedPrice: 4999,
    badge: 'Essential Tool',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    accentColor: '#10B981', // Navisworks Green
    description: 'Learn how to aggregate multi-disciplinary BIM models, run automated clash detection tests, generate clash reports, and create 4D construction timeline simulations.',
    highlights: [
      'Clash Matrix Creation & Clearance Rules',
      'Grouped Clash Matrix & Status Management (Active, Reviewed, Approved)',
      'Switchback Feature directly to Revit for Instant Corrections',
      '4D Timeliner Simulation linked with MS Project / Primavera',
      'Quantification & Takeoff in Navisworks'
    ],
    softwareCovered: ['Navisworks Manage 2026', 'Revit 2026', 'MS Project'],
    upcomingBatch: 'Starts September 1, 2026',
    curriculum: [
      {
        moduleTitle: 'Module 1: File Aggregation & Navigation',
        lessons: [
          'NWD, NWF, and NWC File Formats Explained',
          'Combining Revit, AutoCAD, and IFC Models',
          'Third-person Navigation, Sectioning & Saved Viewpoints'
        ]
      },
      {
        moduleTitle: 'Module 2: Advanced Clash Detective',
        lessons: [
          'Hard Clash vs Soft Clearance Testing',
          'Creating Selection Sets & Search Sets using Rules',
          'Generating HTML & Excel Clash Reports for Site Meetings'
        ]
      },
      {
        moduleTitle: 'Module 3: 4D TimeLiner & 5D Costing',
        lessons: [
          'Linking Construction Schedule CSV / Primavera',
          'Simulating Construction Sequence Animation',
          'Quantification takeoff and Material Verification'
        ]
      }
    ]
  },
  {
    id: 'dynamo-bim-automation',
    title: 'Dynamo BIM Automation & Computational Design',
    subtitle: 'Automate Repetitive Revit Tasks, Geometry Generation & Data Management',
    category: 'Dynamo',
    discipline: 'All',
    duration: '4 Weeks',
    hours: '34 Hours',
    batchType: 'Recorded + Live Support',
    rating: 4.92,
    reviewsCount: 35,
    originalPrice: 7999,
    discountedPrice: 3999,
    badge: 'High Salary Skill',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    accentColor: '#9333EA', // Dynamo Purple
    description: 'Unlock visual programming with Dynamo to automate sheet creation, renumbering elements, excel data import/export, parametric modeling, and clash resolution scripts.',
    highlights: [
      'Zero-Coding Visual Node Programming',
      'Automated Sheet Generation & Titleblock Population',
      'Bi-directional Data Exchange between Excel & Revit',
      'Custom Python Script Nodes in Dynamo',
      'Parametric Facade & Complex Geometry Creation'
    ],
    softwareCovered: ['Dynamo for Revit', 'Python 3', 'Microsoft Excel'],
    upcomingBatch: 'Self-Paced Instant Access + Weekly Live Q&A',
    curriculum: [
      {
        moduleTitle: 'Module 1: Visual Programming Basics',
        lessons: [
          'Nodes, Wires, Lists & Lacing Logic',
          'Selecting Revit Elements by Category / Family / Type',
          'Reading & Writing Element Parameters'
        ]
      },
      {
        moduleTitle: 'Module 2: Practical Productivity Scripts',
        lessons: [
          'Batch Renumbering Doors, Rooms & Equipment',
          'Automated Sheet Creation from Excel Schedule',
          'Clash Sphere Generator from Navisworks CSV'
        ]
      }
    ]
  },
  {
    id: 'autodesk-civil-3d',
    title: 'Autodesk Civil 3D Infrastructure & Land Development',
    subtitle: 'Roadway Design, Grading, Pipe Networks & Terrain Surface Modeling',
    category: 'Civil 3D',
    discipline: 'ST',
    duration: '6 Weeks',
    hours: '45 Hours',
    batchType: 'Live Interactive',
    rating: 4.85,
    reviewsCount: 29,
    originalPrice: 11999,
    discountedPrice: 5999,
    badge: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    accentColor: '#E11D48',
    description: 'Master civil infrastructure design including survey points, surface DTM generation, road alignments, profiles, corridors, earthwork volume calculations, and pipe networks.',
    highlights: [
      'Topographic Surface DTM Creation & Contour Analysis',
      'Horizontal & Vertical Road Corridor Alignment',
      'Cut & Fill Earthwork Volume Calculations',
      'Stormwater & Sanitary Underground Pipe Networks',
      'Civil 3D to Revit Site Coordination'
    ],
    softwareCovered: ['Autodesk Civil 3D 2026', 'InfraWorks', 'Revit'],
    upcomingBatch: 'Starts September 5, 2026',
    curriculum: [
      {
        moduleTitle: 'Module 1: Points, Surfaces & Site Grading',
        lessons: [
          'Importing Survey Data & COGO Points',
          'Creating Digital Terrain Models (DTM)',
          'Feature Lines & Grading Objects'
        ]
      },
      {
        moduleTitle: 'Module 2: Roads, Corridors & Volumes',
        lessons: [
          'Alignments, Profiles & Assembly Creation',
          'Building 3D Road Corridors & Sample Lines',
          'Cut/Fill Earthwork Volume Reports'
        ]
      }
    ]
  },
  {
    id: 'autocad-essentials',
    title: 'Autodesk AutoCAD Essentials & Working Drawings Masterclass',
    subtitle: '2D Drafting, Precision Annotations, Dynamic Blocks & Sheet Sets',
    category: 'AutoCAD',
    discipline: 'All',
    duration: '4 Weeks',
    hours: '30 Hours',
    batchType: 'Recorded + Live Support',
    rating: 4.8,
    reviewsCount: 50,
    originalPrice: 4999,
    discountedPrice: 2499,
    badge: 'Foundation Course',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    accentColor: '#DC2626',
    description: 'Solidify your technical drafting foundation with precision CAD commands, layer management, dynamic blocks, plotting standards, and architectural/MEP 2D drawing standards.',
    highlights: [
      'Precision Drawing & Modify Commands',
      'Layer Standards, Line Types & Line Weights',
      'Dynamic Blocks with Visibility States & Attributes',
      'Layout Viewports, Annotative Scales & PDF Plotting',
      'Standard Architectural & MEP Symbol Libraries'
    ],
    softwareCovered: ['Autodesk AutoCAD 2026'],
    upcomingBatch: 'Instant Access + Mentor Support',
    curriculum: [
      {
        moduleTitle: 'Module 1: Core Drafting & Precision Tools',
        lessons: [
          'Coordinate Systems, Snap Modes & Draw Commands',
          'Modify Tools: Offset, Trim, Extend, Fillet, Array',
          'Layers, Color ByLayer, Linetypes'
        ]
      },
      {
        moduleTitle: 'Module 2: Annotations & Output',
        lessons: [
          'Dimensions, Multileaders & Text Styles',
          'Titleblocks & Layout Scaling',
          'Batch Plotting & PDF Exporting'
        ]
      }
    ]
  }
];

export const BIM_SERVICES: BimService[] = [
  {
    id: '3d-modeling',
    title: '3D BIM Modeling (AR, ST, MEP)',
    iconName: 'Box',
    description: 'Constructing high-LOD (LOD 100 to 500) parametric BIM models for Architectural, Structural, and Mechanical/Electrical/Plumbing systems from 2D CAD files or point cloud scans.',
    deliverables: [
      'LOD 300 - 500 Revit Models (.rvt)',
      'Coordinated IFC & NWC Exports',
      'Detailed Family Creation (.rfa)',
      'Material & Parameter Data Embeddings'
    ],
    benefits: [
      'Eliminate design errors before construction starts',
      'Accurate quantity takeoffs (BOQ)',
      'Easier client visual presentations'
    ]
  },
  {
    id: 'clash-coordination',
    title: 'Clash Detection & Multi-Discipline Coordination',
    iconName: 'ShieldAlert',
    description: 'Aggregating models from architect, structural engineer, and MEP sub-contractors in Navisworks Manage to detect hard and soft clashes early.',
    deliverables: [
      'Comprehensive Clash Matrix Reports (PDF/Excel)',
      'Clash Resolution Action Logs',
      '3D Isometric Viewpoints for Site Meetings',
      'Constructability Review Summaries'
    ],
    benefits: [
      'Saves millions in expensive site rework',
      'Speeds up RFI resolutions',
      'Ensures maintenance clearances for plant room equipment'
    ]
  },
  {
    id: 'drawings-production',
    title: '2D Drawings Production & Shop Drawings',
    iconName: 'FileText',
    description: 'Extracting precise, clear 2D shop drawings, construction documentation, and builder works drawings directly from coordinated 3D BIM models.',
    deliverables: [
      'MEP Coordinated Shop Drawings',
      'Penetration & Sleeve Layouts',
      'Plant Room Sectional & Isometric Views',
      'As-Built Drawing Sets'
    ],
    benefits: [
      '100% synchronization between 3D model and 2D sheets',
      'Faster site installation approvals',
      'Standardized title blocks & annotation styles'
    ]
  },
  {
    id: 'facility-management',
    title: 'Facility Management (6D BIM)',
    iconName: 'Building2',
    description: 'Enriching 3D BIM elements with Asset Management metadata (COBie parameters, manufacturer warranties, serial numbers, maintenance schedules) for post-construction operation.',
    deliverables: [
      'COBie Data Sheets',
      'Asset Tagged As-Built BIM Models',
      'Integration files for CAFM/BMS Systems'
    ],
    benefits: [
      'Streamlined building maintenance lifecycle',
      'Instant access to equipment datasheets',
      'Reduced facility operating expenses'
    ]
  },
  {
    id: 'bim-implementation',
    title: 'BIM Implementation & Corporate Training',
    iconName: 'Cpu',
    description: 'Helping AEC companies transition from traditional 2D AutoCAD workflows to standardized ISO 19650 BIM processes, custom templates, and team upskilling.',
    deliverables: [
      'BIM Execution Plans (BEP)',
      'Custom Company Revit Templates (.rte)',
      'Custom BIM Object Library Creation',
      'Tailored Staff Training Workshops'
    ],
    benefits: [
      'Seamless digital transformation',
      'Standardized BIM workflows across projects',
      'Competitive edge in international tenders'
    ]
  }
];

export const FEATURED_PROJECTS: BimProject[] = [
  {
    id: 'al-ula-shlal',
    title: 'A10 - AL ULA SHLAL DEVELOPMENT',
    clientLocation: 'Saudi Arabia (GCC)',
    type: 'Luxury Hospitality & Heritage Resort Development',
    buildingsModeled: 45,
    durationMonths: 4,
    drawingsProduced: 400,
    engineersInvolved: 10,
    description: 'Delivered comprehensive 3D MEP BIM modeling, clash coordination, and shop drawings for 45+ luxury resort buildings in the prestigious Al ULA development project with zero site clash tolerance.',
    servicesProvided: [
      '3D MEP Modeling (HVAC, Electrical, Plumbing, Firefighting)',
      'Clash Coordination & Navisworks Matrix Resolution',
      '400+ Coordinated Shop Drawings Production',
      'Plant Room Chiller & Pump House Isometrics'
    ],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
    mepHighlights: [
      '45+ Buildings Modeled in 4 Months',
      '400+ High-Precision Shop Drawings',
      '10+ Dedicated Specialist MEP BIM Engineers',
      'Full Compliance with GCC Architectural Standards'
    ]
  },
  {
    id: 'plant-room-mep',
    title: 'Central Chiller Plant Room & High-Rise MEP Modeling',
    clientLocation: 'Pune, India & UAE',
    type: 'Commercial High-Rise Complex',
    buildingsModeled: 2,
    durationMonths: 3,
    drawingsProduced: 120,
    engineersInvolved: 6,
    description: 'High-LOD 400 modeling of complex chilled water piping, AHU connections, heavy electrical cable trays, and fire suppression mains with zero clash allowance in narrow ceiling voids.',
    servicesProvided: [
      'LOD 400 MEP Fabrication Modeling',
      'Clash Resolution with Structural Steelwork',
      'Builder Works & Wall Sleeve Drawings',
      'Equipments Space Clearance Studies'
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80',
    mepHighlights: [
      'Zero Clash Site Execution Achieved',
      '120+ Detailed Isometrics & Sections',
      'COBie Data Embedded for FM'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rahul Sharma',
    role: 'BIM Engineer',
    company: 'WSP India',
    country: 'India',
    courseTaken: 'Professional Revit Training (AR, ST, MEP)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The 15 years of industry experience that PBS mentors bring makes all the difference. They taught us real plant room modeling and ISO standards that I directly apply in my job at WSP every single day!',
    verified: true
  },
  {
    id: 't2',
    name: 'Ahmed Al-Mansoori',
    role: 'MEP Coordinator',
    company: 'ALEC Engineering',
    country: 'UAE',
    courseTaken: 'Navisworks Manage & Clash Coordination',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'I joined PBS from Dubai for their Navisworks course. The instructor showed us real clash matrix techniques from their Al ULA Saudi project! Solved my exact site clash problems. Highly recommended!',
    verified: true
  },
  {
    id: 't3',
    name: 'Priya Deshmukh',
    role: 'Junior Architect',
    company: 'Architect Hafeez Contractor',
    country: 'India',
    courseTaken: 'Dynamo BIM Automation',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Dynamo used to terrify me, but the step-by-step guidance from Pragmatic BIM Solution made visual programming so logical. I automated 500 sheet creations in 5 minutes!',
    verified: true
  },
  {
    id: 't4',
    name: 'Kevin Vance',
    role: 'Structural Modeler',
    company: 'Arup UK',
    country: 'United Kingdom',
    courseTaken: 'Autodesk Revit Structural & Civil 3D',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Exceptional training quality! PBS proves that word-of-mouth trust is real. The mentors walk you through complex rebar detailing and terrain surfaces with incredible clarity.',
    verified: true
  }
];

export const MASTERCLASSES: Masterclass[] = [
  {
    id: 'm1',
    title: 'Live 3-Hour Workshop: Navisworks Clash Matrix Masterclass',
    instructor: 'Pragmatic BIM Senior Consultants (15+ Yrs Exp)',
    date: 'Saturday, Aug 23, 2026',
    time: '6:00 PM - 9:00 PM IST',
    duration: '3 Hours',
    price: 499,
    originalPrice: 1999,
    category: 'Navisworks',
    seatsLeft: 8
  },
  {
    id: 'm2',
    title: 'Mastering Plant Room Chiller Piping & Duct Routing in Revit',
    instructor: 'Lead MEP BIM Specialist',
    date: 'Sunday, Aug 24, 2026',
    time: '11:00 AM - 2:00 PM IST',
    duration: '3 Hours',
    price: 499,
    originalPrice: 1999,
    category: 'Revit MEP',
    seatsLeft: 12
  },
  {
    id: 'm3',
    title: 'Dynamo Python Scripting for Automated Sheet & Parameter Tagging',
    instructor: 'BIM Automation Expert',
    date: 'Saturday, Aug 30, 2026',
    time: '5:00 PM - 8:00 PM IST',
    duration: '3 Hours',
    price: 599,
    originalPrice: 2499,
    category: 'Dynamo',
    seatsLeft: 5
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of MEP in BIM: Top Trends, Tools & Workflows for 2026',
    category: 'MEP Engineering',
    readTime: '5 min read',
    date: 'Aug 10, 2026',
    author: 'Pragmatic BIM Team',
    summary: 'Explore how 3D fabrication modeling, computational Dynamo scripting, and automated clash detection are revolutionizing MEP building services.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b2',
    title: 'Top 5 Reasons Why Every Civil Engineer Must Learn Revit & Navisworks',
    category: 'Career Guide',
    readTime: '4 min read',
    date: 'Aug 05, 2026',
    author: 'PBS BIM Mentor',
    summary: 'Why traditional 2D drafting is no longer enough in GCC, European, and Indian AEC projects, and how BIM certification boosts salaries by up to 60%.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b3',
    title: 'Building Information Modeling for Al ULA Shlal Project: Key Learnings',
    category: 'Case Study',
    readTime: '7 min read',
    date: 'Jul 28, 2026',
    author: 'PBS Senior BIM Lead',
    summary: 'A detailed breakdown of how our team modeled 45+ luxury resort buildings and produced 400+ coordinated shop drawings in 4 months.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'Courses',
    question: 'Why choose Pragmatic BIM Solution over generic platforms?',
    answer: 'Pragmatic BIM Solution (PBS) is backed by 15 years of active professional BIM project handling. Unlike theoretical platforms, our mentors work directly on massive global projects (such as modeling 45+ buildings for Al ULA Shlal Development). We teach real project files, ISO 19650 workflows, and practical clash-free modeling.'
  },
  {
    category: 'Courses',
    question: 'Are classes live or pre-recorded?',
    answer: 'We offer live interactive batches where students can clear doubts in real-time with mentors, as well as self-paced options with dedicated 1:1 mentor doubt-clearing sessions.'
  },
  {
    category: 'Certificates',
    question: 'Will I receive an official certificate upon course completion?',
    answer: 'Yes! Upon completing the course and submitting your capstone BIM project, you will receive a verifiable Pragmatic BIM Solution Professional Industry Certificate that you can share on LinkedIn and attach to your CV.'
  },
  {
    category: 'Enrollment',
    question: 'What software or system requirements do I need?',
    answer: 'You will need a Windows computer capable of running Autodesk Revit (2020 to 2026), Navisworks Manage, or Civil 3D (minimum 8GB-16GB RAM and a basic dedicated graphics card). We provide installation guidance for student licenses.'
  },
  {
    category: 'BIM Services',
    question: 'Can Pragmatic BIM Solution handle outsource BIM modeling for our company?',
    answer: 'Absolutely! Beyond training, PBS provides full BIM Consultancy Services including 3D Architectural/Structural/MEP Modeling (LOD 100-500), Navisworks Clash Coordination, 2D Coordinated Shop Drawing Production, and Facility Management (COBie data enrichment).'
  },
  {
    category: 'Career',
    question: 'Do you provide job placement support?',
    answer: 'Yes! We conduct portfolio review sessions, Revit model auditing tests, CV building, and connect qualified students with our hiring partner network across India, Middle East, and Europe.'
  }
];

export const PROMOTIONS_DATA: {
  code: string;
  title: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  description: string;
  expiryDate: string;
  badge?: string;
  minOrderValue?: number;
}[] = [
  {
    code: 'BIMPRO2026',
    title: '2026 Early Bird Mega Scholarship',
    discountType: 'percentage',
    discountValue: 40,
    description: 'Get an instant 40% scholarship off any masterclass program with live mentor access.',
    expiryDate: 'August 31, 2026',
    badge: '40% OFF'
  },
  {
    code: 'EARLYBIRD40',
    title: 'Instant Fee Rebate Voucher',
    discountType: 'flat',
    discountValue: 4000,
    description: 'Flat ₹4,000 instant discount on one-time full fee payment for Revit & Navisworks.',
    expiryDate: 'Limited Seats (3 Left)',
    badge: '₹4,000 OFF'
  },
  {
    code: 'ISO19650',
    title: 'ISO 19650 Information Management Waiver',
    discountType: 'percentage',
    discountValue: 25,
    description: 'Special 25% waiver for BIM Managers and Lead Coordinators enrolling in ISO 19650.',
    expiryDate: 'Ongoing 2026',
    badge: '25% OFF'
  },
  {
    code: 'WOMENINBIM',
    title: 'Women in AEC Engineering Grant',
    discountType: 'percentage',
    discountValue: 50,
    description: 'Empowering female civil engineers, architects, and MEP designers with 50% scholarship.',
    expiryDate: 'Annual Initiative',
    badge: '50% GRANT'
  },
  {
    code: 'PRAVINVIP',
    title: 'Lead Mentor Direct Recommendation',
    discountType: 'percentage',
    discountValue: 50,
    description: 'VIP referral code authorized by Lead BIM Mentor Pravin Yadav for direct admission.',
    expiryDate: 'Special Access',
    badge: 'VIP 50%'
  }
];

export const PRELOADED_USERS = [
  {
    id: 'user-student-pravin',
    name: 'Pravin Yadav',
    email: 'pravin.yadav@pbs.com',
    phone: '+91 8208918726',
    role: 'student' as const,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    enrolledCourseIds: ['revit-mep-ar-st', 'navisworks-clash', 'dynamo-computational-bim', 'iso-19650-bim-management'],
    provider: 'email' as const,
    designation: 'BIM Student & MEP Coordinator',
    joinedDate: 'Sept 2026'
  },
  {
    id: 'user-admin-1',
    name: 'Pravin Yadav (Admin Alternate)',
    email: 'pravinsyadavpsy99@gmail.com',
    phone: '+91 8208918726',
    role: 'student' as const,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    enrolledCourseIds: ['revit-mep-ar-st', 'navisworks-clash'],
    provider: 'google' as const,
    designation: 'BIM Student',
    joinedDate: 'Aug 2026'
  }
];
