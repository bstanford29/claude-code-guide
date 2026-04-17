import { PageHeader } from '@/components/page-header';
import { Callout } from '@/components/callout';

export const metadata = {
  title: 'Tips & mistakes',
  description: 'Common pitfalls — part of the Claude Code Guide.',
};

export default function Page() {
  return (
    <>
      <PageHeader tier="ref" title="Tips & mistakes" subtitle="Common pitfalls" />
      <Callout variant="info" title="Coming soon">
        Content for this page ships in Phase 5. The full sitemap is wired up from day one so the
        sidebar never 404s — navigate freely, fill as we go.
      </Callout>
    </>
  );
}
