import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@repo/design-system/components/ui/field";
import { Label } from "@repo/design-system/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@repo/design-system/components/ui/radio-group";
import type { Meta, StoryObj } from "@storybook/react";

function RadioGroupChoiceCardComponent() {
  return (
    <RadioGroup className="max-w-sm" defaultValue="plus">
      <FieldLabel htmlFor="plus-plan">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Plus</FieldTitle>
            <FieldDescription>
              For individuals and small teams.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem id="plus-plan" value="plus" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="pro-plan">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Pro</FieldTitle>
            <FieldDescription>For growing businesses.</FieldDescription>
          </FieldContent>
          <RadioGroupItem id="pro-plan" value="pro" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="enterprise-plan">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enterprise</FieldTitle>
            <FieldDescription>
              For large teams and enterprises.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem id="enterprise-plan" value="enterprise" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  );
}

function RadioGroupDemoComponent() {
  return (
    <RadioGroup className="w-fit" defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <RadioGroupItem id="r1" value="default" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem id="r2" value="comfortable" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem id="r3" value="compact" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}

function RadioGroupDescriptionComponent() {
  return (
    <RadioGroup className="w-fit" defaultValue="comfortable">
      <Field orientation="horizontal">
        <RadioGroupItem id="desc-r1" value="default" />
        <FieldContent>
          <FieldLabel htmlFor="desc-r1">Default</FieldLabel>
          <FieldDescription>
            Standard spacing for most use cases.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="desc-r2" value="comfortable" />
        <FieldContent>
          <FieldLabel htmlFor="desc-r2">Comfortable</FieldLabel>
          <FieldDescription>More space between elements.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="desc-r3" value="compact" />
        <FieldContent>
          <FieldLabel htmlFor="desc-r3">Compact</FieldLabel>
          <FieldDescription>
            Minimal spacing for dense layouts.
          </FieldDescription>
        </FieldContent>
      </Field>
    </RadioGroup>
  );
}

function RadioGroupDisabledComponent() {
  return (
    <RadioGroup className="w-fit" defaultValue="option2">
      <Field data-disabled orientation="horizontal">
        <RadioGroupItem disabled id="disabled-1" value="option1" />
        <FieldLabel className="font-normal" htmlFor="disabled-1">
          Disabled
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="disabled-2" value="option2" />
        <FieldLabel className="font-normal" htmlFor="disabled-2">
          Option 2
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="disabled-3" value="option3" />
        <FieldLabel className="font-normal" htmlFor="disabled-3">
          Option 3
        </FieldLabel>
      </Field>
    </RadioGroup>
  );
}

function RadioGroupFieldsetComponent() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">Subscription Plan</FieldLegend>
      <FieldDescription>
        Yearly and lifetime plans offer significant savings.
      </FieldDescription>
      <RadioGroup defaultValue="monthly">
        <Field orientation="horizontal">
          <RadioGroupItem id="plan-monthly" value="monthly" />
          <FieldLabel className="font-normal" htmlFor="plan-monthly">
            Monthly ($9.99/month)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="plan-yearly" value="yearly" />
          <FieldLabel className="font-normal" htmlFor="plan-yearly">
            Yearly ($99.99/year)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="plan-lifetime" value="lifetime" />
          <FieldLabel className="font-normal" htmlFor="plan-lifetime">
            Lifetime ($299.99)
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
}

function RadioGroupInvalidComponent() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">Notification Preferences</FieldLegend>
      <FieldDescription>
        Choose how you want to receive notifications.
      </FieldDescription>
      <RadioGroup defaultValue="email">
        <Field data-invalid orientation="horizontal">
          <RadioGroupItem aria-invalid id="invalid-email" value="email" />
          <FieldLabel className="font-normal" htmlFor="invalid-email">
            Email only
          </FieldLabel>
        </Field>
        <Field data-invalid orientation="horizontal">
          <RadioGroupItem aria-invalid id="invalid-sms" value="sms" />
          <FieldLabel className="font-normal" htmlFor="invalid-sms">
            SMS only
          </FieldLabel>
        </Field>
        <Field data-invalid orientation="horizontal">
          <RadioGroupItem aria-invalid id="invalid-both" value="both" />
          <FieldLabel className="font-normal" htmlFor="invalid-both">
            Both Email & SMS
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
}

const meta = {
  title: "ui/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChoiceCard: Story = {
  render: () => <RadioGroupChoiceCardComponent />,
};

export const Demo: Story = {
  render: () => <RadioGroupDemoComponent />,
};

export const Description: Story = {
  render: () => <RadioGroupDescriptionComponent />,
};

export const Disabled: Story = {
  render: () => <RadioGroupDisabledComponent />,
};

export const Fieldset: Story = {
  render: () => <RadioGroupFieldsetComponent />,
};

export const Invalid: Story = {
  render: () => <RadioGroupInvalidComponent />,
};
