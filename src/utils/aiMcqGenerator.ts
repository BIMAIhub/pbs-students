import { McqQuestion } from './pbsAdminStore';

export interface AiMcqGenOptions {
  courseTitle: string;
  topic: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced_specialist';
  questionCount: number;
}

export const AI_MCQ_TOPICS = [
  'Revit Architecture & Parametric Family Creation (LOD 300-400)',
  'Revit MEP (HVAC Duct Friction, Plumbing Slopes & Electrical Schedules)',
  'Revit Structure & Concrete Rebar Detailing',
  'Navisworks Manage Clash Matrix, Tolerances & BCF Reporting',
  'Dynamo Computational BIM & Visual Scripting Algorithms',
  'ISO 19650 CDE Workflow, Naming Conventions & EIR/BEP',
  'COBie Data Drops & IFC4 openBIM Interoperability',
  '4D Construction Simulation & TimeLiner Scheduling',
  'Scan-to-BIM Point Cloud Modeling & As-Built Tolerances',
  'BIM Coordination Leadership & Clash Resolution Protocol'
];

interface TopicTemplate {
  topic: string;
  questions: McqQuestion[];
}

const AEC_QUESTION_REPOSITORY: TopicTemplate[] = [
  {
    topic: 'Revit Architecture & Parametric Family Creation (LOD 300-400)',
    questions: [
      {
        id: 'ai_q_arch_1',
        question: 'Which Revit family parameter type should be utilized to calculate volume metrics in project schedules across multiple independent model files?',
        options: [
          'Shared Parameter stored in a centralized external .txt schema file',
          'Family Parameter restricted strictly to local RFA geometry',
          'Global Parameter linked solely to dimension offsets',
          'Project Parameter without external GUID mapping'
        ],
        correctOptionIndex: 0,
        explanation: 'Shared Parameters use unique universal GUIDs saved in an external definition text file, allowing multi-file scheduling and tagging consistency.'
      },
      {
        id: 'ai_q_arch_2',
        question: 'When modeling curtain wall mullions in Revit, how do you prevent unwanted segmentation at panel intersections?',
        options: [
          'Use the Make Continuous / Break at Join toggle on the Mullion contextual tab',
          'Delete all grid lines and replace with in-place families',
          'Set family LOD to Coarse display mode',
          'Apply an invisible material override'
        ],
        correctOptionIndex: 0,
        explanation: 'The "Make Continuous" and "Break at Join" controls on mullions regulate which mullion (vertical vs horizontal) has unbroken geometric priority.'
      },
      {
        id: 'ai_q_arch_3',
        question: 'In parametric nested families, what is the primary benefit of enabling the "Shared" checkbox in Family Category & Parameters?',
        options: [
          'The sub-family can be scheduled and tagged independently within the host project',
          'The file size is reduced by 80%',
          'The family cannot be edited by other team members',
          'Geometry becomes unselectable in 3D views'
        ],
        correctOptionIndex: 0,
        explanation: 'Enabling "Shared" in a nested component forces Revit to treat it as an independent instance in the project environment, enabling dedicated schedule quantification.'
      },
      {
        id: 'ai_q_arch_4',
        question: 'What is the required Level of Development (LOD) specification for architectural fabrication drawings showing exact joint sealant profiles and anchor bolt embedments?',
        options: [
          'LOD 400 (Fabrication & Assembly Specification)',
          'LOD 200 (Approximate Geometry)',
          'LOD 300 (Precise Generic Geometry)',
          'LOD 100 (Conceptual Massing)'
        ],
        correctOptionIndex: 0,
        explanation: 'LOD 400 models represent shop-level fabrication and manufacturing details, including fasteners, sealants, weld preparations, and precise vendor assemblies.'
      }
    ]
  },
  {
    topic: 'Revit MEP (HVAC Duct Friction, Plumbing Slopes & Electrical Schedules)',
    questions: [
      {
        id: 'ai_q_mep_1',
        question: 'What calculation method is standard in Autodesk Revit for sizing supply air duct networks to balance airflow velocity against acoustic criteria?',
        options: [
          'Equal Friction (e.g., 0.8 to 1.0 Pa/m) combined with Maximum Velocity limits (e.g., 5 m/s)',
          'Static Regain only without friction damping',
          'Constant Diameter sizing across all branch runs',
          'Linear CFM proportionality without pressure loss calculations'
        ],
        correctOptionIndex: 0,
        explanation: 'Industry standard MEP design combines Equal Friction (Pa/m) with upper velocity caps (m/s) to prevent aerodynamic fan noise in occupied spaces.'
      },
      {
        id: 'ai_q_mep_2',
        question: 'In plumbing sanitary drainage networks, why must a 135-degree Sanitary Tee or Wye fitting be used instead of a standard 90-degree Tee for horizontal junctions?',
        options: [
          'To direct wastewater flow smoothly in the direction of drain fall and prevent solid blockages',
          'To save fabrication material cost',
          'Because Revit does not support 90-degree pipe fittings',
          'To increase hydraulic pressure above atmospheric levels'
        ],
        correctOptionIndex: 0,
        explanation: 'Sanitary drainage fittings (Wyes and Combination Wyes) maintain laminar flow inertia and prevent turbulence and waste deposits in horizontal drain runs.'
      },
      {
        id: 'ai_q_mep_3',
        question: 'Which Revit MEP feature is mandatory to compute accurate heating and cooling thermal loads for compliance with ASHRAE 90.1 / ECBC?',
        options: [
          'Placing MEP Spaces with analytical surface boundary detection and thermal condition properties',
          'Placing standard 2D Architectural Text Annotations',
          'Drawing detail line contours around room perimeters',
          'Creating dummy generic model blocks'
        ],
        correctOptionIndex: 0,
        explanation: 'MEP Spaces capture spatial volumes, occupancy schedules, lighting power densities, equipment heat gains, and envelope U-values for energy loads.'
      },
      {
        id: 'ai_q_mep_4',
        question: 'How do you configure an electrical panelboard in Revit to automatically balance connected loads across Phase A, Phase B, and Phase C?',
        options: [
          'Use the "Rebalance Loads" algorithm inside the Panel Schedule view',
          'Manually delete and re-circuit all light fixtures',
          'Change the phase angle in Electrical Settings',
          'Convert the panel family into a generic model'
        ],
        correctOptionIndex: 0,
        explanation: 'Revit Panel Schedules provide a dedicated "Rebalance Loads" automated utility that rearranges single-phase breaker slots to minimize unbalance percentage.'
      }
    ]
  },
  {
    topic: 'Navisworks Manage Clash Matrix, Tolerances & BCF Reporting',
    questions: [
      {
        id: 'ai_q_nav_1',
        question: 'In a multi-disciplinary BIM Coordination Matrix, what is the primary purpose of setting a 25mm tolerance on a Structural vs HVAC Hard Clash test?',
        options: [
          'To eliminate trivial drywall or minor modeling inaccuracies from cluttering the coordination issue tracker',
          'To allow ducts to pass through concrete beams without core drilling',
          'To speed up GPU rendering framerates in Navisworks',
          'To automatically approve all clash results'
        ],
        correctOptionIndex: 0,
        explanation: 'Tolerances filter out micro-intersections and minor drafting overlaps, ensuring BIM Coordinators focus exclusively on genuine site conflicts.'
      },
      {
        id: 'ai_q_nav_2',
        question: 'What is the structural advantage of using BCF (BIM Collaboration Format) XML / API over static PDF clash reports?',
        options: [
          'BCF captures exact 3D camera viewpoints, component IFC GUIDs, comments, and statuses directly navigable in Revit',
          'BCF compresses video recordings into MP4s',
          'BCF automatically modifies the CAD geometry without engineer review',
          'BCF removes the need for Navisworks licenses'
        ],
        correctOptionIndex: 0,
        explanation: 'BCF allows modelers in authoring tools (Revit, Archicad, Tekla) to jump directly to the clash camera coordinate and highlights the exact conflicting GUIDs.'
      },
      {
        id: 'ai_q_nav_3',
        question: 'What is the difference between a "Hard Clash" and a "Clearance Clash" in Navisworks Clash Detective?',
        options: [
          'Hard Clash detects direct geometric penetration; Clearance Clash checks minimum insulation / maintenance buffer envelopes',
          'Hard Clash is for steel; Clearance Clash is for concrete',
          'Hard Clash cannot be grouped into folders',
          'Clearance Clash deletes colliding objects'
        ],
        correctOptionIndex: 0,
        explanation: 'Clearance tests evaluate safety buffer zones (e.g. 500mm access envelope in front of electrical switchgear or duct insulation thickness).'
      }
    ]
  },
  {
    topic: 'Dynamo Computational BIM & Visual Scripting Algorithms',
    questions: [
      {
        id: 'ai_q_dyn_1',
        question: 'In Dynamo for Revit, what node combination is standard for updating parameter values across a collection of elements?',
        options: [
          'Element.SetParameterByName node receiving Elements, Parameter Name (String), and Values (List)',
          'Math.Random connected to View.Export',
          'List.Reverse connected directly to Category.ByName',
          'Watch node connected to Document.Save'
        ],
        correctOptionIndex: 0,
        explanation: 'Element.SetParameterByName is the standard transactional Revit node in Dynamo to write calculated strings, numbers, or elements back to model properties.'
      },
      {
        id: 'ai_q_dyn_2',
        question: 'When performing list operations in Dynamo, what is the effect of setting node lacing to "Shortest"?',
        options: [
          'The node pairs elements until the shortest input list is exhausted, discarding remaining items in longer lists',
          'All combinations are computed',
          'The longest list is repeated infinitely',
          'The script crashes with a null pointer'
        ],
        correctOptionIndex: 0,
        explanation: 'Shortest lacing matches items sequentially index-by-index and stops execution immediately as soon as the smallest list ends.'
      },
      {
        id: 'ai_q_dyn_3',
        question: 'Which Dynamo node structure allows filtering structural columns that have an elevation offset greater than 3000mm?',
        options: [
          'Element.GetParameterValueByName -> Math (x > 3000) -> List.FilterByBoolMask',
          'List.Shuffle -> View.ExportToDWG',
          'String.Concat -> Geometry.Scale',
          'Color.ByARGB -> Sheet.Create'
        ],
        correctOptionIndex: 0,
        explanation: 'The relational operator outputs a list of True/False booleans, which `List.FilterByBoolMask` uses to separate items into "in" (matching) and "out" lists.'
      }
    ]
  },
  {
    topic: 'ISO 19650 CDE Workflow, Naming Conventions & EIR/BEP',
    questions: [
      {
        id: 'ai_q_iso_1',
        question: 'According to ISO 19650-2, what information container transition requires formal verification and approval by the Lead Appointed Party before multidisciplinary consumption?',
        options: [
          'Transition from Work In Progress (WIP) state to the Shared state',
          'Transition from Archived state to Draft state',
          'Transition from Published state to WIP state',
          'Transition from Private folder to Recycle Bin'
        ],
        correctOptionIndex: 0,
        explanation: 'Work In Progress (WIP) is internal to the task team. Moving to the "Shared" CDE area requires formal quality check, approval, and authorization.'
      },
      {
        id: 'ai_q_iso_2',
        question: 'In the ISO 19650 National Annex file naming syntax `PBS-ARV-ZZ-01-M3-A-0001.rvt`, what does the field `ZZ` signify?',
        options: [
          'Spatial Volume / Zone (ZZ = All Zones or Entire Building)',
          'Originator organization code',
          'Revision number zero',
          'Suitability status code'
        ],
        correctOptionIndex: 0,
        explanation: 'In ISO 19650 naming conventions, "ZZ" denotes all volumes/zones of a project where an information container covers the entire facility.'
      },
      {
        id: 'ai_q_iso_3',
        question: 'What is the formal purpose of the Pre-Appointment BIM Execution Plan (Pre-BEP) during the tender stage?',
        options: [
          'To demonstrate the prospective delivery team\'s proposed approach, capability, capacity, and IT infrastructure to meet the EIR',
          'To bill the client for preliminary design hours',
          'To finalize manufacturer warranty dates',
          'To register the building with municipal planning authorities'
        ],
        correctOptionIndex: 0,
        explanation: 'The Pre-BEP is submitted during tender to prove competency, milestones, software matrix, and federated delivery capability before contract award.'
      }
    ]
  },
  {
    topic: 'COBie Data Drops & IFC4 openBIM Interoperability',
    questions: [
      {
        id: 'ai_q_cob_1',
        question: 'What is the primary deliverable purpose of a COBie (Construction Operations Building Information Exchange) data drop at project handover?',
        options: [
          'To provide structured equipment data, serial numbers, warranty dates, and maintenance schedules directly for FM / CAFM software ingestion',
          'To generate photorealistic VR renders for marketing brochures',
          'To replace 2D architectural permit blueprints with photos',
          'To calculate structural concrete strength curves'
        ],
        correctOptionIndex: 0,
        explanation: 'COBie provides standardized tabular asset information (Facility, Floor, Space, Type, Component, System) directly imported into Computerized Maintenance Management Systems (CMMS).'
      },
      {
        id: 'ai_q_cob_2',
        question: 'In the IFC 4 schema (ISO 16739), which entity represents a physical air handling unit or pump mechanical equipment?',
        options: [
          'IfcFlowTerminal / IfcEnergyConversionDevice / IfcPump',
          'IfcBuildingStorey',
          'IfcSite',
          'IfcRelContainedInSpatialStructure'
        ],
        correctOptionIndex: 0,
        explanation: 'IFC classifies active distribution components under dedicated subtype entities like IfcEnergyConversionDevice, IfcPump, and IfcFlowTerminal.'
      }
    ]
  }
];

export const generateAiMcqQuestions = (options: AiMcqGenOptions): McqQuestion[] => {
  const { topic, difficulty, questionCount } = options;

  // Find repository matching topic or fallback
  const matchingRepo = AEC_QUESTION_REPOSITORY.find(r => 
    r.topic.toLowerCase().includes(topic.toLowerCase()) || 
    topic.toLowerCase().includes(r.topic.toLowerCase().slice(0, 10))
  );

  const pool = matchingRepo ? matchingRepo.questions : AEC_QUESTION_REPOSITORY[0].questions;
  const result: McqQuestion[] = [];

  // Shuffle and pick
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  
  for (let i = 0; i < questionCount; i++) {
    const base = shuffled[i % shuffled.length];
    const timestamp = Date.now() + i;
    
    // Customize difficulty prefixes
    let prefix = '';
    if (difficulty === 'advanced_specialist') {
      prefix = '[Specialist LOD 400] ';
    } else if (difficulty === 'intermediate') {
      prefix = '[Coordination Standard] ';
    }

    result.push({
      id: `ai_q_${timestamp}`,
      question: `${prefix}${base.question}`,
      options: [...base.options],
      correctOptionIndex: base.correctOptionIndex,
      explanation: base.explanation
    });
  }

  return result;
};
