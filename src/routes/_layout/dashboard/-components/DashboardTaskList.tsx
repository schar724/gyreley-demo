import { PlasticLocate } from "../../../../types/locate.type";
import Card from "../../../../components/cards/Card";
import SortableTable from "@/components/SortableTable";
import { isMobile } from "react-device-detect";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Link, useNavigate } from "@tanstack/react-router";

type DashboardTaskListProps = {
  data: PlasticLocate[];
  clientId: string | undefined;
};

export default function DashboardTaskList({
  data,
  clientId,
}: DashboardTaskListProps) {
  const navigate = useNavigate();
  const taskListColumns = [
    {
      label: "Id",
      key: "identifier",
      sortable: true,
      options: {
        render: (task: PlasticLocate) => (
          <td
            className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-3"
            key={`${task.plasticLocateId}-key`}
          >
            <Link
              href={`/plastic-pipe-locates/${task.plasticLocateId}`}
              className="text-indigo-600 hover:text-indigo-900"
            >
              {task.identifier}
            </Link>
          </td>
        ),
      },
    },
    { label: "Address", key: "place.formattedAddress", sortable: true },
    { label: "Inspector", key: "inspectorName", sortable: true },
    { label: "Status", key: "inspectionStatusName", sortable: true },
  ];

  if (!clientId) {
    return <></>;
  }

  return (
    <Card className="">
      <div className="flex flex-col flex-1 w-full h-full overflow-hidden rounded-lg p-2">
        <div>
          <h1>Today's Tasks</h1>
        </div>
        {isMobile ? (
          <div className="h-full">
            <nav aria-label="Directory" className="h-full overflow-y-auto">
              {data && (
                <ul role="list" className="divide-y divide-gray-100">
                  {data.map((item) => (
                    <li
                      key={item.identifier}
                      className="flex gap-x-4 px-3 py-5"
                    >
                      <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                          navigate({
                            to: `/plastic-pipe-locate/locate/${item.plasticLocateId}`,
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
          </div>
        ) : (
          <div id="table-container" className="h-full w-full overflow-y-auto">
            <SortableTable<PlasticLocate>
              columns={taskListColumns}
              data={data}
              name="taskList"
              handleEditEntity={() => {}}
            />
          </div>
        )}
      </div>
    </Card>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 5,
  },
});
