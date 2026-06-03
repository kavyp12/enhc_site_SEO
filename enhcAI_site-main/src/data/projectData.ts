
export interface Project {
  id: string;
  year: number;
  client: string;
  title: string;
  category: string;
  description: string;
  platform: string;
  development: string;
  images: {
    main: string;
    secondary: string;
    analytics: string;
    machineLearning: string;
    idea: string;
    thumbnail: string;
    script: string;
    titleGeneration: string;
    outline: string;
    outline2: string;
    outlineMain: string;
    similarChannel: string;
  };
  slides: {
    id: number;
    content: {
      type: string;
      title?: string;
      description?: string;
      image?: string;
      testimonial?: string;
      features?: { label: string; image: string }[];
    }
  }[];
  showcaseSlides: {
    id: number;
    year: string;
    client: string;
    title: string;
    imageUrl: string;
  }[];
}

const projectData: Project[] = [
  {
    id: 'ai-core-platform',
    year: 2024,
    client: 'KretoAI',
    title: 'KretoAI: Revolutionary | YouTube Content Generator',
    category: 'AI Content Creation',
    description:
      'KretoAI is a comprehensive AI platform designed to revolutionize YouTube content creation. From viral thumbnail generation to compelling script writing, engaging title creation, and strategic content outlines - KretoAI empowers creators with cutting-edge artificial intelligence to maximize their content’s reach and engagement across the platform.',
    platform: 'KretoAI',
    development: '16 Weeks',
    images: {
      main: '/kretoAI/main_page_kretoAI.png',
      secondary: '/kretoAI/kretoAI_image_2.png',
      analytics: '/kretoAI/kretoAI_image_4.png',
      machineLearning: '/kretoAI/kretoAI_image_6png.png',
      idea: '/kretoAI/Idea.png',
      thumbnail: '/kretoAI/thumbnai_generation.png',
      script: '/kretoAI/script_generation.png',
      titleGeneration: '/kretoAI/tital_generation.png',
      outline: '/kretoAI/kretoAI_outlire.png',
      outline2: '/kretoAI/kretoAI_outlire2.png',
      outlineMain: '/kretoAI/outlire_main.png',
      similarChannel: '/kretoAI/kreto_similar_channal.png',
    },
    slides: [
      {
        id: 1,
        content: {
          type: 'testimonial',
          testimonial:
            'KretoAI revolutionizes YouTube content creation with AI-powered tools that generate viral thumbnails, compelling scripts, and engaging titles.',
          description: '- Content Creator Testimonial',
          image: '/kretoAI/main_page_kretoAI.png',
        },
      },
      {
        id: 2,
        content: {
          type: 'features',
          title: 'YouTube Content Suite',
          features: [
            { label: 'THUMBNAILS', image: '/kretoAI/thumbnai_generation.png' },
            { label: 'SCRIPTS', image: '/kretoAI/script_generation.png' },
            { label: 'TITLES', image: '/kretoAI/tital_generation.png' },
          ],
        },
      },
      {
        id: 3,
        content: {
          type: 'platform',
          title: 'Viral Content Generator',
          description: '2024 • AI POWERED',
          image: '/kretoAI/kretoAI_outlire.png',
        },
      },
      {
        id: 4,
        content: {
          type: 'analytics',
          title: 'Channel Analytics',
          description:
            'Track performance and optimize your content with AI-driven insights.',
          image: '/kretoAI/kreto_similar_channal.png',
        },
      },
    ],
    showcaseSlides: [
      {
        id: 1,
        year: '2024',
        client: 'KretoAI',
        title: 'AI-Powered YouTube Content Generation Platform',
        imageUrl: '/kretoAI/main_page_kretoAI.png',
      },
      {
        id: 2,
        year: '2024',
        client: 'Content Creators',
        title: 'Viral Thumbnail Generation with Advanced AI',
        imageUrl: '/kretoAI/thumbnai_generation.png',
      },
      {
        id: 3,
        year: '2024',
        client: 'YouTube Optimization',
        title: 'Script Generation for Engaging Video Content',
        imageUrl: '/kretoAI/script_generation.png',
      },
      {
        id: 4,
        year: '2024',
        client: 'Channel Growth',
        title: 'Title Generation for Maximum Click-Through Rates',
        imageUrl: '/kretoAI/tital_generation.png',
      },
      {
        id: 5,
        year: '2024',
        client: 'Content Strategy',
        title: 'Comprehensive Content Outline Generation',
        imageUrl: '/kretoAI/kretoAI_outlire.png',
      },
    ],
  },
  {
    id: 'edu-ai-system',
    year: 2024,
    client: 'SmartLearn Tech',
    title: 'AI-Powered Adaptive | Learning Platform',
    category: 'Education',
    description:
      'SmartLearn is an AI-driven platform that personalizes learning experiences for students, adapting content to individual needs and improving educational outcomes.',
    platform: 'SmartLearn',
    development: '12 Weeks',
    images: {
      main: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1920&auto=format&fit=crop',
      secondary: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1400&auto=format&fit=crop',
      analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      machineLearning: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop',
      idea: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1400&auto=format&fit=crop',
      script: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop',
      titleGeneration: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1400&auto=format&fit=crop',
      outline: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      outline2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      outlineMain: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop',
      similarChannel: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
    },
    slides: [
      {
        id: 1,
        content: {
          type: 'testimonial',
          testimonial:
            'SmartLearn transforms education with personalized AI-driven learning paths.',
          description: '- Educator Testimonial',
          image:
            'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1920&auto=format&fit=crop',
        },
      },
      {
        id: 2,
        content: {
          type: 'features',
          title: 'Adaptive Learning Suite',
          features: [
            {
              label: 'PERSONALIZATION',
              image:
                'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1400&auto=format&fit=crop',
            },
            {
              label: 'ASSESSMENTS',
              image:
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop',
            },
            {
              label: 'ANALYTICS',
              image:
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1400&auto=format&fit=crop',
            },
          ],
        },
      },
      {
        id: 3,
        content: {
          type: 'platform',
          title: 'Personalized Learning Platform',
          description: '2024 • AI POWERED',
          image:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        },
      },
      {
        id: 4,
        content: {
          type: 'analytics',
          title: 'Learning Analytics',
          description:
            'Track student progress and optimize learning with AI-driven insights.',
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
        },
      },
    ],
    showcaseSlides: [
      {
        id: 1,
        year: '2024',
        client: 'SmartLearn Tech',
        title: 'AI-Powered Adaptive Learning Platform',
        imageUrl:
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1920&auto=format&fit=crop',
      },
      {
        id: 2,
        year: '2024',
        client: 'Educators',
        title: 'Personalized Learning Content',
        imageUrl:
          'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1400&auto=format&fit=crop',
      },
      {
        id: 3,
        year: '2024',
        client: 'Education Optimization',
        title: 'Dynamic Assessments for Students',
        imageUrl:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop',
      },
      {
        id: 4,
        year: '2024',
        client: 'Learning Growth',
        title: 'Analytics for Educational Insights',
        imageUrl:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
      },
    ],
  },

  {
  id: 'healthcare',
  year: 2024,
  client: 'MedAI Innovations',
  title: 'Healthcare Management System',
  category: 'Healthcare AI',
  description:
    'MedAI is a comprehensive AI-powered healthcare management platform designed to revolutionize patient monitoring and hospital administration. From intelligent appointment scheduling to real-time patient health tracking, automated admin workflows, and predictive health analytics - MedAI empowers healthcare providers with cutting-edge artificial intelligence to enhance patient care, streamline operations, and improve medical outcomes across the healthcare ecosystem.',
  platform: 'MedAI',
  development: '18 Weeks',
  images: {
    main: '/hospital appointment system/first page.png',
    secondary: '/hospital appointment system/main admin page.png',
    analytics: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1400&auto=format&fit=crop',
    machineLearning: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop',
    idea: '/hospital appointment system/patient details.png',
    thumbnail: '/hospital appointment system/request appointment.png',
    script: '/hospital appointment system/admin page Schedule.png',
    titleGeneration: '/hospital appointment system/approved page.png',
    outline: '/hospital appointment system/admin page cancle.png',
    outline2: '/hospital appointment system/admin password page.png',
    outlineMain: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1400&auto=format&fit=crop',
    similarChannel: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1400&auto=format&fit=crop',
  },
  slides: [
    {
      id: 1,
      content: {
        type: 'testimonial',
        testimonial:
          'MedAI transforms healthcare delivery with AI-powered patient monitoring, smart scheduling, and comprehensive hospital management solutions.',
        description: '- Healthcare Administrator Testimonial',
        image: '/hospital appointment system/first page.png',
      },
    },
    {
      id: 2,
      content: {
        type: 'features',
        title: 'Healthcare Management Suite',
        features: [
          { label: 'APPOINTMENTS', image: '/hospital appointment system/request appointment.png' },
          { label: 'MONITORING', image: '/hospital appointment system/patient details.png' },
          { label: 'ADMINISTRATION', image: '/hospital appointment system/main admin page.png' },
        ],
      },
    },
    {
      id: 3,
      content: {
        type: 'platform',
        title: 'Smart Healthcare Platform',
        description: '2024 • AI POWERED',
        image: '/hospital appointment system/admin page Schedule.png',
      },
    },
    {
      id: 4,
      content: {
        type: 'analytics',
        title: 'Patient Analytics',
        description:
          'Track patient health patterns and optimize care delivery with AI-driven medical insights.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1400&auto=format&fit=crop',
      },
    },
  ],
  showcaseSlides: [
    {
      id: 1,
      year: '2024',
      client: 'MedAI Innovations',
      title: 'AI-Powered Healthcare Management Platform',
      imageUrl: '/hospital appointment system/first page.png',
    },
    {
      id: 2,
      year: '2024',
      client: 'Healthcare Providers',
      title: 'Smart Appointment Scheduling System',
      imageUrl: '/hospital appointment system/request appointment.png',
    },
    {
      id: 3,
      year: '2024',
      client: 'Medical Administration',
      title: 'Comprehensive Admin Dashboard for Hospital Management',
      imageUrl: '/hospital appointment system/main admin page.png',
    },
    {
      id: 4,
      year: '2024',
      client: 'Patient Care',
      title: 'Real-time Patient Health Monitoring and Details',
      imageUrl: '/hospital appointment system/patient details.png',
    },
    {
      id: 5,
      year: '2024',
      client: 'Medical Operations',
      title: 'Automated Appointment Approval and Management',
      imageUrl: '/hospital appointment system/approved page.png',
    },
  ],
},

{
  id: 'career-guide-ai',
  year: 2024,
  client: 'CareerPath Analytics',
  title: 'AI Career Guidance | Student Assessment Platform',
  category: 'Education AI',
  description:
    'CareerPath AI is an intelligent career guidance platform designed to help students discover their ideal career paths through comprehensive assessment and AI-powered analysis. From secure user authentication to detailed academic performance tracking, in-depth psychological profiling through 50+ specialized questions, and personalized career recommendations - CareerPath AI empowers students with data-driven insights to make informed decisions about their future, while providing educational institutions with powerful analytics to guide student counseling.',
  platform: 'CareerPath AI',
  development: '20 Weeks',
  images: {
    main: '/carrer-Guide-AI/main page.png',
    secondary: '/carrer-Guide-AI/admin dashboard.png',
     analytics: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1400&auto=format&fit=crop',
    machineLearning: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?q=80&w=800&auto=format&fit=crop',
    idea: '/carrer-Guide-AI/studnet dashboard where download generated documnet.png',
    thumbnail: '/carrer-Guide-AI/signup2.png',
    script: '/carrer-Guide-AI/marks-entry page.png',
    titleGeneration: '/carrer-Guide-AI/question entry page.png',
    outline: '/carrer-Guide-AI/waiting page.png',
    outline2: '/carrer-Guide-AI/login page.png',
    outlineMain: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop',
    similarChannel: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop',
  },
  slides: [
    {
      id: 1,
      content: {
        type: 'testimonial',
        testimonial:
          'CareerPath AI revolutionizes student career guidance with comprehensive assessment tools and personalized AI-driven career recommendations.',
        description: '- Educational Counselor Testimonial',
        image: '/carrer-Guide-AI/main page.png',
      },
    },
    {
      id: 2,
      content: {
        type: 'features',
        title: 'Career Assessment Suite',
        features: [
          { label: 'ASSESSMENT', image: '/carrer-Guide-AI/question entry page.png' },
          { label: 'ANALYSIS', image: '/carrer-Guide-AI/marks-entry page.png' },
          { label: 'GUIDANCE', image: '/carrer-Guide-AI/studnet dashboard where download generated documnet.png' },
        ],
      },
    },
    {
      id: 3,
      content: {
        type: 'platform',
        title: 'Intelligent Career Guidance',
        description: '2024 • AI POWERED',
        image: '/carrer-Guide-AI/waiting page.png',
      },
    },
    {
      id: 4,
      content: {
        type: 'analytics',
        title: 'Student Analytics',
        description:
          'Track student progress and generate comprehensive career reports with AI-driven educational insights.',
        image: '/carrer-Guide-AI/admin dashboard.png',
      },
    },
  ],
  showcaseSlides: [
    {
      id: 1,
      year: '2024',
      client: 'CareerPath Analytics',
      title: 'AI-Powered Career Guidance Assessment Platform',
      imageUrl: '/carrer-Guide-AI/main page.png',
    },
    {
      id: 2,
      year: '2024',
      client: 'Student Registration',
      title: 'Secure Student Authentication and Onboarding',
      imageUrl: '/carrer-Guide-AI/signup.png',
    },
    {
      id: 3,
      year: '2024',
      client: 'Academic Assessment',
      title: 'Comprehensive Academic Performance Tracking System',
      imageUrl: '/carrer-Guide-AI/marks-entry page.png',
    },
    {
      id: 4,
      year: '2024',
      client: 'Career Analysis',
      title: 'In-depth Psychological and Career Assessment Questions',
      imageUrl: '/carrer-Guide-AI/question entry page.png',
    },
    {
      id: 5,
      year: '2024',
      client: 'Report Generation',
      title: 'AI-Generated Personalized Career Guidance Documents',
      imageUrl: '/carrer-Guide-AI/studnet dashboard where download generated documnet.png',
    },
  ],
},


{
  id: 'autotakeoff-hvac',
  year: 2024,
  client: 'Real Estate & Construction',
  title: 'AutoTakeoff AI',
  category: 'Construction AI',
  description:
    'AutoTakeoff is an intelligent HVAC takeoff platform designed to revolutionize construction project measurement and estimation. From automated mechanical drawing analysis to intelligent schedule extraction, precise TAG identification and measurement calculations - AutoTakeoff empowers construction professionals with AI-powered tools to streamline project workflows, reduce manual errors, and accelerate project delivery with accurate measurements and comprehensive takeoff analytics.',
  platform: 'AutoTakeoff',
  development: '22 Weeks',
  images: {
    main: '/Autottake/main page.png',
    secondary: '/Autottake/all project dashboard.png',
    analytics: '/Autottake/all result viewtake off and sheduling.png',
    machineLearning: '/Autottake/schedul exctracted table data.png',
    idea: '/Autottake/invidual porject dashboard.png',
    thumbnail: '/Autottake/all project dashboard.png',
    script: '/Autottake/scheduling crop mechanism.png',
    titleGeneration: '/Autottake/added sylbol in the viewtakoff page .png',
    outline: '/Autottake/all project dashboard.png',
    outline2: '/Autottake/upload waiting page.png',
    outlineMain: '/Autottake/schedul exctracted table data.png',
    similarChannel: '/Autottake/all result viewtake off and sheduling.png',
  },
  slides: [
    {
      id: 1,
      content: {
        type: 'testimonial',
        testimonial:
          'AutoTakeoff transforms HVAC construction takeoffs with AI-powered measurement analysis, automated schedule extraction, and intelligent TAG identification for precise project estimation.',
        description: '- Construction Engineer Testimonial',
        image: '/Autottake/main page.png',
      },
    },
    {
      id: 2,
      content: {
        type: 'features',
        title: 'HVAC Takeoff Suite',
        features: [
          { label: 'MEASUREMENT', image: '/Autottake/added sylbol in the viewtakoff page .png' },
          { label: 'EXTRACTION', image: '/Autottake/schedul exctracted table data.png' },
          { label: 'ANALYSIS', image: '/Autottake/all result viewtake off and sheduling.png' },
        ],
      },
    },
    {
      id: 3,
      content: {
        type: 'platform',
        title: 'AI Construction Platform',
        description: '2024 • AI POWERED',
        image: '/Autottake/scheduling crop mechanism.png',
      },
    },
    {
      id: 4,
      content: {
        type: 'analytics',
        title: 'Project Analytics',
        description:
          'Track project measurements and optimize construction workflows with AI-driven takeoff insights.',
        image: '/Autottake/all result viewtake off and sheduling.png',
      },
    },
  ],
  showcaseSlides: [
    {
      id: 1,
      year: '2024',
      client: 'AutoTakeoff',
      title: 'AI-Powered HVAC Construction Takeoff Platform',
      imageUrl: '/Autottake/main page.png',
    },
    {
      id: 2,
      year: '2024',
      client: 'Project Management',
      title: 'Comprehensive Project Dashboard and Management',
      imageUrl: '/Autottake/all project dashboard.png',
    },
    {
      id: 3,
      year: '2024',
      client: 'Document Processing',
      title: 'Automated Schedule Extraction and Table Analysis',
      imageUrl: '/Autottake/schedul exctracted table data.png',
    },
    {
      id: 4,
      year: '2024',
      client: 'Drawing Analysis',
      title: 'Intelligent TAG Identification and Mechanical Drawing Markup',
      imageUrl: '/Autottake/added sylbol in the viewtakoff page .png',
    },
    {
      id: 5,
      year: '2024',
      client: 'Construction Analytics',
      title: 'Comprehensive Results and Measurement Analytics',
      imageUrl: '/Autottake/all result viewtake off and sheduling.png',
    },
  ],
},

{
  id: 'edusmartai-platform',
  year: 2024,
  client: 'Educational Institutions',
  title: 'EduSmart AI | Comprehensive School Management',
  category: 'Education AI',
  description:
    'EduSmart AI is a revolutionary school management platform powered by artificial intelligence, designed to transform educational administration and enhance learning experiences. From intelligent student performance analytics to automated administrative workflows, AI-powered parent-teacher communication, and comprehensive institutional management - EduSmart AI empowers schools, students, parents, staff, principals, and trustees with cutting-edge technology to streamline operations, improve academic outcomes, and create a connected educational ecosystem.',
  platform: 'EduSmart AI',
  development: '24 Weeks',
  images: {
    main: '/vedcool/main hero section.png',
    secondary: '/vedcool/main inside vedcool design admin page and all.png',
    analytics: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1400&auto=format&fit=crop',
    machineLearning: '/vedcool/education2.jpg',
    idea: '/vedcool/core feature.png',
    thumbnail: '/vedcool/what is vedcool.png',
    script: '/vedcool/product in vedcool.png',
    titleGeneration: '/vedcool/Screenshot 2025-09-13 104946.png',
    outline: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1400&auto=format&fit=crop',
    outline2: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    outlineMain: '/vedcool/education.jpg',
    similarChannel: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop',
  },
  slides: [
    {
      id: 1,
      content: {
        type: 'testimonial',
        testimonial:
          'EduSmart AI revolutionizes school management with intelligent administration tools, AI-powered analytics, and comprehensive educational ecosystem management for all stakeholders.',
        description: '- Educational Administrator Testimonial',
        image: '/vedcool/main hero section.png',
      },
    },
    {
      id: 2,
      content: {
        type: 'features',
        title: 'Smart Education Suite',
        features: [
          { label: 'MANAGEMENT', image: '/vedcool/main inside vedcool design admin page and all.png' },
          { label: 'FEATURES', image: '/vedcool/core feature.png' },
          { label: 'PRODUCTS', image: '/vedcool/product in vedcool.png' },
        ],
      },
    },
    {
      id: 3,
      content: {
        type: 'platform',
        title: 'AI School Management',
        description: '2024 • AI POWERED',
        image: '/vedcool/what is vedcool.png',
      },
    },
    {
      id: 4,
      content: {
        type: 'analytics',
        title: 'Educational Analytics',
        description:
          'Track student performance, administrative efficiency, and institutional growth with AI-driven educational insights.',
        image: '/vedcool/Screenshot 2025-09-13 104946.png',
      },
    },
  ],
  showcaseSlides: [
    {
      id: 1,
      year: '2024',
      client: 'EduSmart AI',
      title: 'AI-Powered Comprehensive School Management Platform',
      imageUrl: '/vedcool/main hero section.png',
    },
    {
      id: 2,
      year: '2024',
      client: 'Educational Administration',
      title: 'Complete Admin Dashboard and Management System',
      imageUrl: '/vedcool/main inside vedcool design admin page and all.png',
    },
    {
      id: 3,
      year: '2024',
      client: 'School Operations',
      title: 'Core AI Features for Educational Excellence',
      imageUrl: '/vedcool/core feature.png',
    },
    {
      id: 4,
      year: '2024',
      client: 'Educational Products',
      title: 'Comprehensive Product Suite for Schools',
      imageUrl: '/vedcool/product in vedcool.png',
    },
    {
      id: 5,
      year: '2024',
      client: 'Smart Education',
      title: 'AI-Driven Educational Platform Overview',
      imageUrl: '/vedcool/what is vedcool.png',
    },
  ],
},
{
  id: 'finance-ai',
  year: 2024,
  client: 'FinTech Innovations',
  title: 'AI-Based Fraud Detection Engine',
  category: 'Finance AI',
  description:
    'AI-Powered Fraud Detection is an intelligent financial security platform designed to revolutionize transaction monitoring and fraud prevention. From real-time transaction analysis to behavioral pattern recognition, advanced risk scoring, and automated threat response - our AI empowers financial institutions with cutting-edge machine learning algorithms to detect fraudulent activities, minimize false positives, and protect customers from financial crimes with unprecedented accuracy and speed.',
  platform: 'FraudShield AI',
  development: '16 Weeks',
  images: {
    main: '/fraud_detaction.jpg',
    secondary: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1400&auto=format&fit=crop',
    analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    machineLearning: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop',
    idea: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=1400&auto=format&fit=crop',
    script: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1400&auto=format&fit=crop',
    titleGeneration: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop',
    outline: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    outline2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    outlineMain: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop',
    similarChannel: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
  },
  slides: [
    {
      id: 1,
      content: {
        type: 'testimonial',
        testimonial:
          'AI Fraud Detection revolutionizes financial security with real-time transaction monitoring and intelligent threat prevention.',
        description: '- Financial Security Expert Testimonial',
        image: '/fraud_detaction.jpg',
      },
    },
    {
      id: 2,
      content: {
        type: 'features',
        title: 'Fraud Detection Suite',
        features: [
          { label: 'MONITORING', image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=1400&auto=format&fit=crop' },
          { label: 'ANALYSIS', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1400&auto=format&fit=crop' },
          { label: 'PREVENTION', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop' },
        ],
      },
    },
    {
      id: 3,
      content: {
        type: 'platform',
        title: 'AI Fraud Prevention',
        description: '2024 • AI POWERED',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      },
    },
    {
      id: 4,
      content: {
        type: 'analytics',
        title: 'Financial Analytics',
        description:
          'Track transaction patterns and prevent fraud with AI-driven security insights.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
      },
    },
  ],
  showcaseSlides: [
    {
      id: 1,
      year: '2024',
      client: 'FinTech Innovations',
      title: 'AI-Powered Fraud Detection Engine',
      imageUrl: '/fraud_detaction.jpg',
    },
    {
      id: 2,
      year: '2024',
      client: 'Transaction Security',
      title: 'Real-time Transaction Monitoring System',
      imageUrl: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: 3,
      year: '2024',
      client: 'Risk Analysis',
      title: 'Advanced Behavioral Pattern Recognition',
      imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: 4,
      year: '2024',
      client: 'Threat Prevention',
      title: 'Automated Risk Scoring and Response',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop',
    },
  ],
},

];

export default projectData;

