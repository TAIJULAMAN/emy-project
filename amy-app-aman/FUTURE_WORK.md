# Future Work: Next.js & Tailwind Migration

This document outlines the planned future architecture and steps required to convert the current static HTML and custom-generator project into a modern, structured Next.js application using Tailwind CSS for styling and mocked demo data.

## Project Restructuring Goals
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Modern, premium, responsive design)
- **Language:** TypeScript
- **Backend:** Replace current Firebase backend with mocked JSON data and simulated API services to make the frontend fully functional as a demo.

---

## Categorized Page Structure

The new Next.js application will follow this route structure, organized by user type:

### 1. Web Landings & Public Pages
*These pages will be accessible without authentication and will use a shared public layout (navbar, footer).*
- `/` - Main Home/Landing Page
- `/about` - About EMY
- `/business` - Information for Businesses (Marketing)
- `/contact` - Contact Page
- `/faqs` - Frequently Asked Questions
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service
- `/ask-emy` - Main Ask EMY interface
- `/ask-emy/results` - Results page for Ask EMY

### 2. Authentication
- `/auth/signin` - Sign In
- `/auth/signup` - Sign Up
- `/auth/forgot-password` - Forgot Password
- `/auth/confirmation` - Account Confirmation

### 3. Customer User Dashboard
*Protected by a mock authentication guard. Uses a customer-specific dashboard layout (sidebar/bottom nav).*
- `/customer/home` - Main feed (with sub-views/tabs for Nearby, Feeds, Reels, Uploads)
- `/customer/search` - Customer Search interface
- `/customer/profile` - Customer Personal Profile
- `/customer/chat` - Messaging interface
- `/customer/settings/notifications` - Notification Preferences

### 4. Business User Dashboard
*Uses a business-specific layout tailored for management.*
- `/business-dashboard` - Business Profile and Management Dashboard

### 5. Admin Console
- `/admin` - Admin Backend (Mocked data management and analytics)

---

## Proposed Implementation Steps

### Phase 1: Initialization & Setup
1. Initialize Next.js with App Router, TypeScript, Tailwind CSS, and ESLint in a new subdirectory (e.g., `emy-next`) to preserve the legacy generator for reference.
2. Set up the `tailwind.config.ts` with brand colors and premium styling utilities.
3. Configure project aliases (e.g., `@/components`, `@/lib`).

### Phase 2: Mock Data & Services Layer
1. Create a `lib/mockData.ts` file containing static JSON arrays for feeds, users, business profiles, and chat messages.
2. Create mock service functions (e.g., `getFeeds()`, `getUserProfile()`, `login()`) that return promises with this demo data to simulate network latency.

### Phase 3: Core Layouts & Shared Components
1. Build the **Public Layout** (Navbar with auth links, Footer).
2. Build the **Customer Dashboard Layout** (Sidebar/Bottom navigation, User avatar menu).
3. Build the **Business/Admin Layout**.
4. Create reusable UI components (Buttons, Inputs, Cards, Modals, Feed Items) using Tailwind.

### Phase 4: Page Migration
1. **Public Pages:** Migrate `/`, `/about`, `/business`, `/contact`, `/ask-emy`.
2. **Auth Pages:** Build visually rich login/signup screens.
3. **Customer Pages:** Implement the complex `/customer/home` with interactive feed tabs using the mock data services.
4. **Business & Admin Pages:** Implement the management dashboards.
