'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';
import {
  Business as BusinessIcon,
  People as PeopleIcon,
  AccountBalance as AccountBalanceIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

interface ReviewStepProps {
  onNext: () => void;
  onSkip: () => void;
  onEdit?: (step: number) => void;
  data?: {
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
  };
}

export default function ReviewStep({
  onNext,
  onSkip,
  onEdit,
  data,
}: ReviewStepProps) {
  console.log('ReviewStep - Received data:', data);
  
  // Transform data for display
  const reviewData = {
    business: {
      name: data?.businessProfile.businessName || 'Not provided',
      type: data?.businessProfile.businessType || 'Not provided',
      industry: data?.businessProfile.industry || 'Not provided',
      ein: data?.businessProfile.ein || 'Not provided',
      address: data?.businessProfile.city && data?.businessProfile.state 
        ? `${data.businessProfile.city}, ${data.businessProfile.state}` 
        : 'Not provided',
    },
    customers: data?.customers.map(c => ({
      name: c.customerName,
      contact: c.contactPerson,
    })) || [],
    bank: {
      name: data?.bankConnection.bankName || 'Not connected',
      connected: !!data?.bankConnection.bankName,
    },
    invoices: {
      count: data?.invoices.length || 0,
      totalAmount: '$0.00', // Could calculate if you store amounts
    },
  };

  const sections = [
    {
      title: 'Business Profile',
      icon: <BusinessIcon />,
      step: 1,
      completed: !!(data?.businessProfile.businessName && data?.businessProfile.ein),
      content: (
        <Box>
          <Typography sx={{ fontSize: '0.875rem', color: '#535862', mb: 1 }}>
            <strong style={{ color: '#181D27' }}>{reviewData.business.name}</strong>
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#535862' }}>
            {reviewData.business.type} • {reviewData.business.industry}
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#535862' }}>
            EIN: {reviewData.business.ein}
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#535862' }}>
            {reviewData.business.address}
          </Typography>
        </Box>
      ),
    },
    {
      title: 'Customers',
      icon: <PeopleIcon />,
      step: 2,
      completed: reviewData.customers.length > 0,
      content: (
        <Box>
          <Typography sx={{ fontSize: '0.875rem', color: '#535862', mb: 1 }}>
            {reviewData.customers.length} customer{reviewData.customers.length !== 1 ? 's' : ''} added
          </Typography>
          {reviewData.customers.slice(0, 2).map((customer, index) => (
            <Typography key={index} sx={{ fontSize: '0.875rem', color: '#535862' }}>
              • {customer.name} ({customer.contact})
            </Typography>
          ))}
          {reviewData.customers.length > 2 && (
            <Typography sx={{ fontSize: '0.875rem', color: '#717680', fontStyle: 'italic' }}>
              +{reviewData.customers.length - 2} more
            </Typography>
          )}
        </Box>
      ),
    },
    {
      title: 'Bank Account',
      icon: <AccountBalanceIcon />,
      step: 3,
      completed: reviewData.bank.connected,
      content: (
        <Box>
          <Typography sx={{ fontSize: '0.875rem', color: '#535862' }}>
            <strong style={{ color: '#181D27' }}>{reviewData.bank.name}</strong> account connected
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            <CheckCircleIcon sx={{ fontSize: 16, color: '#10b981' }} />
            <Typography sx={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 500 }}>
              Verified and active
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      title: 'Invoices',
      icon: <DescriptionIcon />,
      step: 4,
      completed: reviewData.invoices.count > 0,
      content: (
        <Box>
          <Typography sx={{ fontSize: '0.875rem', color: '#535862', mb: 0.5 }}>
            {reviewData.invoices.count} invoice{reviewData.invoices.count !== 1 ? 's' : ''} uploaded
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#535862' }}>
            Total amount: <strong style={{ color: '#181D27' }}>{reviewData.invoices.totalAmount}</strong>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            <CheckCircleIcon sx={{ fontSize: 16, color: '#10b981' }} />
            <Typography sx={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 500 }}>
              All invoices verified
            </Typography>
          </Box>
        </Box>
      ),
    },
  ];

  const allCompleted = sections.every(s => s.completed);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100%',
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 },
        maxWidth: 700,
        mx: 'auto',
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontSize: { xs: '1.5rem', sm: '1.875rem' },
          fontWeight: 600,
          color: '#181D27',
          mb: 2,
          textAlign: 'center',
        }}
      >
        Review your information
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontSize: { xs: '0.875rem', sm: '1rem' },
          fontWeight: 400,
          color: '#535862',
          mb: 6,
          textAlign: 'center',
          maxWidth: 600,
        }}
      >
        Please review your details before proceeding to sign the factoring agreement.
      </Typography>

      {/* Review Sections */}
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {sections.map((section, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              border: '1px solid #E9EAEB',
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                      backgroundColor: section.completed ? '#eff6ff' : '#F5F5F5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: section.completed ? '#2164ef' : '#717680',
                    }}
                  >
                    {section.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#181D27',
                      }}
                    >
                      {section.title}
                    </Typography>
                    {section.completed && (
                      <Chip
                        label="Completed"
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.625rem',
                          fontWeight: 500,
                          backgroundColor: '#d1fae5',
                          color: '#065f46',
                          mt: 0.5,
                          '& .MuiChip-label': {
                            px: 1,
                          },
                        }}
                      />
                    )}
                  </Box>
                </Box>

                {onEdit && (
                  <Button
                    size="small"
                    startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                    onClick={() => onEdit(section.step)}
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: '#2164ef',
                      textTransform: 'none',
                      minWidth: 'auto',
                      '&:hover': {
                        backgroundColor: '#eff6ff',
                      },
                    }}
                  >
                    Edit
                  </Button>
                )}
              </Box>

              <Divider sx={{ mb: 2 }} />

              {section.content}
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Completion Status */}
      {allCompleted && (
        <Box
          sx={{
            width: '100%',
            mt: 4,
            p: 3,
            backgroundColor: '#eff6ff',
            borderRadius: 2,
            border: '1px solid #bedcff',
            textAlign: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            <CheckCircleIcon sx={{ color: '#2164ef', fontSize: 20 }} />
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#2164ef',
              }}
            >
              All steps completed
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 400,
              color: '#535862',
            }}
          >
            You&apos;re ready to sign the factoring agreement
          </Typography>
        </Box>
      )}

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 6,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          size="medium"
          onClick={onNext}
          aria-label="Proceed to sign agreement"
          sx={{
            px: 4,
            py: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: 2,
            minWidth: 150,
          }}
        >
          Continue to Agreement
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={onSkip}
          sx={{
            fontSize: '0.875rem',
            color: '#535862',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            },
          }}
        >
          Save and finish later
        </Button>
      </Box>
    </Box>
  );
}

