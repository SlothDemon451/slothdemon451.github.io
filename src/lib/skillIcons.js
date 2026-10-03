/* Maps technology labels (skills list and project tech stacks) to icon glyphs.
   Lookup is tolerant: "React.js", "React 19" and "React" all resolve to the same icon. */
import {
  siJavascript, siTypescript, siPython, siPhp, siCplusplus, siMysql, siHtml5, siCss,
  siReact, siNextdotjs, siVite, siTailwindcss, siBootstrap, siRedux, siShadcnui, siChakraui,
  siFramer, siGsap, siNodedotjs, siExpress, siFastapi, siGraphql, siLaravel, siCodeigniter,
  siElectron, siPostgresql, siMongodb, siFirebase, siRedis, siKnexdotjs, siDocker, siLinux,
  siLanggraph, siGooglecloud, siElevenlabs, siCloudflare, siGithubactions, siStripe, siPaypal,
  siWordpress, siShopify, siWebflow, siFigma, siGit, siJupyter,
  siJquery, siSocketdotio, siMui, siReactquery, siExpo, siGooglemaps, siCloudinary, siRust,
  siCelery, siLucide, siJsonwebtokens, siElementor, siChartdotjs, siMaplibre, siWhatsapp, siI18next,
  siPuppeteer, siGooglechrome, siRadixui,
  siValorant, siDota2, siCounterstrike, siBattledotnet, siRockstargames, siEa,
} from 'simple-icons';
import callOfDutyLogo from '../assets/icons/call-of-duty.svg';
import forzaHorizonLogo from '../assets/icons/forza-horizon.svg';
import tekken8Logo from '../assets/icons/tekken-8.png';

/* Logos that are not in Simple Icons, loaded as image files from src/assets/icons.
   `wordmark: true` means the logo is a full wordmark and replaces the chip text. */
const IMAGES = {
  'call of duty': { src: callOfDutyLogo, wordmark: true },
  'forza horizon': { src: forzaHorizonLogo, wordmark: false },
  'tekken 8': { src: tekken8Logo, wordmark: true },
};

/* Neutral glyphs on the same 24px grid for things with no brand mark. */
const MUTED = '8A98A8';
const CUSTOM = {
  sparkle: { hex: '74AA9C', path: 'M12 2l1.8 5.7L19.5 9.5l-5.7 1.8L12 17l-1.8-5.7L4.5 9.5l5.7-1.8L12 2zm7 11l.9 2.6 2.6.9-2.6.9L19 20l-.9-2.6-2.6-.9 2.6-.9L19 13zM5 14l.7 2 2 .7-2 .7L5 19.5l-.7-2.1-2-.7 2-.7L5 14z' },
  cloud: { hex: 'FF9900', path: 'M18.5 19H7a5 5 0 0 1-.9-9.92A6 6 0 0 1 17.7 9.1 4.5 4.5 0 0 1 18.5 19zm0-7a2.5 2.5 0 0 0-1.2.3l-.9.5-.2-1A4 4 0 0 0 8.4 11l-.1.8-.8.1A3 3 0 0 0 7 17h11.5a2.5 2.5 0 0 0 0-5z' },
  mail: { hex: MUTED, path: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.2V18h16V7.2l-8 5.3-8-5.3zM5.4 7l6.6 4.4L18.6 7H5.4z' },
  plug: { hex: MUTED, path: 'M9 2h2v5h2V2h2v5h2v3a5 5 0 0 1-4 4.9V22h-2v-7.1A5 5 0 0 1 7 10V7h2V2zm0 7v1a3 3 0 0 0 6 0V9H9z' },
  shield: { hex: MUTED, path: 'M12 2l8 3v6c0 5.2-3.4 9.4-8 11-4.6-1.6-8-5.8-8-11V5l8-3zm0 2.2L6 6.4v4.6c0 4 2.5 7.4 6 8.8 3.5-1.4 6-4.8 6-8.8V6.4l-6-2.2zm-1 9.3l-2.3-2.3-1.4 1.4L11 16.3l6-6-1.4-1.4-4.6 4.6z' },
  server: { hex: MUTED, path: 'M4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v3h14V5H5zm-1 9h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1zm1 2v3h14v-3H5zm1-10h2v1H6V6zm0 11h2v1H6v-1z' },
  search: { hex: MUTED, path: 'M10 2a8 8 0 1 1-4.9 14.3l-3.4 3.4-1.4-1.4 3.4-3.4A8 8 0 0 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z' },
  printer: { hex: MUTED, path: 'M6 2h12v6h2a2 2 0 0 1 2 2v7h-4v5H6v-5H2v-7a2 2 0 0 1 2-2h2V2zm2 2v4h8V4H8zm0 12v4h8v-4H8zm-4-6v5h2v-3h12v3h2v-5H4z' },
  file: { hex: MUTED, path: 'M6 2h8l6 6v14H6V2zm2 2v16h10V9h-5V4H8zm2 8h6v2h-6v-2zm0 4h6v2h-6v-2z' },
  rocket: { hex: MUTED, path: 'M21 3c-4 0-8 2-11 5l-1 1H5l-3 3 4 1 1 1 1 4 3-3v-4l1-1c3-3 5-7 5-11h4zm-6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM5 16l3 3-2 2H3v-3l2-2z' },
  layout: { hex: MUTED, path: 'M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v4h16V5H4zm0 6v8h5v-8H4zm7 0v8h9v-8h-9z' },
};

/* Relative luminance of a hex colour, 0..1 */
function luminance(hex) {
  const n = parseInt(hex, 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

/* Brand colours that vanish on the dark panel are swapped for a light neutral. */
function toIcon(icon) {
  const color = luminance(icon.hex) < 0.08 ? '#d8dee7' : `#${icon.hex}`;
  return { path: icon.path, color };
}

/* Keys are the normalised form produced by normalise() below. */
const MAP = {
  /* languages */
  javascript: siJavascript, typescript: siTypescript, python: siPython, php: siPhp,
  'c/c++': siCplusplus, 'c++': siCplusplus, sql: siMysql, html5: siHtml5, html: siHtml5,
  css3: siCss, css: siCss, 'css animations': siCss, rust: siRust,

  /* frontend */
  react: siReact, 'react native': siReact, next: siNextdotjs, vite: siVite,
  'tailwind css': siTailwindcss, tailwind: siTailwindcss, bootstrap: siBootstrap,
  redux: siRedux, 'redux toolkit': siRedux, 'shadcn ui': siShadcnui, 'chakra ui': siChakraui,
  'material ui': siMui, mui: siMui, 'react query': siReactquery, 'framer motion': siFramer,
  gsap: siGsap, jquery: siJquery, chart: siChartdotjs, 'lucide icons': siLucide,
  'responsive ui': CUSTOM.layout, 'maplibre gl': siMaplibre, i18next: siI18next,
  'next-intl': siNextdotjs, 'expo router': siExpo, 'radix ui': siRadixui, 'gluestack ui': CUSTOM.layout,
  'expo notifications': siExpo, 'react native maps': siGooglemaps,

  /* backend */
  node: siNodedotjs, express: siExpress, fastapi: siFastapi, graphql: siGraphql,
  laravel: siLaravel, codeigniter: siCodeigniter, 'socket.io': siSocketdotio,
  websockets: CUSTOM.plug, 'rest api': CUSTOM.plug, 'rest apis': CUSTOM.plug,
  jwt: siJsonwebtokens, nodemailer: CUSTOM.mail, celery: siCelery,
  mailcow: CUSTOM.mail, postmark: CUSTOM.mail, postfix: CUSTOM.mail, dovecot: CUSTOM.mail,
  rspamd: CUSTOM.shield, 'spf / dkim / dmarc': CUSTOM.shield, 'linux vps': siLinux,
  'speakeasy 2fa': CUSTOM.shield, 'azure msal': CUSTOM.shield,

  /* desktop, data, infra */
  electron: siElectron, expo: siExpo, postgresql: siPostgresql, mysql: siMysql,
  mongodb: siMongodb, firebase: siFirebase, redis: siRedis, knex: siKnexdotjs,
  docker: siDocker, linux: siLinux, cloudinary: siCloudinary, cloudflare: siCloudflare,
  'ci/cd': siGithubactions, 'github actions': siGithubactions, vps: CUSTOM.server,
  'vps deployment': CUSTOM.server, 'esc/pos': CUSTOM.printer, dompdf: CUSTOM.file,

  /* ai and cloud */
  'gpt-4 / llm integration': CUSTOM.sparkle, 'gpt-4': CUSTOM.sparkle, 'gpt-4o-mini': CUSTOM.sparkle,
  'openai api': CUSTOM.sparkle, 'vector embeddings': CUSTOM.sparkle, langgraph: siLanggraph,
  'vertex ai': siGooglecloud, 'google cloud platform': siGooglecloud, gcp: siGooglecloud,
  'eleven labs': siElevenlabs, aws: CUSTOM.cloud, 'aws s3': CUSTOM.cloud,
  'google maps api': siGooglemaps,

  /* payments and third-party apis */
  stripe: siStripe, paypal: siPaypal, 'redsys 3d apis': CUSTOM.plug, 'redsys api': CUSTOM.plug,
  'mrw api': CUSTOM.plug, 'plutu sdk': CUSTOM.plug, 'monday.com api': CUSTOM.plug,
  'whatsapp integration': siWhatsapp, 'whatsapp web': siWhatsapp, whatsapp: siWhatsapp,
  puppeteer: siPuppeteer, chromium: siGooglechrome,

  /* cms and tools */
  wordpress: siWordpress, 'custom themes & plugins': siWordpress, 'custom php theme': siWordpress,
  'custom plugin': siWordpress, 'custom post types': siWordpress, 'wp rocket': CUSTOM.rocket,
  elementor: siElementor, shopify: siShopify, 'shopify apps': siShopify, liquid: siShopify,
  'theme customizer': CUSTOM.layout, seo: CUSTOM.search, webflow: siWebflow, figma: siFigma,
  git: siGit, jupyter: siJupyter,

  /* off the clock */
  valorant: siValorant, 'dota 2': siDota2, 'counter-strike 2': siCounterstrike,
  overwatch: siBattledotnet, 'battlefield 6': siEa, 'gta v': siRockstargames,
  'red dead redemption 2': siRockstargames,
};

/** "React.js" -> "react", "CodeIgniter (PHP)" -> "codeigniter" */
function normalise(label) {
  return label
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')       // drop parentheticals
    .replace(/\.js\b/g, '')          // React.js -> React
    .replace(/\s+/g, ' ')
    .trim();
}

/** Candidate keys, most specific first: "react 19" -> ["react 19", "react"]; "dota 2" stays "dota 2". */
function candidates(label) {
  const exact = normalise(label);
  const versionless = exact.replace(/\s+\d+(\.\d+)?$/, '');
  return versionless !== exact ? [exact, versionless] : [exact];
}

/**
 * Returns one of:
 *   { kind: 'path', path, color }          inline SVG glyph
 *   { kind: 'image', src, wordmark }       image file; wordmark replaces the label
 *   null                                   no icon
 */
export function getSkillIcon(label) {
  for (const key of candidates(label)) {
    if (IMAGES[key]) return { kind: 'image', ...IMAGES[key] };
    if (MAP[key]) return { kind: 'path', ...toIcon(MAP[key]) };
  }
  return null;
}
