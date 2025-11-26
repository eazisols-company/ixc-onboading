'use client';

import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@mui/material';
import {
  SentimentSatisfied,
  Business,
  People,
  Link as LinkIcon,
  Description,
  Assignment,
  CheckCircle,
} from '@mui/icons-material';

export interface OnboardingStep {
  label: string;
  description: string;
  icon: React.ReactElement;
}

const steps: OnboardingStep[] = [
  {
    label: 'Welcome',
    description: 'Get started with your setup.',
    icon: <SentimentSatisfied />,
  },
  {
    label: 'Business Profile',
    description: 'Add your company details.',
    icon: <Business />,
  },
  {
    label: 'Customers',
    description: 'Add your clients or partners.',
    icon: <People />,
  },
  {
    label: 'Bank Connect',
    description: 'Securely link your account.',
    icon: <LinkIcon />,
  },
  {
    label: 'Invoices',
    description: 'Upload your invoices.',
    icon: <Description />,
  },
  {
    label: 'Review',
    description: 'Check and confirm setup.',
    icon: <CheckCircle />,
  },
  {
    label: 'Factoring Agreement',
    description: 'Sign the agreement.',
    icon: <Assignment />,
  },
];

interface OnboardingLayoutProps {
  activeStep: number;
  children: React.ReactNode;
}

export default function OnboardingLayout({
  activeStep,
  children,
}: OnboardingLayoutProps) {
  const progress = ((activeStep + 1) / 7) * 100;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Progress Bar */}
      <Box
        sx={{
          width: '100%',
          height: 8,
          backgroundColor: '#E9EAEB',
        }}
      >
        <Box
          sx={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #491ae6 0%, #2164ef 100%)',
            transition: 'width 0.3s ease',
          }}
        />
      </Box>

      {/* Mobile Header */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          backgroundColor: 'white',
          borderBottom: '1px solid #E9EAEB',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            component="img"
            src="/incoxchange-logomark.svg"
            alt="IncoXchange Logo"
            sx={{ width: 24, height: 24 }}
          />
          <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#181D27' }}>
            incoXchange
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.875rem', color: '#535862' }}>
          Step {activeStep + 1} of 7
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: 1,
        }}
      >
      {/* Left Sidebar - Steps */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: 320,
          backgroundColor: '#F5F5F5',
          borderRight: '1px solid #E9EAEB',
          p: 3,
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box
            component="img"
            src="/incoxchange-logomark.svg"
            alt="IncoXchange Logo"
            sx={{
              width: 32,
              height: 32,
            }}
          />
          <Typography 
            sx={{ 
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#181D27',
              lineHeight: 1.56,
            }}
          >
            incoXchange
          </Typography>
        </Box>

        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            '& .MuiStepConnector-root': {
              marginLeft: '20px',
            },
            '& .MuiStepConnector-line': {
              minHeight: 20,
              borderColor: '#E9EAEB',
            },
          }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                icon={
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                      border: '1px solid #E9EAEB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        index === activeStep ? '#daeaff' : 'transparent',
                      color: index === activeStep ? '#2164ef' : '#717680',
                    }}
                  >
                    {step.icon}
                  </Box>
                }
                sx={{
                  '& .MuiStepLabel-labelContainer': {
                    ml: 1.5,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: index === activeStep ? 600 : 500,
                    color: index === activeStep ? '#181D27' : '#181D27',
                    lineHeight: 1.43,
                  }}
                >
                  {step.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: '#717680',
                    lineHeight: 1.43,
                  }}
                >
                  {step.description}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Right Content Area */}
      <Box sx={{ flex: 1, backgroundColor: 'white', width: { xs: '100%', md: 'auto' } }}>
        {children}
      </Box>
      </Box>
    </Box>
  );
}

