import { Button } from "@repo/design-system/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/design-system/components/ui/hover-card";
import type { Meta, StoryObj } from "@storybook/react";

function HoverCardDemoComponent() {
  return (
    <HoverCard closeDelay={100} openDelay={10}>
      <HoverCardTrigger asChild>
        <Button variant="link">Hover Here</Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-64 flex-col gap-0.5">
        <div className="font-semibold">@nextjs</div>
        <div>The React Framework – created and maintained by @vercel.</div>
        <div className="mt-1 text-muted-foreground text-xs">
          Joined December 2021
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

const HOVER_CARD_SIDES = ["left", "top", "bottom", "right"] as const;

function HoverCardSidesComponent() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {HOVER_CARD_SIDES.map((side) => (
        <HoverCard closeDelay={100} key={side} openDelay={100}>
          <HoverCardTrigger asChild>
            <Button className="capitalize" variant="outline">
              {side}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent side={side}>
            <div className="flex flex-col gap-1">
              <h4 className="font-medium">Hover Card</h4>
              <p>This hover card appears on the {side} side of the trigger.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}

const meta = {
  title: "ui/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => <HoverCardDemoComponent />,
};

export const Sides: Story = {
  render: () => <HoverCardSidesComponent />,
};
