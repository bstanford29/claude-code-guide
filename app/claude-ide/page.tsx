import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Callout } from '@/components/callout';
import { CodeBlock } from '@/components/code-block';
import { CompareTable } from '@/components/compare-table';
import { DefinitionBox } from '@/components/definition-box';
import { AppMockup, AppSidebar, AppMain, AppDiff } from '@/components/app-mockup';

export const metadata = {
  title: 'Claude Code IDE setup',
  description: 'Use Claude Code from VS Code, Cursor, Windsurf, VSCodium, and JetBrains IDEs.',
};

export default function ClaudeIdePage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="Claude Code in your IDE"
        subtitle="Keep the editor you already use. Claude can run in the integrated terminal, connect to VS Code-style editors, and use IDE context like selected text, diagnostics, and visual diffs."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The short version
        </h2>
        <CompareTable
          leftHeader="Use this"
          rightHeader="When"
          rows={[
            {
              label: 'Integrated terminal',
              left: <code>claude</code>,
              right: 'You already live in VS Code, Cursor, Windsurf, or VSCodium and want CLI speed with IDE context.',
            },
            {
              label: 'External terminal',
              left: <code>/ide</code>,
              right: 'You launched Claude outside the editor and want to connect it back to VS Code for diffs and diagnostics.',
            },
            {
              label: 'JetBrains',
              left: 'Install the Claude Code plugin',
              right: 'You work in IntelliJ, PyCharm, WebStorm, or another JetBrains IDE.',
            },
          ]}
        />
      </section>

      <section className="mt-12 space-y-5">
        <DefinitionBox
          term="IDE context"
          whatItIs="Information your editor already has: selected text, open files, diagnostics, and where a change should be shown."
          whyItMatters="It lets Claude use the editor as a UI layer instead of forcing every review into a terminal diff."
          example="Select a failing function, ask Claude to explain it, then review the proposed patch in your normal diff viewer."
        />

        <AppMockup caption="Illustrative Claude IDE mockup: selected code, diagnostics, and a visual diff pane" aspect="16/10">
          <AppSidebar
            sections={[
              {
                title: 'Explorer',
                items: [
                  { label: 'app/checkout/page.tsx', active: true, accent: 'var(--tier-a)' },
                  { label: 'lib/payments.ts' },
                  { label: 'components/cart.tsx' },
                ],
              },
              {
                title: 'Problems',
                items: [
                  { label: '2 TypeScript errors', subtle: 'ts' },
                  { label: '1 failing test', subtle: 'vitest' },
                ],
              },
            ]}
          />
          <AppMain>
            <div className="grid grid-cols-2 min-h-0 flex-1">
              <div className="border-r border-[#1a1a1a] p-4 font-[family-name:var(--font-mono)] text-[11px] text-[#888] overflow-hidden">
                <div className="text-[#666] mb-3">app/checkout/page.tsx</div>
                <pre className="leading-6">
{`42  async function submitOrder() {
43    const result = await chargeCart(cart)
44    if (!result.ok) return
45    router.push('/success')
46  }`}
                </pre>
                <div className="mt-4 rounded border border-[color:var(--color-primary)]/30 bg-[color:var(--color-primary)]/5 p-3 text-[#ddd]">
                  Selected text sent to Claude with diagnostics.
                </div>
              </div>
              <AppDiff
                filename="app/checkout/page.tsx"
                oldLines={[
                  { text: 'async function submitOrder() {' },
                  { text: '  const result = await chargeCart(cart)' },
                  { text: '  if (!result.ok) return', changed: true },
                  { text: "  router.push('/success')" },
                  { text: '}' },
                ]}
                newLines={[
                  { text: 'async function submitOrder() {' },
                  { text: '  const result = await chargeCart(cart)' },
                  { text: '  if (!result.ok) {', changed: true },
                  { text: '    setError(result.message)', changed: true },
                  { text: '    return', changed: true },
                  { text: '  }', changed: true },
                  { text: "  router.push('/success')" },
                  { text: '}' },
                ]}
              />
            </div>
          </AppMain>
        </AppMockup>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          VS Code, Cursor, Windsurf, and VSCodium
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          The easiest path is to open the IDE terminal and launch Claude from the project root. In a VS Code-style
          editor, the CLI can connect to editor features like visual diffs and diagnostics.
        </p>
        <CodeBlock title="Run Claude inside the IDE terminal">{`cd ~/your-project
claude`}</CodeBlock>
        <Callout variant="tip" title="External terminal">
          If you already started Claude in a separate terminal, run <code>/ide</code> inside the Claude session to
          connect it back to VS Code.
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          JetBrains IDEs
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          For IntelliJ, PyCharm, WebStorm, and related JetBrains IDEs, use the Claude Code plugin path rather than
          assuming the VS Code integration behavior applies. The workflow is the same idea: let Claude reason over the
          project, then review changes where you already review code.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          What to show colleagues
        </h2>
        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden">
          <DemoRow step="1" action="Select a function" reason="Proves Claude can use editor-local context." />
          <DemoRow step="2" action="Ask for the bug risk" reason="Keeps the first interaction read-only." />
          <DemoRow step="3" action="Ask for a small patch" reason="Shows planning, editing, and permission review." />
          <DemoRow step="4" action="Review the visual diff" reason="Makes app vs CLI vs IDE concrete." />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Related
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/terminal" className="text-[color:var(--color-primary)] hover:underline">
            Terminal tour
          </Link>
          <Link href="/desktop-app" className="text-[#888] hover:text-white">
            Desktop app tour
          </Link>
          <Link href="/ide-setup" className="text-[#888] hover:text-white">
            Compare both IDE setups
          </Link>
        </div>
      </section>
    </>
  );
}

function DemoRow({ step, action, reason }: { step: string; action: string; reason: string }) {
  return (
    <div className="grid grid-cols-[56px_minmax(0,1fr)] md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.2fr)] gap-3 px-4 py-3 border-b border-[var(--color-border)] last:border-b-0 text-sm">
      <div className="font-[family-name:var(--font-mono)] text-[10px] text-[#555] uppercase">Step {step}</div>
      <div className="text-white font-semibold">{action}</div>
      <div className="text-[#888] md:text-right">{reason}</div>
    </div>
  );
}
