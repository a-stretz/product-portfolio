// Universal diagnostic sections with factor definitions
// Factor polarity: 'positive' = improves readiness, 'constraining' = lowers readiness
// Factor type: 'binary' (yes/no) or 'scale' (1-5)
// Factor weight: 1=light, 2=moderate, 3=high influence

export const DIAGNOSTICS = [
  {
    id: 'leadership',
    key: 'leadership',
    title: 'Leadership & AI Strategy Clarity',
    shortTitle: 'Leadership',
    description: 'Assesses whether leadership has defined a credible AI thesis, identified ownership, and established success criteria.',
    question: 'Does leadership have a clear, owned AI strategy with defined success metrics and an explicit business case?',
    weight: 15,
    factorGroups: [
      {
        id: 'ownership',
        label: 'Ownership & Accountability',
        factors: [
          { id: 'l1', label: 'Clear executive owner exists for AI strategy', type: 'binary', polarity: 'positive', weight: 3, helper: 'A named leader owns AI strategy and is accountable for outcomes' },
          { id: 'l2', label: 'AI ownership is distributed with no single accountable lead', type: 'binary', polarity: 'constraining', weight: 2, helper: 'Multiple teams claim AI without clear accountability' },
          { id: 'l3', label: 'AI interest is primarily market-pressure driven', type: 'binary', polarity: 'constraining', weight: 2, helper: 'AI investment is reactive, not thesis-led' },
        ]
      },
      {
        id: 'strategy',
        label: 'Strategy & Prioritization',
        factors: [
          { id: 'l4', label: 'Priority workflows are explicitly defined', type: 'binary', polarity: 'positive', weight: 3, helper: 'Leadership has named the workflows AI should address first' },
          { id: 'l5', label: 'Business case for AI is explicit and socialized', type: 'binary', polarity: 'positive', weight: 3, helper: 'A written or shared rationale exists beyond "we should do AI"' },
          { id: 'l6', label: 'AI success metrics are defined and agreed upon', type: 'binary', polarity: 'positive', weight: 3, helper: 'KPIs or success criteria for AI are documented and accepted' },
        ]
      },
      {
        id: 'alignment',
        label: 'Alignment Quality',
        factors: [
          { id: 'l7', label: 'Executive alignment on AI direction', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = fragmented / competing visions, 5 = strong shared direction' },
          { id: 'l8', label: 'Cross-functional teams understand AI priorities', type: 'scale', polarity: 'positive', weight: 2, min: 1, max: 5, helper: '1 = siloed awareness, 5 = shared understanding across functions' },
          { id: 'l9', label: 'Maturity of AI investment thesis', type: 'scale', polarity: 'positive', weight: 2, min: 1, max: 5, helper: '1 = vague / no thesis, 5 = well-reasoned and differentiated' },
        ]
      }
    ],
    exampleChips: [
      { label: 'Clear AI owner named', type: 'positive' },
      { label: 'AI thesis documented', type: 'positive' },
      { label: 'Success metrics set', type: 'positive' },
      { label: 'Workflows prioritized', type: 'positive' },
      { label: 'Market pressure only', type: 'negative' },
      { label: 'No single AI owner', type: 'negative' },
      { label: 'Competing AI visions', type: 'negative' },
    ]
  },

  {
    id: 'workflow',
    key: 'workflow',
    title: 'Workflow Understanding & Operational Ownership',
    shortTitle: 'Workflows',
    description: 'Assesses whether the company understands its core operational workflows well enough to redesign them around AI.',
    question: 'Are core workflows visible, documented, and owned operationally — with exceptions, queues, and handoffs understood?',
    weight: 15,
    factorGroups: [
      {
        id: 'visibility',
        label: 'Workflow Visibility',
        factors: [
          { id: 'w1', label: 'Workflow maps or documentation exist', type: 'binary', polarity: 'positive', weight: 3, helper: 'Core workflows are mapped, not just understood in people\'s heads' },
          { id: 'w2', label: 'Exception paths and edge cases are understood', type: 'binary', polarity: 'positive', weight: 3, helper: 'Known failure modes, escalations, and non-standard paths are documented' },
          { id: 'w3', label: 'Queues and handoffs between steps are visible', type: 'binary', polarity: 'positive', weight: 3, helper: 'Where work accumulates and moves is observable, not opaque' },
          { id: 'w4', label: 'Manual workarounds are known and catalogued', type: 'binary', polarity: 'positive', weight: 2, helper: 'Shadow processes and patches are visible to operations teams' },
        ]
      },
      {
        id: 'ownership',
        label: 'Operational Ownership',
        factors: [
          { id: 'w5', label: 'Workflow has a named operational owner', type: 'binary', polarity: 'positive', weight: 3, helper: 'Someone is accountable for workflow performance, not just feature delivery' },
          { id: 'w6', label: 'Teams discuss workflows, not just features', type: 'binary', polarity: 'positive', weight: 2, helper: 'Operational thinking is present in planning conversations' },
          { id: 'w7', label: 'Workflow scope is well understood for AI targeting', type: 'binary', polarity: 'positive', weight: 2, helper: 'It\'s clear what a pilot AI workflow would cover' },
        ]
      },
      {
        id: 'quality',
        label: 'Understanding Quality',
        factors: [
          { id: 'w8', label: 'Workflow visibility', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = opaque, tribal knowledge only, 5 = well-mapped with known exceptions' },
          { id: 'w9', label: 'Operational ownership clarity', type: 'scale', polarity: 'positive', weight: 2, min: 1, max: 5, helper: '1 = no clear owner, 5 = named and accountable across all key flows' },
        ]
      }
    ],
    exampleChips: [
      { label: 'Workflow maps exist', type: 'positive' },
      { label: 'Exceptions known', type: 'positive' },
      { label: 'Queues visible', type: 'positive' },
      { label: 'Workarounds catalogued', type: 'positive' },
      { label: 'Workflows tribal only', type: 'negative' },
      { label: 'No operational owner', type: 'negative' },
      { label: 'Features not workflows', type: 'negative' },
    ]
  },

  {
    id: 'data',
    key: 'data',
    title: 'Data Architecture & Accessibility',
    shortTitle: 'Data',
    description: 'Assesses the state of the company\'s data infrastructure: where data lives, how accessible it is, and whether it can support AI reliably.',
    question: 'Is the data required for AI available, reliable, and accessible from managed systems — or is it fragmented and hard to reach?',
    weight: 15,
    factorGroups: [
      {
        id: 'structure',
        label: 'Data Structure & Location',
        factors: [
          { id: 'd1', label: 'Critical records live in managed systems', type: 'binary', polarity: 'positive', weight: 3, helper: 'Core workflow data is in a database or platform, not in files or emails' },
          { id: 'd2', label: 'Core data is heavily spreadsheet-dependent', type: 'binary', polarity: 'constraining', weight: 3, helper: 'Key records exist primarily in Excel, Sheets, or CSV files' },
          { id: 'd3', label: 'Critical records still exist in paper or undigitized form', type: 'binary', polarity: 'constraining', weight: 3, helper: 'Paper-based records introduce significant data accessibility risk' },
          { id: 'd4', label: 'Integration coverage between systems is strong', type: 'binary', polarity: 'positive', weight: 2, helper: 'Key systems pass data between each other reliably' },
        ]
      },
      {
        id: 'quality',
        label: 'Data Quality & Readiness',
        factors: [
          { id: 'd5', label: 'Record completeness', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = significant gaps and missing fields, 5 = complete and consistent' },
          { id: 'd6', label: 'Data freshness and update reliability', type: 'scale', polarity: 'positive', weight: 2, min: 1, max: 5, helper: '1 = stale or unreliable, 5 = real-time or near-real-time' },
          { id: 'd7', label: 'Data labeling or annotation coverage', type: 'scale', polarity: 'positive', weight: 2, min: 1, max: 5, helper: '1 = no labeled data, 5 = rich labeled dataset exists' },
        ]
      },
      {
        id: 'access',
        label: 'Access & Usability',
        factors: [
          { id: 'd8', label: 'Data is accessible to AI/ML tooling without significant engineering work', type: 'binary', polarity: 'positive', weight: 3, helper: 'APIs, pipelines, or connectors exist to reach the data' },
          { id: 'd9', label: 'Data governance and ownership is defined', type: 'binary', polarity: 'positive', weight: 2, helper: 'It\'s clear who owns each dataset and who can authorize access' },
          { id: 'd10', label: 'Privacy or compliance constraints significantly limit data use', type: 'binary', polarity: 'constraining', weight: 2, helper: 'Regulatory or legal constraints block or complicate data access for AI' },
        ]
      }
    ],
    exampleChips: [
      { label: 'Managed systems dominant', type: 'positive' },
      { label: 'Integration coverage strong', type: 'positive' },
      { label: 'Data accessible via API', type: 'positive' },
      { label: 'Records complete', type: 'positive' },
      { label: 'Heavy spreadsheet use', type: 'negative' },
      { label: 'Paper records exist', type: 'negative' },
      { label: 'Compliance limits data', type: 'negative' },
    ]
  },

  {
    id: 'user',
    key: 'user',
    title: 'User Context, Trust & Delivery Fit',
    shortTitle: 'User & Trust',
    description: 'Assesses whether AI can be delivered in the right context, whether users can trust outputs, and whether adoption risk is manageable.',
    question: 'Can AI be delivered where users work, with appropriate trust signals, review mechanisms, and enough adoption readiness?',
    weight: 10,
    factorGroups: [
      {
        id: 'delivery',
        label: 'Delivery Context',
        factors: [
          { id: 'u1', label: 'AI can be delivered inside the user\'s workflow context', type: 'binary', polarity: 'positive', weight: 3, helper: 'AI surfaces where users actually work, not as a separate tool' },
          { id: 'u2', label: 'AI is currently treated like a sidebar or add-on feature', type: 'binary', polarity: 'constraining', weight: 2, helper: 'AI is isolated from core workflows rather than embedded' },
          { id: 'u3', label: 'Users can review, override, or correct AI outputs', type: 'binary', polarity: 'positive', weight: 3, helper: 'Human review is available before downstream action occurs' },
        ]
      },
      {
        id: 'trust',
        label: 'Trust & Explainability',
        factors: [
          { id: 'u4', label: 'AI output explainability can be surfaced to users', type: 'binary', polarity: 'positive', weight: 2, helper: 'Rationale or confidence signals can be shown with outputs' },
          { id: 'u5', label: 'Users have prior experience with AI-assisted tools', type: 'binary', polarity: 'positive', weight: 2, helper: 'Users are not encountering AI for the first time in workflow' },
          { id: 'u6', label: 'Adoption risk', type: 'scale', polarity: 'constraining', weight: 3, min: 1, max: 5, helper: '1 = low risk, users receptive, 5 = high risk, strong resistance expected' },
        ]
      },
      {
        id: 'fit',
        label: 'User & Workflow Fit',
        factors: [
          { id: 'u7', label: 'Trust readiness of user population', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = strong skepticism or dependency concerns, 5 = AI-ready and open' },
          { id: 'u8', label: 'Change management capacity in the organization', type: 'scale', polarity: 'positive', weight: 2, min: 1, max: 5, helper: '1 = low capacity, 5 = structured change management capability' },
        ]
      }
    ],
    exampleChips: [
      { label: 'In-workflow delivery', type: 'positive' },
      { label: 'Review/override available', type: 'positive' },
      { label: 'Explainability possible', type: 'positive' },
      { label: 'Users AI-experienced', type: 'positive' },
      { label: 'AI is a sidebar feature', type: 'negative' },
      { label: 'High adoption risk', type: 'negative' },
      { label: 'Low change capacity', type: 'negative' },
    ]
  },

  {
    id: 'execution',
    key: 'execution',
    title: 'Technical Execution & Talent Capacity',
    shortTitle: 'Execution',
    description: 'Assesses the company\'s internal capability to build, deploy, and operate AI — including engineering talent, platform, and delivery confidence.',
    question: 'Does the company have the engineering talent, platform foundation, and delivery capability to execute AI reliably?',
    weight: 15,
    factorGroups: [
      {
        id: 'talent',
        label: 'Talent & Capability',
        factors: [
          { id: 'e1', label: 'Senior ML or AI engineering capability exists in-house', type: 'binary', polarity: 'positive', weight: 3, helper: 'Staff with ML/AI expertise are available to build and ship' },
          { id: 'e2', label: 'In-house software engineering expertise is strong', type: 'binary', polarity: 'positive', weight: 3, helper: 'Core product engineering quality is high regardless of ML expertise' },
          { id: 'e3', label: 'Delivery depends heavily on external vendors', type: 'binary', polarity: 'constraining', weight: 3, helper: 'Significant AI execution relies on vendors rather than internal teams' },
          { id: 'e4', label: 'AI talent is planned but not yet hired', type: 'binary', polarity: 'constraining', weight: 2, helper: 'Capability gap exists and is not yet closed' },
        ]
      },
      {
        id: 'platform',
        label: 'Platform & Infrastructure',
        factors: [
          { id: 'e5', label: 'Cloud-native platform exists', type: 'binary', polarity: 'positive', weight: 3, helper: 'Product runs on cloud infrastructure suitable for AI workloads' },
          { id: 'e6', label: 'DevOps strength', type: 'scale', polarity: 'positive', weight: 2, min: 1, max: 5, helper: '1 = weak deploy/ops practice, 5 = strong CI/CD, observability, and deployment' },
          { id: 'e7', label: 'Platform readiness for AI integration', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = significant infrastructure work needed, 5 = AI-ready platform' },
        ]
      },
      {
        id: 'delivery',
        label: 'Delivery Confidence',
        factors: [
          { id: 'e8', label: 'AI delivery confidence', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = low confidence in ability to ship, 5 = high confidence in timely delivery' },
          { id: 'e9', label: 'Product management sophistication for AI', type: 'scale', polarity: 'positive', weight: 2, min: 1, max: 5, helper: '1 = PM capability weak for AI use cases, 5 = strong AI PM capability' },
        ]
      }
    ],
    exampleChips: [
      { label: 'ML talent in-house', type: 'positive' },
      { label: 'Cloud-native platform', type: 'positive' },
      { label: 'Strong DevOps', type: 'positive' },
      { label: 'High delivery confidence', type: 'positive' },
      { label: 'Vendor-dependent delivery', type: 'negative' },
      { label: 'AI talent gap', type: 'negative' },
      { label: 'Weak platform', type: 'negative' },
    ]
  },

  {
    id: 'governance',
    key: 'governance',
    title: 'Governance, Risk & Oversight',
    shortTitle: 'Governance',
    description: 'Assesses whether the company has the oversight structures, accountability, and risk frameworks needed to operate AI safely and responsibly.',
    question: 'Is there a credible governance structure for AI outputs — with approval logic, accountability, auditability, and defined failure response?',
    weight: 10,
    factorGroups: [
      {
        id: 'accountability',
        label: 'Accountability & Ownership',
        factors: [
          { id: 'g1', label: 'Clear owner exists for AI output quality', type: 'binary', polarity: 'positive', weight: 3, helper: 'A named person or team is accountable for output correctness' },
          { id: 'g2', label: 'Governance is informal or person-dependent', type: 'binary', polarity: 'constraining', weight: 3, helper: 'Quality depends on specific people\'s vigilance, not systems' },
          { id: 'g3', label: 'Failure response is defined', type: 'binary', polarity: 'positive', weight: 3, helper: 'A process exists for what to do when AI outputs fail or cause errors' },
        ]
      },
      {
        id: 'controls',
        label: 'Controls & Auditability',
        factors: [
          { id: 'g4', label: 'Approval logic for AI actions is defined', type: 'binary', polarity: 'positive', weight: 3, helper: 'There are explicit rules about what AI can do autonomously vs. what requires human approval' },
          { id: 'g5', label: 'AI outputs are auditable', type: 'binary', polarity: 'positive', weight: 3, helper: 'It is possible to trace what AI did and why after the fact' },
          { id: 'g6', label: 'Risk assessment for AI use cases has been completed', type: 'binary', polarity: 'positive', weight: 2, helper: 'Potential harms and failure modes have been explicitly assessed' },
        ]
      },
      {
        id: 'maturity',
        label: 'Governance Maturity',
        factors: [
          { id: 'g7', label: 'Approval logic maturity', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = ad hoc, 5 = structured and codified approval rules' },
          { id: 'g8', label: 'Overall governance maturity', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = minimal governance, 5 = mature governance framework in place' },
        ]
      }
    ],
    exampleChips: [
      { label: 'Named output owner', type: 'positive' },
      { label: 'Approval logic defined', type: 'positive' },
      { label: 'Outputs auditable', type: 'positive' },
      { label: 'Failure response set', type: 'positive' },
      { label: 'Informal governance', type: 'negative' },
      { label: 'No audit trail', type: 'negative' },
      { label: 'No risk assessment', type: 'negative' },
    ]
  },

  {
    id: 'measurement',
    key: 'measurement',
    title: 'Measurement & Value Capture',
    shortTitle: 'Measurement',
    description: 'Assesses whether the company has baseline metrics, instrumentation, and an economic model to measure and capture AI value.',
    question: 'Are there baseline metrics, defined KPIs, and a credible economic model to evaluate whether AI is creating value?',
    weight: 10,
    factorGroups: [
      {
        id: 'baselines',
        label: 'Baselines & Metrics',
        factors: [
          { id: 'm1', label: 'Baseline metrics for key workflows exist', type: 'binary', polarity: 'positive', weight: 3, helper: 'Current state performance is measured and known' },
          { id: 'm2', label: 'Workflow KPIs are defined and tracked', type: 'binary', polarity: 'positive', weight: 3, helper: 'Specific metrics for workflow performance exist and are reported' },
          { id: 'm3', label: 'Expected value from AI is still vague', type: 'binary', polarity: 'constraining', weight: 2, helper: 'No clear model for what AI should deliver economically' },
        ]
      },
      {
        id: 'model',
        label: 'Economic Model',
        factors: [
          { id: 'm4', label: 'An economic model for AI value exists', type: 'binary', polarity: 'positive', weight: 3, helper: 'A model connects AI output to business value in revenue, cost, or efficiency terms' },
          { id: 'm5', label: 'Measurement and instrumentation is in place', type: 'binary', polarity: 'positive', weight: 2, helper: 'Tooling to track AI performance metrics is already deployed' },
        ]
      },
      {
        id: 'quality',
        label: 'Measurement Quality',
        factors: [
          { id: 'm6', label: 'Instrumentation quality', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = no instrumentation, 5 = robust metrics pipeline in place' },
          { id: 'm7', label: 'Value capture clarity', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = value is abstract and undefined, 5 = clear model with measurable targets' },
        ]
      }
    ],
    exampleChips: [
      { label: 'Baselines measured', type: 'positive' },
      { label: 'KPIs defined', type: 'positive' },
      { label: 'Economic model exists', type: 'positive' },
      { label: 'Instrumented already', type: 'positive' },
      { label: 'No baseline metrics', type: 'negative' },
      { label: 'Value still vague', type: 'negative' },
      { label: 'No instrumentation', type: 'negative' },
    ]
  },

  {
    id: 'sora',
    key: 'sora',
    title: 'System of Record → System of Action',
    shortTitle: 'SoR → SoA',
    description: 'Assesses where the company sits on the progression from storing data passively to executing actions based on AI judgment.',
    question: 'Has the product moved beyond storing and surfacing data toward enabling AI-assisted or AI-driven actions in workflow?',
    weight: 10,
    factorGroups: [
      {
        id: 'current',
        label: 'Current Position',
        factors: [
          { id: 's1', label: 'Product is still predominantly a system of record', type: 'binary', polarity: 'constraining', weight: 2, helper: 'Primary value is data storage and retrieval, not action or intelligence' },
          { id: 's2', label: 'Insight features already exist in the product', type: 'binary', polarity: 'positive', weight: 2, helper: 'Analytics, reporting, or dashboards are already present' },
          { id: 's3', label: 'Assistive AI is technically and contextually realistic', type: 'binary', polarity: 'positive', weight: 3, helper: 'Suggestions, drafts, or assistive recommendations are feasible now' },
          { id: 's4', label: 'Bounded action execution is architecturally possible', type: 'binary', polarity: 'positive', weight: 3, helper: 'The product can write back to systems, trigger workflows, or take bounded actions' },
        ]
      },
      {
        id: 'readiness',
        label: 'Action Readiness',
        factors: [
          { id: 's5', label: 'SoR to SoA progression stage', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = pure record keeping, 5 = action-capable with bounded autonomy' },
          { id: 's6', label: 'Product architecture supports AI action pathways', type: 'scale', polarity: 'positive', weight: 3, min: 1, max: 5, helper: '1 = significant rebuild required, 5 = action-ready architecture exists' },
          { id: 's7', label: 'User expectation for AI action vs. AI assist', type: 'scale', polarity: 'positive', weight: 2, min: 1, max: 5, helper: '1 = users expect pure assist only, 5 = users expect and welcome action outputs' },
        ]
      }
    ],
    exampleChips: [
      { label: 'Insight features exist', type: 'positive' },
      { label: 'Assistive AI feasible', type: 'positive' },
      { label: 'Bounded action possible', type: 'positive' },
      { label: 'Action-ready architecture', type: 'positive' },
      { label: 'Pure system of record', type: 'negative' },
      { label: 'Major rebuild required', type: 'negative' },
      { label: 'Users expect assist only', type: 'neutral' },
    ]
  }
]

export const SECTION_MAP = Object.fromEntries(DIAGNOSTICS.map(d => [d.id, d]))
