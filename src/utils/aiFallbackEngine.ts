// Client-side Fallback & Real-time Knowledge Engine for Wadhwani AI
// Ensures 100% functionality on Vercel deployment, offline mode, or when backend is connecting

export interface ClientAIResponse {
  success: boolean;
  query?: string;
  domain: string;
  text?: string;
  aiSummary?: string;
  speechText?: string;
  doctorHelpline?: {
    phone: string;
    title: string;
    step1: string;
    fallbackNote: string;
    callUrl: string;
    emergencyUrl: string;
  } | null;
  visualCard?: {
    itemTitle: string;
    genericName?: string;
    image: string;
    backImage?: string;
    mrp?: string;
    pharmacyAdvice?: string;
    howToTake: string;
    precautions: string;
  } | null;
  suggestedQuestions?: string[];
  results?: Array<{ title: string; snippet: string; tab: string }>;
  isRestricted?: boolean;
}

export function generateClientAIResponse(userQuery: string, requestedLang: string = 'en'): ClientAIResponse {
  const q = (userQuery || '').toLowerCase().trim();

  const isTelugu = requestedLang === 'te' || /[\u0C00-\u0C7F]/.test(userQuery);
  const isHindi = requestedLang === 'hi' || /[\u0900-\u097F]/.test(userQuery);
  const isMarathi = requestedLang === 'mr';
  const isKannada = requestedLang === 'kn' || /[\u0C80-\u0CFF]/.test(userQuery);

  // 1. TELUGU
  if (isTelugu) {
    if (q.includes('జ్వరం') || q.includes('మందు') || q.includes('fever') || q.includes('tablet') || q.includes('డాక్టర్') || q.includes('నొప్పి')) {
      return {
        success: true,
        query: userQuery,
        domain: '🏥 ప్రభుత్వ ఆరోగ్య విభాగం (వైద్యుని సలహా & ప్రాథమిక మందులు)',
        text: `📞 మొదటి దశ (STEP 1 - తప్పనిసరిగా డాక్టర్‌ని సంప్రదించండి):
ముందుగా ప్రభుత్వ ఉచిత 24x7 జాతీయ ఆరోగ్య హెల్ప్‌లైన్ నంబర్ 104 కి కాల్ చేసి అర్హత కలిగిన ప్రభుత్వ వైద్యుడితో మాట్లాడండి. తీవ్రమైన లేదా అత్యవసర పరిస్థితి ఉంటే వెంటనే 108 కి కాల్ చేసి ఉచిత అంబులెన్స్ సేవలను పొందండి.

💊 రెండవ దశ (STEP 2 - హెల్ప్‌లైన్ బిజీగా ఉంటే తాత్కాలిక ఉపశమన మాత్ర):
ఒకవేళ హెల్ప్‌లైన్ అందుబాటులో లేకపోతే లేదా వైద్యుడిని కలిసే వరకు తాత్కాలిక ఉపశమనం కోసం మాత్రమే పారాసిటమాల్ 500mg (Paracetamol) సురక్షితమైన ప్రారంభ మాత్రగా పరిగణించబడుతుంది.

భోజనం చేసిన తర్వాత ఒక గ్లాసు మంచినీటితో ఒక మాత్ర వేసుకోండి. రోజుకు గరిష్టంగా 3 మాత్రలకు మించి వేసుకోకూడదు. 3 రోజుల కంటే ఎక్కువ జ్వరం ఉంటే సమీపంలోని ప్రభుత్వ ప్రాథమిక ఆరోగ్య కేంద్రం (PHC)లో ఉచిత రక్త పరీక్ష చేయించుకోండి.`,
        aiSummary: `📞 మొదటి దశ: ముందుగా ప్రభుత్వ ఉచిత 104 కాల్ చేసి డాక్టర్‌తో మాట్లాడండి. అత్యవసరమైతే 108 కి కాల్ చేయండి.

💊 రెండవ దశ (తాత్కాలిక ఉపశమనం): డాక్టర్ అందుబాటులో లేకపోతే భోజనం తర్వాత పారాసిటమాల్ 500mg మాత్ర వేసుకోండి. ఖాళీ కడుపుతో వేసుకోకండి. 3 రోజులు తగ్గకపోతే ప్రభుత్వ పీహెచ్‌సీకి వెళ్లండి.`,
        speechText: `ముఖ్య గమనిక: మొదటి దశగా ముందుగా ప్రభుత్వ ఉచిత ఆరోగ్య హెల్ప్‌లైన్ నంబర్ 104 కి కాల్ చేసి ప్రభుత్వ డాక్టర్ తో మాట్లాడండి. అత్యవసరమైతే 108 కి కాల్ చేయండి. ఒకవేళ డాక్టర్ అందుబాటులో లేకపోతే మాత్రమే, తాత్కాలిక ఉపశమనం కోసం భోజనం తర్వాత పారాసిటమాల్ ఐదు వందల మిల్లీగ్రాముల మాత్రను ఒక గ్లాసు నీటితో వేసుకోండి. ఖాళీ కడుపుతో వేసుకోకండి.`,
        doctorHelpline: {
          phone: '104 (ఉచిత ప్రభుత్వ డాక్టర్ కాల్ 24x7) / 108 (అత్యవసర అంబులెన్స్)',
          title: 'ప్రభుత్వ జాతీయ ఆరోగ్య హెల్ప్‌లైన్ (24x7 National Health Helpline)',
          step1: 'మొదటి దశ (STEP 1): ముందుగా ప్రభుత్వ టోల్-ఫ్రీ 104 కి కాల్ చేసి లైసెన్స్ పొందిన డాక్టర్‌తో ఉచితంగా మాట్లాడండి. అత్యవసరమైతే 108 కి డయల్ చేయండి.',
          fallbackNote: 'రెండవ దశ (STEP 2 - తాత్కాలిక మాత్ర): హెల్ప్‌లైన్ బిజీగా ఉన్నప్పుడు లేదా ఆసుపత్రికి వెళ్లేవరకు మాత్రమే ఈ క్రింది ప్రాథమిక మాత్రను వేసుకోండి.',
          callUrl: 'tel:104',
          emergencyUrl: 'tel:108',
        },
        visualCard: {
          itemTitle: 'Paracetamol 500mg Tablet Strip (10 మాత్రల స్ట్రిప్)',
          genericName: 'Paracetamol Tablets I.P. 500 mg',
          image: '/medicines/paracetamol_front.jpg',
          backImage: '/medicines/paracetamol_back.jpg',
          mrp: '₹15.00 for 10 Tablets (ప్రభుత్వ PHC లో పూర్తి ఉచితం)',
          pharmacyAdvice: 'ఈ ఫోటోను ఏదైనా మెడికల్ షాపులో చూపించి పారాసిటమాల్ 500mg టాబ్లెట్లు కొనుగోలు చేయవచ్చు.',
          howToTake: '104 డాక్టర్ అందుబాటులో లేకపోతే: భోజనం తర్వాత 1 మాత్ర (500mg) నీటితో వేసుకోండి. ప్రతి 6–8 గంటలకు ఒకసారి మాత్రమే పునరావృతం చేయండి (రోజుకు గరిష్టంగా 3 మాత్రలు).',
          precautions: 'ముందుగా 104 డాక్టర్‌కి కాల్ చేయండి. ఖాళీ కడుపుతో వేసుకోకండి. జ్వరం 102°F కంటే ఎక్కువ ఉంటే లేదా 3 రోజులు తగ్గకపోతే ప్రభుత్వ పీహెచ్‌సీకి వెళ్లండి.',
        },
        suggestedQuestions: [
          'ప్రభుత్వ 104 ఉచిత డాక్టర్ హెల్ప్‌లైన్ ఎలా పనిచేస్తుంది?',
          'డీహైడ్రేషన్ కోసం ఓఆర్‌ఎస్ తయారీ విధానం?',
          'దగ్గు 2 వారాల కంటే ఎక్కువ ఉంటే ఉచిత టీబీ పరీక్ష ఎక్కడ చేస్తారు?',
        ],
        results: [{ title: 'ఆరోగ్య విభాగం: ప్రాథమిక క్లినిక్‌లు', snippet: 'ఉచిత చికిత్స & మందులు', tab: 'health' }],
      };
    }

    if (q.includes('పత్తి') || q.includes('పురుగు') || q.includes('pest') || q.includes('cotton') || q.includes('రైతు')) {
      return {
        success: true,
        query: userQuery,
        domain: '🌾 వ్యవసాయ విభాగం (రైతు రక్షణ సలహా)',
        text: `పత్తి పంటలో గులాబీ రంగు పురుగు (Pink Bollworm) నివారణకు ఖరీదైన రసాయనాలు వాడకుండా, లింగాకర్షక బుట్టలు (Pheromone Traps) మరియు వేప నూనె పిచికారీ చేయండి.\n\nఎకరాకు 4-6 బుట్టలు ఏర్పాటు చేయండి. ఉదయాన్నే 1500 ppm వేప నూనె లీటరు నీటికి 5 మి.లీ కలిపి పిచికారీ చేయండి.`,
        aiSummary: `పత్తి పంటలో గులాబీ పురుగు నివారణకు ఎకరాకు 4-6 లింగాకర్షక బుట్టలు పెట్టండి. ఉదయం పూట వేప నూనె స్ప్రే చేయండి. ఖరీదైన పురుగు మందులు అవసరం లేదు.`,
        speechText: `రైతు సోదరులకు నమస్కారం. పత్తి పంటలో గులాబీ పురుగు నివారణకు ఎకరాకు నాలుగు నుంచి ఆరు లింగాకర్షక బుట్టలు పెట్టండి. ఉదయం వేళ వేప నూనె పిచికారీ చేయడం వల్ల ఖర్చు తక్కువై పురుగుల సంతతి ఆగిపోతుంది.`,
        visualCard: {
          itemTitle: 'Pink Bollworm Pheromone Trap (లింగాకర్షక బుట్ట & వేప నూనె)',
          image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
          howToTake: 'ఎకరాకు 4–6 లింగాకర్షక బుట్టలను పంట ఎత్తులో అమర్చండి. లీటరు నీటికి 5ml వేప నూనె కలిపి ఉదయం పిచికారీ చేయండి.',
          precautions: 'మధ్యాహ్నం ఎండలో పిచికారీ చేయకండి. ఉచిత కిసాన్ హెల్ప్‌లైన్: 1800-180-1551.',
        },
        suggestedQuestions: ['జీవామృతం సేంద్రీయ ఎరువు తయారీ ఎలా?', 'నేల పరీక్ష ఉచితంగా ఎక్కడ చేయించుకోవాలి?'],
        results: [{ title: 'వ్యవసాయ విభాగం: కాటన్ ఏస్ ఏఐ', snippet: 'రైతుల కోసం ఉచిత సలహా', tab: 'agri' }],
      };
    }
  }

  // 2. HINDI
  if (isHindi) {
    if (q.includes('बुखार') || q.includes('दवा') || q.includes('गोली') || q.includes('पैरासिटामोल') || q.includes('सिरदर्द') || q.includes('fever') || q.includes('tablet')) {
      return {
        success: true,
        query: userQuery,
        domain: '🏥 सरकारी स्वास्थ्य विभाग (डॉक्टर परामर्श व सुरक्षित दवा)',
        text: `📞 पहला कदम (STEP 1 - डॉक्टर को कॉल करें):
सबसे पहले सरकारी 24x7 राष्ट्रीय स्वास्थ्य हेल्पलाइन 104 पर निःशुल्क कॉल करें और अधिकृत सरकारी डॉक्टर से बात करें। यदि आपात स्थिति हो, तो तुरंत 108 डायल करके एम्बुलेंस बुलाएं।

💊 दूसरा कदम (STEP 2 - हेल्पलाइन न मिलने पर अस्थायी दवा):
यदि डॉक्टर से संपर्क न हो पाए, तो अस्पताल जाने तक अस्थायी राहत के लिए पैरासिटामोल 500mg (Paracetamol) सबसे सुरक्षित शुरुआती दवा है।

खाना खाने के बाद एक गिलास पानी के साथ एक गोली लें। 24 घंटे में अधिकतम 3 गोली से अधिक न लें। बुखार 3 दिन से अधिक रहने पर तुरंत सरकारी प्राथमिक स्वास्थ्य केंद्र (PHC) जाएं।`,
        aiSummary: `📞 पहला कदम: सरकारी 104 हेल्पलाइन पर डॉक्टर से बात करें। आपात स्थिति में 108 पर कॉल करें।

💊 दूसरा कदम (अस्थायी राहत): डॉक्टर न मिलने पर खाना खाने के बाद पैरासिटामोल 500mg की एक गोली लें। खाली पेट न लें।`,
        speechText: `ज़रूरी सूचना: सबसे पहले सरकारी स्वास्थ्य हेल्पलाइन 104 पर मुफ्त कॉल करके डॉक्टर से बात करें। आपात स्थिति में 108 पर कॉल करें। यदि डॉक्टर उपलब्ध न हों, तभी अस्थायी राहत के लिए खाना खाने के बाद पैरासिटामोल 500 मिलीग्राम की एक गोली पानी के साथ लें।`,
        doctorHelpline: {
          phone: '104 (निःशुल्क 24x7 सरकारी डॉक्टर सलाह) / 108 (आपातकालीन एम्बुलेंस)',
          title: 'सरकारी राष्ट्रीय स्वास्थ्य हेल्पलाइन (24x7 National Health Helpline)',
          step1: 'पहला कदम: पहले 104 पर कॉल करके सरकारी डॉक्टर से निःशुल्क परामर्श लें। गंभीर आपात स्थिति में 108 डायल करें।',
          fallbackNote: 'दूसरा कदम: यदि डॉक्टर उपलब्ध न हों, तभी अस्थायी राहत के लिए नीचे दी गई दवा लें।',
          callUrl: 'tel:104',
          emergencyUrl: 'tel:108',
        },
        visualCard: {
          itemTitle: 'Paracetamol 500mg Tablet Strip (पैरासिटामोल 10 गोली स्ट्रिप)',
          genericName: 'Paracetamol Tablets I.P. 500 mg',
          image: '/medicines/paracetamol_front.jpg',
          backImage: '/medicines/paracetamol_back.jpg',
          mrp: '₹15.00 for 10 Tablets (सरकारी अस्पताल में पूर्णतः निःशुल्क)',
          pharmacyAdvice: 'यह फोटो किसी भी मेडिकल स्टोर पर दिखाकर सुरक्षित पैरासिटामोल 500mg खरीद सकते हैं।',
          howToTake: '104 डॉक्टर न मिलने पर: खाना खाने के बाद 1 गोली (500mg) पानी के साथ लें। 6-8 घंटे के अंतर पर ही दोहराएं (अधिकतम 3 गोली प्रतिदिन)।',
          precautions: 'पहले 104 डॉक्टर को कॉल करें। खाली पेट गोली न लें। बुखार 3 दिन से अधिक रहे तो सरकारी अस्पताल जाएं।',
        },
        suggestedQuestions: ['सरकारी 104 डॉक्टर हेल्पलाइन पर मुफ्त बात कैसे करें?', 'दस्त और उल्टी के लिए ओआरएस का घोल कैसे बनाएं?'],
        results: [{ title: 'स्वास्थ्य विभाग: प्राथमिक स्वास्थ्य केंद्र', snippet: 'मुफ्त जांच व दवाइयां', tab: 'health' }],
      };
    }
  }

  // 3. ENGLISH / GENERAL (FEVER / TABLET)
  if (q.includes('fever') || q.includes('tablet') || q.includes('medicine') || q.includes('paracetamol') || q.includes('headache') || q.includes('pain') || q.includes('doctor')) {
    return {
      success: true,
      query: userQuery,
      domain: '🏥 Health Department (Doctor Helpline & Safe First Aid)',
      text: `📞 STEP 1: Call Government 104 National Health Helpline FIRST:
Please call the official Government 24x7 Toll-Free Health Helpline 104 to speak directly with an authorized medical officer or doctor before taking medications. For critical emergencies or trauma, dial 108 for an immediate free ambulance.

💊 STEP 2 (Safe Home Starter Tablet Fallback):
ONLY if the 104 helpline is busy, delayed, or unreachable, you may safely take Paracetamol 500mg as a temporary starter tablet until you can consult a primary healthcare provider.

Take 1 tablet (500mg) after food with a full glass of water. Do not exceed 3 tablets in 24 hours. If temperature stays above 102°F or persists for more than 3 days, visit your local Government Primary Health Center (PHC) for a free blood test.`,
      aiSummary: `📞 STEP 1: Call Government 104 Helpline to consult a licensed medical officer for free. In emergencies dial 108.

💊 STEP 2 (Safe Fallback): If doctor is unreachable, take 1 Paracetamol 500mg tablet after food with water. Do not take on empty stomach. Maximum 3 tablets per day.`,
      speechText: `Important health advice: Step 1, please call the Government 24x7 National Health Helpline 104 first to speak to an authorized doctor for free. In severe emergency, dial 108 for an ambulance. Step 2, only if the doctor helpline is busy or unreachable, you may safely take one Paracetamol 500 milligram tablet after eating food with a glass of water. Do not take on an empty stomach.`,
      doctorHelpline: {
        phone: '104 (24x7 Free Doctor Advice) / 108 (Emergency Ambulance)',
        title: 'Government National Health Helpline (24x7 Toll-Free)',
        step1: 'STEP 1: Call Government 104 first to consult a licensed government medical officer for free. In critical emergency, dial 108.',
        fallbackNote: 'STEP 2 (Safe Tablet Fallback): ONLY if the helpline is busy or unreachable, you may take this temporary starter tablet until you reach a clinic.',
        callUrl: 'tel:104',
        emergencyUrl: 'tel:108',
      },
      visualCard: {
        itemTitle: 'Paracetamol 500mg Tablet Strip (10 Tablets Strip)',
        genericName: 'Paracetamol Tablets I.P. 500 mg',
        image: '/medicines/paracetamol_front.jpg',
        backImage: '/medicines/paracetamol_back.jpg',
        mrp: '₹15.00 for 10 Tablets (Free at Government PHCs)',
        pharmacyAdvice: 'Show this real pack photo to any licensed pharmacist or medical store to obtain genuine Paracetamol 500mg tablets.',
        howToTake: 'If 104 doctor is unreachable: Take 1 tablet (500mg) after food with a glass of water. Repeat every 6–8 hours only if fever returns (maximum 3 tablets per day).',
        precautions: 'Always call Government 104 first. Do not take on an empty stomach. If fever persists over 3 days, visit your nearest Government PHC for free testing.',
      },
      suggestedQuestions: [
        'How to speak to a doctor on Government 104 Helpline?',
        'How to make homemade ORS for dehydration?',
        'What to do if child has high fever?',
      ],
      results: [{ title: 'Health Department: Primary Care & 104 Helpline', snippet: '24x7 free medical guidance across India', tab: 'health' }],
    };
  }

  // 4. ORS / DEHYDRATION
  if (q.includes('ors') || q.includes('diarrhea') || q.includes('vomit') || q.includes('dehydration') || q.includes('loose motion') || q.includes('stomach')) {
    return {
      success: true,
      query: userQuery,
      domain: '🏥 Health Department (Emergency Dehydration & Doctor Helpline)',
      text: `📞 STEP 1: Call Government 104 Doctor Helpline (Or 108 if Unconscious):
Severe dehydration in children or elderly can quickly become critical. Call 104 immediately for free medical triage by a doctor, or dial 108 for an emergency ambulance if the patient cannot swallow fluids.

💊 STEP 2 (Safe Home Oral Rehydration Fallback):
Start giving Oral Rehydration Solution (ORS) immediately. Dissolve 1 sachet in 1 liter of clean drinking water. Drink 1 cup after every loose stool. Sip slowly.`,
      aiSummary: `Start ORS immediately. Mix 1 sachet in 1 liter clean drinking water and sip slowly after every loose bowel movement. Call 104 or visit PHC if vomiting continues.`,
      speechText: `For diarrhea, vomiting, or dehydration: Call the government 104 health helpline immediately. In severe weakness, dial 108 for an ambulance. Start drinking Oral Rehydration Solution immediately. Mix one packet in one liter of clean drinking water and sip it slowly.`,
      doctorHelpline: {
        phone: '104 (24x7 Free Doctor Advice) / 108 (Emergency Ambulance)',
        title: 'Government National Health Helpline',
        step1: 'STEP 1: Call Government 104 first to consult a doctor. Dial 108 if patient is fainting or unable to drink fluids.',
        fallbackNote: 'STEP 2: Administer ORS solution immediately to restore lost electrolytes and prevent shock.',
        callUrl: 'tel:104',
        emergencyUrl: 'tel:108',
      },
      visualCard: {
        itemTitle: 'Oral Rehydration Salts I.P. (WHO-Formula ORS Sachet)',
        genericName: 'Oral Rehydration Salts I.P. (Electrolytes & Dextrose)',
        image: '/medicines/ors_sachet.jpg',
        backImage: '/medicines/ors_sachet.jpg',
        mrp: '₹21.00 per sachet (Free at all Government PHCs / ASHA workers)',
        pharmacyAdvice: 'Show this sachet photo at any medical store or collect free from your local ASHA worker.',
        howToTake: 'Dissolve 1 full ORS sachet in 1 liter clean drinking water. Drink 1 cup after every loose bowel movement.',
        precautions: 'Do not stop giving fluids. If patient becomes unresponsive or unable to drink, rush to nearest clinic immediately.',
      },
      suggestedQuestions: ['How to make homemade ORS safely?', 'Call Government 104 Doctor Helpline'],
      results: [{ title: 'Health Department: Dehydration & ORS', snippet: 'Essential child survival guidance', tab: 'health' }],
    };
  }

  // 5. AGRICULTURE
  if (q.includes('cotton') || q.includes('pest') || q.includes('crop') || q.includes('farmer') || q.includes('fertilizer') || q.includes('farm')) {
    return {
      success: true,
      query: userQuery,
      domain: '🌾 Agriculture (Farmer Low-Cost Advisory)',
      text: `To control Pink Bollworm and caterpillars in cotton without spending thousands on toxic chemicals, use pheromone traps and natural neem biopesticide. Deploy 4-6 pheromone lure traps per acre and spray 1500 ppm Neem Oil (5ml per liter water) in early morning.`,
      aiSummary: `Install 4-6 pheromone lure traps per acre and spray 5ml neem oil per liter water early morning. Avoid expensive toxic chemical pesticides.`,
      speechText: `Namaste farmer brother. To protect your cotton crop from bollworm without spending heavy money on chemicals, install pheromone traps in your field and spray neem seed extract in early morning.`,
      visualCard: {
        itemTitle: 'Pink Bollworm Pheromone Trap & Neem Spray',
        image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
        howToTake: 'Install 4–6 pheromone lure traps per acre at crop height. Spray 1500 ppm Neem Oil at 5ml per liter of water early morning.',
        precautions: 'Do not spray during bright hot afternoon. Call Kisan Call Center 1800-180-1551 for free daily mandi advice.',
      },
      suggestedQuestions: ['How to make homemade Jeevamrutha organic fertilizer?', 'Free soil testing at Krishi Vigyan Kendra'],
      results: [{ title: 'Agriculture Department: CottonAce AI', snippet: 'Saves farmers ₹3,500/acre in pesticide costs', tab: 'agri' }],
    };
  }

  // 6. DEFAULT / STUDENT
  return {
    success: true,
    query: userQuery,
    domain: '🎓 Student Education & Exam Prep',
    text: `Wadhwani AI provides free learning from scratch for students unable to attend school, along with daily interactive quizzes and homework tasks in Mathematics, Science, Social Studies, and English from Class 1 to Class 10.`,
    aiSummary: `Explore our free curriculum from Class 1 to 10 with daily audio lessons, interactive practice exams, and homework tasks in Math, Science, Social Studies, and English!`,
    speechText: `Hello! Wadhwani AI provides free school education and exam practice from scratch for all students. Choose your class level and practice today!`,
    visualCard: {
      itemTitle: 'Student Level-Up Curriculum & Practice Card',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
      howToTake: 'Complete 1 daily lesson and solve 5 practice questions every evening. Track your daily streak!',
      precautions: 'Get 8 hours of sleep before examination day and drink plenty of clean water.',
    },
    suggestedQuestions: [
      'Take Class 1-3 Foundational Math Quiz',
      'Take Class 9-10 Board Science Quiz',
      'Explain Photosynthesis simply with diagram',
    ],
    results: [{ title: 'Student Education: Vernacular Reading & Exam Center', snippet: 'Supporting out-of-school learners across India', tab: 'student' }],
  };
}
