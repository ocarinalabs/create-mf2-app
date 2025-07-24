import chalk from "chalk";
import gradient from "gradient-string";

export function renderTitle() {
  const title = `
╭─────────────────────────────────────────╮
│                                         │
│   🚀 STARTDOWN                          │
│   The MF² Stack                         │
│                                         │
│   Move Fast. Ship Faster.               │
│                                         │
╰─────────────────────────────────────────╯
`;

  console.log(gradient.pastel.multiline(title));
  console.log();
}
