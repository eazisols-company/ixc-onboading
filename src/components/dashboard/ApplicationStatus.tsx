'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Chip,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  HourglassEmpty as PendingIcon,
  Cancel as RejectedIcon,
} from '@mui/icons-material';

interface ApplicationStatusProps {
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submittedAt: Date | null;
}

export default function ApplicationStatus({ status, submittedAt }: ApplicationStatusProps) {
  const getStatusInfo = () => {
    switch (status) {
      case 'pending':
        return {
          label: 'Not Submitted',
          color: '#717680',
          bgColor: '#F5F5F5',
          icon: <PendingIcon />,
          progress: 0,
          message: 'Your application has not been submitted yet.',
        };
      case 'under_review':
        return {
          label: 'Under Review',
          color: '#f59e0b',
          bgColor: '#fef3c7',
          icon: <PendingIcon />,
          progress: 50,
          message: 'Your application is being reviewed by our team. This typically takes 2-3 business days.',
        };
      case 'approved':
        return {
          label: 'Approved',
          color: '#10b981',
          bgColor: '#d1fae5',
          icon: <CheckIcon />,
          progress: 100,
          message: 'Congratulations! Your application has been approved. You can now start using all features.',
        };
      case 'rejected':
        return {
          label: 'Rejected',
          color: '#ef4444',
          bgColor: '#fee2e2',
          icon: <RejectedIcon />,
          progress: 100,
          message: 'Your application was not approved. Please contact support for more information.',
        };
    }
  };

  const statusInfo = getStatusInfo();
  const activeStep = status === 'pending' ? 0 : status === 'under_review' ? 1 : 2;

  const steps = [
    { label: 'Submitted', description: 'Application received' },
    { label: 'Under Review', description: 'Being evaluated' },
    { label: status === 'rejected' ? 'Decision' : 'Approved', description: status === 'rejected' ? 'Application decision' : 'Ready to use' },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card sx={{ borderRadius: 2, overflow: 'visible' }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography
            sx={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#181D27',
            }}
          >
            Application Status
          </Typography>
          <Chip
            icon={statusInfo.icon}
            label={statusInfo.label}
            sx={{
              backgroundColor: statusInfo.bgColor,
              color: statusInfo.color,
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: statusInfo.color,
              },
            }}
          />
        </Box>

        {/* Status Message */}
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: '#535862',
            mb: 3,
            lineHeight: 1.6,
          }}
        >
          {statusInfo.message}
        </Typography>

        {/* Submitted Date */}
        {submittedAt && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: '0.75rem', color: '#717680', mb: 0.5 }}>
              Submitted On
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#181D27' }}>
              {formatDate(submittedAt)}
            </Typography>
          </Box>
        )}

        {/* Progress Bar */}
        {status !== 'pending' && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, color: '#181D27' }}>
                Progress
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: statusInfo.color }}>
                {statusInfo.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={statusInfo.progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#E9EAEB',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: statusInfo.color,
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        )}

        {/* Stepper */}
        {status !== 'pending' && (
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              '& .MuiStepConnector-root': {
                marginLeft: '12px',
              },
              '& .MuiStepConnector-line': {
                minHeight: 30,
                borderColor: '#E9EAEB',
              },
              '& .MuiStepLabel-root': {
                padding: 0,
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label} completed={index < activeStep || status === 'approved' || status === 'rejected'}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-iconContainer': {
                      pr: 2,
                    },
                  }}
                  StepIconProps={{
                    sx: {
                      color: index <= activeStep ? statusInfo.color : '#E9EAEB',
                      '&.Mui-completed': {
                        color: status === 'rejected' && index === 2 ? '#ef4444' : '#10b981',
                      },
                      '&.Mui-active': {
                        color: statusInfo.color,
                      },
                    },
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: index <= activeStep ? 600 : 400,
                        color: index <= activeStep ? '#181D27' : '#717680',
                      }}
                    >
                      {step.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: '#717680',
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        {/* Estimated Time */}
        {status === 'under_review' && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: '#fef3c7',
              borderRadius: 2,
              border: '1px solid #fde68a',
            }}
          >
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400e', mb: 0.5 }}>
              Estimated Review Time
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#78350f' }}>
              2-3 business days
            </Typography>
          </Box>
        )}

        {/* Approved Message */}
        {status === 'approved' && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: '#d1fae5',
              borderRadius: 2,
              border: '1px solid #a7f3d0',
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#065f46', mb: 0.5 }}>
              🎉 Welcome to IncoXchange!
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#047857' }}>
              Your account is now fully activated. You can start managing your invoices and accessing funding.
            </Typography>
          </Box>
        )}

        {/* Contact Support */}
        {(status === 'under_review' || status === 'rejected') && (
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #E9EAEB' }}>
            <Typography sx={{ fontSize: '0.75rem', color: '#717680', textAlign: 'center' }}>
              Questions? Contact us at{' '}
              <Typography
                component="a"
                href="mailto:help@incoxchange.com"
                sx={{
                  fontSize: '0.75rem',
                  color: '#2164ef',
                  fontWeight: 500,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                help@incoxchange.com
              </Typography>
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

