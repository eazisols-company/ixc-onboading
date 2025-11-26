# UserContext Fields Guide

This document describes all fields in the UserContext and how to use them.

## 📋 Table of Contents
- [Authentication & User Info](#authentication--user-info)
- [Onboarding Data](#onboarding-data)
- [Application Status & Timeline](#application-status--timeline)
- [Decision & Terms](#decision--terms)
- [Navigation & Progress](#navigation--progress)
- [Actions](#actions)

---

## Authentication & User Info

### `isAuthenticated: boolean`
**Purpose:** Tracks if user is logged in  
**Usage:** Use to protect routes and show/hide content  
```typescript
if (!isAuthenticated) {
  router.push('/signup');
}
```

### `userEmail: string | null`
**Purpose:** User's email address  
**Usage:** Display in UI, use for communication  
```typescript
<Typography>Welcome, {userEmail}</Typography>
```

### `userProfile: UserProfile | null`
**Purpose:** Extended user information  
**Type:**
```typescript
interface UserProfile {
  fullName: string;      // Full legal name
  phoneNumber: string;   // Contact number
  jobTitle: string;      // Position in company
}
```
**Usage:** 
```typescript
const { userProfile, saveUserProfile } = useUser();

// Update profile
saveUserProfile({
  fullName: "John Doe",
  phoneNumber: "+1-555-0123",
  jobTitle: "CFO"
});
```

---

## Onboarding Data

### `onboardingData: OnboardingData | null`
**Purpose:** All business information collected during onboarding  
**Type:**
```typescript
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
```

### `factoringAgreement: FactoringAgreement | null` 🆕 **CRITICAL**
**Purpose:** Legal agreement signature data  
**Type:**
```typescript
interface FactoringAgreement {
  agreed: boolean;           // User checked agreement box
  signature: string;         // Electronic signature (typed name)
  signedAt: Date | null;     // Timestamp of signature
  agreementVersion: string;  // Version of agreement (e.g., "v1.0.0")
}
```
**Usage:**
```typescript
const { factoringAgreement, saveFactoringAgreement } = useUser();

// Save signature
saveFactoringAgreement({
  agreed: true,
  signature: "John Doe",
  signedAt: new Date(),
  agreementVersion: "v1.0.0"
});

// Check if signed
if (factoringAgreement?.agreed) {
  console.log(`Signed by ${factoringAgreement.signature} on ${factoringAgreement.signedAt}`);
}
```

---

## Application Status & Timeline

### `applicationStatus: ApplicationStatus`
**Purpose:** Current state of application  
**Values:** `'pending' | 'under_review' | 'approved' | 'rejected'`  
**Usage:**
```typescript
const { applicationStatus } = useUser();

switch (applicationStatus) {
  case 'pending':
    return <PendingMessage />;
  case 'under_review':
    return <ReviewMessage />;
  case 'approved':
    return <ApprovedMessage />;
  case 'rejected':
    return <RejectedMessage />;
}
```

### `startedAt: Date | null` 🆕
**Purpose:** When user first signed up  
**Usage:**
```typescript
const { startedAt } = useUser();
const daysSinceStart = startedAt 
  ? Math.floor((Date.now() - startedAt.getTime()) / (1000 * 60 * 60 * 24))
  : 0;
```

### `submittedAt: Date | null`
**Purpose:** When application was submitted  
**Usage:** Display submission time, calculate review duration

### `approvedAt: Date | null` 🆕
**Purpose:** When application was approved  
**Usage:** Show approval date, track metrics

### `rejectedAt: Date | null` 🆕
**Purpose:** When application was rejected  
**Usage:** Show rejection date

### `lastActivityAt: Date | null` 🆕
**Purpose:** Last time user interacted with the app  
**Usage:** Track engagement, detect abandoned applications
```typescript
const isAbandoned = lastActivityAt 
  && (Date.now() - lastActivityAt.getTime()) > 7 * 24 * 60 * 60 * 1000; // 7 days
```

---

## Decision & Terms

### `rejectionReason: string | null` 🆕
**Purpose:** Why application was rejected  
**Usage:**
```typescript
const { rejectionReason, applicationStatus } = useUser();

if (applicationStatus === 'rejected' && rejectionReason) {
  return (
    <Alert severity="error">
      <Typography>Rejection Reason: {rejectionReason}</Typography>
    </Alert>
  );
}
```

### `reviewNotes: string | null` 🆕
**Purpose:** Internal notes from review team  
**Usage:** Optional feedback for user or internal tracking

### `creditTerms: CreditTerms | null` 🆕
**Purpose:** Approved credit terms  
**Type:**
```typescript
interface CreditTerms {
  creditLimit: number;    // Maximum funding amount
  factoringRate: number;  // Fee percentage (e.g., 3.5 = 3.5%)
  approvedBy: string;     // Who approved the terms
}
```
**Usage:**
```typescript
const { creditTerms, applicationStatus } = useUser();

if (applicationStatus === 'approved' && creditTerms) {
  return (
    <Box>
      <Typography>Credit Limit: ${creditTerms.creditLimit.toLocaleString()}</Typography>
      <Typography>Factoring Rate: {creditTerms.factoringRate}%</Typography>
    </Box>
  );
}
```

---

## Navigation & Progress

### `isLoading: boolean`
**Purpose:** Initial load state  
**Usage:** Show loading screen during hydration

### `currentStep: number`
**Purpose:** Active onboarding step (0-6)  
**Usage:** Navigate through onboarding flow

### `completedSteps: number[]` 🆕
**Purpose:** Array of completed step indices  
**Usage:**
```typescript
const { completedSteps, markStepCompleted } = useUser();

// Mark step as completed
markStepCompleted(2); // Mark customers step complete

// Check if step is completed
const isStepComplete = completedSteps.includes(stepIndex);

// Progress percentage
const progressPercent = (completedSteps.length / 7) * 100;
```

---

## Actions

### `signIn(email: string, fullName?: string)`
**Purpose:** Authenticate user  
**Usage:**
```typescript
const { signIn } = useUser();

signIn('user@example.com', 'John Doe');
```

### `signOut()`
**Purpose:** Log out user and clear all data  
**Usage:**
```typescript
const { signOut } = useUser();

const handleLogout = () => {
  signOut();
  router.push('/signup');
};
```

### `saveUserProfile(profile: UserProfile)` 🆕
**Purpose:** Update user profile information  
**Usage:**
```typescript
saveUserProfile({
  fullName: "Jane Smith",
  phoneNumber: "+1-555-9876",
  jobTitle: "CEO"
});
```

### `saveOnboardingData(data: OnboardingData)`
**Purpose:** Save onboarding form data  
**Usage:** Called from each onboarding step

### `saveFactoringAgreement(agreement: FactoringAgreement)` 🆕
**Purpose:** Save signed agreement  
**Usage:**
```typescript
saveFactoringAgreement({
  agreed: true,
  signature: "John Doe",
  signedAt: new Date(),
  agreementVersion: "v1.0.0"
});
```

### `saveCurrentStep(step: number)`
**Purpose:** Save current onboarding step  
**Usage:** Auto-saves as user progresses

### `markStepCompleted(step: number)` 🆕
**Purpose:** Mark a step as fully completed  
**Usage:**
```typescript
const { markStepCompleted } = useUser();

// When user completes a step
const handleComplete = () => {
  markStepCompleted(currentStep);
  // Move to next step
};
```

### `submitApplication()`
**Purpose:** Submit application for review  
**Usage:** Called when user completes onboarding

### `updateApplicationDecision(status, options)` 🆕
**Purpose:** Update application status with decision details  
**Type:**
```typescript
updateApplicationDecision(
  status: 'approved' | 'rejected',
  options?: {
    rejectionReason?: string;
    reviewNotes?: string;
    creditTerms?: CreditTerms;
  }
)
```
**Usage:**
```typescript
// Approve with terms
updateApplicationDecision('approved', {
  creditTerms: {
    creditLimit: 100000,
    factoringRate: 3.5,
    approvedBy: 'John Reviewer'
  },
  reviewNotes: 'Strong credit history'
});

// Reject with reason
updateApplicationDecision('rejected', {
  rejectionReason: 'Insufficient business history',
  reviewNotes: 'Company < 1 year old'
});
```

---

## 🔒 Data Persistence

All data is automatically saved to localStorage with safe error handling:

- **SSR-safe**: Works with Next.js server-side rendering
- **Error handling**: Gracefully handles quota exceeded and private browsing
- **Type-safe**: All data is validated on load
- **Automatic**: Updates trigger localStorage saves automatically

---

## 🎯 Common Use Cases

### Check if user can submit application
```typescript
const canSubmit = 
  onboardingData?.businessProfile.businessName &&
  onboardingData?.customers.length > 0 &&
  onboardingData?.bankConnection.bankId &&
  factoringAgreement?.agreed;
```

### Show application progress
```typescript
const totalSteps = 7;
const progress = {
  percentage: (completedSteps.length / totalSteps) * 100,
  completed: completedSteps.length,
  remaining: totalSteps - completedSteps.length
};
```

### Display time since submission
```typescript
const { submittedAt, applicationStatus } = useUser();

if (applicationStatus === 'under_review' && submittedAt) {
  const hoursSince = Math.floor(
    (Date.now() - submittedAt.getTime()) / (1000 * 60 * 60)
  );
  
  return <Typography>Submitted {hoursSince} hours ago</Typography>;
}
```

### Check if agreement is signed
```typescript
const isAgreementSigned = 
  factoringAgreement?.agreed && 
  factoringAgreement?.signature.trim().length > 0;
```

---

## 🆕 Migration Notes

If you have existing code using the old UserContext:

1. **signIn** now accepts optional `fullName` parameter
2. **FactoringAgreementStep** now saves signature data automatically
3. All dates are now properly typed as `Date | null` instead of strings
4. New fields are backward compatible - existing code will continue to work

---

## 📝 Developer Notes

- All dates are stored as ISO strings in localStorage and converted to Date objects
- The `updateLastActivity()` function is called automatically on all saves
- Lazy initialization ensures all data loads on first render (no flash of loading state)
- All localStorage operations are wrapped in error handling

---

**Last Updated:** November 2025  
**Version:** 2.0.0

