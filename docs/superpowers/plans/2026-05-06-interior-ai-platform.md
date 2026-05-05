# Interior AI Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the provided design files into a working Next.js MVP with Supabase CRUD, Claude API routes, polished operational UI, local verification, and deploy readiness.

**Architecture:** Use the provided generated pages as a base, then place them into the App Router structure and harden environment handling. Browser pages use the public Supabase client for customer and partner CRUD; AI route handlers use server-only Claude and Supabase service clients.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Supabase JS, Anthropic SDK, lucide-react.

---

### Task 1: App Structure

**Files:**
- Create/modify: `app/layout.tsx`
- Create/modify: `app/page.tsx`
- Create/modify: `app/globals.css`
- Create/modify: `components/features/Sidebar.tsx`
- Create/modify: `lib/types.ts`

- [x] Move provided root files into the required Next.js folder structure.
- [x] Keep root redirect to `/dashboard`.
- [x] Keep sidebar navigation across the app shell.

### Task 2: Runtime Clients

**Files:**
- Modify: `lib/supabase.ts`
- Modify: `lib/claude.ts`

- [ ] Replace module-scope client initialization with lazy getters.
- [ ] Return explicit Korean errors when required environment variables are missing.
- [ ] Keep service-role Supabase access server-only.

### Task 3: Supabase CRUD

**Files:**
- Modify: `app/customers/page.tsx`
- Modify: `app/partners/page.tsx`
- Modify: `app/dashboard/page.tsx`

- [ ] Load customers and partners from Supabase.
- [ ] Insert new customer and partner rows into Supabase.
- [ ] Show loading, empty, and error states.
- [ ] Replace dashboard placeholder stats with count queries.

### Task 4: AI Generation And Persistence

**Files:**
- Modify: `app/api/ai/estimate/route.ts`
- Modify: `app/api/ai/proposal/route.ts`
- Modify: `app/api/ai/sns/route.ts`
- Modify: `app/estimate/page.tsx`
- Modify: `app/proposal/page.tsx`
- Modify: `app/sns/page.tsx`

- [ ] Generate content through Claude route handlers.
- [ ] Save AI outputs into `estimates`, `proposals`, and `sns_contents` when Supabase service credentials are present.
- [ ] Return save status to the client.
- [ ] Display generation errors and save warnings clearly.

### Task 5: Verification And Deployment Prep

**Files:**
- Modify: `.gitignore`
- Modify: `.env.local.example`
- Create: `.env.local`

- [ ] Ensure sensitive env files are ignored.
- [ ] Install dependencies.
- [ ] Run production build.
- [ ] Start dev server and verify pages render.
- [ ] Request real keys before live Supabase/Claude verification.
- [ ] Initialize Git and connect the GitHub remote.
