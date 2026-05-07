import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { CodexCliMockup, CodexPrReviewMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'First Codex session',
  description: 'A first Codex walkthrough: inspect, plan, edit, test, and review the diff.',
};

export default function CodexFirstSessionPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="Your first Codex session"
        subtitle="Keep the first task small: read the repo, propose a plan, make one edit, run one check, review the diff."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <CodeBlock title="Copy-paste prompt">{`Read the app routes and explain where the navigation is defined.
Then make one small copy update, run the relevant checks, and show me the diff before I accept it.`}</CodeBlock>
        <CodexCliMockup />
      </section>

      <section className="mt-12">
        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden">
          <Step n="1" title="Read first" body="Ask Codex to summarize the relevant files before editing." />
          <Step n="2" title="Plan next" body="Make it state the files it intends to touch." />
          <Step n="3" title="Edit one thing" body="Start with a low-risk copy or test change." />
          <Step n="4" title="Verify" body="Run lint, build, or the smallest relevant test." />
          <Step n="5" title="Review diff" body="Accept only after you understand the behavior change." />
        </div>
      </section>

      <CodexPrReviewMockup />

      <Callout variant="warn" title="Do not start with a vague big task">
        A first session is not the time for &quot;refactor the app.&quot; Use one route, one component, one test, or one bug.
      </Callout>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <Link href="/codex/agents-md" className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors">
          Add AGENTS.md next &rarr;
        </Link>
      </section>
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-3 px-4 py-3 border-b border-[var(--color-border)] last:border-b-0">
      <div className="font-[family-name:var(--font-mono)] text-[10px] text-[color:var(--color-primary)]">0{n}</div>
      <div>
        <div className="font-semibold text-white text-sm">{title}</div>
        <div className="text-[#888] text-sm leading-relaxed">{body}</div>
      </div>
    </div>
  );
}
