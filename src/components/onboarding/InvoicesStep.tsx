'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Scanner as ScannerIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

interface InvoicesStepProps {
  onNext: () => void;
  onSkip: () => void;
  initialInvoices?: Array<{ name: string; size: number }>;
  onSave?: (invoices: Array<{ name: string; size: number }>) => void;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  scanStatus?: 'pending' | 'scanning' | 'verified' | 'failed';
  extractedData?: {
    invoiceNumber?: string;
    amount?: string;
    date?: string;
  };
}

export default function InvoicesStep({
  onNext,
  onSkip,
  initialInvoices,
  onSave,
}: InvoicesStepProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(
    initialInvoices?.map(inv => ({
      ...inv,
      type: 'application/pdf',
      status: 'success' as const,
      progress: 100,
      scanStatus: 'verified' as const,
    })) || []
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'image/png',
        'image/jpeg',
        'image/jpg',
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    validFiles.forEach((file) => {
      const newFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
      };

      setUploadedFiles((prev) => [...prev, newFile]);

      // Simulate upload progress
      simulateUpload(newFile);
    });
  };

  const simulateUpload = (file: UploadedFile) => {
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((f) => {
          if (f.name === file.name && f.status === 'uploading') {
            const newProgress = f.progress + 20;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, progress: 100, status: 'success' };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        })
      );
    }, 300);
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleContinue = () => {
    setIsProcessing(true);
    
    console.log('InvoicesStep - Uploaded files:', uploadedFiles);
    // Save invoice data
    if (onSave) {
      const invoiceData = uploadedFiles.map(f => ({ name: f.name, size: f.size }));
      console.log('InvoicesStep - Saving invoice data:', invoiceData);
      onSave(invoiceData);
      console.log('InvoicesStep - Invoice data saved successfully');
    } else {
      console.warn('InvoicesStep - onSave callback not available!');
    }
    
    // Simulate scanning process for each file
    const scanFiles = async () => {
      for (let i = 0; i < uploadedFiles.length; i++) {
        // Skip already verified files
        if (uploadedFiles[i].scanStatus === 'verified') {
          continue;
        }

        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setUploadedFiles(prev => prev.map((file, index) => {
          if (index === i) {
            return {
              ...file,
              scanStatus: 'scanning',
            };
          }
          return file;
        }));

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setUploadedFiles(prev => prev.map((file, index) => {
          if (index === i) {
            // Simulate data extraction
            return {
              ...file,
              scanStatus: 'verified',
              extractedData: {
                invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
                amount: `$${(Math.random() * 10000 + 1000).toFixed(2)}`,
                date: new Date().toLocaleDateString(),
              },
            };
          }
          return file;
        }));
      }

      // Wait a bit then proceed
      await new Promise(resolve => setTimeout(resolve, 1500));
      onNext();
    };

    scanFiles();
  };

  // Processing Screen
  if (isProcessing) {
    const allScanned = uploadedFiles.every(f => f.scanStatus === 'verified');
    
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
          {allScanned ? 'Verification complete' : 'Scanning your invoices'}
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
          {allScanned 
            ? 'All invoices have been verified successfully.' 
            : 'We\'re extracting data and verifying your invoice details. This will only take a moment.'}
        </Typography>

        {/* Scanning Icon */}
        {!allScanned && (
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 6,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(1.05)', opacity: 0.8 },
              },
            }}
          >
            <ScannerIcon sx={{ fontSize: 40, color: '#2164ef' }} />
          </Box>
        )}

        {/* Files Being Scanned */}
        <Box sx={{ width: '100%', maxWidth: 600 }}>
          <List
            sx={{
              border: '1px solid #E9EAEB',
              borderRadius: 2,
              backgroundColor: 'white',
            }}
          >
            {uploadedFiles.map((file, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Box sx={{ borderTop: '1px solid #E9EAEB' }} />}
                <ListItem sx={{ py: 3 }}>
                  <Box
                    sx={{
                      mr: 2,
                      color:
                        file.scanStatus === 'verified'
                          ? '#10b981'
                          : file.scanStatus === 'scanning'
                          ? '#2164ef'
                          : '#717680',
                    }}
                  >
                    {file.scanStatus === 'verified' ? (
                      <CheckCircleIcon />
                    ) : file.scanStatus === 'scanning' ? (
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          border: '3px solid #E9EAEB',
                          borderTop: '3px solid #2164ef',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                          '@keyframes spin': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' },
                          },
                        }}
                      />
                    ) : (
                      <ReceiptIcon />
                    )}
                  </Box>
                  <ListItemText
                    primary={file.name}
                    secondary={
                      <Box component="span" sx={{ display: 'block' }}>
                        <Typography
                          component="span"
                          sx={{
                            fontSize: '0.75rem',
                            color: '#717680',
                            display: 'block',
                          }}
                        >
                          {file.scanStatus === 'verified' && file.extractedData
                            ? `${file.extractedData.invoiceNumber} • ${file.extractedData.amount} • ${file.extractedData.date}`
                            : file.scanStatus === 'scanning'
                            ? 'Extracting invoice data...'
                            : 'Pending scan'}
                        </Typography>
                        {file.scanStatus === 'verified' && (
                          <Typography
                            component="span"
                            sx={{
                              fontSize: '0.75rem',
                              color: '#10b981',
                              fontWeight: 500,
                              mt: 0.5,
                              display: 'block',
                            }}
                          >
                            ✓ Verified successfully
                          </Typography>
                        )}
                      </Box>
                    }
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#181D27',
                        mb: 0.5,
                      },
                    }}
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Progress Info */}
        {!allScanned && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#2164ef',
              }}
            >
              Processing {uploadedFiles.filter(f => f.scanStatus === 'verified').length} of {uploadedFiles.length} invoices
            </Typography>
          </Box>
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
        Upload your invoices
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
        Submit your recent invoices to get started with funding and customer verification.
      </Typography>

      {/* Upload Area */}
      <Box
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUpload}
        sx={{
          width: '100%',
          border: isDragging ? '2px dashed #2164ef' : '2px dashed #E9EAEB',
          borderRadius: 2,
          p: { xs: 4, sm: 6 },
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backgroundColor: isDragging ? '#eff6ff' : '#FAFAFA',
          '&:hover': {
            borderColor: '#2164ef',
            backgroundColor: '#eff6ff',
          },
        }}
      >
        {/* Upload Icon */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '8px',
            border: '1px solid #E9EAEB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            backgroundColor: 'white',
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 24, color: '#717680' }} />
        </Box>

        {/* Upload Text */}
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#181D27',
            mb: 1,
          }}
        >
          <Typography
            component="span"
            sx={{
              color: '#2164ef',
              fontWeight: 600,
              textDecoration: 'underline',
            }}
          >
            Click to upload
          </Typography>
          {' '}or drag and drop
        </Typography>

        {/* File Info */}
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 400,
            color: '#717680',
          }}
        >
          PDF, DOCX, or image formats (max. 10mb per file)
        </Typography>
      </Box>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Box sx={{ width: '100%', mt: 4 }}>
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#181D27',
              mb: 2,
            }}
          >
            Uploaded Files ({uploadedFiles.length})
          </Typography>
          <List
            sx={{
              border: '1px solid #E9EAEB',
              borderRadius: 2,
              backgroundColor: 'white',
            }}
          >
            {uploadedFiles.map((file, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Box sx={{ borderTop: '1px solid #E9EAEB' }} />
                )}
                <ListItem
                  secondaryAction={
                    file.status === 'success' ? (
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveFile(file.name)}
                        sx={{
                          color: '#717680',
                          '&:hover': {
                            color: '#ef4444',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null
                  }
                  sx={{ py: 2 }}
                >
                  <Box
                    sx={{
                      mr: 2,
                      color: file.status === 'success' ? '#10b981' : '#2164ef',
                    }}
                  >
                    {file.status === 'success' ? (
                      <CheckCircleIcon />
                    ) : (
                      <DescriptionIcon />
                    )}
                  </Box>
                  <ListItemText
                    primary={file.name}
                    secondary={
                      <Box component="span" sx={{ display: 'block' }}>
                        <Typography
                          component="span"
                          sx={{
                            fontSize: '0.75rem',
                            color: '#717680',
                            mb: file.status === 'uploading' ? 0.5 : 0,
                            display: 'block',
                          }}
                        >
                          {formatFileSize(file.size)}
                          {file.status === 'uploading' && ` • Uploading...`}
                          {file.status === 'success' && ` • Upload complete`}
                        </Typography>
                        {file.status === 'uploading' && (
                          <LinearProgress
                            variant="determinate"
                            value={file.progress}
                            sx={{
                              mt: 1,
                              height: 4,
                              borderRadius: 2,
                              backgroundColor: '#E9EAEB',
                            }}
                          />
                        )}
                      </Box>
                    }
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#181D27',
                      },
                    }}
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
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
          onClick={handleContinue}
          disabled={uploadedFiles.length === 0 || uploadedFiles.some(f => f.status === 'uploading')}
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

