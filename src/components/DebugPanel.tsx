'use client';

import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useUser } from '@/contexts/UserContext';

export default function DebugPanel() {
  const { onboardingData, isAuthenticated, userEmail } = useUser();
  const [showDebug, setShowDebug] = useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
      }}
    >
      {!showDebug ? (
        <Button
          variant="contained"
          size="small"
          onClick={() => setShowDebug(true)}
          sx={{
            backgroundColor: '#ef4444',
            '&:hover': { backgroundColor: '#dc2626' },
          }}
        >
          Debug
        </Button>
      ) : (
        <Paper
          sx={{
            p: 2,
            maxWidth: 400,
            maxHeight: 500,
            overflow: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
              Debug Panel
            </Typography>
            <Button
              size="small"
              onClick={() => setShowDebug(false)}
              sx={{ color: 'white', minWidth: 'auto', p: 0 }}
            >
              ✕
            </Button>
          </Box>

          <Box sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
            <Typography sx={{ color: '#fbbf24', mb: 1, fontWeight: 600 }}>
              Authentication:
            </Typography>
            <Typography sx={{ color: '#a3a3a3', mb: 2 }}>
              Authenticated: {isAuthenticated ? 'Yes' : 'No'}
              <br />
              Email: {userEmail || 'None'}
            </Typography>

            <Typography sx={{ color: '#fbbf24', mb: 1, fontWeight: 600 }}>
              Onboarding Data:
            </Typography>
            <Box
              component="pre"
              sx={{
                color: '#a3a3a3',
                fontSize: '0.65rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {JSON.stringify(onboardingData, null, 2)}
            </Box>

            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mt: 2,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: '#fbbf24',
                  backgroundColor: 'rgba(251, 191, 36, 0.1)',
                },
              }}
              onClick={() => {
                console.log('=== DEBUG INFO ===');
                console.log('localStorage contents:', {
                  isAuthenticated: localStorage.getItem('isAuthenticated'),
                  userEmail: localStorage.getItem('userEmail'),
                  onboardingData: localStorage.getItem('onboardingData'),
                  applicationStatus: localStorage.getItem('applicationStatus'),
                });
                console.log('Context state:', {
                  isAuthenticated,
                  userEmail,
                  onboardingData,
                });
              }}
            >
              Log to Console
            </Button>

            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mt: 1,
                color: '#ef4444',
                borderColor: '#ef4444',
                '&:hover': {
                  borderColor: '#dc2626',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                },
              }}
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Clear All Data
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

