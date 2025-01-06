import { ReactNode } from "react";

export default function Card({
  children = null,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      id="card"
      className={`flex flex-col h-full overflow-hidden rounded-lg shadow-md p-4 w-full ${className}`}
    >
      <div className="h-full overflow-y-hidden">{children}</div>
    </div>
  );
}
