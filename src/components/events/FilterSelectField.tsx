"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

/**
 * A native-form-participating Select (via `name`) that reliably shows the
 * selected item's label — base-ui's <SelectValue> only auto-resolves a
 * label once the popup has mounted its items, which doesn't happen for an
 * initial server-provided `defaultValue`, so we resolve the label ourselves.
 */
export function FilterSelectField({
  name,
  options,
  defaultValue,
  placeholder,
}: {
  name: string;
  options: Option[];
  defaultValue?: string;
  placeholder: string;
}) {
  const labelsByValue = Object.fromEntries(options.map((o) => [o.value, o.label]));

  return (
    <Select name={name} defaultValue={defaultValue ?? ""}>
      <SelectTrigger className="h-10 bg-surface-elevated">
        <SelectValue placeholder={placeholder}>
          {(value: string | null) => (value ? labelsByValue[value] : placeholder)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value || "_any"} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
