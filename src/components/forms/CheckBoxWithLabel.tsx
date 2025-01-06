import { useState } from "react";
import { Checkbox, Field, Label } from "@headlessui/react";

type CheckBoxWithLabelProps = {
  option: { id: string; label: string; checked: boolean };
};

export default function CheckBoxWithLabel({ option }: CheckBoxWithLabelProps) {
  const [enabled, setEnabled] = useState(option.checked);

  return (
    <Field className="flex items-center gap-2">
      <Checkbox
        id={option.id}
        checked={enabled}
        onChange={setEnabled}
        className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
      >
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox>
      <Label htmlFor={option.id} className="text-sm">
        {option.label}
      </Label>
    </Field>
  );
}
