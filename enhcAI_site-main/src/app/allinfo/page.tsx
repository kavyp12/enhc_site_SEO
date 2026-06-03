// src/app/admin/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// Icons (same as before)
const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
  </svg>
);

const UserIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const BuildingIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CurrencyIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ServiceIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const DocumentIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ExternalLinkIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const EyeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m0 0l3.122 3.122M12 12L3 3m9 0l6 6" />
  </svg>
);

const LockIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// Types
interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: string;
  message: string;
  newsletter: boolean;
  created_at: string;
}

interface ProjectEnquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  launch_date: string;
  budget_min: number;
  budget_max: number;
  service: string;
  project_summary?: string;
  project_brief_url?: string;
  newsletter: boolean;
  created_at: string;
}

// Password Login Component
const PasswordLogin = ({ onLogin }: { onLogin: (password: string) => void }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await onLogin(password);
    } catch (err) {
      setError('Invalid password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen font-google-sans">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--brand-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
              <LockIcon className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Admin Access</h1>
            <p className="text-[var(--text-muted)]">Enter password to access admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-main)] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full px-4 py-3 pr-12 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent text-[var(--text-main)]"
                  placeholder="Enter admin password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--brand-primary)] text-white py-3 px-4 rounded-xl font-medium hover:bg-[var(--brand-primary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;600;700&display=swap');
        .font-google-sans { 
          font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        }
      `}</style>

      <Footer />
    </div>
  );
};

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'contacts' | 'enquiries'>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [enquiries, setEnquiries] = useState<ProjectEnquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated
  useEffect(() => {
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      setAdminPassword(savedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (password: string) => {
    // Test the password by trying to fetch data
    try {
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'x-admin-password': password
        }
      });

      if (response.ok) {
        setAdminPassword(password);
        setIsAuthenticated(true);
        // Save password in session storage (not persistent across browser sessions)
        sessionStorage.setItem('adminPassword', password);
      } else {
        throw new Error('Invalid password');
      }
    } catch (error) {
      throw new Error('Invalid password');
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'x-admin-password': adminPassword
        }
      });
      const result = await response.json();
      
      if (response.ok) {
        setContacts(result.contacts || []);
      } else {
        if (response.status === 401) {
          // Password is invalid, log out
          handleLogout();
          return;
        }
        setError(result.error || 'Failed to fetch contacts');
      }
    } catch (err) {
      setError('Network error while fetching contacts');
    }
  };

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/admin/project-enquiries', {
        headers: {
          'x-admin-password': adminPassword
        }
      });
      const result = await response.json();
      
      if (response.ok) {
        setEnquiries(result.enquiries || []);
      } else {
        if (response.status === 401) {
          // Password is invalid, log out
          handleLogout();
          return;
        }
        setError(result.error || 'Failed to fetch project enquiries');
      }
    } catch (err) {
      setError('Network error while fetching enquiries');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminPassword('');
    setContacts([]);
    setEnquiries([]);
    sessionStorage.removeItem('adminPassword');
  };

  useEffect(() => {
    if (isAuthenticated && adminPassword) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        
        await Promise.all([fetchContacts(), fetchEnquiries()]);
        
        setLoading(false);
      };

      fetchData();
    }
  }, [isAuthenticated, adminPassword]);

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <PasswordLogin onLogin={handleLogin} />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const ContactCard = ({ contact }: { contact: Contact }) => (
    <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-main)] hover:border-[var(--brand-primary)] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[var(--brand-primary)] rounded-full flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-main)]">{contact.name}</h3>
            <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
              <CalendarIcon />
              {formatDate(contact.created_at)}
            </p>
          </div>
        </div>
        {contact.newsletter && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Newsletter</span>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <MailIcon />
          <a href={`mailto:${contact.email}`} className="hover:text-[var(--brand-primary)]">
            {contact.email}
          </a>
        </div>
        {contact.phone && (
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <PhoneIcon />
            <a href={`tel:${contact.phone}`} className="hover:text-[var(--brand-primary)]">
              {contact.phone}
            </a>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <ServiceIcon />
          Source: {contact.source}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-[var(--bg-card-secondary)] rounded-lg">
        <p className="text-sm text-[var(--text-main)]">{contact.message}</p>
      </div>
    </div>
  );

  const EnquiryCard = ({ enquiry }: { enquiry: ProjectEnquiry }) => (
    <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-main)] hover:border-[var(--brand-primary)] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[var(--brand-primary)] rounded-full flex items-center justify-center">
            <BuildingIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-main)]">{enquiry.name}</h3>
            <p className="text-sm font-medium text-[var(--text-muted)]">{enquiry.company}</p>
            <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
              <CalendarIcon />
              {formatDate(enquiry.created_at)}
            </p>
          </div>
        </div>
        {enquiry.newsletter && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Newsletter</span>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <MailIcon />
            <a href={`mailto:${enquiry.email}`} className="hover:text-[var(--brand-primary)]">
              {enquiry.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <CalendarIcon />
            Launch: {new Date(enquiry.launch_date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <ServiceIcon />
            {enquiry.service}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <CurrencyIcon />
            {formatCurrency(enquiry.budget_min)} - {formatCurrency(enquiry.budget_max)}
          </div>
          {enquiry.project_brief_url && (
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <DocumentIcon />
              <a 
                href={enquiry.project_brief_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[var(--brand-primary)] flex items-center gap-1"
              >
                Project Brief <ExternalLinkIcon className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </div>
      
      {enquiry.project_summary && (
        <div className="mt-4 p-3 bg-[var(--bg-card-secondary)] rounded-lg">
          <h4 className="text-sm font-medium text-[var(--text-main)] mb-2">Project Summary:</h4>
          <p className="text-sm text-[var(--text-muted)]">{enquiry.project_summary}</p>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen font-google-sans">
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--brand-primary)] mx-auto mb-4"></div>
            <p className="text-lg text-[var(--text-muted)]">Loading admin data...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen font-google-sans">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-6xl sm:text-7xl font-semibold tracking-tighter">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
          <p className="text-lg text-[var(--text-muted)] mb-8">
            Manage contacts and project enquiries
          </p>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-main)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-1">Total Contacts</p>
                <p className="text-3xl font-bold text-[var(--text-main)]">{contacts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-main)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-1">Project Enquiries</p>
                <p className="text-3xl font-bold text-[var(--text-main)]">{enquiries.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <BuildingIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-main)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-1">Newsletter Subscribers</p>
                <p className="text-3xl font-bold text-[var(--text-main)]">
                  {contacts.filter(c => c.newsletter).length + enquiries.filter(e => e.newsletter).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <MailIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-main)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-1">Avg. Budget</p>
                <p className="text-3xl font-bold text-[var(--text-main)]">
                  {enquiries.length > 0 
                    ? formatCurrency(
                        enquiries.reduce((sum, e) => sum + (e.budget_min + e.budget_max) / 2, 0) / enquiries.length
                      )
                    : '₹0'
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <CurrencyIcon className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-[var(--border-main)]">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'contacts'
                    ? 'border-[var(--brand-primary)] text-[var(--brand-primary)]'
                    : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-gray-300'
                }`}
              >
                Contact Forms ({contacts.length})
              </button>
              <button
                onClick={() => setActiveTab('enquiries')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'enquiries'
                    ? 'border-[var(--brand-primary)] text-[var(--brand-primary)]'
                    : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-gray-300'
                }`}
              >
                Project Enquiries ({enquiries.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'contacts' ? (
            contacts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {contacts.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <UserIcon className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
                <p className="text-lg text-[var(--text-muted)]">No contacts found</p>
              </div>
            )
          ) : (
            enquiries.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {enquiries.map((enquiry) => (
                  <EnquiryCard key={enquiry.id} enquiry={enquiry} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BuildingIcon className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
                <p className="text-lg text-[var(--text-muted)]">No project enquiries found</p>
              </div>
            )
          )}
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;600;700&display=swap');
        .font-google-sans { 
          font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default AdminPage;