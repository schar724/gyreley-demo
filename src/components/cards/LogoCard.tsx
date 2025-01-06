import { ReactNode } from "react";
import { LOGO } from "@/constants/logo";
type LogoCardProps = {
  children?: ReactNode;
  headerText: string;
  className?: string;
  headerClassName?: string;
};

export default function LogoCard({
  children = null,
  headerText,
  className = "",
  headerClassName = "",
}: LogoCardProps) {
  return (
    <div
      id="logo-card"
      className={`flex flex-col overflow-y-hidden rounded-lg shadow-md p-4 max-w-lg ${className}`}
    >
      <div
        id="header"
        className={`flex w-full flex-col items-center justify-center ${headerClassName}`}
      >
        <img className="w-auto h-16" src={LOGO} alt="Solinas Logo" />
        <h2 className="mt-5 text-lg text-center font-medium leading-6">
          {headerText}
        </h2>
      </div>
      {children && (
        <div id="body" className="w-full overflow-y-hidden">
          {children}
        </div>
      )}
    </div>
  );
}
