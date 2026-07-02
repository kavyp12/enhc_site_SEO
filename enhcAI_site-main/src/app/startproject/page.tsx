"use client";

import React, { useState } from "react";
import Footer from '../components/footer';
import Navbar from '../components/navbar';

// New Arrow Icon component as requested, with adjusted size for the button
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

// Interface for our form data state
interface IFormData {
  name: string;
  email: string;
  company: string;
  launchDate: string;
  budgetMin: string;
  budgetMax: string;
  service: string;
  projectSummary: string;
  projectBrief: File | null;
  newsletter: boolean;
}

// Type for our errors state, allowing any key from IFormData to be a string
type FormErrors = Partial<Record<keyof IFormData, string>>;

export default function StartProject() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to hold all form data with a clear type and initial values
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    company: "",
    launchDate: "",
    budgetMin: "",
    budgetMax: "",
    service: "",
    projectSummary: "",
    projectBrief: null,
    newsletter: false,
  });

  // State to hold validation errors, typed correctly
  const [errors, setErrors] = useState<FormErrors>({});

  // Universal handler for input changes with typed event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, name, value, type } = e.target;
    const key = (id || name) as keyof IFormData;

    // Clear the error for the field being updated
    if (errors[key]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[key];
        return newErrors;
      });
    }

    if (type === 'file') {
        const files = (e.target as HTMLInputElement).files;
        setFormData(prevState => ({ ...prevState, [key]: files ? files[0] : null }));
    } else if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prevState => ({ ...prevState, [key]: checked }));
    } else {
        setFormData(prevState => ({ ...prevState, [key]: value }));
    }
  };

  // Special handler for service selection (radio buttons)
  const handleServiceChange = (service: string) => {
    // Clear the error for service field
    if (errors.service) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors.service;
        return newErrors;
      });
    }
    
    setFormData(prevState => ({ ...prevState, service }));
  };

  // Validation logic for each step
  const validateStep = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          tempErrors.name = "Name is required.";
          isValid = false;
        }
        if (!formData.email.trim()) {
          tempErrors.email = "Email is required.";
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          tempErrors.email = "Email address is invalid.";
          isValid = false;
        }
        if (!formData.company.trim()) {
          tempErrors.company = "Company is required.";
          isValid = false;
        }
        break;
      case 2:
        if (!formData.launchDate.trim()) {
          tempErrors.launchDate = "A launch date is required.";
          isValid = false;
        }
        if (!formData.budgetMin.trim()) {
          tempErrors.budgetMin = "Minimum budget is required.";
          isValid = false;
        }
        if (!formData.budgetMax.trim()) {
          tempErrors.budgetMax = "Maximum budget is required.";
          isValid = false;
        }
        // Additional budget validation
        if (formData.budgetMin && formData.budgetMax) {
          const min = parseInt(formData.budgetMin);
          const max = parseInt(formData.budgetMax);
          if (!isNaN(min) && !isNaN(max) && min > max) {
            tempErrors.budgetMin = "Minimum budget cannot be greater than maximum budget.";
            isValid = false;
          }
        }
        break;
      case 3:
        if (!formData.service) {
          tempErrors.service = "Please select a service.";
          isValid = false;
        }
        break;
      default:
        break;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handler for the 'Next Step' button
  const handleNextStep = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  // Show success message
  const showMessage = (message: string, type: 'success' | 'error') => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed; 
      top: 20px; 
      left: 50%; 
      transform: translateX(-50%); 
      background-color: ${type === 'success' ? '#4CAF50' : '#f44336'}; 
      color: white; 
      padding: 16px 24px; 
      border-radius: 8px; 
      z-index: 1000; 
      max-width: 90%; 
      text-align: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
      if (document.body.contains(messageDiv)) {
        document.body.removeChild(messageDiv);
      }
    }, type === 'success' ? 5000 : 7000);
  };
  
  // Handler for the final form submission with a typed event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tempErrors: FormErrors = {};
    let isValid = true;

    // Final validation for the last step
    if (!formData.projectSummary.trim() && !formData.projectBrief) {
        tempErrors.projectSummary = "Please provide a project summary or upload a brief.";
        isValid = false;
    }
    setErrors(tempErrors);

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('company', formData.company);
      submitData.append('launchDate', formData.launchDate);
      submitData.append('budgetMin', formData.budgetMin);
      submitData.append('budgetMax', formData.budgetMax);
      submitData.append('service', formData.service);
      submitData.append('projectSummary', formData.projectSummary);
      submitData.append('newsletter', formData.newsletter.toString());
      
      if (formData.projectBrief) {
        submitData.append('projectBrief', formData.projectBrief);
      }

      // Submit to your API endpoint
      const response = await fetch('/api/project-enquiry', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        // Success feedback
        showMessage(result.message || 'Project enquiry sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          launchDate: "",
          budgetMin: "",
          budgetMax: "",
          service: "",
          projectSummary: "",
          projectBrief: null,
          newsletter: false,
        });
        setStep(1);
        setErrors({});
      } else {
        // Error feedback
        showMessage(result.error || 'Something went wrong. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      showMessage('Network error. Please check your connection and try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            {/* Progress Bar for Step 1 */}
            <div className="mb-8">
              <div className="h-2 bg-[var(--bg-card-secondary)] rounded-full overflow-hidden">
                <div
                  className="w-1/4 h-full bg-gradient-to-r from-[var(--brand-primary)] to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <p className="mt-3 text-sm text-[var(--text-muted)] font-medium">
                Step 1 of 4
              </p>
            </div>

            {/* Form Heading */}
            <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-[var(--text-main)] leading-tight">
              Let&apos;s start at the very beginning
            </h1>

            {/* Input Fields for Step 1 */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 border border-[var(--border-main)] rounded-xl bg-[var(--bg-card)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-300"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-[var(--border-main)] rounded-xl bg-[var(--bg-card)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-300"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="company" className="sr-only">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-4 border border-[var(--border-main)] rounded-xl bg-[var(--bg-card)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-300"
                />
                {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
              </div>
            </div>

            {/* Navigation Button for Step 1 */}
            <button
              type="button"
              onClick={handleNextStep}
              className="mt-8 w-full md:w-auto group bg-[var(--brand-primary)] text-white font-semibold px-8 py-4 rounded-xl hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-4 hover:shadow-lg hover:scale-105"
            >
              Next Step
              <div className="transition-transform duration-300 group-hover:translate-x-2">
                <ArrowIcon />
              </div>
            </button>
            <p className="mt-6 text-sm text-[var(--text-muted)] text-center md:text-left">
              By proceeding, you agree to our{" "}
              <a href="#" className="text-[var(--brand-primary)] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[var(--brand-primary)] hover:underline">
                Privacy Policy
              </a>
            </p>
          </>
        );

      case 2:
        return (
          <>
            {/* Progress Bar for Step 2 */}
            <div className="mb-8">
              <div className="h-2 bg-[var(--bg-card-secondary)] rounded-full overflow-hidden">
                <div
                  className="w-2/4 h-full bg-gradient-to-r from-[var(--brand-primary)] to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <p className="mt-3 text-sm text-[var(--text-muted)] font-medium">
                Step 2 of 4
              </p>
            </div>

            {/* Form Heading */}
            <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-[var(--text-main)] leading-tight">
              Let&apos;s talk budget & timelines
            </h1>

            {/* Budget & Timelines Form */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="launchDate"
                  className="block text-lg font-semibold mb-2 text-[var(--text-main)]"
                >
                  I want to launch my project on:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="launchDate"
                    placeholder="DD/MM/YYYY"
                    value={formData.launchDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 pr-12 border border-[var(--border-main)] rounded-xl bg-[var(--bg-card)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-300"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-6 h-6 text-[var(--text-muted)]"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                {errors.launchDate && <p className="mt-1 text-sm text-red-500">{errors.launchDate}</p>}
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2 text-[var(--text-main)]">
                  My budget is between
                </label>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative flex-1 w-full">
                    <input
                      type="number"
                      id="budgetMin"
                      placeholder="e.g., 500000"
                      value={formData.budgetMin}
                      onChange={handleChange}
                      min="0"
                      className="w-full p-4 pr-10 border border-[var(--border-main)] rounded-xl bg-[var(--bg-card)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-lg font-bold text-[var(--text-muted)]">
                      ₹
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-[var(--text-main)]">and</span>
                  <div className="relative flex-1 w-full">
                    <input
                      type="number"
                      id="budgetMax"
                      placeholder="e.g., 1000000"
                      value={formData.budgetMax}
                      onChange={handleChange}
                      min="0"
                      className="w-full p-4 pr-10 border border-[var(--border-main)] rounded-xl bg-[var(--bg-card)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-lg font-bold text-[var(--text-muted)]">
                      ₹
                    </div>
                  </div>
                </div>
                 {(errors.budgetMin || errors.budgetMax) && <p className="mt-1 text-sm text-red-500">{errors.budgetMin || errors.budgetMax}</p>}
              </div>
            </div>

            {/* Navigation Buttons for Step 2 */}
            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full md:w-auto flex items-center justify-center gap-2 text-[var(--text-main)] font-semibold px-6 py-4 rounded-xl hover:text-[var(--brand-primary)] transition-all duration-300"
              >
                <svg
                  className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full md:w-auto group bg-[var(--brand-primary)] text-white font-semibold px-8 py-4 rounded-xl hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-4 hover:shadow-lg hover:scale-105"
              >
                Next Step
                <div className="transition-transform duration-300 group-hover:translate-x-2">
                  <ArrowIcon />
                </div>
              </button>
            </div>
          </>
        );

      case 3:
        return (
          <>
            {/* Progress Bar for Step 3 */}
            <div className="mb-8">
              <div className="h-2 bg-[var(--bg-card-secondary)] rounded-full overflow-hidden">
                <div
                  className="w-3/4 h-full bg-gradient-to-r from-[var(--brand-primary)] to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="mt-3 text-sm text-[var(--text-muted)] font-medium">
                Step 3 of 4
              </p>
            </div>

            {/* Form Heading */}
            <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-[var(--text-main)] leading-tight">
              What services do you require?
            </h1>

            {/* Services Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Website', 'eCommerce', 'SEO', 'Branding', 'Illustration', 'Photography', 'Videography', 'Content Writing', 'Web Hosting', 'I want it all!'].map((service) => (
                <div
                  key={service}
                  onClick={() => handleServiceChange(service)}
                  className={`relative p-4 border rounded-xl bg-[var(--bg-card)] text-center cursor-pointer transition-all duration-300 ${
                    formData.service === service
                      ? "border-[var(--brand-primary)] ring-2 ring-offset-2 ring-offset-[var(--bg-main)] ring-[var(--brand-primary)]"
                      : "border-[var(--border-main)] hover:border-[var(--brand-primary)]"
                  }`}
                >
                  <div className="flex items-center justify-center h-full w-full">
                    <span className="text-base font-medium text-[var(--text-main)]">{service}</span>
                  </div>
                  <div className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      formData.service === service ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]' : 'border-[var(--border-main)]'
                  }`}>
                    {formData.service === service && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors.service && <p className="mt-2 text-sm text-red-500">{errors.service}</p>}

            {/* Navigation Buttons for Step 3 */}
            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full md:w-auto flex items-center justify-center gap-2 text-[var(--text-main)] font-semibold px-6 py-4 rounded-xl hover:text-[var(--brand-primary)] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full md:w-auto group bg-[var(--brand-primary)] text-white font-semibold px-8 py-4 rounded-xl hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-4 hover:shadow-lg hover:scale-105"
              >
                Next Step
                <div className="transition-transform duration-300 group-hover:translate-x-2">
                  <ArrowIcon />
                </div>
              </button>
            </div>
          </>
        );

      case 4:
        return (
          <>
            {/* Progress Bar for Step 4 */}
            <div className="mb-8">
              <div className="h-2 bg-[var(--bg-card-secondary)] rounded-full overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-r from-[var(--brand-primary)] to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <p className="mt-3 text-sm text-[var(--text-muted)] font-medium">
                Step 4 of 4
              </p>
            </div>

            {/* Form Heading */}
            <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-[var(--text-main)] leading-tight">
              Give us the deets!
            </h1>

            {/* Project Details Form */}
            <div className="space-y-6">
              <div className="relative">
                <label htmlFor="projectSummary" className="sr-only">
                  Project Summary
                </label>
                <textarea
                  id="projectSummary"
                  rows={6}
                  placeholder="Please provide a summary of your project"
                  value={formData.projectSummary}
                  onChange={handleChange}
                  className="w-full p-4 border border-[var(--border-main)] rounded-xl bg-[var(--bg-card)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-300 resize-none"
                ></textarea>
                 {errors.projectSummary && <p className="mt-1 text-sm text-red-500">{errors.projectSummary}</p>}
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">
                  Or upload a project brief
                  <span className="ml-2">File size PDF, docx, max. 10 MB</span>
                </p>
                <label
                  htmlFor="projectBrief"
                  className="flex items-center justify-center p-8 border-2 border-dashed border-[var(--border-main)] rounded-xl bg-[var(--bg-card)] cursor-pointer hover:border-[var(--brand-primary)] transition-all duration-300"
                >
                  <svg className="w-8 h-8 text-[var(--text-muted)] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div>
                    <span className="text-[var(--text-main)] font-medium">Choose File</span>
                    <span className="ml-2 text-[var(--text-muted)]">
                      {formData.projectBrief ? formData.projectBrief.name : "No file chosen"}
                    </span>
                  </div>
                </label>
                <input 
                  type="file" 
                  id="projectBrief" 
                  onChange={handleChange} 
                  accept=".pdf,.doc,.docx"
                  className="sr-only" 
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="h-4 w-4 rounded text-[var(--brand-primary)] focus:ring-[var(--brand-primary)] border-[var(--border-main)]" />
                <label htmlFor="newsletter" className="ml-2 text-sm text-[var(--text-main)]">
                  Subscribe to our newsletter for all the latest Shape goss!
                </label>
              </div>
            </div>

            {/* Navigation Buttons for Step 4 */}
            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={isSubmitting}
                className="w-full md:w-auto flex items-center justify-center gap-2 text-[var(--text-main)] font-semibold px-6 py-4 rounded-xl hover:text-[var(--brand-primary)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto group font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-4 ${
                  isSubmitting 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-[var(--brand-primary)] text-white hover:bg-emerald-600 hover:shadow-lg hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <div className="transition-transform duration-300 group-hover:translate-x-2">
                      <ArrowIcon />
                    </div>
                  </>
                )}
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style jsx global>{`

        .product-sans {
          font-family: "Product Sans", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>
      
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 product-sans">
        {/* Navbar */}
        <Navbar />

        <main className="container mx-auto p-4 md:p-8 lg:p-12 mt-24">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            {/* Image Section - left on desktop, below on mobile */}
            <div className="w-full lg:w-2/5 relative rounded-3xl overflow-hidden shadow-2xl mt-12 lg:mt-0 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Modern workspace with laptop and coffee"
                className="w-full h-[300px] lg:h-[600px] object-cover"
              />
            </div>

            {/* Form Section - right on desktop, top on mobile */}
            <div className="w-full lg:w-3/5 p-4 sm:p-8 order-1 lg:order-2">
              <form onSubmit={handleSubmit} noValidate>
                {renderStep()}
              </form>
            </div>
          </div>
        </main>

        {/* Footer */}
      </div>
      <Footer />
    </>
  );
}