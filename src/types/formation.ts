export type FileType = "PDF" | "Video" | "Archive";
export interface Resource {
  id: number;
  title: string;
  type: FileType;
  size: string;
  date: string;
}

export interface Module {
  id: number;
  title: string;
  resources: Resource[];
}

export interface Formation {
  id: number;
  title: string;
  modules: Module[];
}
