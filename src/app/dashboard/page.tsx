'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import ApplicationStatus from '@/components/dashboard/ApplicationStatus';
import ApplicationPreview from '@/components/dashboard/ApplicationPreview';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, userEmail, onboardingData, applicationStatus, submittedAt, isLoading, signOut } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Debug logging
  React.useEffect(() => {
    console.log('Dashboard - onboardingData:', onboardingData);
    console.log('Dashboard - isAuthenticated:', isAuthenticated);
    console.log('Dashboard - userEmail:', userEmail);
  }, [onboardingData, isAuthenticated, userEmail]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/signup');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    router.push('/signup');
  };

  const handleBackToOnboarding = () => {
    router.push('/onboarding');
  };

  // Show loading if checking authentication
  if (isLoading) {
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

  if (!isAuthenticated) {
    return null;
  }

  // Show message if no onboarding data or incomplete
  const hasOnboardingData = onboardingData && (
    onboardingData.businessProfile.businessName ||
    onboardingData.customers.length > 0 ||
    onboardingData.bankConnection.bankName ||
    onboardingData.invoices.length > 0
  );

  if (!hasOnboardingData && applicationStatus === 'pending') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#F5F5F5',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: 'white',
            borderBottom: '1px solid #E9EAEB',
            py: 2,
            px: { xs: 2, sm: 4 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                }}
              >
                incoXchange
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontSize: '0.875rem', color: '#535862', display: { xs: 'none', sm: 'block' } }}>
                {userEmail}
              </Typography>
              <IconButton onClick={handleMenuOpen} size="small">
                <AccountIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleSignOut}>
                  <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>

        {/* Content */}
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#181D27',
                mb: 2,
              }}
            >
              Welcome to IncoXchange!
            </Typography>
            <Typography
              sx={{
                fontSize: '1rem',
                color: '#535862',
                mb: 4,
              }}
            >
              Complete your onboarding to get started with your account.
            </Typography>
            <Button
              variant="contained"
              onClick={handleBackToOnboarding}
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: 2,
                px: 4,
                py: 1.5,
              }}
            >
              Start Onboarding
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid #E9EAEB',
          py: 2,
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
              }}
            >
              incoXchange
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontSize: '0.875rem', color: '#535862', display: { xs: 'none', sm: 'block' } }}>
              {userEmail}
            </Typography>
            <IconButton onClick={handleMenuOpen} size="small">
              <AccountIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleSignOut}>
                <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        {/* User Profile Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          {/* Avatar with Initials */}
          <Box
            sx={{
              width: { xs: 80, sm: 96 },
              height: { xs: 80, sm: 96 },
              borderRadius: '50%',
              backgroundColor: '#2164ef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem' },
              fontWeight: 500,
              color: 'white',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: -3,
                borderRadius: '50%',
                border: '3px solid #E9EAEB',
              },
            }}
          >
            {(() => {
              const businessName = onboardingData?.businessProfile?.businessName;
              if (businessName) {
                // Use business name for initials
                return businessName
                  .split(/\s+/)
                  .map((word) => word[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);
              }
              // Fallback to email
              return userEmail
                ?.split('@')[0]
                .split(/[._-]/)
                .map((part) => part[0])
                .join('')
                .toUpperCase()
                .slice(0, 2) || 'U';
            })()}
          </Box>

          {/* Business/User Name */}
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.875rem' },
              fontWeight: 600,
              color: '#181D27',
              mb: 0.5,
              letterSpacing: '-0.01em',
            }}
          >
            {onboardingData?.businessProfile?.businessName || 
             userEmail?.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 
             'User'}
          </Typography>

          {/* User Email */}
          <Typography
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              color: '#535862',
              fontWeight: 400,
              mb: onboardingData?.businessProfile?.businessType ? 1 : 0,
            }}
          >
            {userEmail}
          </Typography>

          {/* Business Info - Show if available */}
          {onboardingData?.businessProfile && (
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
                mt: 1,
              }}
            >
              {onboardingData.businessProfile.businessType && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 2,
                    py: 0.5,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: '#717680',
                      textTransform: 'capitalize',
                    }}
                  >
                    {onboardingData.businessProfile.businessType.replace('_', ' ')}
                  </Typography>
                </Box>
              )}
              {onboardingData.businessProfile.industry && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 2,
                    py: 0.5,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: '#717680',
                      textTransform: 'capitalize',
                    }}
                  >
                    {onboardingData.businessProfile.industry.replace('_', ' ')}
                  </Typography>
                </Box>
              )}
              {onboardingData.businessProfile.ein && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 2,
                    py: 0.5,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: '#717680',
                    }}
                  >
                    EIN: {onboardingData.businessProfile.ein}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* Continue/Back to Onboarding Button (only show if not submitted) */}
        {applicationStatus === 'pending' && (
          <Box 
            sx={{ 
              mb: 3,
              p: 3,
              backgroundColor: '#fef3c7',
              borderRadius: 2,
              border: '1px solid #fde68a',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#92400e', mb: 0.5 }}>
                  ⚠️ Application Not Submitted
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#78350f' }}>
                  Your application is incomplete. Continue where you left off to submit it for review.
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<BackIcon />}
                onClick={handleBackToOnboarding}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderRadius: 2,
                  backgroundColor: '#2164ef',
                  '&:hover': {
                    backgroundColor: '#1a4edb',
                  },
                }}
              >
                Continue Application
              </Button>
            </Box>
          </Box>
        )}

        {/* Two Column Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1.5fr' },
            gap: 3,
            alignItems: 'start',
          }}
        >
          {/* Left Column - Application Status */}
          <Box sx={{ position: { lg: 'sticky' }, top: { lg: 24 } }}>
            <ApplicationStatus status={applicationStatus} submittedAt={submittedAt} />
          </Box>

          {/* Right Column - Application Preview */}
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#181D27',
                  mb: 1,
                }}
              >
                Application Details
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: '#717680',
                }}
              >
                Review the information you submitted for your application.
              </Typography>
            </Box>
            <ApplicationPreview data={onboardingData!} />
          </Box>
        </Box>

        {/* Bottom Action - Edit Application (only if pending) */}
        {applicationStatus === 'pending' && (
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              border: '1px solid #E9EAEB',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', color: '#535862', mb: 2 }}>
              Need to make changes to your application?
            </Typography>
            <Button
              variant="outlined"
              onClick={handleBackToOnboarding}
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: 2,
                px: 4,
              }}
            >
              Edit Application
            </Button>
          </Box>
        )}

        {/* Note about editing */}
        {applicationStatus !== 'pending' && (
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              border: '1px solid #E9EAEB',
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', color: '#717680', textAlign: 'center' }}>
              📌 Your application is currently {applicationStatus === 'under_review' ? 'under review' : applicationStatus}. 
              {applicationStatus === 'under_review' && ' You cannot make changes while the application is being reviewed.'}
              {applicationStatus === 'approved' && ' If you need to update your information, please contact support.'}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
