# TESTING_GUIDE

## Verified commands

```powershell
npm install
Copy-Item .env.example .env.local
npm run lint
npm run type-check
npm run build
npm run start -- --hostname 127.0.0.1 --port 3002
```

## Routes checked

- `/`
- `/tools`
- `/tools/health`
- `/ai-tools`
- `/ai-tools/resume-generator`

## Notes

- `npm run lint`, `npm run type-check`, and `npm run build` all completed successfully during the June 18, 2026 live environment pass
- Screenshot capture used the real running app on `127.0.0.1:3002`
- Live environment variables needed for the AI explanation path:
  - `ANTHROPIC_API_KEY`
- Analytics and ads need production IDs to behave as deployed:
  - `NEXT_PUBLIC_GA_ID`
  - `NEXT_PUBLIC_ADSENSE_ID`
- AI-backed API behavior with live credentials is Not verified yet
