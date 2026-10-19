// Builds the two stats cards on the profile README, in a light and a dark version.
// Usage: GITHUB_TOKEN=... node stats/build.mjs <output folder>

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const login = process.env.GITHUB_LOGIN || 'jeffgicharu';
const token = process.env.GITHUB_TOKEN;
const outDir = process.argv[2];
if (!token || !outDir) {
  console.error('Set GITHUB_TOKEN and pass an output folder.');
  process.exit(1);
}

const query = `query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { contributionCount } }
      }
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoriesWithContributedCommits
      restrictedContributionsCount
    }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
      nodes {
        name
        languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
          edges { size node { name color } }
        }
      }
    }
  }
}`;

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: { authorization: `bearer ${token}`, 'content-type': 'application/json', 'user-agent': login },
  body: JSON.stringify({ query, variables: { login } }),
});
const body = await res.json();
if (!res.ok || body.errors || !body.data?.user) {
  console.error('GitHub did not return the data:', res.status, JSON.stringify(body.errors ?? body).slice(0, 500));
  process.exit(1);
}
const { contributionsCollection: cc, repositories } = body.data.user;

// Weekly totals for the bars along the foot of the activity card.
const weeks = cc.contributionCalendar.weeks.map((w) => w.contributionDays.reduce((n, d) => n + d.contributionCount, 0));

// Language sizes summed across public repositories, largest first.
const sizes = new Map();
for (const repo of repositories.nodes) {
  for (const { size, node } of repo.languages.edges) {
    const seen = sizes.get(node.name) ?? { size: 0, color: node.color };
    seen.size += size;
    sizes.set(node.name, seen);
  }
}
const repoCount = repositories.nodes.filter((r) => r.languages.edges.length > 0).length;
const ranked = [...sizes].map(([name, v]) => ({ name, ...v })).sort((a, b) => b.size - a.size);
const totalSize = ranked.reduce((n, l) => n + l.size, 0);
const shown = ranked.slice(0, ranked.length > 8 ? 7 : 8);
const rest = ranked.slice(shown.length).reduce((n, l) => n + l.size, 0);
const languages = shown.map((l) => ({ name: l.name, color: l.color ?? null, share: l.size / totalSize }));
if (rest > 0) languages.push({ name: 'Other', color: null, share: rest / totalSize });

if (cc.contributionCalendar.totalContributions === 0 || languages.length === 0) {
  console.error('The data looks empty, so the cards were not rebuilt.');
  process.exit(1);
}

const fonts = await Promise.all(
  ['geist-400.woff2', 'geist-600.woff2', 'geist-mono-500.woff2'].map((f) =>
    readFile(new URL(`fonts/${f}`, import.meta.url)).then((b) => b.toString('base64')),
  ),
);

const themes = {
  light: { card: '#FFFFFF', rule: '#DDE3EC', track: '#EDF1F7', ink: '#0B1324', ink2: '#354154', mute: '#5B6779', accent: '#1D4ED8', other: '#9AA5B5' },
  dark: { card: '#111A2C', rule: '#1F2A3F', track: '#1A2438', ink: '#EAF0F8', ink2: '#BCC7D8', mute: '#8693A8', accent: '#6AA5FF', other: '#5B6779' },
};

const W = 400;
const H = 200;
const PAD = 24;
const updated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const num = (n) => n.toLocaleString('en-US');

function card(t, title, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t">
<title id="t">${esc(title)}</title>
<style>
@font-face{font-family:"Card Sans";font-weight:400;src:url(data:font/woff2;base64,${fonts[0]}) format("woff2")}
@font-face{font-family:"Card Sans";font-weight:600;src:url(data:font/woff2;base64,${fonts[1]}) format("woff2")}
@font-face{font-family:"Card Mono";font-weight:500;src:url(data:font/woff2;base64,${fonts[2]}) format("woff2")}
text{font-family:"Card Sans",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;fill:${t.ink2};font-size:13px}
.label{font-family:"Card Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-weight:500;font-size:10.5px;letter-spacing:.08em;fill:${t.accent}}
.note{font-family:"Card Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-weight:500;font-size:10.5px;letter-spacing:.04em;fill:${t.mute}}
.big{font-weight:600;font-size:40px;letter-spacing:-.03em;fill:${t.ink}}
.n{font-weight:600;font-size:15px;fill:${t.ink};font-variant-numeric:tabular-nums}
.mute{fill:${t.mute}}
.in{animation:in .7s cubic-bezier(.2,.7,.2,1) backwards}
.up{transform-box:fill-box;transform-origin:50% 100%;animation:up .8s cubic-bezier(.2,.7,.2,1) backwards}
.across{transform-box:fill-box;transform-origin:0 50%;animation:across .9s cubic-bezier(.2,.7,.2,1) backwards}
@keyframes in{from{opacity:0;transform:translateY(6px)}}
@keyframes up{from{transform:scaleY(0)}}
@keyframes across{from{transform:scaleX(0)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="10" fill="${t.card}" stroke="${t.rule}"/>
${content}
</svg>
`;
}

function activityCard(t) {
  const total = cc.contributionCalendar.totalContributions;
  const items = [
    [cc.totalCommitContributions, 'commits'],
    [cc.totalPullRequestContributions, 'pull requests'],
    [cc.totalIssueContributions, 'issues'],
    cc.restrictedContributionsCount > 0
      ? [cc.restrictedContributionsCount, 'in private repositories']
      : [cc.totalRepositoriesWithContributedCommits, 'repositories'],
  ];
  const rows = items
    .map(([n, label], i) => {
      const x = PAD + (i % 2) * 186;
      const y = 120 + Math.floor(i / 2) * 22;
      return `<text x="${x}" y="${y}" class="in" style="animation-delay:${160 + i * 60}ms"><tspan class="n">${num(n)}</tspan><tspan dx="6" class="mute">${esc(label)}</tspan></text>`;
    })
    .join('\n');

  const span = W - PAD * 2;
  const step = span / weeks.length;
  const barW = Math.max(step - 2, 1.5);
  const max = Math.max(...weeks, 1);
  const base = 178;
  const bars = weeks
    .map((n, i) => {
      const x = (PAD + i * step).toFixed(2);
      if (n === 0) return `<rect x="${x}" y="${base - 2}" width="${barW.toFixed(2)}" height="2" rx="1" fill="${t.track}"/>`;
      const h = Math.max(3, (Math.sqrt(n) / Math.sqrt(max)) * 24);
      return `<rect x="${x}" y="${(base - h).toFixed(2)}" width="${barW.toFixed(2)}" height="${h.toFixed(2)}" rx="1" fill="${t.accent}" class="up" style="animation-delay:${300 + i * 8}ms"/>`;
    })
    .join('\n');

  return card(
    t,
    `${num(total)} contributions on GitHub in the last 12 months`,
    `<text x="${PAD}" y="38" class="label">ON GITHUB · LAST 12 MONTHS</text>
<text x="${W - PAD}" y="38" class="note" text-anchor="end">${esc(updated.toUpperCase())}</text>
<text x="${PAD}" y="86" class="in" style="animation-delay:80ms"><tspan class="big">${num(total)}</tspan><tspan dx="10" font-size="15">contributions</tspan></text>
${rows}
${bars}`,
  );
}

function languagesCard(t) {
  const span = W - PAD * 2;
  let x = PAD;
  const segments = languages
    .map((l, i) => {
      const w = l.share * span;
      const seg = `<rect x="${x.toFixed(2)}" y="56" width="${w.toFixed(2)}" height="10" fill="${l.color ?? t.other}" class="across" style="animation-delay:${120 + i * 70}ms"/>`;
      x += w;
      return seg;
    })
    .join('\n');

  const legend = languages
    .map((l, i) => {
      const col = Math.floor(i / 4);
      const lx = PAD + col * 186;
      const y = 100 + (i % 4) * 24;
      const pct = `${(l.share * 100).toFixed(1)}%`;
      return `<g class="in" style="animation-delay:${200 + i * 50}ms"><circle cx="${lx + 5}" cy="${y - 4.5}" r="5" fill="${l.color ?? t.other}"/><text x="${lx + 18}" y="${y}">${esc(l.name)}</text><text x="${lx + 166}" y="${y}" class="mute" text-anchor="end" style="font-variant-numeric:tabular-nums">${pct}</text></g>`;
    })
    .join('\n');

  return card(
    t,
    `Languages across ${repoCount} public repositories: ${languages.map((l) => `${l.name} ${(l.share * 100).toFixed(1)}%`).join(', ')}`,
    `<text x="${PAD}" y="38" class="label">LANGUAGES · PUBLIC CODE</text>
<text x="${W - PAD}" y="38" class="note" text-anchor="end">${repoCount} REPOSITORIES</text>
<clipPath id="bar"><rect x="${PAD}" y="56" width="${span}" height="10" rx="5"/></clipPath>
<rect x="${PAD}" y="56" width="${span}" height="10" rx="5" fill="${t.track}"/>
<g clip-path="url(#bar)">
${segments}
</g>
${legend}`,
  );
}

await mkdir(outDir, { recursive: true });
for (const [name, t] of Object.entries(themes)) {
  await writeFile(join(outDir, `activity-${name}.svg`), activityCard(t));
  await writeFile(join(outDir, `languages-${name}.svg`), languagesCard(t));
}
console.log(`Built the cards: ${num(cc.contributionCalendar.totalContributions)} contributions, ${languages.length} languages.`);
