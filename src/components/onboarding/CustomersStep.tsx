'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface Customer {
  customerName: string;
  contactPerson: string;
  email: string;
  phone: string;
  billingAddress: string;
}

interface CustomersStepProps {
  onNext: () => void;
  onSkip: () => void;
  initialCustomers?: Customer[];
  onSave?: (customers: Customer[]) => void;
}

export default function CustomersStep({
  onNext,
  onSkip,
  initialCustomers,
  onSave,
}: CustomersStepProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers || []);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    contactPerson: '',
    email: '',
    phone: '',
    billingAddress: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.phone && !/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset form and errors
    setFormData({
      customerName: '',
      contactPerson: '',
      email: '',
      phone: '',
      billingAddress: '',
    });
    setErrors({});
  };

  const handleAddCustomer = () => {
    if (validateForm()) {
      setCustomers([...customers, formData]);
      handleCloseDialog();
    }
  };

  const handleRemoveCustomer = (index: number) => {
    setCustomers(customers.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    // Save customers data
    if (onSave) {
      onSave(customers);
    }
    console.log('All customers:', customers);
    onNext();
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
        Add your customers
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
        Create customer records to send invoices and track payments.
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
        You can add your regular customers now or skip and add them later from your dashboard.
      </Typography>

      {/* Customers List or Empty State */}
      <Box sx={{ width: '100%', mb: 4 }}>
        {customers.length === 0 ? (
          <Box
            sx={{
              border: '2px dashed #E9EAEB',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              backgroundColor: '#FAFAFA',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: '#717680',
                mb: 2,
              }}
            >
              No customers added yet
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: 2,
              }}
            >
              Add Customer
            </Button>
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#181D27',
                }}
              >
                Customers ({customers.length})
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  borderRadius: 2,
                }}
              >
                Add Another
              </Button>
            </Box>
            <List
              sx={{
                border: '1px solid #E9EAEB',
                borderRadius: 2,
                backgroundColor: 'white',
              }}
            >
              {customers.map((customer, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveCustomer(index)}
                        sx={{
                          color: '#717680',
                          '&:hover': {
                            color: '#d32f2f',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#181D27',
                          }}
                        >
                          {customer.customerName}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{
                            fontSize: '0.75rem',
                            color: '#717680',
                          }}
                        >
                          {customer.contactPerson} • {customer.email}
                        </Typography>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
      </Box>

      {/* Add Customer Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            m: { xs: 2, sm: 3 },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#181D27',
          }}
        >
          Add Customer
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
            <TextField
              label="Customer Name"
              required
              placeholder="e.g. Greenfield Construction"
              value={formData.customerName}
              onChange={handleChange('customerName')}
              error={!!errors.customerName}
              helperText={errors.customerName}
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Contact Person"
              required
              placeholder="e.g. John Doe"
              value={formData.contactPerson}
              onChange={handleChange('contactPerson')}
              error={!!errors.contactPerson}
              helperText={errors.contactPerson}
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Email"
              required
              type="email"
              placeholder="e.g. billing@greenfield.com"
              value={formData.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#717680', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Phone"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={handleChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: '#717680', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Billing Address"
              placeholder="Add billing address"
              value={formData.billingAddress}
              onChange={handleChange('billingAddress')}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              fontSize: '0.875rem',
              color: '#535862',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddCustomer}
            variant="contained"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: 2,
              px: 3,
            }}
          >
            Add Customer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 4,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          size="medium"
          onClick={handleContinue}
          sx={{
            px: 4,
            py: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: 2,
            minWidth: 150,
          }}
        >
          Continue
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
    </Box>
  );
}

