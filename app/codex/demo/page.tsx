import { PageHeader } from '@/components/page-header';
import { DemoStep } from '@/components/demo-step';
import { CodexCliMockup, CodexCloudTaskMockup, CodexIdeMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'Codex live demo',
  description: 'A 30-minute Codex live demo script.',
};

export default function CodexDemoPage() {
  return (
    <>
      <PageHeader
        tier="ref"
        title="Codex live demo"
        subtitle="A 30-minute script: CLI first, IDE second, cloud concept last."
        lastValidated="2026-05-07"
      />

      <DemoStep
        step={1}
        timing="0-5 min"
        title="Launch the CLI"
        prompt="codex"
        expected="Codex opens in the project and can summarize the repo before editing."
      />
      <CodexCliMockup />

      <DemoStep
        step={2}
        timing="5-15 min"
        title="Make one small local change"
        prompt="Read the navigation files, suggest one copy improvement, run checks, and show me the diff."
        expected="A narrow patch with a visible verification command."
      />

      <DemoStep
        step={3}
        timing="15-22 min"
        title="Show IDE context"
        prompt="Select a component and ask Codex what bug risks it sees."
        expected="Codex uses editor context without a broad repo scan."
      />
      <CodexIdeMockup />

      <DemoStep
        step={4}
        timing="22-30 min"
        title="Explain cloud delegation"
        prompt="@codex investigate why this test flakes and propose a PR."
        expected="A background task should have repo, setup, scope, and review expectation."
      />
      <CodexCloudTaskMockup />
    </>
  );
}
