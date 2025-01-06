import { Fieldset, Legend } from "@headlessui/react";
import CheckBoxWithLabel from "./CheckBoxWithLabel";

export type TCheckBoxGroupItem = {
  id: string;
  label: string;
  checked: boolean;
};

type CheckBoxGroupProps = {
  groupName: string;
  options: TCheckBoxGroupItem[];
  id: string;
  isValid?: boolean;
};

export default function CheckBoxGroup({
  groupName,
  options,
  id,
  isValid = true,
}: CheckBoxGroupProps) {
  return (
    <Fieldset>
      <Legend id={id} className="sr-only">
        {groupName}
      </Legend>
      <p className="block text-sm font-medium leading-6 text-gray-900">
        {groupName}
        {!isValid && (
          <span className="text-sm text-red-600 ml-3">
            * Please select at least one role
          </span>
        )}
      </p>
      <div className="grid grid-cols-2 gap-4 mt-5">
        {options.map((option) => {
          return <CheckBoxWithLabel option={option} key={option.id} />;
        })}
      </div>
    </Fieldset>
  );
}
