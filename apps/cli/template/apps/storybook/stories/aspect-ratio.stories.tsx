import { AspectRatio } from "@repo/design-system/components/ui/aspect-ratio";
import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";

function AspectRatioDemoComponent() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio className="rounded-lg bg-muted" ratio={16 / 9}>
        <Image
          alt="Photo"
          className="w-full rounded-lg object-cover grayscale dark:brightness-20"
          fill
          src="https://avatar.vercel.sh/shadcn1"
        />
      </AspectRatio>
    </div>
  );
}

function AspectRatioPortraitComponent() {
  return (
    <div className="w-full max-w-[10rem]">
      <AspectRatio className="rounded-lg bg-muted" ratio={9 / 16}>
        <Image
          alt="Photo"
          className="rounded-lg object-cover grayscale dark:brightness-20"
          fill
          src="https://avatar.vercel.sh/shadcn1"
        />
      </AspectRatio>
    </div>
  );
}

function AspectRatioSquareComponent() {
  return (
    <div className="w-full max-w-[12rem]">
      <AspectRatio className="rounded-lg bg-muted" ratio={1 / 1}>
        <Image
          alt="Photo"
          className="rounded-lg object-cover grayscale dark:brightness-20"
          fill
          src="https://avatar.vercel.sh/shadcn1"
        />
      </AspectRatio>
    </div>
  );
}

const meta = {
  title: "ui/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => <AspectRatioDemoComponent />,
};

export const Portrait: Story = {
  render: () => <AspectRatioPortraitComponent />,
};

export const Square: Story = {
  render: () => <AspectRatioSquareComponent />,
};
