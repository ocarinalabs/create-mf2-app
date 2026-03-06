import { readdir, unlink } from "node:fs/promises";
import { join } from "node:path";

const SOURCE_DIR = "/Users/faw/Downloads/ui-main/apps/v4/examples/radix";
const TARGET_DIR =
  "/Users/faw/Documents/GitHub/korrect/startdown/apps/cli/template/apps/storybook/stories";

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

const SPECIAL_PREFIXES = ["data-table", "date-picker", "typography"];

const WIDE_GROUPS = new Set([
  "data-table",
  "table",
  "sidebar",
  "navigation-menu",
  "menubar",
  "typography",
  "resizable",
]);

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

const TSX_EXT_RE = /\.tsx$/;
const LEADING_DASH_RE = /^-/;
const IMPORT_START_RE = /^import\s+["']/;
const QUOTED_END_RE = /["']\s*;?\s*$/;
const FROM_STRING_END_RE = /from\s+["'][^"']+["']\s*;?\s*$/;
const OPEN_BRACE_G_RE = /\{/g;
const CLOSE_BRACE_G_RE = /\}/g;
const SIDE_EFFECT_IMPORT_RE = /^import\s+["'](.+?)["']\s*;?\s*$/;
const FROM_SOURCE_RE = /from\s+["'](.+?)["']\s*;?\s*$/;
const WHITESPACE_G_RE = /\s+/g;
const IMPORT_PREFIX_RE = /^import\s+/;
const FROM_SUFFIX_RE = /\s*from\s+["'][^"']+["']\s*;?\s*$/;
const TYPE_PREFIX_RE = /^type\s+/;
const NS_IMPORT_RE = /^\*\s+as\s+(\w+)$/;
const BRACES_CONTENT_RE = /\{([^}]*)\}/;
const BRACES_RE = /\{[^}]*\}/;
const TRAILING_COMMA_RE = /,\s*$/;
const ALIAS_RE = /^(\w+)\s+as\s+(\w+)$/;
const REACT_DOT_G_RE = /React\.(\w+)/g;
const EXPORT_DEFAULT_FUNC_RE = /export\s+default\s+function\s+\w+/;
const EXPORT_FUNC_RE = /export\s+function\s+\w+/;
const DECL_NAME_GM_RE = /^(?:const|let|(?:async\s+)?function)\s+(\w+)/gm;
const FUNC_NAME_GM_RE = /^function\s+(\w+)/gm;
const DOUBLE_NEWLINE_RE = /\n\n+/;

function shouldSkip(filename: string): boolean {
  if (!filename.endsWith(".tsx")) {
    return true;
  }
  if (filename === "mode-toggle.tsx") {
    return true;
  }
  if (filename === "calendar-hijri.tsx") {
    return true;
  }
  if (filename === "date-picker-natural-language.tsx") {
    return true;
  }
  if (filename === "alert-action.tsx") {
    return true;
  }
  if (filename.endsWith("-rtl.tsx")) {
    return true;
  }
  if (filename.startsWith("form-tanstack-")) {
    return true;
  }
  if (filename.startsWith("form-next-")) {
    return true;
  }
  return false;
}

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function getGroup(filename: string): string | null {
  const name = filename.replace(TSX_EXT_RE, "");

  for (const prefix of SPECIAL_PREFIXES) {
    if (name === prefix || name.startsWith(`${prefix}-`)) {
      return prefix;
    }
  }

  for (const comp of COMPONENT_NAMES) {
    if (name === comp || name.startsWith(`${comp}-`)) {
      return comp;
    }
  }

  return null;
}

function getVariant(filename: string, group: string): string {
  const name = filename.replace(TSX_EXT_RE, "");
  const suffix = name.slice(group.length);
  if (!suffix) {
    return "Demo";
  }
  const variant = suffix.replace(LEADING_DASH_RE, "");
  if (!variant) {
    return "Demo";
  }
  return toPascalCase(variant);
}

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
  if (IMPORT_START_RE.test(trimmed) && QUOTED_END_RE.test(trimmed)) {
    return true;
  }
  if (FROM_STRING_END_RE.test(trimmed)) {
    const opens = (trimmed.match(OPEN_BRACE_G_RE) || []).length;
    const closes = (trimmed.match(CLOSE_BRACE_G_RE) || []).length;
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

    if (
      trimmed === "" ||
      trimmed === '"use client"' ||
      trimmed === "'use client'"
    ) {
      i++;
      continue;
    }

    if (trimmed.startsWith("import ")) {
      let stmt = lines[i];

      while (!isImportComplete(stmt) && i + 1 < lines.length) {
        i++;
        stmt += `\n${lines[i]}`;
      }

      importStatements.push(stmt.trim());
      i++;
      continue;
    }

    break;
  }

  const body = lines.slice(i).join("\n");
  return { importStatements, body };
}

function parseImport(raw: string): ParsedImport | null {
  const s = raw.replace(WHITESPACE_G_RE, " ").trim();

  const sideEffectMatch = s.match(SIDE_EFFECT_IMPORT_RE);
  if (sideEffectMatch) {
    return {
      source: sideEffectMatch[1],
      named: [],
      isTypeOnly: false,
      isSideEffect: true,
    };
  }

  const fromMatch = s.match(FROM_SOURCE_RE);
  if (!fromMatch) {
    return null;
  }
  const source = fromMatch[1];

  let specPart = s
    .replace(IMPORT_PREFIX_RE, "")
    .replace(FROM_SUFFIX_RE, "")
    .trim();

  const isTypeOnly = specPart.startsWith("type ");
  if (isTypeOnly) {
    specPart = specPart.replace(TYPE_PREFIX_RE, "");
  }

  const nsMatch = specPart.match(NS_IMPORT_RE);
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

  const bracesMatch = specPart.match(BRACES_CONTENT_RE);
  const bracesContent = bracesMatch ? bracesMatch[1] : "";

  const beforeBraces = specPart
    .replace(BRACES_RE, "")
    .replace(TRAILING_COMMA_RE, "")
    .trim();
  if (beforeBraces) {
    defaultName = beforeBraces.replace(TRAILING_COMMA_RE, "").trim();
    if (defaultName === "") {
      defaultName = undefined;
    }
  }

  if (bracesContent) {
    const parts = bracesContent
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    for (const part of parts) {
      const isTypeImport = part.startsWith("type ");
      const cleanPart = isTypeImport ? part.replace(TYPE_PREFIX_RE, "") : part;
      const aliasMatch = cleanPart.match(ALIAS_RE);
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
  if (source.startsWith("@/examples/radix/ui/")) {
    return source.replace(
      "@/examples/radix/ui/",
      "@repo/design-system/components/ui/"
    );
  }
  if (source.startsWith("@/registry/new-york-v4/ui/")) {
    return source.replace(
      "@/registry/new-york-v4/ui/",
      "@repo/design-system/components/ui/"
    );
  }
  if (source === "@/registry/icons/__lucide__") {
    return "lucide-react";
  }
  if (source === "@/examples/radix/lib/utils" || source === "@/lib/utils") {
    return "@repo/design-system/lib/utils";
  }
  if (
    source === "@/hooks/use-media-query" ||
    source === "@/hooks/use-copy-to-clipboard" ||
    source === "@/examples/radix/hooks/use-mobile" ||
    source === "@/registry/new-york-v4/hooks/use-mobile"
  ) {
    return "SKIP";
  }
  if (source === "@/components/language-selector") {
    return "SKIP";
  }
  return source;
}

function renderImport(pi: ParsedImport): string {
  if (pi.isSideEffect) {
    return `import "${pi.source}";`;
  }

  if (pi.namespaceName && !pi.defaultName && pi.named.length === 0) {
    if (pi.isTypeOnly) {
      return `import type * as ${pi.namespaceName} from "${pi.source}";`;
    }
    return `import * as ${pi.namespaceName} from "${pi.source}";`;
  }

  const segments: string[] = [];
  if (pi.defaultName) {
    segments.push(pi.defaultName);
  }

  if (pi.named.length > 0) {
    const allType = pi.named.every((n) => n.isType);
    const names = pi.named.map((n) => {
      const typePrefix = !allType && n.isType ? "type " : "";
      return n.alias
        ? `${typePrefix}${n.name} as ${n.alias}`
        : `${typePrefix}${n.name}`;
    });

    const namedStr =
      names.length > 3
        ? `{\n  ${names.join(",\n  ")},\n}`
        : `{ ${names.join(", ")} }`;

    if (allType && !pi.defaultName) {
      return `import type ${namedStr} from "${pi.source}";`;
    }

    segments.push(namedStr);
  }

  return `import ${segments.join(", ")} from "${pi.source}";`;
}

function mergeImportGroup(source: string, group: ParsedImport[]): ParsedImport {
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
        existing.isType = false;
      }
    }
  }

  merged.named = Array.from(namedMap.values());
  return merged;
}

function mergeImports(imports: ParsedImport[]): ParsedImport[] {
  const grouped = new Map<string, ParsedImport[]>();
  for (const imp of imports) {
    const key = imp.source;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)?.push(imp);
  }

  const result: ParsedImport[] = [];
  for (const [source, group] of grouped) {
    if (group.length === 1) {
      result.push(group[0]);
      continue;
    }
    result.push(mergeImportGroup(source, group));
  }

  return result;
}

function transformReactNamespace(body: string): {
  body: string;
  values: Set<string>;
  types: Set<string>;
} {
  const values = new Set<string>();
  const types = new Set<string>();

  for (const match of body.matchAll(REACT_DOT_G_RE)) {
    const name = match[1];
    if (REACT_TYPES.has(name)) {
      types.add(name);
    } else {
      values.add(name);
    }
  }

  const transformed = body.replace(REACT_DOT_G_RE, "$1");
  return { body: transformed, values, types };
}

function deduplicateSegments(bodies: string[]): string[] {
  const seen = new Set<string>();
  return bodies.map((body) => {
    const segments = body.split(DOUBLE_NEWLINE_RE);
    const unique: string[] = [];
    for (const seg of segments) {
      const trimmed = seg.trim();
      if (trimmed === "") {
        continue;
      }
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

type StoryEntry = {
  variant: string;
  funcName: string;
  body: string;
};

type HookFlags = {
  needsMediaQuery: boolean;
  needsIsMobile: boolean;
  needsCopyToClipboard: boolean;
};

function processExampleImports(
  importStatements: string[],
  allImports: ParsedImport[],
  hooks: HookFlags
): void {
  for (const raw of importStatements) {
    const parsed = parseImport(raw);
    if (!parsed) {
      continue;
    }
    if (parsed.namespaceName === "React" && parsed.source === "react") {
      continue;
    }
    if (parsed.source === "@/hooks/use-media-query") {
      hooks.needsMediaQuery = true;
      continue;
    }
    if (
      parsed.source === "@/examples/radix/hooks/use-mobile" ||
      parsed.source === "@/registry/new-york-v4/hooks/use-mobile"
    ) {
      hooks.needsIsMobile = true;
      continue;
    }
    if (parsed.source === "@/hooks/use-copy-to-clipboard") {
      hooks.needsCopyToClipboard = true;
      continue;
    }
    const newSource = transformImportSource(parsed.source);
    if (newSource === "SKIP") {
      continue;
    }
    parsed.source = newSource;
    allImports.push(parsed);
  }
}

function disambiguateDeclarations(stories: StoryEntry[]): void {
  const declNameCounts = new Map<string, number>();
  for (const story of stories) {
    for (const m of story.body.matchAll(DECL_NAME_GM_RE)) {
      if (m[1] !== story.funcName) {
        declNameCounts.set(m[1], (declNameCounts.get(m[1]) || 0) + 1);
      }
    }
  }
  for (const [name, count] of declNameCounts) {
    if (count <= 1) {
      continue;
    }
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
}

function deduplicateVariantNames(stories: StoryEntry[]): void {
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
}

function buildReactImport(
  reactValues: Set<string>,
  reactTypes: Set<string>,
  hooks: HookFlags
): ParsedImport | null {
  const needsHooks =
    hooks.needsMediaQuery || hooks.needsIsMobile || hooks.needsCopyToClipboard;
  if (reactValues.size === 0 && reactTypes.size === 0 && !needsHooks) {
    return null;
  }
  const named: NamedImport[] = [];
  for (const v of reactValues) {
    named.push({ name: v, isType: false });
  }
  for (const t of reactTypes) {
    named.push({ name: t, isType: true });
  }
  if (needsHooks) {
    if (!reactValues.has("useState")) {
      named.push({ name: "useState", isType: false });
    }
    if (
      (hooks.needsMediaQuery || hooks.needsIsMobile) &&
      !reactValues.has("useEffect")
    ) {
      named.push({ name: "useEffect", isType: false });
    }
  }
  return { source: "react", named, isTypeOnly: false, isSideEffect: false };
}

function collectImportedValueNames(merged: ParsedImport[]): Set<string> {
  const names = new Set<string>();
  for (const imp of merged) {
    if (imp.defaultName) {
      names.add(imp.defaultName);
    }
    for (const n of imp.named) {
      if (!n.isType) {
        names.add(n.alias || n.name);
      }
    }
  }
  return names;
}

function renameConflictingBodyFunctions(
  stories: StoryEntry[],
  importNames: Set<string>
): void {
  for (const story of stories) {
    for (const m of story.body.matchAll(FUNC_NAME_GM_RE)) {
      const name = m[1];
      if (name === story.funcName) {
        continue;
      }
      if (importNames.has(name)) {
        const newName = `Custom${name}`;
        story.body = story.body.replaceAll(
          new RegExp(`\\b${name}\\b`, "g"),
          newName
        );
      }
    }
  }
}

function resolveVariantNameConflicts(
  stories: StoryEntry[],
  merged: ParsedImport[],
  group: string
): void {
  const reservedNames = collectImportedValueNames(merged);
  reservedNames.add("meta");
  reservedNames.add("Story");

  for (const story of stories) {
    for (const m of story.body.matchAll(FUNC_NAME_GM_RE)) {
      if (m[1] !== story.funcName) {
        reservedNames.add(m[1]);
      }
    }
  }

  const groupPascal = toPascalCase(group);
  for (const story of stories) {
    if (!reservedNames.has(story.variant)) {
      continue;
    }
    const prefixed = `${groupPascal}${story.variant}`;
    story.variant = reservedNames.has(prefixed)
      ? `${story.variant}Example`
      : prefixed;
  }
}

function findPrimaryComponent(
  group: string,
  merged: ParsedImport[]
): string | null {
  if (SPECIAL_PREFIXES.includes(group)) {
    return null;
  }
  const uiSource = `@repo/design-system/components/ui/${group}`;
  for (const imp of merged) {
    if (imp.source === uiSource) {
      const valueImport = imp.named.find((n) => !n.isType);
      if (valueImport) {
        return valueImport.alias || valueImport.name;
      }
    }
  }
  return null;
}

function buildStoryFileContent(
  group: string,
  merged: ParsedImport[],
  stories: StoryEntry[],
  hooks: HookFlags,
  primaryComponent: string | null
): string {
  const layout = WIDE_GROUPS.has(group) ? "padded" : "centered";
  const title = `ui/${toPascalCase(group)}`;
  const parts: string[] = [];

  for (const imp of merged) {
    parts.push(renderImport(imp));
  }
  parts.push("");

  if (hooks.needsMediaQuery) {
    parts.push(USE_MEDIA_QUERY_HOOK);
    parts.push("");
  }
  if (hooks.needsIsMobile) {
    parts.push(USE_IS_MOBILE_HOOK);
    parts.push("");
  }
  if (hooks.needsCopyToClipboard) {
    parts.push(USE_COPY_TO_CLIPBOARD_HOOK);
    parts.push("");
  }

  for (const story of stories) {
    parts.push(story.body);
    parts.push("");
  }

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
  parts.push("type Story = StoryObj<typeof meta>;");
  parts.push("");

  for (const story of stories) {
    parts.push(`export const ${story.variant}: Story = {
  render: () => <${story.funcName} />,
};`);
    parts.push("");
  }

  return parts.join("\n");
}

async function generateStoryFile(
  group: string,
  exampleFiles: string[]
): Promise<void> {
  const allImports: ParsedImport[] = [];
  const stories: StoryEntry[] = [];
  const hooks: HookFlags = {
    needsMediaQuery: false,
    needsIsMobile: false,
    needsCopyToClipboard: false,
  };
  const reactValues = new Set<string>();
  const reactTypes = new Set<string>();

  for (const file of exampleFiles.sort()) {
    const variant = getVariant(file, group);
    const funcName = `${toPascalCase(group)}${variant}Component`;
    const content = await Bun.file(join(SOURCE_DIR, file)).text();
    const { importStatements, body } = splitImportsAndBody(content);

    processExampleImports(importStatements, allImports, hooks);

    const reactResult = transformReactNamespace(body);
    let processedBody = reactResult.body;
    for (const v of reactResult.values) {
      reactValues.add(v);
    }
    for (const t of reactResult.types) {
      reactTypes.add(t);
    }

    processedBody = processedBody.replace(
      EXPORT_DEFAULT_FUNC_RE,
      `function ${funcName}`
    );
    processedBody = processedBody.replace(
      EXPORT_FUNC_RE,
      `function ${funcName}`
    );
    stories.push({ variant, funcName, body: processedBody.trim() });
  }

  disambiguateDeclarations(stories);

  const dedupedBodies = deduplicateSegments(stories.map((s) => s.body));
  for (let i = 0; i < stories.length; i++) {
    stories[i].body = dedupedBodies[i];
  }

  deduplicateVariantNames(stories);

  const reactImport = buildReactImport(reactValues, reactTypes, hooks);
  if (reactImport) {
    allImports.push(reactImport);
  }

  allImports.push({
    source: "@storybook/react",
    named: [
      { name: "Meta", isType: true },
      { name: "StoryObj", isType: true },
    ],
    isTypeOnly: false,
    isSideEffect: false,
  });

  const merged = mergeImports(allImports);
  const importNames = collectImportedValueNames(merged);
  renameConflictingBodyFunctions(stories, importNames);
  resolveVariantNameConflicts(stories, merged, group);

  const primaryComponent = findPrimaryComponent(group, merged);
  const output = buildStoryFileContent(
    group,
    merged,
    stories,
    hooks,
    primaryComponent
  );

  const filename = `${group}.stories.tsx`;
  await Bun.write(join(TARGET_DIR, filename), output);
  console.log(`Generated ${filename} (${stories.length} stories)`);
}

async function main() {
  console.log("Reading source examples...");
  const files = await readdir(SOURCE_DIR);
  const exampleFiles = files.filter(
    (f) => f.endsWith(".tsx") && !shouldSkip(f)
  );
  console.log(`Found ${exampleFiles.length} example files`);

  const groups = new Map<string, string[]>();
  const skipped: string[] = [];

  for (const file of exampleFiles) {
    const group = getGroup(file);
    if (!group) {
      skipped.push(file);
      continue;
    }
    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group)?.push(file);
  }

  if (skipped.length > 0) {
    console.log(`Skipped ${skipped.length} files with no group match:`);
    for (const f of skipped) {
      console.log(`  - ${f}`);
    }
  }

  console.log(`\nGrouped into ${groups.size} component groups`);

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

  console.log("\nGenerating new story files...");
  let totalStories = 0;

  for (const [group, groupFiles] of [...groups.entries()].sort()) {
    await generateStoryFile(group, groupFiles);
    totalStories += groupFiles.length;
  }

  console.log(
    `\nDone! Generated ${groups.size} story files with ${totalStories} total stories`
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
