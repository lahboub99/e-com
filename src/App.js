import { useState, useRef, useEffect } from "react";

// ── Palette & tokens ──────────────────────────────────────────────────────────
const G = {
  bg: "#0A0A0F",
  surface: "#12121A",
  card: "#1A1A26",
  border: "#2A2A40",
  accent: "#00FFB2",
  accentDim: "#00FFB220",
  accentBorder: "#00FFB240",
  gold: "#FFD700",
  red: "#FF4560",
  text: "#E8E8F0",
  muted: "#6B6B8A",
  white: "#FFFFFF",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${G.bg};
    color: ${G.text};
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${G.bg}; }
  ::-webkit-scrollbar-thumb { background: ${G.border}; border-radius: 2px; }

  .mono { font-family: 'Space Mono', monospace; }

  .app {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    padding-bottom: 80px;
    position: relative;
  }

  /* ── Header ── */
  .header {
    padding: 20px 20px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    background: ${G.bg};
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 14px;
    border-bottom: 1px solid ${G.border};
  }
  .logo {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }
  .logo span { color: ${G.accent}; }
  .badge {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    background: ${G.accentDim};
    border: 1px solid ${G.accentBorder};
    color: ${G.accent};
    padding: 3px 8px;
    border-radius: 20px;
  }

  /* ── Nav ── */
  .nav {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 480px;
    background: ${G.surface};
    border-top: 1px solid ${G.border};
    display: flex;
    z-index: 200;
  }
  .nav-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 4px 8px;
    gap: 3px;
    background: none;
    border: none;
    cursor: pointer;
    color: ${G.muted};
    font-family: 'Syne', sans-serif;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: color 0.2s;
  }
  .nav-btn.active { color: ${G.accent}; }
  .nav-btn svg { transition: transform 0.2s; }
  .nav-btn.active svg { transform: scale(1.15); }

  /* ── Sections ── */
  .section { padding: 20px; }

  /* ── Cards ── */
  .card {
    background: ${G.card};
    border: 1px solid ${G.border};
    border-radius: 16px;
    padding: 18px;
    margin-bottom: 14px;
  }
  .card-accent {
    border-color: ${G.accentBorder};
    background: linear-gradient(135deg, ${G.card} 0%, #1A2630 100%);
  }

  /* ── Labels ── */
  .label {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: ${G.accent};
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .label-muted {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: ${G.muted};
    letter-spacing: 1.2px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  /* ── Form elements ── */
  .field { margin-bottom: 16px; }
  .field-label {
    font-size: 13px;
    font-weight: 600;
    color: ${G.text};
    margin-bottom: 8px;
    display: block;
  }
  .input, .select, .textarea {
    width: 100%;
    background: ${G.surface};
    border: 1px solid ${G.border};
    border-radius: 10px;
    color: ${G.text};
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.2s;
    -webkit-appearance: none;
  }
  .input:focus, .select:focus, .textarea:focus {
    border-color: ${G.accent};
  }
  .textarea { resize: vertical; min-height: 72px; }

  .chip-group { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    padding: 7px 14px;
    border-radius: 20px;
    border: 1px solid ${G.border};
    background: ${G.surface};
    color: ${G.muted};
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
    font-family: 'Syne', sans-serif;
  }
  .chip.active {
    border-color: ${G.accent};
    background: ${G.accentDim};
    color: ${G.accent};
  }

  /* ── Buttons ── */
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    border: none;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-primary {
    background: ${G.accent};
    color: #000;
  }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-primary:active { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .btn-ghost {
    background: transparent;
    border: 1px solid ${G.border};
    color: ${G.text};
  }

  /* ── Score bar ── */
  .score-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .score-label { font-size: 12px; color: ${G.muted}; width: 110px; flex-shrink: 0; }
  .score-track {
    flex: 1;
    height: 6px;
    background: ${G.border};
    border-radius: 3px;
    overflow: hidden;
  }
  .score-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 1s ease;
  }
  .score-num { font-family: 'Space Mono', monospace; font-size: 11px; color: ${G.text}; width: 28px; text-align: right; }

  /* ── Result section titles ── */
  .section-title {
    font-size: 18px;
    font-weight: 800;
    color: ${G.white};
    margin-bottom: 4px;
  }
  .section-sub {
    font-size: 12px;
    color: ${G.muted};
    margin-bottom: 18px;
  }

  /* ── Stat grid ── */
  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
  .stat-box {
    background: ${G.surface};
    border: 1px solid ${G.border};
    border-radius: 10px;
    padding: 12px;
  }
  .stat-val { font-size: 18px; font-weight: 800; color: ${G.white}; }
  .stat-val.green { color: ${G.accent}; }
  .stat-val.gold { color: ${G.gold}; }
  .stat-val.red { color: ${G.red}; }
  .stat-key { font-size: 10px; color: ${G.muted}; margin-top: 2px; }

  /* ── Tags ── */
  .tag {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    margin: 3px 3px 0 0;
  }
  .tag-green { background: #00FFB215; color: ${G.accent}; border: 1px solid ${G.accentBorder}; }
  .tag-red { background: #FF456015; color: ${G.red}; border: 1px solid #FF456040; }
  .tag-gold { background: #FFD70015; color: ${G.gold}; border: 1px solid #FFD70040; }
  .tag-muted { background: ${G.surface}; color: ${G.muted}; border: 1px solid ${G.border}; }

  /* ── Streaming output ── */
  .stream-box {
    background: ${G.surface};
    border: 1px solid ${G.border};
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    white-space: pre-wrap;
    font-size: 13px;
    line-height: 1.7;
    color: ${G.text};
    min-height: 60px;
  }

  /* ── Loader ── */
  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 20px;
    color: ${G.muted};
    font-size: 13px;
  }
  .dot {
    width: 6px; height: 6px;
    background: ${G.accent};
    border-radius: 50%;
    animation: pulse 1.4s ease-in-out infinite;
  }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse {
    0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
    40% { opacity: 1; transform: scale(1); }
  }

  /* ── Steps ── */
  .steps { display: flex; gap: 0; margin-bottom: 20px; }
  .step {
    flex: 1;
    text-align: center;
    padding: 8px 0;
    font-size: 10px;
    font-weight: 700;
    color: ${G.muted};
    border-bottom: 2px solid ${G.border};
    letter-spacing: 0.5px;
  }
  .step.active {
    color: ${G.accent};
    border-bottom-color: ${G.accent};
  }
  .step.done {
    color: ${G.accent};
    border-bottom-color: ${G.accentBorder};
  }

  /* ── Divider ── */
  .divider { border: none; border-top: 1px solid ${G.border}; margin: 16px 0; }

  /* ── Tab row ── */
  .tab-row {
    display: flex;
    background: ${G.surface};
    border-radius: 10px;
    padding: 3px;
    margin-bottom: 16px;
    gap: 2px;
  }
  .tab {
    flex: 1;
    padding: 9px 4px;
    text-align: center;
    font-size: 11px;
    font-weight: 700;
    color: ${G.muted};
    border-radius: 8px;
    cursor: pointer;
    border: none;
    background: none;
    font-family: 'Syne', sans-serif;
    transition: all 0.18s;
  }
  .tab.active {
    background: ${G.card};
    color: ${G.accent};
    border: 1px solid ${G.accentBorder};
  }

  /* ── Collapsible ── */
  .collapsible-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: none;
    border: none;
    text-align: left;
    color: ${G.text};
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    padding: 0;
  }
  .collapsible-content { margin-top: 12px; }

  /* ── Announce strip ── */
  .announce {
    background: ${G.accentDim};
    border: 1px solid ${G.accentBorder};
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 12px;
    color: ${G.accent};
    margin-bottom: 14px;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }

  /* ── Placeholder home ── */
  .hero {
    padding: 32px 20px 20px;
    text-align: center;
  }
  .hero-icon {
    font-size: 52px;
    margin-bottom: 16px;
    display: block;
  }
  .hero-title {
    font-size: 26px;
    font-weight: 800;
    color: ${G.white};
    margin-bottom: 8px;
    line-height: 1.2;
  }
  .hero-title span { color: ${G.accent}; }
  .hero-sub {
    font-size: 14px;
    color: ${G.muted};
    line-height: 1.6;
    margin-bottom: 28px;
  }

  .quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
  .quick-card {
    background: ${G.card};
    border: 1px solid ${G.border};
    border-radius: 14px;
    padding: 16px 14px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .quick-card:hover { border-color: ${G.accentBorder}; }
  .quick-icon { font-size: 24px; margin-bottom: 8px; }
  .quick-title { font-size: 13px; font-weight: 700; color: ${G.text}; margin-bottom: 3px; }
  .quick-desc { font-size: 11px; color: ${G.muted}; line-height: 1.4; }

  /* scrollable content area */
  .scroll-area { overflow-y: auto; }
`;

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = {
  home: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M5 10v10a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  search: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  ad: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  copy: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  chart: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  launch: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chevron: (open) => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s'}}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  spark: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z" fill="currentColor"/></svg>,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function scoreColor(n) {
  if (n >= 75) return G.accent;
  if (n >= 50) return G.gold;
  return G.red;
}

function Loader({ label = "Analyzing…" }) {
  return (
    <div className="loader">
      <div className="dot"/><div className="dot"/><div className="dot"/>
      <span>{label}</span>
    </div>
  );
}

function Collapsible({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 12 }}>
      <button className="collapsible-btn" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        {Icon.chevron(open)}
      </button>
      {open && <div className="collapsible-content">{children}</div>}
    </div>
  );
}

function ScoreBar({ label, value }) {
  return (
    <div className="score-row">
      <span className="score-label">{label}</span>
      <div className="score-track">
        <div className="score-fill" style={{ width: `${value}%`, background: scoreColor(value) }} />
      </div>
      <span className="score-num">{value}</span>
    </div>
  );
}

// ── API call ──────────────────────────────────────────────────────────────────
async function callClaude(systemPrompt, userPrompt, onChunk) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
      stream: true,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || "API error");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") continue;
      try {
        const parsed = JSON.parse(data);
        const text = parsed.delta?.text || "";
        if (text) { full += text; onChunk(full); }
      } catch {}
    }
  }
  return full;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════════════════════════════════════════════

// ── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({ setTab }) {
  return (
    <div>
      <div className="hero">
        <span className="hero-icon">⚡</span>
        <h1 className="hero-title">Your <span>eCommerce</span><br/>Operating System</h1>
        <p className="hero-sub">AI-powered product research, ad creation, copywriting & launch planning — all from your phone.</p>
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="announce">
          <span>💡</span>
          <span>Start with <strong>Research</strong> to discover profitable products, then build your ads, copy & launch plan.</span>
        </div>
        <div className="quick-grid">
          {[
            { icon:"🔍", title:"Product Research", desc:"Find winning products with AI scoring", tab:1 },
            { icon:"🎯", title:"Ad Generator", desc:"Scripts, hooks & creative angles", tab:2 },
            { icon:"✍️", title:"Copywriter", desc:"Headlines, body copy & landing pages", tab:3 },
            { icon:"📊", title:"Budget & Launch", desc:"Cost estimates & execution plan", tab:4 },
          ].map(q => (
            <div key={q.tab} className="quick-card" onClick={() => setTab(q.tab)}>
              <div className="quick-icon">{q.icon}</div>
              <div className="quick-title">{q.title}</div>
              <div className="quick-desc">{q.desc}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="label">How it works</div>
          {[
            ["1", "Set your market, budget & goals"],
            ["2", "AI researches & scores products"],
            ["3", "Generate ads, copy & budgets"],
            ["4", "Get your day-by-day launch plan"],
          ].map(([n, t]) => (
            <div key={n} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ width:22, height:22, borderRadius:"50%", background:G.accentDim, border:`1px solid ${G.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:11, color:G.accent, fontWeight:700 }}>{n}</div>
              <span style={{ fontSize:13, color:G.muted, lineHeight:1.5 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── RESEARCH ─────────────────────────────────────────────────────────────────
function ResearchScreen() {
  const STEPS = ["Market", "Discover", "Results"];
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [form, setForm] = useState({
    country: "United States",
    niche: "",
    budget: "",
    platform: "Facebook Ads",
    model: "Dropshipping",
    risk: "Medium",
    goal: "Fast profit",
  });

  const platforms = ["Facebook Ads","TikTok Ads","Instagram Ads","Google Ads","Multi-platform"];
  const models = ["Dropshipping","Local stock","Print on demand","Private label","Affiliate"];
  const risks = ["Low","Medium","Aggressive"];
  const goals = ["Fast profit","Long-term brand","Testing products","High ROI"];

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function run() {
    setLoading(true);
    setStep(2);
    setOutput("");

    const sys = `You are a world-class eCommerce product research expert, market analyst, and profitability strategist. Analyze with extreme precision. Always give realistic, actionable numbers. Format output cleanly with clear headers and emoji icons. Be direct, data-driven, and profitable-obsessed.`;

    const prompt = `RESEARCH REQUEST:
Country/Region: ${form.country}
Niche preference: ${form.niche || "Open — find best opportunities"}
Available budget: ${form.budget || "Not specified"}
Platform: ${form.platform}
Business model: ${form.model}
Risk tolerance: ${form.risk}
Goal: ${form.goal}

Perform a complete product research analysis and return:

🏆 TOP 3 WINNING PRODUCTS
For each product:
• Product name & category
• Why it can win right now
• Target customer profile
• Selling price range & estimated cost
• Gross margin estimate
• Competition level (Low/Med/High)
• Best platform for this product
• Risk level & difficulty

📊 PRODUCT SCORES (rate 1–100 for each):
• Profitability Score
• Virality Score  
• Competition Score (higher = less competition)
• Ease of Selling Score
• Logistics Score
• Brandability Score
• Trend Score
• Overall Winning Probability

💰 PROFITABILITY SNAPSHOT (per product):
• Expected selling price
• Estimated product + shipping cost
• Estimated ad cost per sale (CPA)
• Estimated net profit per unit
• Break-even ROAS
• Expected daily test budget

🧠 CUSTOMER PSYCHOLOGY:
• Top pain points
• Emotional triggers
• Impulse buy factors
• Urgency angles

🎯 BEST OFFER ANGLES (3 per product)

⚠️ RISK ANALYSIS:
• Biggest risks
• How to mitigate

Be extremely specific with numbers. Use realistic ranges.`;

    try {
      await callClaude(sys, prompt, setOutput);
    } catch (e) {
      setOutput(`Error: ${e.message}`);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="section" style={{ paddingBottom: 8 }}>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div key={s} className={`step${i === step ? " active" : i < step ? " done" : ""}`}>{s}</div>
          ))}
        </div>
      </div>

      {step === 0 && (
        <div className="section" style={{ paddingTop: 0 }}>
          <h2 className="section-title">Market Setup</h2>
          <p className="section-sub">Configure your target market & strategy</p>

          <div className="field">
            <label className="field-label">Country / Region</label>
            <input className="input" value={form.country} onChange={e => set("country", e.target.value)} placeholder="e.g. United States, UK, Australia…" />
          </div>
          <div className="field">
            <label className="field-label">Niche Preference <span style={{color:G.muted,fontWeight:400}}>(optional)</span></label>
            <input className="input" value={form.niche} onChange={e => set("niche", e.target.value)} placeholder="e.g. fitness, pets, home decor…" />
          </div>
          <div className="field">
            <label className="field-label">Available Budget</label>
            <input className="input" value={form.budget} onChange={e => set("budget", e.target.value)} placeholder="e.g. $500, $2,000…" />
          </div>
          <div className="field">
            <label className="field-label">Ad Platform</label>
            <div className="chip-group">
              {platforms.map(p => <div key={p} className={`chip${form.platform===p?" active":""}`} onClick={() => set("platform",p)}>{p}</div>)}
            </div>
          </div>
          <div className="field">
            <label className="field-label">Business Model</label>
            <div className="chip-group">
              {models.map(m => <div key={m} className={`chip${form.model===m?" active":""}`} onClick={() => set("model",m)}>{m}</div>)}
            </div>
          </div>
          <div className="field">
            <label className="field-label">Risk Tolerance</label>
            <div className="chip-group">
              {risks.map(r => <div key={r} className={`chip${form.risk===r?" active":""}`} onClick={() => set("risk",r)}>{r}</div>)}
            </div>
          </div>
          <div className="field">
            <label className="field-label">Primary Goal</label>
            <div className="chip-group">
              {goals.map(g => <div key={g} className={`chip${form.goal===g?" active":""}`} onClick={() => set("goal",g)}>{g}</div>)}
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => setStep(1)}>
            {Icon.search} Continue to Discovery
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="section" style={{ paddingTop: 0 }}>
          <h2 className="section-title">Ready to Analyze</h2>
          <p className="section-sub">Your market parameters</p>

          <div className="card card-accent">
            {[
              ["Market", form.country],
              ["Niche", form.niche || "Open"],
              ["Budget", form.budget || "TBD"],
              ["Platform", form.platform],
              ["Model", form.model],
              ["Risk", form.risk],
              ["Goal", form.goal],
            ].map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:10, fontSize:13 }}>
                <span style={{ color:G.muted }}>{k}</span>
                <span style={{ fontWeight:700, color:G.text }}>{v}</span>
              </div>
            ))}
          </div>

          <button className="btn btn-primary" style={{ marginBottom:10 }} onClick={run}>
            {Icon.spark} Run AI Research
          </button>
          <button className="btn btn-ghost" onClick={() => setStep(0)}>← Edit Parameters</button>
        </div>
      )}

      {step === 2 && (
        <div className="section" style={{ paddingTop: 0 }}>
          <h2 className="section-title">Research Results</h2>
          <p className="section-sub">{form.country} · {form.platform} · {form.model}</p>

          {loading && <Loader label="AI researching products…" />}

          {output && (
            <>
              <div className="stream-box">{output}</div>
              {!loading && (
                <button className="btn btn-ghost" style={{marginTop:8}} onClick={() => { setStep(0); setOutput(""); }}>
                  ← New Research
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── ADS ───────────────────────────────────────────────────────────────────────
function AdsScreen() {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [product, setProduct] = useState("");
  const [platform, setPlatform] = useState("Facebook Ads");
  const [angle, setAngle] = useState("Problem/Solution");
  const [audience, setAudience] = useState("");

  const angles = ["Problem/Solution","Emotional","Transformation","Viral","Social Proof","Luxury","Before/After","Scarcity/FOMO","Curiosity"];
  const platforms = ["Facebook Ads","TikTok Ads","Instagram Reels","Google Ads"];
  const tabs = ["Video Script","Static Ad","Ad Angles","Competitor Gaps"];

  async function generate() {
    if (!product.trim()) return;
    setLoading(true);
    setOutput("");

    const sys = `You are a world-class performance creative strategist and media buyer with $50M+ in ad spend experience. You write ads that sell. Be specific, punchy, and conversion-focused.`;

    const typeMap = ["Full Video Ad Script","Static Ad Creative Brief","Multiple Ad Angles","Competitor Gap Analysis & Positioning"];
    const typePrompts = [
      `Generate a complete VIDEO AD SCRIPT for:
Product: ${product}
Platform: ${platform}
Angle: ${angle}
Target audience: ${audience || "broad"}

Include:
🎬 HOOK (first 3 seconds — make it stop-scroll)
📱 SCENE-BY-SCENE BREAKDOWN (5–8 scenes)
🎤 FULL VOICEOVER SCRIPT
📌 CTA (last 5 seconds)
💡 B-ROLL SUGGESTIONS
🎵 MUSIC MOOD

Make it platform-native for ${platform}. Be punchy and specific.`,

      `Generate a STATIC AD CREATIVE BRIEF for:
Product: ${product}
Platform: ${platform}
Angle: ${angle}

Include:
🖼️ IMAGE CONCEPT (describe exactly)
📝 PRIMARY HEADLINE (max 8 words, bold)
🔤 SUBHEADLINE
📍 TEXT PLACEMENT STRATEGY
🎨 COLOR & MOOD DIRECTION
✅ 3 VARIATIONS
💥 WHY THIS WILL CONVERT`,

      `Generate 6 DISTINCT AD ANGLES for:
Product: ${product}
Platform: ${platform}
Target: ${audience || "broad"}

For each angle:
• Angle name & why it works
• Hook line (first sentence)
• Core message
• Emotional trigger being used
• Best audience segment
• Expected performance tier (🔥🔥🔥 / 🔥🔥 / 🔥)`,

      `Perform a COMPETITOR GAP ANALYSIS for:
Product: ${product}
Market: ${platform}

Include:
🕵️ TYPICAL COMPETITOR AD APPROACHES
❌ WHAT COMPETITORS ARE MISSING
✅ YOUR UNIQUE ANGLE OPPORTUNITY
💡 MARKET POSITIONING STRATEGY
🎯 UNDERSERVED AUDIENCE SEGMENTS
🚀 DIFFERENTIATION RECOMMENDATIONS`,
    ];

    try {
      await callClaude(sys, typePrompts[tab], setOutput);
    } catch (e) { setOutput(`Error: ${e.message}`); }
    setLoading(false);
  }

  return (
    <div>
      <div className="section" style={{ paddingBottom: 0 }}>
        <h2 className="section-title">Ad Generator</h2>
        <p className="section-sub">AI-powered creative strategy & scripts</p>

        <div className="field">
          <label className="field-label">Product / Offer</label>
          <textarea className="textarea" value={product} onChange={e => setProduct(e.target.value)} placeholder="Describe your product, its benefits & target customer…" />
        </div>
        <div className="field">
          <label className="field-label">Platform</label>
          <div className="chip-group">
            {platforms.map(p => <div key={p} className={`chip${platform===p?" active":""}`} onClick={() => setPlatform(p)}>{p}</div>)}
          </div>
        </div>
        <div className="field">
          <label className="field-label">Primary Angle</label>
          <div className="chip-group">
            {angles.map(a => <div key={a} className={`chip${angle===a?" active":""}`} onClick={() => setAngle(a)}>{a}</div>)}
          </div>
        </div>
        <div className="field">
          <label className="field-label">Target Audience <span style={{color:G.muted,fontWeight:400}}>(optional)</span></label>
          <input className="input" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. women 25–45, fitness enthusiasts…" />
        </div>

        <div className="tab-row">
          {tabs.map((t,i) => <button key={t} className={`tab${tab===i?" active":""}`} onClick={() => setTab(i)}>{t}</button>)}
        </div>

        <button className="btn btn-primary" style={{marginBottom:16}} onClick={generate} disabled={loading || !product.trim()}>
          {loading ? "Generating…" : `Generate ${tabs[tab]}`}
        </button>
      </div>

      {(loading || output) && (
        <div className="section" style={{ paddingTop: 0 }}>
          {loading && <Loader label="Writing your ads…" />}
          {output && <div className="stream-box">{output}</div>}
        </div>
      )}
    </div>
  );
}

// ── COPY ──────────────────────────────────────────────────────────────────────
function CopyScreen() {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Punchy & Direct");

  const tabs = ["Ad Copy","Landing Page","Product Desc","Email Sequence"];
  const tones = ["Punchy & Direct","Emotional","Luxury","Playful","Urgent","Trust-focused"];

  async function generate() {
    if (!product.trim()) return;
    setLoading(true);
    setOutput("");

    const sys = `You are a top-tier direct response copywriter and conversion rate optimization expert. You write copy that makes people buy. Every word earns its place.`;

    const prompts = [
      `Write HIGH-CONVERTING AD COPY for:
Product: ${product}
Price point: ${price || "not specified"}
Audience: ${audience || "broad"}
Tone: ${tone}

Generate ALL of these:

📣 PRIMARY TEXT (Facebook/Instagram — 3 variations, 50–150 words each)
🔥 HEADLINES (10 options, punchy, benefit-driven)
📝 DESCRIPTIONS (5 options, 1–2 sentences)
🖱️ CTA OPTIONS (8 button copy variations)
💥 POWER HOOKS (5 opening lines)
✅ BULLET POINTS (8 benefit-driven bullets)`,

      `Write a HIGH-CONVERTING LANDING PAGE for:
Product: ${product}
Price: ${price || "TBD"}
Audience: ${audience || "broad"}
Tone: ${tone}

Include:
🎯 HERO HEADLINE + SUBHEADLINE
💥 OPENING HOOK PARAGRAPH
✅ BENEFIT BULLETS (6–8)
📖 STORY/PROBLEM-SOLUTION SECTION
🌟 SOCIAL PROOF SECTION (template)
⚡ URGENCY/SCARCITY SECTION
💰 PRICE ANCHOR & OFFER REVEAL
🔒 TRUST SIGNALS
🛒 CTA SECTION (above & below fold)
❓ FAQ SECTION (5 questions)`,

      `Write a KILLER PRODUCT DESCRIPTION for:
Product: ${product}
Price: ${price || "TBD"}
Tone: ${tone}

Include:
📦 SHORT DESCRIPTION (50 words — for listings)
📝 FULL DESCRIPTION (200 words — SEO + emotion)
✅ FEATURE/BENEFIT LIST (6 items — feature → benefit format)
🎯 WHO THIS IS FOR
⚠️ WHO THIS IS NOT FOR
⭐ REVIEW TEMPLATE PROMPTS
🔍 SEO KEYWORDS TO TARGET`,

      `Write a 5-EMAIL WELCOME + SALES SEQUENCE for:
Product: ${product}
Tone: ${tone}

For each email:
📧 Subject line (+ 2 alternates)
📝 Preview text
✉️ Full email body
🎯 Goal of this email
⏰ Send timing

Emails:
1. Welcome / Brand story
2. Problem agitation
3. Product solution reveal
4. Social proof + FAQ
5. Final urgency + CTA`,
    ];

    try {
      await callClaude(sys, prompts[tab], setOutput);
    } catch (e) { setOutput(`Error: ${e.message}`); }
    setLoading(false);
  }

  return (
    <div>
      <div className="section" style={{ paddingBottom: 0 }}>
        <h2 className="section-title">Copywriter</h2>
        <p className="section-sub">Conversion-optimized copy for every touchpoint</p>

        <div className="field">
          <label className="field-label">Product / Offer</label>
          <textarea className="textarea" value={product} onChange={e => setProduct(e.target.value)} placeholder="Describe your product, its benefits & what problem it solves…" />
        </div>
        <div className="field">
          <label className="field-label">Price Point <span style={{color:G.muted,fontWeight:400}}>(optional)</span></label>
          <input className="input" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. $39.99, $97…" />
        </div>
        <div className="field">
          <label className="field-label">Target Audience <span style={{color:G.muted,fontWeight:400}}>(optional)</span></label>
          <input className="input" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. busy moms, gym-goers, homeowners…" />
        </div>
        <div className="field">
          <label className="field-label">Copy Tone</label>
          <div className="chip-group">
            {tones.map(t => <div key={t} className={`chip${tone===t?" active":""}`} onClick={() => setTone(t)}>{t}</div>)}
          </div>
        </div>

        <div className="tab-row">
          {tabs.map((t,i) => <button key={t} className={`tab${tab===i?" active":""}`} onClick={() => setTab(i)}>{t}</button>)}
        </div>

        <button className="btn btn-primary" style={{marginBottom:16}} onClick={generate} disabled={loading || !product.trim()}>
          {loading ? "Writing…" : `Generate ${tabs[tab]}`}
        </button>
      </div>

      {(loading || output) && (
        <div className="section" style={{ paddingTop: 0 }}>
          {loading && <Loader label="Crafting high-converting copy…" />}
          {output && <div className="stream-box">{output}</div>}
        </div>
      )}
    </div>
  );
}

// ── LAUNCH ────────────────────────────────────────────────────────────────────
function LaunchScreen() {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [product, setProduct] = useState("");
  const [budget, setBudget] = useState("");
  const [platform, setPlatform] = useState("Facebook Ads");
  const [country, setCountry] = useState("United States");
  const [category, setCategory] = useState("");

  const tabs = ["Budget Forecast","Launch Plan","Scaling Strategy","Kill/Win Rules"];
  const platforms = ["Facebook Ads","TikTok Ads","Instagram Ads","Google Ads"];

  async function generate() {
    if (!product.trim()) return;
    setLoading(true);
    setOutput("");

    const sys = `You are a senior media buyer and eCommerce scaling strategist with $100M+ in managed ad spend. You give realistic, battle-tested numbers and strategies. No fluff.`;

    const prompts = [
      `Create a COMPLETE AD BUDGET FORECAST for:
Product: ${product}
Total budget: ${budget || "to be determined"}
Platform: ${platform}
Country: ${country}
Product category: ${category || "general"}

Provide:
💰 RECOMMENDED BUDGET ALLOCATION
• Starting test budget (day 1–3)
• First week total budget
• Testing phase budget (2 weeks)
• Scaling budget thresholds

📊 REALISTIC AD METRICS (provide ranges):
• Expected CPM: $X–$X
• Expected CPC: $X–$X
• Expected CTR: X%–X%
• Expected CVR: X%–X%
• Expected CPA: $X–$X
• Expected ROAS: X–X

💵 PROFITABILITY CALCULATOR:
• Break-even ROAS
• Break-even CPA
• Estimated daily revenue at test budget
• Estimated daily profit/loss at test budget
• When to expect first profitable day

⚠️ BUDGET RISK ASSESSMENT:
• Minimum viable budget to get data
• Budget burn risk analysis
• How to protect downside

📅 WEEK-BY-WEEK BUDGET PLAN (4 weeks)`,

      `Create a COMPLETE DAY-BY-DAY LAUNCH PLAN for:
Product: ${product}
Budget: ${budget || "flexible"}
Platform: ${platform}
Country: ${country}

📋 PRE-LAUNCH CHECKLIST (before day 1)

🗓️ LAUNCH WEEK PLAN:
Day 1: Exact actions, setup, budgets
Day 2: What to check, adjustments
Day 3: First data review, decisions
Day 4: Optimization moves
Day 5: Scale or kill assessment
Day 6: Weekend strategy
Day 7: Week 1 review + Week 2 plan

🎯 TESTING FRAMEWORK:
• Number of ad sets to test
• Audiences to test
• Creatives to test
• Budget per test variable

📈 OPTIMIZATION PHASE (Week 2–3):
What to do when things work
What to do when things don't

Be extremely specific and actionable.`,

      `Create a COMPLETE SCALING STRATEGY for:
Product: ${product}
Platform: ${platform}
Country: ${country}

🚀 SCALING TRIGGERS:
• When to start scaling (exact metrics)
• Minimum ROAS to scale
• Minimum data points needed

📈 HORIZONTAL SCALING:
• New audiences to test
• Lookalike strategy
• Interest expansion playbook

📊 VERTICAL SCALING:
• Budget increase rules (% increments)
• CBO vs ABO strategy
• Bid strategy changes

🌍 MARKET EXPANSION:
• Which countries to add next
• How to adapt creatives
• Budget allocation for new markets

🔄 CREATIVE REFRESH STRATEGY:
• When creatives fatigue
• How often to refresh
• How to iterate on winners

💥 10X SCALING ROADMAP:
From $50/day → $500/day → $5,000/day`,

      `Define the KILL AND WIN CRITERIA for:
Product: ${product}
Platform: ${platform}
Budget: ${budget || "flexible"}

❌ KILL CRITERIA (stop spending immediately):
• Specific metrics that mean cut losses
• Time-based kill rules
• Budget-based kill rules
• Creative kill signals

✅ WINNING CRITERIA (scale aggressively):
• Minimum ROAS threshold
• CPA vs breakeven check
• Frequency & fatigue signals
• Creative winner identification

⚡ DECISION FRAMEWORK:
Day 1–3 check: What numbers = continue?
Day 4–7 check: What numbers = scale?
Week 2 check: What numbers = full scale or kill?

🔁 OPTIMIZATION LOOPS:
• Daily check routine (10 min)
• Weekly review template
• Monthly strategy review

🧠 SPLIT TEST PRIORITY MATRIX:
What to test first, second, third and why`,
    ];

    try {
      await callClaude(sys, prompts[tab], setOutput);
    } catch (e) { setOutput(`Error: ${e.message}`); }
    setLoading(false);
  }

  return (
    <div>
      <div className="section" style={{ paddingBottom: 0 }}>
        <h2 className="section-title">Budget & Launch</h2>
        <p className="section-sub">Forecasts, planning & scaling strategy</p>

        <div className="field">
          <label className="field-label">Product</label>
          <textarea className="textarea" value={product} onChange={e => setProduct(e.target.value)} placeholder="Product name, price point, margins…" style={{minHeight:60}} />
        </div>
        <div className="field">
          <label className="field-label">Available Budget</label>
          <input className="input" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. $500, $2,000…" />
        </div>
        <div className="field">
          <label className="field-label">Target Country</label>
          <input className="input" value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. United States, UK…" />
        </div>
        <div className="field">
          <label className="field-label">Product Category <span style={{color:G.muted,fontWeight:400}}>(optional)</span></label>
          <input className="input" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. fitness, beauty, home…" />
        </div>
        <div className="field">
          <label className="field-label">Platform</label>
          <div className="chip-group">
            {platforms.map(p => <div key={p} className={`chip${platform===p?" active":""}`} onClick={() => setPlatform(p)}>{p}</div>)}
          </div>
        </div>

        <div className="tab-row">
          {tabs.map((t,i) => <button key={t} className={`tab${tab===i?" active":""}`} onClick={() => setTab(i)}>{t}</button>)}
        </div>

        <button className="btn btn-primary" style={{marginBottom:16}} onClick={generate} disabled={loading || !product.trim()}>
          {loading ? "Analyzing…" : `Generate ${tabs[tab]}`}
        </button>
      </div>

      {(loading || output) && (
        <div className="section" style={{ paddingTop: 0 }}>
          {loading && <Loader label="Building your plan…" />}
          {output && <div className="stream-box">{output}</div>}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState(0);

  const navItems = [
    { label: "Home",     icon: Icon.home,   },
    { label: "Research", icon: Icon.search, },
    { label: "Ads",      icon: Icon.ad,     },
    { label: "Copy",     icon: Icon.copy,   },
    { label: "Launch",   icon: Icon.launch, },
  ];

  const screens = [
    <HomeScreen setTab={setTab} />,
    <ResearchScreen />,
    <AdsScreen />,
    <CopyScreen />,
    <LaunchScreen />,
  ];

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <div className="header-inner">
            <div className="logo">ecom<span>OS</span></div>
            <div className="badge">AI POWERED</div>
          </div>
        </div>

        <div className="scroll-area">
          {screens[tab]}
        </div>

        <nav className="nav">
          {navItems.map((n, i) => (
            <button key={n.label} className={`nav-btn${tab===i?" active":""}`} onClick={() => setTab(i)}>
              {n.icon}
              {n.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
