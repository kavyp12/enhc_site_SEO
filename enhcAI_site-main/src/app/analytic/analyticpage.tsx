"use client";
import React, { useState, useEffect } from 'react';
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import { getAnalyticsData, type AnalyticsData } from '@/data/analyticsData';

// --- Font and Global Styles ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Product+Sans&display=swap');
  
  .product-sans {
    font-family: 'Product Sans', sans-serif;
  }
`;

// --- Individual Widget Components ---
const DashboardCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-[var(--bg-card-secondary)] rounded-2xl p-6 shadow-md border border-[var(--border-main)]/50 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 product-sans">{children}</h3>
);

// Widget for "Employee vs Year"
const EmployeeYearChart = ({ data }: { data: AnalyticsData['employeeVsYear'] }) => {
    const maxEmployee = Math.max(...data.map(d => d.actual), ...data.filter(d => d.expected).map(d => d.expected!)) + 20;

    return (
        <DashboardCard className="col-span-1 lg:col-span-2">
            <CardTitle>Team Growth & Projections</CardTitle>
            <div className="flex flex-col">
                <div className="flex justify-end space-x-4 text-xs text-[var(--text-muted)] mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-blue-300"></div>
                        <span>Projected Headcount</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                        <span>Actual Headcount</span>
                    </div>
                </div>
                <div className="w-full h-64 flex justify-between items-end px-4 space-x-2">
                    {data.map(item => (
                        <div key={item.year} className="flex-1 flex justify-center items-end gap-1 h-full">
                            {item.expected && (
                                <div 
                                    className="w-1/2 bg-blue-300 rounded-t-md" 
                                    style={{ height: `${(item.expected / maxEmployee) * 100}%` }}
                                    title={`Expected: ${item.expected}`}
                                ></div>
                            )}
                            <div 
                                className="w-1/2 bg-blue-500 rounded-t-md" 
                                style={{ height: `${(item.actual / maxEmployee) * 100}%` }}
                                title={`Actual: ${item.actual}`}
                            ></div>
                        </div>
                    ))}
                </div>
                <div className="w-full h-px bg-[var(--border-main)] mt-1"></div>
                <div className="w-full flex justify-between px-4 text-xs text-[var(--text-muted)] mt-2">
                    {data.map(item => (<span key={item.year} className="flex-1 text-center">{item.year}</span>))}
                </div>
            </div>
        </DashboardCard>
    );
};

// Widget for "Core AI Technologies"
const TechStackPieChart = ({ data }: { data: AnalyticsData['techStack'] }) => {
    let currentPercent = 0;
    const gradientStops = data.map(item => {
        const start = currentPercent;
        currentPercent += item.percentage;
        return `${item.color} ${start}% ${currentPercent}%`;
    }).join(', ');

    return (
        <DashboardCard>
            <CardTitle>Core AI Technologies</CardTitle>
            <div className="flex justify-center items-center my-6">
                <div 
                    className="w-48 h-48 rounded-full" 
                    style={{ background: `conic-gradient(${gradientStops})` }}
                ></div>
            </div>
            <div className="space-y-2 text-sm text-[var(--text-muted)]">
                {data.map(item => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span>{item.name}</span>
                        </div>
                        <span>{item.percentage}%</span>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
};

// Widget for "AI Talent Distribution"
const WorkforcePieChart = ({ data }: { data: AnalyticsData['workforceRoles'] }) => {
    let currentPercent = 0;
    const gradientStops = data.map(item => {
        const start = currentPercent;
        currentPercent += item.percentage;
        return `${item.color} ${start}% ${currentPercent}%`;
    }).join(', ');

    return (
        <DashboardCard>
            <CardTitle>AI Talent Distribution</CardTitle>
            <div className="flex justify-center items-center my-6">
                <div 
                    className="w-48 h-48 rounded-full" 
                    style={{ background: `conic-gradient(${gradientStops})` }}
                ></div>
            </div>
            <div className="space-y-2 text-sm text-[var(--text-muted)]">
                {data.map(item => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span>{item.name}</span>
                        </div>
                        <span>{item.percentage}%</span>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
};

// *** NEW WIDGET *** for "Industry Solutions Deployed"
const IndustryFocusPieChart = ({ data }: { data: AnalyticsData['industryFocus'] }) => {
    let currentPercent = 0;
    const gradientStops = data.map(item => {
        const start = currentPercent;
        currentPercent += item.percentage;
        return `${item.color} ${start}% ${currentPercent}%`;
    }).join(', ');

    return (
        <DashboardCard>
            <CardTitle>Industry Solutions Deployed</CardTitle>
            <div className="flex justify-center items-center my-6">
                <div 
                    className="w-48 h-48 rounded-full" 
                    style={{ background: `conic-gradient(${gradientStops})` }}
                ></div>
            </div>
            <div className="space-y-2 text-sm text-[var(--text-muted)]">
                {data.map(item => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span>{item.name}</span>
                        </div>
                        <span>{item.percentage}%</span>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
};


// *** NEW WIDGET *** for "Model Performance Metrics"
const ModelPerformanceRadarChart = ({ data }: { data: AnalyticsData['modelPerformance'] }) => {
    const size = 200;
    const center = size / 2;
    const numMetrics = data.length;
    
    const points = data.map((metric, i) => {
        const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
        const value = metric.value / 100;
        const x = center + center * 0.8 * value * Math.cos(angle);
        const y = center + center * 0.8 * value * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    return (
        <DashboardCard className="col-span-1 md:col-span-2">
            <CardTitle>Model Performance Metrics</CardTitle>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-full max-w-[200px] mx-auto">
                    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
                        {/* Background grid lines */}
                        {[...Array(5)].map((_, i) => (
                            <polygon 
                                key={i}
                                points={data.map((_, j) => {
                                    const angle = (Math.PI * 2 * j) / numMetrics - Math.PI / 2;
                                    const radius = center * 0.8 * ((i + 1) / 5);
                                    const x = center + radius * Math.cos(angle);
                                    const y = center + radius * Math.sin(angle);
                                    return `${x},${y}`;
                                }).join(' ')}
                                fill="none"
                                stroke="var(--border-main)"
                                strokeWidth="0.5"
                            />
                        ))}
                        {/* Data polygon */}
                        <polygon points={points} fill="rgba(96, 165, 250, 0.5)" stroke="#60a5fa" strokeWidth="2" />
                    </svg>
                </div>
                <div className="w-full md:w-1/2 space-y-2 text-sm text-[var(--text-muted)]">
                     {data.map(item => (
                        <div key={item.metric} className="flex items-center justify-between">
                            <span>{item.metric}</span>
                            <span className="font-bold text-[var(--text-main)]">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardCard>
    );
};


// KPI Trends Chart - Now with a third metric for Model Accuracy
const KPITrendsChart = ({ data }: { data: AnalyticsData['kpiTrends'] }) => {
    const maxValue = 100;
    const chartHeight = 150;
    const chartWidth = 300;
    const padding = 20;
    const xStep = (chartWidth - padding * 2) / (data.length - 1);
    
    const createPoints = (key: 'clientRetention' | 'projectSuccess' | 'modelAccuracy') => 
        data.map((d, i) => {
            const x = padding + i * xStep;
            const y = chartHeight - padding - ((d[key] / maxValue) * (chartHeight - padding * 2));
            return `${x},${y}`;
        }).join(' ');

    const clientPoints = createPoints('clientRetention');
    const projectPoints = createPoints('projectSuccess');
    const accuracyPoints = createPoints('modelAccuracy');

    return (
        <DashboardCard className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <CardTitle>Yearly KPI Trends</CardTitle>
            <div className="w-full h-64 relative">
                <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                    {/* Grid Lines */}
                    <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="var(--border-main)" strokeWidth="0.5"/>
                    <line x1={padding} y1={chartHeight - padding - 40} x2={chartWidth - padding} y2={chartHeight - padding - 40} stroke="var(--border-main)" strokeWidth="0.5" strokeDasharray="2"/>
                    <line x1={padding} y1={chartHeight - padding - 80} x2={chartWidth - padding} y2={chartHeight - padding - 80} stroke="var(--border-main)" strokeWidth="0.5" strokeDasharray="2"/>
                    <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="var(--border-main)" strokeWidth="0.5" strokeDasharray="2"/>
                    
                    {/* Data Lines */}
                    <polyline points={clientPoints} fill="none" stroke="#60a5fa" strokeWidth="2" />
                    <polyline points={projectPoints} fill="none" stroke="#a78bfa" strokeWidth="2" />
                    <polyline points={accuracyPoints} fill="none" stroke="#34d399" strokeWidth="2" />
                    
                    {/* X-axis Labels */}
                    {data.map((d, i) => (
                        <text key={d.year} x={padding + i * xStep} y={chartHeight - 5} fontSize="8" fill="var(--text-muted)" textAnchor="middle">
                            {d.year}
                        </text>
                    ))}
                </svg>
            </div>
            <div className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-xs text-[var(--text-muted)] mt-2">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#60a5fa]"></div><span>Client Retention (%)</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#a78bfa]"></div><span>Project Success (%)</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#34d399]"></div><span>Model Accuracy (%)</span></div>
            </div>
        </DashboardCard>
    );
};

// Team vs Department
const TeamDepartmentChart = ({ data }: { data: AnalyticsData['teamDepartments'] }) => {
    return (
        <DashboardCard className="col-span-1 md:col-span-2">
            <CardTitle>AI Team Specializations</CardTitle>
            <div className="space-y-4">
                {data.map(item => (
                    <div key={item.name}>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm font-medium text-[var(--text-main)]">{item.name}</p>
                          <p className="text-sm font-medium text-[var(--text-muted)]">{item.percentage}%</p>
                        </div>
                        <div className="w-full bg-[var(--border-main)] rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
};


// Main Analytics Dashboard Page Component
export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Load data on client side
    setAnalyticsData(getAnalyticsData());
  }, []);

  if (!analyticsData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--brand-primary)]"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <Navbar />
      <section className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen p-4 sm:p-6 lg:p-8 product-sans mt-12">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">AI Analytics Dashboard</h1>
            <p className="text-base text-[var(--text-muted)] mt-1">An overview of our AI-driven performance, innovation, and growth.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* --- Row 1: High-Level Stats & KPIs --- */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {analyticsData.statCards.map((stat, index) => (
                    <DashboardCard key={index}>
                        <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
                        <p className="text-3xl sm:text-4xl font-bold mt-2">{stat.value}</p>
                    </DashboardCard>
                ))}
            </div>

            {/* --- Row 2: Performance & Growth --- */}
            <KPITrendsChart data={analyticsData.kpiTrends} />
            <EmployeeYearChart data={analyticsData.employeeVsYear} />
            
            {/* --- Row 3: Talent & Technology --- */}
            <WorkforcePieChart data={analyticsData.workforceRoles} />
            <TechStackPieChart data={analyticsData.techStack} />
            <IndustryFocusPieChart data={analyticsData.industryFocus} />
            <TeamDepartmentChart data={analyticsData.teamDepartments} />

            {/* --- Row 4: Technical Deep Dive --- */}
            <ModelPerformanceRadarChart data={analyticsData.modelPerformance} />

          </div>
        </div>
      </section>
      <div className="mb-8"></div>
      <Footer />
    </>
  );
}