import { PlasticLocate } from "../../../../types/locate.type";
import SortableTable from "../../../../components/SortableTable";
import { Link } from "@tanstack/react-router";

type PlasticLocateListProps = {
  data: {
    locates: PlasticLocate[];
  };

  handleEditLocate: (locate: PlasticLocate | null) => void;
};

export default function PlasticLocateList({
  data: { locates },
  handleEditLocate,
}: PlasticLocateListProps): JSX.Element {
  const columns = [
    {
      label: "Id",
      key: "identifier",
      sortable: true,
      options: {
        render: (locate: PlasticLocate) => (
          <td
            id={`${locate.plasticLocateId}-link`}
            key={`${locate.plasticLocateId}-link`}
            className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0"
          >
            <Link
              key={`${locate.plasticLocateId}-key`}
              id={`${locate.plasticLocateId}-key`}
              to={`/plastic-pipe-locates/${locate.plasticLocateId}`}
              className="text-indigo-600 hover:text-indigo-900"
            >
              {locate?.identifier || locate?.plasticLocateId}
            </Link>
          </td>
        ),
      },
    },
    { label: "Address", key: "place.formattedAddress", sortable: false },
    { label: "Status", key: "inspectionStatusName", sortable: true },
    { label: "Assigned To", key: "inspectorName", sortable: true },
    { label: "Scheduled Date", key: "scheduledDate", sortable: true },
    { label: "Details", key: "contactDetail", sortable: false },
  ];

  return (
    <div className="h-full mt-5 overflow-y-auto bg-white rounded-lg">
      <div className="rounded-lg">
        <div className="px-4 rounded-lg sm:px-6 lg:px-8">
          <div className="flow-root rounded-lg">
            <div className="-mx-4 -my-2 rounded-lg sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle rounded-lg sm:px-6 lg:px-8">
                <SortableTable<PlasticLocate>
                  columns={columns}
                  data={locates}
                  name="plastic-locates"
                  handleEditEntity={handleEditLocate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
