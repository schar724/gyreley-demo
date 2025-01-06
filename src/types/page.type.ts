export type PageLink = {
  name: string;
  path: string;
  [key: string]: string;
};

export type PageView = {
  name: string;
  param: string;
  view: JSX.Element;
  headerControls?: JSX.Element;
};

export type PageViews = {
  [key: string]: {
    name: string;
    view: JSX.Element;
    headerControls?: JSX.Element;
  };
};

export type PageViewSearchParam = string;

export type MultiViewPageSettings = {
  pageViewSearchParam: string;
  pageName: string;
};
