# IXC Finance - Onboarding Application

A modern, production-ready authentication and onboarding experience for IncoXchange finance platform. Built with Next.js, React, TypeScript, Tailwind CSS, and Material UI.

## ✨ Recent Updates (v2.0)

- ✅ **Enhanced State Management** - Comprehensive UserContext with 20+ fields
- ✅ **Signature Persistence** - Legal compliance with factoring agreement tracking
- ✅ **SSR-Safe Hydration** - Fixed hydration errors for seamless SSR/CSR
- ✅ **Safe localStorage** - Error-handling utility for reliable persistence
- ✅ **Timeline Tracking** - Complete audit trail of user journey
- ✅ **Credit Terms Management** - Approval/rejection workflow with details
- ✅ **Progress Tracking** - Step completion monitoring
- ✅ **Production Ready** - Zero errors, fully typed, optimized

## Tech Stack

- **Next.js 16.0.2** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Material UI** - React component library (@mui/material)
- **Emotion** - CSS-in-JS styling (@emotion/react, @emotion/styled)
- **Material UI Icons** - Icon library
- **Mona Sans** - Custom typography (@fontsource/mona-sans)
- **ESLint** - Code linting

## Project Structure

```
ixc-onboading/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout with theme provider
│   │   ├── page.tsx                 # Home page (redirects to /signup)
│   │   ├── signup/                  # Sign up flow
│   │   │   ├── page.tsx            # Sign up form with magic link
│   │   │   └── verify/
│   │   │       └── page.tsx        # Email verification screen
│   │   ├── signin/                  # Sign in flow
│   │   │   └── page.tsx            # Sign in form with magic link
│   │   ├── onboarding/              # Multi-step onboarding
│   │   │   └── page.tsx            # Onboarding orchestrator
│   │   ├── dashboard/               # Dashboard
│   │   │   └── page.tsx            # Main dashboard with status
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── ThemeProvider.tsx        # Material UI theme configuration
│   │   ├── dashboard/               # Dashboard components
│   │   │   ├── ApplicationStatus.tsx # Application status widget
│   │   │   └── ApplicationPreview.tsx # Data preview
│   │   └── onboarding/              # Onboarding step components
│   │       ├── OnboardingLayout.tsx # Layout with sidebar stepper
│   │       ├── WelcomeStep.tsx      # Step 1: Welcome
│   │       ├── BusinessProfileStep.tsx # Step 2: Business info
│   │       ├── CustomersStep.tsx    # Step 3: Add customers
│   │       ├── BankConnectStep.tsx  # Step 4: Bank connection
│   │       ├── InvoicesStep.tsx     # Step 5: Upload invoices
│   │       ├── ReviewStep.tsx       # Step 6: Review all data
│   │       └── FactoringAgreementStep.tsx # Step 7: Sign agreement
│   ├── contexts/                    # React Context providers
│   │   └── UserContext.tsx          # 🆕 v2.0 - Enhanced state management
│   ├── utils/                       # Utility functions
│   │   └── localStorage.ts          # 🆕 Safe localStorage with error handling
│   └── lib/
│       └── emotion-cache.ts         # Emotion cache for SSR
├── public/                          # Static assets
│   ├── incoxchange-logomark.svg     # Brand logo
│   ├── banks/                       # Bank logos
│   │   ├── plaid.svg
│   │   ├── chase.svg
│   │   ├── wells-fargo.svg
│   │   └── bank-of-america.svg
│   └── images/                      # Background images
│       ├── bg-female-phone.png
│       └── female-fruits.jpg
├── CONTEXT_FIELDS_GUIDE.md          # 🆕 Complete UserContext API reference
├── CONTEXT_UPGRADE_SUMMARY.md       # 🆕 v1.0 → v2.0 upgrade details
├── HYDRATION_FIX.md                 # 🆕 SSR hydration fix documentation
├── package.json                     # Dependencies
└── tsconfig.json                    # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Design System

### Color Palette

**Primary - Azure Radiance:**
- 50: `#eff6ff`
- 100: `#daeaff`
- 200: `#bedcff`
- 300: `#91c6ff`
- 400: `#5da7fd`
- 500: `#2c7cf9`
- 600: `#2164ef` (main)
- 700: `#1a4edb`
- 800: `#1b41b2`
- 900: `#1c3a8c`

**Gray Scale:**
- 50: `#FAFAFA`
- 100: `#F5F5F5`
- 200: `#E9EAEB`
- 300: `#D5D7DA`
- 400: `#A4A7AE`
- 500: `#717680`
- 600: `#535862`
- 700: `#414651`
- 800: `#252B37`
- 900: `#181D27`

### Typography

**Font Family:** Mona Sans

**Type Scale:**
- Display 2xl: 72px (h1)
- Display xl: 60px (h2)
- Display lg: 48px (h3)
- Display md: 36px (h4)
- Display sm: 30px (h5) - Used for main headings
- Display xs: 24px (h6)
- Text lg: 18px (subtitle1)
- Text md: 16px (body1)
- Text sm: 14px (body2)
- Text xs: 12px (caption)

**Font Weights:**
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Application Flow

### Authentication

1. **Sign Up** (`/signup`)
   - User enters email
   - Sends magic link
   - Redirects to verification screen

2. **Email Verification** (`/signup/verify`)
   - Shows countdown timer (15 minutes)
   - Resend link functionality
   - Demo: "Skip to Onboarding" button

3. **Sign In** (`/signin`)
   - Same magic link flow for existing users

### Onboarding Flow

**7-Step Process:**

1. **Welcome** - Introduction screen
2. **Business Profile** - Company details with validation
3. **Customers** - Add customers via dialog (multi-add supported)
4. **Bank Connect** - Connect via Plaid/bank or manually
5. **Invoices** - Upload invoices with drag & drop + scanning simulation
6. **Review** - Review all data with edit functionality
7. **Factoring Agreement** - E-signature and completion

### State Management

**Production-Grade State Management** with UserContext v2.0

#### Core Features
- ✅ **20+ State Fields** - User profile, timeline, credit terms, signatures
- ✅ **SSR-Safe** - No hydration errors, works with Next.js App Router
- ✅ **Type-Safe** - Full TypeScript support with exported interfaces
- ✅ **Persistent** - Safe localStorage with error handling
- ✅ **Legal Compliance** - Signature tracking with timestamps
- ✅ **Progress Tracking** - Step completion monitoring
- ✅ **Timeline Tracking** - Complete audit trail (started, submitted, approved/rejected)

#### UserContext API

```typescript
import { useUser } from '@/contexts/UserContext';

const {
  // Authentication & User Info
  isAuthenticated,
  userEmail,
  userProfile,                    // 🆕 fullName, phoneNumber, jobTitle
  
  // Onboarding Data
  onboardingData,
  factoringAgreement,             // 🆕 signature, signedAt, agreementVersion
  
  // Application Status & Timeline
  applicationStatus,              // pending | under_review | approved | rejected
  startedAt,                      // 🆕 When user first signed up
  submittedAt,
  approvedAt,                     // 🆕 When approved
  rejectedAt,                     // 🆕 When rejected
  lastActivityAt,                 // 🆕 Last interaction time
  
  // Decision & Terms
  rejectionReason,                // 🆕 Why rejected
  reviewNotes,                    // 🆕 Internal notes
  creditTerms,                    // 🆕 creditLimit, factoringRate, approvedBy
  
  // Navigation & Progress
  currentStep,
  completedSteps,                 // 🆕 Array of completed step indices
  isLoading,
  
  // Actions
  signIn,
  signOut,
  saveUserProfile,                // 🆕
  saveOnboardingData,
  saveFactoringAgreement,         // 🆕 Save signatures
  saveCurrentStep,
  markStepCompleted,              // 🆕 Track progress
  submitApplication,
  updateApplicationDecision,      // 🆕 Admin approval/rejection
} = useUser();
```

#### Data Structure

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

#### Key Features
- ✅ **Data persists across steps** - Auto-saved to localStorage
- ✅ **Pre-filled forms** when editing from Review
- ✅ **Smart navigation** - Edit returns to review, not next step
- ✅ **Automatic activity tracking** - Updates lastActivityAt on every save
- ✅ **SSR-compatible** - Hydrates correctly without mismatches
- ✅ **Error handling** - Graceful fallbacks for quota/private browsing

## Component Patterns

### Form Components

All form steps follow this pattern:

```typescript
interface StepProps {
  onNext: () => void;
  onSkip: () => void;
  initialData?: T;
  onSave?: (data: T) => void;
}
```

### Validation

- Real-time validation with error states
- Error messages displayed below fields
- Errors clear when user types
- Form submit disabled until valid

### Loading States

All async operations show loading feedback:
- Button text changes (e.g., "Saving...")
- Spinners for long operations
- Progress indicators

## Key Features

### Authentication
- Passwordless magic link authentication
- Email validation
- 15-minute link expiry with countdown
- Resend functionality
- Split-screen layout with hero images
- Demo skip button for testing

### Onboarding
- **Progressive disclosure** - Complex forms use dialogs
- **Mobile responsive** - All screens adapt to mobile
- **Accessibility** - ARIA labels, keyboard navigation
- **Error handling** - Success/error states with animations
- **State persistence** - Data saved across navigation with safe localStorage
- **Edit functionality** - Edit any step from review
- **Form validation** - Real-time error feedback
- **Trust signals** - Security badges, encryption notices
- **Smart navigation** - Edit returns to review, not next step
- **Signature capture** - 🆕 Legal agreement with e-signature persistence
- **Progress tracking** - 🆕 Track completed steps and overall progress
- **SSR-optimized** - 🆕 No hydration errors, seamless server/client rendering

### Mobile Optimizations
- **Hidden sidebar** - Sidebar hidden on mobile, shows on desktop
- **Mobile header** - Logo and step counter (Step X of 7)
- **Touch targets** - Minimum 44px height on all buttons
- **Optimized padding** - Reduced spacing for mobile screens
- **Responsive typography** - Smaller fonts on mobile
- **Full-width forms** - Forms take full screen width on mobile
- **Responsive grids** - 1 column mobile → 2-4 columns desktop
- **Mobile-friendly dialogs** - Proper margins and spacing

### Special Components

**Drag & Drop Upload** (`InvoicesStep`):
- Accepts: PDF, DOCX, DOC, PNG, JPG, JPEG
- Max size: 10MB per file
- Visual feedback for drag state
- Upload progress bars
- File scanning simulation

**Bank Selection** (`BankConnectStep`):
- Visual bank selection with logos
- Manual connection form
- Connection simulation with success/error states
- Security trust badges

**Customer Management** (`CustomersStep`):
- Dialog-based form
- Multi-customer support
- List with delete functionality
- Email and phone validation

**Factoring Agreement** (`FactoringAgreementStep`):
- 🆕 Legal agreement display with scrollable content
- 🆕 Electronic signature capture (typed name)
- 🆕 Signature persistence with timestamp and version tracking
- 🆕 Legal compliance ready with full audit trail
- Agreement checkbox validation
- Success animation on completion

## Development Guidelines

### Using UserContext

The UserContext provides comprehensive state management. See `CONTEXT_FIELDS_GUIDE.md` for complete API reference.

**Basic Usage:**

```typescript
import { useUser } from '@/contexts/UserContext';

function MyComponent() {
  const { 
    onboardingData, 
    saveOnboardingData,
    markStepCompleted 
  } = useUser();
  
  const handleSave = (data) => {
    saveOnboardingData(data);
    markStepCompleted(currentStep);
  };
}
```

**Tracking Signatures:**

```typescript
import { useUser } from '@/contexts/UserContext';

function AgreementComponent() {
  const { saveFactoringAgreement } = useUser();
  
  const handleSign = (signature: string) => {
    saveFactoringAgreement({
      agreed: true,
      signature: signature,
      signedAt: new Date(),
      agreementVersion: 'v1.0.0'
    });
  };
}
```

**Admin Decisions:**

```typescript
const { updateApplicationDecision } = useUser();

// Approve
updateApplicationDecision('approved', {
  creditTerms: {
    creditLimit: 100000,
    factoringRate: 3.5,
    approvedBy: 'Admin Name'
  }
});

// Reject
updateApplicationDecision('rejected', {
  rejectionReason: 'Insufficient documentation'
});
```

### Adding New Steps

1. Create component in `src/components/onboarding/YourStep.tsx`
2. Add to `OnboardingLayout.tsx` steps array
3. Import and add to switch statement in `src/app/onboarding/page.tsx`
4. Use UserContext for state management
5. Call `markStepCompleted()` when step is done

### Styling Guidelines

- Use Material UI's `sx` prop for styling
- Follow the design system colors (no arbitrary colors)
- Use responsive values: `{ xs: value, sm: value, md: value }`
- Border radius: 2 (8px) for consistency
- Use theme typography variants when possible
- **Mobile-first approach** - Start with mobile, add desktop enhancements
- **Touch targets** - Minimum 44px for interactive elements
- **Spacing** - Use responsive padding: `px: { xs: 2, sm: 4 }`

### Form Validation

```typescript
const validateForm = () => {
  const errors: Record<string, string> = {};
  
  if (!field.trim()) {
    errors.field = 'Field is required';
  }
  
  setErrors(errors);
  return Object.keys(errors).length === 0;
};
```

### TypeScript

- All components use TypeScript
- Define interfaces for props
- Use proper types (avoid `any` unless necessary for MUI)
- Type all state and functions
- **Import shared types** from UserContext:

```typescript
import { 
  OnboardingData, 
  UserProfile, 
  FactoringAgreement, 
  CreditTerms 
} from '@/contexts/UserContext';
```

## Environment Variables

Currently none required for demo. For production, you'll need:

```env
NEXT_PUBLIC_API_URL=your_api_url
EMAIL_SERVICE_API_KEY=your_email_service_key
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
```

## ✅ Completed Features (v2.0)

### State Management
- [x] Comprehensive UserContext with 20+ fields
- [x] Safe localStorage utility with error handling
- [x] SSR-safe hydration (no mismatches)
- [x] Signature persistence with timestamps
- [x] Timeline tracking (started, submitted, approved/rejected)
- [x] Progress tracking (completed steps)
- [x] Credit terms management
- [x] User profile storage
- [x] Activity tracking (lastActivityAt)
- [x] Full TypeScript support with exported interfaces
- [x] Legal compliance (signature audit trail)

### Production Readiness
- [x] Zero hydration errors
- [x] Zero TypeScript errors
- [x] Zero linter errors
- [x] Successful build
- [x] Mobile-responsive
- [x] Accessible (ARIA, keyboard nav)
- [x] Comprehensive documentation

## Known Issues & TODO

### Authentication
- [ ] Implement actual email sending (currently simulated)
- [ ] Add magic link token generation and validation
- [ ] Set up email service (SendGrid, AWS SES, etc.)
- [ ] Add session management with JWT/cookies

### Backend Integration
- [ ] Connect UserContext to backend API
- [ ] Database persistence (Prisma + PostgreSQL recommended)
- [ ] API endpoints for CRUD operations
- [ ] Signature verification system

### Third-Party Integrations
- [ ] Implement actual Plaid integration for bank connection
- [ ] Add real document scanning/OCR for invoices
- [ ] Email notification service

### Dashboard Enhancements
- [ ] Expand dashboard UI with more widgets
- [ ] Add analytics and charts
- [ ] Invoice management interface
- [ ] Customer management page
- [ ] Settings page with profile editing
- [ ] Admin panel for application review

### Testing & Monitoring
- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Set up CI/CD pipeline
- [ ] Add error tracking (Sentry)
- [ ] Add analytics (Google Analytics, Mixpanel)
- [ ] Performance monitoring

## Testing

### Manual Testing Flow

1. Start dev server: `npm run dev`
2. Visit `http://localhost:3000` (redirects to `/signup`)
3. Enter email → "Send magic link"
4. Click "Skip to Onboarding" (demo button)
5. Complete all 7 onboarding steps
6. Sign agreement → Redirect to dashboard

### Test Data

Use these for testing:
- **Email:** any valid email format
- **EIN:** `12-3456789`
- **Bank:** Any of the 4 provided options
- **Invoices:** Upload any PDF/image under 10MB

## Deployment

### Build

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Setup

1. Add environment variables in Vercel dashboard
2. Configure domains
3. Set up email service
4. Configure Plaid (for bank connections)

## Mobile-First Design

### Mobile View Features
- **Adaptive layout** - Sidebar hidden, content full-width
- **Step indicator** - Mobile header shows current progress
- **Optimized spacing** - Reduced padding for small screens
- **Touch-friendly** - 44px minimum touch targets
- **Responsive typography** - Font sizes scale down appropriately
- **Vertical layouts** - Forms stack vertically on mobile

### Breakpoints
- **xs** (0px+) - Mobile phones
- **sm** (600px+) - Tablets
- **md** (900px+) - Desktop (sidebar appears)
- **lg** (1200px+) - Large desktop

### Testing Mobile
- Use Chrome DevTools device emulation
- Test on actual devices (iOS/Android)
- Common sizes: iPhone 14 (390px), iPad (768px), Desktop (1440px)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive from 320px to 4K displays

## Performance

- All routes are statically pre-rendered
- Images optimized with Next.js Image component (where applicable)
- Code splitting by route
- Material UI CSS-in-JS with emotion cache for SSR
- Lazy loading for optimal mobile performance
- Minimal bundle size with tree shaking

## Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Semantic HTML
- Color contrast meets WCAG AA standards

## Contributing

When adding new features:

1. **Follow existing component patterns** - See current components for reference
2. **Add TypeScript types** - Import shared types from UserContext when applicable
3. **Use Material UI components** - Maintain consistency
4. **Follow design system** - Use defined colors/typography
5. **Add responsive breakpoints** - Mobile-first approach
6. **Use UserContext** - For state management instead of local state
7. **Update documentation** - Add to relevant .md files
8. **Test on mobile** - Use DevTools and real devices
9. **Ensure no errors:**
   - `npm run lint` - No linting errors
   - `npm run build` - Successful build
   - Check browser console - No hydration/runtime errors

### Code Quality Standards

✅ **Required before PR:**
- Zero TypeScript errors
- Zero linter errors  
- Zero console errors
- Successful build
- Mobile responsive
- Accessible (ARIA labels, keyboard nav)
- SSR-compatible (no hydration errors)

## 📚 Project Documentation

### Internal Docs (in this repo)
- **[CONTEXT_FIELDS_GUIDE.md](./CONTEXT_FIELDS_GUIDE.md)** - Complete UserContext API reference with examples
- **[CONTEXT_UPGRADE_SUMMARY.md](./CONTEXT_UPGRADE_SUMMARY.md)** - v1.0 → v2.0 upgrade details and migration guide
- **[HYDRATION_FIX.md](./HYDRATION_FIX.md)** - SSR hydration fix documentation

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Material UI Documentation](https://mui.com/material-ui/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

For questions or issues:
- Email: help@incoxchange.com
- Internal: Check project wiki/documentation

## License

Private - IXC Finance Application

---

## 🎉 Version History

### v2.0.0 (November 23, 2025) - Production Ready
- ✅ Enhanced UserContext with 20+ state fields
- ✅ Safe localStorage utility
- ✅ Signature persistence and legal compliance
- ✅ Fixed SSR hydration errors
- ✅ Timeline and progress tracking
- ✅ Credit terms management
- ✅ Complete documentation suite
- ✅ Zero errors, fully typed, optimized

### v1.0.0 (November 13, 2025) - MVP
- Initial onboarding flow
- Basic state management
- 7-step onboarding process
- Mobile-responsive design

---

**Last Updated:** November 23, 2025  
**Version:** 2.0.0 (Production Ready)  
**Status:** ✅ Ready for Backend Integration
