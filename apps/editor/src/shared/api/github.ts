/* eslint-disable */

/**
 * GitHub API client for fetching sections from fiasuz/ui repository
 */

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

export interface SectionMeta {
  name: string;
  displayName: string;
  category: string;
  version: string;
  author: string;
  description?: string;
}

export interface SectionSchema {
  [key: string]: {
    type: string;
    label?: string;
    default?: any;
    required?: boolean;
    options?: any[];
  };
}

export interface SectionExample {
  [key: string]: any;
}

export interface SectionData {
  name: string;
  meta: SectionMeta;
  schema: SectionSchema;
  example: SectionExample;
  template: string;
}

export class GitHubSectionsAPI {
  private baseUrl = "https://api.github.com";
  private rawUrl = "https://raw.githubusercontent.com";
  private owner: string;
  private repo: string;
  private branch: string;
  private artworksPath: string;

  constructor(
    config: {
      owner?: string;
      repo?: string;
      branch?: string;
      artworksPath?: string;
    } = {}
  ) {
    this.owner = config.owner || "fiasuz";
    this.repo = config.repo || "ui";
    this.branch = config.branch || "main";
    this.artworksPath = config.artworksPath || "artworks";
  }

  /**
   * Fetch all section folders from artworks directory
   */
  async fetchSectionFolders(): Promise<GitHubFileContent[]> {
    const url = `${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/${this.artworksPath}?ref=${this.branch}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch sections: ${response.statusText}`);
    }

    const contents: GitHubFileContent[] = await response.json();
    return contents.filter((item) => item.type === "dir");
  }

  /**
   * Fetch a single file content from repository
   */
  private async fetchFile(path: string): Promise<string> {
    const url = `${this.rawUrl}/${this.owner}/${this.repo}/${this.branch}/${path}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch file ${path}: ${response.statusText}`);
    }

    return response.text();
  }

  /**
   * Fetch complete section data (meta, schema, example, template)
   */
  async fetchSectionData(sectionName: string): Promise<SectionData> {
    const basePath = `${this.artworksPath}/${sectionName}`;

    try {
      // Fetch all required files in parallel
      const [metaStr, schemaStr, exampleStr, template] = await Promise.all([
        this.fetchFile(`${basePath}/meta.json`),
        this.fetchFile(`${basePath}/schema.json`),
        this.fetchFile(`${basePath}/example.json`),
        this.fetchFile(`${basePath}/template.mustache`),
      ]);

      return {
        name: sectionName,
        meta: JSON.parse(metaStr),
        schema: JSON.parse(schemaStr),
        example: JSON.parse(exampleStr),
        template,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch section data for ${sectionName}: ${error}`
      );
    }
  }

  /**
   * Fetch all sections data
   */
  async fetchAllSections(): Promise<SectionData[]> {
    const folders = await this.fetchSectionFolders();

    const sections = await Promise.all(
      folders.map((folder) => this.fetchSectionData(folder.name))
    );

    return sections;
  }
}
