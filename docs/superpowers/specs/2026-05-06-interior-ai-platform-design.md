# Interior AI Platform Design

## Goal
Build a working Next.js App Router MVP for an interior solo operator with customer management, partner management, AI estimate/proposal/SNS generation, Supabase persistence, and a professional operations UI.

## Architecture
The app uses route-level pages under `app/` with interactive client pages for forms and operational workflows. Supabase browser access is limited to anon-key CRUD for MVP tables, while Claude generation and service-role writes stay inside server route handlers.

## UI Direction
The interface should feel like a compact professional SaaS dashboard: dark neutral surfaces, restrained accent colors per workflow, clear form hierarchy, scannable cards/tables, empty states, loading states, and action buttons with lucide icons. The first screen is the working dashboard, not a marketing landing page.

## Data Flow
Customers and partners load from Supabase on page mount and create records directly through the browser client. AI pages submit prompts to `/api/ai/*`, server routes call Claude, persist generated content through Supabase service role when configured, and return the generated text plus save status to the UI. Dashboard stats use Supabase count queries.

## Environment Handling
The app must build without real keys. Runtime features that require Supabase or Anthropic should show helpful Korean error messages when environment variables are missing. API keys must never be hardcoded or exposed beyond the required public Supabase anon values.

## Verification
Run `npm install`, `npm run build`, start the dev server, and verify the six primary routes render. Real AI/Supabase write verification requires the four environment values from the user.
