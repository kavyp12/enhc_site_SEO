"use client";
import React from 'react';
import Link from 'next/link';

// Font import via CSS-in-JS
const fontStyles = `
  
  .product-sans {
    font-family: 'Product Sans', sans-serif;
  }
`;

interface Project {
  id: string;
  year: number;
  client: string;
  title: string;
  imageUrl: string;
  column: 'left' | 'right';
  tags: string[];
}

function ProjectCard({ project }: { project: Project }) {
  const hasSpecialLogo = project.id === 'gary-neville';
  return (
    <Link href={`/project/${project.id}`} className="block">
      <div>
        <div className="group relative w-full min-h-[400px] sm:min-h-[480px] overflow-hidden rounded-2xl cursor-pointer">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[var(--bg-overlay)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
          <div className="absolute top-4 left-4 lg:top-8 lg:left-8 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            {project.tags.map((tag: string) => (
              <span key={tag} className="bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full product-sans">
                {tag}
              </span>
            ))}
          </div>
          {hasSpecialLogo && (
            <div className="absolute inset-0 flex items-center justify-center text-white/80 product-sans" aria-hidden="true">
              <span className="text-6xl lg:text-8xl font-thin tracking-widest">G</span>
              <span className="w-12 h-px lg:w-16 bg-white/80 mx-4"></span>
              <span className="text-6xl lg:text-8xl font-thin tracking-widest">N</span>
            </div>
          )}
        </div>
        <div className="pt-6 text-[var(--text-main)]">
          <p className="text-sm text-[var(--text-muted)] product-sans">
            {project.year} • {project.client}
          </p>
          <h3 className="text-xl lg:text-2xl font-medium mt-2 leading-tight product-sans">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function App() {
  const projectData: Project[] = [
    { id: 'ai-core-platform', year: 2023, client: 'Digital Marketing Agencies', title: 'KretoAI', imageUrl: '/kretoAI/main_page_kretoAI.png', column: 'left', tags: ['Sales Tool', 'Business Growth', 'AI CRM'] },
    { id: 'career-guide-ai', year: 2024, client: 'CareerPath Analytics', title: 'AI Career Guidance Assessment Platform', imageUrl: '/carrer-Guide-AI/main page.png', column: 'right', tags: ['AI', 'Education', 'Career Guidance'] },
    { id: 'healthcare', year: 2024, client: 'MedAI Innovations', title: 'AI Healthcare Management System', imageUrl: '/hospital appointment system/first page.png', column: 'left', tags: ['AI', 'Healthcare', 'Monitoring'] },
    { id: 'sulit-decohub', year: 2026, client: 'Sulit Bespoke Living', title: 'Sulit DecoHub Curtains Business Management Platform', imageUrl: '/Sulit/main image.jpeg', column: 'left', tags: ['CRM', 'Quotations', 'HRMS'] },
    { id: 'rama-realty', year: 2026, client: 'Rama Realty', title: 'Rama Realty | AI-Powered Real Estate Platform', imageUrl: '/ramarealty/rama screenshots/main iamge.jpeg', column: 'right', tags: ['Real Estate', 'AI Search', 'Vastu AI'] },
    { id: 'edusmartai-platform', year: 2024, client: 'Educational Institutions', title: 'EduSmart AI', imageUrl: '/vedcool/main hero section.png', column: 'right', tags: ['AI', 'Education', 'School Management'] },
  ];
  const leftColumnProjects = projectData.filter(p => p.column === 'left');
  const rightColumnProjects = projectData.filter(p => p.column === 'right');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <section className="bg-[var(--bg-main)] text-[var(--text-main)] py-16 px-4 sm:px-8 lg:px-16 product-sans">
        <div className="lg:hidden mb-12">
          <p className="text-sm text-[var(--text-muted)] product-sans">• Our Work</p>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 leading-tight product-sans">Take a look at<br />our AI projects</h2>
        </div>

        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16 items-start">
          <div className="flex flex-col gap-16">
            {leftColumnProjects.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>
          <div className="flex flex-col gap-16">
            <div className="hidden lg:flex lg:flex-col lg:pt-8">
              <p className="text-sm text-[var(--text-muted)] product-sans">• Our Work</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 leading-tight product-sans">Take a look at<br />our AI projects</h2>
            </div>
            {rightColumnProjects.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
      </section>
    </>
  );
}