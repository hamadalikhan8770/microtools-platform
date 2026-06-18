# PROJECT_SUMMARY

## Project type

Next.js utility platform with categorized tools, blog content, and AI-assisted writing tools.

## What is verified

- App Router structure is present
- Tool category and detail routing is present
- AI tool pages are present
- Blog pages are present
- `npm install`, `npm run lint`, `npm run type-check`, and `npm run build` all passed during the June 18, 2026 live environment pass
- Local runtime passed on `http://127.0.0.1:3012`
- Route checks passed for `/`, `/tools`, `/tools/health`, `/ai-tools`, and `/ai-tools/resume-generator`
- Real screenshots were captured from the local running app

## What is incomplete or pending

- Live AI API execution is Not verified yet
- No automated test suite is tracked in the repository
- Additional page-level visual verification is still possible

## Screenshot status

Added real screenshots to `docs/images/` for home, tools, health tools, AI tools, and the resume generator page.

## Live credential requirements

The public site can run without secrets. Real values are only needed for:

- `ANTHROPIC_API_KEY` for AI explanation and generation endpoints
- `NEXT_PUBLIC_GA_ID` for production analytics
- `NEXT_PUBLIC_ADSENSE_ID` for production ad slots
