import { PageHeader } from '@/components/page-header';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';

export const metadata = {
  title: 'Codex computer use',
  description: 'Use Codex browser and computer use carefully for UI workflows.',
};

export default function CodexComputerUsePage() {
  return (
    <>
      <PageHeader
        tier="C"
        title="Browser and computer use"
        subtitle="Use GUI control for QA and local workflows when code inspection alone is not enough."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <CompareTable
          leftHeader="Use it for"
          rightHeader="Avoid it for"
          rows={[
            {
              label: 'In-app browser',
              left: 'Local dev server previews, public pages, unauthenticated flows.',
              right: 'Testing real login state, cookies, or browser extensions.',
            },
            {
              label: 'Computer use',
              left: 'Native app steps and GUI-only verification.',
              right: 'Anything faster or safer through code, tests, or browser automation.',
            },
            {
              label: 'QA',
              left: 'Click through a changed workflow after tests pass.',
              right: 'Replacing test coverage with screenshots.',
            },
          ]}
        />
        <Callout variant="warn" title="Availability is volatile">
          Official docs include platform and regional caveats for computer use. Verify current availability before
          teaching this as a standard team workflow.
        </Callout>
      </section>
    </>
  );
}
