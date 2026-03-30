"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";

/* ─── TYPES ─────────────────────────────────────────────────── */

interface Conversation {
  id: string;
  title: string | null;
  created_at: string;
  starred?: boolean;
}

interface Source {
  url: string;
  title: string;
  favicon: string;
}

interface Message {
  role: "user" | "assistant";
  message: string;
  sources?: Source[];
  _id?: string;
}

type Theme = "dark" | "light" | "system";
type FontSize = "compact" | "default" | "relaxed";

interface Settings {
  theme: Theme;
  fontSize: FontSize;
  showWebSearch: boolean;
  showSources: boolean;
}

/* ─── CONSTANTS ──────────────────────────────────────────────── */

const SEARCH_TRIGGERS = ["google", "search", "latest", "news", "find"];

const WELCOME_CHIPS = [
  { icon: "💻", label: "Code" },
  { icon: "📚", label: "Learn" },
  { icon: "📊", label: "Strategize" },
  { icon: "✍️", label: "Write" },
  { icon: "🌐", label: "Research" },
];

const FONT_SIZE_MAP: Record<FontSize, number> = {
  compact: 13.5,
  default: 14.5,
  relaxed: 16,
};

const DEFAULT_SETTINGS: Settings = {
  theme: "dark",
  fontSize: "default",
  showWebSearch: true,
  showSources: true,
};

const SIDEBAR_WIDTH = 256;

/* ─── THEME TOKENS ───────────────────────────────────────────── */

const DARK_THEME = `
  --bg-base:#09090b;--bg-sidebar:#0d0d0f;--bg-surface:#111114;
  --bg-elevated:#18181b;--bg-hover:#1c1c20;--bg-active:#232328;
  --bg-overlay:rgba(0,0,0,0.7);--border:rgba(255,255,255,0.06);
  --border-strong:rgba(255,255,255,0.10);--text-primary:#f0f0f2;
  --text-secondary:#a0a0ab;--text-muted:#52525b;
  --user-bubble:#1e2330;--code-bg:#0d0d0f;
  --scrollbar:#27272a;--scrollbar-hover:#3f3f46;
  --settings-bg:#0f0f12;--settings-section:#16161a;
`;

const LIGHT_THEME = `
  --bg-base:#fafafa;--bg-sidebar:#f4f4f5;--bg-surface:#ffffff;
  --bg-elevated:#f0f0f2;--bg-hover:#e8e8ec;--bg-active:#e0e0e6;
  --bg-overlay:rgba(0,0,0,0.35);--border:rgba(0,0,0,0.07);
  --border-strong:rgba(0,0,0,0.12);--text-primary:#0f0f11;
  --text-secondary:#4a4a5a;--text-muted:#9090a0;
  --user-bubble:#e8edf8;--code-bg:#f0f0f4;
  --scrollbar:#d4d4d8;--scrollbar-hover:#a1a1aa;
  --settings-bg:#f4f4f7;--settings-section:#ffffff;
`;

/* ─── GLOBAL STYLES ──────────────────────────────────────────── */

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    ${DARK_THEME}
    --accent:#22d3ee;--accent-dim:rgba(34,211,238,0.12);
    --accent-glow:rgba(34,211,238,0.25);
    --font-sans:'DM Sans',ui-sans-serif,system-ui,sans-serif;
    --font-mono:'DM Mono','Cascadia Code','Fira Code',monospace;
    --radius-sm:8px;--radius-md:14px;--radius-lg:20px;--radius-xl:28px;
    --sidebar-w:${SIDEBAR_WIDTH}px;
  }

  body { font-family:var(--font-sans); -webkit-font-smoothing:antialiased; }

  ::-webkit-scrollbar { width:4px; height:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:var(--scrollbar); border-radius:4px; }
  ::-webkit-scrollbar-thumb:hover { background:var(--scrollbar-hover); }

  .no-overscroll { overscroll-behavior: none; }

  .sidebar-list {
    mask-image: linear-gradient(to bottom, transparent 0%, black 32px, black calc(100% - 32px), transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 32px, black calc(100% - 32px), transparent 100%);
  }

  .input-shell:focus-within {
    border-color:rgba(34,211,238,0.35) !important;
    box-shadow:0 0 0 3px rgba(34,211,238,0.07),0 8px 40px rgba(0,0,0,0.5) !important;
  }

  .ai-textarea::placeholder { color:var(--text-muted); transition:color 0.2s; }
  .ai-textarea:focus::placeholder { color:var(--text-secondary); }

  @keyframes pulse-dot {
    0%,80%,100% { transform:scale(0.7); opacity:0.4; }
    40% { transform:scale(1); opacity:1; }
  }
  @keyframes msg-in {
    from { opacity:0; transform:translateY(10px); }
    to { opacity:1; transform:translateY(0); }
  }
  .msg-animate { animation:msg-in 0.28s ease forwards; }

  @keyframes menu-in {
    from { opacity:0; transform:scale(0.96) translateY(-4px); }
    to { opacity:1; transform:scale(1) translateY(0); }
  }
  .menu-animate { animation:menu-in 0.14s cubic-bezier(0.16,1,0.3,1) forwards; }

  @keyframes sidebar-slide-in {
    from { transform:translateX(-100%); }
    to { transform:translateX(0); }
  }
  @keyframes sidebar-slide-out {
    from { transform:translateX(0); }
    to { transform:translateX(-100%); }
  }
  .sidebar-open { animation:sidebar-slide-in 0.28s cubic-bezier(0.16,1,0.3,1) forwards; }
  .sidebar-close { animation:sidebar-slide-out 0.22s ease-in forwards; }

  @keyframes backdrop-in { from { opacity:0; } to { opacity:1; } }
  @keyframes backdrop-out { from { opacity:1; } to { opacity:0; } }
  .backdrop-open { animation:backdrop-in 0.2s ease forwards; }
  .backdrop-close { animation:backdrop-out 0.18s ease forwards; }

  @keyframes settings-in {
    from { opacity:0; transform:translateX(24px); }
    to { opacity:1; transform:translateX(0); }
  }
  .settings-animate { animation:settings-in 0.22s cubic-bezier(0.16,1,0.3,1) forwards; }

  @keyframes overlay-in { from { opacity:0; } to { opacity:1; } }
  .overlay-animate { animation:overlay-in 0.18s ease forwards; }

  .search-input {
    width:100%; background:transparent; border:none; outline:none;
    font-size:13px; color:var(--text-primary);
    font-family:var(--font-sans); caret-color:var(--accent);
  }
  .search-input::placeholder { color:var(--text-muted); }
  .search-match { background:rgba(34,211,238,0.15); border-radius:3px; color:var(--accent); }

  .chip {
    display:inline-flex; align-items:center; gap:6px;
    padding:7px 14px; border-radius:9999px;
    border:1px solid var(--border-strong);
    background:transparent; font-size:12px;
    color:var(--text-secondary); cursor:pointer;
    transition:all 0.2s; font-family:var(--font-sans);
  }
  .chip:hover {
    background:var(--bg-active); color:var(--text-primary);
    border-color:rgba(34,211,238,0.3);
    box-shadow:0 0 12px rgba(34,211,238,0.1);
    transform:translateY(-1px);
  }

  .send-btn-active:hover { box-shadow:0 0 20px rgba(34,211,238,0.4); transform:scale(1.05); }
  .send-btn-active { transition:all 0.15s; }

  .sidebar-action {
    width:100%; display:flex; align-items:center; gap:10px;
    padding:8px 12px; border-radius:var(--radius-sm);
    border:none; background:transparent; font-size:13.5px;
    color:var(--text-muted); cursor:pointer; text-align:left;
    font-family:var(--font-sans); transition:all 0.15s;
    -webkit-tap-highlight-color:transparent;
  }
  .sidebar-action:hover { background:var(--bg-hover); color:var(--text-primary); }

  @keyframes greeting-in {
    from { opacity:0; transform:translateY(-6px); }
    to { opacity:1; transform:translateY(0); }
  }
  .greeting-animate { animation:greeting-in 0.4s ease forwards; }

  @keyframes user-menu-in {
    from { opacity:0; transform:translateY(8px) scale(0.97); }
    to { opacity:1; transform:translateY(0) scale(1); }
  }
  .user-menu-animate { animation:user-menu-in 0.18s cubic-bezier(0.16,1,0.3,1) forwards; }

  button, a { -webkit-tap-highlight-color:transparent; touch-action:manipulation; }

  .input-safe { padding-bottom: max(20px, env(safe-area-inset-bottom)); }

  .sidebar-collapse-transition {
    transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  .toggle-track {
    width:38px; height:22px; border-radius:11px;
    position:relative; cursor:pointer; transition:background 0.2s;
    border:none; padding:0; flex-shrink:0;
  }
  .toggle-thumb {
    position:absolute; top:3px; width:16px; height:16px;
    border-radius:50%; background:white;
    transition:left 0.2s cubic-bezier(0.16,1,0.3,1);
    box-shadow:0 1px 4px rgba(0,0,0,0.3);
  }
  .theme-card {
    flex:1; display:flex; flex-direction:column; align-items:center;
    gap:8px; padding:12px 8px 10px; border-radius:var(--radius-md);
    border:1.5px solid var(--border); cursor:pointer;
    transition:all 0.18s; background:var(--bg-elevated);
  }
  .theme-card:hover { border-color:var(--border-strong); background:var(--bg-hover); }
  .theme-card.active { border-color:var(--accent); background:var(--accent-dim); }
  .fontsize-option {
    flex:1; display:flex; flex-direction:column; align-items:center;
    gap:6px; padding:10px 6px 8px; border-radius:var(--radius-sm);
    border:1.5px solid var(--border); cursor:pointer;
    transition:all 0.18s; background:var(--bg-elevated);
  }
  .fontsize-option:hover { border-color:var(--border-strong); }
  .fontsize-option.active { border-color:var(--accent); background:var(--accent-dim); }
  .settings-section {
    background:var(--settings-section); border:1px solid var(--border);
    border-radius:var(--radius-md); overflow:hidden; margin-bottom:8px;
  }
  .settings-row {
    display:flex; align-items:center; justify-content:space-between;
    padding:14px 16px; gap:16px;
  }
  .settings-row + .settings-row { border-top:1px solid var(--border); }

  @media (max-width: 767px) { .desktop-only { display: none !important; } }
  @media (min-width: 768px) { .mobile-only { display: none !important; } }
`;

/* ─── HELPERS ────────────────────────────────────────────────── */

function shouldShowSources(text: string): boolean {
  return SEARCH_TRIGGERS.some((t) => text.toLowerCase().includes(t));
}

function getDomain(url: string): string {
  try { return new URL(url).hostname.replace("www.", ""); }
  catch { return url; }
}

function groupConversationsByDate(convs: Conversation[]) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const groups: Record<string, Conversation[]> = {
    Today: [], Yesterday: [], "Previous 7 days": [], Older: [],
  };
  convs.forEach((c) => {
    const d = new Date(c.created_at);
    if (d >= todayStart) groups["Today"].push(c);
    else if (d >= yesterdayStart) groups["Yesterday"].push(c);
    else if (d >= weekStart) groups["Previous 7 days"].push(c);
    else groups["Older"].push(c);
  });
  return groups;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="search-match">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

/* ─── SETTINGS HELPERS ───────────────────────────────────────── */

function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem("snehamverse-settings");
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch { return DEFAULT_SETTINGS; }
}

function saveSettings(s: Settings) {
  try { localStorage.setItem("snehamverse-settings", JSON.stringify(s)); } catch {}
}

function getEffectiveTheme(theme: Theme): "dark" | "light" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

function applyTheme(theme: Theme) {
  const effective = getEffectiveTheme(theme);
  const tokens = effective === "light" ? LIGHT_THEME : DARK_THEME;
  const root = document.documentElement;
  tokens.split(";").forEach((line) => {
    const trimmed = line.trim();
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) return;
    const key = trimmed.slice(0, colonIdx).trim();
    const val = trimmed.slice(colonIdx + 1).trim();
    if (key.startsWith("--") && val) root.style.setProperty(key, val);
  });
}

function loadSidebarCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  try { return localStorage.getItem("sidebar-collapsed") === "true"; }
  catch { return false; }
}
function saveSidebarCollapsed(v: boolean) {
  try { localStorage.setItem("sidebar-collapsed", String(v)); } catch {}
}

/* ─── MARKDOWN RENDERER ──────────────────────────────────────── */

function renderMarkdown(text: string, fontSize: number): React.ReactNode[] {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) { codeLines.push(lines[i]); i++; }
      elements.push(
        <div key={`cb-${i}`} style={{ position: "relative", margin: "14px 0" }}>
          {lang && (
            <div style={{ fontSize: 11, color: "var(--text-muted)", padding: "5px 14px 4px", background: "var(--code-bg)", borderRadius: "var(--radius-sm) var(--radius-sm) 0 0", borderBottom: "1px solid var(--border)", fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>
              {lang}
            </div>
          )}
          <pre style={{ background: "var(--code-bg)", border: "1px solid var(--border)", borderRadius: lang ? `0 0 var(--radius-sm) var(--radius-sm)` : "var(--radius-sm)", padding: "14px 16px", overflowX: "auto", fontSize: 13, lineHeight: 1.65, color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-mono)" }}>
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      i++; continue;
    }
    if (line.startsWith("### ")) { elements.push(<h3 key={`h3-${i}`} style={{ fontSize: fontSize + 0.5, fontWeight: 600, color: "var(--text-primary)", margin: "18px 0 6px", letterSpacing: "-0.01em" }}>{renderInline(line.slice(4))}</h3>); i++; continue; }
    if (line.startsWith("## ")) { elements.push(<h2 key={`h2-${i}`} style={{ fontSize: fontSize + 2, fontWeight: 600, color: "var(--text-primary)", margin: "20px 0 8px", letterSpacing: "-0.02em" }}>{renderInline(line.slice(3))}</h2>); i++; continue; }
    if (line.startsWith("# ")) { elements.push(<h1 key={`h1-${i}`} style={{ fontSize: fontSize + 4.5, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px", letterSpacing: "-0.03em" }}>{renderInline(line.slice(2))}</h1>); i++; continue; }
    if (line.match(/^[-*] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) { items.push(lines[i].slice(2)); i++; }
      elements.push(<ul key={`ul-${i}`} style={{ margin: "8px 0", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 5 }}>{items.map((item, j) => <li key={j} style={{ fontSize, color: "var(--text-secondary)", lineHeight: 1.8, listStyleType: "disc" }}>{renderInline(item)}</li>)}</ul>);
      continue;
    }
    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) { items.push(lines[i].replace(/^\d+\. /, "")); i++; }
      elements.push(<ol key={`ol-${i}`} style={{ margin: "8px 0", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 5 }}>{items.map((item, j) => <li key={j} style={{ fontSize, color: "var(--text-secondary)", lineHeight: 1.8, listStyleType: "decimal" }}>{renderInline(item)}</li>)}</ol>);
      continue;
    }
    if (line.match(/^---+$/)) { elements.push(<hr key={`hr-${i}`} style={{ border: "none", borderTop: "1px solid var(--border)", margin: "16px 0" }} />); i++; continue; }
    if (line.trim() === "") { elements.push(<div key={`sp-${i}`} style={{ height: 8 }} />); i++; continue; }
    elements.push(<p key={`p-${i}`} style={{ fontSize, color: "var(--text-secondary)", lineHeight: 1.85, margin: "2px 0", fontWeight: 300 }}>{renderInline(line)}</p>);
    i++;
  }
  return elements;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const pattern = /(`[^`]+`|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0; let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("`")) parts.push(<code key={match.index} style={{ background: "var(--bg-active)", color: "#a78bfa", padding: "1px 6px", borderRadius: 5, fontSize: "0.88em", fontFamily: "var(--font-mono)" }}>{token.slice(1, -1)}</code>);
    else if (token.startsWith("***")) parts.push(<strong key={match.index} style={{ fontWeight: 700, fontStyle: "italic", color: "var(--text-primary)" }}>{token.slice(3, -3)}</strong>);
    else if (token.startsWith("**")) parts.push(<strong key={match.index} style={{ fontWeight: 600, color: "var(--text-primary)" }}>{token.slice(2, -2)}</strong>);
    else if (token.startsWith("*")) parts.push(<em key={match.index} style={{ fontStyle: "italic", color: "var(--text-primary)" }}>{token.slice(1, -1)}</em>);
    else if (token.startsWith("[")) {
      const linkText = token.match(/\[([^\]]+)\]/)?.[1] || "";
      const linkUrl = token.match(/\(([^)]+)\)/)?.[1] || "";
      parts.push(<a key={match.index} href={linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8", textDecoration: "underline", textUnderlineOffset: 2 }}>{linkText}</a>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 0 ? text : parts.length === 1 ? parts[0] : <>{parts}</>;
}

/* ─── LOGO ───────────────────────────────────────────────────── */

function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: "block" }}>
      <circle cx="20" cy="20" r="20" fill="#060d24" />
      <path d="M7 30 Q15 5 33 13" stroke="url(#lmg)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <defs>
        <linearGradient id="lmg" x1="7" y1="30" x2="33" y2="13" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563eb" /><stop offset="0.55" stopColor="#60a5fa" /><stop offset="1" stopColor="#d4b96a" />
        </linearGradient>
      </defs>
      <text x="10" y="29" fontFamily="Georgia,'Times New Roman',serif" fontWeight="700" fontSize="19" fill="white">S</text>
    </svg>
  );
}

function Wordmark({ size = 15 }: { size?: number }) {
  return (
    <span style={{ fontSize: size, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
      <span style={{ color: "var(--text-primary)" }}>SnehAm</span>
      <span style={{ color: "var(--accent)" }}>verse</span>
      <span style={{ color: "var(--text-primary)" }}>AI</span>
    </span>
  );
}

/* ─── TOGGLE ─────────────────────────────────────────────────── */

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button className="toggle-track" onClick={() => onChange(!value)}
      style={{ background: value ? "var(--accent)" : "var(--bg-active)" }}
      aria-checked={value} role="switch">
      <span className="toggle-thumb" style={{ left: value ? "19px" : "3px" }} />
    </button>
  );
}

/* ─── COPY BUTTON ────────────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }
  return (
    <button onClick={handleCopy} title="Copy response"
      style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "transparent", color: copied ? "var(--accent)" : "var(--text-muted)", fontSize: 11.5, cursor: "pointer", transition: "all 0.15s", fontFamily: "var(--font-sans)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = copied ? "var(--accent)" : "var(--text-muted)"; }}>
      {copied ? (
        <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Copied</>
      ) : (
        <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>Copy</>
      )}
    </button>
  );
}

/* ─── THINKING DOTS ──────────────────────────────────────────── */

function ThinkingDots() {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 32 }} className="msg-animate">
      <div style={{ flexShrink: 0, marginTop: 2 }}><LogoMark size={26} /></div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 10.5, fontWeight: 500, color: "var(--text-muted)", marginBottom: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>SnehAmverseAI</p>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {[0, 150, 300].map((delay) => (
            <span key={delay} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: `pulse-dot 1.2s ease-in-out ${delay}ms infinite`, opacity: 0.6 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SOURCE CHIP ────────────────────────────────────────────── */

function SourceChip({ src }: { src: Source }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={src.url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: hov ? "var(--bg-active)" : "var(--bg-elevated)", border: `1px solid ${hov ? "var(--border-strong)" : "var(--border)"}`, borderRadius: 9999, fontSize: 12, color: hov ? "var(--text-primary)" : "var(--text-secondary)", textDecoration: "none", transition: "all 0.15s" }}>
      {src.favicon && <img src={src.favicon} alt="" width={13} height={13} style={{ borderRadius: 2 }} onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />}
      <span style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{getDomain(src.url)}</span>
    </a>
  );
}

/* ─── MESSAGE ────────────────────────────────────────────────── */

function MessageItem({ message: m, fontSize, showSources }: {
  message: Message; fontSize: number; showSources: boolean;
}) {
  if (m.role === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }} className="msg-animate">
        <div style={{ maxWidth: "80%", background: "var(--user-bubble)", color: "var(--text-primary)", padding: "12px 18px", borderRadius: "20px 20px 4px 20px", fontSize, lineHeight: 1.75, whiteSpace: "pre-wrap", border: "1px solid var(--border)", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
          {m.message}
        </div>
      </div>
    );
  }

  /* ── FIX 1: Don't render empty assistant bubbles — wait for first streaming token ── */
  if (m.role === "assistant" && !m.message) return null;

  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 32 }} className="msg-animate">
      <div style={{ flexShrink: 0, marginTop: 2 }}><LogoMark size={26} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 10.5, fontWeight: 500, color: "var(--text-muted)", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>SnehAmverseAI</p>
        <div style={{ fontSize, lineHeight: 1.85 }}>{renderMarkdown(m.message, fontSize)}</div>
        {showSources && m.sources && m.sources.length > 0 && (
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {m.sources.map((src, i) => <SourceChip key={i} src={src} />)}
          </div>
        )}
        {!m._id && m.message && (
          <div style={{ marginTop: 10 }}><CopyButton text={m.message} /></div>
        )}
      </div>
    </div>
  );
}

/* ─── INPUT BOX ──────────────────────────────────────────────── */

function InputBox({
  value, onChange, onSend, onStop, loading, autoFocus = false, placeholder = "Ask anything...",
}: {
  value: string; onChange: (v: string) => void; onSend: () => void;
  onStop?: () => void; loading: boolean; autoFocus?: boolean; placeholder?: string;
}) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  }, [value]);
  const canSend = !loading && value.trim().length > 0;
  return (
    <div style={{ position: "relative" }}>
      <div className="input-shell" style={{ width: "100%", background: "var(--bg-elevated)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-lg)", padding: "14px 16px 10px", boxShadow: "0 4px 24px rgba(0,0,0,0.2)", transition: "border-color 0.25s, box-shadow 0.25s", boxSizing: "border-box" }}>
        <textarea ref={taRef} rows={1} value={value} autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }}
          placeholder={placeholder} className="ai-textarea"
          style={{ width: "100%", background: "transparent", border: "none", outline: "none", resize: "none", fontSize: 15, color: "var(--text-primary)", lineHeight: 1.7, maxHeight: 200, overflowY: "auto", display: "block", fontFamily: "var(--font-sans)", fontWeight: 300 }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
          <button type="button" title="Attach"
            style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-sm)", background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--bg-active)"; el.style.color = "var(--text-secondary)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--text-muted)"; }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>

          {/* ── FIX 2: Removed "↵ send · ⇧↵ newline" hint text ── */}

          {loading && onStop ? (
            <button onClick={onStop}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 12px", height: 32, borderRadius: "var(--radius-sm)", border: "1px solid var(--border-strong)", background: "var(--bg-active)", color: "var(--text-secondary)", fontSize: 12, cursor: "pointer", transition: "all 0.15s", flexShrink: 0, fontFamily: "var(--font-sans)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
              Stop
            </button>
          ) : (
            <button onClick={onSend} disabled={!canSend} className={canSend ? "send-btn-active" : ""}
              style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-sm)", border: "none", background: canSend ? "var(--accent)" : "var(--bg-active)", cursor: canSend ? "pointer" : "not-allowed", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={canSend ? "#09090b" : "var(--text-muted)"} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── WELCOME SCREEN ─────────────────────────────────────────── */

function WelcomeScreen({ onChipClick, onStartChat, firstName }: {
  onChipClick: (label: string) => void; onStartChat: (msg: string) => void; firstName?: string | null;
}) {
  const [input, setInput] = useState("");
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 16px 48px", minHeight: 0 }}>
      <div style={{ width: "100%", maxWidth: 660, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        {firstName && (
          <p className="greeting-animate" style={{ fontSize: 13, color: "var(--text-muted)", letterSpacing: "0.02em", fontWeight: 400 }}>
            Welcome back, <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{firstName}</span>
          </p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "center", textAlign: "center" }}>
          <LogoMark size={36} />
          <h1 style={{ fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.04em", margin: 0, lineHeight: 1.1 }}>How can I help?</h1>
        </div>
        <div style={{ width: "100%" }}>
          <InputBox value={input} onChange={setInput} onSend={() => { if (input.trim()) onStartChat(input.trim()); }} loading={false} autoFocus />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {WELCOME_CHIPS.map((chip) => (
            <button key={chip.label} onClick={() => onChipClick(chip.label)} className="chip">
              <span>{chip.icon}</span><span>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CHAT AREA ──────────────────────────────────────────────── */

function ChatArea({
  conversationId, initialMessage, onInitialMessageConsumed, onStreamEnd, fontSize, showSources,
}: {
  conversationId: string; initialMessage?: string;
  onInitialMessageConsumed?: () => void; onStreamEnd?: () => void;
  fontSize: number; showSources: boolean;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);

  useEffect(() => { loadMessages(); }, [conversationId]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => {
    if (initialMessage && !firedRef.current) {
      firedRef.current = true;
      onInitialMessageConsumed?.();
      sendMessage(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  async function loadMessages() {
    const res = await fetch(`/api/ai/messages?conversation_id=${conversationId}`);
    const data = await res.json();
    setMessages((prev) => {
      const isMidStream = prev.some((m) => m._id !== undefined);
      if (isMidStream) return prev;
      return data.messages || [];
    });
  }

  function stopStreaming() {
    readerRef.current?.cancel();
    readerRef.current = null;
    setLoading(false);
    setMessages((prev) => prev.map((m) => m._id ? { ...m, _id: undefined } : m));
  }

  const sendMessage = useCallback(async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || loading) return;
    if (!override) setInput("");
    const assistantId = `assistant-${Date.now()}-${Math.random()}`;
    setMessages((prev) => [
      ...prev,
      { role: "user" as const, message: text },
      { role: "assistant" as const, message: "", _id: assistantId },
    ]);
    setLoading(true);
    const res = await fetch("/api/ai/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, conversation_id: conversationId }),
    });
    const reader = res.body?.getReader();
    readerRef.current = reader || null;
    const decoder = new TextDecoder();
    let aiText = "";
    if (!reader) { setLoading(false); return; }
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiText += decoder.decode(value);
        setMessages((prev) => prev.map((msg) => msg._id === assistantId ? { ...msg, message: aiText } : msg));
      }
    } catch { /* cancelled */ }
    setMessages((prev) => prev.map((msg) => msg._id === assistantId ? { ...msg, _id: undefined } : msg));
    setLoading(false);
    readerRef.current = null;
    onStreamEnd?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, loading, conversationId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }} className="no-overscroll">
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 16px 16px", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          {messages.map((m, i) => <MessageItem key={i} message={m} fontSize={fontSize} showSources={showSources} />)}
          {loading && <ThinkingDots />}
          <div ref={bottomRef} />
        </div>
      </div>
      {/* ── FIX 3: Removed disclaimer text "SnehAmverseAI can make mistakes..." ── */}
      <div className="input-safe" style={{ padding: "12px 16px 20px", borderTop: "1px solid var(--border)", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <InputBox value={input} onChange={setInput} onSend={() => sendMessage()} onStop={stopStreaming} loading={loading} />
        </div>
      </div>
    </div>
  );
}

/* ─── DROPDOWN ITEM ──────────────────────────────────────────── */

function DropdownItem({ icon, label, onClick, danger = false }: {
  icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 7, border: "none", background: hovered ? (danger ? "rgba(239,68,68,0.12)" : "var(--bg-active)") : "transparent", color: hovered ? (danger ? "#f87171" : "var(--text-primary)") : "var(--text-secondary)", fontSize: 13, cursor: "pointer", textAlign: "left", fontFamily: "var(--font-sans)", transition: "all 0.1s" }}>
      {icon}<span>{label}</span>
    </button>
  );
}

/* ─── CONVERSATION ROW ───────────────────────────────────────── */

function ConversationRow({ conv, isActive, onSelect, onDelete, onRename, onStar, searchQuery }: {
  conv: Conversation; isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  onRename: (id: string, newTitle: string) => Promise<void>;
  onStar: (id: string) => void;
  searchQuery?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameVal, setRenameVal] = useState(conv.title || "New conversation");
  const [starred, setStarred] = useState(conv.starred ?? false);
  const [deleting, setDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const renameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handler(e: MouseEvent) { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); }
    function keyHandler(e: KeyboardEvent) { if (e.key === "Escape") setMenuOpen(false); }
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("keydown", keyHandler); };
  }, [menuOpen]);

  useEffect(() => { if (renaming) setTimeout(() => { renameRef.current?.focus(); renameRef.current?.select(); }, 50); }, [renaming]);
  useEffect(() => { setRenameVal(conv.title || "New conversation"); }, [conv.title]);

  async function handleDelete() { setMenuOpen(false); setDeleting(true); await onDelete(conv.id); setDeleting(false); }
  async function handleRenameSubmit() {
    const trimmed = renameVal.trim();
    if (trimmed && trimmed !== (conv.title || "New conversation")) await onRename(conv.id, trimmed);
    setRenaming(false); setMenuOpen(false);
  }
  const showDots = hovered || menuOpen || isActive;

  return (
    <div style={{ position: "relative" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {renaming ? (
        <div style={{ display: "flex", alignItems: "center", padding: "4px 8px", gap: 6 }}>
          <input ref={renameRef} value={renameVal} onChange={(e) => setRenameVal(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleRenameSubmit(); if (e.key === "Escape") { setRenaming(false); setRenameVal(conv.title || "New conversation"); } }}
            onBlur={handleRenameSubmit}
            style={{ flex: 1, background: "var(--bg-active)", border: "1px solid var(--border-strong)", borderRadius: 6, padding: "5px 8px", fontSize: 13, color: "var(--text-primary)", outline: "none", fontFamily: "var(--font-sans)" }}
          />
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", borderRadius: "var(--radius-sm)", background: isActive ? "var(--bg-active)" : hovered ? "var(--bg-hover)" : "transparent", transition: "background 0.15s", opacity: deleting ? 0.4 : 1, boxShadow: isActive ? "inset 2px 0 0 var(--accent)" : "none" }}>
          <button onClick={() => onSelect(conv.id)}
            style={{ flex: 1, textAlign: "left", padding: "9px 10px 9px 14px", border: "none", background: "transparent", fontSize: 13, color: isActive ? "var(--text-primary)" : hovered ? "var(--text-secondary)" : "var(--text-muted)", cursor: "pointer", fontFamily: "var(--font-sans)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", gap: 6, minWidth: 0, transition: "color 0.15s" }}>
            {starred && <span style={{ color: "#facc15", flexShrink: 0, fontSize: 11 }}>★</span>}
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              <HighlightMatch text={conv.title || "New conversation"} query={searchQuery || ""} />
            </span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
            style={{ flexShrink: 0, width: 28, height: 28, marginRight: 6, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, border: "none", background: menuOpen ? "var(--bg-active)" : "transparent", color: "var(--text-secondary)", cursor: "pointer", opacity: showDots ? 1 : 0, transition: "opacity 0.15s, background 0.15s", pointerEvents: showDots ? "auto" : "none", fontFamily: "var(--font-sans)" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
            </svg>
          </button>
        </div>
      )}
      {menuOpen && (
        <div ref={menuRef} className="menu-animate" style={{ position: "absolute", top: "calc(100% + 4px)", left: 8, zIndex: 10000, background: "var(--bg-elevated)", border: "1px solid var(--border-strong)", borderRadius: 10, padding: 4, minWidth: 160, boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }}>
          <DropdownItem icon={<svg width="13" height="13" viewBox="0 0 24 24" fill={starred ? "#facc15" : "none"} stroke={starred ? "#facc15" : "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>} label={starred ? "Unstar" : "Star"} onClick={() => { setStarred((s) => !s); onStar(conv.id); setMenuOpen(false); }} />
          <DropdownItem icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>} label="Rename" onClick={() => { setMenuOpen(false); setRenaming(true); }} />
          <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />
          <DropdownItem icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>} label="Delete" onClick={handleDelete} danger />
        </div>
      )}
    </div>
  );
}

/* ─── USER FOOTER ────────────────────────────────────────────── */

function UserFooter({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = user?.firstName || user?.username || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "You";
  const email = user?.emailAddresses?.[0]?.emailAddress || "";
  const initial = displayName.slice(0, 1).toUpperCase();
  const avatarUrl = user?.imageUrl;

  useEffect(() => {
    if (!menuOpen) return;
    function handler(e: MouseEvent) { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); }
    function keyHandler(e: KeyboardEvent) { if (e.key === "Escape") setMenuOpen(false); }
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("keydown", keyHandler); };
  }, [menuOpen]);

  return (
    <div style={{ padding: "10px 10px 14px", borderTop: "1px solid var(--border)", position: "relative" }}>
      {menuOpen && (
        <div ref={menuRef} className="user-menu-animate" style={{ position: "absolute", bottom: "calc(100% - 2px)", left: 10, right: 10, zIndex: 10000, background: "var(--bg-elevated)", border: "1px solid var(--border-strong)", borderRadius: 12, padding: 6, boxShadow: "0 -8px 32px rgba(0,0,0,0.4)" }}>
          <div style={{ padding: "10px 10px 8px", borderBottom: "1px solid var(--border)", marginBottom: 4 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{displayName}</p>
            <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{email}</p>
          </div>
          <DropdownItem icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>} label="Manage account" onClick={() => { openUserProfile(); setMenuOpen(false); }} />
          <DropdownItem icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>} label="Settings" onClick={() => { setMenuOpen(false); onOpenSettings(); }} />
          <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />
          <DropdownItem icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>} label="Sign out" onClick={() => signOut({ redirectUrl: "/" })} danger />
        </div>
      )}
      <button onClick={() => setMenuOpen((o) => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: "var(--radius-sm)", border: "none", background: menuOpen ? "var(--bg-active)" : "transparent", cursor: "pointer", transition: "background 0.15s", fontFamily: "var(--font-sans)" }}
        onMouseEnter={(e) => { if (!menuOpen) (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
        onMouseLeave={(e) => { if (!menuOpen) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, overflow: "hidden", border: "1px solid var(--border-strong)" }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} width={30} height={30} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>
              {initial}
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", margin: 0, lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{displayName}</p>
          <p style={{ fontSize: 10.5, color: "var(--text-muted)", margin: "3px 0 0", lineHeight: 1 }}>Free plan</p>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}

/* ─── SIDEBAR CONTENT ────────────────────────────────────────── */

function SidebarContent({
  conversations, activeId, onSelect, onCreate, onDelete, onRename, onStar, onOpenSettings, collapsed,
}: {
  conversations: Conversation[]; activeId: string | null;
  onSelect: (id: string) => void; onCreate: () => void;
  onDelete: (id: string) => Promise<void>;
  onRename: (id: string, newTitle: string) => Promise<void>;
  onStar: (id: string) => void;
  onOpenSettings: () => void;
  collapsed: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const groups = groupConversationsByDate(conversations);

  const filteredConversations = searchQuery.trim()
    ? conversations.filter((c) => (c.title || "New conversation").toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  if (collapsed) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", padding: "16px 0 14px" }}>
        <div style={{ marginBottom: 16 }}><LogoMark size={24} /></div>
        <button onClick={onCreate} title="New chat" className="sidebar-action" style={{ width: 40, justifyContent: "center", padding: "10px 0" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
        </button>
        <div style={{ flex: 1 }} />
        <button onClick={onOpenSettings} title="Settings" className="sidebar-action" style={{ width: 40, justifyContent: "center", padding: "10px 0" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
        </button>
      </div>
    );
  }

  return (
    <>
      <div style={{ padding: "18px 16px 10px", display: "flex", alignItems: "center", gap: 10 }}>
        <LogoMark size={24} /><Wordmark size={14} />
      </div>
      <div style={{ padding: "4px 10px 2px" }}>
        <button className="sidebar-action" onClick={onCreate}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
          New chat
        </button>
      </div>
      <div style={{ padding: "2px 10px 6px" }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: "var(--radius-sm)", background: searchFocused ? "var(--bg-elevated)" : "transparent", border: `1px solid ${searchFocused ? "var(--border-strong)" : "transparent"}`, transition: "all 0.2s", cursor: "text" }}
          onClick={() => searchRef.current?.focus()}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: searchFocused ? "var(--text-secondary)" : "var(--text-muted)", flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input ref={searchRef} className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
            onKeyDown={(e) => { if (e.key === "Escape") { setSearchQuery(""); searchRef.current?.blur(); } }}
            placeholder="Search chats..."
          />
          {searchQuery && (
            <button onClick={(e) => { e.stopPropagation(); setSearchQuery(""); searchRef.current?.focus(); }}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div style={{ height: 1, background: "var(--border)", margin: "2px 10px 4px" }} />
      <div className="sidebar-list" style={{ flex: 1, overflowY: "auto", padding: "8px 6px", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
        {filteredConversations !== null ? (
          filteredConversations.length === 0 ? (
            <div style={{ padding: "32px 16px", textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
                No chats matching<br />
                <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>"{searchQuery}"</span>
              </p>
            </div>
          ) : (
            <div style={{ marginBottom: 8 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 12px", marginBottom: 6 }}>
                {filteredConversations.length} result{filteredConversations.length !== 1 ? "s" : ""}
              </p>
              {filteredConversations.map((c) => (
                <ConversationRow key={c.id} conv={c} isActive={activeId === c.id}
                  onSelect={(id) => { onSelect(id); setSearchQuery(""); }}
                  onDelete={onDelete} onRename={onRename} onStar={onStar} searchQuery={searchQuery} />
              ))}
            </div>
          )
        ) : conversations.length === 0 ? (
          <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", padding: "32px 16px", lineHeight: 1.7 }}>
            No conversations yet.<br /><span style={{ opacity: 0.5 }}>Start a new chat above.</span>
          </p>
        ) : (
          Object.entries(groups).map(([label, convs]) =>
            convs.length === 0 ? null : (
              <div key={label} style={{ marginBottom: 18 }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 12px", marginBottom: 6 }}>{label}</p>
                {convs.map((c) => (
                  <ConversationRow key={c.id} conv={c} isActive={activeId === c.id}
                    onSelect={onSelect} onDelete={onDelete} onRename={onRename} onStar={onStar} />
                ))}
              </div>
            )
          )
        )}
      </div>
      <UserFooter onOpenSettings={onOpenSettings} />
    </>
  );
}

/* ─── SETTINGS PANEL ─────────────────────────────────────────── */

function SettingsPanel({ settings, onUpdate, onClose }: {
  settings: Settings; onUpdate: (s: Partial<Settings>) => void; onClose: () => void;
}) {
  useEffect(() => {
    function handler(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const THEME_OPTIONS = [
    { value: "dark" as Theme, label: "Dark", preview: <div style={{ width: 52, height: 36, borderRadius: 6, background: "#09090b", border: "1px solid rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", top: 6, left: 6, right: 6, height: 4, borderRadius: 2, background: "#27272a" }} /><div style={{ position: "absolute", top: 14, left: 6, right: 14, height: 3, borderRadius: 2, background: "#1c1c20" }} /></div> },
    { value: "light" as Theme, label: "Light", preview: <div style={{ width: 52, height: 36, borderRadius: 6, background: "#fafafa", border: "1px solid rgba(0,0,0,0.1)", position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", top: 6, left: 6, right: 6, height: 4, borderRadius: 2, background: "#e4e4e8" }} /><div style={{ position: "absolute", top: 14, left: 6, right: 14, height: 3, borderRadius: 2, background: "#ececef" }} /></div> },
    { value: "system" as Theme, label: "System", preview: <div style={{ width: 52, height: 36, borderRadius: 6, overflow: "hidden", border: "1px solid rgba(128,128,128,0.2)", position: "relative" }}><div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #09090b 50%, #fafafa 50%)" }} /></div> },
  ];

  const FONT_OPTIONS = [
    { value: "compact" as FontSize, label: "Compact", size: 13 },
    { value: "default" as FontSize, label: "Default", size: 16 },
    { value: "relaxed" as FontSize, label: "Relaxed", size: 20 },
  ];

  return (
    <>
      <div className="overlay-animate" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 10001, background: "var(--bg-overlay)", backdropFilter: "blur(2px)" }} />
      <div className="settings-animate" style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 100vw)", zIndex: 10002, background: "var(--settings-bg)", borderLeft: "1px solid var(--border-strong)", display: "flex", flexDirection: "column", boxShadow: "-24px 0 80px rgba(0,0,0,0.4)", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.02em" }}>Settings</h2>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0" }}>Preferences saved automatically</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-sm)", border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          <p style={{ fontSize: 10.5, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Appearance</p>
          <div className="settings-section">
            <div className="settings-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
              <div><p style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)", margin: 0 }}>Color theme</p><p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0" }}>Choose your preferred interface color</p></div>
              <div style={{ display: "flex", gap: 8, width: "100%" }}>
                {THEME_OPTIONS.map((opt) => (
                  <button key={opt.value} className={`theme-card ${settings.theme === opt.value ? "active" : ""}`} onClick={() => onUpdate({ theme: opt.value })}>
                    {opt.preview}
                    <span style={{ fontSize: 12, fontWeight: 500, color: settings.theme === opt.value ? "var(--accent)" : "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="settings-section">
            <div className="settings-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
              <div><p style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)", margin: 0 }}>Font size</p><p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0" }}>Adjust how text appears in conversations</p></div>
              <div style={{ display: "flex", gap: 8, width: "100%" }}>
                {FONT_OPTIONS.map((opt) => (
                  <button key={opt.value} className={`fontsize-option ${settings.fontSize === opt.value ? "active" : ""}`} onClick={() => onUpdate({ fontSize: opt.value })}>
                    <span style={{ fontSize: opt.size, fontWeight: 500, color: settings.fontSize === opt.value ? "var(--accent)" : "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1 }}>Aa</span>
                    <span style={{ fontSize: 11.5, fontWeight: 500, color: settings.fontSize === opt.value ? "var(--accent)" : "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p style={{ fontSize: 10.5, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "20px 0 10px" }}>AI Behavior</p>
          <div className="settings-section">
            <div className="settings-row">
              <div style={{ flex: 1 }}><p style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)", margin: 0 }}>Web search</p><p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0" }}>Fetch live results for relevant queries</p></div>
              <Toggle value={settings.showWebSearch} onChange={(v) => onUpdate({ showWebSearch: v })} />
            </div>
            <div className="settings-row">
              <div style={{ flex: 1 }}><p style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)", margin: 0 }}>Show sources</p><p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0" }}>Display web source chips below responses</p></div>
              <Toggle value={settings.showSources} onChange={(v) => onUpdate({ showSources: v })} />
            </div>
          </div>
          {/* ── FIX 3: About section removed permanently ── */}
          <p style={{ fontSize: 10.5, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "20px 0 10px" }}>Data</p>
          <div className="settings-section">
            <div className="settings-row">
              <div style={{ flex: 1 }}><p style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)", margin: 0 }}>Clear all conversations</p><p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0" }}>Permanently delete your chat history</p></div>
              <ClearConversationsButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── CLEAR CONVERSATIONS ────────────────────────────────────── */

function ClearConversationsButton() {
  const [confirm, setConfirm] = useState(false);
  const [clearing, setClearing] = useState(false);
  async function handleClear() {
    if (!confirm) { setConfirm(true); return; }
    setClearing(true);
    try { await fetch("/api/ai/conversations/clear", { method: "POST" }); window.location.reload(); }
    catch { setClearing(false); setConfirm(false); }
  }
  return (
    <button onClick={handleClear} disabled={clearing}
      style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", border: `1px solid ${confirm ? "rgba(239,68,68,0.4)" : "var(--border-strong)"}`, background: confirm ? "rgba(239,68,68,0.08)" : "transparent", color: confirm ? "#f87171" : "var(--text-secondary)", fontSize: 12.5, fontWeight: 500, cursor: "pointer", transition: "all 0.18s", fontFamily: "var(--font-sans)", flexShrink: 0 }}
      onMouseLeave={() => { if (confirm && !clearing) setTimeout(() => setConfirm(false), 2000); }}>
      {clearing ? "Clearing…" : confirm ? "Confirm?" : "Clear all"}
    </button>
  );
}

/* ─── ROOT PAGE ──────────────────────────────────────────────── */

export default function AIPage() {
  const { user } = useUser();
  const firstName = user?.firstName ?? null;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pendingMsg, setPendingMsg] = useState<string | undefined>();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() { setIsMobile(window.innerWidth < 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const saved = loadSettings();
    setSettings(saved);
    applyTheme(saved.theme);
    setSidebarCollapsed(loadSidebarCollapsed());
  }, []);

  useEffect(() => {
    if (settings.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [settings.theme]);

  useEffect(() => {
    if (mobileSidebarOpen) setMobileSidebarOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    if (!mobileSidebarOpen) return;
    function handler(e: KeyboardEvent) { if (e.key === "Escape") setMobileSidebarOpen(false); }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileSidebarOpen]);

  function toggleSidebarCollapsed() {
    setSidebarCollapsed((prev) => { const next = !prev; saveSidebarCollapsed(next); return next; });
  }

  function updateSettings(patch: Partial<Settings>) {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      if (patch.theme) applyTheme(patch.theme);
      return next;
    });
  }

  useEffect(() => { loadConversations(); }, []);

  async function loadConversations() {
    const res = await fetch("/api/ai/conversations");
    const data = await res.json();
    setConversations(data.conversations || []);
  }

  async function createConversation(initialMessage?: string) {
    const res = await fetch("/api/ai/conversation", { method: "POST" });
    const data = await res.json();
    if (data?.conversation?.id) {
      setActiveId(data.conversation.id);
      if (initialMessage) setPendingMsg(initialMessage);
      loadConversations();
    }
  }

  async function deleteChat(id: string) {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) setActiveId(null);
    try {
      await fetch("/api/ai/conversation/delete", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: id }),
      });
    } catch { loadConversations(); }
  }

  async function renameChat(id: string, newTitle: string) {
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, title: newTitle } : c));
    try {
      await fetch("/api/ai/conversation/rename", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: id, title: newTitle }),
      });
    } catch { loadConversations(); }
  }

  function starChat(id: string) {
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, starred: !c.starred } : c));
  }

  const fontSize = FONT_SIZE_MAP[settings.fontSize];
  const desktopSidebarWidth = sidebarCollapsed ? 52 : SIDEBAR_WIDTH;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="no-overscroll" style={{ position: "fixed", inset: 0, zIndex: 9999, isolation: "isolate", display: "flex", overflow: "hidden", background: "var(--bg-base)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", WebkitFontSmoothing: "antialiased", height: "100dvh" } as React.CSSProperties}>

        {!isMobile && (
          <div className="sidebar-collapse-transition" style={{ width: desktopSidebarWidth, flexShrink: 0, display: "flex", flexDirection: "column", height: "100%", background: "var(--bg-sidebar)", borderRight: "1px solid var(--border)", overflow: "hidden", position: "relative" }}>
            <SidebarContent conversations={conversations} activeId={activeId} onSelect={setActiveId} onCreate={() => createConversation()} onDelete={deleteChat} onRename={renameChat} onStar={starChat} onOpenSettings={() => setSettingsOpen(true)} collapsed={sidebarCollapsed} />
            <button onClick={toggleSidebarCollapsed} title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              style={{ position: "absolute", top: 18, right: -12, width: 24, height: 24, borderRadius: "50%", border: "1px solid var(--border-strong)", background: "var(--bg-elevated)", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, transition: "all 0.15s", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ transform: sidebarCollapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
        )}

        {isMobile && mobileSidebarOpen && (
          <div className="backdrop-open" onClick={() => setMobileSidebarOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }} />
        )}

        {isMobile && (
          <div className={mobileSidebarOpen ? "sidebar-open" : "sidebar-close"} style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: SIDEBAR_WIDTH, zIndex: 10001, display: "flex", flexDirection: "column", background: "var(--bg-sidebar)", borderRight: "1px solid var(--border)", transform: mobileSidebarOpen ? "translateX(0)" : "translateX(-100%)" }}>
            <SidebarContent conversations={conversations} activeId={activeId} onSelect={(id) => { setActiveId(id); setMobileSidebarOpen(false); }} onCreate={() => { createConversation(); setMobileSidebarOpen(false); }} onDelete={deleteChat} onRename={renameChat} onStar={starChat} onOpenSettings={() => { setSettingsOpen(true); setMobileSidebarOpen(false); }} collapsed={false} />
          </div>
        )}

        <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden", position: "relative" }}>
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px 10px", borderBottom: "1px solid var(--border)", background: "var(--bg-base)", flexShrink: 0 }}>
              <button onClick={() => setMobileSidebarOpen(true)} style={{ width: 36, height: 36, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, borderRadius: "var(--radius-sm)", border: "none", background: "transparent", cursor: "pointer", color: "var(--text-secondary)", padding: 6 }}>
                <span style={{ width: 18, height: 1.5, background: "currentColor", borderRadius: 1 }} />
                <span style={{ width: 18, height: 1.5, background: "currentColor", borderRadius: 1 }} />
                <span style={{ width: 18, height: 1.5, background: "currentColor", borderRadius: 1 }} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <LogoMark size={20} /><Wordmark size={13} />
              </div>
              <div style={{ flex: 1 }} />
              <button onClick={() => createConversation()} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "transparent", cursor: "pointer", color: "var(--text-muted)" }} title="New chat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              </button>
            </div>
          )}

          {activeId ? (
            <ChatArea key={activeId} conversationId={activeId} initialMessage={pendingMsg} onInitialMessageConsumed={() => setPendingMsg(undefined)} onStreamEnd={loadConversations} fontSize={fontSize} showSources={settings.showSources} />
          ) : (
            <WelcomeScreen firstName={firstName} onChipClick={(label) => createConversation(label)} onStartChat={(msg) => createConversation(msg)} />
          )}
        </main>
      </div>

      {settingsOpen && (
        <SettingsPanel settings={settings} onUpdate={updateSettings} onClose={() => setSettingsOpen(false)} />
      )}
    </>
  );
}