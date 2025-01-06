export type OperatorLocation = {
  firstName: string;
  lastName: string;
  personId: string;
  lastLocationDate: string;
  lastLocation: string;
  location: {
    lat: number;
    lng: number;
  };
};

export type InspectionStat = {
  id: number;
  name: string;
  stat: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  change: string;
  changeType: "increase" | "decrease";
};
