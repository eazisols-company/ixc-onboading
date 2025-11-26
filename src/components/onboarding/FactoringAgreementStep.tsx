'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Divider,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Celebration as CelebrationIcon,
} from '@mui/icons-material';
import { useUser } from '@/contexts/UserContext';

interface FactoringAgreementStepProps {
  onNext: () => void;
  onSkip: () => void;
}

const AGREEMENT_VERSION = 'v1.0.0'; // Track version for legal purposes

export default function FactoringAgreementStep({
  onNext,
  onSkip,
}: FactoringAgreementStepProps) {
  const { factoringAgreement, saveFactoringAgreement } = useUser();
  
  // Initialize from saved data if available
  const [agreed, setAgreed] = useState(factoringAgreement?.agreed || false);
  const [signature, setSignature] = useState(factoringAgreement?.signature || '');
  const [isSigning, setIsSigning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load saved agreement data on mount
  useEffect(() => {
    if (factoringAgreement) {
      setAgreed(factoringAgreement.agreed);
      setSignature(factoringAgreement.signature);
    }
  }, [factoringAgreement]);

  const handleSignAgreement = () => {
    if (agreed && signature.trim()) {
      setIsSigning(true);
      
      // Save the agreement data
      const agreementData = {
        agreed: true,
        signature: signature.trim(),
        signedAt: new Date(),
        agreementVersion: AGREEMENT_VERSION,
      };
      
      saveFactoringAgreement(agreementData);
      
      // Simulate signing process
      setTimeout(() => {
        setIsSigning(false);
        setShowSuccess(true);
        
        // Show success screen then complete
        setTimeout(() => {
          onNext();
        }, 3000);
      }, 1500);
    }
  };

  // Success Screen
  if (showSuccess) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
          textAlign: 'center',
        }}
      >
        {/* Success Icon */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: '#d1fae5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          <CelebrationIcon sx={{ fontSize: 50, color: '#10b981' }} />
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.875rem' },
            fontWeight: 600,
            color: '#181D27',
            mb: 2,
          }}
        >
          Welcome to IncoXchange!
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 400,
            color: '#535862',
            mb: 2,
            maxWidth: 600,
          }}
        >
          Your account has been successfully set up.
        </Typography>

        {/* Additional Info */}
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 400,
            color: '#717680',
            maxWidth: 600,
          }}
        >
          We&apos;re preparing your dashboard. You&apos;ll be redirected shortly.
        </Typography>

        {/* Loading Indicator */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            gap: 1,
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#2164ef',
                animation: 'bounce 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.16}s`,
                '@keyframes bounce': {
                  '0%, 80%, 100%': { transform: 'scale(0)' },
                  '40%': { transform: 'scale(1)' },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100%',
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 },
        maxWidth: 800,
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
        Sign the factoring agreement
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
        Review and sign the agreement to complete your onboarding and start accessing funding.
      </Typography>

      {/* Agreement Document */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          border: '1px solid #E9EAEB',
          borderRadius: 2,
          mb: 4,
        }}
      >
        {/* Document Header */}
        <Box
          sx={{
            p: 3,
            backgroundColor: '#FAFAFA',
            borderBottom: '1px solid #E9EAEB',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <DescriptionIcon sx={{ color: '#2164ef', fontSize: 24 }} />
          <Box>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#181D27',
              }}
            >
              Factoring Services Agreement
            </Typography>
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: '#717680',
              }}
            >
              Last updated: November 13, 2025
            </Typography>
          </Box>
        </Box>

        {/* Agreement Content */}
        <Box
          sx={{
            p: 4,
            maxHeight: 400,
            overflowY: 'auto',
            fontSize: '0.875rem',
            lineHeight: 1.8,
            color: '#535862',
          }}
        >
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#181D27', mb: 2 }}>
            1. Services Provided
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', mb: 3 }}>
            IncoXchange agrees to provide invoice factoring services to facilitate cash flow management
            for your business. We will purchase approved invoices at an agreed-upon discount rate and
            provide immediate funding to your designated bank account.
          </Typography>

          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#181D27', mb: 2 }}>
            2. Terms and Conditions
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', mb: 3 }}>
            The factoring fee will be calculated based on the invoice amount and payment terms.
            Standard fees range from 1-5% depending on customer creditworthiness and payment timeline.
            You will receive funding within 24 hours of invoice approval.
          </Typography>

          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#181D27', mb: 2 }}>
            3. Customer Verification
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', mb: 3 }}>
            We reserve the right to verify and approve customers before purchasing invoices.
            Customer credit checks may be performed. You warrant that all invoices submitted
            represent legitimate business transactions.
          </Typography>

          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#181D27', mb: 2 }}>
            4. Payment Responsibility
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', mb: 3 }}>
            In the event of customer non-payment after 90 days, you agree to repurchase the invoice
            at face value. We will work with you to recover outstanding payments before exercising
            this option.
          </Typography>

          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#181D27', mb: 2 }}>
            5. Data Security and Privacy
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', mb: 3 }}>
            All your business data, customer information, and banking details are encrypted using
            256-bit SSL encryption. We never sell or share your data with third parties. Your
            information is used solely for providing factoring services.
          </Typography>

          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#181D27', mb: 2 }}>
            6. Termination
          </Typography>
          <Typography sx={{ fontSize: '0.875rem' }}>
            Either party may terminate this agreement with 30 days written notice. Outstanding
            invoices and obligations will remain in effect until fully settled.
          </Typography>
        </Box>
      </Paper>

      {/* Agreement Checkbox */}
      <Box sx={{ width: '100%', mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              sx={{
                color: '#717680',
                '&.Mui-checked': {
                  color: '#2164ef',
                },
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: '0.875rem', color: '#181D27' }}>
              I have read and agree to the terms of the Factoring Services Agreement
            </Typography>
          }
        />
      </Box>

      <Divider sx={{ width: '100%', mb: 3 }} />

      {/* Signature Field */}
      <Box sx={{ width: '100%', mb: 4 }}>
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#181D27',
            mb: 2,
          }}
        >
          Electronic Signature *
        </Typography>
        <TextField
          fullWidth
          placeholder="Type your full name to sign"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          disabled={!agreed}
          variant="outlined"
          helperText="By typing your name, you agree to sign this document electronically"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: agreed ? 'white' : '#F5F5F5',
            },
          }}
        />
        {signature && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: '#FAFAFA',
              borderRadius: 1,
              borderLeft: '3px solid #2164ef',
            }}
          >
            <Typography
              sx={{
                fontSize: '1.25rem',
                fontFamily: 'cursive',
                color: '#181D27',
                fontStyle: 'italic',
              }}
            >
              {signature}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: '#717680',
                mt: 1,
              }}
            >
              Signed on {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          size="medium"
          onClick={handleSignAgreement}
          disabled={!agreed || !signature.trim() || isSigning}
          aria-label="Sign agreement and complete onboarding"
          sx={{
            px: 4,
            py: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: 2,
            minWidth: 200,
          }}
        >
          {isSigning ? 'Processing...' : 'Sign Agreement'}
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

      {/* Legal Note */}
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 400,
          color: '#717680',
          mt: 4,
          textAlign: 'center',
          maxWidth: 600,
        }}
      >
        This electronic signature has the same legal effect as a handwritten signature.
        A copy of the signed agreement will be sent to your email.
      </Typography>
    </Box>
  );
}

