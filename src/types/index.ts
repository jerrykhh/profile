export interface File {
  name: string;
  file: {
    url: string;
    expiry_time: string;
  };
}

export type MutliSelect = Array<{
  id: string;
  name: string;
  color: string;
}>;
