'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Checkbox,
  Link,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { 
  Link as LinkIcon, 
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Lock as LockIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';

interface BankConnectStepProps {
  onNext: () => void;
  onSkip: () => void;
  initialBank?: {
    bankId: string;
    bankName: string;
    isManual: boolean;
  };
  onSave?: (bank: { bankId: string; bankName: string; isManual: boolean }) => void;
}

interface Bank {
  id: string;
  name: string;
  logo: string;
  provider: string;
}

const banks: Bank[] = [
  { id: 'plaid', name: 'Plaid', logo: '/banks/plaid.svg', provider: 'Plaid' },
  { id: 'chase', name: 'Chase', logo: '/banks/chase.svg', provider: 'Chase' },
  { id: 'wells-fargo', name: 'Wells Fargo', logo: '/banks/wells-fargo.svg', provider: 'Wells Fargo' },
  { id: 'bank-of-america', name: 'Bank of America', logo: '/banks/bank-of-america.svg', provider: 'Bank of America' },
];

export default function BankConnectStep({
  onNext,
  onSkip,
  initialBank,
  onSave,
}: BankConnectStepProps) {
  const [selectedBank, setSelectedBank] = useState<string>(initialBank?.bankId || 'plaid');
  const [showConnecting, setShowConnecting] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [manualFormData, setManualFormData] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: '',
  });

  console.log('BankConnectStep - initialBank:', initialBank);
  console.log('BankConnectStep - onSave callback exists:', !!onSave);

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
  };

  const handleConnectManually = () => {
    setShowManualForm(true);
  };

  const handleBackToSelection = () => {
    setShowManualForm(false);
    setManualFormData({
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      accountType: '',
    });
  };

  const handleManualFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setManualFormData({
      ...manualFormData,
      [field]: event.target.value,
    });
  };

  const handleConnect = () => {
    setShowConnecting(true);
    setConnectionStatus('connecting');
    
    const bank = banks.find(b => b.id === selectedBank);
    
    // Simulate bank connection with random success/failure
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      if (isSuccess) {
        setConnectionStatus('success');
        // Save bank data
        console.log('BankConnectStep - Saving automated bank connection:', bank);
        if (onSave && bank) {
          onSave({
            bankId: bank.id,
            bankName: bank.name,
            isManual: false,
          });
          console.log('BankConnectStep - Bank data saved successfully');
        } else {
          console.warn('BankConnectStep - onSave callback not available!');
        }
        setTimeout(() => {
          onNext();
        }, 2000);
      } else {
        setConnectionStatus('error');
        setErrorMessage('Unable to connect to your bank. Please try again or connect manually.');
        setTimeout(() => {
          setShowConnecting(false);
          setConnectionStatus('idle');
        }, 3000);
      }
    }, 2500);
  };

  const handleManualConnect = () => {
    if (manualFormData.bankName && manualFormData.accountNumber && manualFormData.routingNumber) {
      setShowConnecting(true);
      setConnectionStatus('connecting');
      
      // Simulate manual bank connection
      setTimeout(() => {
        const isSuccess = Math.random() > 0.15; // 85% success rate
        
        if (isSuccess) {
          setConnectionStatus('success');
          // Save manual bank data
          console.log('BankConnectStep - Saving manual bank connection:', manualFormData);
          if (onSave) {
            onSave({
              bankId: 'manual',
              bankName: manualFormData.bankName,
              isManual: true,
            });
            console.log('BankConnectStep - Manual bank data saved successfully');
          } else {
            console.warn('BankConnectStep - onSave callback not available!');
          }
          setTimeout(() => {
            onNext();
          }, 2000);
        } else {
          setConnectionStatus('error');
          setErrorMessage('Invalid account details. Please check and try again.');
          setTimeout(() => {
            setShowConnecting(false);
            setConnectionStatus('idle');
          }, 3000);
        }
      }, 2500);
    }
  };

  if (showManualForm) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100%',
          px: 4,
          py: 6,
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        {/* Back Button */}
        <Box sx={{ width: '100%', mb: 3 }}>
          <IconButton
            onClick={handleBackToSelection}
            sx={{
              color: '#535862',
              '&:hover': {
                backgroundColor: '#F5F5F5',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontSize: '1.875rem',
            fontWeight: 600,
            color: '#181D27',
            mb: 2,
            textAlign: 'center',
          }}
        >
          Connect manually
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 400,
            color: '#535862',
            mb: 4,
            textAlign: 'center',
            maxWidth: 500,
          }}
        >
          Enter your bank account details to connect manually.
        </Typography>

        {/* Manual Form */}
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Bank Name */}
          <FormControl fullWidth required>
            <InputLabel>Bank Name</InputLabel>
            <Select
              value={manualFormData.bankName}
              onChange={(e) => setManualFormData({ ...manualFormData, bankName: e.target.value })}
              label="Bank Name"
              sx={{
                borderRadius: 2,
              }}
            >
              <MenuItem value="">Select your bank</MenuItem>
              <MenuItem value="chase">Chase</MenuItem>
              <MenuItem value="bank-of-america">Bank of America</MenuItem>
              <MenuItem value="wells-fargo">Wells Fargo</MenuItem>
              <MenuItem value="citibank">Citibank</MenuItem>
              <MenuItem value="us-bank">U.S. Bank</MenuItem>
              <MenuItem value="pnc">PNC Bank</MenuItem>
              <MenuItem value="capital-one">Capital One</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* Account Type */}
          <FormControl fullWidth required>
            <InputLabel>Account Type</InputLabel>
            <Select
              value={manualFormData.accountType}
              onChange={(e) => setManualFormData({ ...manualFormData, accountType: e.target.value })}
              label="Account Type"
              sx={{
                borderRadius: 2,
              }}
            >
              <MenuItem value="">Select account type</MenuItem>
              <MenuItem value="checking">Checking</MenuItem>
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="business-checking">Business Checking</MenuItem>
            </Select>
          </FormControl>

          {/* Account Number */}
          <TextField
            label="Account Number"
            required
            placeholder="Enter your account number"
            value={manualFormData.accountNumber}
            onChange={handleManualFormChange('accountNumber')}
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          {/* Routing Number */}
          <TextField
            label="Routing Number"
            required
            placeholder="Enter routing number"
            value={manualFormData.routingNumber}
            onChange={handleManualFormChange('routingNumber')}
            variant="outlined"
            fullWidth
            helperText="9-digit routing number found on your checks"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>

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
            onClick={handleManualConnect}
            disabled={!manualFormData.bankName || !manualFormData.accountNumber || !manualFormData.routingNumber || !manualFormData.accountType}
            sx={{
              px: 4,
              py: 1,
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: 2,
              minWidth: 150,
            }}
          >
            Connect
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
            Skip for now
          </Button>
        </Box>

        {/* Security Note */}
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 400,
            color: '#717680',
            mt: 4,
            textAlign: 'center',
          }}
        >
          Your credentials are encrypted and never stored by IncoXchange.
        </Typography>
      </Box>
    );
  }

  if (showConnecting) {
    const connectedBank = banks.find(b => b.id === selectedBank);
    
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          px: 4,
          py: 6,
          textAlign: 'center',
        }}
      >
        {/* Status Icon or Logo */}
        {connectionStatus === 'success' ? (
          <CheckCircleIcon
            sx={{
              width: 80,
              height: 80,
              color: '#10b981',
              mb: 4,
            }}
          />
        ) : connectionStatus === 'error' ? (
          <ErrorIcon
            sx={{
              width: 80,
              height: 80,
              color: '#ef4444',
              mb: 4,
            }}
          />
        ) : (
          <Box
            component="img"
            src={connectedBank?.logo}
            alt={`${connectedBank?.name} logo`}
            sx={{
              width: 150,
              height: 80,
              objectFit: 'contain',
              mb: 4,
            }}
          />
        )}

        {/* Title */}
        <Typography
          sx={{
            fontSize: '1.875rem',
            fontWeight: 600,
            color: connectionStatus === 'error' ? '#ef4444' : connectionStatus === 'success' ? '#10b981' : '#181D27',
            mb: 2,
          }}
        >
          {connectionStatus === 'success' 
            ? 'Successfully connected!' 
            : connectionStatus === 'error'
            ? 'Connection failed'
            : `Connecting to ${connectedBank?.provider}`}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 400,
            color: '#535862',
            mb: 4,
            maxWidth: 500,
          }}
        >
          {connectionStatus === 'success'
            ? 'Your bank account has been securely linked.'
            : connectionStatus === 'error'
            ? errorMessage
            : 'Please wait while we securely connect to your bank account...'}
        </Typography>

        {/* Loading Spinner or Status Icon */}
        {connectionStatus === 'connecting' && (
          <Box
            sx={{
              width: 48,
              height: 48,
              border: '4px solid #E9EAEB',
              borderTop: '4px solid #2164ef',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
        )}
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
        maxWidth: 900,
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
        Connect your bank
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontSize: { xs: '0.875rem', sm: '1rem' },
          fontWeight: 400,
          color: '#535862',
          mb: { xs: 4, sm: 6 },
          textAlign: 'center',
          maxWidth: 600,
        }}
      >
        Securely link your business bank account to verify transactions and enable faster payments.
      </Typography>

      {/* Bank Options Grid */}
      <Box 
        sx={{ 
          width: '100%', 
          mb: 4, 
          maxWidth: 700,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
          },
          gap: 2,
        }}
      >
        {banks.map((bank) => (
          <Card
            key={bank.id}
            onClick={() => handleBankSelect(bank.id)}
            role="button"
            aria-label={`Select ${bank.name}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleBankSelect(bank.id);
              }
            }}
            sx={{
              cursor: 'pointer',
              border: selectedBank === bank.id ? '2px solid #2164ef' : '1px solid #E9EAEB',
              borderRadius: 2,
              position: 'relative',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: selectedBank === bank.id ? '#2164ef' : '#A4A7AE',
                boxShadow: selectedBank === bank.id ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
              },
              '&:focus-visible': {
                outline: '2px solid #2164ef',
                outlineOffset: 2,
              },
            }}
          >
                <CardContent
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    position: 'relative',
                  }}
                >
                  {/* Checkbox */}
                  {selectedBank === bank.id && (
                    <Checkbox
                      checked
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        padding: 0,
                      }}
                    />
                  )}

                  {/* Bank Logo */}
                  <Box
                    component="img"
                    src={bank.logo}
                    alt={`${bank.name} logo`}
                    sx={{
                      width: 120,
                      height: 60,
                      objectFit: 'contain',
                      mb: 1,
                    }}
onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      // Fallback if logo doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  {/* Fallback text */}
                  <Box
                    sx={{
                      display: 'none',
                      width: 120,
                      height: 60,
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#535862',
                      mb: 1,
                    }}
                  >
                    {bank.name}
                  </Box>

                  {/* Bank Name */}
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#535862',
                    }}
                  >
                    Connect with {bank.provider}
                  </Typography>
                </CardContent>
              </Card>
        ))}
      </Box>

      {/* Connect Manually Link */}
      <Link
        component="button"
        onClick={handleConnectManually}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#2164ef',
          textDecoration: 'none',
          mb: 6,
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <LinkIcon sx={{ fontSize: 18 }} />
        Connect manually
      </Link>

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
          onClick={handleConnect}
          sx={{
            px: 4,
            py: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: 2,
            minWidth: 150,
          }}
        >
          Connect
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
          Skip for now
        </Button>
      </Box>

      {/* Security Badges */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 2,
              py: 1,
              backgroundColor: '#eff6ff',
              borderRadius: 1,
            }}
          >
            <LockIcon sx={{ fontSize: 16, color: '#2164ef' }} />
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#2164ef',
              }}
            >
              256-bit Encryption
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 2,
              py: 1,
              backgroundColor: '#eff6ff',
              borderRadius: 1,
            }}
          >
            <VerifiedIcon sx={{ fontSize: 16, color: '#2164ef' }} />
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#2164ef',
              }}
            >
              Read-only Access
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 400,
            color: '#717680',
            textAlign: 'center',
          }}
        >
          Your credentials are encrypted and never stored by IncoXchange.
        </Typography>
      </Box>
    </Box>
  );
}

