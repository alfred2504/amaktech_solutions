import fs from "node:fs/promises";
import path from "node:path";

export type ClientMemory = {
  businessType?: string;
  location?: string;
  requirements: string[];
  preferences: Record<string, string>;
  notes: string[];
  lastUpdated: string;
};

const MEMORY_DIRECTORY = path.join(process.cwd(), "data");
const MEMORY_FILE_PATH = path.join(MEMORY_DIRECTORY, "client-memory.json");

const KNOWN_REQUIREMENT_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: "website", regex: /website|site|web page|landing page|business website/i },
  { label: "portfolio", regex: /portfolio/i },
  { label: "ecommerce", regex: /e-commerce|online store|shop|sell online|checkout/i },
  { label: "gallery", regex: /gallery|photo gallery|portfolio gallery/i },
  { label: "menu", regex: /menu/i },
  { label: "contact details", regex: /contact details|contact information|phone number|email address/i },
  { label: "WhatsApp ordering", regex: /whatsapp|wa ordering|whats app/i },
  { label: "branding", regex: /logo|branding|brand identity|business card|flyer|poster/i },
  { label: "resume", regex: /cv|resume|curriculum vitae/i },
  { label: "software", regex: /software|app|application|dashboard|system|platform/i },
  { label: "AI solution", regex: /ai assistant|ai-powered|automation|ai tool|chatbot/i },
  { label: "mobile friendly", regex: /mobile[- ]friendly|responsive website|mobile responsive/i },
];

const BUSINESS_TYPE_PATTERNS: Array<{ type: string; regex: RegExp }> = [
  { type: "bakery", regex: /bakery|cake shop|pastry shop/i },
  { type: "restaurant", regex: /restaurant|cafe|food business/i },
  { type: "clinic", regex: /clinic|hospital|health center|medical practice/i },
  { type: "school", regex: /school|college|academy|institution/i },
  { type: "agency", regex: /agency|marketing agency|design studio|creative studio/i },
  { type: "construction", regex: /construction|building|contracting|architecture/i },
  { type: "real estate", regex: /real estate|property|estate agency/i },
  { type: "fashion", regex: /fashion|boutique|clothing store/i },
  { type: "personal brand", regex: /personal brand|portfolio|freelancer|consultant/i },
  { type: "startup", regex: /startup|business|company/i },
];

function dedupe(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function extractClientFacts(message: string): Partial<ClientMemory> {
  const text = normalizeText(message || "");

  if (!text) {
    return {
      requirements: [],
      preferences: {},
      notes: [],
      lastUpdated: new Date().toISOString(),
    };
  }

  const businessType =
    BUSINESS_TYPE_PATTERNS.find(({ regex }) => regex.test(text))?.type || undefined;

  const locationMatch = text.match(/\b(?:in|from|near|at)\s+([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)*)/);
  const location = locationMatch?.[1] || undefined;

  const requirements = dedupe(
    KNOWN_REQUIREMENT_PATTERNS.filter(({ regex }) => regex.test(text)).map(({ label }) => label)
  );

  const preferences: Record<string, string> = {};

  if (/whatsapp|WhatsApp/i.test(text)) {
    preferences.whatsapp = "WhatsApp contact or ordering";
  }

  if (/mobile[- ]friendly|responsive/i.test(text)) {
    preferences.mobileFriendly = "mobile-friendly / responsive layout";
  }

  if (/modern|premium|professional/i.test(text)) {
    preferences.style = "modern, professional look";
  }

  const notes = [
    ...(/\b(?:need|needs|looking for|want|wants|require|requires)\b[^.]+/gi.test(text)
      ? [text]
      : []),
  ];

  return {
    businessType,
    location,
    requirements,
    preferences,
    notes,
    lastUpdated: new Date().toISOString(),
  };
}

export function mergeClientMemory(
  existing: Partial<ClientMemory> = {},
  incoming: Partial<ClientMemory> = {}
): ClientMemory {
  const next: ClientMemory = {
    businessType: incoming.businessType || existing.businessType,
    location: incoming.location || existing.location,
    requirements: dedupe([
      ...(existing.requirements || []),
      ...(incoming.requirements || []),
    ]),
    preferences: {
      ...(existing.preferences || {}),
      ...(incoming.preferences || {}),
    },
    notes: dedupe([
      ...(existing.notes || []),
      ...(incoming.notes || []),
    ]),
    lastUpdated: new Date().toISOString(),
  };

  return next;
}

async function ensureMemoryFile(): Promise<void> {
  await fs.mkdir(MEMORY_DIRECTORY, { recursive: true });

  try {
    await fs.access(MEMORY_FILE_PATH);
  } catch {
    const emptyMemory: ClientMemory = {
      requirements: [],
      preferences: {},
      notes: [],
      lastUpdated: new Date().toISOString(),
    };

    await fs.writeFile(MEMORY_FILE_PATH, JSON.stringify(emptyMemory, null, 2), "utf8");
  }
}

export async function loadClientMemory(): Promise<ClientMemory> {
  await ensureMemoryFile();

  const raw = await fs.readFile(MEMORY_FILE_PATH, "utf8");

  if (!raw.trim()) {
    return {
      requirements: [],
      preferences: {},
      notes: [],
      lastUpdated: new Date().toISOString(),
    };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ClientMemory>;

    return {
      businessType: parsed.businessType || undefined,
      location: parsed.location || undefined,
      requirements: dedupe(parsed.requirements || []),
      preferences: parsed.preferences || {},
      notes: dedupe(parsed.notes || []),
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    };
  } catch {
    return {
      requirements: [],
      preferences: {},
      notes: [],
      lastUpdated: new Date().toISOString(),
    };
  }
}

export async function saveClientMemory(memory: ClientMemory): Promise<ClientMemory> {
  const safeMemory: ClientMemory = {
    businessType: memory.businessType || undefined,
    location: memory.location || undefined,
    requirements: dedupe(memory.requirements || []),
    preferences: memory.preferences || {},
    notes: dedupe(memory.notes || []),
    lastUpdated: memory.lastUpdated || new Date().toISOString(),
  };

  await ensureMemoryFile();
  await fs.writeFile(MEMORY_FILE_PATH, JSON.stringify(safeMemory, null, 2), "utf8");

  return safeMemory;
}

export async function rememberClientMessage(message: string): Promise<ClientMemory> {
  const existing = await loadClientMemory();
  const incoming = extractClientFacts(message);
  const merged = mergeClientMemory(existing, incoming);

  return saveClientMemory(merged);
}

export function buildMemoryContext(memory: Partial<ClientMemory>): string {
  if (!memory || (!memory.businessType && !memory.location && !memory.requirements?.length && !Object.keys(memory.preferences || {}).length)) {
    return "No stored client memory yet.";
  }

  const parts: string[] = [];

  if (memory.businessType) {
    parts.push(`Business type: ${memory.businessType}`);
  }

  if (memory.location) {
    parts.push(`Location: ${memory.location}`);
  }

  if (memory.requirements?.length) {
    parts.push(`Known requirements: ${memory.requirements.join(", ")}`);
  }

  if (memory.preferences && Object.keys(memory.preferences).length) {
    parts.push(`Preferences: ${Object.entries(memory.preferences).map(([key, value]) => `${key}: ${value}`).join("; ")}`);
  }

  if (memory.notes?.length) {
    parts.push(`Notes: ${memory.notes.slice(0, 2).join(" | ")}`);
  }

  return `Known client context:\n- ${parts.join("\n- ")}`;
}
