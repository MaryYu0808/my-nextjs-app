
// ProcurementAI data helpers (v1.0)
async function loadJSON(path){
  // Preferred: fetch JSON (works when served via HTTP)
  try{
    const res = await fetch(path, {cache: "no-store"});
    if(res.ok) return await res.json();
  }catch(e){
    // ignore and fallback
  }

  // Fallback for local preview (file://) where fetch often fails:
  // We load JS-wrapped datasets that attach to window.*
  const map = {
    "assets/data/tools.v1.0.json": {script:"assets/data/tools.v1.0.js", var:"__PAI_TOOLS"},
    "assets/data/categories.v1.0.json": {script:"assets/data/categories.v1.0.js", var:"__PAI_CATEGORIES"},
    "assets/data/use_cases.v1.0.json": {script:"assets/data/use_cases.v1.0.js", var:"__PAI_USE_CASES"},
    "assets/data/companies.v1.0.json": {script:"assets/data/companies.v1.0.js", var:"__PAI_COMPANIES"},

    // v7.12+ optional operational/content overlays (empty by default)
    "assets/data/claims.v1.0.json": {script:"assets/data/claims.v1.0.js", var:"__PAI_CLAIMS"},
    "assets/data/placements.v1.0.json": {script:"assets/data/placements.v1.0.js", var:"__PAI_PLACEMENTS"},
    "assets/data/use_case_content.v1.0.json": {script:"assets/data/use_case_content.v1.0.js", var:"__PAI_USE_CASE_CONTENT"},
    "assets/data/category_content.v1.0.json": {script:"assets/data/category_content.v1.0.js", var:"__PAI_CATEGORY_CONTENT"}
  };

  const entry = map[path];
  if(entry){
    // If already loaded, return immediately
    if(window[entry.var]) return window[entry.var];

    // Dynamically inject script
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = entry.script;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
    if(window[entry.var]) return window[entry.var];
  }

  throw new Error(`Failed to load dataset: ${path}`);
}

function qs(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function esc(s){
  return String(s ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function toSlug(s){
  return String(s).toLowerCase()
    .replace(/&/g,'and')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'');
}


function formatDate(iso){
  if(!iso) return "—";
  try{
    const d = new Date(iso);
    if(isNaN(d.getTime())) return String(iso);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth()+1).padStart(2,"0");
    const day = String(d.getUTCDate()).padStart(2,"0");
    return `${y}-${m}-${day}`;
  }catch(e){
    return String(iso);
  }
}

function uniq(arr){ return Array.from(new Set(arr)); }

function badge(text){
  return `<span class="badge">${esc(text)}</span>`;
}

function renderToolCard(t){
  // Works for both Tool-level and Company-level objects.
  // Company-level v11.3 uses:
  // - tool_name = company name
  // - tool_slug = company slug
  // - key_modules[] (optional)
  const name = t.tool_name || t.vendor_name || "—";
  const slug = toSlug(t.tool_slug || name);
  const isCompany = Array.isArray(t.key_modules) && t.key_modules.length;
  const href = isCompany ? `company/${slug}/index.html` : `tool/${slug}/index.html`;

  // Keep card density consistent at scale:
  // - show up to 3 use cases, then "+N more".
  const ucTags  = (t.use_cases || []);
  const shown = ucTags.slice(0,3);
  const remaining = Math.max(0, ucTags.length - shown.length);
  const tags = shown.map(badge).join("") + (remaining ? badge(`+${remaining} more`) : "");

  const logo = t.logo_url ? `<img class="tool-logo" src="${esc(t.logo_url)}" alt="${esc(name)} logo" onerror="this.style.display='none'">` : "";
  const metaLeft = esc(t.primary_category || "—");
  const metaMid  = esc(t.automation_level || "—");
  const metaRight = esc(t.headquarters || "—");
  const desc = esc(t.short_description || t.one_liner || "");

  return `
    <a class="tool-card" href="${href}">
      <div class="tool-card-top">
        ${logo}
        <div class="tool-card-title">
          <div class="tool-name">${esc(name)}</div>
          <div class="tool-meta">${metaLeft} • ${metaMid} • ${metaRight}</div>
        </div>
      </div>
      <div class="tool-one-liner">${desc}</div>
      <div class="tool-badges">${tags}</div>
    </a>
  `;
}

