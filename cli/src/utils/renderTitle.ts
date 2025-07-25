import chalk from "chalk";
import gradient from "gradient-string";

export function renderTitle() {
  const title = `
╭─────────────────────────────────────────╮
│                                         │
│   🚀 MF² STACK                          │
│   by Korrect                            │
│                                         │
│   Move F*cking Fast.                    │
│                                         │
╰─────────────────────────────────────────╯
`;

  console.log(gradient.pastel.multiline(title));
  console.log();
}
