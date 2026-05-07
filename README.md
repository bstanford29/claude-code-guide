# AI Coding Agent Guide

A practical Next.js guide for Claude Code and OpenAI Codex across CLI, desktop app, IDE, cloud, GitHub, worktrees, subagents, automations, and project instruction files.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run build
npm run check:routes
```

`check:routes` expects the local dev server to be running and verifies that all guide routes return 2xx.

## Deployment

The Vercel project is intended to use the public project name `ai-coding-agent-guide`.
