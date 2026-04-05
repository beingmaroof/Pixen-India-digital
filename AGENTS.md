# 🤖 Pixen India Digital - AI Agent Workspace Instructions

> **Performance-driven digital growth agency website** built with Next.js 14, Supabase, and Tailwind CSS.

---

## 🎯 Project Overview

**Purpose**: Marketing & SaaS website for a digital growth agency  
**Status**: Production-ready (Phases 0-7 complete)  
**Deploy Target**: Vercel  
**Database**: Supabase PostgreSQL

### Tech Stack
| Component | Technology | Version |
|-----------|-----------|---------|
| **Frontend** | Next.js (App Router) | 14.2.35 |
| **UI** | React + Tailwind CSS | 18.3.1 / 3.4.3 |
| **State** | Zustand + Context | 5.0.12 |
| **Database** | Supabase | 2.39.0 |
| **Auth** | Supabase Auth | Built-in |
| **Payments** | Razorpay | 2.9.6 |
| **Animations** | Framer Motion | 12.38.0 |
| **Language** | TypeScript | 5.4.5 |

### Key Features
✅ Email/Password + OAuth (Google, Facebook) authentication  
✅ User profiles with extended data  
✅ Razorpay payment processing  
✅ Lead capture with AI scoring  
✅ Protected routes with middleware  
✅ Cross-tab logout synchronization  
✅ Admin dashboard  
✅ Legal pages (Terms, Privacy, etc.)

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Setup environment (.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://fwbiibjuxlmqsbufwelv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-jwt-token>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
NEXT_PUBLIC_RAZORPAY_KEY_ID=<your-razorpay-key>

# Run migrations in Supabase dashboard
# - supabase-migration-leads-table.sql
# - supabase-profile-columns-migration.sql

# Start development
npm run dev  # → http://localhost:3000

# Test environment
npm run test:env
```

---

## 📁 Architecture & Key Directories

### `/app` - Next.js App Router
- `page.tsx` - Homepage with hero, services, testimonials
- `layout.tsx` - Root layout with providers, SEO metadata
- `middleware.ts` - Auth protection for protected routes
- `/api/**` - API endpoints (contact, support, payments)
- `/auth/callback/` - OAuth callback handler
- `/login/`, `/signup/` - Authentication pages
- `/dashboard/`, `/profile/` - User pages (protected)
- `/payment/` - Payment page (protected)
- `/contact/`, `/services/`, `/pricing/` - Marketing pages
- `/admin/` - Admin panel (protected)

### `/components` - UI Components (all "use client")
- **Core**: Button, Card, Badge, Container, Section
- **Navigation**: Navbar, PremiumNavbar, AvatarMenu, ScrollToTop
- **Auth**: AuthInput, AuthButton, SocialLogin
- **Features**: FloatingSocialIcons, WhatsAppButton, ContactForm
- **Advanced**: SlotCounter, ScrollStorySection, CursorFollower
- `index.ts` - **Barrel export** for centralized imports

### `/lib` - Services & Utilities
- `supabase.ts` - Supabase client (public anon key)
- `supabase-admin.ts` - Server-side admin client
- `auth.ts` - **Auth functions** (signUp, signIn, OAuth, reset)
- `security.ts` - CSRF protection, rate limiting, validation
- `sanitizer.ts` - Input sanitization
- `utils.ts` - Helpers (formatCurrency, isValidEmail)

### `/store` - Zustand State
- `leadStore.ts` - Lead form state with localStorage persistence

### `/contexts` - React Context
- `AuthContext.tsx` - Global auth state with session management

---

## 🗄️ Database Schema

### Supabase Tables

**`users`**: User profiles  
- uid (UUID, PK), email (unique), display_name, photo_url
- provider (email/google/facebook), dob, gender, phone
- company, job_title, location
- active_plan, plan_status, role (user/admin)

**`leads`**: Contact form submissions  
- id (UUID), name, email, phone, businessType, budget, message
- status, ai_score (0-100), auto_priority, source
- assignedTo, followedUp, createdAt

**`payments`**: Payment records  
- id (UUID), user_id (FK), razorpay_order_id, razorpay_payment_id
- plan_name, amount, status (completed/pending/failed)

---

## 🔐 Authentication System

### Flow
1. **Sign Up**: Email/password or OAuth (Google, Facebook) → creates user in DB
2. **Sign In**: Email/password or OAuth → checks email provider first
3. **Protected Routes**: Middleware checks auth token → redirects to `/login?redirect=<path>`
4. **Cross-Tab Sync**: BroadcastChannel API syncs logout across tabs

### Key Functions (`lib/auth.ts`)
```typescript
signUp(email, password, name)       // Create account
signIn(email, password)             // Login
logOut()                            // Logout
signInWithGoogle(redirectUrl)       // Google OAuth
signInWithFacebook(redirectUrl)     // Facebook OAuth
getUserData(uid)                    // Fetch profile
updateUserData(uid, data)           // Update profile
```

### Protected Routes (middleware.ts)
Routes: `/dashboard`, `/profile`, `/payment`, `/messages`, `/support`, `/admin`

---

## 🎨 Styling & Design System

### Tailwind Config (`tailwind.config.ts`)
```javascript
colors: {
  primary: { 50: '#eff6ff', ..., 900: '#1e3a8a' }  // Blue
  accent: { 50: '#fef2f2', ..., 900: '#7f1d1d' }   // Red
}
```

### Component Patterns
- **Primary Button**: `bg-gradient-to-r from-primary-600 to-primary-700`
- **Secondary Button**: `bg-gradient-to-r from-accent-600 to-accent-700`
- **Cards**: `rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm`

### Custom Classes (`app/globals.css`)
- `.btn-shine` - Shimmer effect
- `.hover-lift` - Hover animation
- `.glass-effect` - Frosted glass

---

## 🛠️ Development Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run test:env     # Test environment variables

# Test scripts
node test-env.js          # Verify env setup
node test-db.js           # Test DB connection
node test-contact-form.js # Test contact form
```

---

## 🔧 Key Conventions

### File Organization
- Pages: `/route/page.tsx`
- API: `/api/endpoint/route.ts`
- Components: PascalCase (`ContactForm.tsx`)
- Utilities: camelCase (`supabase.ts`)

### Import Pattern
```typescript
import { Button } from '@/components';           // Barrel export
import { useLeadStore } from '@/store/leadStore';
import { supabase } from '@/lib/supabase';
```

### Component Pattern
- **"use client"**: Nearly all components (interactive, hooks, events)
- **Server Components**: Only `layout.tsx`, API routes
- **Props**: Typed interfaces extending HTML attributes

### Security
- CSRF protection: `validateOrigin()` in API routes
- Rate limiting: `isRateLimited()` (in-memory)
- Input sanitization: `sanitize()` from `lib/sanitizer.ts`
- Bot detection: Honeypot fields

---

## ⚠️ Common Pitfalls & Solutions

| Issue | Solution | See Docs |
|-------|----------|----------|
| **"Failed to Fetch" on login** | Check Supabase env vars, CORS | `QUICK_FIX_LOGIN_ERROR.md` |
| **"Table not found"** | Run SQL migrations in Supabase | `SUPABASE_SETUP_GUIDE.md` |
| **TypeScript errors** | Run `npm install` | `TROUBLESHOOTING.md` |
| **Profile not saving** | Check user ID matches, refresh logic | `PROFILE_DATA_PERSISTENCE_FIX.md` |
| **Event handler errors** | Add "use client" directive | `CLIENT_COMPONENT_FIX_COMPLETE.md` |
| **OAuth redirect loop** | Verify callback URL in provider | `AUTHENTICATION_SYSTEM_COMPLETE.md` |

### Rate Limiting
- Contact form: 10 requests/60s per IP → returns 429 + `retryAfter`
- Email provider check: Custom rate limiting (see `lib/security.ts`)

---

## 🚀 API Endpoints

### Key Routes (`/app/api`)
- **`POST /api/contact`** - Lead capture with AI scoring, bot detection
- **`POST /api/support`** - Support ticket submission
- **`GET/POST /api/slots`** - Consultation slot availability
- **`POST /api/razorpay/order`** - Create payment order
- **`POST /api/razorpay/verify`** - Verify payment
- **`POST /api/check-email-provider`** - Check email exists + provider

---

## 📚 Documentation Map

**Quick References:**
- 📖 `README.md` - Overview & tech stack
- 🚀 `QUICKSTART.md` - 3-step setup
- 🛠️ `TROUBLESHOOTING.md` - Common issues

**Feature Docs:**
- 🔐 `AUTHENTICATION_SYSTEM_COMPLETE.md` - Auth system
- 🗄️ `SUPABASE_SETUP_GUIDE.md` - Database setup
- 💬 `WHATSAPP_INTEGRATION.md` - WhatsApp button

**Status Logs:**
- ✅ `COMPLETE_PROJECT_STATUS.md` - Full project status
- ✅ `PHASE{0-7}_COMPLETE.md` - Phase-by-phase completion

---

## 🎯 Design Patterns

1. **Barrel Exports**: Central `components/index.ts`
2. **Context + Zustand**: Split state (global auth vs form-specific)
3. **API Routes as Backend**: No separate server
4. **Middleware Protection**: Auth before component render
5. **Error Boundaries**: Graceful error handling
6. **Dynamic Imports**: Code splitting for performance

---

## 🔍 Most Important Files

| File | Purpose | Priority |
|------|---------|----------|
| `app/layout.tsx` | Root layout + providers | ⭐⭐⭐ |
| `lib/auth.ts` | Auth logic | ⭐⭐⭐ |
| `contexts/AuthContext.tsx` | Auth state | ⭐⭐⭐ |
| `lib/supabase.ts` | DB connection | ⭐⭐⭐ |
| `middleware.ts` | Route protection | ⭐⭐⭐ |
| `store/leadStore.ts` | Form persistence | ⭐⭐ |
| `app/api/contact/route.ts` | Lead API | ⭐⭐ |
| `lib/security.ts` | CSRF + rate limit | ⭐⭐ |

---

<!-- VERCEL BEST PRACTICES START -->
## 🌐 Vercel Deployment Best Practices

These guidelines are optimized for AI agents and developers deploying to Vercel:

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS), use Blob/marketplace integrations
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't use Vercel KV/Postgres (discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; never in git or `NEXT_PUBLIC_*`
- Provision integrations with `vercel integration add` (CI-friendly)
- Sync env + settings: `vercel env pull` / `vercel pull`
- Use `waitUntil` for post-response work; avoid deprecated Function `context`
- Set Function regions near data source; avoid cross-region DB calls
- Tune Fluid Compute (maxDuration, memory/CPU) for long I/O calls (LLMs, APIs)
- Use Runtime Cache for regional caching + tag invalidation
- Use Cron Jobs for schedules (UTC, triggers production URL via GET)
- Use Vercel Blob for uploads/media; Edge Config for global config
- Enable Deployment Protection with bypass secret for direct access
- Add OpenTelemetry via `@vercel/otel` on Node (not Edge runtime)
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing with `AI_GATEWAY_API_KEY`
- For durable agent loops: use Workflow (pause/resume/state) + Sandbox
<!-- VERCEL BEST PRACTICES END -->

---

## 📋 Pre-Deployment Checklist

- [ ] All env vars configured in Vercel dashboard
- [ ] Supabase tables created (users, leads, payments)
- [ ] Razorpay keys valid (test → production)
- [ ] OAuth redirect URLs updated (Google, Facebook)
- [ ] Analytics verified (GA, Meta Pixel)
- [ ] Contact form tested end-to-end
- [ ] Payment flow tested
- [ ] Auth flows tested (email + social)
- [ ] Performance checked (Lighthouse)

---

## 🤖 Recommended First Tasks for AI Agents

1. ✅ Explore the codebase structure
2. ✅ Read key files: `app/layout.tsx`, `lib/auth.ts`, `contexts/AuthContext.tsx`
3. ✅ Test setup: `npm run test:env`
4. ✅ Try auth flow: Test `/login` and `/signup`
5. ✅ Review API: Check `/api/contact` patterns
6. ✅ Verify Supabase tables exist
7. ✅ Review `TROUBLESHOOTING.md` for context

---

**Built with ❤️ for Pixen India Digital**  
*Turning attention into revenue, one phase at a time.*
