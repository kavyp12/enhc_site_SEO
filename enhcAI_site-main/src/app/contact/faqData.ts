// Real enhc FAQ — shared by the contact page UI and the FAQPage JSON-LD in
// contact/layout.tsx so the visible answers and structured data never drift.
// Answers are plain text (front-loaded) so AI answer engines can quote them.
export type Faq = { question: string; answer: string };

export const contactFaq: Faq[] = [
  {
    question: 'What does enhc do?',
    answer:
      'enhc (Enhc Tech LLP) is an AI-first IT solutions company in Ahmedabad, India. We build custom AI software, machine learning models, AI automation, predictive analytics, and web and mobile applications for startups and enterprises across industries.',
  },
  {
    question: 'How long does an AI or software project take?',
    answer:
      'It depends on scope. A focused machine-learning model or automation typically ships in 4–8 weeks, while larger AI platforms or full web and app builds run 3–4 months. We share a detailed timeline after an initial discovery call.',
  },
  {
    question: 'How much does an AI project cost?',
    answer:
      'Cost depends on scope, data readiness and integrations. After an initial consultation we provide a fixed-scope quote or a phased engagement model, so you can start with a proof of concept and scale from there.',
  },
  {
    question: 'Do you work with clients outside Ahmedabad?',
    answer:
      'Yes. We are based in Ahmedabad, Gujarat and work with clients across India and worldwide, collaborating over video calls and shared project-management tools so communication stays clear wherever you are.',
  },
  {
    question: 'Do you build custom AI models or only integrate existing ones?',
    answer:
      'Both. We build and fine-tune custom machine-learning models on your own data, and we also integrate foundation models and APIs — large language models, computer vision and speech — into your products and workflows.',
  },
  {
    question: 'Where is enhc located and how do I get in touch?',
    answer:
      'Our studio is at Shivalik Shilp, Ahmedabad, Gujarat, India. You can email contact@enhc.tech or call +91 9313153036 to discuss your project.',
  },
];
