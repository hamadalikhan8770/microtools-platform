# TESTING_GUIDE

## Verified commands

```powershell
npm install
Copy-Item .env.example .env.local
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

- The build completed successfully
- Screenshot capture used the real running app on `127.0.0.1:3002`
- AI-backed API behavior with live credentials is Not verified yet
