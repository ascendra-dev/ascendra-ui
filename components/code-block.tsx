'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/ascendra-ui/shadcn';
import { LuCopy, LuCheck } from 'react-icons/lu';

type Props = {
  code: string;
  lang?: string;
  label?: string;
  className?: string;
};

type HL = { codeToHtml: (code: string, opts: { lang: string; theme: string }) => string };

let _hl: HL | null = null;
let _hlPromise: Promise<HL> | null = null;

function getHighlighter(): Promise<HL> {
  if (_hl) return Promise.resolve(_hl);
  if (!_hlPromise) {
    _hlPromise = import('shiki')
      .then(({ createHighlighter }) =>
        createHighlighter({ themes: ['github-dark-dimmed'], langs: ['tsx', 'typescript', 'jsx', 'javascript', 'bash'] })
      )
      .then((h) => {
        _hl = h as unknown as HL;
        return _hl;
      });
  }
  return _hlPromise;
}

export function CodeBlock({ code, lang = 'tsx', label, className }: Props) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState('');

  useEffect(() => {
    let active = true;
    getHighlighter().then((h) => {
      if (!active) return;
      setHtml(h.codeToHtml(code, { lang, theme: 'github-dark-dimmed' }));
    });
    return () => {
      active = false;
    };
  }, [code, lang]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={cn('group relative', className)}>
      {label && (
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</p>
      )}
      <div className="relative rounded-b-lg overflow-hidden bg-[oklch(0.14_0.01_286)] border border-white/6">
        <button
          onClick={handleCopy}
          title="Copy code"
          className="absolute top-3 right-3 z-10 flex h-6 w-6 items-center justify-center rounded-md bg-white/8 text-white/50 transition-all hover:bg-white/14 hover:text-white/80 opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <LuCheck className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <LuCopy className="h-3.5 w-3.5" />
          )}
        </button>
        {html ? (
          <div
            className="overflow-x-auto text-[0.8125rem] leading-relaxed [&_pre]:bg-transparent! [&_pre]:p-4 [&_pre]:font-mono scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="overflow-x-auto p-4 text-[0.8125rem] leading-relaxed font-mono text-white/80 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
