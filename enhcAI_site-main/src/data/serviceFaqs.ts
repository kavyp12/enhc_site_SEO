// src/data/serviceFaqs.ts
// Per-service FAQ content — the SINGLE source of truth for both the visible
// <ServiceFaq> block and the FAQPage JSON-LD in each service layout, so the
// rendered questions/answers always match the structured data (Google policy).
//
// The `intro` is a one-sentence, self-contained definition ("X is …") placed at
// the top of the FAQ: it's the highest-value passage for featured snippets and
// AI-answer citation, and Q1 of each list restates it in question form.
//
// Keyed by the service route folder name (e.g. 'custom-ai-solutions').
// Copy is intentionally factual and non-overpromising — REVIEW & adjust prices/
// timelines to match how enhc actually quotes before relying on them publicly.

export type ServiceFaqContent = {
  /** One-sentence "X is …" definition shown above the FAQ. Ideal snippet/AI passage. */
  intro?: string;
  faqs: { q: string; a: string }[];
};

export const SERVICE_FAQS: Record<string, ServiceFaqContent> = {
  'custom-ai-solutions': {
    intro:
      'Custom AI software development is the design, training and deployment of AI systems — machine learning models, LLM/generative-AI features, NLP and computer vision — built for your specific data, product and workflows rather than a generic off-the-shelf tool.',
    faqs: [
      {
        q: 'What is custom AI software development?',
        a: 'It is building AI capabilities — ML models, LLM/GenAI features, NLP or computer vision — tailored to your data, product and business rules, instead of adapting a one-size-fits-all SaaS tool. You own the resulting code and models.',
      },
      {
        q: 'How much does custom AI development cost?',
        a: 'It depends on scope. Most engagements are either a fixed-scope project or a monthly retainer, with a written estimate after a free discovery call, billed in USD, EUR or GBP.',
      },
      {
        q: 'How long does a custom AI project take?',
        a: 'A focused MVP typically ships in about 6–10 weeks; larger platforms run as phased milestones. We agree a timeline with you before work starts.',
      },
      {
        q: 'Who owns the AI models and code you build?',
        a: 'You do. Full IP assignment is written into the MSA before work begins, and we are happy to sign an NDA first.',
      },
      {
        q: 'Can you integrate with our existing stack and cloud?',
        a: 'Yes — we build on your AWS, Azure or GCP, connect to your APIs and data sources, and deploy into your environment rather than forcing a rebuild.',
      },
    ],
  },

  machinelearningmodel: {
    intro:
      'Machine learning development is the process of preparing data, training and validating models, and deploying them into production with monitoring (MLOps) so they keep making accurate predictions or classifications as your data changes.',
    faqs: [
      {
        q: 'What is machine learning development?',
        a: 'It is building models that learn patterns from your data to predict, classify or automate decisions — covering data preparation, training, evaluation, deployment and ongoing monitoring.',
      },
      {
        q: 'Do you handle MLOps and ongoing model maintenance?',
        a: 'Yes. Deployment, monitoring, retraining and drift detection are part of how we ship models, so accuracy holds up after launch rather than degrading silently.',
      },
      {
        q: 'How much data do we need to build a useful model?',
        a: 'It varies by problem. Where labelled data is thin we can use pre-trained models, transfer learning or LLMs; we assess feasibility in the discovery call before you commit.',
      },
      {
        q: 'How much does machine learning development cost and how long does it take?',
        a: 'Most projects are fixed-scope or retainer-based; a first production model commonly takes 6–12 weeks. We give a written estimate and timeline after scoping your data and goals.',
      },
      {
        q: 'Who owns the trained models?',
        a: 'You do — full IP assignment in the MSA, with an NDA available up front.',
      },
    ],
  },

  AIautomation: {
    intro:
      'AI automation uses AI — LLMs, machine learning and rules — to automate document processing, back-office workflows, customer support and other repetitive operations, integrated into the tools your team already uses.',
    faqs: [
      {
        q: 'What is AI automation?',
        a: 'It is using AI to complete or assist work that people do manually — reading documents, routing requests, drafting responses, updating systems — connected to your existing software.',
      },
      {
        q: "What's the difference between RPA and AI automation?",
        a: 'Traditional RPA follows fixed, rule-based steps; AI automation adds understanding — reading unstructured text, images or intent — so it handles cases rules alone cannot. We often combine both.',
      },
      {
        q: 'What processes are worth automating first?',
        a: 'High-volume, repetitive, rules-plus-judgment tasks (invoice/document processing, support triage, data entry). We help you pick the highest-ROI candidates in the discovery call.',
      },
      {
        q: 'How do you measure ROI on automation?',
        a: 'Typically in hours saved, error-rate reduction and faster turnaround. We baseline the current process first so the improvement is measurable.',
      },
      {
        q: 'Will it integrate with our current tools?',
        a: 'Yes — we integrate with your CRM, ERP, email, cloud and APIs rather than replacing them.',
      },
    ],
  },

  predictiveAnalytics: {
    intro:
      'Predictive analytics uses historical data and machine learning to forecast future outcomes — demand, churn, risk, maintenance needs — so you can act before they happen instead of reacting after.',
    faqs: [
      {
        q: 'What is predictive analytics?',
        a: 'It is applying statistical and machine-learning models to past data to estimate what is likely to happen next, expressed as forecasts, scores or probabilities you can act on.',
      },
      {
        q: 'What are common use cases?',
        a: 'Demand and sales forecasting, customer churn prediction, credit/risk scoring, predictive maintenance, inventory optimisation and lead scoring, among others.',
      },
      {
        q: 'What data do we need?',
        a: 'Enough clean historical records of the outcome you want to predict. We assess data quality and readiness first and tell you honestly if more collection is needed.',
      },
      {
        q: 'How much does it cost and how long does it take?',
        a: 'A first predictive model is usually a fixed-scope engagement of a few weeks; we scope cost and timeline after reviewing your data and target metric.',
      },
      {
        q: 'How does it fit into our dashboards and systems?',
        a: 'We deliver predictions via API, database or your BI tool (e.g. Power BI, Tableau, Looker) so they show up where your team already works.',
      },
    ],
  },

  'ai-strategy': {
    intro:
      'AI strategy and roadmap consulting helps you identify high-ROI AI opportunities, assess your data and readiness, and build a practical, phased implementation roadmap — before committing budget to a build.',
    faqs: [
      {
        q: 'What is AI strategy roadmap consulting?',
        a: 'It is a structured engagement that assesses your data and AI readiness, ranks candidate use cases by ROI and feasibility, and delivers a phased implementation roadmap — so you know exactly what to build, in what order, and what it should return.',
      },
      {
        q: 'What is AI consulting?',
        a: 'It is expert guidance to decide where AI will actually pay off for your business, what is feasible with your data, and how to sequence adoption — independent of any specific tool.',
      },
      {
        q: 'What does an AI readiness assessment cover?',
        a: 'Your data quality and availability, priority use cases ranked by value and effort, required infrastructure, risks and compliance, and a phased roadmap with expected ROI.',
      },
      {
        q: 'How long does an AI strategy engagement take?',
        a: 'A focused readiness assessment and roadmap is typically 2–4 weeks, depending on the number of use cases and stakeholders involved.',
      },
      {
        q: 'Do you also build what you recommend?',
        a: 'Yes — enhc can deliver the roadmap end to end, but the strategy stands on its own and you are free to build it with any team.',
      },
      {
        q: 'How do you handle AI governance, data privacy and compliance?',
        a: 'We factor data protection (including GDPR where relevant), security, bias and responsible-AI considerations into the roadmap rather than bolting them on later.',
      },
    ],
  },

  'web-development': {
    intro:
      'enhc builds fast, modern web applications — marketing sites, dashboards and full SaaS products — with Next.js, React and TypeScript, engineered for performance, SEO and maintainability.',
    faqs: [
      {
        q: 'What technologies do you build with?',
        a: 'Primarily Next.js, React and TypeScript on the front end, with Node.js and cloud back ends (AWS/Azure/GCP). We choose the stack to fit your product, not the other way around.',
      },
      {
        q: 'Do you build SEO and performance in?',
        a: 'Yes — server rendering, Core Web Vitals, structured data and clean semantic markup are part of how we build, so the site is fast and discoverable from launch.',
      },
      {
        q: 'How much does a web project cost and how long does it take?',
        a: 'A marketing site is usually a few weeks; a web app runs in phased milestones. We give a fixed-scope estimate after a discovery call.',
      },
      {
        q: 'Can you add AI features to our web app?',
        a: 'Yes — chat, search, recommendations, document processing and other AI capabilities are a core part of what we do and integrate directly into the product.',
      },
      {
        q: 'Do we own the code, and do you hand it over?',
        a: 'You own all the code (full IP assignment), and we hand over the repository, documentation and deployment so you are never locked in.',
      },
    ],
  },

  'app-development': {
    intro:
      'enhc builds native and cross-platform mobile apps for iOS and Android — using Swift/Kotlin or React Native/Flutter — together with the back end and AI features that power them.',
    faqs: [
      {
        q: 'Which platforms do you build for?',
        a: 'iOS and Android — native (Swift/Kotlin) or cross-platform (React Native/Flutter) — plus the APIs, back end and cloud infrastructure behind the app.',
      },
      {
        q: 'Native or cross-platform — which should we choose?',
        a: 'Cross-platform is faster and cheaper for most apps sharing one codebase; native suits performance-critical or deeply platform-specific features. We recommend based on your app, not a default.',
      },
      {
        q: 'How much does app development cost and how long does it take?',
        a: 'An MVP typically ships in roughly 8–12 weeks; cost depends on features and platforms. We scope a fixed estimate and timeline after a discovery call.',
      },
      {
        q: 'Do you handle App Store / Play Store submission and updates?',
        a: 'Yes — we manage store submission, releases and post-launch maintenance, and can run ongoing updates on a retainer.',
      },
      {
        q: 'Who owns the app and source code?',
        a: 'You do — full IP assignment in the MSA, with the code, accounts and documentation handed over to you.',
      },
    ],
  },
};
