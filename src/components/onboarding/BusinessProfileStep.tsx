'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from '@mui/material';

interface BusinessData {
  businessName: string;
  businessType: string;
  industry: string;
  ein: string;
  state: string;
  city: string;
  street: string;
  building: string;
  zip: string;
}

interface BusinessProfileStepProps {
  onNext: () => void;
  onSkip: () => void;
  initialData?: BusinessData;
  onSave?: (data: BusinessData) => void;
}

export default function BusinessProfileStep({
  onNext,
  onSkip,
  initialData,
  onSave,
}: BusinessProfileStepProps) {
  const [formData, setFormData] = useState(initialData || {
    businessName: '',
    businessType: '',
    industry: '',
    ein: '',
    state: '',
    city: '',
    street: '',
    building: '',
    zip: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string) => (event: { target: { value: string } }) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Clear error when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required';
    }
    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }
    if (!formData.ein.trim()) {
      newErrors.ein = 'EIN is required';
    } else if (!/^\d{2}-?\d{7}$/.test(formData.ein)) {
      newErrors.ein = 'Invalid EIN format (e.g., 12-3456789)';
    }
    
    setErrors(newErrors);
    console.log('Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    console.log('BusinessProfileStep - Current form data:', formData);
    if (validateForm()) {
      setIsSaving(true);
      console.log('BusinessProfileStep - Validation passed, saving form data:', formData);
      // Save data
      if (onSave) {
        onSave(formData);
      } else {
        console.warn('BusinessProfileStep - onSave callback is not provided!');
      }
      // Simulate saving
      setTimeout(() => {
        setIsSaving(false);
        onNext();
      }, 800);
    } else {
      console.log('BusinessProfileStep - Validation failed, not proceeding');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100%',
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 },
        maxWidth: 600,
        mx: 'auto',
      }}
    >
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
        Tell us about your business
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 400,
          color: '#535862',
          mb: 2,
          textAlign: 'center',
          maxWidth: 500,
        }}
      >
        We&apos;ll use this information to verify your account details and tailor your dashboard experience.
      </Typography>

      {/* Additional Info */}
      <Typography
        sx={{
          fontSize: '0.875rem',
          fontWeight: 400,
          color: '#717680',
          mb: 4,
          textAlign: 'center',
          maxWidth: 500,
        }}
      >
        Enter your core business details below. You can update this information anytime in your profile settings.
      </Typography>

      {/* Form */}
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Business Name */}
        <FormControl fullWidth>
          <TextField
            label="Business Name"
            required
            placeholder="e.g. IncoXchange Ltd."
            value={formData.businessName}
            onChange={handleChange('businessName')}
            error={!!errors.businessName}
            helperText={errors.businessName}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </FormControl>

        {/* Business Type */}
        <FormControl fullWidth required error={!!errors.businessType}>
          <InputLabel>Business Type</InputLabel>
          <Select
            value={formData.businessType}
            onChange={handleChange('businessType')}
            label="Business Type"
            sx={{
              borderRadius: 2,
            }}
          >
            <MenuItem value="">Select business type</MenuItem>
            <MenuItem value="corporation">Corporation</MenuItem>
            <MenuItem value="llc">LLC</MenuItem>
            <MenuItem value="sole_proprietor">Sole Proprietor</MenuItem>
            <MenuItem value="partnership">Partnership</MenuItem>
          </Select>
          {errors.businessType && (
            <FormHelperText>{errors.businessType}</FormHelperText>
          )}
        </FormControl>

        {/* Industry */}
        <FormControl fullWidth required error={!!errors.industry}>
          <InputLabel>Industry</InputLabel>
          <Select
            value={formData.industry}
            onChange={handleChange('industry')}
            label="Industry"
            sx={{
              borderRadius: 2,
            }}
          >
            <MenuItem value="">Select industry type</MenuItem>
            <MenuItem value="construction">Construction</MenuItem>
            <MenuItem value="property_management">Property Management</MenuItem>
            <MenuItem value="healthcare">Healthcare</MenuItem>
            <MenuItem value="retail">Retail</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {errors.industry && (
            <FormHelperText>{errors.industry}</FormHelperText>
          )}
        </FormControl>

        {/* EIN */}
        <FormControl fullWidth>
          <TextField
            label="EIN"
            required
            placeholder="12-3456789"
            value={formData.ein}
            onChange={handleChange('ein')}
            error={!!errors.ein}
            helperText={errors.ein || 'Employer Identification Number (e.g., 12-3456789)'}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </FormControl>

        {/* Business Address Section */}
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#181D27',
            mt: 1,
          }}
        >
          Business Address *
        </Typography>

        {/* State */}
        <FormControl fullWidth required>
          <InputLabel>State</InputLabel>
          <Select
            value={formData.state}
            onChange={handleChange('state')}
            label="State"
            sx={{
              borderRadius: 2,
            }}
          >
            <MenuItem value="">State</MenuItem>
            <MenuItem value="ny">New York</MenuItem>
            <MenuItem value="ca">California</MenuItem>
            <MenuItem value="tx">Texas</MenuItem>
            <MenuItem value="fl">Florida</MenuItem>
          </Select>
        </FormControl>

        {/* City */}
        <FormControl fullWidth required>
          <InputLabel>City</InputLabel>
          <Select
            value={formData.city}
            onChange={handleChange('city')}
            label="City"
            sx={{
              borderRadius: 2,
            }}
          >
            <MenuItem value="">City</MenuItem>
            <MenuItem value="nyc">New York City</MenuItem>
            <MenuItem value="la">Los Angeles</MenuItem>
            <MenuItem value="chicago">Chicago</MenuItem>
          </Select>
        </FormControl>

        {/* Street */}
        <FormControl fullWidth>
          <TextField
            label="Street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange('street')}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </FormControl>

        {/* Building */}
        <FormControl fullWidth>
          <TextField
            label="Building"
            placeholder="Building"
            value={formData.building}
            onChange={handleChange('building')}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </FormControl>

        {/* ZIP */}
        <FormControl fullWidth>
          <TextField
            label="ZIP"
            placeholder="ZIP"
            value={formData.zip}
            onChange={handleChange('zip')}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </FormControl>
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
          onClick={handleContinue}
          disabled={isSaving}
          aria-label="Continue to next step"
          sx={{
            px: 4,
            py: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: 2,
            minWidth: 150,
          }}
        >
          {isSaving ? 'Saving...' : 'Continue'}
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

      {/* Footer Note */}
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 400,
          color: '#717680',
          mt: 4,
          textAlign: 'center',
        }}
      >
        IncoXchange currently serves U.S.-based businesses only.
      </Typography>
    </Box>
  );
}

