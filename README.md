# Bounty Creation Platform 🎯

A stunning, modern multi-step form application for creating bounties with advanced validation, state management, and beautiful responsive design.

## ✨ Features

- **3-Step Form Wizard**: Streamlined process (Brief → Rewards → Backer)
- **Modern UI/UX**: Beautiful gradients, animations, and smooth transitions
- **Real-time Validation**: Field-level validation with clear, helpful error messages
- **State Persistence**: Form data seamlessly persists across all steps
- **Fully Responsive**: Mobile-first design that looks stunning on all devices
- **Dynamic Fields**: Smart conditional fields based on user selections
- **Interactive Map Selector**: Beautiful map interface for physical bounty locations
- **File Upload**: Drag-and-drop logo upload with live preview
- **Interactive Elements**: Animated buttons, toggles, and step indicators
- **Beautiful Results**: Stunning JSON payload display with one-click copy

## Tech Stack

- React 19.2.0
- React Context API for state management
- Custom reusable components
- CSS3 with modern layouts, gradients, and animations

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Button.js
│   ├── Input.js
│   ├── Textarea.js
│   ├── Dropdown.js
│   ├── Toggle.js
│   ├── RadioGroup.js
│   ├── FileUpload.js
│   ├── MapSelector.js   # Interactive map component
│   ├── Sidebar.js
│   └── StepIndicator.js
├── context/           # State management
│   └── BountyContext.js
├── steps/             # Form step components
│   ├── Step1Brief.js
│   ├── Step2Rewards.js
│   └── Step3Backer.js
├── pages/             # Page components
│   ├── BountyForm.js
│   ├── ConfirmationPage.js
│   └── ResultPage.js
├── App.js            # Main application
└── index.js          # Entry point
```

## Form Steps

### Step 1: Brief (Basic Details)
- Bounty Title (required, max 40 chars)
- Bounty Description (required, max 1000 chars)
- Project Selection (required)
- Bounty Type (required): Content, Design, Development, Marketing, Other
- Dominant Impact Core (required): Water, Earth, Social, Energy
- Bounty Mode: Digital or Physical
  - Physical bounties include interactive map selector for precise location
  - Location input with coordinates (latitude/longitude)
  - OpenStreetMap integration for visual location selection

### Step 2: Rewards & Timeline
- Currency Selection: USD, EUR, INR, GBP
- Reward Amount (required, > 0)
- Number of Winners (required, >= 1)
- Expiration Date (required)
- Estimated Completion Time (Days, Hours, Minutes)
- Impact Certificate (optional with brief message)
- SDGs Selection (multi-select, up to 4)

### Step 3: Backer Information
- Has Backer Toggle
- Backer Name (required if has backer)
- Backer Logo Upload (required if has backer)
- Backer Message (optional)
- Terms & Conditions Acceptance (required)

## Validation Rules

- All required fields must be filled
- Title: 1-40 characters
- Amount: Must be greater than 0
- Winners: Must be at least 1
- Location: Required for physical bounties
- Impact Brief: Required if Impact Certificate is enabled
- Backer details: Required if Has Backer is enabled
- Terms: Must be accepted before submission

## Navigation

- **Sidebar**: Click on any completed step to navigate
- **Back Button**: Navigate to previous step
- **Next Button**: Validate and proceed to next step
- **Create Bounty Button**: Submit form (Step 3)

## Payload Format

The application generates a comprehensive JSON payload:

```json
{
  "title": "Bounty Title",
  "description": "Description...",
  "projectTitle": "Project Name",
  "type": "development",
  "dominant_core": "social",
  "mode": "digital",
  "location": "Only if physical",
  "coordinates": {
    "lat": 19.0760,
    "lng": 72.8777
  },
  "reward": {
    "currency": "USD",
    "amount": 500,
    "winners": 1
  },
  "timeline": {
    "expiration_date": "2023-12-31T23:59:59.000Z",
    "estimated_completion": {
      "days": 2,
      "hours": 4,
      "minutes": 0
    }
  },
  "hasImpactCertificate": true,
  "impactBriefMessage": "Message if applicable",
  "sdgs": ["no_poverty", "quality_education"],
  "has_backer": true,
  "backer": {
    "name": "Sponsor Name",
    "logo": "base64 or URL",
    "message": "Optional message"
  },
  "terms_accepted": true
}
```

## 🎨 UI Features

✅ **Gradient Backgrounds**: Beautiful purple-to-pink gradients
✅ **Smooth Animations**: Fade-ins, slide-ups, and hover effects
✅ **Modern Cards**: Elevated cards with shadows and rounded corners
✅ **Interactive Components**: Buttons with ripple effects and icons
✅ **3-Step Indicator**: Visual progress with animated checkmarks
✅ **Sidebar Navigation**: Elegant step tracking with active states
✅ **Form Animations**: Smooth transitions between steps
✅ **Loading States**: Beautiful spinner with pulsing animation
✅ **Success Celebration**: Animated success icon with ripple effect
✅ **Responsive Layout**: Adapts beautifully to mobile, tablet, and desktop
✅ **Modern Color Palette**: Professional blue/purple theme
✅ **Typography**: Clean, readable fonts with proper hierarchy

## ⚙️ Technical Features

✅ Multi-step form with 3 steps (not 6)
✅ Reusable component library (10 components including MapSelector)
✅ Context-based state management
✅ Comprehensive field-level validation
✅ Smart conditional rendering
✅ File upload with live preview
✅ Sidebar navigation with completion tracking
✅ Top progress indicator showing current step
✅ Loading page with progress bar
✅ Result page with formatted JSON display
✅ Copy to clipboard functionality
✅ Mobile-responsive design
✅ Modern UI exceeding Figma expectations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
