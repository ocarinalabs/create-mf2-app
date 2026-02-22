import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@repo/design-system/components/ui/field";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@repo/design-system/components/ui/toggle-group";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Bold,
  BoldIcon,
  Italic,
  ItalicIcon,
  Underline,
  UnderlineIcon,
} from "lucide-react";
import { useState } from "react";

function ToggleGroupDemoComponent() {
  return (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle strikethrough" value="strikethrough">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function ToggleGroupDisabledComponent() {
  return (
    <ToggleGroup disabled type="multiple">
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle strikethrough" value="strikethrough">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function ToggleGroupFontWeightSelectorComponent() {
  const [fontWeight, setFontWeight] = useState("normal");
  return (
    <Field>
      <FieldLabel>Font Weight</FieldLabel>
      <ToggleGroup
        onValueChange={(value) => setFontWeight(value)}
        size="lg"
        spacing={2}
        type="single"
        value={fontWeight}
        variant="outline"
      >
        <ToggleGroupItem
          aria-label="Light"
          className="flex size-16 flex-col items-center justify-center rounded-xl"
          value="light"
        >
          <span className="font-light text-2xl leading-none">Aa</span>
          <span className="text-muted-foreground text-xs">Light</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Normal"
          className="flex size-16 flex-col items-center justify-center rounded-xl"
          value="normal"
        >
          <span className="font-normal text-2xl leading-none">Aa</span>
          <span className="text-muted-foreground text-xs">Normal</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Medium"
          className="flex size-16 flex-col items-center justify-center rounded-xl"
          value="medium"
        >
          <span className="font-medium text-2xl leading-none">Aa</span>
          <span className="text-muted-foreground text-xs">Medium</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Bold"
          className="flex size-16 flex-col items-center justify-center rounded-xl"
          value="bold"
        >
          <span className="font-bold text-2xl leading-none">Aa</span>
          <span className="text-muted-foreground text-xs">Bold</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <FieldDescription>
        Use{" "}
        <code className="rounded-md bg-muted px-1 py-0.5 font-mono">
          font-{fontWeight}
        </code>{" "}
        to set the font weight.
      </FieldDescription>
    </Field>
  );
}

function ToggleGroupOutlineComponent() {
  return (
    <ToggleGroup defaultValue="all" type="single" variant="outline">
      <ToggleGroupItem aria-label="Toggle all" value="all">
        All
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle missed" value="missed">
        Missed
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function ToggleGroupSizesComponent() {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup defaultValue="top" size="sm" type="single" variant="outline">
        <ToggleGroupItem aria-label="Toggle top" value="top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle bottom" value="bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle left" value="left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle right" value="right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue="top" type="single" variant="outline">
        <ToggleGroupItem aria-label="Toggle top" value="top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle bottom" value="bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle left" value="left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle right" value="right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

function ToggleGroupSpacingComponent() {
  return (
    <ToggleGroup
      defaultValue="top"
      size="sm"
      spacing={2}
      type="single"
      variant="outline"
    >
      <ToggleGroupItem aria-label="Toggle top" value="top">
        Top
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle bottom" value="bottom">
        Bottom
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle left" value="left">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle right" value="right">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function ToggleGroupVerticalComponent() {
  return (
    <ToggleGroup
      defaultValue={["bold", "italic"]}
      orientation="vertical"
      spacing={1}
      type="multiple"
    >
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle underline" value="underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

const meta = {
  title: "ui/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => <ToggleGroupDemoComponent />,
};

export const Disabled: Story = {
  render: () => <ToggleGroupDisabledComponent />,
};

export const FontWeightSelector: Story = {
  render: () => <ToggleGroupFontWeightSelectorComponent />,
};

export const Outline: Story = {
  render: () => <ToggleGroupOutlineComponent />,
};

export const Sizes: Story = {
  render: () => <ToggleGroupSizesComponent />,
};

export const Spacing: Story = {
  render: () => <ToggleGroupSpacingComponent />,
};

export const Vertical: Story = {
  render: () => <ToggleGroupVerticalComponent />,
};
