'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import {
  Box,
  Typography,
  Button,
  Link,
} from '@mui/material';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useUser();
  const emailParam = searchParams.get('email') || 'youremail@gmail.com';
  const [countdown, setCountdown] = useState(15 * 60); // 15 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    setCountdown(15 * 60);
    setCanResend(false);
    // Simulate resending
    console.log('Resending magic link to:', emailParam);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Logo - Top Left Corner */}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          left: { xs: 24, sm: 32, md: 48 },
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          zIndex: 10,
        }}
      >
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

      {/* Left Side - Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 8 },
          py: { xs: 4, sm: 6 },
          maxWidth: { xs: '100%', md: '50%' },
          minHeight: { xs: '100vh', md: 'auto' },
        }}
      >
        {/* Content */}
        <Box sx={{ width: '100%', maxWidth: 500 }}>
          {/* Title */}
          <Typography
            sx={{
              fontSize: '1.875rem',
              fontWeight: 600,
              color: '#181D27',
              mb: 2,
            }}
          >
            Check your inbox
          </Typography>

          {/* Email Display */}
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 400,
              color: '#535862',
              mb: 1,
              lineHeight: 1.5,
            }}
          >
            We&apos;ve sent you a magic link to
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              color: '#2164ef',
              mb: 3,
            }}
          >
            {emailParam}
          </Typography>

          {/* Instructions */}
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 400,
              color: '#535862',
              mb: 1,
              lineHeight: 1.5,
            }}
          >
            Please click the link to confirm your address
          </Typography>
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 400,
              color: '#717680',
              mb: 4,
            }}
          >
            Link expires in {formatTime(countdown)} minutes.
          </Typography>

          {/* Resend Button */}
          {canResend ? (
            <Button
              variant="text"
              onClick={handleResend}
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#2164ef',
                textTransform: 'none',
                alignSelf: 'flex-start',
                px: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              Resend
            </Button>
          ) : (
            <Link
              component="button"
              onClick={handleResend}
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#2164ef',
                textDecoration: 'none',
                cursor: 'pointer',
                alignSelf: 'flex-start',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Resend
            </Link>
          )}

          {/* Demo Skip Button */}
          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: '1px solid #E9EAEB',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: '#717680',
                mb: 2,
                textAlign: 'center',
              }}
            >
              For demo purposes
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                signIn(emailParam);
                router.push('/onboarding');
              }}
              sx={{
                py: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: 2,
                textTransform: 'none',
                borderColor: '#E9EAEB',
                color: '#535862',
                '&:hover': {
                  borderColor: '#2164ef',
                  backgroundColor: '#eff6ff',
                  color: '#2164ef',
                },
              }}
            >
              Skip to Onboarding
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 24,
          left: { xs: 24, sm: 32, md: 48 },
          right: { xs: 24, sm: 32 },
          maxWidth: { md: 'calc(50% - 96px)' },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: '0.875rem', color: '#717680' }}>
          © IncoXchange 2025
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#717680', whiteSpace: 'nowrap' }}>
          help@incoxchange.com
        </Typography>
      </Box>

      {/* Right Side - Image */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          flex: 1,
          backgroundImage: 'url(/images/female-fruits.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#E9EAEB',
        }}
      />
    </Box>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}

