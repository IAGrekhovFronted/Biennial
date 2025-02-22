import { Injectable } from "@angular/core";
import { FetchService } from "./fetch.service";
import { IAuthor, IAuthorTeam } from "src/models/common.interface";
import { IAuthorCard } from "../models/grid-data.interface";

@Injectable({
  providedIn: "root",
})
export class GridDataService {
  constructor(private readonly fetchService: FetchService) {}

  async getGridData() {
    const responceAuthor: IAuthor[] =
      await this.fetchService.getRelationEntities(
        "authors",
        "populate=composition"
      );

    const responceAuthorTeams: IAuthor[] =
      await this.fetchService.getRelationEntities(
        "author-teams",
        "populate=composition"
      );

    const data = responceAuthor.concat(responceAuthorTeams);

    return mapGridData(data);
  }

  async getGridDataPagination(start: number, pagination: number) {
    const authorsResponse: IAuthor[] =
      await this.fetchService.getRelationEntities(
        "authors",
        `pagination%5Bstart%5D=${start}&pagination%5Blimit%5D=${pagination}&populate=composition`
      );

    const authorTeamsResponse: IAuthorTeam[] =
      await this.fetchService.getRelationEntities(
        "author-teams",
        `pagination%5Bstart%5D=${start}&pagination%5Blimit%5D=${pagination}&populate=composition`
      );

    const combinedData = [...authorsResponse, ...authorTeamsResponse];

    const paginatedData = combinedData.slice(start, start + pagination);

    return mapGridData(paginatedData);
  }
}

function mapGridData(data: Array<IAuthorTeam | IAuthor>): IAuthorCard[] {
  return data.map((item) => {
    return {
      name_localise: item.name_localise,
      name: item.name,
      image: item.link_photo,
      composition:
        item.composition?.map((compos) => {
          return {
            composition_localise: compos.title_localise,
            composition: compos.title,
            year_creation: compos.year_creation,
          };
        }) || [],
    };
  });
}
