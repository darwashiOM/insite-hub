# InsiteHub Website Editing Rules

This repository is the InsiteHub website. The person using Claude may be non-technical and may ask for copy, layout, styling, or deployment changes.

## Karpathy Coding Guidelines

Apply the globally installed `karpathy-guidelines` skill when writing, reviewing, or refactoring code.

- Think before coding: state assumptions, surface ambiguity, and ask when requirements are unclear.
- Keep solutions simple: write the minimum code that solves the request without speculative abstractions.
- Make surgical changes: touch only files and lines that directly support the task, and clean up only issues introduced by the change.
- Define success criteria: turn implementation work into verifiable checks and loop until those checks pass or a blocker is clear.

## Core Rule

You may make website changes with full editing power, but you must not push to `main` unless the person clearly and explicitly says to push to `main` after they have reviewed a preview link.

## Required Workflow

1. Understand the requested change and inspect the relevant files before editing.
2. Make a focused change on a non-`main` branch whenever possible.
3. Run `npm run build` after changes.
4. Create or provide a preview link before asking for approval to publish.
5. Wait for explicit approval after the preview is reviewed.
6. Only push to `main` if the person clearly says something like:
   - "push to main"
   - "publish this to main"
   - "approved, push to main"
   - "deploy this to production"

If the person says "looks good", "okay", "yes", or "ship it" without clearly mentioning `main` or production, ask a short confirmation before pushing to `main`.

## "Start" Command

If the person says "start", "start please", "get things up", or similar, treat that as an instruction to prepare the editing workspace and preview, not as a request to change production.

When asked to start:

1. Go to the repo:
   ```bash
   cd ~/insite-hub
   ```
2. Check the current branch and working tree:
   ```bash
   git status --short
   git branch --show-current
   ```
3. If the working tree is clean, pull the latest branch:
   ```bash
   git pull
   ```
   If there are local changes, do not overwrite them. Explain that there are existing changes and continue from the current state.
4. Install dependencies if needed:
   ```bash
   npm install
   ```
5. Start or restart the preview server:
   ```bash
   pkill -f "vite --host 0.0.0.0" || true
   npm run dev -- --host 0.0.0.0
   ```
6. Tell the person the preview URL:
   ```text
   http://54.87.37.185:5173/
   ```

If the EC2 instance public IP changes, discover it before giving the preview URL:

```bash
curl -s http://checkip.amazonaws.com
```

Then use:

```text
http://<public-ip>:5173/
```

Do not push to `main` during "start". The purpose of "start" is only to get the workspace and preview ready.

## Preview Requirement

Before any production push:

- A preview link must exist.
- The person must have a chance to review it.
- The final approval must happen after the preview link was provided.

Acceptable preview links include:

- Firebase Hosting preview channel URL.
- GitHub pull request preview URL.
- EC2/Vite preview URL if it is reachable by the reviewer.

## Git Rules

- Never run destructive commands such as `git reset --hard`, `git checkout -- .`, or force-push unless explicitly asked.
- Never discard user changes without asking.
- Prefer feature branches for edits.
- Commit messages should be short and specific.
- If working tree has unrelated changes, leave them alone.

## Deployment Rules

- Production is `main`.
- Preview comes before production.
- Do not deploy production unless explicitly asked after preview review.
- If Firebase/GitHub/AWS credentials are available, use them carefully and never print secrets.

## Secret Handling

Never expose, print, commit, or paste:

- `.env` files
- Firebase service account keys
- AWS credentials
- GitHub tokens
- Sentry auth tokens
- Claude/API keys
- SMTP passwords

Public browser keys such as a Sentry DSN may be present in frontend env configuration, but private auth tokens must stay in secrets.

## Project Notes

- App stack: React + Vite.
- Hosting: Firebase Hosting.
- Forms: Firebase Cloud Functions.
- Monitoring: Sentry frontend monitoring.
- Build command: `npm run build`.
- Main local dev command: `npm run dev -- --host 0.0.0.0`.
