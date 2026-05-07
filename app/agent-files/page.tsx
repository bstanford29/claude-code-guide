import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Callout } from '@/components/callout';
import { CodeBlock } from '@/components/code-block';
import { SurfaceMatrix } from '@/components/surface-matrix';
import { AgentsMdPreview } from '@/components/codex-mockups';

export const metadata = {
  title: 'Agent files',
  description: 'Compare CLAUDE.md, AGENTS.md, global settings, private notes, and how much instruction is too much.',
};

export default function AgentFilesPage() {
  return (
    <>
      <PageHeader
        tier="ref"
        title="Agent files"
        subtitle="Persistent instructions are leverage. They are also easy to overfit. Keep the shared layer short, factual, and testable."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <Callout variant="info" title="Shared mental model">
          <code>CLAUDE.md</code> is the Claude Code project instruction file. <code>AGENTS.md</code> is the common
          Codex project guidance file, and Codex loads layered guidance from global, repo, and nested project files.
          Both should tell the agent how to work in this repo, not try to script every possible conversation.
        </Callout>
        <AgentsMdPreview />
      </section>

      <section className="mt-10 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          What belongs where
        </h2>
        <SurfaceMatrix
          columns={[
            { key: 'purpose', title: 'Purpose' },
            { key: 'share', title: 'Share it?' },
            { key: 'example', title: 'Good content' },
          ]}
          rows={[
            {
              label: 'CLAUDE.md',
              values: {
                purpose: 'Project instructions Claude Code should load at session start.',
                share: 'Usually yes. Commit it when the guidance is true for the team.',
                example: 'Stack, commands, test expectations, repo structure, risky files, and review policy.',
              },
            },
            {
              label: 'AGENTS.md',
              values: {
                purpose: 'Project guidance for Codex. Codex can layer global, repo-root, and nested AGENTS.md files.',
                share: 'Usually yes. Put repo-wide instructions at the root and folder-specific notes near the folder.',
                example: 'How to set up the repo, which commands verify work, code style, and directory-specific cautions.',
              },
            },
            {
              label: 'User/global settings',
              values: {
                purpose: 'Personal defaults that should follow you across projects.',
                share: 'No. Keep them in your user-level config or global instruction file.',
                example: 'Preferred answer style, personal approval habits, default model or sandbox settings where supported.',
              },
            },
            {
              label: 'Project/private notes',
              values: {
                purpose: 'Local reminders that are useful to you but wrong or noisy for the whole team.',
                share: 'No. Gitignore them unless the team explicitly agrees.',
                example: 'Client-specific context, local environment quirks, temporary handoff notes, or personal TODOs.',
              },
            },
            {
              label: 'Reference docs',
              values: {
                purpose: 'Longer material the agent should read only when relevant.',
                share: 'Usually yes if the doc explains project behavior.',
                example: 'Architecture notes, deployment runbooks, API contracts, domain glossary, migration history.',
              },
            },
          ]}
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          A small shared starter
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Keep the first version boring. Add only instructions that prevent real mistakes or save repeated explanation.
        </p>
        <CodeBlock title="CLAUDE.md or AGENTS.md starter">{`# Project Instructions

## Stack
- Next.js, React, TypeScript
- Run package commands with npm

## Commands
- Lint: npm run lint
- Build: npm run build

## Working rules
- Read files before editing them.
- Keep changes scoped to the user request.
- Do not modify generated files unless the task explicitly requires it.
- Report commands run and any checks that could not be run.

## Project notes
- Shared components live in components/.
- Routes live in app/.
- Prefer existing component patterns before adding new abstractions.`}</CodeBlock>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Layering pattern
        </h2>
        <div className="grid gap-3">
          <Layer
            name="Global"
            path="~/.codex/AGENTS.md or user-level Claude settings"
            body="Use for personal defaults that are true in every repo. Keep it short because it follows you everywhere."
          />
          <Layer
            name="Project root"
            path="./AGENTS.md and ./CLAUDE.md"
            body="Use for team-wide repo facts: commands, architecture, constraints, and verification expectations."
          />
          <Layer
            name="Nested folder"
            path="./app/admin/AGENTS.md or a referenced project doc"
            body="Use only when a subtree has special rules. For example: do not edit migrations by hand, or this package uses a different test command."
          />
          <Layer
            name="Private"
            path="gitignored local notes"
            body="Use for personal context, client-sensitive reminders, and temporary handoffs that should not become team policy."
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Avoid overfitting instruction files
        </h2>
        <Callout variant="warn" title="Instruction files are not source code">
          Do not write a giant policy file for every failure you have ever seen. Long, brittle instructions compete
          with the actual task and can make the agent follow stale process over current evidence.
        </Callout>
        <div className="grid md:grid-cols-2 gap-3">
          <Rule title="Keep" body="Commands, constraints, ownership boundaries, naming conventions, verification steps, and links to durable docs." />
          <Rule title="Remove" body="One-off complaints, emotional wording, duplicated rules, model-specific hacks, and instructions that contradict the repo." />
          <Rule title="Extract" body="Long architecture explanations, playbooks, and domain background. Link them as reference docs instead of loading all of it every time." />
          <Rule title="Review monthly" body="If a rule no longer prevents a real mistake, delete it. Smaller instruction files usually perform better." />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <Link
          href="/resources"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Resources and docs &rarr;
        </Link>
      </section>
    </>
  );
}

function Layer({ name, path, body }: { name: string; path: string; body: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5">
      <div className="font-[family-name:var(--font-display)] font-bold text-white">{name}</div>
      <code className="mt-2 inline-block text-[color:var(--color-primary)] bg-[#161616] px-2 py-1 rounded text-xs">
        {path}
      </code>
      <p className="mt-3 text-sm text-[#bbb] leading-relaxed">{body}</p>
    </div>
  );
}

function Rule({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5">
      <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-white">{title}</h3>
      <p className="mt-2 text-sm text-[#bbb] leading-relaxed">{body}</p>
    </div>
  );
}
