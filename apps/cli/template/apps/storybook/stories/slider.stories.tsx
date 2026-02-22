import { Label } from "@repo/design-system/components/ui/label";
import { Slider } from "@repo/design-system/components/ui/slider";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

function SliderControlledComponent() {
  const [value, setValue] = useState([0.3, 0.7]);

  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="slider-demo-temperature">Temperature</Label>
        <span className="text-muted-foreground text-sm">
          {value.join(", ")}
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        max={1}
        min={0}
        onValueChange={setValue}
        step={0.1}
        value={value}
      />
    </div>
  );
}

function SliderDemoComponent() {
  return (
    <Slider
      className="mx-auto w-full max-w-xs"
      defaultValue={[75]}
      max={100}
      step={1}
    />
  );
}

function SliderDisabledComponent() {
  return (
    <Slider
      className="mx-auto w-full max-w-xs"
      defaultValue={[50]}
      disabled
      max={100}
      step={1}
    />
  );
}

function SliderMultipleComponent() {
  return (
    <Slider
      className="mx-auto w-full max-w-xs"
      defaultValue={[10, 20, 70]}
      max={100}
      step={10}
    />
  );
}

function SliderRangeComponent() {
  return (
    <Slider
      className="mx-auto w-full max-w-xs"
      defaultValue={[25, 50]}
      max={100}
      step={5}
    />
  );
}

function SliderVerticalComponent() {
  return (
    <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-6">
      <Slider
        className="h-40"
        defaultValue={[50]}
        max={100}
        orientation="vertical"
        step={1}
      />
      <Slider
        className="h-40"
        defaultValue={[25]}
        max={100}
        orientation="vertical"
        step={1}
      />
    </div>
  );
}

const meta = {
  title: "ui/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  render: () => <SliderControlledComponent />,
};

export const Demo: Story = {
  render: () => <SliderDemoComponent />,
};

export const Disabled: Story = {
  render: () => <SliderDisabledComponent />,
};

export const Multiple: Story = {
  render: () => <SliderMultipleComponent />,
};

export const Range: Story = {
  render: () => <SliderRangeComponent />,
};

export const Vertical: Story = {
  render: () => <SliderVerticalComponent />,
};
