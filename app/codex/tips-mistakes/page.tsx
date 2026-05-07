import { PageHeader } from '@/components/page-header';
import { MistakeCard } from '@/components/mistake-card';
import { TipCard } from '@/components/tip-card';

export const metadata = {
  title: 'Codex tips and mistakes',
  description: 'Codex-specific habits and mistakes to avoid.',
};

export default function CodexTipsMistakesPage() {
  return (
    <>
      <PageHeader
        tier="ref"
        title="Codex tips and mistakes"
        subtitle="The patterns that keep Codex useful instead of noisy."
        lastValidated="2026-05-07"
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <TipCard title="Start read-only when learning a repo">Ask Codex to explain structure and commands before edits.</TipCard>
        <TipCard title="Make cloud tasks PR-shaped">A good cloud task has repo, setup, scope, and review expectations.</TipCard>
        <TipCard title="Use app worktrees for parallel edits">Separate working copies prevent accidental cross-task collisions.</TipCard>
        <TipCard title="Keep AGENTS.md short">Commands and working rules beat philosophical walls of text.</TipCard>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3">
        <MistakeCard
          dont="Treating CLI, app, IDE, and cloud as interchangeable."
          doThis="Pick the surface based on the task: shell, visual review, editor context, or background delegation."
        />
        <MistakeCard
          dont="Scheduling an automation before testing the prompt manually."
          doThis="Run the exact prompt once, inspect output, then schedule it with constrained permissions."
        />
        <MistakeCard
          dont="Letting cloud tasks depend on undocumented local setup."
          doThis="Document setup commands and environment assumptions first."
        />
        <MistakeCard
          dont="Skipping diff review because Codex ran checks."
          doThis="Treat tests as evidence, not approval. Read the behavior change before merging."
        />
      </section>
    </>
  );
}
