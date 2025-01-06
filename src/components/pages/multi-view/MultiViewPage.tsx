import HeaderCard from "../../cards/HeaderCard";
import MultiViewHeader from "./MultiViewHeader";
import { MultiViewPageSettings, PageViews } from "../../../types/page.type";
import { useSearch } from "@tanstack/react-router";

type MultiViewPageProps = {
  settings: MultiViewPageSettings;
  views: PageViews;
};

export default function MultiViewPage({
  settings,
  views,
}: MultiViewPageProps): JSX.Element {
  const searchParams = useSearch({ from: "/_layout/plastic-pipe-locates/" });

  return (
    <HeaderCard
      header={
        <MultiViewHeader
          views={views}
          settings={settings}
          headerControls={
            views[searchParams.plv || Object.keys(views)[0]].headerControls
          }
        />
      }
    >
      {views[searchParams.plv || Object.keys(views)[0]].view}
    </HeaderCard>
  );
}
