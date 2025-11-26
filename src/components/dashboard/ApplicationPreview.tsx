'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material';
import {
  Business as BusinessIcon,
  People as PeopleIcon,
  AccountBalance as BankIcon,
  Description as InvoiceIcon,
} from '@mui/icons-material';

interface OnboardingData {
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
}

interface ApplicationPreviewProps {
  data: OnboardingData;
}

export default function ApplicationPreview({ data }: ApplicationPreviewProps) {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Business Profile Section */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '8px',
                backgroundColor: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BusinessIcon sx={{ color: '#2164ef', fontSize: 24 }} />
            </Box>
            <Typography
              sx={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#181D27',
              }}
            >
              Business Profile
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography sx={{ fontSize: '0.75rem', color: '#717680', mb: 0.5 }}>
                Business Name
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#181D27' }}>
                {data.businessProfile.businessName || 'Not provided'}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: '#717680', mb: 0.5 }}>
                  Business Type
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#181D27', textTransform: 'capitalize' }}>
                  {data.businessProfile.businessType.replace('_', ' ') || 'Not provided'}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: '#717680', mb: 0.5 }}>
                  Industry
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#181D27', textTransform: 'capitalize' }}>
                  {data.businessProfile.industry.replace('_', ' ') || 'Not provided'}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography sx={{ fontSize: '0.75rem', color: '#717680', mb: 0.5 }}>
                EIN
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#181D27' }}>
                {data.businessProfile.ein || 'Not provided'}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#181D27', mb: 2 }}>
                Business Address
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: '#535862', lineHeight: 1.6 }}>
                {data.businessProfile.street && `${data.businessProfile.street}, `}
                {data.businessProfile.building && `${data.businessProfile.building}, `}
                {data.businessProfile.city && `${data.businessProfile.city}, `}
                {data.businessProfile.state && `${data.businessProfile.state} `}
                {data.businessProfile.zip || ''}
                {!data.businessProfile.street && !data.businessProfile.city && 'Address not provided'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Customers Section */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '8px',
                backgroundColor: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PeopleIcon sx={{ color: '#2164ef', fontSize: 24 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#181D27',
                }}
              >
                Customers
              </Typography>
            </Box>
            <Chip
              label={`${data.customers.length} customer${data.customers.length !== 1 ? 's' : ''}`}
              size="small"
              sx={{
                backgroundColor: '#eff6ff',
                color: '#2164ef',
                fontWeight: 500,
              }}
            />
          </Box>

          {data.customers.length === 0 ? (
            <Typography sx={{ fontSize: '0.875rem', color: '#717680', fontStyle: 'italic' }}>
              No customers added
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {data.customers.map((customer, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    backgroundColor: '#FAFAFA',
                    borderRadius: 2,
                    border: '1px solid #E9EAEB',
                  }}
                >
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#181D27', mb: 1 }}>
                    {customer.customerName}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#535862' }}>
                      Contact: {customer.contactPerson}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#535862' }}>
                      Email: {customer.email}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#535862' }}>
                      Phone: {customer.phone}
                    </Typography>
                    {customer.billingAddress && (
                      <Typography sx={{ fontSize: '0.75rem', color: '#535862' }}>
                        Address: {customer.billingAddress}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Bank Connection Section */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '8px',
                backgroundColor: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BankIcon sx={{ color: '#2164ef', fontSize: 24 }} />
            </Box>
            <Typography
              sx={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#181D27',
              }}
            >
              Bank Connection
            </Typography>
          </Box>

          {!data.bankConnection.bankName ? (
            <Typography sx={{ fontSize: '0.875rem', color: '#717680', fontStyle: 'italic' }}>
              No bank connected
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: '#717680', mb: 0.5 }}>
                  Bank Name
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#181D27' }}>
                  {data.bankConnection.bankName}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: '#717680', mb: 0.5 }}>
                  Connection Type
                </Typography>
                <Chip
                  label={data.bankConnection.isManual ? 'Manual' : 'Automated'}
                  size="small"
                  sx={{
                    backgroundColor: data.bankConnection.isManual ? '#F5F5F5' : '#eff6ff',
                    color: data.bankConnection.isManual ? '#535862' : '#2164ef',
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Invoices Section */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '8px',
                backgroundColor: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <InvoiceIcon sx={{ color: '#2164ef', fontSize: 24 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#181D27',
                }}
              >
                Invoices
              </Typography>
            </Box>
            <Chip
              label={`${data.invoices.length} file${data.invoices.length !== 1 ? 's' : ''}`}
              size="small"
              sx={{
                backgroundColor: '#eff6ff',
                color: '#2164ef',
                fontWeight: 500,
              }}
            />
          </Box>

          {data.invoices.length === 0 ? (
            <Typography sx={{ fontSize: '0.875rem', color: '#717680', fontStyle: 'italic' }}>
              No invoices uploaded
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {data.invoices.map((invoice, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    backgroundColor: '#FAFAFA',
                    borderRadius: 2,
                    border: '1px solid #E9EAEB',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <InvoiceIcon sx={{ color: '#717680', fontSize: 20 }} />
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#181D27' }}>
                      {invoice.name}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.75rem', color: '#717680' }}>
                    {formatBytes(invoice.size)}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

