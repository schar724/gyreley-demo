import { ChangeEvent, ReactNode, RefObject } from "react";
import { Field, Input, Label } from "@headlessui/react";

interface InputWithLabelProps {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  children?: ReactNode;
  value?: string | undefined;
  pattern?: string | undefined;
  title?: string | undefined;
  ref?: RefObject<HTMLInputElement>;
}

export default function InputWithLabel({
  id,
  label,
  autoComplete = "",
  required = false,
  placeholder = "",
  onChange = () => {},
  children = null,
  value = undefined,
  title = undefined,
}: // ref = undefined,
InputWithLabelProps): JSX.Element {
  return (
    <Field>
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </Label>
        <div className="text-sm">{children}</div>
      </div>
      <div className="mt-2">
        <Input
          as="textarea"
          // ref={ref}
          id={id}
          name={id}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          value={value}
          className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={onChange}
          title={title}
        />
      </div>
    </Field>
  );
}
