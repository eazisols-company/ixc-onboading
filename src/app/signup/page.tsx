'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendMagicLink = () => {
    setError('');
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate sending magic link
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/signup/verify?email=${encodeURIComponent(email)}`);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMagicLink();
    }
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

      {/* Left Side - Form */}
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
            Sign up for free
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 400,
              color: '#535862',
              mb: 4,
              lineHeight: 1.5,
            }}
          >
            Enter your business email to receive a secure link and start setting up your account
          </Typography>

          {/* Sign In Link */}
          <Typography
            sx={{
              fontSize: '0.875rem',
              color: '#535862',
              mb: 4,
            }}
          >
            Already have an account?{' '}
            <Link
              href="/signin"
              sx={{
                color: '#2164ef',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign in
            </Link>
          </Typography>

          {/* Email Input */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#181D27',
                mb: 1,
              }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              error={!!error}
              helperText={error}
              variant="outlined"
              type="email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Send Magic Link Button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleSendMagicLink}
            disabled={isLoading}
            fullWidth
            sx={{
              py: 1.5,
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            {isLoading ? 'Sending...' : 'Send me a magic link'}
          </Button>
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
          backgroundImage: 'url(/images/bg-female-phone.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#E9EAEB',
        }}
      />
    </Box>
  );
}

