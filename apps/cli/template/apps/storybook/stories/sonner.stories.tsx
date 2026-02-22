import { Button } from "@repo/design-system/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";

function SonnerDemoComponent() {
  return (
    <Button
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
      variant="outline"
    >
      Show Toast
    </Button>
  );
}

function SonnerDescriptionComponent() {
  return (
    <Button
      className="w-fit"
      onClick={() =>
        toast("Event has been created", {
          description: "Monday, January 3rd at 6:00pm",
        })
      }
      variant="outline"
    >
      Show Toast
    </Button>
  );
}

function SonnerPositionComponent() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        onClick={() =>
          toast("Event has been created", { position: "top-left" })
        }
        variant="outline"
      >
        Top Left
      </Button>
      <Button
        onClick={() =>
          toast("Event has been created", { position: "top-center" })
        }
        variant="outline"
      >
        Top Center
      </Button>
      <Button
        onClick={() =>
          toast("Event has been created", { position: "top-right" })
        }
        variant="outline"
      >
        Top Right
      </Button>
      <Button
        onClick={() =>
          toast("Event has been created", { position: "bottom-left" })
        }
        variant="outline"
      >
        Bottom Left
      </Button>
      <Button
        onClick={() =>
          toast("Event has been created", { position: "bottom-center" })
        }
        variant="outline"
      >
        Bottom Center
      </Button>
      <Button
        onClick={() =>
          toast("Event has been created", { position: "bottom-right" })
        }
        variant="outline"
      >
        Bottom Right
      </Button>
    </div>
  );
}

function SonnerTypesComponent() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast("Event has been created")} variant="outline">
        Default
      </Button>
      <Button
        onClick={() => toast.success("Event has been created")}
        variant="outline"
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.info("Be at the area 10 minutes before the event time")
        }
        variant="outline"
      >
        Info
      </Button>
      <Button
        onClick={() =>
          toast.warning("Event start time cannot be earlier than 8am")
        }
        variant="outline"
      >
        Warning
      </Button>
      <Button
        onClick={() => toast.error("Event has not been created")}
        variant="outline"
      >
        Error
      </Button>
      <Button
        onClick={() => {
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Event" }), 2000)
              ),
            {
              loading: "Loading...",
              success: (data) => `${data.name} has been created`,
              error: "Error",
            }
          );
        }}
        variant="outline"
      >
        Promise
      </Button>
    </div>
  );
}

const meta = {
  title: "ui/Sonner",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => <SonnerDemoComponent />,
};

export const Description: Story = {
  render: () => <SonnerDescriptionComponent />,
};

export const Position: Story = {
  render: () => <SonnerPositionComponent />,
};

export const Types: Story = {
  render: () => <SonnerTypesComponent />,
};
