import Icon from "@/components/Icon";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@tanstack/react-router";
import { Route as AdminBaseRoute } from "../index";

type MobileAddButtonProps = {
  emo: boolean;
  type: "User" | "Client" | "list" | "map";
};
export default function MobileAddNewButton({
  emo,
  type,
}: MobileAddButtonProps) {
  const navigate = useNavigate({ from: AdminBaseRoute.to });
  return (
    <div
      className="flex items-center justify-center rounded-full bg-secondary text-secondary-foreground fixed bottom-20 right-6 z-20 h-14 w-14 shadow-md"
      onClick={() => {
        navigate({
          search: {
            emo: emo,
            type: type,
          },
        });
      }}
    >
      <Icon icon={PlusIcon} className="w-6 h-6" />
    </div>
  );
}
