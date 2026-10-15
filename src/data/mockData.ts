import { Solution, ImpactStory, ResearchPaper, JobOpening, EventProgram, NewsItem } from '../types';

export const SOLUTIONS: Solution[] = [
  {
    id: 'health-tb',
    domain: 'healthcare',
    title: 'AI for Tuberculosis Screening & Triaging',
    titleHi: 'तपेदिक (टीबी) स्क्रीनिंग एवं ट्रायजिंग हेतु एआई',
    tagline: 'Acoustic cough analysis and digital chest X-ray screening for hard-to-reach populations.',
    taglineHi: 'दुर्गम क्षेत्रों में खाँसी ध्वनि विश्लेषण एवं डिजिटल चेस्ट एक्स-रे स्क्रीनिंग।',
    description:
      'Developed in partnership with the Central TB Division (MoHFW) and ICMR, our deep learning models analyze smartphone cough audio recordings and digital chest X-rays to triage presumptive TB patients in under 60 seconds with 93.4% sensitivity.',
    impactMetrics: [
      { label: 'Screenings Conducted', value: '2.4M+' },
      { label: 'Diagnostic Sensitivity', value: '93.4%' },
      { label: 'Time Saved per Patient', value: '4.5 Days' },
      { label: 'Public Health Centers', value: '1,840' },
    ],
    partners: ['Central TB Division (MoHFW)', 'ICMR', 'USAID', 'Bill & Melinda Gates Foundation'],
    keyFeatures: [
      'Edge AI processing on low-cost Android smartphones without internet requirement',
      'Instant risk classification (High, Medium, Low) with automated referral pathway',
      'Integration with Nikshay national portal for seamless patient tracking',
      'Compliant with WHO target product profile for TB triage',
    ],
    readinessLevel: 'National Program Scale (TRL 9)',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    demoType: 'cough',
  },
  {
    id: 'health-mch',
    domain: 'healthcare',
    title: 'Smartphone Anthropometry for Infant Nutrition',
    titleHi: 'शिशु पोषण एवं वृद्धि निगरानी हेतु स्मार्टफोन एंथ्रोपोमेट्री',
    tagline: 'Computer vision measurement of infant length, weight, and stunting risk using mobile cameras.',
    taglineHi: 'मोबाइल कैमरे से शिशु की लंबाई, वजन और कुपोषण जोखिम का त्वरित कंप्यूटर विजन मापन।',
    description:
      'Replacing heavy, inaccurate hanging spring balances and infantometers, this solution empowers Anganwadi workers to capture sub-centimeter infant measurements via 3D computer vision video scans in under 15 seconds.',
    impactMetrics: [
      { label: 'Infants Monitored', value: '1.8M+' },
      { label: 'Measurement Accuracy', value: '± 0.7 cm' },
      { label: 'Wasting Detection Gain', value: '+42%' },
      { label: 'Anganwadi Workers', value: '45,000+' },
    ],
    partners: ['Ministry of Women & Child Development', 'State Health Missions (UP & Bihar)', 'UNICEF'],
    keyFeatures: [
      'Single-camera 3D pose estimation calibrated against standard infant mat',
      'Instant WHO z-score calculation for Stunting (HAZ) and Wasting (WHZ)',
      'Offline-first capability tailored for rural connectivity challenges',
      'Visual guidance assisting frontline workers to position infants safely',
    ],
    readinessLevel: 'Multi-State Deployment (TRL 8)',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    demoType: 'anthropometry',
  },
  {
    id: 'agri-cottonace',
    domain: 'agriculture',
    title: 'CottonAce: AI Pest Surveillance & Action Advisory',
    titleHi: 'कॉटनऐस: एआई कीट निगरानी एवं किसान परामर्श',
    tagline: 'Real-time pest detection from insect trap photos helping smallholder farmers minimize crop loss.',
    taglineHi: 'फेरोमोन ट्रैप फोटो से कीटों की पहचान कर छोटे किसानों कीटनाशक लागत 30% तक कम करता है।',
    description:
      'CottonAce empowers smallholder farmers to capture photos of pheromone traps using basic smartphones. Our computer vision model counts and identifies Pink Bollworm, American Bollworm, and Spodoptera, delivering localized pesticide spray advisories.',
    impactMetrics: [
      { label: 'Active Farmers', value: '4.2M+' },
      { label: 'Crop Loss Reduction', value: '28%' },
      { label: 'Chemical Spray Savings', value: '₹3,500/acre' },
      { label: 'Cotton Districts', value: '64' },
    ],
    partners: ['Ministry of Agriculture & Farmers Welfare', 'State Agriculture Departments (MH, TS, GJ)', 'Google.org'],
    keyFeatures: [
      'Multi-class insect classification trained on 800,000+ field-annotated photos',
      'Works in 10 regional Indian languages with audio read-aloud advisories',
      'Real-time heatmaps for district-level agricultural extension officers',
      'Weather-integrated spray window recommendations to prevent chemical runoff',
    ],
    readinessLevel: 'National Program Scale (TRL 9)',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
    demoType: 'pest',
  },
  {
    id: 'health-surveillance',
    domain: 'healthcare',
    title: 'Integrated Disease Outbreak Surveillance AI',
    titleHi: 'एकीकृत रोग प्रकोप निगरानी एवं पूर्व चेतावनी एआई',
    tagline: 'Machine learning anomaly detection over syndromic health records for early epidemic warnings.',
    taglineHi: 'महामारी के शुरुआती संकेतों का पता लगाने हेतु सिंड्रोमिक स्वास्थ्य डेटा का एमएल विश्लेषण।',
    description:
      'Detecting infectious disease clusters before they escalate into full-scale outbreaks. By aggregating syndromic records from primary health centers, pharmacy sales, and hotline calls, our temporal graph neural network flags atypical disease spikes up to 14 days earlier.',
    impactMetrics: [
      { label: 'Outbreak Early Warnings', value: '180+' },
      { label: 'Lead Time Gain', value: '10–14 Days' },
      { label: 'Districts Monitored', value: '128' },
      { label: 'False Alarm Rate', value: '< 4.2%' },
    ],
    partners: ['Integrated Disease Surveillance Programme (IDSP)', 'State Epidemiological Units'],
    keyFeatures: [
      'Temporal spatial graph neural networks capturing contagion diffusion',
      'Automated district-level epidemiologist alert bulletins',
      'Multi-source telemetry (OPD logs, laboratory tests, fever registries)',
      'Data anonymization protocol preserving patient privacy by design',
    ],
    readinessLevel: 'State-Level Pilots (TRL 7)',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=80',
    demoType: 'surveillance',
  },
  {
    id: 'gov-grievance',
    domain: 'governance',
    title: 'Citizen Grievance Classification & SLA Triaging',
    titleHi: 'नागरिक शिकायत वर्गीकरण एवं त्वरित निवारण एआई',
    tagline: 'NLP pipeline categorizing and routing public grievances across hundreds of municipal departments.',
    taglineHi: 'नागरिक शिकायतों को समझकर संबंधित सरकारी विभाग को स्वचालित रूप से अग्रेषित करना।',
    description:
      'Large language models fine-tuned on Indic vernaculars analyze citizen letters, WhatsApp messages, and portal petitions, extracting urgency, government department, and jurisdiction in real time to cut bureaucratic routing bottlenecks.',
    impactMetrics: [
      { label: 'Petitions Processed', value: '6.5M+' },
      { label: 'Routing Accuracy', value: '96.2%' },
      { label: 'Resolution Speed Up', value: '3.8x' },
      { label: 'Languages Supported', value: '14 Indic' },
    ],
    partners: ['Department of Administrative Reforms & Public Grievances (DARPG)', 'State CM Portals'],
    keyFeatures: [
      'Indic-BERT transformer models trained on multilingual citizen phrasing',
      'Urgency sentiment scoring highlighting critical public hazard alerts',
      'Automated deduplication of repetitive community complaints',
      'Transparent audit trail adhering to state public service delivery acts',
    ],
    readinessLevel: 'Production Deployed (TRL 8)',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'edu-vernacular',
    domain: 'education',
    title: 'Vernacular AI Foundational Literacy & Speech Tutor',
    titleHi: 'मातृभाषा एआई प्राथमिक साक्षरता एवं मौखिक पठन शिक्षक',
    tagline: 'Acoustic phonetic evaluation enabling early-grade children to practice reading in native dialects.',
    taglineHi: 'ध्वन्यात्मक मूल्यांकन जिससे ग्रामीण बच्चे अपनी स्थानीय भाषा में पढ़ने का सहज अभ्यास करते हैं।',
    description:
      'In alignment with the NIPUN Bharat Mission, our speech AI listens to primary school students reading aloud in Hindi, Marathi, Telugu, and Kannada, providing real-time feedback on pronunciation, fluency, and word recognition.',
    impactMetrics: [
      { label: 'Students Assessed', value: '950,000+' },
      { label: 'Reading Fluency Gain', value: '+34%' },
      { label: 'Govt Schools Covered', value: '8,200' },
      { label: 'Native Dialects', value: '10' },
    ],
    partners: ['NIPUN Bharat Mission', 'State Councils of Educational Research and Training (SCERT)'],
    keyFeatures: [
      'Low-resource dialect acoustic models robust against classroom noise',
      'Interactive gamified storybooks with instant phoneme correction',
      'Continuous diagnostic dashboards for district block education officers',
      'Works seamlessly on ₹6,000 government-distributed tablets',
    ],
    readinessLevel: 'Active Deployments (TRL 8)',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  },
];

export const IMPACT_STORIES: ImpactStory[] = [
  {
    id: 'story-1',
    title: 'Eliminating Pest Damage in Maharashtra’s Cotton Heartland',
    location: 'Yavatmal District',
    state: 'Maharashtra',
    domain: 'Agriculture',
    summary:
      'Smallholder farmer Rameshwar Rathod used to spray toxic pesticides 12 times a season on speculation. With CottonAce AI image alerts, he applied targeted organic controls only twice, tripling his net household profit.',
    beneficiaryQuote:
      '“Earlier we would spend half our earnings on sprays before even knowing what insect was in the trap. Now the app tells us within 10 seconds whether bollworm is present and what exact medicine is needed. It saved my family from debt.”',
    quoteAuthor: 'Rameshwar Rathod, Cotton Farmer, Yavatmal',
    stats: {
      before: '12 Sprays/Yr',
      after: '3 Sprays/Yr',
      metric: 'Pesticide Input Cost: -65%',
    },
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'story-2',
    title: 'Catching Silent Pediatric Malnutrition in Remote UP Villages',
    location: 'Barabanki District',
    state: 'Uttar Pradesh',
    domain: 'Healthcare',
    summary:
      'Anganwadi worker Sunita Devi struggled with rusted hanging scales that frightened crying infants. Using smartphone anthropometry, she accurately flagged 14 severely acute malnourished children within 3 days.',
    beneficiaryQuote:
      '“Babies would wiggle and cry on the old spring scale, leading to errors. With the phone camera, I just hold it over the mat for 5 seconds and it automatically records weight and stunting status accurately.”',
    quoteAuthor: 'Sunita Devi, Anganwadi Lead, Barabanki',
    stats: {
      before: '35% Missed',
      after: '94% Detected',
      metric: 'SAM Child Detection Rate: +59%',
    },
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'story-3',
    title: 'Reaching Tribal Hamlets with AI Cough Acoustic Triaging',
    location: 'Koraput District',
    state: 'Odisha',
    domain: 'Healthcare',
    summary:
      'In forested tribal highlands where the nearest X-ray lab was 65 km away, community mobile health vans equipped with AI cough triaging screened 18,000 residents in 6 weeks, diagnosing 310 previously hidden TB patients.',
    beneficiaryQuote:
      '“People in these remote hills ignored their chronic cough because traveling to town meant losing daily wages. Our frontline teams screened them right in the weekly market.”',
    quoteAuthor: 'Dr. Debabrata Jena, District TB Officer, Odisha',
    stats: {
      before: '21 Days Delay',
      after: 'Same-Day Triage',
      metric: 'Diagnosis Turnaround: -95%',
    },
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  },
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'Acoustic Cough Biomarkers for Pulmonary Tuberculosis Screening in Resource-Constrained Primary Care',
    authors: ['P. Deshmukh', 'A. K. Sharma', 'R. Sengupta', 'V. Natarajan', 'M. Wadhwani'],
    venue: 'The Lancet Digital Health (Vol 6, Issue 4)',
    year: 2026,
    domain: 'Healthcare',
    abstract:
      'We evaluate a lightweight deep convolutional neural network operating on mel-frequency cepstral coefficients of voluntary cough sounds collected across 14,200 subjects in Indian district hospitals. The model achieves 93.4% sensitivity and 84.1% specificity against GeneXpert microbiological confirmation.',
    citations: 142,
    pdfUrl: '#',
    tags: ['Acoustic AI', 'Tuberculosis', 'Edge Inference', 'Primary Care'],
  },
  {
    id: 'paper-2',
    title: 'Monocular 3D Pose and Surface Reconstruction for Infant Anthropometry under Unconstrained Field Conditions',
    authors: ['S. Iyer', 'K. Verma', 'T. Roy', 'N. Balasubramanian'],
    venue: 'IEEE Conference on Computer Vision and Pattern Recognition (CVPR)',
    year: 2025,
    domain: 'Healthcare',
    abstract:
      'Accurate child growth monitoring is pivotal for combating malnutrition. We introduce a robust landmark regression architecture trained on synthetic deformable infant meshes and validated against laser scanning ground truth, maintaining sub-centimeter error without depth sensors.',
    citations: 89,
    pdfUrl: '#',
    tags: ['Computer Vision', 'Anthropometry', 'Maternal Child Health', 'WHO Z-Score'],
  },
  {
    id: 'paper-3',
    title: 'Edge-Optimized Pest Counting from Low-Resolution Pheromone Traps via Deformable Attention Networks',
    authors: ['R. Kulkarni', 'P. Patil', 'M. Venkatesh', 'A. Bansal'],
    venue: 'NeurIPS Workshop on AI for Agriculture and Climate Impact',
    year: 2025,
    domain: 'Agriculture',
    abstract:
      'Smallholder farmers capture trap images under harsh sunlight and varying angles. Our deformable attention detector segregates clustered and damaged Pink Bollworm specimens on noisy glue boards with 96.8% mean average precision while running in 120ms on a ₹7,000 Android smartphone.',
    citations: 78,
    pdfUrl: '#',
    tags: ['Edge AI', 'Object Detection', 'Smallholder Agriculture', 'CottonAce'],
  },
  {
    id: 'paper-4',
    title: 'Spatial-Temporal Graph Diffusion for Syndromic Outbreak Early Detection in Decentralized Health Systems',
    authors: ['G. Nair', 'S. Bhattacharya', 'H. Chawla', 'E. Mukherjee'],
    venue: 'Nature Communications Medicine',
    year: 2026,
    domain: 'Governance & Public Health',
    abstract:
      'Early containment of infectious outbreaks requires modeling non-linear inter-district transit networks. We present a dynamic graph neural network integrating primary health clinic symptom registries and weather forecasts to predict outbreak surges 10-14 days in advance.',
    citations: 110,
    pdfUrl: '#',
    tags: ['Graph Neural Networks', 'Epidemic Forecasting', 'Public Health', 'IDSP'],
  },
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior AI Research Scientist (Computer Vision & Medical Imaging)',
    department: 'AI Research Division',
    location: 'Bengaluru / New Delhi (Hybrid)',
    type: 'Full-time',
    experience: '5+ Years / Ph.D. Preferred',
    summary:
      'Lead algorithmic research on edge-deployable computer vision models for medical diagnostics and infant anthropometry. You will interface directly with clinical partners at ICMR and international health organizations.',
    responsibilities: [
      'Design and validate state-of-the-art vision and acoustic neural network architectures.',
      'Publish novel research at top-tier conferences (CVPR, NeurIPS, MICCAI, Lancet).',
      'Collaborate with edge optimization engineers to compress models for low-end mobile devices.',
      'Mentor junior ML researchers and collaborate with clinical evaluation teams.',
    ],
    qualifications: [
      'Ph.D. or Master’s in Computer Science, AI, Biomedical Engineering, or equivalent.',
      'Strong publication track record in computer vision or medical AI.',
      'Expert proficiency in PyTorch, TensorRT, ONNX, and deep learning math.',
      'Passion for social impact and deploying AI for underserved populations.',
    ],
  },
  {
    id: 'job-2',
    title: 'Staff Full-Stack & Systems Engineer (Public Digital Infrastructure)',
    department: 'Engineering & Platform',
    location: 'New Delhi / Bengaluru',
    type: 'Full-time',
    experience: '6+ Years',
    summary:
      'Architect highly resilient, secure, and accessible cloud backend and mobile interfaces serving millions of health workers and smallholder farmers across 32 states.',
    responsibilities: [
      'Architect microservices handling millions of daily inference requests with sub-second latency.',
      'Implement strict data privacy standards (DPDP Act, GDPR, HIPAA compliance).',
      'Optimize mobile front-ends for offline synchronization in low-connectivity areas.',
      'Lead CI/CD pipelines, automated load testing, and container orchestration.',
    ],
    qualifications: [
      'B.Tech / M.Tech in CS or related discipline.',
      'Deep expertise in TypeScript, React, Node.js, Go/Python, PostgreSQL, and Redis.',
      'Demonstrated experience building mission-critical public scale software.',
      'Strong commitment to web accessibility (WCAG 2.1 AA) and security audits.',
    ],
  },
  {
    id: 'job-3',
    title: 'Technical Program Manager (Government & Field Deployments)',
    department: 'Program Management',
    location: 'New Delhi (Lajpat Nagar)',
    type: 'Full-time',
    experience: '4+ Years',
    summary:
      'Bridge the gap between AI development teams, state health secretariats, and frontline ground workers. You will steer large-scale pilot rollout, training, and SLA compliance.',
    responsibilities: [
      'Liaise with State Health Missions, Central Ministries, and NGO partners.',
      'Formulate pilot rollout roadmaps, milestone tracking, and stakeholder sign-offs.',
      'Coordinate field training programs for Anganwadi and ASHA frontline health workers.',
      'Track deliverable KPIs, uptime metrics, and provide executive status reports.',
    ],
    qualifications: [
      'Background in Technology, Public Policy, or Public Health management.',
      'Experience working with Indian government ministries or international NGOs.',
      'Exceptional bilingual communication skills in English and Hindi.',
      'Willingness to travel for field visits and partner workshops.',
    ],
  },
  {
    id: 'job-4',
    title: 'Lead Visual Storyteller & Multimedia Content Producer',
    department: 'Communications & Outreach',
    location: 'New Delhi',
    type: 'Full-time',
    experience: '5+ Years',
    summary:
      'Translate complex AI science and field outcomes into deeply touching human stories, documentary shorts, infographic briefs, and WhatsApp-ready content for diverse audiences.',
    responsibilities: [
      'Conceptualize and direct field documentary shoots with farmers, doctors, and rural mothers.',
      'Create high-end visual presentations, policy briefs, and social media campaigns.',
      'Coordinate with external empanelled vendors across video production and design.',
      'Manage brand consistency across all print, digital, and stage convenings.',
    ],
    qualifications: [
      'Proven portfolio in documentary filmmaking, design direction, or journalism.',
      'Fluency in Adobe Creative Suite, DaVinci Resolve, and modern visual tools.',
      'Deep empathy for grassroots communities and non-profit communications.',
      'Demonstrated track record working within mission-driven organizations.',
    ],
  },
];

export const UPCOMING_EVENTS: EventProgram[] = [
  {
    id: 'summit-2027',
    title: 'Global Summit on AI for Social Impact 2027 (WIAI Annual Flagship)',
    date: 'April 22–24, 2027',
    venue: 'Vigyan Bhawan, New Delhi & Hybrid Livestream',
    tier: 'Tier 1 (Flagship)',
    status: 'Upcoming',
    description:
      'The premier global convening uniting 600+ world leaders, ministers, philanthropic foundations, and AI pioneers to define the future of artificial intelligence for public good in the Global South.',
    speakers: [
      {
        name: 'Dr. V. K. Paul',
        title: 'Member (Health)',
        org: 'NITI Aayog, Government of India',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Prof. Manindra Agrawal',
        title: 'Director',
        org: 'Indian Institute of Technology Kanpur',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Dr. Soumya Swaminathan',
        title: 'Former Chief Scientist',
        org: 'World Health Organization (WHO)',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Romesh Wadhwani',
        title: 'Founder & Chairman',
        org: 'Wadhwani Foundation & Wadhwani AI',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      },
    ],
    agenda: [
      { time: '09:30 - 10:45 AM', topic: 'Inaugural Address: Scaling AI from Lab to Last Mile in India', speaker: 'Cabinet Ministers & Founders' },
      { time: '11:15 - 01:00 PM', topic: 'Plenary Track: Primary Healthcare AI Deployments at 50M+ Scale', speaker: 'MoHFW, ICMR & Wadhwani AI Health Leads' },
      { time: '02:00 - 03:30 PM', topic: 'Interactive Showcase: Live Demo of Edge AI Models on Field Devices', speaker: 'AI Research & Engineering Team' },
      { time: '04:00 - 05:30 PM', topic: 'Ministerial & Philanthropic Roundtable: Financing Public Digital Goods', speaker: 'Global Foundations & Multilaterals' },
    ],
  },
  {
    id: 'roundtable-health',
    title: 'National Roundtable: Accelerating TB Eradication with Cough Sound AI',
    date: 'May 14, 2027',
    venue: 'India Habitat Centre, Lodhi Road, New Delhi',
    tier: 'Tier 2 (Roundtable)',
    status: 'Upcoming',
    description:
      'A focused 40-expert working session with state TB control officers, chest physicians, and public health researchers to institutionalize acoustic triaging protocols into national clinical guidelines.',
    speakers: [
      {
        name: 'Dr. Raghuram Rao',
        title: 'Deputy Director General (TB)',
        org: 'Central TB Division, MoHFW',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Dr. Anurag Agrawal',
        title: 'Dean, BioSciences & Health Research',
        org: 'Ashoka University & Former CSIR-IGIB',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
      },
    ],
    agenda: [
      { time: '10:00 - 11:30 AM', topic: 'Field Evidence Review: 2.4M Cough Screenings across 4 States', speaker: 'Principal Investigators' },
      { time: '11:45 - 01:15 PM', topic: 'Standard Operating Procedures for ASHA & ANM Integration', speaker: 'State Mission Directors' },
      { time: '02:15 - 04:00 PM', topic: 'Policy Action Plan & Nikshay API Integration Roadmap', speaker: 'Technical Working Group' },
    ],
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Wadhwani AI and Ministry of Health Expand AI-Assisted TB Screening to 1,000 More Primary Health Centers',
    category: 'Partnership & Deployment',
    date: 'October 8, 2026',
    source: 'National Press Release',
    summary:
      'Under the leadership of the Central TB Division, frontline health workers across six states will receive handheld acoustic AI tools to accelerate early diagnosis in high-burden districts.',
    readTime: '3 min read',
  },
  {
    id: 'news-2',
    title: 'CottonAce Named Best Social Good AI Solution at Global Agriculture Innovation Forum',
    category: 'Award & Recognition',
    date: 'September 22, 2026',
    source: 'AgriTech Global Wire',
    summary:
      'The computer-vision pest management system was recognized for saving over ₹3,500 per acre in pesticide costs across 4 million smallholder cotton farmers in India.',
    readTime: '4 min read',
  },
  {
    id: 'news-3',
    title: 'Research Spotlight: How Edge-AI Smartphone Anthropometry Eliminates Measurement Error in Rural Anganwadis',
    category: 'Research & Science',
    date: 'August 19, 2026',
    source: 'Wadhwani AI Science Blog',
    summary:
      'A deep dive into our single-camera 3D reconstruction pipeline that measures infant length and weight with sub-centimeter accuracy, peer-reviewed in IEEE CVPR.',
    readTime: '6 min read',
  },
];

export const RFP_DETAILS = {
  rfpTitle: 'REQUEST FOR PROPOSAL (RFP) – Empanelment of Vendors',
  subtitle: 'Website, Digital Promotions, Event & Creative Content Services',
  organization: 'LEHS (Lords Education & Health Society) / Wadhwani AI',
  closingDate: '1 December 2026, 23:59 IST',
  termCommencing: 'April 2027',
  headOffice: '70, Ring Road, 2nd Floor, Lajpat Nagar - III, New Delhi - 110024, India',
  registrationNo: 'S/47696 of 2003',
  submissionEmail: 'rfp.lehs@wadhwaniai.org',
  categories: [
    {
      id: 'cat-1',
      title: '1. Website Design, Development & Maintenance',
      period: 'Starting April 2027',
      description:
        'UI/UX design for organization website and associated microsites (~40-50 pages/templates), responsive design, custom design system, CMS implementation, third-party CRM/ATS integration, accessibility (WCAG 2.1 AA), multilingual readiness, SEO architecture, ongoing SLA maintenance.',
      kpis: [
        'Go-live hypercare: Minimum 2 weeks post-launch',
        'Critical bug fixes: Within 4 hours',
        'Minor bug fixes / enhancements: Within 48 hours',
        'Performance & security audits: Quarterly',
        'Analytics reporting: Monthly (traffic, engagement, conversions)',
      ],
    },
    {
      id: 'cat-2',
      title: '2. Social Media & Digital Promotions',
      period: 'Starting April 2027',
      description:
        'Strategic paid promotion of key organizational moments (report launches, program milestones, events, hiring drives). Platform expertise across LinkedIn, Meta, X/Twitter, YouTube, Google Ads. A/B testing, targeting, conversion tracking.',
      kpis: [
        'Monthly performance report: Delivered by the 5th of each month',
        'Post-campaign performance report: Per campaign on completion',
        'Lead time: Minimum 3-4 weeks notice for digital campaigns',
      ],
    },
    {
      id: 'cat-3',
      title: '3. Event Concept, Creative and Digital Support and Production',
      period: 'Starting April 2027',
      description:
        'End-to-end conceptualization, creative direction, physical production, AV/staging, and full-funnel digital campaign (pre-buzz, live coverage, post-event) for roundtables (20-30 people) to flagship summits (600+ attendees).',
      kpis: [
        'Tier 1 (Flagship) lead time: Minimum 6-8+ weeks notice',
        'Tier 2/3 lead time: Minimum 3-4 weeks notice',
        'Post-event consolidated report: Within agreed post-event timeline',
      ],
    },
    {
      id: 'cat-4',
      title: '4. Program Documentation, Visual Storytelling & Creative Content',
      period: 'Starting April 2027',
      description:
        'Story concepts, field photography & videography, interviews with frontline workers, animated explainers, WhatsApp-ready micro-videos, posters, infographics, and stakeholder communication packages.',
      kpis: [
        'Deliverable turnaround: Per individual brief timeline',
        'Multilingual adaptation: English, Hindi, and regional languages',
      ],
    },
  ],
  evaluationCriteria: [
    { criterion: 'Experience in similar work', weightage: '30%' },
    { criterion: 'Team expertise', weightage: '30%' },
    { criterion: 'Team capacity and demonstrated ability to deliver', weightage: '20%' },
    { criterion: 'Technical soundness of approach', weightage: '20%' },
  ],
  mandatoryEnclosures: [
    'Company profile & incorporation certificate',
    'Relevant client references (preferably non-profit / research / govt)',
    'Work completion reports, purchase orders',
    'GST registration certificate',
    'PAN & TAN registration',
    'MSME Certificate (if applicable)',
    'Audited Financials for the last three years',
    'Income Tax Return (ITR) with computation of income for last 3 years',
    'Cancelled cheque',
    'Copy of registration documents/certificate and most recent renewal',
  ],
};
