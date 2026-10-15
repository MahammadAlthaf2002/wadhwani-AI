export type DomainCategory = 'all' | 'healthcare' | 'agriculture' | 'governance' | 'education';

export interface Solution {
  id: string;
  domain: 'healthcare' | 'agriculture' | 'governance' | 'education';
  title: string;
  titleHi: string;
  tagline: string;
  taglineHi: string;
  description: string;
  impactMetrics: { label: string; value: string }[];
  partners: string[];
  keyFeatures: string[];
  readinessLevel: string;
  image: string;
  demoType?: 'pest' | 'cough' | 'anthropometry' | 'surveillance';
}

export interface ImpactStory {
  id: string;
  title: string;
  location: string;
  state: string;
  domain: string;
  summary: string;
  beneficiaryQuote: string;
  quoteAuthor: string;
  stats: { before: string; after: string; metric: string };
  image: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  domain: string;
  abstract: string;
  citations: number;
  pdfUrl: string;
  tags: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
}

export interface EventProgram {
  id: string;
  title: string;
  date: string;
  venue: string;
  tier: 'Tier 1 (Flagship)' | 'Tier 2 (Roundtable)' | 'Tier 3 (Symposium)';
  status: 'Upcoming' | 'Live' | 'Completed';
  description: string;
  speakers: { name: string; title: string; org: string; avatar: string }[];
  agenda: { time: string; topic: string; speaker: string }[];
}

export interface RfqBidSubmission {
  id: string;
  agencyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  categories: string[];
  yearsExperience: number;
  turnoverRange: string;
  enclosuresSubmitted: {
    companyProfile: boolean;
    clientReferences: boolean;
    workOrders: boolean;
    gstRegistration: boolean;
    panTan: boolean;
    msmeCert: boolean;
    auditedFinancials: boolean;
    itrLast3Years: boolean;
    cancelledCheque: boolean;
    registrationDoc: boolean;
  };
  technicalProposalName: string;
  financialQuotationTotal: number;
  submittedAt: string;
  status: 'Received' | 'Under Technical Evaluation' | 'Shortlisted' | 'Archived';
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  resumeFileName: string;
  coverNote: string;
  appliedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  source: string;
  summary: string;
  readTime: string;
  linkText?: string;
}
