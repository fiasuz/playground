export interface GitHubFileContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: "file" | "dir";
  content?: string;
  encoding?: string;
}

// --------------------------------------------------------

export interface ArtworkData {
  name: string;
  meta: ArtworkMeta;
  schema: ArtworkSchema;
  example: ArtworkExample;
  template: string;
}

export interface ArtworkMeta {
  name: string;
  displayName: string;
  category: string;
  version: string;
  author: string;
  description?: string;
}

export interface ArtworkSchema {
  [key: string]: {
    type: string;
    label?: string;
    default?: any;
    required?: boolean;
    options?: any[];
  };
}

export interface ArtworkExample {
  [key: string]: any;
}
