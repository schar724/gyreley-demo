import { MultiViewPageSettings, PageViews } from "../../../types/page.type";
import { cn } from "@/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";

type MultiViewHeaderProps = {
  settings: MultiViewPageSettings;
  views: PageViews;
  headerControls?: JSX.Element;
};

export default function MultiViewHeader({
  settings,
  views,
  headerControls = <></>,
}: MultiViewHeaderProps) {
  const searchParams = useSearch({ from: "/_layout/plastic-pipe-locates/" });
  const navigate = useNavigate({ from: "/plastic-pipe-locates" });

  const { pageName } = settings;

  const handleTabClick = (param: string) => {
    navigate({ to: "/plastic-pipe-locates", search: { plv: param } });
  };

  return (
    <>
      <div className="pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {pageName}
        </h3>
      </div>
      <div className="sm:flex sm:items-baseline">
        <div className="flex items-start justify-between w-full ">
          <nav className="flex -mb-px space-x-8">
            {Object.keys(views).map((key) => {
              const view = views[key];
              if (!view) return null;
              return (
                <button
                  key={key}
                  onClick={() => handleTabClick(key)}
                  className={cn(
                    searchParams.plv === key
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium",
                  )}
                  aria-current={searchParams.plv === key ? "page" : undefined}
                >
                  {view.name}
                </button>
              );
            })}
          </nav>
          {/* TODO: Style more responsive header controls */}
          <div id="header-controls">{headerControls}</div>
        </div>
      </div>
    </>
  );
}
