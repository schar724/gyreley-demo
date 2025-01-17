import { PlasticLocate } from "../../../../types/locate.type";
import SortableTable from "../../../../components/SortableTable";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMobileContext } from "@/context/MobileContext";
import { StyleSheet, TouchableOpacity } from "react-native";
import MobileAddNewButton from "../../admin-panel_/-components/MobileAddNewButton";

export type PlasticLocateListProps = {
  data: {
    locates: PlasticLocate[];
  };

  handleEditLocate: (locate: PlasticLocate | null) => void;
};

export default function PlasticLocateList({
  data: { locates },
  handleEditLocate,
}: PlasticLocateListProps): JSX.Element {
  const { mobile } = useMobileContext();
  const navigate = useNavigate();
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

  return mobile ? (
    <div className="h-full">
      <nav aria-label="Directory" className="h-full overflow-y-auto">
        {locates && (
          <ul role="list" className="divide-y divide-gray-100">
            {locates.map((item) => (
              <li
                key={item.identifier}
                className="flex gap-x-4 px-3 py-5 shadow-md"
              >
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    navigate({
                      to: `/plastic-pipe-locates/${item.plasticLocateId}`,
                    });
                  }}
                >
                  <div className="flex gap-x-4 items-center">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {item.place?.formattedAddress}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {item.inspectorName} - {item.inspectionStatusName}
                      </p>
                    </div>
                  </div>
                </TouchableOpacity>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <MobileAddNewButton emo={true} type="list" />
    </div>
  ) : (
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

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 5,
  },
});
