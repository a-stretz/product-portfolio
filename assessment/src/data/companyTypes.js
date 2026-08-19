export const COMPANY_TYPES = [
  {
    id: 'b2b_saas',
    label: 'B2B SaaS',
    description: 'Software-as-a-service companies selling to business customers',
    emphasis: 'Embed AI in product to drive activation, retention, and expansion. Focus on workflow integration and measurable ROI.',
    dataProfile: 'Typically has structured customer data but may face multi-tenant data isolation challenges.',
    talentProfile: 'Usually has strong engineering; ML/AI specialization may be a gap.',
  },
  {
    id: 'vertical_software',
    label: 'Vertical Software',
    description: 'Domain-specific software for a particular industry or sector',
    emphasis: 'Deep workflow understanding is the key differentiator. AI must fit complex, compliance-sensitive workflows.',
    dataProfile: 'Often has rich domain-specific data but governance and compliance constraints are high.',
    talentProfile: 'Domain expertise is strong; ML talent may be thin.',
  },
  {
    id: 'ai_native',
    label: 'AI Native',
    description: 'Companies built from the ground up around AI capabilities',
    emphasis: 'The challenge is governance, value capture, and workflow depth — not execution. Operationalizing and scaling responsibly.',
    dataProfile: 'Likely has modern data infrastructure; focus is on quality, labeling, and bias controls.',
    talentProfile: 'AI talent is strong; the gap may be in product and operational depth.',
  },
  {
    id: 'services_plus_software',
    label: 'Services + Software',
    description: 'Companies that combine a services business with software products',
    emphasis: 'AI must serve both the software product and the services delivery. Workflow design complexity is high.',
    dataProfile: 'Data often lives across services delivery and software; integration is typically a challenge.',
    talentProfile: 'Services expertise is high; software and AI talent may need reinforcement.',
  }
]

export const COMPANY_TYPE_MAP = Object.fromEntries(COMPANY_TYPES.map(t => [t.id, t]))
