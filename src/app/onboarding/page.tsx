'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { useUser } from '@/contexts/UserContext';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import WelcomeStep from '@/components/onboarding/WelcomeStep';
import BusinessProfileStep from '@/components/onboarding/BusinessProfileStep';
import CustomersStep from '@/components/onboarding/CustomersStep';
import BankConnectStep from '@/components/onboarding/BankConnectStep';
import InvoicesStep from '@/components/onboarding/InvoicesStep';
import ReviewStep from '@/components/onboarding/ReviewStep';
import FactoringAgreementStep from '@/components/onboarding/FactoringAgreementStep';

interface OnboardingData {
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

export default function OnboardingPage() {
  const router = useRouter();
  const { 
    saveOnboardingData, 
    onboardingData: savedData, 
    currentStep: savedStep,
    saveCurrentStep,
    submitApplication,
    applicationStatus,
    isLoading
  } = useUser();
  const [activeStep, setActiveStep] = useState(savedStep || 0);
  const [isEditingFromReview, setIsEditingFromReview] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize with empty data
  const emptyData: OnboardingData = {
    businessProfile: {
      businessName: '',
      businessType: '',
      industry: '',
      ein: '',
      state: '',
      city: '',
      street: '',
      building: '',
      zip: '',
    },
    customers: [],
    bankConnection: {
      bankId: '',
      bankName: '',
      isManual: false,
    },
    invoices: [],
  };

  const [onboardingData, setOnboardingData] = useState<OnboardingData>(emptyData);

  // Sync with context data on mount only
  useEffect(() => {
    console.log('OnboardingPage - Initial savedData from context:', savedData);
    console.log('OnboardingPage - Saved step:', savedStep);
    
    if (savedData) {
      console.log('OnboardingPage - Initializing with saved data');
      setOnboardingData(savedData);
    }
    
    // If application is already submitted, redirect to dashboard
    if (applicationStatus !== 'pending') {
      console.log('OnboardingPage - Application already submitted, redirecting to dashboard');
      router.push('/dashboard');
      return;
    }
    
    // Set the saved step if available
    if (savedStep > 0) {
      console.log('OnboardingPage - Resuming from step:', savedStep);
      setActiveStep(savedStep);
    }
    
    setHasInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Debug: Log when onboardingData changes
  useEffect(() => {
    console.log('OnboardingPage - Local onboardingData changed:', onboardingData);
  }, [onboardingData]);

  // Save current step whenever it changes
  useEffect(() => {
    if (hasInitialized && applicationStatus === 'pending') {
      console.log('OnboardingPage - Saving current step:', activeStep);
      saveCurrentStep(activeStep);
    }
  }, [activeStep, hasInitialized, applicationStatus, saveCurrentStep]);

  const handleNext = () => {
    console.log('handleNext called - current step:', activeStep);
    console.log('handleNext - current onboardingData:', onboardingData);
    
    // NOTE: We DON'T save here because each step already saves via their onSave callback
    // Saving here would overwrite with stale state due to React's async state updates

    // If editing from review, return to review
    if (isEditingFromReview) {
      setActiveStep(5); // Review step
      setIsEditingFromReview(false);
    } else if (activeStep < 6) {
      console.log('Moving to next step:', activeStep + 1);
      setActiveStep((prev) => prev + 1);
    } else {
      // Complete onboarding - submit application
      console.log('Completing onboarding, submitting application');
      // Save one final time before submitting
      saveOnboardingData(onboardingData);
      submitApplication();
      router.push('/dashboard');
    }
  };

  const handleSkip = () => {
    console.log('Skipping step, current data:', onboardingData);
    // NOTE: We save here because skip doesn't trigger onSave callbacks
    saveOnboardingData(onboardingData);
    
    // If editing from review, go back to review
    if (isEditingFromReview) {
      setActiveStep(5); // Review step
      setIsEditingFromReview(false);
    } else {
      router.push('/dashboard');
    }
  };

  const handleEdit = (step: number) => {
    setActiveStep(step);
    setIsEditingFromReview(true);
  };

  const updateBusinessProfile = (data: OnboardingData['businessProfile']) => {
    console.log('updateBusinessProfile called with:', data);
    const updatedData = { ...onboardingData, businessProfile: data };
    setOnboardingData(updatedData);
    saveOnboardingData(updatedData);
    console.log('Business profile updated in state and localStorage');
  };

  const updateCustomers = (customers: OnboardingData['customers']) => {
    console.log('updateCustomers called with:', customers);
    const updatedData = { ...onboardingData, customers };
    setOnboardingData(updatedData);
    saveOnboardingData(updatedData);
    console.log('Customers updated in state and localStorage');
  };

  const updateBankConnection = (bank: OnboardingData['bankConnection']) => {
    console.log('updateBankConnection called with:', bank);
    const updatedData = { ...onboardingData, bankConnection: bank };
    setOnboardingData(updatedData);
    saveOnboardingData(updatedData);
    console.log('Bank connection updated in state and localStorage');
  };

  const updateInvoices = (invoices: OnboardingData['invoices']) => {
    console.log('updateInvoices called with:', invoices);
    const updatedData = { ...onboardingData, invoices };
    setOnboardingData(updatedData);
    saveOnboardingData(updatedData);
    console.log('Invoices updated in state and localStorage');
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <WelcomeStep onNext={handleNext} onSkip={handleSkip} />;
      case 1:
        return (
          <BusinessProfileStep 
            onNext={handleNext} 
            onSkip={handleSkip}
            initialData={onboardingData.businessProfile}
            onSave={updateBusinessProfile}
          />
        );
      case 2:
        return (
          <CustomersStep 
            onNext={handleNext} 
            onSkip={handleSkip}
            initialCustomers={onboardingData.customers}
            onSave={updateCustomers}
          />
        );
      case 3:
        return (
          <BankConnectStep 
            onNext={handleNext} 
            onSkip={handleSkip}
            initialBank={onboardingData.bankConnection}
            onSave={updateBankConnection}
          />
        );
      case 4:
        return (
          <InvoicesStep 
            onNext={handleNext} 
            onSkip={handleSkip}
            initialInvoices={onboardingData.invoices}
            onSave={updateInvoices}
          />
        );
      case 5:
        return (
          <ReviewStep 
            onNext={handleNext} 
            onSkip={handleSkip} 
            onEdit={handleEdit}
            data={onboardingData}
          />
        );
      case 6:
        return <FactoringAgreementStep onNext={handleNext} onSkip={handleSkip} />;
      default:
        return null;
    }
  };

  // Show loading if context is loading or not initialized yet
  if (isLoading || !hasInitialized) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5F5F5',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              border: '4px solid #E9EAEB',
              borderTop: '4px solid #2164ef',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto',
              mb: 2,
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
          <Typography sx={{ fontSize: '0.875rem', color: '#717680' }}>
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <OnboardingLayout activeStep={activeStep}>
      {renderStepContent()}
    </OnboardingLayout>
  );
}

