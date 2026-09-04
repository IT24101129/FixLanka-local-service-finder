# AI Prompt Log — FixLanka Project

This log records the prompts, AI tools, generated outputs, and human verification steps performed during the SEF Mini Hackathon development of FixLanka.

---

## Log Entry 1: Project Architecture & Setup Prompt

- **Tool Name**: Antigravity AI Coding Assistant / Gemini 3.6 Flash (High)
- **Prompt Used**: SEF Mini Hackathon Master Implementation Prompt for FixLanka (Local Service Finder & Request System)
- **Purpose**: Establish project directory structure (`frontend/` and `backend/`), set up dependencies, design schemas, and build end-to-end CRUD application with Smart Match logic.
- **Result**: Top-level directory structured; MongoDB schemas defined; Express routes and controllers generated; React components, pages, validation, and transparent Smart Match utility created.
- **Human Verification & Modification**: Code reviewed for simplicity, correct Sri Lankan region presets (Kandy, Colombo, Peradeniya, Katugastota, Kundasale, Matale, Kurunegala, Gampola), zero external API reliance, and zero forbidden packages (no Firebase, no Supabase, no auth).

---

## Log Entry 2: Smart Match Recommendation Logic

- **Tool Name**: Antigravity AI Coding Assistant
- **Prompt Used**: Implement transparent rule-based algorithm for Smart Match (Service 40%, Location 30%, Availability 20%, Rating 10%).
- **Purpose**: Calculate match score (0-100%) between customer search criteria/request requirements and provider profiles.
- **Result**: Created `frontend/src/utils/matching.js` with weighted scoring and breakdown descriptions ("Excellent Match", "Good Match", "Possible Match").
- **Human Verification & Modification**: Verified algorithm uses deterministic pure functions without complex machine learning overhead.

---

## Log Entry 3: Sri Lankan Phone & Date Form Validation

- **Tool Name**: Antigravity AI Coding Assistant
- **Prompt Used**: Build client and server side validation for Sri Lanka contact numbers, problem description, and booking date.
- **Purpose**: Ensure contact numbers follow valid Sri Lankan phone patterns (e.g. `0712345678`, `+94771234567`) and prevent past-date service bookings.
- **Result**: `frontend/src/utils/validation.js` and Express backend middleware validation.
- **Human Verification & Modification**: Tested invalid formats and confirmed clear error messages display beside input fields.
