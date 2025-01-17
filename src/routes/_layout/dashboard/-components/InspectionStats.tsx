import { Link } from "@tanstack/react-router";
import { InspectionStat } from "../../../../types/stats.type";
import { useMobileContext } from "@/context/MobileContext";

type InspectionStatsProps = {
  data: InspectionStat[];
  clientId: string | undefined;
};

export default function InspectionStats({
  data,
  clientId,
}: InspectionStatsProps) {
  const { mobile } = useMobileContext();
  if (!clientId) {
    return <></>;
  }

  return (
    <div className="my-5 w-full">
      {mobile ? (
        <dl className="flex flex-row w-full">
          {data.map((item) => (
            <dt key={item.id} className="flex mx-auto shadow-md rounded-md">
              <Link
                to={`/plastic-pipe-locates`}
                key={item.id}
                activeProps={{ className: "bg-indigo-600" }}
              >
                <div className="p-4 bg-indigo-500 rounded-md">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </Link>
            </dt>
          ))}
        </dl>
      ) : (
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="relative px-4 pt-5 pb-6 overflow-hidden bg-white border rounded-lg shadow-md sm:px-6 sm:pt-6 border-slate-100"
            >
              <dt>
                <div className="absolute p-3 bg-indigo-500 rounded-md">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.stat}
                </p>

                <div className="absolute inset-x-0 bottom-0 px-4 py-1 bg-gray-50 sm:px-6">
                  <div className="text-sm text-center">
                    <Link
                      to={`/plastic-pipe-locates`}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View all
                      <span className="sr-only"> {item.name} stats</span>
                    </Link>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
