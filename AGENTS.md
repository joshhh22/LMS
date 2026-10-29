# AI Coding Guide — EduFlow

Before coding:
1. Read `README.md` and the relevant files under `docs/`.
2. Follow the agreed stack and role model.
3. Do not invent unresolved academic rules; consult `docs/OPEN_QUESTIONS.md`.
4. Build one vertical slice at a time: schema/migration, server validation, RLS, UI, tests.

Hard rules:
- Admin has full application permissions across all modules.
- Teacher permissions are limited to assigned classes.
- Student permissions are limited to enrolled classes and their own records.
- Enforce authorization on the server and in Supabase RLS.
- Never expose service-role or AI provider secrets to the browser.
- Never expose quiz answer keys before policy allows it.
- XP must be server-validated and idempotent.
- Every data page needs loading, empty, error, and unauthorized states.
- Do not leave primary buttons inert or use fake data without labeling it.
- Do not claim a feature is complete until the backend and permission checks work.

For each implementation task:
1. State the files to be changed.
2. Implement the smallest coherent feature.
3. Add/update migrations where necessary.
4. Add tests for permissions and business rules.
5. Summarize changes and list any remaining risks.
