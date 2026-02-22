import { Button } from "@repo/design-system/components/ui/button";
import {
  Calendar,
  CalendarDayButton,
} from "@repo/design-system/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
} from "@repo/design-system/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@repo/design-system/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/design-system/components/ui/input-group";
import type { Meta, StoryObj } from "@storybook/react";
import { addDays } from "date-fns";
import { Clock2Icon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { es } from "react-day-picker/locale";

function CalendarBasicComponent() {
  return <Calendar className="rounded-lg border" mode="single" />;
}

function CalendarBookedDatesComponent() {
  const [date, setDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  );
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
  );

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          defaultMonth={date}
          disabled={bookedDates}
          mode="single"
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
          onSelect={setDate}
          selected={date}
        />
      </CardContent>
    </Card>
  );
}

function CalendarCaptionComponent() {
  return (
    <Calendar
      captionLayout="dropdown"
      className="rounded-lg border"
      mode="single"
    />
  );
}

function CalendarCustomDaysComponent() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
  });

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          captionLayout="dropdown"
          className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              const isWeekend =
                day.date.getDay() === 0 || day.date.getDay() === 6;

              return (
                <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                  {children}
                  {!modifiers.outside && (
                    <span>{isWeekend ? "$120" : "$100"}</span>
                  )}
                </CalendarDayButton>
              );
            },
          }}
          defaultMonth={range?.from}
          formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString("default", { month: "long" });
            },
          }}
          mode="range"
          numberOfMonths={1}
          onSelect={setRange}
          selected={range}
        />
      </CardContent>
    </Card>
  );
}

function CalendarDemoComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      captionLayout="dropdown"
      className="rounded-lg border"
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  );
}

function CalendarMultipleComponent() {
  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar mode="multiple" />
      </CardContent>
    </Card>
  );
}

function CalendarPresetsComponent() {
  const [date, setDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 12)
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  return (
    <Card className="mx-auto w-fit max-w-[300px]" size="sm">
      <CardContent>
        <Calendar
          className="p-0 [--cell-size:--spacing(9.5)]"
          fixedWeeks
          mode="single"
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          onSelect={setDate}
          selected={date}
        />
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t">
        {[
          { label: "Today", value: 0 },
          { label: "Tomorrow", value: 1 },
          { label: "In 3 days", value: 3 },
          { label: "In a week", value: 7 },
          { label: "In 2 weeks", value: 14 },
        ].map((preset) => (
          <Button
            className="flex-1"
            key={preset.value}
            onClick={() => {
              const newDate = addDays(new Date(), preset.value);
              setDate(newDate);
              setCurrentMonth(
                new Date(newDate.getFullYear(), newDate.getMonth(), 1)
              );
            }}
            size="sm"
            variant="outline"
          >
            {preset.label}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
}

function CalendarRangeComponent() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          defaultMonth={dateRange?.from}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          mode="range"
          numberOfMonths={2}
          onSelect={setDateRange}
          selected={dateRange}
        />
      </CardContent>
    </Card>
  );
}

function CalendarTimeComponent() {
  const [date, setDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  );

  return (
    <Card className="mx-auto w-fit" size="sm">
      <CardContent>
        <Calendar
          className="p-0"
          mode="single"
          onSelect={setDate}
          selected={date}
        />
      </CardContent>
      <CardFooter className="border-t bg-card">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                defaultValue="10:30:00"
                id="time-from"
                step="1"
                type="time"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="time-to">End Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                defaultValue="12:30:00"
                id="time-to"
                step="1"
                type="time"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  );
}

function CalendarWeekNumbersComponent() {
  const [date, setDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  );

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          defaultMonth={date}
          mode="single"
          onSelect={setDate}
          selected={date}
          showWeekNumber
        />
      </CardContent>
    </Card>
  );
}

const meta = {
  title: "ui/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <CalendarBasicComponent />,
};

export const BookedDates: Story = {
  render: () => <CalendarBookedDatesComponent />,
};

export const Caption: Story = {
  render: () => <CalendarCaptionComponent />,
};

export const CustomDays: Story = {
  render: () => <CalendarCustomDaysComponent />,
};

export const Demo: Story = {
  render: () => <CalendarDemoComponent />,
};

export const Multiple: Story = {
  render: () => <CalendarMultipleComponent />,
};

export const Presets: Story = {
  render: () => <CalendarPresetsComponent />,
};

export const Range: Story = {
  render: () => <CalendarRangeComponent />,
};

export const Time: Story = {
  render: () => <CalendarTimeComponent />,
};

export const WeekNumbers: Story = {
  render: () => <CalendarWeekNumbersComponent />,
};
