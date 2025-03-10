import { Injectable } from "@angular/core";
import { FetchService } from "./fetch.service";
import { IArtwork } from "../models/common.interface";
import { IRowTableData } from "../models/table-data.interface";
import { IAuthorCard } from "../models/grid-data.interface";

@Injectable({
  providedIn: "root",
})
export class TableDataService {
  constructor(private readonly fetchService: FetchService) {}

  async getTableData() {
    const responce: IArtwork[] = await this.fetchService.getRelationEntities(
      "projects",
      "populate=authors.country_origins&populate=author_teams.country_origins&populate=type_project&populate=biennial&populate=explication_area"
    );
    return mapTableData(responce);
  }

  async getTableDataPagination(start: number, pagination: number) {
    const responce: IArtwork[] = await this.fetchService.getRelationEntities(
      "projects",
      `pagination%5Bstart%5D=${start}&pagination%5Blimit%5D=${pagination}&populate=authors.country_origins&populate=author_teams.country_origins&populate=type_project&populate=biennial&populate=explication_area`
    );

    return mapTableData(responce);
  }

  dataFilters(data: IRowTableData[], option: string) {
    return data.filter(
      (item) => item.author === option || item.composition === option
    );
  }
}

function mapTableData(data: IArtwork[]): IRowTableData[] {
  return data.map((art) => {
    const authors = art.authors?.map((x) => x.name_localise) || [];
    const authorCountry =
      art.authors?.flatMap(
        (x) => x.country_origins?.map((c) => c.country_localise) || []
      ) || [];
    const authorTeams = art.author_teams?.map((x) => x.name_localise) || [];
    const authorTeamsCountry =
      art.author_teams?.flatMap(
        (x) => x.country_origins?.map((c) => c.country_localise) || []
      ) || [];

    return {
      author: authors.length > 0 ? authors.join(", ") : authorTeams.join(", "),
      country:
        authors.length > 0
          ? authorCountry.join(", ")
          : authorTeamsCountry.join(", "),
      composition: art.title_localise || "",
      docimentId: art.documentId,
      type: art.type_project?.type || "",
      biennial: art.biennial?.edition_localise || "",
      area: art.explication_area?.title_localise || "",
    };
  });
}
