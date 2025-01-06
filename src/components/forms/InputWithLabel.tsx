import { ChangeEvent, ReactNode, RefObject } from "react";
import { Field, Input, Label } from "@headlessui/react";
import { cn } from "@/utils";

interface InputWithLabelProps {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  value?: string | undefined;
  pattern?: string | undefined;
  title?: string | undefined;
  ref?: RefObject<HTMLInputElement>;
  defaultValue?: string;
  disabled?: boolean;
}

export default function InputWithLabel({
  id,
  label,
  type,
  autoComplete = "",
  required = false,
  placeholder = "",
  onChange = () => {},
  children = null,
  value = undefined,
  pattern = undefined,
  title = undefined,
  defaultValue = "",
  disabled = false,
}: InputWithLabelProps): JSX.Element {
  return (
    <Field>
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="block text-sm font-medium leading-6">
          {label}
        </Label>
        <div className="ml-3 text-sm">{children}</div>
      </div>
      <div className="mt-2">
        <Input
          // ref={ref}
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className={cn(
            "block p-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm",
            disabled && "bg-gray-100",
          )}
          onChange={onChange}
          pattern={pattern}
          title={title}
          disabled={disabled}
          {...(value !== undefined
            ? { value } // Controlled input if value is passed
            : { defaultValue })}
        />
      </div>
    </Field>
  );
}
