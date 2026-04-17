import { PageHeader } from '@/components/page-header';
import { Callout } from '@/components/callout';

export const metadata = {
  title: 'Hooks',
  description: 'Deterministic automation — part of the Claude Code Guide.',
};

export default function Page() {
  return (
    <>
      <PageHeader tier="C" title="Hooks" subtitle="Deterministic automation" />
      <Callout variant="info" title="Coming soon">
        Content for this page ships in Phase 4. The full sitemap is wired up from day one so the
        sidebar never 404s — navigate freely, fill as we go.
      </Callout>
    </>
  );
}
