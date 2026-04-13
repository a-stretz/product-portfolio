// src/data/diagnostics.ts

export interface DiagnosticSection {
  id: string;
  key: string;
  title: string;
  shortTitle: string;
  description: string;
  coreQuestion: string;
  weight: number; // out of 100 total
  order: number;
  icon: string; // emoji for prototype
}

export const DIAGNOSTICS: DiagnosticSection[] = [
  {
    id: "diag-leadership",
    key: "leadership",
    title: "Leadership & AI Strategy Clarity",
    shortTitle: "Leadership",
    description:
      "Evaluates whether executive leadership has a clear, owned AI strategy with defined priorities, success criteria, and organizational commitment beyond reactive market pressure.",
    coreQuestion:
      "Does leadership have a clear, owned AI thesis with defined priorities and success logic?",
    weight: 15,
    order: 1,
    icon: "🎯",
  },
  {
    id: "diag-workflow",
    key: "workflow",
    title: "Workflow Understanding & Operational Ownership",
    shortTitle: "Workflow",
    description:
      "Assesses the organization's understanding of its own operational workflows — whether processes are mapped, exceptions are known, handoffs are visible, and ownership is clear.",
    coreQuestion:
      "Are core workflows mapped, understood, and owned well enough to identify where AI creates real value?",
    weight: 15,
    order: 2,
    icon: "⚙️",
  },
  {
    id: "diag-data",
    key: "data",
    title: "Data Architecture & Accessibility",
    shortTitle: "Data",
    description:
      "Evaluates whether the organization's data is structured, accessible, governed, and integration-ready — or whether it remains siloed, manual, and unreliable.",
    coreQuestion:
      "Is the data architecture structured and accessible enough to support AI-driven workflows?",
    weight: 15,
    order: 3,
    icon: "🗄️",
  },
  {
    id: "diag-user",
    key: "user",
    title: "User Context, Trust & Delivery Fit",
    shortTitle: "User & Trust",
    description:
      "Assesses whether AI can be delivered in a way that fits user workflows, builds trust, supports review and override, and avoids adoption friction.",
    coreQuestion:
      "Can AI be delivered in a way users trust, review, and actually adopt within their workflow?",
    weight: 10,
    order: 4,
    icon: "🤝",
  },
  {
    id: "diag-execution",
    key: "execution",
    title: "Technical Execution & Talent Capacity",
    shortTitle: "Execution",
    description:
      "Evaluates the organization's technical ability to build, deploy, and maintain AI systems — including in-house talent, infrastructure, and vendor dependency.",
    coreQuestion:
      "Does the organization have the technical talent, infrastructure, and delivery capacity to execute AI initiatives?",
    weight: 15,
    order: 5,
    icon: "🔧",
  },
  {
    id: "diag-governance",
    key: "governance",
    title: "Governance, Risk & Oversight",
    shortTitle: "Governance",
    description:
      "Assesses whether governance structures exist to manage AI outputs — including accountability, auditability, approval logic, failure response, and regulatory alignment.",
    coreQuestion:
      "Are governance structures in place to ensure AI outputs are accountable, auditable, and safe?",
    weight: 10,
    order: 6,
    icon: "🛡️",
  },
  {
    id: "diag-measurement",
    key: "measurement",
    title: "Measurement & Value Capture",
    shortTitle: "Measurement",
    description:
      "Evaluates whether the organization can measure AI impact — including baseline metrics, workflow KPIs, economic models, and value attribution clarity.",
    coreQuestion:
      "Can the organization measure, attribute, and capture the value AI creates?",
    weight: 10,
    order: 7,
    icon: "📊",
  },
  {
    id: "diag-sor-soa",
    key: "sor_soa",
    title: "System of Record → System of Action Progression",
    shortTitle: "SoR → SoA",
    description:
      "Assesses where the organization sits on the progression from static record-keeping to insight generation to assistive AI to bounded autonomous action.",
    coreQuestion:
      "Where does the product sit on the progression from passive records to AI-driven action, and is the next step realistic?",
    weight: 10,
    order: 8,
    icon: "🔄",
  },
];
