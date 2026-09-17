import assert from "node:assert/strict";
import { extractClientFacts, mergeClientMemory } from "./ai-memory";

const facts = extractClientFacts(
  "I run a bakery in Harare. I need a modern website with a gallery, menu, contact details and WhatsApp ordering."
);

assert.ok(facts.businessType, "business type should be extracted");
assert.ok(facts.requirements?.length, "requirements should be extracted");
assert.ok(facts.businessType!.toLowerCase().includes("bakery"));
assert.ok(facts.requirements!.some((item) => item.toLowerCase().includes("gallery")));
assert.ok(facts.requirements!.some((item) => item.toLowerCase().includes("whatsapp")));

const merged = mergeClientMemory(
  { businessType: "bakery", requirements: ["gallery"] },
  { businessType: "bakery", requirements: ["gallery", "WhatsApp ordering"], preferences: { city: "Harare" } }
);

assert.equal(merged.businessType, "bakery");
assert.ok(merged.requirements.includes("WhatsApp ordering"));
console.log("ai-memory tests passed");
