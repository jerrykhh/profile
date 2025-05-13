export type NotionFile = {
  name: string;
  file: {
    url: string;
    expiry_time: string;
  };
};

export type NoitonMultiSelect = {
  id: string;
  name: string;
  color: string;
};

export type NotionDate = {
  start: string;
  end: null | string;
};
