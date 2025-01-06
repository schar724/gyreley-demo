import { Fragment, PointerEventHandler, ReactElement, ReactNode } from "react";
import { cn } from "@/utils";
import { Button as HUIButton } from "@headlessui/react";
import Spinner from "./Spinner";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  label: string;
  isLoading?: boolean;
  onClick?: PointerEventHandler<HTMLButtonElement>;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
}

export default function Button({
  type,
  label,
  isLoading = false,
  onClick = () => {},
  className = "",
  children,
  disabled = false,
}: ButtonProps): JSX.Element {
  return (
    <HUIButton type={type} as={Fragment}>
      {({ hover, focus }): ReactElement => (
        <button
          className={cn(
            "flex w-full rounded justify-center bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-secondary-foreground shadow-sm",
            { "bg-secondary-hover": hover },
            { "outline outline-2 outline-offset-2 outline-indigo-600": focus },
            className,
          )}
          onClick={onClick}
          disabled={disabled || isLoading}
          type={type}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {label.trim() === "" ? (
                <div className="rounded">{children}</div>
              ) : (
                <>
                  {label} {children}
                </>
              )}
            </>
          )}
        </button>
      )}
    </HUIButton>
  );
}
