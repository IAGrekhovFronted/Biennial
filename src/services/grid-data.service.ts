import { Injectable } from "@angular/core";
import { FetchService } from "./fetch.service";
import { IAuthor, IAuthorTeam } from "src/models/common.interface";
import { IAuthorCard, TargetCardEnum } from "../models/grid-data.interface";

@Injectable({
  providedIn: "root",
})
export class GridDataService {
  constructor(private readonly fetchService: FetchService) {}

  async getGridData() {
    const authorsResponse: IAuthor[] =
      await this.fetchService.getRelationEntities(
        "authors",
        "populate=composition"
      );

    const authorTeamsResponse: IAuthor[] =
      await this.fetchService.getRelationEntities(
        "author-teams",
        "populate=composition"
      );

    const mapDataAuthor = mapGridData(authorsResponse, TargetCardEnum.AUTHOR);
    const mapDataAuthorTeams = mapGridData(
      authorTeamsResponse,
      TargetCardEnum.AUTHOR_TEAMS
    );

    const data = mapDataAuthor.concat(mapDataAuthorTeams);

    return data;
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

    const mapDataAuthor = mapGridData(authorsResponse, TargetCardEnum.AUTHOR);
    const mapDataAuthorTeams = mapGridData(
      authorTeamsResponse,
      TargetCardEnum.AUTHOR_TEAMS
    );

    const combinedData = [...mapDataAuthor, ...mapDataAuthorTeams];

    const paginatedData = combinedData.slice(start, start + pagination);

    return paginatedData;
  }
}

function mapGridData(
  data: Array<IAuthorTeam | IAuthor>,
  targetCard: TargetCardEnum
): IAuthorCard[] {
  return data.map((item) => {
    return {
      name_localise: item.name_localise,
      name: item.name,
      image: item.link_photo,
      documentId: item.documentId,
      type: targetCard,
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
