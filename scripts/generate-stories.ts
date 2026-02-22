import { readdir, unlink } from "node:fs/promises";
import { join } from "node:path";

// ──────────────────────────────────────────────────────────────────────────────
// Configuration
// ──────────────────────────────────────────────────────────────────────────────

const SOURCE_DIR =
  "/Users/faw/Downloads/ui-main/apps/v4/examples/radix";
const TARGET_DIR =
  "/Users/faw/Documents/GitHub/korrect/startdown/apps/cli/template/apps/storybook/stories";

// Design-system component names sorted by length descending for longest-prefix matching
const COMPONENT_NAMES = [
  "navigation-menu",
  "dropdown-menu",
  "native-select",
  "context-menu",
  "alert-dialog",
  "aspect-ratio",
  "button-group",
  "toggle-group",
  "input-group",
  "radio-group",
  "scroll-area",
  "collapsible",
  "breadcrumb",
  "pagination",
  "hover-card",
  "resizable",
  "accordion",
  "separator",
  "direction",
  "input-otp",
  "checkbox",
  "carousel",
  "calendar",
  "textarea",
  "skeleton",
  "progress",
  "combobox",
  "menubar",
  "command",
  "spinner",
  "tooltip",
  "sidebar",
  "popover",
  "toggle",
  "switch",
  "slider",
  "sonner",
  "dialog",
  "drawer",
  "select",
  "button",
  "avatar",
  "alert",
  "badge",
  "label",
  "empty",
  "field",
  "chart",
  "sheet",
  "table",
  "input",
  "tabs",
  "card",
  "form",
  "item",
  "kbd",
];

// Special groups that don't directly map to a single design-system component file
const SPECIAL_PREFIXES = ["data-table", "date-picker", "typography"];

// Components that need wider layout in Storybook
const WIDE_GROUPS = new Set([
  "data-table",
  "table",
  "sidebar",
  "navigation-menu",
  "menubar",
  "typography",
  "resizable",
]);

// React type exports (used to distinguish type vs value imports when converting React namespace)
const REACT_TYPES = new Set([
  "CSSProperties",
  "ComponentProps",
  "ComponentPropsWithoutRef",
  "ComponentPropsWithRef",
  "ReactNode",
  "ReactElement",
  "HTMLAttributes",
  "ComponentType",
  "PropsWithChildren",
  "FormEvent",
  "MouseEvent",
  "ChangeEvent",
  "KeyboardEvent",
  "RefObject",
  "Ref",
  "Dispatch",
  "SetStateAction",
  "FC",
  "ForwardedRef",
  "MutableRefObject",
  "SVGProps",
  "InputHTMLAttributes",
  "TextareaHTMLAttributes",
  "ButtonHTMLAttributes",
  "SelectHTMLAttributes",
  "FormHTMLAttributes",
  "AnchorHTMLAttributes",
  "ElementRef",
  "JSX",
]);

// ──────────────────────────────────────────────────────────────────────────────
// Utility functions
// ──────────────────────────────────────────────────────────────────────────────

function shouldSkip(filename: string): boolean {
  if (!filename.endsWith(".tsx")) return true;
  if (filename === "mode-toggle.tsx") return true;
  if (filename === "calendar-hijri.tsx") return true; // Requires next/font/google
  if (filename === "date-picker-natural-language.tsx") return true; // Requires chrono-node
  if (filename === "alert-action.tsx") return true; // AlertAction not in design-system
  if (filename.endsWith("-rtl.tsx")) return true; // RTL variants use ui-rtl/ path
  if (filename.startsWith("form-tanstack-")) return true;
  if (filename.startsWith("form-next-")) return true;
  return false;
}

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function getGroup(filename: string): string | null {
  const name = filename.replace(/\.tsx$/, "");

  // Check special prefixes first (before component matching)
  for (const prefix of SPECIAL_PREFIXES) {
    if (name === prefix || name.startsWith(`${prefix}-`)) return prefix;
  }

  // Longest-prefix match against component names
  for (const comp of COMPONENT_NAMES) {
    if (name === comp || name.startsWith(`${comp}-`)) return comp;
  }

  return null;
}

function getVariant(filename: string, group: string): string {
  const name = filename.replace(/\.tsx$/, "");
  const suffix = name.slice(group.length);
  if (!suffix) return "Demo";
  const variant = suffix.replace(/^-/, "");
  if (!variant) return "Demo";
  return toPascalCase(variant);
}

// ──────────────────────────────────────────────────────────────────────────────
// Import parsing
// ──────────────────────────────────────────────────────────────────────────────

type NamedImport = {
  name: string;
  alias?: string;
  isType: boolean;
};

type ParsedImport = {
  source: string;
  defaultName?: string;
  namespaceName?: string;
  named: NamedImport[];
  isTypeOnly: boolean;
  isSideEffect: boolean;
};

function isImportComplete(stmt: string): boolean {
  const trimmed = stmt.trim();
  // Side effect: import "foo"
  if (/^import\s+["']/.test(trimmed) && /["']\s*;?\s*$/.test(trimmed))
    return true;
  // Has 'from' keyword with a string at end
  if (/from\s+["'][^"']+["']\s*;?\s*$/.test(trimmed)) {
    const opens = (trimmed.match(/\{/g) || []).length;
    const closes = (trimmed.match(/\}/g) || []).length;
    return opens === closes;
  }
  return false;
}

function splitImportsAndBody(content: string): {
  importStatements: string[];
  body: string;
} {
  const lines = content.split("\n");
  const importStatements: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    // Skip empty lines and "use client" directive
    if (
      trimmed === "" ||
      trimmed === '"use client"' ||
      trimmed === "'use client'"
    ) {
      i++;
      continue;
    }

    // Check if this is an import line
    if (trimmed.startsWith("import ")) {
      let stmt = lines[i];

      // Collect multi-line imports
      while (!isImportComplete(stmt) && i + 1 < lines.length) {
        i++;
        stmt += `\n${lines[i]}`;
      }

      importStatements.push(stmt.trim());
      i++;
      continue;
    }

    // Hit non-import content - body starts here
    break;
  }

  const body = lines.slice(i).join("\n");
  return { importStatements, body };
}

function parseImport(raw: string): ParsedImport | null {
  // Normalize to single line for parsing
  const s = raw.replace(/\s+/g, " ").trim();

  // Side-effect import: import "source"
  const sideEffectMatch = s.match(/^import\s+["'](.+?)["']\s*;?\s*$/);
  if (sideEffectMatch) {
    return {
      source: sideEffectMatch[1],
      named: [],
      isTypeOnly: false,
      isSideEffect: true,
    };
  }

  // Extract source
  const fromMatch = s.match(/from\s+["'](.+?)["']\s*;?\s*$/);
  if (!fromMatch) return null;
  const source = fromMatch[1];

  // Remove "import" prefix and "from 'source'" suffix
  let specPart = s
    .replace(/^import\s+/, "")
    .replace(/\s*from\s+["'][^"']+["']\s*;?\s*$/, "")
    .trim();

  // Check if type-only import
  const isTypeOnly = specPart.startsWith("type ");
  if (isTypeOnly) specPart = specPart.replace(/^type\s+/, "");

  // Namespace import: * as NS
  const nsMatch = specPart.match(/^\*\s+as\s+(\w+)$/);
  if (nsMatch) {
    return {
      source,
      namespaceName: nsMatch[1],
      named: [],
      isTypeOnly,
      isSideEffect: false,
    };
  }

  let defaultName: string | undefined;
  const named: NamedImport[] = [];

  // Extract braces content
  const bracesMatch = specPart.match(/\{([^}]*)\}/);
  const bracesContent = bracesMatch ? bracesMatch[1] : "";

  // Get part before braces (default import)
  const beforeBraces = specPart
    .replace(/\{[^}]*\}/, "")
    .replace(/,\s*$/, "")
    .trim();
  if (beforeBraces) {
    defaultName = beforeBraces.replace(/,\s*$/, "").trim();
    if (defaultName === "") defaultName = undefined;
  }

  // Parse named imports from braces
  if (bracesContent) {
    const parts = bracesContent
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    for (const part of parts) {
      const isTypeImport = part.startsWith("type ");
      const cleanPart = isTypeImport ? part.replace(/^type\s+/, "") : part;
      const aliasMatch = cleanPart.match(/^(\w+)\s+as\s+(\w+)$/);
      if (aliasMatch) {
        named.push({
          name: aliasMatch[1],
          alias: aliasMatch[2],
          isType: isTypeOnly || isTypeImport,
        });
      } else {
        named.push({ name: cleanPart, isType: isTypeOnly || isTypeImport });
      }
    }
  }

  return {
    source,
    defaultName,
    named,
    isTypeOnly,
    isSideEffect: false,
  };
}

function transformImportSource(source: string): string | "SKIP" {
  // Radix docs examples: @/examples/radix/ui/{x}
  if (source.startsWith("@/examples/radix/ui/")) {
    return source.replace(
      "@/examples/radix/ui/",
      "@repo/design-system/components/ui/"
    );
  }
  // Registry examples (some radix files reference these): @/registry/new-york-v4/ui/{x}
  if (source.startsWith("@/registry/new-york-v4/ui/")) {
    return source.replace(
      "@/registry/new-york-v4/ui/",
      "@repo/design-system/components/ui/"
    );
  }
  // Lucide icon re-exports
  if (source === "@/registry/icons/__lucide__") {
    return "lucide-react";
  }
  // Lib utils
  if (
    source === "@/examples/radix/lib/utils" ||
    source === "@/lib/utils"
  ) {
    return "@repo/design-system/lib/utils";
  }
  // Hooks that need to be inlined
  if (
    source === "@/hooks/use-media-query" ||
    source === "@/hooks/use-copy-to-clipboard" ||
    source === "@/examples/radix/hooks/use-mobile" ||
    source === "@/registry/new-york-v4/hooks/use-mobile"
  ) {
    return "SKIP";
  }
  // Language selector (only used in RTL, which we skip)
  if (source === "@/components/language-selector") {
    return "SKIP";
  }
  return source;
}

function renderImport(pi: ParsedImport): string {
  if (pi.isSideEffect) return `import "${pi.source}";`;

  if (pi.namespaceName && !pi.defaultName && pi.named.length === 0) {
    if (pi.isTypeOnly) {
      return `import type * as ${pi.namespaceName} from "${pi.source}";`;
    }
    return `import * as ${pi.namespaceName} from "${pi.source}";`;
  }

  const segments: string[] = [];
  if (pi.defaultName) segments.push(pi.defaultName);

  if (pi.named.length > 0) {
    const allType = pi.named.every((n) => n.isType);
    const names = pi.named.map((n) => {
      const typePrefix = !allType && n.isType ? "type " : "";
      return n.alias
        ? `${typePrefix}${n.name} as ${n.alias}`
        : `${typePrefix}${n.name}`;
    });

    const namedStr = names.length > 3
      ? `{\n  ${names.join(",\n  ")},\n}`
      : `{ ${names.join(", ")} }`;

    if (allType && !pi.defaultName) {
      return `import type ${namedStr} from "${pi.source}";`;
    }

    segments.push(namedStr);
  }

  return `import ${segments.join(", ")} from "${pi.source}";`;
}

function mergeImports(imports: ParsedImport[]): ParsedImport[] {
  const grouped = new Map<string, ParsedImport[]>();
  for (const imp of imports) {
    const key = imp.source;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(imp);
  }

  const result: ParsedImport[] = [];
  for (const [source, group] of grouped) {
    if (group.length === 1) {
      result.push(group[0]);
      continue;
    }

    const merged: ParsedImport = {
      source,
      named: [],
      isTypeOnly: false,
      isSideEffect: false,
    };

    const namedMap = new Map<string, NamedImport>();

    for (const imp of group) {
      if (imp.isSideEffect) {
        merged.isSideEffect = true;
        continue;
      }
      if (imp.defaultName && !merged.defaultName) {
        merged.defaultName = imp.defaultName;
      }
      if (imp.namespaceName && !merged.namespaceName) {
        merged.namespaceName = imp.namespaceName;
      }
      for (const n of imp.named) {
        const existing = namedMap.get(n.name);
        if (!existing) {
          namedMap.set(n.name, { ...n });
        } else if (!n.isType) {
          // If any import says value, it's a value import
          existing.isType = false;
        }
      }
    }

    merged.named = Array.from(namedMap.values());
    result.push(merged);
  }

  return result;
}

// ──────────────────────────────────────────────────────────────────────────────
// React namespace transformation
// ──────────────────────────────────────────────────────────────────────────────

function transformReactNamespace(body: string): {
  body: string;
  values: Set<string>;
  types: Set<string>;
} {
  const values = new Set<string>();
  const types = new Set<string>();

  const reactPattern = /React\.(\w+)/g;
  let match: RegExpExecArray | null;
  while ((match = reactPattern.exec(body)) !== null) {
    const name = match[1];
    if (REACT_TYPES.has(name)) {
      types.add(name);
    } else {
      values.add(name);
    }
  }

  const transformed = body.replace(/React\.(\w+)/g, "$1");
  return { body: transformed, values, types };
}

// ──────────────────────────────────────────────────────────────────────────────
// useMediaQuery inline hook
// ──────────────────────────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────────────────────
// Body deduplication
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Deduplicate body segments across multiple story bodies in the same group.
 * Splits each body at double-newline boundaries, and if the exact same segment
 * (trimmed) has been seen before, removes it. This handles cases where two
 * examples in the same group define the same type/const (e.g., combobox-popover
 * and combobox-responsive both define `type Status` and `const statuses`).
 */
function deduplicateSegments(bodies: string[]): string[] {
  const seen = new Set<string>();
  return bodies.map((body) => {
    const segments = body.split(/\n\n+/);
    const unique: string[] = [];
    for (const seg of segments) {
      const trimmed = seg.trim();
      if (trimmed === "") continue;
      // Only deduplicate type/const declarations, not function bodies
      const isDeclaration =
        trimmed.startsWith("type ") || trimmed.startsWith("const ");
      if (isDeclaration && seen.has(trimmed)) {
        continue;
      }
      if (isDeclaration) {
        seen.add(trimmed);
      }
      unique.push(seg);
    }
    return unique.join("\n\n");
  });
}

const USE_MEDIA_QUERY_HOOK = `function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }
    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);
    return () => result.removeEventListener("change", onChange);
  }, [query]);
  return value;
}`;

const USE_IS_MOBILE_HOOK = `function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = matchMedia("(max-width: 767px)");
    function onChange() {
      setIsMobile(window.innerWidth < 768);
    }
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < 768);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}`;

const USE_COPY_TO_CLIPBOARD_HOOK = `function useCopyToClipboard({
  timeout = 2000,
}: { timeout?: number } = {}) {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) return;
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
    });
  };
  return { isCopied, copyToClipboard };
}`;

// ──────────────────────────────────────────────────────────────────────────────
// Story generation
// ──────────────────────────────────────────────────────────────────────────────

type StoryEntry = {
  variant: string;
  funcName: string;
  body: string;
};

async function generateStoryFile(
  group: string,
  exampleFiles: string[]
): Promise<void> {
  const allImports: ParsedImport[] = [];
  const stories: StoryEntry[] = [];
  let needsMediaQuery = false;
  let needsIsMobile = false;
  let needsCopyToClipboard = false;
  const reactValues = new Set<string>();
  const reactTypes = new Set<string>();

  // Process each example file
  for (const file of exampleFiles.sort()) {
    const variant = getVariant(file, group);
    const groupPascal = toPascalCase(group);
    const funcName = `${groupPascal}${variant}Component`;

    const content = await Bun.file(join(SOURCE_DIR, file)).text();
    const { importStatements, body } = splitImportsAndBody(content);

    // Process imports
    for (const raw of importStatements) {
      const parsed = parseImport(raw);
      if (!parsed) continue;

      // Handle React namespace import - skip it, we'll add named imports
      if (parsed.namespaceName === "React" && parsed.source === "react") {
        continue;
      }

      // Handle hooks that need to be inlined
      if (parsed.source === "@/hooks/use-media-query") {
        needsMediaQuery = true;
        continue;
      }
      if (
        parsed.source === "@/examples/radix/hooks/use-mobile" ||
        parsed.source === "@/registry/new-york-v4/hooks/use-mobile"
      ) {
        needsIsMobile = true;
        continue;
      }
      if (parsed.source === "@/hooks/use-copy-to-clipboard") {
        needsCopyToClipboard = true;
        continue;
      }

      // Transform import source
      const newSource = transformImportSource(parsed.source);
      if (newSource === "SKIP") continue;
      parsed.source = newSource;

      allImports.push(parsed);
    }

    // Transform React.X usages in body
    const reactResult = transformReactNamespace(body);
    let processedBody = reactResult.body;
    for (const v of reactResult.values) reactValues.add(v);
    for (const t of reactResult.types) reactTypes.add(t);

    // Rename exported function (both `export default function X` and `export function X`)
    processedBody = processedBody.replace(
      /export\s+default\s+function\s+\w+/,
      `function ${funcName}`
    );
    processedBody = processedBody.replace(
      /export\s+function\s+\w+/,
      `function ${funcName}`
    );

    stories.push({ variant, funcName, body: processedBody.trim() });
  }

  // Disambiguate duplicate declarations across bodies
  // (e.g., 10 form-rhf examples each define `const formSchema`, or sidebar examples define `function NavProjects`)
  const declNameCounts = new Map<string, number>();
  for (const story of stories) {
    const declMatches = [
      ...story.body.matchAll(/^(?:const|let|(?:async\s+)?function)\s+(\w+)/gm),
    ];
    for (const m of declMatches) {
      // Skip the main component function (already unique)
      if (m[1] === story.funcName) continue;
      declNameCounts.set(m[1], (declNameCounts.get(m[1]) || 0) + 1);
    }
  }
  // For any declaration appearing more than once, rename with variant suffix
  for (const [name, count] of declNameCounts) {
    if (count <= 1) continue;
    for (const story of stories) {
      if (
        story.body.match(
          new RegExp(`^(?:const|let|(?:async\\s+)?function)\\s+${name}\\b`, "m")
        )
      ) {
        const newName = `${name}${story.variant}`;
        story.body = story.body.replaceAll(
          new RegExp(`\\b${name}\\b`, "g"),
          newName
        );
      }
    }
  }

  // Deduplicate body segments (removes duplicate type/const declarations across files)
  const dedupedBodies = deduplicateSegments(stories.map((s) => s.body));
  for (let i = 0; i < stories.length; i++) {
    stories[i].body = dedupedBodies[i];
  }

  // Handle duplicate variant names
  const variantCounts = new Map<string, number>();
  for (const story of stories) {
    variantCounts.set(
      story.variant,
      (variantCounts.get(story.variant) || 0) + 1
    );
  }
  const variantSeen = new Map<string, number>();
  for (const story of stories) {
    const count = variantCounts.get(story.variant) || 0;
    if (count > 1) {
      const seen = (variantSeen.get(story.variant) || 0) + 1;
      variantSeen.set(story.variant, seen);
      if (seen > 1) {
        story.variant = `${story.variant}${seen}`;
      }
    }
  }

  // Add React named imports if needed
  const needsHooks = needsMediaQuery || needsIsMobile || needsCopyToClipboard;
  if (reactValues.size > 0 || reactTypes.size > 0 || needsHooks) {
    const named: NamedImport[] = [];
    for (const v of reactValues) {
      named.push({ name: v, isType: false });
    }
    for (const t of reactTypes) {
      named.push({ name: t, isType: true });
    }
    // Ensure useState and useEffect are available for inlined hooks
    if (needsHooks) {
      if (!reactValues.has("useState")) {
        named.push({ name: "useState", isType: false });
      }
      if ((needsMediaQuery || needsIsMobile) && !reactValues.has("useEffect")) {
        named.push({ name: "useEffect", isType: false });
      }
    }
    allImports.push({
      source: "react",
      named,
      isTypeOnly: false,
      isSideEffect: false,
    });
  }

  // Add storybook imports
  allImports.push({
    source: "@storybook/react",
    named: [
      { name: "Meta", isType: true },
      { name: "StoryObj", isType: true },
    ],
    isTypeOnly: false,
    isSideEffect: false,
  });

  // Merge imports
  const merged = mergeImports(allImports);

  // Rename body-level functions that conflict with imported names
  // (e.g., calendar-hijri defines a local `Calendar` that shadows the import)
  const importNames = new Set<string>();
  for (const imp of merged) {
    if (imp.defaultName) importNames.add(imp.defaultName);
    for (const n of imp.named) {
      if (!n.isType) importNames.add(n.alias || n.name);
    }
  }
  for (const story of stories) {
    const funcMatches = [...story.body.matchAll(/^function\s+(\w+)/gm)];
    for (const m of funcMatches) {
      const name = m[1];
      if (name === story.funcName) continue;
      if (importNames.has(name)) {
        const newName = `Custom${name}`;
        story.body = story.body.replaceAll(
          new RegExp(`\\b${name}\\b`, "g"),
          newName
        );
      }
    }
  }

  // Resolve story name conflicts with imported names and body function names
  const reservedNames = new Set<string>();
  for (const imp of merged) {
    if (imp.defaultName) reservedNames.add(imp.defaultName);
    for (const n of imp.named) {
      if (!n.isType) reservedNames.add(n.alias || n.name);
    }
  }
  // Also add "meta" and "Story" to avoid conflicts with our own declarations
  reservedNames.add("meta");
  reservedNames.add("Story");

  // Collect helper function names from bodies (non-component functions)
  for (const story of stories) {
    const helperFuncs = story.body.matchAll(/^function\s+(\w+)/gm);
    for (const m of helperFuncs) {
      if (m[1] !== story.funcName) {
        reservedNames.add(m[1]);
      }
    }
  }

  const groupPascal = toPascalCase(group);
  for (const story of stories) {
    if (reservedNames.has(story.variant)) {
      // Try {Group}{Variant} first
      const prefixed = `${groupPascal}${story.variant}`;
      if (!reservedNames.has(prefixed)) {
        story.variant = prefixed;
      } else {
        // Fall back to {Variant}Example
        story.variant = `${story.variant}Example`;
      }
    }
  }

  // Determine primary component for meta
  const isSpecial = SPECIAL_PREFIXES.includes(group);
  let primaryComponent: string | null = null;

  if (!isSpecial) {
    const uiSource = `@repo/design-system/components/ui/${group}`;
    for (const imp of merged) {
      if (imp.source === uiSource) {
        // Use the first non-type named import as the component
        const valueImport = imp.named.find((n) => !n.isType);
        if (valueImport) {
          primaryComponent = valueImport.alias || valueImport.name;
          break;
        }
      }
    }
  }

  const layout = WIDE_GROUPS.has(group) ? "padded" : "centered";
  const title = `ui/${toPascalCase(group)}`;

  // Build file content
  const parts: string[] = [];

  // Imports section
  for (const imp of merged) {
    parts.push(renderImport(imp));
  }
  parts.push("");

  // Inline hooks if needed
  if (needsMediaQuery) {
    parts.push(USE_MEDIA_QUERY_HOOK);
    parts.push("");
  }
  if (needsIsMobile) {
    parts.push(USE_IS_MOBILE_HOOK);
    parts.push("");
  }
  if (needsCopyToClipboard) {
    parts.push(USE_COPY_TO_CLIPBOARD_HOOK);
    parts.push("");
  }

  // Component bodies
  for (const story of stories) {
    parts.push(story.body);
    parts.push("");
  }

  // Meta block
  if (primaryComponent) {
    parts.push(`const meta = {
  title: "${title}",
  component: ${primaryComponent},
  tags: ["autodocs"],
  parameters: { layout: "${layout}" },
} satisfies Meta<typeof ${primaryComponent}>;`);
  } else {
    parts.push(`const meta = {
  title: "${title}",
  tags: ["autodocs"],
  parameters: { layout: "${layout}" },
} satisfies Meta;`);
  }
  parts.push("");

  parts.push("export default meta;");
  parts.push(
    primaryComponent
      ? "type Story = StoryObj<typeof meta>;"
      : "type Story = StoryObj<typeof meta>;"
  );
  parts.push("");

  // Story exports
  for (const story of stories) {
    parts.push(`export const ${story.variant}: Story = {
  render: () => <${story.funcName} />,
};`);
    parts.push("");
  }

  const output = parts.join("\n");
  const filename = `${group}.stories.tsx`;
  await Bun.write(join(TARGET_DIR, filename), output);
  console.log(
    `Generated ${filename} (${stories.length} stories)`
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Reading source examples...");
  const files = await readdir(SOURCE_DIR);
  const exampleFiles = files.filter(
    (f) => f.endsWith(".tsx") && !shouldSkip(f)
  );
  console.log(`Found ${exampleFiles.length} example files`);

  // Group by component
  const groups = new Map<string, string[]>();
  const skipped: string[] = [];

  for (const file of exampleFiles) {
    const group = getGroup(file);
    if (!group) {
      skipped.push(file);
      continue;
    }
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(file);
  }

  if (skipped.length > 0) {
    console.log(`Skipped ${skipped.length} files with no group match:`);
    for (const f of skipped) console.log(`  - ${f}`);
  }

  console.log(`\nGrouped into ${groups.size} component groups`);

  // Delete existing stories
  console.log("\nDeleting existing story files...");
  const existing = await readdir(TARGET_DIR);
  let deleted = 0;
  for (const file of existing) {
    if (file.endsWith(".stories.tsx")) {
      await unlink(join(TARGET_DIR, file));
      deleted++;
    }
  }
  console.log(`Deleted ${deleted} existing story files`);

  // Generate new stories
  console.log("\nGenerating new story files...");
  let totalStories = 0;

  for (const [group, groupFiles] of [...groups.entries()].sort()) {
    await generateStoryFile(group, groupFiles);
    totalStories += groupFiles.length;
  }

  console.log(`\nDone! Generated ${groups.size} story files with ${totalStories} total stories`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
