import { ReactNode } from "react";

export default function HeaderCard({
  header,
  children,
  className = "",
}: {
  header: ReactNode;
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div
      id="header-card"
      className={`flex flex-col h-full overflow-hidden rounded-lg shadow-md p-4 w-full ${className}`}
    >
      <div id="header" className="flex-none">
        {header}
      </div>
      <div id="body" className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
