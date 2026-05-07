import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Callout } from '@/components/callout';
import { SurfaceMatrix } from '@/components/surface-matrix';
import { ProductBadge } from '@/components/product-badge';

export const metadata = {
  title: 'App vs CLI vs IDE',
  description: 'Compare CLI, desktop app, IDE, and web/cloud coding-agent surfaces across Claude Code and Codex.',
};

export default function AppVsCliPage() {
  return (
    <>
      <PageHeader
        tier="ref"
        title="App vs CLI vs IDE vs cloud"
        subtitle="Claude Code and Codex are not one surface. Pick the interface that matches the risk, review style, and amount of parallel work."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <Callout variant="info" title="Surface model">
          Codex CLI, Codex app, Codex IDE, and Codex web/cloud are separate surfaces. Claude Code is strongest as a
          terminal-first tool with IDE integrations and a desktop app experience. Treat each surface as a different
          operating mode with different review habits.
        </Callout>
      </section>

      <section className="mt-10 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Surface comparison
        </h2>
        <SurfaceMatrix
          columns={[
            { key: 'cli', title: 'CLI', subtitle: 'Claude Code and Codex' },
            { key: 'app', title: 'Desktop app', subtitle: 'Claude Code and Codex' },
            { key: 'ide', title: 'IDE', subtitle: 'Editor-integrated agents' },
            { key: 'cloud', title: 'Web/cloud', subtitle: 'Codex delegated tasks' },
          ]}
          rows={[
            {
              label: 'Best for',
              values: {
                cli: 'Fast local work, repo inspection, scripted commands, and developers who already live in a shell.',
                app: 'Parallel local sessions, visual review, file drag-and-drop, and less terminal-heavy colleagues.',
                ide: 'Staying in the editor while sharing current file, selection, diagnostics, and diffs.',
                cloud: 'Background tasks, PR-style handoff, larger backlog items, and work you can review later.',
              },
            },
            {
              label: 'Setup',
              values: {
                cli: 'Install the CLI, authenticate, open the repo root, and run the tool from that directory.',
                app: 'Install the desktop app, sign in, open a project folder, and review workspace permissions.',
                ide: 'Install or enable the supported extension/plugin, then start from the IDE or connect from a terminal.',
                cloud: 'Connect the repository provider, configure environment setup, and define what tasks can run remotely.',
              },
            },
            {
              label: 'Local commands',
              values: {
                cli: 'Strong. Local commands are the natural workflow, with approvals or sandbox controls depending on tool and mode.',
                app: 'Strong for local projects, with commands mediated through the app session.',
                ide: 'Strong when the extension delegates to the local agent or when you use the IDE terminal fallback.',
                cloud: 'Runs in a configured remote environment, not your laptop. Match setup scripts to the real project.',
              },
            },
            {
              label: 'Cloud/background',
              values: {
                cli: 'Mostly local and interactive. Use it when you want to stay close to the command output.',
                app: 'Good for keeping multiple local agents alive while you switch context.',
                ide: 'Good for paired local work; some Codex IDE workflows can hand off to cloud depending on account and version.',
                cloud: 'The point of the surface: delegate the task, continue working, then review the result.',
              },
            },
            {
              label: 'Visual diffs',
              values: {
                cli: 'Works, but review is terminal-centric unless connected to an IDE diff viewer.',
                app: 'Best for visual thinkers. Use the app when diff review quality matters for non-terminal users.',
                ide: 'Best when you want native editor diff, selection context, and diagnostics in one place.',
                cloud: 'Review is usually branch, task, or PR oriented. Good for evidence, less immediate for tiny edits.',
              },
            },
            {
              label: 'Parallel tasks',
              values: {
                cli: 'Possible with multiple terminals and worktrees, but you manage the coordination.',
                app: 'Strong. Use app sessions when you want several agents visible without terminal juggling.',
                ide: 'Good for one focused editor task; use separate windows or fallback surfaces for parallelism.',
                cloud: 'Strong. This is the natural fit for independent backlog items or review tasks.',
              },
            },
            {
              label: 'Automation',
              values: {
                cli: 'Good for scripts, repeatable commands, and controlled local workflows.',
                app: 'Good when the product exposes saved workflows, skills, or recurring work.',
                ide: 'Good for editor-bound workflows; less ideal for unattended work.',
                cloud: 'Best for scheduled, delegated, or integration-triggered tasks when policy allows it.',
              },
            },
            {
              label: 'Risk',
              values: {
                cli: 'Highest responsibility on the operator. You see everything, but you also approve or run commands directly.',
                app: 'Lower friction can hide complexity. Keep git clean and review each diff before trusting it.',
                ide: 'Context feels precise, but selection context is not a substitute for repo-wide understanding.',
                cloud: 'Highest governance concern. Configure secrets, network, repo access, and review gates deliberately.',
              },
            },
          ]}
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Consultant default
        </h2>
        <div className="grid md:grid-cols-3 gap-3">
          <Mode badge={<ProductBadge product="shared" label="Day 1" />} text="Use CLI for fast local trust-building: read code, run tests, make one scoped edit." />
          <Mode badge={<ProductBadge product="shared" label="Week 2" />} text="Add IDE or app review when visual diffs and parallel sessions save time." />
          <Mode badge={<ProductBadge product="shared" label="Mature" />} text="Use cloud/background only after repo setup, secrets, and review policy are clear." />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <Link
          href="/ide-setup"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          IDE setup for both tools &rarr;
        </Link>
      </section>
    </>
  );
}

function Mode({ badge, text }: { badge: React.ReactNode; text: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5">
      <div className="mb-3">{badge}</div>
      <p className="text-sm text-[#bbb] leading-relaxed">{text}</p>
    </div>
  );
}
