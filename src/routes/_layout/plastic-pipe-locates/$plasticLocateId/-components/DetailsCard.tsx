import {
  GeoData,
  LocateData,
  Measurement,
  PipeData,
  PlaceData,
} from "../../../../../types/locate.type";

function snakeToTitleCase(snakeCaseStr: string) {
  return snakeCaseStr
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type DetailsCardProps = {
  data:
    | PipeData
    | PlaceData
    | LocateData
    | GeoData
    | Record<string, string>
    | { [key: string]: Measurement };
  title: string;
  description: string;
  handleClick?: (action: string) => void;
};

export default function DetailsCard({
  data,
  title,
  description,
}: DetailsCardProps) {
  console.log("data ", data);
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="flex justify-between px-4 py-6 sm:px-6">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            {title}
          </h3>
          <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-500">
            {description}
          </p>
        </div>
        <div>
          {"Status" in data &&
            (data.Status === "Review" || data.Status === "Complete") && (
              <button
                type="button"
                className="block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3"
                onClick={() => {
                  alert(
                    "If this wasn't a demo, the locate status would be updated and saved",
                  );
                }}
              >
                {data.Status === "Review" ? "Complete Locate" : "Undo Status"}
              </button>
            )}
        </div>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {data &&
            Object.keys(data).map((key, index) => {
              return (
                <div
                  key={index}
                  className="px-4 py-2 sm:grid sm:grid-cols-1 md:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt className="col-span-1 text-sm font-medium text-gray-900">
                    {snakeToTitleCase(key)}:
                  </dt>
                  <dd className="col-span-2 mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
                    <span
                      className={
                        "Status" in data &&
                        key === "Status" &&
                        data[key as keyof typeof data] === "Complete"
                          ? "text-green-500"
                          : ""
                      }
                    >
                      {data[key as keyof typeof data]}
                    </span>
                  </dd>
                </div>
              );
            })}
        </dl>
      </div>
    </div>
  );
}
