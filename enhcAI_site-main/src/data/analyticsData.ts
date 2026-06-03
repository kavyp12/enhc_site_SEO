// src/data/analyticsData.ts

export interface EmployeeYearData {
  year: string;
  expected: number | null;
  actual: number;
}

export interface TechStackItem {
  name: string;
  percentage: number;
  color: string;
}

export interface WorkforceRoleItem {
  name: string;
  percentage: number;
  color: string;
}

export interface IndustryFocusItem {
  name: string;
  percentage: number;
  color: string;
}

export interface ModelPerformanceMetric {
    metric: string;
    value: number; // A score out of 100
}

export interface KPITrendPoint {
  year: string;
  clientRetention: number;
  projectSuccess: number;
  modelAccuracy: number; // New KPI for AI
}

export interface TeamDepartmentItem {
  name: string;
  percentage: number;
}

export interface StatCard {
  label: string;
  value: string | number;
}

export interface AnalyticsData {
  employeeVsYear: EmployeeYearData[];
  techStack: TechStackItem[];
  workforceRoles: WorkforceRoleItem[];
  industryFocus: IndustryFocusItem[];
  modelPerformance: ModelPerformanceMetric[];
  kpiTrends: KPITrendPoint[];
  teamDepartments: TeamDepartmentItem[];
  statCards: StatCard[];
}

// Default data tailored for an AI Company
const defaultAnalyticsData: AnalyticsData = {
  employeeVsYear: [
    { year: '2021', expected: 10, actual: 12 },
    { year: '2022', expected: 25, actual: 30 },
    { year: '2023', expected: 60, actual: 75 },
    { year: '2024', expected: 120, actual: 135 },
    { year: '2025', expected: 200, actual: 190 },
    { year: '2026', expected: null, actual: 250 },
  ],
  techStack: [
    { name: 'TensorFlow/PyTorch', percentage: 40, color: '#3b82f6' },
    { name: 'Large Language Models (LLMs)', percentage: 25, color: '#60a5fa' },
    { name: 'Computer Vision (CV)', percentage: 20, color: '#93c5fd' },
    { name: 'Cloud & MLOps', percentage: 10, color: '#bfdbfe' },
    { name: 'Data Engineering', percentage: 5, color: '#dbeafe' },
  ],
  workforceRoles: [
    { name: 'AI/ML Engineers', percentage: 40, color: '#3b82f6' },
    { name: 'Data Scientists', percentage: 25, color: '#60a5fa' },
    { name: 'Research Scientists', percentage: 15, color: '#93c5fd' },
    { name: 'MLOps & DevOps', percentage: 10, color: '#bfdbfe' },
    { name: 'Project Managers', percentage: 10, color: '#dbeafe' },
  ],
  industryFocus: [
    { name: 'Healthcare AI', percentage: 30, color: '#8b5cf6' },
    { name: 'FinTech Solutions', percentage: 25, color: '#a78bfa' },
    { name: 'Retail & E-commerce', percentage: 20, color: '#c4b5fd' },
    { name: 'Automotive Tech', percentage: 15, color: '#ddd6fe' },
    { name: 'Other', percentage: 10, color: '#e0e7ff' },
  ],
  modelPerformance: [
      { metric: 'Accuracy', value: 96 },
      { metric: 'Precision', value: 92 },
      { metric: 'Recall', value: 89 },
      { metric: 'Efficiency', value: 95 },
      { metric: 'Scalability', value: 98 },
      { metric: 'Interpretability', value: 85 },
  ],
  kpiTrends: [
    { year: '2021', clientRetention: 85, projectSuccess: 88, modelAccuracy: 91 },
    { year: '2022', clientRetention: 88, projectSuccess: 91, modelAccuracy: 92 },
    { year: '2023', clientRetention: 92, projectSuccess: 95, modelAccuracy: 94 },
    { year: '2024', clientRetention: 95, projectSuccess: 98, modelAccuracy: 96 },
  ],
  teamDepartments: [
    { name: 'Natural Language Processing (NLP)', percentage: 85 },
    { name: 'Computer Vision', percentage: 78 },
    { name: 'Predictive Analytics', percentage: 92 },
    { name: 'Robotics & Automation', percentage: 65 },
    { name: 'Core Research', percentage: 70 },
  ],
  statCards: [
    { label: 'AI Models Deployed', value: '150+' },
    { label: 'Petabytes Processed', value: '75 PB' },
    { label: 'Research Papers Published', value: 25 },
  ],
};

// This function will be used to fetch data from localStorage or return default
export const getAnalyticsData = (): AnalyticsData => {
  if (typeof window === 'undefined') {
    return defaultAnalyticsData;
  }

  try {
    const stored = localStorage.getItem('analyticsData');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading analytics data:', error);
  }
  
  return defaultAnalyticsData;
};

// Function to save analytics data
export const saveAnalyticsData = (data: AnalyticsData): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('analyticsData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving analytics data:', error);
  }
};

// Function to reset to default data
export const resetAnalyticsData = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('analyticsData');
  } catch (error) {
    console.error('Error resetting analytics data:', error);
  }
};

export default defaultAnalyticsData;