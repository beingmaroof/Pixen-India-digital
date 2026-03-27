# Pixen India Digital Website

**Performance-Driven Digital Growth Agency**

## 🚀 Phase 0: Project Setup - COMPLETE

This is the base setup for the Pixen India Digital website following the development plan.

---

## 📋 Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Backend:** Next.js API routes (Phase 5)
- **Database:** Firebase Firestore (Phase 5)
- **Hosting:** Vercel (Phase 8)

---

## 🛠️ Installation Instructions

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required dependencies including:
- Next.js 14.2.3
- React 18.3.1
- Tailwind CSS 3.4.3
- Firebase 10.12.0 (ready for Phase 5)
- TypeScript 5.4.5

### Step 2: Run Development Server

```bash
npm run dev
```

The app will start at: **http://localhost:3000**

### Step 3: Verify Setup

You should see:
- ✅ Homepage with hero section
- ✅ "Turn Attention Into Revenue" headline
- ✅ Two CTA buttons (Book Consultation, View Services)
- ✅ "Website Under Development" notice
- ✅ Responsive design working on mobile and desktop

---

## 📁 Project Structure

```
c:\APP Projects\Pixen India\Pixen website\
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Homepage (Phase 0 base)
├── components/
│   ├── Button.tsx           # Reusable button component
│   ├── Card.tsx             # Reusable card component
│   ├── Footer.tsx           # Footer component
│   ├── Navbar.tsx           # Navigation bar
│   └── Section.tsx          # Section wrapper
├── lib/
│   ├── firebase.ts          # Firebase config (Phase 5)
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript config
├── next.config.js           # Next.js config
└── package.json             # Dependencies
```

---

## 🎨 Design System

### Colors

**Primary (Blue):**
- Used for: Primary CTAs, links, brand elements
- Scale: `primary-50` to `primary-900`

**Accent (Red):**
- Used for: Secondary CTAs, highlights
- Scale: `accent-50` to `accent-900`

### Custom Classes

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.container-custom` - Max-width container (7xl)

---

## 📱 Current Features (Phase 0)

✅ Next.js App Router setup  
✅ Tailwind CSS with custom colors  
✅ Global layout with SEO metadata  
✅ Responsive homepage  
✅ Reusable component structure  
✅ Mobile-first design  

---

## 🎯 Next Phases

### Phase 1: Core Components
Build out the complete UI component library

### Phase 2: Homepage
Create the full conversion-focused homepage with all sections

### Phase 3: Services Page
Build individual service pages with Problem/Solution/Outcome format

### Phase 4: Case Studies
Add trust-building case studies with results

### Phase 5: Contact + Backend
Implement lead capture system with Firebase

### Phase 6: Analytics
Integrate Google Analytics and Meta Pixel

### Phase 7: Optimization
Performance improvements and Lighthouse optimization

### Phase 8: Deployment
Deploy to Vercel and go live

---

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🌐 Target KPIs

- **Conversion Rate:** 8-12%
- **Leads/Month:** 50-150
- **Bounce Rate:** <45%
- **Session Time:** >2.5 min

---

## 📞 Support

For questions or issues during setup, refer to the development plan documentation.

---

**Built with ❤️ for Pixen India Digital**  
*Turning attention into revenue, one phase at a time.*
