"use client";
import React, { useState, useMemo } from 'react';
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';

// Font import via CSS-in-JS
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Product+Sans&display=swap');
  
  .product-sans {
    font-family: 'Product Sans', sans-serif;
  }
`;

const ArrowUpRightIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
);

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    employees: 50,
    avgSalary: 50000,
    hoursPerWeek: 10,
    implementationCost: 25000,
    monthlyCost: 2000,
  });

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const calculations = useMemo(() => {
    const { employees, avgSalary, hoursPerWeek, implementationCost, monthlyCost } = formData;
    
    // Calculate hourly rate
    const hourlyRate = avgSalary / 2080; // Assuming 2080 working hours per year
    
    // Annual time savings
    const hoursPerYear = hoursPerWeek * 52;
    const totalHoursSaved = hoursPerYear * employees;
    
    // Annual cost savings
    const annualSavings = totalHoursSaved * hourlyRate;
    
    // Total investment (first year)
    const totalInvestment = implementationCost + (monthlyCost * 12);
    
    // ROI calculation
    const netBenefit = annualSavings - totalInvestment;
    const roi = ((netBenefit / totalInvestment) * 100);
    
    // Payback period (in months)
    const monthlyBenefit = annualSavings / 12;
    const monthlyNet = monthlyBenefit - monthlyCost;
    const paybackMonths = monthlyNet > 0 ? implementationCost / monthlyNet : 0;
    
    // 3-year projection
    const threeYearSavings = (annualSavings * 3) - implementationCost - (monthlyCost * 36);
    
    return {
      hourlyRate,
      totalHoursSaved,
      annualSavings,
      totalInvestment,
      netBenefit,
      roi,
      paybackMonths,
      threeYearSavings,
      monthlyBenefit
    };
  }, [formData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const inputStyles = "w-full bg-[var(--bg-card-secondary)] text-[var(--text-main)] p-4 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] product-sans text-lg font-medium";

  return (
    <>
        <Navbar />
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <section className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen py-16 px-4 sm:px-8 product-sans mt-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm text-[var(--text-muted)] mb-4 flex items-center justify-center">
              <span className="w-2 h-2 bg-[var(--brand-primary)] rounded-full mr-3"></span>
              ROI Calculator
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 leading-tight product-sans">
              Calculate Your AI Investment Return
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
              Discover how AI automation can transform your business efficiency and generate substantial returns on your investment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-[var(--bg-card)] rounded-3xl p-8 sm:p-10 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-8 product-sans">Your Business Parameters</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-3 product-sans">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    value={formData.employees}
                    onChange={(e) => handleInputChange('employees', e.target.value)}
                    className={inputStyles}
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-3 product-sans">
                    Average Annual Salary ($)
                  </label>
                  <input
                    type="number"
                    value={formData.avgSalary}
                    onChange={(e) => handleInputChange('avgSalary', e.target.value)}
                    className={inputStyles}
                    min="0"
                    step="1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-3 product-sans">
                    Hours Saved Per Employee/Week
                  </label>
                  <input
                    type="number"
                    value={formData.hoursPerWeek}
                    onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                    className={inputStyles}
                    min="0"
                    step="0.5"
                  />
                </div>

                <div className="pt-6 border-t border-[var(--border-main)]">
                  <h3 className="text-xl font-semibold mb-6 product-sans">AI Implementation Costs</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-muted)] mb-3 product-sans">
                        Initial Implementation Cost ($)
                      </label>
                      <input
                        type="number"
                        value={formData.implementationCost}
                        onChange={(e) => handleInputChange('implementationCost', e.target.value)}
                        className={inputStyles}
                        min="0"
                        step="1000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-muted)] mb-3 product-sans">
                        Monthly Maintenance Cost ($)
                      </label>
                      <input
                        type="number"
                        value={formData.monthlyCost}
                        onChange={(e) => handleInputChange('monthlyCost', e.target.value)}
                        className={inputStyles}
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Main ROI Card */}
              <div className="bg-gradient-to-br from-[var(--brand-primary)] to-[#1a3b5f] rounded-3xl p-8 sm:p-10 text-white shadow-2xl">
                <h2 className="text-xl font-medium mb-2 opacity-90 product-sans">Expected ROI</h2>
                <div className="text-5xl sm:text-6xl font-bold mb-6 product-sans">
                  {calculations.roi > 0 ? '+' : ''}{calculations.roi.toFixed(1)}%
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-80 mb-1 product-sans">Payback Period</p>
                    <p className="text-2xl font-semibold product-sans">
                      {calculations.paybackMonths > 0 ? `${calculations.paybackMonths.toFixed(1)} mo` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80 mb-1 product-sans">Annual Savings</p>
                    <p className="text-2xl font-semibold product-sans">{formatCurrency(calculations.annualSavings)}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="bg-[var(--bg-card)] rounded-3xl p-8 sm:p-10 shadow-xl">
                <h3 className="text-2xl font-semibold mb-6 product-sans">Detailed Analysis</h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-[var(--border-main)]">
                    <span className="text-[var(--text-muted)] product-sans">Total Hours Saved/Year</span>
                    <span className="text-xl font-semibold product-sans">{formatNumber(calculations.totalHoursSaved)}</span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-[var(--border-main)]">
                    <span className="text-[var(--text-muted)] product-sans">Annual Cost Savings</span>
                    <span className="text-xl font-semibold text-green-500 product-sans">{formatCurrency(calculations.annualSavings)}</span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-[var(--border-main)]">
                    <span className="text-[var(--text-muted)] product-sans">First Year Investment</span>
                    <span className="text-xl font-semibold text-red-400 product-sans">{formatCurrency(calculations.totalInvestment)}</span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-[var(--border-main)]">
                    <span className="text-[var(--text-muted)] product-sans">First Year Net Benefit</span>
                    <span className={`text-xl font-semibold product-sans ${calculations.netBenefit > 0 ? 'text-green-500' : 'text-red-400'}`}>
                      {formatCurrency(calculations.netBenefit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[var(--text-muted)] product-sans">3-Year Projection</span>
                    <span className="text-xl font-semibold text-green-500 product-sans">{formatCurrency(calculations.threeYearSavings)}</span>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-[var(--bg-card-secondary)] rounded-3xl p-8 text-center">
                <h3 className="text-xl font-semibold mb-3 product-sans">Ready to Transform Your Business?</h3>
                <p className="text-[var(--text-muted)] mb-6 product-sans">
                  Let's discuss how our AI solutions can deliver these results for your organization.
                </p>
                <button className="bg-[var(--brand-primary)] text-white font-semibold py-3 px-8 rounded-full inline-flex items-center gap-2 hover:bg-[var(--brand-primary-hover)] transition-all duration-300 hover:scale-105 product-sans">
                  Schedule a Consultation
                  <ArrowUpRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Info Section */}
          <div className="mt-16 bg-[var(--bg-card)] rounded-3xl p-8 sm:p-10">
            <h3 className="text-2xl font-semibold mb-6 product-sans">Understanding Your ROI</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-2 text-lg product-sans">Time Savings</h4>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed product-sans">
                  AI automation reduces repetitive tasks, freeing your team to focus on high-value strategic work.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg product-sans">Cost Efficiency</h4>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed product-sans">
                  Lower operational costs through intelligent automation while maintaining quality and accuracy.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg product-sans">Scalability</h4>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed product-sans">
                  AI solutions scale with your business, providing exponential returns as you grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ROICalculator;