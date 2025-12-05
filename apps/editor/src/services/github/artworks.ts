import axios, { type AxiosResponse } from "axios";
import type { GitHubFileContent, ArtworkData } from "./artworks.model";

export class GithubArtworks {
  private baseUrl: string;
  private rawUrl: string;
  private owner: string;
  private repo: string;
  private branch: string;
  private artworksPath: string;

  constructor() {
    this.baseUrl = "https://api.github.com";
    this.rawUrl = "https://raw.githubusercontent.com";
    this.owner = "fiasuz";
    this.repo = "ui";
    this.branch = "main";
    this.artworksPath = "artworks";
  }

  /**
   * Get folders list
   * @returns {Promise<GitHubFileContent[]>}
   */
  async fetchArtworkFolders(): Promise<GitHubFileContent[]> {
    const url = `${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/${this.artworksPath}?ref=${this.branch}`;

    try {
      const response: AxiosResponse<GitHubFileContent[]> = await axios.get(url);
      return response.data.filter((item) => item.type === "dir");
    } catch (error) {
      throw new Error("FAILED_TO_FETCH_SECTIONS");
    }
  }

  /**
   * Get file content
   * @param path {string}
   * @returns {Promise<string>}
   */
  private async fetchFile(path: string): Promise<string> {
    const url = `${this.rawUrl}/${this.owner}/${this.repo}/${this.branch}/${path}`;

    try {
      const response = await fetch(url);
      return response.text();
    } catch (error) {
      throw new Error("FAILED_TO_FETCH_FILE");
    }
  }

  /**
   * Get one artwork data
   * @param artworkName
   * @returns {Promise<ArtworkData>}
   */
  async fetchArtworkData(artworkName: string): Promise<ArtworkData> {
    const basePath = `${this.artworksPath}/${artworkName}`;

    try {
      const [metaStr, schemaStr, exampleStr, template] = await Promise.all([
        this.fetchFile(`${basePath}/meta.json`),
        this.fetchFile(`${basePath}/schema.json`),
        this.fetchFile(`${basePath}/example.json`),
        this.fetchFile(`${basePath}/template.mustache`),
      ]);

      return {
        name: artworkName,
        meta: JSON.parse(metaStr),
        schema: JSON.parse(schemaStr),
        example: JSON.parse(exampleStr),
        template: template,
      };
    } catch (error) {
      throw new Error(`FAILED_TO_FETCH_SECTION_DATA_FOR: ${artworkName}`);
    }
  }

  /**
   * Get all artworks data
   * @returns {Promise<ArtworkData[]>}
   */
  async fetchAllArtworksData(): Promise<ArtworkData[]> {
    const folders = await this.fetchArtworkFolders();
    const sections = await Promise.all(
      folders.map((folder) => this.fetchArtworkData(folder.name))
    );

    return sections;
  }
}
