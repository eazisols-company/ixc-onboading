'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { localStorageUtil } from '@/utils/localStorage';

export interface OnboardingData {
  businessProfile: {
    businessName: string;
    businessType: string;
    industry: string;
    ein: string;
    state: string;
    city: string;
    street: string;
    building: string;
    zip: string;
  };
  customers: Array<{
    customerName: string;
    contactPerson: string;
    email: string;
    phone: string;
    billingAddress: string;
  }>;
  bankConnection: {
    bankId: string;
    bankName: string;
    isManual: boolean;
  };
  invoices: Array<{
    name: string;
    size: number;
  }>;
}

export interface UserProfile {
  fullName: string;
  phoneNumber: string;
  jobTitle: string;
}

export interface FactoringAgreement {
  agreed: boolean;
  signature: string;
  signedAt: Date | null;
  agreementVersion: string;
}

export interface CreditTerms {
  creditLimit: number;
  factoringRate: number;
  approvedBy: string;
}

type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

interface UserContextType {
  // Authentication & User Info
  isAuthenticated: boolean;
  userEmail: string | null;
  userProfile: UserProfile | null;
  
  // Onboarding Data
  onboardingData: OnboardingData | null;
  factoringAgreement: FactoringAgreement | null;
  
  // Application Status & Timeline
  applicationStatus: ApplicationStatus;
  startedAt: Date | null;
  submittedAt: Date | null;
  approvedAt: Date | null;
  rejectedAt: Date | null;
  lastActivityAt: Date | null;
  
  // Decision & Terms
  rejectionReason: string | null;
  reviewNotes: string | null;
  creditTerms: CreditTerms | null;
  
  // Navigation & Progress
  isLoading: boolean;
  currentStep: number;
  completedSteps: number[];
  
  // Actions
  signIn: (email: string, fullName?: string) => void;
  signOut: () => void;
  saveUserProfile: (profile: UserProfile) => void;
  saveOnboardingData: (data: OnboardingData) => void;
  saveFactoringAgreement: (agreement: FactoringAgreement) => void;
  saveCurrentStep: (step: number) => void;
  markStepCompleted: (step: number) => void;
  submitApplication: () => void;
  updateApplicationDecision: (
    status: 'approved' | 'rejected',
    options?: {
      rejectionReason?: string;
      reviewNotes?: string;
      creditTerms?: CreditTerms;
    }
  ) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// localStorage keys - centralized for easy maintenance
const STORAGE_KEYS = {
  // Authentication & User
  AUTH: 'isAuthenticated',
  EMAIL: 'userEmail',
  USER_PROFILE: 'userProfile',
  
  // Onboarding Data
  ONBOARDING: 'onboardingData',
  AGREEMENT: 'factoringAgreement',
  
  // Application Status & Timeline
  STATUS: 'applicationStatus',
  STARTED: 'startedAt',
  SUBMITTED: 'submittedAt',
  APPROVED: 'approvedAt',
  REJECTED: 'rejectedAt',
  LAST_ACTIVITY: 'lastActivityAt',
  
  // Decision & Terms
  REJECTION_REASON: 'rejectionReason',
  REVIEW_NOTES: 'reviewNotes',
  CREDIT_TERMS: 'creditTerms',
  
  // Navigation & Progress
  STEP: 'currentStep',
  COMPLETED_STEPS: 'completedSteps',
} as const;

// Validate application status
const isValidStatus = (status: string): status is ApplicationStatus => {
  return ['pending', 'under_review', 'approved', 'rejected'].includes(status);
};

export function UserProvider({ children }: { children: ReactNode }) {
  // Helper to parse dates safely
  const parseDate = (dateString: string | null): Date | null => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  // Initialize all state with default values to avoid hydration mismatch
  // Authentication & User Info
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Onboarding Data
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [factoringAgreement, setFactoringAgreement] = useState<FactoringAgreement | null>(null);

  // Application Status & Timeline
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>('pending');
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);
  const [approvedAt, setApprovedAt] = useState<Date | null>(null);
  const [rejectedAt, setRejectedAt] = useState<Date | null>(null);
  const [lastActivityAt, setLastActivityAt] = useState<Date | null>(null);

  // Decision & Terms
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState<string | null>(null);
  const [creditTerms, setCreditTerms] = useState<CreditTerms | null>(null);

  // Navigation & Progress
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Loading state to prevent hydration issues
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage after hydration (client-side only)
  React.useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const savedAuth = localStorageUtil.getItem(STORAGE_KEYS.AUTH);
    const savedEmail = localStorageUtil.getItem(STORAGE_KEYS.EMAIL);
    const savedUserProfile = localStorageUtil.getJSON<UserProfile>(STORAGE_KEYS.USER_PROFILE);
    const savedOnboardingData = localStorageUtil.getJSON<OnboardingData>(STORAGE_KEYS.ONBOARDING);
    const savedAgreement = localStorageUtil.getJSON<{
      agreed: boolean;
      signature: string;
      signedAt: string | null;
      agreementVersion: string;
    }>(STORAGE_KEYS.AGREEMENT);
    const savedStatus = localStorageUtil.getItem(STORAGE_KEYS.STATUS);
    const savedStartedAt = localStorageUtil.getItem(STORAGE_KEYS.STARTED);
    const savedSubmittedAt = localStorageUtil.getItem(STORAGE_KEYS.SUBMITTED);
    const savedApprovedAt = localStorageUtil.getItem(STORAGE_KEYS.APPROVED);
    const savedRejectedAt = localStorageUtil.getItem(STORAGE_KEYS.REJECTED);
    const savedLastActivityAt = localStorageUtil.getItem(STORAGE_KEYS.LAST_ACTIVITY);
    const savedRejectionReason = localStorageUtil.getItem(STORAGE_KEYS.REJECTION_REASON);
    const savedReviewNotes = localStorageUtil.getItem(STORAGE_KEYS.REVIEW_NOTES);
    const savedCreditTerms = localStorageUtil.getJSON<CreditTerms>(STORAGE_KEYS.CREDIT_TERMS);
    const savedStep = localStorageUtil.getItem(STORAGE_KEYS.STEP);
    const savedCompletedSteps = localStorageUtil.getJSON<number[]>(STORAGE_KEYS.COMPLETED_STEPS);

    // Batch state updates
    if (savedAuth === 'true' && savedEmail) {
      setIsAuthenticated(true);
      setUserEmail(savedEmail);
    }

    if (savedUserProfile) {
      setUserProfile(savedUserProfile);
    }

    if (savedOnboardingData) {
      setOnboardingData(savedOnboardingData);
    }

    if (savedAgreement) {
      setFactoringAgreement({
        ...savedAgreement,
        signedAt: parseDate(savedAgreement.signedAt),
      });
    }

    if (savedStatus && isValidStatus(savedStatus)) {
      setApplicationStatus(savedStatus);
    }

    setStartedAt(parseDate(savedStartedAt));
    setSubmittedAt(parseDate(savedSubmittedAt));
    setApprovedAt(parseDate(savedApprovedAt));
    setRejectedAt(parseDate(savedRejectedAt));
    setLastActivityAt(parseDate(savedLastActivityAt));

    if (savedRejectionReason) {
      setRejectionReason(savedRejectionReason);
    }

    if (savedReviewNotes) {
      setReviewNotes(savedReviewNotes);
    }

    if (savedCreditTerms) {
      setCreditTerms(savedCreditTerms);
    }

    if (savedStep) {
      const step = parseInt(savedStep, 10);
      if (!isNaN(step)) {
        setCurrentStep(step);
      }
    }

    if (savedCompletedSteps) {
      setCompletedSteps(savedCompletedSteps);
    }

    // Mark as loaded
    setIsLoading(false);
  }, []);

  // Update last activity timestamp
  const updateLastActivity = useCallback(() => {
    const now = new Date();
    setLastActivityAt(now);
    localStorageUtil.setItem(STORAGE_KEYS.LAST_ACTIVITY, now.toISOString());
  }, []);

  const signIn = useCallback((email: string, fullName?: string) => {
    const now = new Date();
    setIsAuthenticated(true);
    setUserEmail(email);
    setStartedAt(now);
    
    localStorageUtil.setItem(STORAGE_KEYS.AUTH, 'true');
    localStorageUtil.setItem(STORAGE_KEYS.EMAIL, email);
    localStorageUtil.setItem(STORAGE_KEYS.STARTED, now.toISOString());
    
    if (fullName) {
      const profile: UserProfile = {
        fullName,
        phoneNumber: '',
        jobTitle: '',
      };
      setUserProfile(profile);
      localStorageUtil.setJSON(STORAGE_KEYS.USER_PROFILE, profile);
    }
    
    updateLastActivity();
  }, [updateLastActivity]);

  const signOut = useCallback(() => {
    // Reset all state
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserProfile(null);
    setOnboardingData(null);
    setFactoringAgreement(null);
    setApplicationStatus('pending');
    setStartedAt(null);
    setSubmittedAt(null);
    setApprovedAt(null);
    setRejectedAt(null);
    setLastActivityAt(null);
    setRejectionReason(null);
    setReviewNotes(null);
    setCreditTerms(null);
    setCurrentStep(0);
    setCompletedSteps([]);
    
    // Only clear our app's data, not all localStorage
    localStorageUtil.removeItems([
      STORAGE_KEYS.AUTH,
      STORAGE_KEYS.EMAIL,
      STORAGE_KEYS.USER_PROFILE,
      STORAGE_KEYS.ONBOARDING,
      STORAGE_KEYS.AGREEMENT,
      STORAGE_KEYS.STATUS,
      STORAGE_KEYS.STARTED,
      STORAGE_KEYS.SUBMITTED,
      STORAGE_KEYS.APPROVED,
      STORAGE_KEYS.REJECTED,
      STORAGE_KEYS.LAST_ACTIVITY,
      STORAGE_KEYS.REJECTION_REASON,
      STORAGE_KEYS.REVIEW_NOTES,
      STORAGE_KEYS.CREDIT_TERMS,
      STORAGE_KEYS.STEP,
      STORAGE_KEYS.COMPLETED_STEPS,
    ]);
  }, []);

  const saveUserProfile = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
    localStorageUtil.setJSON(STORAGE_KEYS.USER_PROFILE, profile);
    updateLastActivity();
  }, [updateLastActivity]);

  const saveOnboardingData = useCallback((data: OnboardingData) => {
    setOnboardingData(data);
    localStorageUtil.setJSON(STORAGE_KEYS.ONBOARDING, data);
    updateLastActivity();
  }, [updateLastActivity]);

  const saveFactoringAgreement = useCallback((agreement: FactoringAgreement) => {
    setFactoringAgreement(agreement);
    // Store with date as ISO string
    localStorageUtil.setJSON(STORAGE_KEYS.AGREEMENT, {
      ...agreement,
      signedAt: agreement.signedAt?.toISOString() || null,
    });
    updateLastActivity();
  }, [updateLastActivity]);

  const saveCurrentStep = useCallback((step: number) => {
    setCurrentStep(step);
    localStorageUtil.setItem(STORAGE_KEYS.STEP, step.toString());
    updateLastActivity();
  }, [updateLastActivity]);

  const markStepCompleted = useCallback((step: number) => {
    setCompletedSteps((prev) => {
      if (prev.includes(step)) return prev;
      const updated = [...prev, step].sort((a, b) => a - b);
      localStorageUtil.setJSON(STORAGE_KEYS.COMPLETED_STEPS, updated);
      return updated;
    });
    updateLastActivity();
  }, [updateLastActivity]);

  const submitApplication = useCallback(() => {
    const now = new Date();
    setApplicationStatus('under_review');
    setSubmittedAt(now);
    setCurrentStep(0);
    
    localStorageUtil.setItem(STORAGE_KEYS.STATUS, 'under_review');
    localStorageUtil.setItem(STORAGE_KEYS.SUBMITTED, now.toISOString());
    localStorageUtil.removeItem(STORAGE_KEYS.STEP);
    updateLastActivity();
  }, [updateLastActivity]);

  const updateApplicationDecision = useCallback((
    status: 'approved' | 'rejected',
    options?: {
      rejectionReason?: string;
      reviewNotes?: string;
      creditTerms?: CreditTerms;
    }
  ) => {
    const now = new Date();
    setApplicationStatus(status);
    
    if (status === 'approved') {
      setApprovedAt(now);
      localStorageUtil.setItem(STORAGE_KEYS.APPROVED, now.toISOString());
      localStorageUtil.removeItem(STORAGE_KEYS.REJECTED);
      
      if (options?.creditTerms) {
        setCreditTerms(options.creditTerms);
        localStorageUtil.setJSON(STORAGE_KEYS.CREDIT_TERMS, options.creditTerms);
      }
    } else {
      setRejectedAt(now);
      localStorageUtil.setItem(STORAGE_KEYS.REJECTED, now.toISOString());
      localStorageUtil.removeItem(STORAGE_KEYS.APPROVED);
      
      if (options?.rejectionReason) {
        setRejectionReason(options.rejectionReason);
        localStorageUtil.setItem(STORAGE_KEYS.REJECTION_REASON, options.rejectionReason);
      }
    }
    
    if (options?.reviewNotes) {
      setReviewNotes(options.reviewNotes);
      localStorageUtil.setItem(STORAGE_KEYS.REVIEW_NOTES, options.reviewNotes);
    }
    
    localStorageUtil.setItem(STORAGE_KEYS.STATUS, status);
    updateLastActivity();
  }, [updateLastActivity]);

  return (
    <UserContext.Provider
      value={{
        // Authentication & User Info
        isAuthenticated,
        userEmail,
        userProfile,
        
        // Onboarding Data
        onboardingData,
        factoringAgreement,
        
        // Application Status & Timeline
        applicationStatus,
        startedAt,
        submittedAt,
        approvedAt,
        rejectedAt,
        lastActivityAt,
        
        // Decision & Terms
        rejectionReason,
        reviewNotes,
        creditTerms,
        
        // Navigation & Progress
        isLoading,
        currentStep,
        completedSteps,
        
        // Actions
        signIn,
        signOut,
        saveUserProfile,
        saveOnboardingData,
        saveFactoringAgreement,
        saveCurrentStep,
        markStepCompleted,
        submitApplication,
        updateApplicationDecision,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

