import { Field, Label, Select } from "@headlessui/react";
import { ChangeEvent } from "react";

export type OptionType = {
  value: string;
  text: string;
};

export type SelectWithLabelProps = {
  value?: string;
  options: { value: string; text: string }[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  id: string;
  required?: boolean;
  defaultValue?: string;
};

export default function SelectWithLabel({
  id,
  value,
  onChange,
  options,
  label,
  required = false,
  defaultValue = "default",
}: SelectWithLabelProps): JSX.Element {
  return (
    <Field>
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </Label>
      </div>
      <div className="mt-2">
        <Select
          name={id}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          {...(value !== undefined
            ? { value, onChange: (e) => onChange?.(e) } // Controlled input if value is passed
            : { defaultValue })}
          required={required}
        >
          <option value="default">Please Select ... </option>
          {options &&
            options.map((option, index) => (
              <option key={`${id}-${index}`} value={option.value}>
                {option.text}
              </option>
            ))}
        </Select>
      </div>
    </Field>
  );
}
